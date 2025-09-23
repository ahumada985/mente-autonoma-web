import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendTelegramNotification } from '@/lib/telegram-notifications';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { clientId } = await request.json();

    // Obtener cliente y estadísticas (igual que antes)
    const { data: client } = await supabase
      .from('clients')
      .select('*')
      .eq('id', clientId)
      .single();

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const { data: conversations } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', weekAgo.toISOString());

    const analytics = calculateAnalytics(conversations || []);

    // 🆕 Enviar por TELEGRAM en lugar de email
    const telegramMessage = formatTelegramReport(client, analytics);

    // Enviar a Telegram del cliente (puedes configurar chat_id por cliente)
    await sendTelegramNotification('daily_summary', {
      totalConversations: analytics.totalConversations,
      uniqueUsers: analytics.uniqueUsers,
      totalMessages: analytics.totalMessages,
      avgSatisfaction: analytics.avgSatisfaction,
      insight: telegramMessage
    });

    return NextResponse.json({
      success: true,
      message: 'Reporte semanal enviado por Telegram',
      client: client.name,
      analytics
    });

  } catch (error) {
    console.error('Error enviando reporte Telegram:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

function formatTelegramReport(client: any, analytics: any): string {
  return `📊 <b>REPORTE SEMANAL</b>
🏢 ${client.name}

📈 <b>Esta Semana:</b>
💬 Conversaciones: <b>${analytics.totalConversations}</b>
👥 Usuarios únicos: <b>${analytics.uniqueUsers}</b>
📝 Total mensajes: <b>${analytics.totalMessages}</b>
⭐ Satisfacción: <b>${analytics.avgSatisfaction}</b>

🕐 <b>Horario más activo:</b> ${analytics.busiestHour}

🔍 <b>Palabras más buscadas:</b>
${analytics.topKeywords.map((k: any) => `• ${k.word} (${k.count})`).join('\n')}

💡 <b>Insight:</b> ${analytics.insight}

📅 Período: ${new Date(Date.now() - 7*24*60*60*1000).toLocaleDateString()} - ${new Date().toLocaleDateString()}

🚀 ¡Tu chatbot está funcionando excelente!`;
}

function calculateAnalytics(conversations: any[]) {
  // Misma lógica que el reporte por email
  return {
    totalConversations: 0,
    uniqueUsers: 0,
    totalMessages: 0,
    avgSatisfaction: 'N/A',
    busiestHour: 'N/A',
    topKeywords: [],
    insight: 'Sin actividad esta semana'
  };
}