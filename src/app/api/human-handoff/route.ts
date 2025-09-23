import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendTelegramNotification } from '@/lib/telegram-notifications';
import nodemailer from 'nodemailer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST - Crear nuevo ticket de handoff
export async function POST(request: NextRequest) {
  try {
    const {
      client_id,
      session_id,
      user_query,
      bot_response,
      handoff_reason,
      priority = 'medium',
      user_contact,
      context_data = {}
    } = await request.json();

    if (!client_id || !session_id || !user_query || !handoff_reason) {
      return NextResponse.json({
        error: 'client_id, session_id, user_query y handoff_reason son requeridos'
      }, { status: 400 });
    }

    // Verificar si el cliente tiene handoff habilitado
    const { data: config } = await supabase
      .from('client_handoff_config')
      .select('*')
      .eq('client_id', client_id)
      .single();

    if (!config || !config.enabled) {
      return NextResponse.json({
        error: 'Handoff no habilitado para este cliente'
      }, { status: 403 });
    }

    // Crear ticket de handoff
    const { data: ticket, error: ticketError } = await supabase
      .from('human_handoff_tickets')
      .insert({
        client_id,
        session_id,
        user_query,
        bot_response,
        handoff_reason,
        priority,
        user_contact,
        context_data,
        status: 'pending'
      })
      .select()
      .single();

    if (ticketError) {
      console.error('Error creando ticket:', ticketError);
      return NextResponse.json({ error: 'Error creando ticket' }, { status: 500 });
    }

    // Obtener información del cliente para notificación
    const { data: client } = await supabase
      .from('clients')
      .select('name, admin_email')
      .eq('id', client_id)
      .single();

    // 🚨 Enviar notificaciones según configuración
    await sendHandoffNotifications(ticket, client, config);

    // Guardar mensaje automático en historial de conversación
    await supabase
      .from('conversation_history')
      .insert({
        client_id,
        session_id,
        sender: 'bot',
        message_text: config.auto_response_template || 'Un especialista te contactará pronto.',
        metadata: {
          type: 'handoff_response',
          ticket_id: ticket.id,
          handoff_reason
        }
      });

    return NextResponse.json({
      success: true,
      message: 'Ticket de handoff creado exitosamente',
      ticket: {
        id: ticket.id,
        status: ticket.status,
        priority: ticket.priority,
        auto_response: config.auto_response_template
      }
    });

  } catch (error) {
    console.error('Error en POST handoff:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// GET - Obtener tickets de handoff
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assigned_to');
    const priority = searchParams.get('priority');

    let query = supabase
      .from('human_handoff_tickets')
      .select(`
        *,
        clients:client_id(name, admin_email),
        human_responses(*)
      `);

    if (clientId) query = query.eq('client_id', clientId);
    if (status) query = query.eq('status', status);
    if (assignedTo) query = query.eq('assigned_to', assignedTo);
    if (priority) query = query.eq('priority', priority);

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo tickets:', error);
      return NextResponse.json({ error: 'Error obteniendo tickets' }, { status: 500 });
    }

    // Calcular estadísticas
    const stats = {
      total: data?.length || 0,
      pending: data?.filter(t => t.status === 'pending').length || 0,
      in_progress: data?.filter(t => t.status === 'in_progress').length || 0,
      resolved: data?.filter(t => t.status === 'resolved').length || 0,
      by_priority: {
        urgent: data?.filter(t => t.priority === 'urgent').length || 0,
        high: data?.filter(t => t.priority === 'high').length || 0,
        medium: data?.filter(t => t.priority === 'medium').length || 0,
        low: data?.filter(t => t.priority === 'low').length || 0
      }
    };

    return NextResponse.json({
      success: true,
      tickets: data || [],
      stats
    });

  } catch (error) {
    console.error('Error en GET handoff:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// PUT - Actualizar ticket (asignar, cambiar status, etc.)
export async function PUT(request: NextRequest) {
  try {
    const {
      ticket_id,
      status,
      assigned_to,
      priority,
      agent_response,
      internal_notes
    } = await request.json();

    if (!ticket_id) {
      return NextResponse.json({ error: 'ticket_id requerido' }, { status: 400 });
    }

    // Preparar datos de actualización
    const updateData: any = { updated_at: new Date().toISOString() };

    if (status !== undefined) {
      updateData.status = status;
      if (status === 'assigned' && !updateData.assigned_at) {
        updateData.assigned_at = new Date().toISOString();
      }
      if (status === 'resolved' && !updateData.resolved_at) {
        updateData.resolved_at = new Date().toISOString();
      }
    }

    if (assigned_to !== undefined) updateData.assigned_to = assigned_to;
    if (priority !== undefined) updateData.priority = priority;

    // Actualizar ticket
    const { data: ticket, error: updateError } = await supabase
      .from('human_handoff_tickets')
      .update(updateData)
      .eq('id', ticket_id)
      .select()
      .single();

    if (updateError) {
      console.error('Error actualizando ticket:', updateError);
      return NextResponse.json({ error: 'Error actualizando ticket' }, { status: 500 });
    }

    // Si hay respuesta del agente, guardarla
    if (agent_response) {
      const { error: responseError } = await supabase
        .from('human_responses')
        .insert({
          ticket_id,
          agent_name: assigned_to || 'Agente',
          response_text: agent_response,
          internal_notes
        });

      if (responseError) {
        console.error('Error guardando respuesta:', responseError);
      }

      // También guardar en historial de conversación para el usuario
      await supabase
        .from('conversation_history')
        .insert({
          client_id: ticket.client_id,
          session_id: ticket.session_id,
          sender: 'human_agent',
          message_text: agent_response,
          metadata: {
            type: 'human_response',
            ticket_id,
            agent_name: assigned_to || 'Especialista'
          }
        });
    }

    return NextResponse.json({
      success: true,
      message: 'Ticket actualizado exitosamente',
      ticket
    });

  } catch (error) {
    console.error('Error en PUT handoff:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// Función para enviar notificaciones de handoff
async function sendHandoffNotifications(ticket: any, client: any, config: any) {
  try {
    const notificationMethods = config.notification_methods || ['telegram'];

    // Preparar mensaje
    const urgencyEmoji = {
      urgent: '🚨',
      high: '⚠️',
      medium: '📋',
      low: '📝'
    }[ticket.priority] || '📋';

    const reasonEmoji = {
      complex_query: '🤔',
      escalation_request: '⬆️',
      bot_failure: '🔧',
      specialized_knowledge: '🎓',
      complaint: '😟'
    }[ticket.handoff_reason] || '❓';

    // Enviar por Telegram
    if (notificationMethods.includes('telegram')) {
      const telegramMessage = `${urgencyEmoji} <b>NUEVO TICKET DE SOPORTE</b>

🏢 <b>Cliente:</b> ${client?.name || 'Sin nombre'}
${reasonEmoji} <b>Motivo:</b> ${ticket.handoff_reason}
📊 <b>Prioridad:</b> ${ticket.priority.toUpperCase()}

👤 <b>Consulta del usuario:</b>
${ticket.user_query}

${ticket.bot_response ? `🤖 <b>Respuesta del bot:</b>\n${ticket.bot_response}\n\n` : ''}

📞 <b>Contacto del usuario:</b>
${ticket.user_contact ?
  `• Nombre: ${ticket.user_contact.name || 'No especificado'}
• Email: ${ticket.user_contact.email || 'No especificado'}
• Teléfono: ${ticket.user_contact.phone || 'No especificado'}
• Método preferido: ${ticket.user_contact.preferred_method || 'No especificado'}`
  : 'No especificado'}

🎫 <b>ID Ticket:</b> ${ticket.id}
🕐 <b>Hora:</b> ${new Date(ticket.created_at).toLocaleString('es-ES')}

⚡ <b>Acción requerida:</b> Revisar y asignar agente`;

      await sendTelegramNotification('handoff_alert', {
        ticket_id: ticket.id,
        client_name: client?.name,
        priority: ticket.priority,
        reason: ticket.handoff_reason,
        message: telegramMessage
      });
    }

    // Enviar por Email
    if (notificationMethods.includes('email') && config.escalation_contacts?.support_email) {
      const emailHTML = generateHandoffEmailHTML(ticket, client, config);

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: config.escalation_contacts.support_email,
        subject: `${urgencyEmoji} Nuevo Ticket de Soporte - ${client?.name} [${ticket.priority.toUpperCase()}]`,
        html: emailHTML,
      };

      await transporter.sendMail(mailOptions);
    }

  } catch (error) {
    console.error('Error enviando notificaciones de handoff:', error);
  }
}

// Función para generar HTML del email de handoff
function generateHandoffEmailHTML(ticket: any, client: any, config: any): string {
  const urgencyColor = {
    urgent: '#dc2626',
    high: '#ea580c',
    medium: '#d97706',
    low: '#65a30d'
  }[ticket.priority] || '#d97706';

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, ${urgencyColor} 0%, #6366f1 100%); padding: 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 20px;">🎫 Nuevo Ticket de Soporte</h1>
        <p style="margin: 5px 0 0 0; opacity: 0.9;">Prioridad: ${ticket.priority.toUpperCase()}</p>
      </div>

      <!-- Contenido -->
      <div style="padding: 20px; background-color: white;">
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-bottom: 20px;">
          <h3 style="margin: 0 0 10px 0; color: #0c4a6e;">📋 Información del Ticket</h3>
          <p><strong>Cliente:</strong> ${client?.name || 'Sin nombre'}</p>
          <p><strong>Motivo:</strong> ${ticket.handoff_reason}</p>
          <p><strong>ID Ticket:</strong> ${ticket.id}</p>
          <p><strong>Fecha:</strong> ${new Date(ticket.created_at).toLocaleString('es-ES')}</p>
        </div>

        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151;">👤 Consulta del Usuario:</h4>
          <div style="background: #f9fafb; padding: 15px; border-radius: 5px; border-left: 3px solid #6366f1;">
            ${ticket.user_query}
          </div>
        </div>

        ${ticket.bot_response ? `
        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151;">🤖 Respuesta del Bot:</h4>
          <div style="background: #fef3c7; padding: 15px; border-radius: 5px; border-left: 3px solid #f59e0b;">
            ${ticket.bot_response}
          </div>
        </div>
        ` : ''}

        ${ticket.user_contact ? `
        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151;">📞 Información de Contacto:</h4>
          <ul style="background: #f0fdf4; padding: 15px; border-radius: 5px; border-left: 3px solid #16a34a;">
            <li><strong>Nombre:</strong> ${ticket.user_contact.name || 'No especificado'}</li>
            <li><strong>Email:</strong> ${ticket.user_contact.email || 'No especificado'}</li>
            <li><strong>Teléfono:</strong> ${ticket.user_contact.phone || 'No especificado'}</li>
            <li><strong>Método preferido:</strong> ${ticket.user_contact.preferred_method || 'No especificado'}</li>
          </ul>
        </div>
        ` : ''}

        <!-- Acción requerida -->
        <div style="background: #fef2f2; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626; text-align: center;">
          <h4 style="margin: 0 0 10px 0; color: #7f1d1d;">⚡ Acción Requerida</h4>
          <p style="margin: 0; color: #991b1b;">Revisar el ticket y asignar un agente especializado para responder al usuario</p>
        </div>
      </div>
    </div>
  `;
}