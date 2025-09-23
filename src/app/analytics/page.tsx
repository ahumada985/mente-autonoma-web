'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnalyticsData {
  totalConversations: number;
  avgResponseTime: number;
  totalTokens: number;
  avgTokensPerConversation: number;
  satisfactionRate: number;
  totalRatings: number;
  thumbsUp: number;
  thumbsDown: number;
  totalFeedbacks: number;
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalyticsData();
  }, []);

  const loadAnalyticsData = async () => {
    try {
      // Cargar analytics globales desde Supabase
      const response = await fetch('/api/analytics-global');
      if (response.ok) {
        const data = await response.json();
        setAnalyticsData(data.analytics);
        setConversationHistory(data.conversations || []);
        setLoading(false);
        return;
      }
      
      // Fallback a datos locales si no hay conexión a Supabase
      const metrics = JSON.parse(sessionStorage.getItem('chatbot_metrics') || '[]');
      const ratings = JSON.parse(sessionStorage.getItem('chatbot_session_ratings') || '[]');
      const feedbacks = JSON.parse(sessionStorage.getItem('chatbot_session_feedbacks') || '[]');
      const history = JSON.parse(localStorage.getItem('chatbot_conversation_history') || '[]');

      // Calcular estadísticas
      const totalConversations = metrics.length;
      const avgResponseTime = totalConversations > 0 
        ? Math.round(metrics.reduce((sum: number, m: any) => sum + m.responseTime, 0) / totalConversations)
        : 0;
      const totalTokens = metrics.reduce((sum: number, m: any) => sum + m.totalTokens, 0);
      const avgTokensPerConversation = totalConversations > 0 
        ? Math.round(totalTokens / totalConversations)
        : 0;

      // Calcular satisfacción
      const thumbsUp = ratings.filter((r: any) => r.rating === 'thumbs_up').length;
      const thumbsDown = ratings.filter((r: any) => r.rating === 'thumbs_down').length;
      const totalRatings = ratings.length;
      const satisfactionRate = totalRatings > 0 ? Math.round((thumbsUp / totalRatings) * 100) : 0;

      setAnalyticsData({
        totalConversations,
        avgResponseTime,
        totalTokens,
        avgTokensPerConversation,
        satisfactionRate,
        totalRatings,
        thumbsUp,
        thumbsDown,
        totalFeedbacks: feedbacks.length
      });

      setConversationHistory(history);
      setLoading(false);
    } catch (error) {
      console.error('Error cargando analytics:', error);
      setLoading(false);
    }
  };

  const exportAnalytics = () => {
    if (!analyticsData) return;

    const analyticsText = `
REPORTE DE ANALYTICS - MENTE AUTÓNOMA
=====================================
Fecha: ${new Date().toLocaleString('es-CL')}

MÉTRICAS GENERALES:
- Total de conversaciones: ${analyticsData.totalConversations}
- Tiempo promedio de respuesta: ${analyticsData.avgResponseTime}ms
- Total de tokens utilizados: ${analyticsData.totalTokens}
- Tokens promedio por conversación: ${analyticsData.avgTokensPerConversation}

SATISFACCIÓN DEL USUARIO:
- Tasa de satisfacción: ${analyticsData.satisfactionRate}%
- Total de calificaciones: ${analyticsData.totalRatings}
- 👍 Me gusta: ${analyticsData.thumbsUp}
- 👎 No me gusta: ${analyticsData.thumbsDown}
- Comentarios recibidos: ${analyticsData.totalFeedbacks}

HISTORIAL DE CONVERSACIONES:
${conversationHistory.map((msg, index) => 
  `[${index + 1}] [${new Date(msg.timestamp).toLocaleString('es-CL')}] ${msg.sender === 'user' ? 'Usuario' : 'Bot'}: ${msg.text}`
).join('\n')}
    `;

    const blob = new Blob([analyticsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No hay datos de analytics</h1>
          <p className="text-gray-600 mb-6">Usa el chatbot para generar datos de analytics</p>
          <a 
            href="/chatbot-demo" 
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Ir al Chatbot
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📊 Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">Métricas y estadísticas del chatbot</p>
            </div>
            <button
              onClick={exportAnalytics}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <span>📥</span>
              <span>Exportar Reporte</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversaciones</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.totalConversations}</p>
              </div>
              <div className="text-3xl">💬</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.avgResponseTime}ms</p>
              </div>
              <div className="text-3xl">⚡</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tokens Totales</p>
                <p className="text-3xl font-bold text-gray-900">{analyticsData.totalTokens.toLocaleString()}</p>
              </div>
              <div className="text-3xl">🔢</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 shadow-lg text-white"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-100">Satisfacción</p>
                <p className="text-3xl font-bold">{analyticsData.satisfactionRate}%</p>
                <p className="text-xs text-purple-200 mt-1">
                  {analyticsData.thumbsUp} 👍 {analyticsData.thumbsDown} 👎
                </p>
              </div>
              <div className="text-3xl">❤️</div>
            </div>
          </motion.div>

        </div>

        {/* Métricas de satisfacción */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfacción del Usuario</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tasa de satisfacción</span>
                <span className="text-2xl font-bold text-green-600">{analyticsData.satisfactionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${analyticsData.satisfactionRate}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{analyticsData.thumbsUp}</div>
                  <div className="text-sm text-gray-600">👍 Me gusta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{analyticsData.thumbsDown}</div>
                  <div className="text-sm text-gray-600">👎 No me gusta</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Eficiencia del Sistema</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tokens por conversación</span>
                <span className="text-lg font-semibold text-blue-600">{analyticsData.avgTokensPerConversation}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Comentarios recibidos</span>
                <span className="text-lg font-semibold text-orange-600">{analyticsData.totalFeedbacks}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Historial de conversaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Conversaciones</h3>
          <div className="max-h-96 overflow-y-auto">
            {conversationHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-gray-500 mb-2">No hay conversaciones registradas</p>
                <p className="text-sm text-gray-400">¡Inicia una conversación con el chatbot para ver el historial aquí!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversationHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-50 border-l-4 border-blue-500' 
                        : 'bg-gray-50 border-l-4 border-gray-400'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {msg.sender === 'user' ? 'Usuario' : 'Bot'} • {new Date(msg.timestamp).toLocaleString('es-CL')}
                        </p>
                      </div>
                      {msg.rating && (
                        <div className="ml-2">
                          {msg.rating === 'thumbs_up' ? '👍' : '👎'}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Sección de Insights Creativos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Insights de IA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🎯</span>
                <h4 className="font-semibold text-gray-800">Precisión de Respuestas</h4>
              </div>
              <p className="text-sm text-gray-600">
                Nuestro chatbot utiliza GPT-3.5-turbo para generar respuestas contextuales y precisas basadas en tu base de conocimiento.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🧠</span>
                <h4 className="font-semibold text-gray-800">Aprendizaje Continuo</h4>
              </div>
              <p className="text-sm text-gray-600">
                Cada interacción mejora la comprensión del chatbot gracias a LangSmith y el sistema de feedback integrado.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">⚡</span>
                <h4 className="font-semibold text-gray-800">Velocidad de Respuesta</h4>
              </div>
              <p className="text-sm text-gray-600">
                Respuestas en tiempo real con latencia promedio de {analyticsData?.avgResponseTime || 0}ms para una experiencia fluida.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🔒</span>
                <h4 className="font-semibold text-gray-800">Privacidad Garantizada</h4>
              </div>
              <p className="text-sm text-gray-600">
                Todas las conversaciones se almacenan de forma segura en Supabase con encriptación de extremo a extremo.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}