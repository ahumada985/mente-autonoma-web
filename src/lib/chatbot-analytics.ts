// Sistema de análisis para el chatbot
import { langSmithTracker } from './langsmith';
import { PerformanceTracker } from './performance-tracker';
import { feedbackManager } from './supabase-feedback';

export class ChatbotAnalytics {
  private performanceTracker: PerformanceTracker;
  private sessionId: string;

  constructor() {
    this.performanceTracker = new PerformanceTracker();
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Método principal para trackear conversaciones con métricas completas
  async trackConversationWithMetrics(
    userMessage: string,
    botResponse: string,
    userId: string = 'web_user',
    channel: string = 'web'
  ) {
    // Calcular métricas de rendimiento
    const responseTime = this.performanceTracker.getDuration();
    const inputTokens = PerformanceTracker.estimateTokens(userMessage);
    const outputTokens = PerformanceTracker.estimateTokens(botResponse);
    const totalTokens = inputTokens + outputTokens;
    const costEstimate = PerformanceTracker.estimateCost(inputTokens, outputTokens);

    // Obtener información del navegador y página
    const browserInfo = PerformanceTracker.getBrowserInfo();
    const pageInfo = PerformanceTracker.getPageInfo();

    // Determinar tipo de usuario (puedes implementar tu lógica)
    const userType = this.determineUserType(userId);

    // Trackear en LangSmith con métricas completas
    await langSmithTracker.trackConversation(
      userMessage,
      botResponse,
      userId,
      channel,
      {
        session_id: this.sessionId,
        user_type: userType,
        response_time_ms: responseTime,
        tokens_used: totalTokens,
        cost_estimate: costEstimate,
        user_agent: browserInfo.user_agent,
        ip_address: 'client-side', // En el servidor obtendrías la IP real
        page_url: pageInfo.url,
        // Métricas adicionales
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        browser_language: browserInfo.language,
        viewport_width: pageInfo.viewport.width,
        viewport_height: pageInfo.viewport.height
      }
    );

    // También trackear en localStorage para análisis local
    this.trackLocalMetrics({
      userMessage,
      botResponse,
      responseTime,
      totalTokens,
      costEstimate,
      timestamp: new Date().toISOString()
    });
  }

  private determineUserType(userId: string): string {
    // Implementa tu lógica para determinar el tipo de usuario
    // Por ejemplo, basado en localStorage, cookies, o API call
    const userType = localStorage.getItem(`user_type_${userId}`);
    return userType || 'free';
  }

  private trackLocalMetrics(data: any) {
    // Guardar métricas en sessionStorage para análisis de sesión actual
    const metrics = JSON.parse(sessionStorage.getItem('chatbot_metrics') || '[]');
    metrics.push(data);
    
    // Mantener solo los últimos 100 registros
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }
    
    sessionStorage.setItem('chatbot_metrics', JSON.stringify(metrics));
  }

  // Obtener métricas locales para análisis
  getLocalMetrics() {
    const metrics = JSON.parse(sessionStorage.getItem('chatbot_metrics') || '[]');
    return this.analyzeMetrics(metrics);
  }

  private analyzeMetrics(metrics: any[]) {
    if (metrics.length === 0) return null;

    const totalConversations = metrics.length;
    const avgResponseTime = metrics.reduce((sum, m) => sum + m.responseTime, 0) / totalConversations;
    const totalTokens = metrics.reduce((sum, m) => sum + m.totalTokens, 0);
    const totalCost = metrics.reduce((sum, m) => sum + m.costEstimate, 0);

    return {
      totalConversations,
      avgResponseTime: Math.round(avgResponseTime),
      totalTokens,
      totalCost: Math.round(totalCost * 1000) / 1000, // Redondear a 3 decimales
      avgTokensPerConversation: Math.round(totalTokens / totalConversations),
      avgCostPerConversation: Math.round((totalCost / totalConversations) * 1000) / 1000
    };
  }

