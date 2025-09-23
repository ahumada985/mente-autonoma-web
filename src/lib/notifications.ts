// Utilidades para envío de notificaciones por email

export interface NotificationData {
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

export type NotificationType = 'new_lead' | 'low_satisfaction' | 'technical_error' | 'daily_summary';

/**
 * Envía una notificación por email
 */
export async function sendNotification(
  type: NotificationType,
  data: NotificationData,
  adminEmail?: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        adminEmail,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Error enviando notificación');
    }

    return { success: true };
  } catch (error) {
    console.error('Error enviando notificación:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
    };
  }
}

/**
 * Envía notificación de nuevo lead
 */
export async function notifyNewLead(leadData: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}) {
  return sendNotification('new_lead', leadData);
}

/**
 * Envía notificación de satisfacción baja (rating <= 2)
 */
export async function notifyLowSatisfaction(satisfactionData: {
  rating: number;
  comment?: string;
  sessionId?: string;
}) {
  if (satisfactionData.rating <= 2) {
    return sendNotification('low_satisfaction', satisfactionData);
  }
  return { success: true }; // No enviar si no es baja satisfacción
}

/**
 * Envía notificación de error técnico
 */
export async function notifyTechnicalError(errorData: {
  errorType: string;
  errorMessage: string;
  sessionId?: string;
}) {
  return sendNotification('technical_error', errorData);
}

/**
 * Envía resumen diario de métricas
 */
export async function sendDailySummary(summaryData: {
  totalConversations: number;
  uniqueUsers: number;
  totalMessages: number;
  avgSatisfaction?: string;
  insight?: string;
}) {
  return sendNotification('daily_summary', summaryData);
}

/**
 * Valida si se debe enviar notificación basado en condiciones
 */
export function shouldNotify(type: NotificationType, data: any): boolean {
  switch (type) {
    case 'new_lead':
      return !!(data.email || data.phone); // Al menos email o teléfono
    case 'low_satisfaction':
      return data.rating <= 2;
    case 'technical_error':
      return !!data.errorType;
    case 'daily_summary':
      return data.totalConversations > 0;
    default:
      return false;
  }
}