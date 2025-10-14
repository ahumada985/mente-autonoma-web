import { NextRequest, NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/services/openai';
import {
  searchSimilarConversations,
  saveConversationWithEmbedding,
  buildContextFromConversations,
} from '@/lib/services/rag';
import { addItemsToList } from '@/lib/services/lists';

/**
 * Sistema de prompts del asistente
 */
const SYSTEM_PROMPT = `Eres un asistente personal inteligente llamado "Super Humano Digital".

Tu función principal es ayudar al usuario a:
- Gestionar listas personalizadas (supermercado, tareas, películas, libros, etc.)
- Recordar información importante de conversaciones pasadas
- Responder preguntas sobre su historial
- Organizar su vida de forma eficiente

IMPORTANTE:
- Cuando el usuario mencione items para agregar a listas, detecta el tipo de lista y los items
- Responde en formato JSON cuando detectes una acción estructurada
- Sé conversacional y amigable en español

Ejemplos de acciones:
1. "Agregar leche y pan a mi lista de supermercado"
   → Detectar: tipo="supermercado", items=["leche", "pan"], accion="agregar"

2. "¿Qué libros he agregado este mes?"
   → Buscar en conversaciones previas con RAG

3. "Recuérdame comprar flores mañana"
   → accion="recordatorio", contenido="comprar flores", fecha="mañana"`;

/**
 * POST /api/chat
 * Endpoint principal del chatbot con RAG
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, chatId } = body;

    if (!message || !chatId) {
      return NextResponse.json(
        { error: 'message y chatId son requeridos' },
        { status: 400 }
      );
    }

    // 1. Buscar contexto relevante con RAG
    const relevantConversations = await searchSimilarConversations(
      message,
      chatId,
      {
        matchThreshold: 0.7,
        matchCount: 5,
      }
    );

    // 2. Construir contexto del prompt
    const contextFromRAG = buildContextFromConversations(relevantConversations);

    // 3. Generar respuesta con OpenAI
    const aiResponse = await generateChatResponse([
      {
        role: 'system',
        content: SYSTEM_PROMPT + contextFromRAG,
      },
      {
        role: 'user',
        content: message,
      },
    ]);

    // 4. Detectar si hay acciones estructuradas (agregar a lista, etc.)
    const action = await detectAction(message, aiResponse, chatId);

    // 5. Guardar conversación con embedding (para futuro RAG)
    await saveConversationWithEmbedding(
      chatId,
      message,
      aiResponse,
      relevantConversations.map((conv) => ({
        id: conv.id,
        similarity: conv.similarity,
      }))
    );

    return NextResponse.json({
      response: aiResponse,
      action,
      contextUsed: relevantConversations.length,
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Error procesando mensaje' },
      { status: 500 }
    );
  }
}

/**
 * Detecta acciones estructuradas en el mensaje
 */
async function detectAction(
  userMessage: string,
  aiResponse: string,
  chatId: number
): Promise<any> {
  const lowerMessage = userMessage.toLowerCase();

  // Detectar agregado a lista
  const listKeywords = [
    'agregar',
    'añadir',
    'agrega',
    'añade',
    'lista de',
    'comprar',
  ];
  const hasListAction = listKeywords.some((keyword) =>
    lowerMessage.includes(keyword)
  );

  if (hasListAction) {
    // Detectar tipo de lista
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

    // Usar GPT para extraer items
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
        // Agregar items a la lista
        await addItemsToList(chatId, listType, items);

        return {
          type: 'list_add',
          listType,
          items,
          success: true,
        };
      }
    } catch (e) {
      console.error('Error parsing items:', e);
    }
  }

  return null;
}
