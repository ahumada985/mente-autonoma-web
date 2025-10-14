import { supabaseAdmin } from '../supabase';
import { generateEmbedding } from './openai';
import type { SearchConversationResult } from '../types/database';

/**
 * Busca conversaciones similares usando embeddings (RAG)
 */
export async function searchSimilarConversations(
  query: string,
  chatId: number,
  options: {
    matchThreshold?: number;
    matchCount?: number;
  } = {}
): Promise<SearchConversationResult[]> {
  const { matchThreshold = 0.7, matchCount = 5 } = options;

  try {
    // 1. Generar embedding de la consulta
    const queryEmbedding = await generateEmbedding(query);

    // 2. Buscar conversaciones similares usando la función RPC
    const { data, error } = await supabaseAdmin.rpc('search_conversations', {
      query_embedding: queryEmbedding,
      user_chat_id: chatId,
      match_threshold: matchThreshold,
      match_count: matchCount,
    });

    if (error) {
      console.error('Error searching conversations:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in RAG search:', error);
    return [];
  }
}

/**
 * Guarda una conversación con su embedding
 */
export async function saveConversationWithEmbedding(
  chatId: number,
  userMessage: string,
  aiResponse: string,
  contextUsed: any[] = []
) {
  try {
    // Generar embedding del mensaje + respuesta
    const textToEmbed = `Usuario: ${userMessage}\nAsistente: ${aiResponse}`;
    const embedding = await generateEmbedding(textToEmbed);

    // Guardar en la base de datos
    const { data, error } = await supabaseAdmin
      .from('assistant_conversations')
      .insert({
        chat_id: chatId,
        user_message: userMessage,
        ai_response: aiResponse,
        embedding,
        context_used: contextUsed,
        metadata: {
          embedding_model: 'text-embedding-3-small',
          timestamp: new Date().toISOString(),
        },
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving conversation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in saveConversationWithEmbedding:', error);
    throw error;
  }
}

/**
 * Construye contexto para el prompt basado en conversaciones previas
 */
export function buildContextFromConversations(
  conversations: SearchConversationResult[]
): string {
  if (conversations.length === 0) {
    return '';
  }

  const contextLines = conversations.map((conv, index) => {
    return `[Conversación previa ${index + 1} (similaridad: ${(conv.similarity * 100).toFixed(1)}%)]
Usuario: ${conv.user_message}
Asistente: ${conv.ai_response}`;
  });

  return `\n\nCONTEXTO DE CONVERSACIONES PREVIAS:\n${contextLines.join('\n\n')}`;
}
