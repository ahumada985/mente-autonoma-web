'use client';

import React, { useState, useEffect } from 'react';
import { chatbotAnalytics } from '../../lib/chatbot-analytics';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  MessageSquare, 
  DollarSign, 
  Activity,
  Download,
  RefreshCw,
  Trash2,
  BarChart3,
  PieChart as PieChartIcon
} from 'lucide-react';

interface MetricData {
  userMessage: string;
  botResponse: string;
  responseTime: number;
  totalTokens: number;
  timestamp: string;
}

interface AnalyticsData {
  totalConversations: number;
  avgResponseTime: number;
  totalTokens: number;
  avgTokensPerConversation: number;
  efficiencyScore: number;
}

interface ChartData {
  time: string;
  conversations: number;
  responseTime: number;
  tokens: number;
  efficiency: number;
}

interface PieData {
  name: string;
  value: number;
  color: string;
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [pieData, setPieData] = useState<PieData[]>([]);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isDemoData, setIsDemoData] = useState(false);
  const [ratingStats, setRatingStats] = useState<any>(null);

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
        setIsDemoData(false); // Datos reales
        
        // Calcular analytics
        const analyticsData = calculateAnalytics(parsedMetrics);
        setAnalytics(analyticsData);
        
        // Procesar datos para gráficos
        processChartData(parsedMetrics);
        processPieData(parsedMetrics);
      }

      // Cargar estadísticas de calificaciones
      const ratings = chatbotAnalytics.getRatingStats();
      setRatingStats(ratings);
    } catch (error) {
      console.error('Error cargando métricas:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDemoData = () => {
    // Crear datos de demostración para mostrar cómo se vería el chatbot a largo plazo
    const now = new Date();
    const demoMetrics: MetricData[] = [];
    
    // Generar datos de las últimas 7 días para simular uso a largo plazo
    for (let day = 0; day < 7; day++) {
      const currentDay = new Date(now.getTime() - day * 24 * 60 * 60 * 1000);
      
      // Generar entre 5-15 conversaciones por día
      const conversationsPerDay = Math.floor(Math.random() * 11) + 5;
      
      for (let i = 0; i < conversationsPerDay; i++) {
        const hour = Math.floor(Math.random() * 24);
        const timestamp = new Date(currentDay.getTime() + hour * 60 * 60 * 1000);
        
        // Mensajes más realistas
        const userMessages = [
          "¿Cómo puedo optimizar mi sitio web?",
          "Necesito ayuda con SEO",
          "¿Cuál es el mejor framework para mi proyecto?",
          "¿Cómo implemento autenticación?",
          "¿Puedes revisar mi código?",
          "¿Qué tecnologías me recomiendas?",
          "¿Cómo mejoro el rendimiento?",
          "¿Cuál es la mejor práctica para esto?",
          "¿Puedes explicarme este concepto?",
          "¿Cómo resuelvo este error?",
          "¿Qué opinas de esta arquitectura?",
          "¿Cómo escalo mi aplicación?",
          "¿Cuál es la diferencia entre estas opciones?",
          "¿Puedes ayudarme con la documentación?",
          "¿Cómo implemento esta funcionalidad?"
        ];
        
        const botResponses = [
          "Te ayudo a optimizar tu sitio web. Primero necesito revisar tu código actual...",
          "Para mejorar tu SEO, te recomiendo implementar estas estrategias...",
          "Basándome en tu proyecto, te sugiero usar React con Next.js...",
          "La autenticación se puede implementar de varias formas. Te explico las opciones...",
          "He revisado tu código y encontré algunas mejoras que puedes implementar...",
          "Para tu caso específico, te recomiendo estas tecnologías...",
          "Para mejorar el rendimiento, puedes implementar estas optimizaciones...",
          "La mejor práctica en este caso sería seguir estos principios...",
          "Te explico este concepto paso a paso con ejemplos prácticos...",
          "Este error es común. Te muestro cómo solucionarlo...",
          "Tu arquitectura está bien estructurada, pero puedes mejorar estos aspectos...",
          "Para escalar tu aplicación, considera implementar estas estrategias...",
          "La diferencia principal entre estas opciones es que...",
          "Te ayudo con la documentación. Aquí tienes los pasos detallados...",
          "Para implementar esta funcionalidad, necesitas seguir estos pasos..."
        ];
        
        const userMessage = userMessages[Math.floor(Math.random() * userMessages.length)];
        const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        demoMetrics.push({
          userMessage,
          botResponse,
          responseTime: Math.floor(Math.random() * 2000) + 800, // 800-2800ms
          totalTokens: Math.floor(Math.random() * 400) + 150, // 150-550 tokens
          timestamp: timestamp.toISOString()
        });
      }
    }
    
    setMetrics(demoMetrics);
    setIsDemoData(true); // Marcar como datos demo
    
    // Calcular analytics
    const analyticsData = calculateAnalytics(demoMetrics);
    setAnalytics(analyticsData);
    
    // Procesar datos para gráficos
    processChartData(demoMetrics);
    processPieData(demoMetrics);
  };

  const processChartData = (data: MetricData[]) => {
    // Agrupar por hora para mostrar tendencias
    const hourlyData: { [key: string]: { conversations: number, responseTime: number, tokens: number } } = {};
    
    data.forEach(metric => {
      const hour = new Date(metric.timestamp).getHours();
      const timeKey = `${hour}:00`;
      
      if (!hourlyData[timeKey]) {
        hourlyData[timeKey] = { conversations: 0, responseTime: 0, tokens: 0 };
      }
      
      hourlyData[timeKey].conversations += 1;
      hourlyData[timeKey].responseTime += metric.responseTime;
      hourlyData[timeKey].tokens += metric.totalTokens;
    });

    const chartDataArray = Object.entries(hourlyData).map(([time, data]) => ({
      time,
      conversations: data.conversations,
      responseTime: Math.round(data.responseTime / data.conversations),
      tokens: data.tokens,
      efficiency: Math.round((data.tokens / data.conversations) / 10) // Score de eficiencia basado en tokens por conversación
    })).sort((a, b) => a.time.localeCompare(b.time));

    setChartData(chartDataArray);
  };

  const processPieData = (data: MetricData[]) => {
    // Analizar distribución de tipos de mensajes (simulado)
    const messageTypes = {
      'Preguntas': 0,
      'Solicitudes': 0,
      'Comentarios': 0,
      'Otros': 0
    };

    data.forEach(metric => {
      const message = metric.userMessage.toLowerCase();
      if (message.includes('?') || message.includes('cómo') || message.includes('qué')) {
        messageTypes['Preguntas']++;
      } else if (message.includes('necesito') || message.includes('quiero') || message.includes('solicito')) {
        messageTypes['Solicitudes']++;
      } else if (message.includes('gracias') || message.includes('ok') || message.includes('perfecto')) {
        messageTypes['Comentarios']++;
      } else {
        messageTypes['Otros']++;
      }
    });

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];
    const pieDataArray = Object.entries(messageTypes)
      .filter(([_, value]) => value > 0)
      .map(([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length]
      }));

    setPieData(pieDataArray);
  };

  const calculateAnalytics = (data: MetricData[]): AnalyticsData => {
    if (data.length === 0) {
      return {
        totalConversations: 0,
        avgResponseTime: 0,
        totalTokens: 0,
        avgTokensPerConversation: 0,
        efficiencyScore: 0
      };
    }

    const totalConversations = data.length;
    const avgResponseTime = data.reduce((sum, m) => sum + m.responseTime, 0) / totalConversations;
    const totalTokens = data.reduce((sum, m) => sum + m.totalTokens, 0);
    const avgTokensPerConversation = Math.round(totalTokens / totalConversations);
    
    // Calcular score de eficiencia basado en tiempo de respuesta y tokens
    const efficiencyScore = Math.round((1000 / avgResponseTime) * (avgTokensPerConversation / 100));

    return {
      totalConversations,
      avgResponseTime: Math.round(avgResponseTime),
      totalTokens,
      avgTokensPerConversation,
      efficiencyScore: Math.min(efficiencyScore, 100) // Máximo 100
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

  // Funciones de paginación
  const totalPages = Math.ceil(metrics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMetrics = metrics.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics del Chatbot</h1>
              <p className="mt-2 text-gray-600">
                {isDemoData ? 'Métricas de demostración (7 días simulados)' : 'Métricas de rendimiento de la sesión actual'}
              </p>
              <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                isDemoData 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                <span className="mr-2">{isDemoData ? '🎯' : '🔄'}</span>
                {isDemoData ? 'Datos Demo' : 'Datos Reales'}
              </div>
            </div>
            {isDemoData && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <p className="text-sm text-purple-700 font-medium">Modo Demostración</p>
                <p className="text-xs text-purple-600">Simulación de uso a largo plazo</p>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Conversaciones</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.totalConversations}</p>
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% vs ayer
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tiempo Promedio</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.avgResponseTime}ms</p>
                  <p className="text-xs text-blue-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    Excelente rendimiento
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Tokens</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.totalTokens.toLocaleString()}</p>
                  <p className="text-xs text-purple-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    {analytics.avgTokensPerConversation} avg/conversación
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Score de Eficiencia</p>
                  <p className="text-2xl font-semibold text-gray-900">{analytics.efficiencyScore}/100</p>
                  <p className="text-xs text-orange-600 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {analytics.efficiencyScore > 70 ? 'Excelente' : analytics.efficiencyScore > 50 ? 'Bueno' : 'Mejorable'}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta de Satisfacción */}
            {ratingStats && (
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Satisfacción</p>
                    <p className="text-2xl font-semibold text-gray-900">{ratingStats.satisfactionRate}%</p>
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <span className="mr-1">👍</span>
                      {ratingStats.thumbsUp} positivas
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mb-6 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex space-x-4">
            <button
              onClick={loadMetrics}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </button>
            <button
              onClick={exportMetrics}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </button>
            <button
              onClick={clearMetrics}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Limpiar
            </button>
            <button
              onClick={createDemoData}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center"
            >
              <Activity className="w-4 h-4 mr-2" />
              Datos Demo
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                viewMode === 'overview' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Resumen
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                viewMode === 'detailed' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <PieChartIcon className="w-4 h-4 mr-2" />
              Detallado
            </button>
          </div>
        </div>

        {/* No Data Message */}
        {chartData.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay datos para mostrar</h3>
            <p className="text-gray-500 mb-6">
              Tienes dos opciones para ver los analytics del chatbot:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">📊 Datos Reales</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Basados en conversaciones reales con el chatbot. Se generan automáticamente cuando usas el chatbot.
                </p>
                <a
                  href="/chatbot-demo"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Ir al Chatbot
                </a>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">🎯 Datos Demo</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Simulación de cómo se vería el chatbot con uso a largo plazo (7 días de datos).
                </p>
                <button
                  onClick={createDemoData}
                  className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Generar Demo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        {viewMode === 'overview' && chartData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Conversaciones por hora */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversaciones por Hora</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="conversations" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Tiempo de respuesta */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tiempo de Respuesta</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Tokens utilizados */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tokens Utilizados</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tokens" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Eficiencia por hora */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Eficiencia por Hora</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, 'Eficiencia']} />
                  <Bar dataKey="efficiency" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed View */}
        {viewMode === 'detailed' && pieData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Distribución de tipos de mensajes */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tipos de Mensajes</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Resumen de rendimiento */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Rendimiento</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Eficiencia de Tokens</span>
                  <span className="text-sm font-bold text-blue-600">
                    {analytics ? Math.round((analytics.totalTokens / analytics.totalConversations) / 10) : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Velocidad Promedio</span>
                  <span className="text-sm font-bold text-green-600">
                    {analytics ? (analytics.avgResponseTime < 2000 ? 'Excelente' : 'Buena') : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Tokens por Conversación</span>
                  <span className="text-sm font-bold text-purple-600">
                    {analytics?.avgTokensPerConversation || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">Satisfacción Estimada</span>
                  <span className="text-sm font-bold text-yellow-600">
                    {analytics ? Math.round(analytics.efficiencyScore * 0.8) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Feedbacks Recientes */}
            {ratingStats && ratingStats.recentFeedbacks.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedbacks Recientes</h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {ratingStats.recentFeedbacks.map((feedback: any, index: number) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700 mb-1">{feedback.feedback}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(feedback.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
                {ratingStats.totalFeedbacks > 5 && (
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    Mostrando últimos 5 de {ratingStats.totalFeedbacks} feedbacks
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Metrics Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Historial de Conversaciones</h3>
            {metrics.length > 0 && (
              <div className="text-sm text-gray-500">
                Mostrando {startIndex + 1}-{Math.min(endIndex, metrics.length)} de {metrics.length} conversaciones
              </div>
            )}
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
                    Eficiencia
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
                  currentMetrics.slice().reverse().map((metric, index) => {
                    const efficiency = Math.round((1000 / metric.responseTime) * (metric.totalTokens / 100));
                    return (
                      <tr key={startIndex + index} className="hover:bg-gray-50">
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
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            efficiency > 70 ? 'bg-green-100 text-green-800' :
                            efficiency > 50 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {Math.min(efficiency, 100)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Paginación */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center">
                <p className="text-sm text-gray-700">
                  Página {currentPage} de {totalPages}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                {/* Números de página */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    if (totalPages <= 5) {
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => goToPage(pageNumber)}
                          className={`px-3 py-2 text-sm font-medium rounded-md ${
                            currentPage === pageNumber
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    }
                    return null;
                  })}
                  
                  {totalPages > 5 && (
                    <>
                      {currentPage > 3 && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
                      <button
                        onClick={() => goToPage(totalPages)}
                        className={`px-3 py-2 text-sm font-medium rounded-md ${
                          currentPage === totalPages
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
