'use client';

import React, { useState, useEffect } from 'react';
import { patternAnalyzer } from '../../lib/pattern-analyzer';
import { chatbotAnalytics } from '../../lib/chatbot-analytics';

export default function ChatbotAnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [patterns, setPatterns] = useState<any[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState('');

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      // Cargar estadísticas
      const analyticsStats = chatbotAnalytics.getRealTimeStats();
      setStats(analyticsStats);

      // Cargar patrones
      const questionPatterns = await patternAnalyzer.analyzeQuestionPatterns();
      setPatterns(questionPatterns);

      // Cargar problemas
      const problemResponses = await patternAnalyzer.identifyProblemResponses();
      setProblems(problemResponses);

      // Generar reporte
      const analysisReport = await patternAnalyzer.generateAnalysisReport();
      setReport(analysisReport);

    } catch (error) {
      console.error('Error al cargar analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = () => {
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chatbot-analysis-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                📊 Analytics del Chatbot
              </h1>
              <p className="text-gray-600">Métricas y análisis en tiempo real</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={loadAnalytics}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                🔄 Actualizar
              </button>
              <button
                onClick={downloadReport}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                📥 Descargar Reporte
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estadísticas generales */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Conversaciones</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalConversations || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <span className="text-2xl">⏱️</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tiempo Promedio</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgResponseTime || 0}ms</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tokens Totales</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTokens || 0}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💰</span>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Costo Total</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalCost || 0}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preguntas más comunes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              🔥 Preguntas Más Comunes
            </h3>
            {patterns.length > 0 ? (
              <div className="space-y-3">
                {patterns.slice(0, 5).map((pattern, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {pattern.question}
                      </p>
                      <p className="text-xs text-gray-500">
                        {pattern.category} • {pattern.frequency} veces
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold text-blue-500">
                        {pattern.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay datos suficientes</p>
            )}
          </div>

          {/* Respuestas problemáticas */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              ⚠️ Respuestas Problemáticas
            </h3>
            {problems.length > 0 ? (
              <div className="space-y-3">
                {problems.slice(0, 5).map((problem, index) => (
                  <div key={index} className="p-3 bg-red-50 rounded border-l-4 border-red-400">
                    <p className="text-sm font-medium text-gray-900">
                      Rating: {problem.rating}/5
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {problem.userMessage}
                    </p>
                    {problem.comment && (
                      <p className="text-xs text-gray-500 mt-1 italic">
                        "{problem.comment}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No hay problemas identificados</p>
            )}
          </div>
        </div>

        {/* Reporte completo */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            📋 Reporte Completo
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
              {report}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
