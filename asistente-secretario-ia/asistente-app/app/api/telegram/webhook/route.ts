import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse, analyzeImage, transcribeAudio } from '@/lib/services/openai';
import {
  searchSimilarConversations,
  saveConversationWithEmbedding,
  buildContextFromConversations,
} from '@/lib/services/rag';
import { addItemsToList, getUserLists } from '@/lib/services/lists';

/**
 * POST /api/telegram/webhook
 * Webhook para recibir mensajes de Telegram
 */
export async function POST(req: NextRequest) {
  try {
    const update = await req.json();

    // Verificar secret (opcional pero recomendado)
    const secret = req.headers.get('x-telegram-bot-api-secret-token');
    if (secret !== process.env.TELEGRAM_WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extraer información del mensaje
    const message = update.message;
    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat.id;
    const userId = message.from.id;
    const text = message.text;
    const photo = message.photo;
    const voice = message.voice;

    let userMessage = '';
    let responseText = '';

    // 1. PROCESAMIENTO MULTIMODAL
    if (text) {
      // Mensaje de texto normal
      userMessage = text;
      responseText = await processTextMessage(chatId, text);
    } else if (photo) {
      // Procesamiento de imagen
      const photoUrl = await getTelegramFileUrl(photo[photo.length - 1].file_id);
      const imageAnalysis = await analyzeImage(
        photoUrl,
        'Analiza esta imagen y describe qué ves. Si parece ser una lista de items, extráelos.'
      );
      userMessage = `[Imagen enviada]`;
      responseText = imageAnalysis;

      // Guardar conversación
      await saveConversationWithEmbedding(chatId, userMessage, imageAnalysis);
    } else if (voice) {
      // Procesamiento de voz
      const voiceUrl = await getTelegramFileUrl(voice.file_id);
      // Nota: Necesitas descargar el archivo y convertirlo a File para Whisper
      responseText = 'Procesamiento de voz en desarrollo...';
    }

    // 2. ENVIAR RESPUESTA A TELEGRAM
    await sendTelegramMessage(chatId, responseText);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error in telegram webhook:', error);
    return NextResponse.json({ ok: true }); // Siempre responder ok a Telegram
  }
}

/**
 * Procesa un mensaje de texto con RAG
 */
async function processTextMessage(chatId: number, text: string): Promise<string> {
  const SYSTEM_PROMPT = `Eres un asistente personal inteligente llamado "Super Humano Digital".

Ayudas al usuario a gestionar listas, recordar información y organizar su vida.

Cuando detectes que el usuario quiere agregar items a una lista:
- Identifica el tipo de lista (supermercado, tareas, películas, etc.)
- Extrae los items mencionados
- Confirma la acción al usuario

Responde de forma natural y amigable en español.`;

  // 1. Buscar contexto con RAG
  const relevantConversations = await searchSimilarConversations(text, chatId, {
    matchThreshold: 0.7,
    matchCount: 5,
  });

  const contextFromRAG = buildContextFromConversations(relevantConversations);

  // 2. Generar respuesta
  const aiResponse = await generateChatResponse([
    {
      role: 'system',
      content: SYSTEM_PROMPT + contextFromRAG,
    },
    {
      role: 'user',
      content: text,
    },
  ]);

  // 3. Detectar acciones (agregar a lista, etc.)
  await detectAndExecuteActions(chatId, text, aiResponse);

  // 4. Guardar conversación
  await saveConversationWithEmbedding(chatId, text, aiResponse, []);

  return aiResponse;
}

/**
 * Detecta y ejecuta acciones estructuradas
 */
async function detectAndExecuteActions(
  chatId: number,
  userMessage: string,
  aiResponse: string
): Promise<void> {
  const lowerMessage = userMessage.toLowerCase();

  // Detectar comando "ver mis listas"
  if (
    lowerMessage.includes('ver mis listas') ||
    lowerMessage.includes('muestra mis listas') ||
    lowerMessage.includes('qué listas tengo')
  ) {
    const lists = await getUserLists(chatId);
    const listNames = lists.map((l) => `- ${l.titulo || l.tipo} (${l.items.length} items)`);

    if (listNames.length > 0) {
      await sendTelegramMessage(
        chatId,
        `📋 Tus listas:\n${listNames.join('\n')}`
      );
    } else {
      await sendTelegramMessage(chatId, 'No tienes listas creadas aún.');
    }
  }

  // Detectar agregado a lista
  const listKeywords = ['agregar', 'añadir', 'agrega', 'añade', 'comprar'];
  const hasListAction = listKeywords.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  if (hasListAction) {
    let listType = 'general';
    if (lowerMessage.includes('supermercado') || lowerMessage.includes('comprar')) {
      listType = 'supermercado';
    } else if (lowerMessage.includes('tarea')) {
      listType = 'tareas';
    } else if (lowerMessage.includes('película') || lowerMessage.includes('pelicula')) {
      listType = 'peliculas';
    } else if (lowerMessage.includes('libro')) {
      listType = 'libros';
    }

    // Extraer items con GPT
    const extractionPrompt = `Extrae los items que el usuario quiere agregar a su lista.
Mensaje: "${userMessage}"
Responde solo con un array JSON de strings. Ejemplo: ["leche", "pan", "huevos"]`;

    const itemsResponse = await generateChatResponse([
      { role: 'system', content: 'Eres un extractor de datos preciso.' },
      { role: 'user', content: extractionPrompt },
    ]);

    try {
      const items = JSON.parse(itemsResponse);
      if (Array.isArray(items) && items.length > 0) {
        await addItemsToList(chatId, listType, items);
        await sendTelegramMessage(
          chatId,
          `✅ Agregué ${items.length} items a tu lista de ${listType}:\n${items.map((i) => `• ${i}`).join('\n')}`
        );
      }
    } catch (e) {
      console.error('Error parsing items:', e);
    }
  }
}

/**
 * Envía mensaje a Telegram
 */
async function sendTelegramMessage(chatId: number, text: string): Promise<void> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'HTML',
    }),
  });
}

/**
 * Obtiene URL de archivo de Telegram
 */
async function getTelegramFileUrl(fileId: string): Promise<string> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`
  );
  const data = await response.json();
  return `https://api.telegram.org/file/bot${botToken}/${data.result.file_path}`;
}

/**
 * GET /api/telegram/webhook
 * Info del webhook
 */
export async function GET() {
  return NextResponse.json({
    status: 'Telegram webhook active',
    timestamp: new Date().toISOString(),
  });
}
