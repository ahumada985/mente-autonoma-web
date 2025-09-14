// Cliente de Supabase para sistema de feedbacks y ratings
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Interfaces para TypeScript
export interface ChatbotRating {
  id?: string;
  message_id: string;
  session_id: string;
  rating: 'thumbs_up' | 'thumbs_down';
  user_id?: string;
  user_agent?: string;
  page_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatbotFeedback {
  id?: string;
  message_id: string;
  session_id: string;
  feedback: string;
  user_id?: string;
  user_agent?: string;
  page_url?: string;
  is_processed?: boolean;
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ChatbotConversation {
  id?: string;
  session_id: string;
  user_message: string;
  bot_response: string;
  user_id?: string;
  response_time_ms?: number;
  tokens_used?: number;
  user_agent?: string;
  page_url?: string;
  created_at?: string;
}

export interface SatisfactionStats {
  date: string;
  total_ratings: number;
  thumbs_up: number;
  thumbs_down: number;
  satisfaction_rate: number;
}

export interface UnprocessedFeedback {
  id: string;
  message_id: string;
  session_id: string;
  feedback: string;
  user_id: string;
  user_agent: string;
  page_url: string;
  is_processed: boolean;
  admin_notes: string;
  created_at: string;
  updated_at: string;
  user_message: string;
  bot_response: string;
  conversation_date: string;
}

// Clase para manejar feedbacks y ratings
export class FeedbackManager {
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  // Guardar rating en Supabase
  async saveRating(rating: Omit<ChatbotRating, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('chatbot_ratings')
        .insert([{
          ...rating,
          session_id: this.sessionId,
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          user_id: 'web_user'
        }]);

      if (error) {
        console.error('Error saving rating:', error);
        throw error;
      }

      console.log('✅ Rating saved to Supabase');
    } catch (error) {
      console.error('Failed to save rating:', error);
      // Fallback: guardar en localStorage
      this.saveRatingToLocalStorage(rating);
    }
  }

  // Guardar feedback en Supabase
  async saveFeedback(feedback: Omit<ChatbotFeedback, 'id' | 'created_at' | 'updated_at'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('chatbot_feedbacks')
        .insert([{
          ...feedback,
          session_id: this.sessionId,
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          user_id: 'web_user',
          is_processed: false
        }]);

      if (error) {
        console.error('Error saving feedback:', error);
        throw error;
      }

      console.log('✅ Feedback saved to Supabase');
    } catch (error) {
      console.error('Failed to save feedback:', error);
      // Fallback: guardar en localStorage
      this.saveFeedbackToLocalStorage(feedback);
    }
  }

  // Guardar conversación en Supabase
  async saveConversation(conversation: Omit<ChatbotConversation, 'id' | 'created_at'>): Promise<void> {
    try {
      const { error } = await supabase
        .from('chatbot_conversations')
        .insert([{
          ...conversation,
          session_id: this.sessionId,
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          user_id: 'web_user'
        }]);

      if (error) {
        console.error('Error saving conversation:', error);
        throw error;
      }

      console.log('✅ Conversation saved to Supabase');
    } catch (error) {
      console.error('Failed to save conversation:', error);
    }
  }

  // Obtener estadísticas de satisfacción
  async getSatisfactionStats(days: number = 7): Promise<SatisfactionStats[]> {
    try {
      const { data, error } = await supabase
        .from('chatbot_satisfaction_stats')
        .select('*')
        .gte('date', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0])
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching satisfaction stats:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch satisfaction stats:', error);
      return [];
    }
  }

  // Obtener feedbacks no procesados
  async getUnprocessedFeedbacks(): Promise<UnprocessedFeedback[]> {
    try {
      const { data, error } = await supabase
        .from('unprocessed_feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching unprocessed feedbacks:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Failed to fetch unprocessed feedbacks:', error);
      return [];
    }
  }

  // Marcar feedback como procesado
  async markFeedbackAsProcessed(feedbackId: string, adminNotes?: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('chatbot_feedbacks')
        .update({ 
          is_processed: true,
          admin_notes: adminNotes,
          updated_at: new Date().toISOString()
        })
        .eq('id', feedbackId);

      if (error) {
        console.error('Error marking feedback as processed:', error);
        throw error;
      }

      console.log('✅ Feedback marked as processed');
    } catch (error) {
      console.error('Failed to mark feedback as processed:', error);
    }
  }

  // Suscribirse a cambios en tiempo real
  subscribeToFeedbacks(callback: (feedbacks: UnprocessedFeedback[]) => void) {
    return supabase
      .channel('feedbacks_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'chatbot_feedbacks' 
        }, 
        async () => {
          const feedbacks = await this.getUnprocessedFeedbacks();
          callback(feedbacks);
        }
      )
      .subscribe();
  }

  // Suscribirse a cambios en ratings
  subscribeToRatings(callback: (stats: SatisfactionStats[]) => void) {
    return supabase
      .channel('ratings_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'chatbot_ratings' 
        }, 
        async () => {
          const stats = await this.getSatisfactionStats(7);
          callback(stats);
        }
      )
      .subscribe();
  }

  // Fallback: guardar en localStorage
  private saveRatingToLocalStorage(rating: Omit<ChatbotRating, 'id' | 'created_at' | 'updated_at'>): void {
    const ratings = JSON.parse(localStorage.getItem('chatbot_ratings') || '[]');
    ratings.push({
      ...rating,
      id: `local_${Date.now()}`,
      created_at: new Date().toISOString()
    });
    localStorage.setItem('chatbot_ratings', JSON.stringify(ratings));
  }

  private saveFeedbackToLocalStorage(feedback: Omit<ChatbotFeedback, 'id' | 'created_at' | 'updated_at'>): void {
    const feedbacks = JSON.parse(localStorage.getItem('chatbot_feedbacks') || '[]');
    feedbacks.push({
      ...feedback,
      id: `local_${Date.now()}`,
      created_at: new Date().toISOString()
    });
    localStorage.setItem('chatbot_feedbacks', JSON.stringify(feedbacks));
  }
}

// Instancia global
export const feedbackManager = new FeedbackManager(
  typeof window !== 'undefined' ? `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` : 'server_session'
);
