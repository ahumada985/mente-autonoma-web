'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsData {
  totalConversations: number;
  totalMessages: number;
  uniqueUsers: number;
  avgMessagesPerUser: number;
  dailyStats: Array<{ date: string; messages: number; uniqueUsers: number }>;
  satisfactionStats: { average: number; total: number; distribution: Record<number, number> };
  popularKeywords: Array<{ word: string; count: number }>;
  busyHours: Array<{ hour: number; count: number }>;
  queryTypes: Array<{ type: string; count: number }>;
}

export default function ChatbotAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  useEffect(() => {
    fetchAnalytics();
  }, [days]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/analytics-chatbot?days=${days}`);
      const data = await response.json();

      if (data.success) {
        setAnalytics(data.analytics);
        setError(null);
      } else {
        setError(data.error || 'Error obteniendo datos');
      }
    } catch (err) {
      setError('Error de conexión');
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-red-500 text-lg">❌ {error}</div>
            <button
              onClick={fetchAnalytics}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="bg-white shadow-sm border-b mb-6 rounded-2xl">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Analytics del Chatbot</h1>
                <p className="text-gray-600">Análisis de conversaciones y métricas de engagement</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              >
                <option value={7}>Últimos 7 días</option>
                <option value={30}>Últimos 30 días</option>
                <option value={90}>Últimos 90 días</option>
              </select>
              <button
                onClick={fetchAnalytics}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Métricas Principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total Conversaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics?.totalConversations || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Usuarios Únicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics?.uniqueUsers || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Total Mensajes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics?.totalMessages || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium opacity-90">Promedio Msg/Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{analytics?.avgMessagesPerUser?.toFixed(1) || 0}</div>
            </CardContent>
          </Card>
        </div>

        {/* Satisfacción */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfacción del Usuario</CardTitle>
            <CardDescription>
              Promedio: {analytics?.satisfactionStats?.average?.toFixed(1) || 0} ⭐
              ({analytics?.satisfactionStats?.total || 0} evaluaciones)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(rating => (
                <div key={rating} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {analytics?.satisfactionStats?.distribution?.[rating] || 0}
                  </div>
                  <div className="text-sm text-gray-600">{rating} ⭐</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Palabras Clave */}
        <Card>
          <CardHeader>
            <CardTitle>Palabras Clave Más Utilizadas</CardTitle>
            <CardDescription>Top 10 términos más mencionados por usuarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {analytics?.popularKeywords.map((keyword, index) => (
                <div key={keyword.word} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{keyword.count}</div>
                  <div className="text-sm text-gray-600">{keyword.word}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tipos de Consulta */}
        <Card>
          <CardHeader>
            <CardTitle>Tipos de Consulta</CardTitle>
            <CardDescription>Categorías más comunes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.queryTypes.map((query) => (
                <div key={query.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium capitalize">{query.type}</span>
                  <span className="text-2xl font-bold text-purple-600">{query.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Horarios Activos */}
        <Card>
          <CardHeader>
            <CardTitle>Horarios Más Activos</CardTitle>
            <CardDescription>Distribución de mensajes por hora</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
              {analytics?.busyHours.map((hour) => (
                <div key={hour.hour} className="text-center p-2 bg-gray-50 rounded">
                  <div className="text-sm font-bold text-purple-600">{hour.count}</div>
                  <div className="text-xs text-gray-600">{hour.hour}:00</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Estadísticas Diarias */}
        <Card>
          <CardHeader>
            <CardTitle>Actividad Diaria</CardTitle>
            <CardDescription>Mensajes y usuarios únicos por día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics?.dailyStats.slice(-7).map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{new Date(day.date).toLocaleDateString()}</span>
                  <div className="flex space-x-4">
                    <span className="text-blue-600 font-bold">{day.messages} mensajes</span>
                    <span className="text-green-600 font-bold">{day.uniqueUsers} usuarios</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}