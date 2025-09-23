import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { langSmithTracker } from '@/lib/langsmith';
import { documentKnowledge } from '@/lib/document-knowledge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let userMessage = '';
  let botResponse = '';

  try {
    const { message, userId = 'web_user' } = await request.json();
    userMessage = message;

    if (!message) {
      return NextResponse.json({ error: 'Mensaje requerido' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        error: 'OpenAI API key no configurada'
      }, { status: 500 });
    }

    // Obtener contexto relevante de los documentos
    const knowledgeContext = documentKnowledge.getContextForPrompt(userMessage);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente virtual de Mente Autónoma, una empresa especializada en desarrollo web, chatbots inteligentes, automatización de procesos y consultoría en IA.

INFORMACIÓN DE LA EMPRESA:
- Servicios: Desarrollo web responsivo, Chatbots inteligentes, Automatización de procesos, Consultoría en IA, Capacitación tecnológica
- Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora, Capacitación $200.000 CLP/día
- Contacto: +56 9 1234 5678, email: contacto@empresa.com, ubicación: Antofagasta, Chile
- Horarios: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00
- Tecnologías: React, Vue.js, Angular, Node.js, Python, Django, Flask, OpenAI GPT, LangChain, TensorFlow, MongoDB, PostgreSQL, AWS, Google Cloud, Azure
- Casos de éxito: E-commerce con 300% aumento en ventas, Chatbot que redujo 80% consultas telefónicas, Automatización que ahorra 50% tiempo

INSTRUCCIONES:
- Responde siempre en español
- Sé profesional pero amigable
- Proporciona información específica cuando sea posible
- Si no sabes algo, ofrece contactar con el equipo
- Mantén las respuestas concisas pero informativas
- Usa emojis ocasionalmente para ser más amigable${knowledgeContext}`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    botResponse = completion.choices[0]?.message?.content || 'Lo siento, no pude procesar tu mensaje.';

    // Registrar conversación en LangSmith solo si está configurado
    try {
      await langSmithTracker.trackConversation(
        userMessage,
        botResponse,
        userId,
        'web'
      );
    } catch (langsmithError) {
      console.warn('LangSmith tracking error (ignorado):', langsmithError);
    }

    return NextResponse.json({ 
      response: botResponse,
      status: 'success',
      langsmith_enabled: langSmithTracker.isEnabled()
    });

  } catch (error) {
    console.error('Error en OpenAI API:', error);
    const errorMsg = 'Error interno del servidor';

    // Registrar error en LangSmith solo si está configurado
    try {
      await langSmithTracker.trackError(userMessage, errorMsg, 'web_user');
    } catch (langsmithError) {
      console.warn('LangSmith tracking error (ignorado):', langsmithError);
    }

    return NextResponse.json({
      error: errorMsg,
      response: 'Lo siento, hay un problema técnico. Por favor intenta de nuevo o contacta directamente a +56 9 1234 5678.',
      langsmith_enabled: false
    }, { status: 500 });
  }
}
