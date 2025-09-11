// Sistema de análisis de patrones para el chatbot
import { langSmithTracker } from './langsmith';

export interface ConversationPattern {
  question: string;
  frequency: number;
  avgRating: number;
  commonWords: string[];
  category: string;
  lastAsked: string;
}

export interface ProblemResponse {
  messageId: string;
  userMessage: string;
  botResponse: string;
  rating: number;
  comment: string;
  timestamp: string;
}

export class PatternAnalyzer {
  private static instance: PatternAnalyzer;
  private patterns: ConversationPattern[] = [];
  private problemResponses: ProblemResponse[] = [];

  static getInstance(): PatternAnalyzer {
    if (!PatternAnalyzer.instance) {
      PatternAnalyzer.instance = new PatternAnalyzer();
    }
    return PatternAnalyzer.instance;
  }

  // Analizar patrones de preguntas
  async analyzeQuestionPatterns(): Promise<ConversationPattern[]> {
    try {
      // Obtener datos de LangSmith (simulado - en producción usarías la API real)
      const conversations = await this.getConversationsFromLangSmith();
      
      // Procesar patrones
      this.patterns = this.processQuestionPatterns(conversations);
      
      // Guardar en localStorage para análisis local
      localStorage.setItem('chatbot_patterns', JSON.stringify(this.patterns));
      
      return this.patterns;
    } catch (error) {
      console.error('Error al analizar patrones:', error);
      return [];
    }
  }

  // Identificar respuestas problemáticas
  async identifyProblemResponses(): Promise<ProblemResponse[]> {
    try {
      // Obtener feedback de localStorage
      const feedback = JSON.parse(localStorage.getItem('chatbot_feedback') || '[]');
      
      // Filtrar respuestas con rating bajo
      this.problemResponses = feedback.filter((f: any) => f.rating <= 2);
      
      // Guardar análisis
      localStorage.setItem('problem_responses', JSON.stringify(this.problemResponses));
      
      return this.problemResponses;
    } catch (error) {
      console.error('Error al identificar respuestas problemáticas:', error);
      return [];
    }
  }

  // Obtener estadísticas de uso
  getUsageStats() {
    const patterns = JSON.parse(localStorage.getItem('chatbot_patterns') || '[]');
    const feedback = JSON.parse(localStorage.getItem('chatbot_feedback') || '[]');
    const metrics = JSON.parse(localStorage.getItem('chatbot_metrics') || '[]');

    return {
      totalConversations: metrics.length,
      totalFeedback: feedback.length,
      avgRating: this.calculateAverageRating(feedback),
      mostCommonQuestions: this.getMostCommonQuestions(patterns),
      problemAreas: this.getProblemAreas(feedback),
      usageByHour: this.getUsageByHour(metrics),
      usageByDay: this.getUsageByDay(metrics)
    };
  }

  // Generar reporte de análisis
  async generateAnalysisReport(): Promise<string> {
    const patterns = await this.analyzeQuestionPatterns();
    const problems = await this.identifyProblemResponses();
    const stats = this.getUsageStats();

    const report = `
# 📊 REPORTE DE ANÁLISIS DEL CHATBOT

## 📈 ESTADÍSTICAS GENERALES
- **Total de conversaciones:** ${stats.totalConversations}
- **Total de feedback:** ${stats.totalFeedback}
- **Rating promedio:** ${stats.avgRating.toFixed(2)}/5

## 🔥 PREGUNTAS MÁS COMUNES
${stats.mostCommonQuestions.map((q, i) => `${i + 1}. ${q.question} (${q.frequency} veces)`).join('\n')}

## ⚠️ ÁREAS PROBLEMÁTICAS
${stats.problemAreas.map(area => `- ${area.category}: ${area.count} problemas`).join('\n')}

## 📅 USO POR HORARIO
${stats.usageByHour.map((hour, i) => `${i}:00 - ${hour} conversaciones`).join('\n')}

## 🎯 RECOMENDACIONES
${this.generateRecommendations(patterns, problems, stats)}
    `;

    return report;
  }

  // Métodos privados
  private async getConversationsFromLangSmith(): Promise<any[]> {
    // En producción, esto haría una llamada real a la API de LangSmith
    // Por ahora, simulamos con datos de localStorage
    const metrics = JSON.parse(localStorage.getItem('chatbot_metrics') || '[]');
    return metrics.map((m: any) => ({
      userMessage: m.userMessage,
      botResponse: m.botResponse,
      timestamp: m.timestamp
    }));
  }

