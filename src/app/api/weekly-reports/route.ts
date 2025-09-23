import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
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

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json();

    if (!clientId) {
      return NextResponse.json({
        error: 'Client ID es requerido'
      }, { status: 400 });
    }

    // Obtener información del cliente
    const { data: client, error: clientError } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .eq('active', true)
      .single();

    if (clientError || !client) {
      return NextResponse.json({
        error: 'Cliente no encontrado'
      }, { status: 404 });
    }

    // Calcular fecha de hace 7 días
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    // Obtener estadísticas de la semana
    const { data: conversations, error: convError } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', weekAgo.toISOString());

    if (convError) {
      console.error('Error obteniendo conversaciones:', convError);
      return NextResponse.json({
        error: 'Error obteniendo datos del cliente'
      }, { status: 500 });
    }

    // Calcular métricas
    const analytics = calculateWeeklyAnalytics(conversations || []);

    // Generar HTML del reporte
    const htmlReport = generateWeeklyReportHTML(client, analytics);

    // 🆕 ENVIAR POR EMAIL Y TELEGRAM

    // 1. Enviar email (como antes)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: client.admin_email,
      subject: `📊 Reporte Semanal del Chatbot - ${client.name}`,
      html: htmlReport,
    };

    await transporter.sendMail(mailOptions);

    // 2. 🆕 TAMBIÉN enviar por Telegram
    try {
      const { sendDailySummaryTelegram } = require('@/lib/telegram-notifications');
      await sendDailySummaryTelegram({
        totalConversations: analytics.totalConversations,
        uniqueUsers: analytics.uniqueUsers,
        totalMessages: analytics.totalMessages,
        avgSatisfaction: analytics.avgSatisfaction,
        insight: `📊 Reporte semanal de ${client.name}: ${analytics.totalConversations} conversaciones esta semana`
      });
      console.log('📱 Reporte también enviado por Telegram');
    } catch (telegramError) {
      console.error('Error enviando por Telegram (continuando con email):', telegramError);
    }

    return NextResponse.json({
      success: true,
      message: 'Reporte semanal enviado exitosamente',
      client: client.name,
      email: client.admin_email,
      analytics,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando reporte semanal:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error enviando reporte semanal',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// GET - Enviar reportes a todos los clientes activos
export async function GET(request: NextRequest) {
  try {
    // Obtener todos los clientes activos
    const { data: clients, error: clientsError } = await supabase
      .from('clients')
      .select('*')
      .eq('active', true);

    if (clientsError) {
      throw new Error(`Error obteniendo clientes: ${clientsError.message}`);
    }

    const results = [];

    // Enviar reporte a cada cliente
    for (const client of clients || []) {
      try {
        const response = await fetch(`${request.url}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId: client.id })
        });

        const result = await response.json();
        results.push({
          clientId: client.id,
          clientName: client.name,
          success: result.success,
          error: result.error || null
        });

        // Pequeña pausa entre envíos
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        results.push({
          clientId: client.id,
          clientName: client.name,
          success: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      message: `Reportes enviados: ${successCount} exitosos, ${failCount} fallidos`,
      results,
      summary: {
        total: results.length,
        successful: successCount,
        failed: failCount
      }
    });

  } catch (error) {
    console.error('Error enviando reportes masivos:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error enviando reportes masivos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Función para calcular analytics semanales
function calculateWeeklyAnalytics(conversations: any[]) {
  if (conversations.length === 0) {
    return {
      totalConversations: 0,
      uniqueUsers: 0,
      totalMessages: 0,
      avgSatisfaction: 'N/A',
      busiestHour: 'N/A',
      topKeywords: [],
      satisfactionDistribution: {}
    };
  }

  // 🆕 Filtrar solo conversaciones con al menos 2 intercambios (usuario + bot)
  const validSessions = new Map();
  conversations.forEach(conv => {
    const sessionId = conv.session_id;
    if (!validSessions.has(sessionId)) {
      validSessions.set(sessionId, []);
    }
    validSessions.get(sessionId).push(conv);
  });

  // Solo contar sesiones con al menos 2 mensajes (1 usuario + 1 bot mínimo)
  const validConversations = [];
  validSessions.forEach((messages, sessionId) => {
    if (messages.length >= 2) {
      validConversations.push(...messages);
    }
  });

  const filteredConversations = validConversations;
  const uniqueUsers = [...new Set(filteredConversations.map(c => c.session_id))].length;
  const totalMessages = filteredConversations.length;

  // Calcular satisfacción promedio
  const ratings = conversations.filter(c => c.rating).map(c => c.rating);
  const avgSatisfaction = ratings.length > 0
    ? (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
    : 'N/A';

  // Encontrar hora más activa
  const hourCounts = conversations.reduce((acc, conv) => {
    const hour = new Date(conv.created_at).getHours();
    acc[hour] = (acc[hour] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  const busiestHour = Object.entries(hourCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0];

  // Top palabras clave (de mensajes de usuarios)
  const userMessages = conversations
    .filter(c => c.sender === 'user')
    .map(c => c.message_text)
    .join(' ')
    .toLowerCase();

  const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'del', 'al', 'me', 'mi', 'tu', 'mas', 'si', 'pero', 'muy', 'ya', 'fue', 'ser', 'he', 'este', 'esta'];

  const words = userMessages
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.includes(word));

  const wordCounts = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topKeywords = Object.entries(wordCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word, count]) => ({ word, count }));

  // Distribución de satisfacción
  const satisfactionDistribution = ratings.reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return {
    totalConversations: uniqueUsers,
    uniqueUsers,
    totalMessages,
    avgSatisfaction,
    busiestHour: busiestHour ? `${busiestHour}:00` : 'N/A',
    topKeywords,
    satisfactionDistribution
  };
}

// Función para generar HTML del reporte
function generateWeeklyReportHTML(client: any, analytics: any): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb;">
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 30px 20px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">📊 Reporte Semanal del Chatbot</h1>
        <h2 style="margin: 10px 0 0 0; font-size: 18px; opacity: 0.9;">${client.name}</h2>
        <p style="margin: 5px 0 0 0; opacity: 0.8;">Semana del ${new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString('es-ES')} al ${new Date().toLocaleDateString('es-ES')}</p>
      </div>

      <!-- Métricas principales -->
      <div style="padding: 20px; background-color: white;">
        <h3 style="color: #374151; margin-bottom: 15px;">📈 Resumen de la Semana</h3>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
          <div style="background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #1d4ed8;">${analytics.totalConversations}</div>
            <div style="color: #6b7280; font-size: 14px;">Conversaciones</div>
          </div>
          <div style="background: #dcfce7; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #16a34a;">${analytics.uniqueUsers}</div>
            <div style="color: #6b7280; font-size: 14px;">Usuarios Únicos</div>
          </div>
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #d97706;">${analytics.totalMessages}</div>
            <div style="color: #6b7280; font-size: 14px;">Total Mensajes</div>
          </div>
          <div style="background: #fce7f3; padding: 15px; border-radius: 8px; text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: #be185d;">${analytics.avgSatisfaction}⭐</div>
            <div style="color: #6b7280; font-size: 14px;">Satisfacción</div>
          </div>
        </div>

        <!-- Insights -->
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0ea5e9; margin-bottom: 20px;">
          <h4 style="margin: 0 0 10px 0; color: #0c4a6e;">💡 Insights de la Semana</h4>
          <ul style="margin: 0; padding-left: 20px; color: #374151;">
            <li>Horario más activo: <strong>${analytics.busiestHour}</strong></li>
            <li>Promedio de mensajes por usuario: <strong>${(analytics.totalMessages / analytics.uniqueUsers || 0).toFixed(1)}</strong></li>
            ${analytics.avgSatisfaction !== 'N/A' ?
              `<li>Nivel de satisfacción: <strong>${analytics.avgSatisfaction >= 4 ? 'Excelente' : analytics.avgSatisfaction >= 3 ? 'Bueno' : 'Necesita mejora'}</strong></li>`
              : '<li>Sin evaluaciones de satisfacción esta semana</li>'
            }
          </ul>
        </div>

        <!-- Palabras más buscadas -->
        ${analytics.topKeywords.length > 0 ? `
        <div style="margin-bottom: 20px;">
          <h4 style="color: #374151; margin-bottom: 10px;">🔍 Términos Más Mencionados</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${analytics.topKeywords.map((keyword: any) =>
              `<span style="background: #e5e7eb; padding: 5px 10px; border-radius: 15px; font-size: 12px; color: #374151;">
                <strong>${keyword.word}</strong> (${keyword.count})
              </span>`
            ).join('')}
          </div>
        </div>
        ` : ''}

        <!-- Pie -->
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p>🚀 <strong>¡Tu chatbot está funcionando excelente!</strong></p>
          <p>Reporte generado automáticamente por <strong>Mente Autónoma</strong></p>
          <p style="margin-top: 15px;">
            <a href="mailto:ahumada.gb85@gmail.com" style="color: #6366f1; text-decoration: none;">
              ¿Tienes preguntas? Contáctanos
            </a>
          </p>
        </div>
      </div>
    </div>
  `;
}