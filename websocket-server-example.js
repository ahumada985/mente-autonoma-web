// websocket-server-example.js
// Servidor WebSocket para chat en tiempo real

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Redis para gestionar sesiones
const redis = Redis.createClient();

// Almacenar agentes conectados
const connectedAgents = new Map();
const activeSessions = new Map();

// Namespace para usuarios
const userNamespace = io.of('/user');
// Namespace para agentes
const agentNamespace = io.of('/agent');

// === CONEXIONES DE USUARIOS ===
userNamespace.on('connection', (socket) => {
  console.log('👤 Usuario conectado:', socket.id);

  // Usuario se une a sesión
  socket.on('join_session', async (data) => {
    const { sessionId, clientId } = data;

    socket.join(sessionId);
    socket.sessionId = sessionId;
    socket.clientId = clientId;

    // Guardar sesión activa
    activeSessions.set(sessionId, {
      socketId: socket.id,
      clientId,
      startTime: Date.now(),
      status: 'active'
    });

    console.log(`👤 Usuario ${socket.id} se unió a sesión ${sessionId}`);
  });

  // Usuario envía mensaje
  socket.on('user_message', async (data) => {
    const { sessionId, message, needsHandoff } = data;

    // Si necesita escalación
    if (needsHandoff) {
      await handleEscalation(sessionId, message, socket.clientId);
    }

    // Guardar mensaje en BD
    await saveMessage(sessionId, 'user', message);
  });

  socket.on('disconnect', () => {
    console.log('👤 Usuario desconectado:', socket.id);
    if (socket.sessionId) {
      activeSessions.delete(socket.sessionId);
    }
  });
});

// === CONEXIONES DE AGENTES ===
agentNamespace.on('connection', (socket) => {
  console.log('👩‍💼 Agente conectado:', socket.id);

  // Agente se registra como disponible
  socket.on('agent_online', (data) => {
    const { agentId, name, status } = data;

    socket.agentId = agentId;
    socket.join('available_agents');

    connectedAgents.set(agentId, {
      socketId: socket.id,
      name,
      status: status || 'available',
      connectedAt: Date.now()
    });

    console.log(`👩‍💼 Agente ${name} (${agentId}) está ${status}`);
  });

  // Agente responde a usuario
  socket.on('agent_response', async (data) => {
    const { sessionId, message, agentId } = data;

    // Enviar mensaje al usuario INMEDIATAMENTE
    userNamespace.to(sessionId).emit('agent_message', {
      message,
      agentName: connectedAgents.get(agentId)?.name || 'Agente',
      timestamp: Date.now()
    });

    // Guardar en BD
    await saveMessage(sessionId, 'agent', message, agentId);

    console.log(`📤 Agente ${agentId} respondió en sesión ${sessionId}`);
  });

  // Agente toma una escalación
  socket.on('take_escalation', (data) => {
    const { sessionId, agentId } = data;

    // Notificar a otros agentes que ya fue tomada
    agentNamespace.to('available_agents').emit('escalation_taken', {
      sessionId,
      takenBy: agentId
    });
  });

  socket.on('disconnect', () => {
    console.log('👩‍💼 Agente desconectado:', socket.id);
    if (socket.agentId) {
      connectedAgents.delete(socket.agentId);
    }
  });
});

// === FUNCIONES AUXILIARES ===

async function handleEscalation(sessionId, userMessage, clientId) {
  console.log(`🚨 ESCALACIÓN en sesión ${sessionId}`);

  // Crear ticket de escalación
  const escalationData = {
    sessionId,
    clientId,
    userMessage,
    timestamp: Date.now(),
    priority: detectPriority(userMessage),
    status: 'pending'
  };

  // Enviar a TODOS los agentes disponibles
  agentNamespace.to('available_agents').emit('new_escalation', escalationData);

  // Notificar por WhatsApp/Telegram también
  await sendExternalNotifications(escalationData);

  // Respuesta automática al usuario
  userNamespace.to(sessionId).emit('system_message', {
    message: 'Un momento, te conecto con un especialista...',
    type: 'handoff_initiated'
  });
}

function detectPriority(message) {
  const urgentKeywords = ['urgente', 'emergency', 'inmediato', 'ahora'];
  const isUrgent = urgentKeywords.some(keyword =>
    message.toLowerCase().includes(keyword)
  );
  return isUrgent ? 'urgent' : 'normal';
}

async function sendExternalNotifications(escalationData) {
  // WhatsApp API
  try {
    await fetch('https://api.whatsapp.com/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: '+56912345678', // Número del agente
        message: `🚨 ESCALACIÓN ${escalationData.priority.toUpperCase()}\nCliente: ${escalationData.clientId}\nMensaje: ${escalationData.userMessage}\nAtender en: dashboard.com/chat/${escalationData.sessionId}`
      })
    });
  } catch (error) {
    console.error('Error enviando WhatsApp:', error);
  }
}

async function saveMessage(sessionId, sender, message, agentId = null) {
  // Aquí guardarías en tu base de datos
  console.log(`💾 Guardando mensaje: ${sender} en ${sessionId}: ${message}`);

  // Ejemplo con Supabase
  try {
    await supabase.from('chat_messages').insert({
      session_id: sessionId,
      sender_type: sender,
      message_text: message,
      agent_id: agentId,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error guardando mensaje:', error);
  }
}

// === ENDPOINTS DE ESTADO ===

app.get('/api/agent-status', (req, res) => {
  const agents = Array.from(connectedAgents.values());
  res.json({
    total: agents.length,
    available: agents.filter(a => a.status === 'available').length,
    busy: agents.filter(a => a.status === 'busy').length,
    agents
  });
});

app.get('/api/active-sessions', (req, res) => {
  res.json({
    total: activeSessions.size,
    sessions: Array.from(activeSessions.values())
  });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor WebSocket funcionando en puerto ${PORT}`);
  console.log(`👤 Usuarios: ws://localhost:${PORT}/user`);
  console.log(`👩‍💼 Agentes: ws://localhost:${PORT}/agent`);
});

module.exports = { io, userNamespace, agentNamespace };