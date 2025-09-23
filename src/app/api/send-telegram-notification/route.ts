import { NextRequest, NextResponse } from 'next/server';
import {
  formatNewLeadMessage,
  formatLowSatisfactionMessage,
  formatTechnicalErrorMessage,
  formatDailySummaryMessage,
  TelegramNotificationType,
  TelegramNotificationData
} from '@/lib/telegram-notifications';

// Configuración del Bot de Telegram
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID; // Tu chat ID personal

export async function POST(request: NextRequest) {
  try {
    if (!TELEGRAM_BOT_TOKEN) {
      return NextResponse.json({
        error: 'Bot Token de Telegram no configurado'
      }, { status: 500 });
    }

    const { type, data, chatId } = await request.json();

    if (!type || !data) {
      return NextResponse.json({
        error: 'Tipo y datos requeridos'
      }, { status: 400 });
    }

    // Determinar el chat ID a usar
    const targetChatId = chatId || TELEGRAM_CHAT_ID;
    if (!targetChatId) {
      return NextResponse.json({
        error: 'Chat ID no configurado'
      }, { status: 500 });
    }

    // Formatear mensaje según el tipo
    let message = '';

    switch (type as TelegramNotificationType) {
      case 'new_lead':
        message = formatNewLeadMessage(data);
        break;
      case 'low_satisfaction':
        message = formatLowSatisfactionMessage(data);
        break;
      case 'technical_error':
        message = formatTechnicalErrorMessage(data);
        break;
      case 'daily_summary':
        message = formatDailySummaryMessage(data);
        break;
      default:
        return NextResponse.json({
          error: 'Tipo de notificación no válido'
        }, { status: 400 });
    }

    // Enviar mensaje a Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

    const telegramResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: targetChatId,
        text: message,
        parse_mode: 'HTML', // Cambiar a HTML que es más estable
        disable_web_page_preview: true
      }),
    });

    const telegramResult = await telegramResponse.json();

    if (!telegramResponse.ok) {
      console.error('Error de Telegram API:', telegramResult);
      return NextResponse.json({
        error: 'Error enviando mensaje a Telegram',
        details: telegramResult.description || 'Error desconocido'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Notificación enviada a Telegram',
      type,
      messageId: telegramResult.result.message_id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando notificación Telegram:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// También permitir GET para testing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const test = searchParams.get('test');

    if (test === 'true') {
      // Enviar mensaje de prueba
      const testData = {
        type: 'technical_error',
        data: {
          errorType: 'Test de conexión',
          errorMessage: 'Probando el bot de Telegram desde la API',
          sessionId: 'test_session'
        }
      };

      return POST(new NextRequest(request.url, {
        method: 'POST',
        body: JSON.stringify(testData),
        headers: { 'Content-Type': 'application/json' }
      }));
    }

    return NextResponse.json({
      message: 'Telegram Bot API - Usa POST para enviar notificaciones',
      test_url: `${request.url}?test=true`,
      required_env: {
        TELEGRAM_BOT_TOKEN: !!TELEGRAM_BOT_TOKEN,
        TELEGRAM_CHAT_ID: !!TELEGRAM_CHAT_ID
      }
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Error en test endpoint',
      details: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  }
}