// Sistema de notificaciones via Telegram Bot

export interface TelegramNotificationData {
  // Para nuevos leads
  name?: string;
  email?: string;
  phone?: string;
  message?: string;

  // Para satisfacción baja
  rating?: number;
  comment?: string;
  sessionId?: string;

  // Para errores técnicos
  errorType?: string;
  errorMessage?: string;

  // Para resumen diario
  totalConversations?: number;
  uniqueUsers?: number;
  totalMessages?: number;
  avgSatisfaction?: string;
  insight?: string;
}

export type TelegramNotificationType = 'new_lead' | 'low_satisfaction' | 'technical_error' | 'daily_summary';

/**
 * Envía una notificación via Telegram Bot
 */
export async function sendTelegramNotification(
  type: TelegramNotificationType,
  data: TelegramNotificationData,
  chatId?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send-telegram-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        chatId,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error enviando notificación');
    }

    return { success: true };
  } catch (error) {
    console.error('Error enviando notificación Telegram:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Formatear mensaje para nuevo lead
 */
export function formatNewLeadMessage(data: TelegramNotificationData): string {
  return `🎯 <b>NUEVO LEAD CAPTURADO</b>

👤 <b>Nombre:</b> ${data.name || 'No proporcionado'}
📧 <b>Email:</b> ${data.email || 'No proporcionado'}
📱 <b>Teléfono:</b> ${data.phone || 'No proporcionado'}
💬 <b>Mensaje:</b> ${data.message || 'Sin mensaje'}

🕐 <b>Fecha:</b> ${new Date().toLocaleString('es-ES')}

🚀 <b>Acción:</b> Contactar dentro de 2 horas`;
}

/**
 * Formatear mensaje para baja satisfacción
 */
export function formatLowSatisfactionMessage(data: TelegramNotificationData): string {
  return `⚠️ <b>ALERTA: BAJA SATISFACCIÓN</b>

⭐ <b>Rating:</b> ${data.rating}/5
👤 <b>Usuario:</b> ${data.sessionId || 'Anónimo'}
💬 <b>Comentario:</b> ${data.comment || 'Sin comentario'}

🕐 <b>Fecha:</b> ${new Date().toLocaleString('es-ES')}

🔧 <b>Acción:</b> Revisar y mejorar respuesta del chatbot`;
}

/**
 * Formatear mensaje para error técnico
 */
export function formatTechnicalErrorMessage(data: TelegramNotificationData): string {
  return `🚨 <b>ERROR TÉCNICO DETECTADO</b>

⚡ <b>Tipo:</b> ${data.errorType || 'Error desconocido'}
📋 <b>Mensaje:</b> ${data.errorMessage || 'Sin detalles'}
👤 <b>Usuario Afectado:</b> ${data.sessionId || 'Anónimo'}

🕐 <b>Fecha:</b> ${new Date().toLocaleString('es-ES')}

🛠️ <b>Acción:</b> Revisar sistema inmediatamente`;
}

/**
 * Formatear mensaje para resumen diario
 */
export function formatDailySummaryMessage(data: TelegramNotificationData): string {
  return `📊 <b>RESUMEN DIARIO - CHATBOT</b>

📈 <b>Métricas del día:</b>
💬 Conversaciones: <b>${data.totalConversations}</b>
👥 Usuarios únicos: <b>${data.uniqueUsers}</b>
📝 Total mensajes: <b>${data.totalMessages}</b>
⭐ Satisfacción promedio: <b>${data.avgSatisfaction || 'N/A'}</b>

💡 <b>Insight:</b> ${data.insight || 'Día normal de operación'}

🕐 <b>Generado:</b> ${new Date().toLocaleString('es-ES')}`;
}

/**
 * Funciones de conveniencia para cada tipo de notificación
 */
export async function notifyNewLeadTelegram(leadData: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}) {
  return sendTelegramNotification('new_lead', leadData);
}

export async function notifyLowSatisfactionTelegram(satisfactionData: {
  rating: number;
  comment?: string;
  sessionId?: string;
}) {
  if (satisfactionData.rating <= 2) {
    return sendTelegramNotification('low_satisfaction', satisfactionData);
  }
  return { success: true };
}

export async function notifyTechnicalErrorTelegram(errorData: {
  errorType: string;
  errorMessage: string;
  sessionId?: string;
}) {
  return sendTelegramNotification('technical_error', errorData);
}

export async function sendDailySummaryTelegram(summaryData: {
  totalConversations: number;
  uniqueUsers: number;
  totalMessages: number;
  avgSatisfaction?: string;
  insight?: string;
}) {
  return sendTelegramNotification('daily_summary', summaryData);
}