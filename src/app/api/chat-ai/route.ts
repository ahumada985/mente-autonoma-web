import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { notifyTechnicalError } from '@/lib/notifications';
import { notifyTechnicalErrorTelegram } from '@/lib/telegram-notifications';
import { detectHandoffNeed, isWithinBusinessHours } from '@/lib/handoff-detection';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      context,
      client_id = 'mente_autonoma',
      session_id,
      conversation_history = []
    } = await request.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    // 🤝 Configuración de handoff temporal (sin base de datos)
    const handoffConfig = {
      enabled: true,
      triggers: ["complex_query", "escalation_request", "bot_failure"],
      notification_methods: ["telegram"],
      business_hours: {
        start: "09:00",
        end: "18:00",
        timezone: "America/Santiago",
        days: [1, 2, 3, 4, 5]
      },
      auto_response_template: "Un especialista te contactará pronto para ayudarte con tu consulta.",
      max_response_time: 120
    };

    const { data: clientInfo } = await supabase
      .from('clients')
      .select('name, plan')
      .eq('id', client_id)
      .single();

    // Sistema de prompt para el chatbot
    const systemPrompt = `
Eres un asistente virtual especializado en IA y automatización para empresas.
Tu nombre es María y trabajas para Mente Autónoma.

PERSONALIDAD:
- Profesional pero amigable
- Experta en IA, chatbots y automatización
- Orientada a soluciones de negocio
- Hablas en español de manera natural

CONOCIMIENTO:
- Servicios de IA para empresas
- Chatbots inteligentes
- Automatización de procesos
- Marketing digital con IA
- Análisis de datos y métricas

REGLAS:
1. Respuestas concisas (máximo 150 palabras)
2. Incluye CTAs cuando sea apropiado
3. Si preguntan por precios, invita a contactar para cotización personalizada
4. Mantén el tono profesional pero cercano
5. Enfócate en beneficios de negocio

SERVICIOS PRINCIPALES:
- Chatbots inteligentes personalizados
- Automatización de atención al cliente
- IA para análisis de datos
- Integración de sistemas
- Consultoría en transformación digital
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Modelo más eficiente
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
      presence_penalty: 0.6,
      frequency_penalty: 0.5,
    });

    const aiResponse = completion.choices[0].message.content || '';

    // 🤝 DETECTAR SI NECESITA HANDOFF HUMANO
    let handoffDecision = null;
    let finalResponse = aiResponse;

    if (handoffConfig?.enabled) {
      handoffDecision = detectHandoffNeed(
        message,
        aiResponse,
        conversation_history,
        clientInfo
      );

      // Si debe hacer handoff y está en horario laboral
      if (handoffDecision.shouldHandoff && handoffDecision.confidence > 70) {
        const withinBusinessHours = isWithinBusinessHours(handoffConfig);

        if (withinBusinessHours || handoffDecision.priority === 'urgent') {
          // 🎫 SIMULAR creación de ticket (por ahora sin base de datos)
          console.log('🤝 HANDOFF DETECTADO:', {
            client_id,
            reason: handoffDecision.reason,
            priority: handoffDecision.priority,
            confidence: handoffDecision.confidence,
            message: message
          });

          finalResponse = handoffDecision.suggestedResponse ||
            'Un especialista te contactará pronto para ayudarte con tu consulta.';

          handoffDecision.ticket_created = true;
        } else {
          // Fuera de horario laboral
          finalResponse = `${aiResponse}\n\nPara consultas más específicas, nuestros especialistas están disponibles de ${handoffConfig.business_hours?.start || '09:00'} a ${handoffConfig.business_hours?.end || '18:00'}. ¿Hay algo más en lo que pueda ayudarte ahora?`;
        }
      }
    }

    return NextResponse.json({
      success: true,
      response: finalResponse,
      usage: completion.usage,
      model: 'gpt-4o-mini',
      handoff: handoffDecision ? {
        should_handoff: handoffDecision.shouldHandoff,
        reason: handoffDecision.reason,
        priority: handoffDecision.priority,
        confidence: handoffDecision.confidence,
        ticket_created: handoffDecision.ticket_created || false,
        within_business_hours: handoffConfig ? isWithinBusinessHours(handoffConfig) : true
      } : null
    });

  } catch (error) {
    console.error('Error en chat AI:', error);

    let errorType = 'Error desconocido';
    let errorMessage = 'Error procesando consulta';

    if (error instanceof Error) {
      // Manejar errores específicos de OpenAI
      if (error.message.includes('insufficient_quota')) {
        errorType = 'Cuota OpenAI agotada';
        errorMessage = error.message;

        // Enviar notificación de error crítico
        try {
          // Telegram (prioritario)
          await notifyTechnicalErrorTelegram({
            errorType,
            errorMessage: 'La cuota de OpenAI se ha agotado. Se requiere acción inmediata.',
            sessionId: `chat_${Date.now()}`
          });
          // Email (respaldo)
          await notifyTechnicalError({
            errorType,
            errorMessage: 'La cuota de OpenAI se ha agotado. Se requiere acción inmediata.',
            sessionId: `chat_${Date.now()}`
          });
        } catch (notifError) {
          console.error('Error enviando notificación:', notifError);
        }

        return NextResponse.json({
          success: false,
          response: 'Lo siento, temporalmente no puedo procesar tu consulta. Te responderé pronto manualmente.',
          error: 'Cuota agotada'
        });
      }

      if (error.message.includes('invalid_api_key')) {
        errorType = 'API Key inválida';
        errorMessage = error.message;

        // Enviar notificación de error crítico
        try {
          // Telegram (prioritario)
          await notifyTechnicalErrorTelegram({
            errorType,
            errorMessage: 'La API Key de OpenAI es inválida. Se requiere configuración.',
            sessionId: `chat_${Date.now()}`
          });
          // Email (respaldo)
          await notifyTechnicalError({
            errorType,
            errorMessage: 'La API Key de OpenAI es inválida. Se requiere configuración.',
            sessionId: `chat_${Date.now()}`
          });
        } catch (notifError) {
          console.error('Error enviando notificación:', notifError);
        }

        return NextResponse.json({
          success: false,
          response: 'Disculpa, hay un problema técnico. Por favor contacta directamente.',
          error: 'API Key inválida'
        });
      }

      errorType = 'Error de API';
      errorMessage = error.message;
    }

    // Enviar notificación para errores generales
    try {
      // Telegram (prioritario)
      await notifyTechnicalErrorTelegram({
        errorType,
        errorMessage,
        sessionId: `chat_${Date.now()}`
      });
      // Email (respaldo)
      await notifyTechnicalError({
        errorType,
        errorMessage,
        sessionId: `chat_${Date.now()}`
      });
    } catch (notifError) {
      console.error('Error enviando notificación:', notifError);
    }

    // Respuesta de fallback
    return NextResponse.json({
      success: false,
      response: 'Gracias por tu mensaje. Un especialista te responderá pronto. ¿Hay algo específico en lo que pueda ayudarte?',
      error: 'Error procesando consulta'
    });
  }
}

// Función helper para detectar intenciones
function detectIntent(message: string): string {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('precio') || lowerMessage.includes('costo') || lowerMessage.includes('cuanto')) {
    return 'pricing';
  }
  if (lowerMessage.includes('chatbot') || lowerMessage.includes('bot')) {
    return 'chatbot';
  }
  if (lowerMessage.includes('automatización') || lowerMessage.includes('automatizar')) {
    return 'automation';
  }
  if (lowerMessage.includes('contacto') || lowerMessage.includes('hablar')) {
    return 'contact';
  }

  return 'general';
}