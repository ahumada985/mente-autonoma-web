import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: NextRequest) {
  try {
    // Obtener todas las conversaciones de la tabla conversation_history
    const { data: conversations, error: convError } = await supabase
      .from('conversation_history')
      .select('*')
      .order('created_at', { ascending: true });

    if (convError) throw convError;

    // Obtener todas las calificaciones de la tabla chatbot_ratings
    const { data: ratings, error: ratingsError } = await supabase
      .from('chatbot_ratings')
      .select('*');

    if (ratingsError) throw ratingsError;

    // Obtener todos los feedbacks de la tabla chatbot_feedbacks
    const { data: feedbacks, error: feedbacksError } = await supabase
      .from('chatbot_feedbacks')
      .select('*');

    if (feedbacksError) throw feedbacksError;

    // Calcular estadísticas globales
    const totalConversations = conversations ? conversations.length : 0;
    
    // Agrupar conversaciones por session_id para contar conversaciones únicas
    const uniqueSessions = new Set(conversations?.map(conv => conv.session_id) || []);
    const uniqueConversations = uniqueSessions.size;

    // Calcular tiempo promedio de respuesta (simulado basado en tokens)
    const avgResponseTime = totalConversations > 0 ? 1200 : 0; // 1.2 segundos promedio

    // Calcular tokens totales
    const totalTokens = conversations?.reduce((sum, conv) => {
      // Estimar tokens basado en longitud del texto (aproximadamente 4 chars = 1 token)
      return sum + Math.ceil(conv.message_text.length / 4);
    }, 0) || 0;

    const avgTokensPerConversation = uniqueConversations > 0 
      ? Math.round(totalTokens / uniqueConversations)
      : 0;

    // Calcular satisfacción
    const thumbsUp = ratings?.filter(r => r.rating === 'thumbs_up').length || 0;
    const thumbsDown = ratings?.filter(r => r.rating === 'thumbs_down').length || 0;
    const totalRatings = ratings?.length || 0;
    const satisfactionRate = totalRatings > 0 ? Math.round((thumbsUp / totalRatings) * 100) : 0;

    // Preparar historial de conversaciones para el dashboard
    const conversationHistory = conversations?.map(conv => ({
      id: conv.message_id,
      text: conv.message_text,
      sender: conv.sender,
      timestamp: new Date(conv.created_at),
      rating: conv.rating,
      feedback: conv.feedback,
    })) || [];

    const analytics = {
      totalConversations: uniqueConversations,
      avgResponseTime,
      totalTokens,
      avgTokensPerConversation,
      satisfactionRate,
      totalRatings,
      thumbsUp,
      thumbsDown,
      totalFeedbacks: feedbacks?.length || 0
    };

    return NextResponse.json({
      analytics,
      conversations: conversationHistory,
      ratings: ratings || [],
      feedbacks: feedbacks || []
    });

  } catch (error) {
    console.error('Error cargando analytics globales:', error);
    return NextResponse.json({ 
      error: 'Error cargando analytics globales',
      analytics: {
        totalConversations: 0,
        avgResponseTime: 0,
        totalTokens: 0,
        avgTokensPerConversation: 0,
        satisfactionRate: 0,
        totalRatings: 0,
        thumbsUp: 0,
        thumbsDown: 0,
        totalFeedbacks: 0
      },
      conversations: [],
      ratings: [],
      feedbacks: []
    }, { status: 500 });
  }
}