  private processQuestionPatterns(conversations: any[]): ConversationPattern[] {
    const questionMap = new Map<string, {
      count: number;
      ratings: number[];
      words: string[];
      lastAsked: string;
    }>();

    conversations.forEach(conv => {
      const question = conv.userMessage.toLowerCase();
      const words = question.split(' ').filter(w => w.length > 3);
      
      if (questionMap.has(question)) {
        const existing = questionMap.get(question)!;
        existing.count++;
        existing.words.push(...words);
        existing.lastAsked = conv.timestamp;
      } else {
        questionMap.set(question, {
          count: 1,
          ratings: [],
          words,
          lastAsked: conv.timestamp
        });
      }
    });

    return Array.from(questionMap.entries()).map(([question, data]) => ({
      question,
      frequency: data.count,
      avgRating: data.ratings.length > 0 ? data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length : 0,
      commonWords: this.getMostCommonWords(data.words),
      category: this.categorizeQuestion(question),
      lastAsked: data.lastAsked
    })).sort((a, b) => b.frequency - a.frequency);
  }

  private getMostCommonWords(words: string[]): string[] {
    const wordCount = new Map<string, number>();
    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });
    
    return Array.from(wordCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }

  private categorizeQuestion(question: string): string {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('precio') || lowerQuestion.includes('costo') || lowerQuestion.includes('cuanto')) {
      return 'precios';
    } else if (lowerQuestion.includes('ayuda') || lowerQuestion.includes('soporte') || lowerQuestion.includes('problema')) {
      return 'soporte';
    } else if (lowerQuestion.includes('producto') || lowerQuestion.includes('servicio')) {
      return 'productos';
    } else if (lowerQuestion.includes('contacto') || lowerQuestion.includes('telefono') || lowerQuestion.includes('email')) {
      return 'contacto';
    } else {
      return 'general';
    }
  }

  private calculateAverageRating(feedback: any[]): number {
    if (feedback.length === 0) return 0;
    const total = feedback.reduce((sum, f) => sum + f.rating, 0);
    return total / feedback.length;
  }

  private getMostCommonQuestions(patterns: ConversationPattern[]): ConversationPattern[] {
    return patterns.slice(0, 10);
  }

  private getProblemAreas(feedback: any[]): Array<{category: string, count: number}> {
    const problemMap = new Map<string, number>();
    
    feedback.filter(f => f.rating <= 2).forEach(f => {
      const category = f.category || 'general';
      problemMap.set(category, (problemMap.get(category) || 0) + 1);
    });

    return Array.from(problemMap.entries()).map(([category, count]) => ({
      category,
      count
    }));
  }

  private getUsageByHour(metrics: any[]): number[] {
    const hourlyUsage = new Array(24).fill(0);
    
    metrics.forEach(m => {
      const hour = new Date(m.timestamp).getHours();
      hourlyUsage[hour]++;
    });

    return hourlyUsage;
  }

  private getUsageByDay(metrics: any[]): number[] {
    const dailyUsage = new Array(7).fill(0);
    
    metrics.forEach(m => {
      const day = new Date(m.timestamp).getDay();
      dailyUsage[day]++;
    });

    return dailyUsage;
  }

  private generateRecommendations(patterns: ConversationPattern[], problems: ProblemResponse[], stats: any): string {
    const recommendations = [];

    // Recomendación basada en rating promedio
    if (stats.avgRating < 3) {
      recommendations.push('🔴 Rating promedio bajo: Revisar calidad de respuestas');
    } else if (stats.avgRating < 4) {
      recommendations.push('🟡 Rating promedio medio: Mejorar respuestas específicas');
    } else {
      recommendations.push('🟢 Rating promedio alto: Mantener calidad actual');
    }

    // Recomendación basada en preguntas comunes
    if (patterns.length > 0) {
      const topQuestion = patterns[0];
      recommendations.push(`📝 Pregunta más común: "${topQuestion.question}" - Considerar FAQ`);
    }

    // Recomendación basada en problemas
    if (problems.length > 0) {
      recommendations.push(`⚠️ ${problems.length} respuestas problemáticas identificadas - Revisar y mejorar`);
    }

    // Recomendación basada en uso
    if (stats.totalConversations > 100) {
      recommendations.push('📈 Alto volumen de uso - Considerar escalabilidad');
    }

    return recommendations.join('\n');
  }
}

// Instancia global
export const patternAnalyzer = PatternAnalyzer.getInstance();