  // Iniciar medición de tiempo
  startTiming() {
    this.performanceTracker.start();
  }

  // Finalizar medición de tiempo y obtener duración
  endTiming() {
    this.performanceTracker.end();
    return this.performanceTracker.getDuration();
  }

  // Obtener estadísticas en tiempo real
  getRealTimeStats() {
    const metrics = this.getLocalMetrics();
    if (!metrics) return null;

    return {
      ...metrics,
      sessionId: this.sessionId,
      currentTime: new Date().toISOString()
    };
  }

  // Trackear calificación de respuesta
  async trackRating(messageId: string, rating: 'thumbs_up' | 'thumbs_down') {
    const ratingData = {
      message_id: messageId,
      rating,
      session_id: this.sessionId
    };

    // Guardar en Supabase (persistencia en la nube)
    await feedbackManager.saveRating(ratingData);

    // También guardar en localStorage como fallback
    const ratings = JSON.parse(localStorage.getItem('chatbot_ratings') || '[]');
    ratings.push({
      ...ratingData,
      messageId: ratingData.message_id,
      sessionId: ratingData.session_id,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('chatbot_ratings', JSON.stringify(ratings));

    // También guardar en sessionStorage para analytics de sesión
    const sessionRatings = JSON.parse(sessionStorage.getItem('chatbot_session_ratings') || '[]');
    sessionRatings.push({
      messageId: ratingData.message_id,
      rating: ratingData.rating,
      timestamp: new Date().toISOString(),
      sessionId: ratingData.session_id
    });
    sessionStorage.setItem('chatbot_session_ratings', JSON.stringify(sessionRatings));

    console.log('📊 Rating tracked:', ratingData);
  }

  // Trackear feedback específico
  async trackFeedback(messageId: string, feedback: string) {
    const feedbackData = {
      message_id: messageId,
      feedback,
      session_id: this.sessionId
    };

    // Guardar en Supabase (persistencia en la nube)
    await feedbackManager.saveFeedback(feedbackData);

    // También guardar en localStorage como fallback
    const feedbacks = JSON.parse(localStorage.getItem('chatbot_feedbacks') || '[]');
    feedbacks.push({
      ...feedbackData,
      messageId: feedbackData.message_id,
      sessionId: feedbackData.session_id,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('chatbot_feedbacks', JSON.stringify(feedbacks));

    // También guardar en sessionStorage para analytics de sesión
    const sessionFeedbacks = JSON.parse(sessionStorage.getItem('chatbot_session_feedbacks') || '[]');
    sessionFeedbacks.push({
      messageId: feedbackData.message_id,
      feedback: feedbackData.feedback,
      timestamp: new Date().toISOString(),
      sessionId: feedbackData.session_id
    });
    sessionStorage.setItem('chatbot_session_feedbacks', JSON.stringify(sessionFeedbacks));

    console.log('📝 Feedback tracked:', feedbackData);
  }

  // Obtener estadísticas de calificaciones
  getRatingStats() {
    const ratings = JSON.parse(sessionStorage.getItem('chatbot_session_ratings') || '[]');
    const feedbacks = JSON.parse(sessionStorage.getItem('chatbot_session_feedbacks') || '[]');

    const thumbsUp = ratings.filter((r: any) => r.rating === 'thumbs_up').length;
    const thumbsDown = ratings.filter((r: any) => r.rating === 'thumbs_down').length;
    const totalRatings = ratings.length;
    const satisfactionRate = totalRatings > 0 ? (thumbsUp / totalRatings) * 100 : 0;

    return {
      totalRatings,
      thumbsUp,
      thumbsDown,
      satisfactionRate: Math.round(satisfactionRate),
      totalFeedbacks: feedbacks.length,
      recentFeedbacks: feedbacks.slice(-5) // Últimos 5 feedbacks
    };
  }
}

// Instancia global para usar en toda la aplicación
export const chatbotAnalytics = new ChatbotAnalytics();
