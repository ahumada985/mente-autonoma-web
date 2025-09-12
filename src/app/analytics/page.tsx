'use client';

import React, { useState, useEffect } from 'react';

interface MetricData {
  userMessage: string;
  botResponse: string;
  responseTime: number;
  totalTokens: number;
  costEstimate: number;
  timestamp: string;
}

interface AnalyticsData {
  totalConversations: number;
  avgResponseTime: number;
  totalTokens: number;
  totalCost: number;
  avgTokensPerConversation: number;
  avgCostPerConversation: number;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = () => {
    try {
      // Cargar métricas desde sessionStorage (solo sesión actual)
      const storedMetrics = sessionStorage.getItem('chatbot_metrics');
      if (storedMetrics) {
        const parsedMetrics = JSON.parse(storedMetrics);
        setMetrics(parsedMetrics);
        
        // Calcular analytics
        const analyticsData = calculateAnalytics(parsedMetrics);
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error cargando métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAnalytics = (data: MetricData[]): AnalyticsData => {
    if (data.length === 0) {
      return {
        totalConversations: 0,
        avgResponseTime: 0,
        totalTokens: 0,
        totalCost: 0,
        avgTokensPerConversation: 0,
        avgCostPerConversation: 0
      };
    }

    const totalConversations = data.length;
    const avgResponseTime = data.reduce((sum, m) => sum + m.responseTime, 0) / totalConversations;
    const totalTokens = data.reduce((sum, m) => sum + m.totalTokens, 0);
    const totalCost = data.reduce((sum, m) => sum + m.costEstimate, 0);

    return {
      totalConversations,
      avgResponseTime: Math.round(avgResponseTime),
      totalTokens,
      totalCost: Math.round(totalCost * 1000) / 1000,
      avgTokensPerConversation: Math.round(totalTokens / totalConversations),
      avgCostPerConversation: Math.round((totalCost / totalConversations) * 1000) / 1000
    };
  };

  const clearMetrics = () => {
    if (confirm('¿Estás seguro de que quieres borrar todas las métricas de esta sesión?')) {
      sessionStorage.removeItem('chatbot_metrics');
      setMetrics([]);
      setAnalytics(null);
    }
  };

  const exportMetrics = () => {
    const dataStr = JSON.stringify(metrics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chatbot-metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando métricas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Analytics del Chatbot</h1>
          <p className="mt-2 text-gray-600">Métricas de rendimiento de la sesión actual</p>
          <div className="mt-2 inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <span className="mr-2">🔄</span>
            Sesión Actual
          </div>
        </div>

        {/* Stats Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversaciones</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.totalConversations}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tiempo Promedio</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.avgResponseTime}ms</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Tokens</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.totalTokens.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Costo Total</p>
                  <p className="text-2xl font-semibold text-gray-900">${analytics.totalCost}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex space-x-4">
          <button
            onClick={loadMetrics}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            🔄 Actualizar
          </button>
          <button
            onClick={exportMetrics}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            📥 Exportar
          </button>
          <button
            onClick={clearMetrics}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🗑️ Limpiar
          </button>
        </div>

        {/* Metrics Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Historial de Conversaciones</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mensaje Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respuesta Bot
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiempo (ms)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tokens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No hay métricas disponibles. Usa el chatbot para generar datos.
                    </td>
                  </tr>
                ) : (
                  metrics.slice().reverse().map((metric, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(metric.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {metric.userMessage}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {metric.botResponse}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {metric.responseTime}ms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {metric.totalTokens}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${metric.costEstimate.toFixed(4)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
