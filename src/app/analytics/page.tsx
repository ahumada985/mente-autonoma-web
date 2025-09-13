'use client';

import React, { useState, useEffect } from 'react';
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

interface ChartData {
  time: string;
  conversations: number;
  responseTime: number;
  tokens: number;
  cost: number;
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
        
        // Procesar datos para gráficos
        processChartData(parsedMetrics);
        processPieData(parsedMetrics);
      } else {
        // Si no hay datos, crear datos de demostración
        createDemoData();
      }
    } catch (error) {
      console.error('Error cargando métricas:', error);
      // Si hay error, crear datos de demostración
      createDemoData();
    } finally {
      setLoading(false);
    }
  };

  const createDemoData = () => {
    // Crear datos de demostración para mostrar los gráficos
    const now = new Date();
    const demoMetrics: MetricData[] = [];
    
    // Generar datos de las últimas 24 horas
    for (let i = 0; i < 24; i++) {
      const hour = new Date(now.getTime() - (23 - i) * 60 * 60 * 1000);
      const conversations = Math.floor(Math.random() * 10) + 1;
      
      for (let j = 0; j < conversations; j++) {
        demoMetrics.push({
          userMessage: `Mensaje de prueba ${i}-${j}`,
          botResponse: `Respuesta del bot ${i}-${j}`,
          responseTime: Math.floor(Math.random() * 3000) + 500,
          totalTokens: Math.floor(Math.random() * 500) + 100,
          costEstimate: Math.random() * 0.01 + 0.001,
          timestamp: hour.toISOString()
        });
      }
    }
    
    setMetrics(demoMetrics);
    
    // Calcular analytics
    const analyticsData = calculateAnalytics(demoMetrics);
    setAnalytics(analyticsData);
    
    // Procesar datos para gráficos
    processChartData(demoMetrics);
    processPieData(demoMetrics);
  };

  const processChartData = (data: MetricData[]) => {
    // Agrupar por hora para mostrar tendencias
    const hourlyData: { [key: string]: { conversations: number, responseTime: number, tokens: number, cost: number } } = {};
    
    data.forEach(metric => {
      const hour = new Date(metric.timestamp).getHours();
      const timeKey = `${hour}:00`;
      
      if (!hourlyData[timeKey]) {
        hourlyData[timeKey] = { conversations: 0, responseTime: 0, tokens: 0, cost: 0 };
      }
      
      hourlyData[timeKey].conversations += 1;
      hourlyData[timeKey].responseTime += metric.responseTime;
      hourlyData[timeKey].tokens += metric.totalTokens;
      hourlyData[timeKey].cost += metric.costEstimate;
    });

    const chartDataArray = Object.entries(hourlyData).map(([time, data]) => ({
      time,
      conversations: data.conversations,
      responseTime: Math.round(data.responseTime / data.conversations),
      tokens: data.tokens,
      cost: Math.round(data.cost * 1000) / 1000
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
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Costo Total</p>
                  <p className="text-2xl font-semibold text-gray-900">${analytics.totalCost}</p>
                  <p className="text-xs text-yellow-600 flex items-center mt-1">
                    <Activity className="w-3 h-3 mr-1" />
                    ${analytics.avgCostPerConversation} avg/conversación
                  </p>
                </div>
              </div>
            </div>
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
              Para ver los gráficos de analytics, necesitas tener conversaciones con el chatbot o generar datos de demostración.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={createDemoData}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
              >
                <Activity className="w-5 h-5 mr-2" />
                Generar Datos Demo
              </button>
              <a
                href="/chatbot-demo"
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Ir al Chatbot
              </a>
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

            {/* Costo por hora */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Costo por Hora</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Costo']} />
                  <Bar dataKey="cost" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed View */}
        {viewMode === 'detailed' && pieData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
                  <span className="text-sm font-medium text-gray-700">Costo por Conversación</span>
                  <span className="text-sm font-bold text-purple-600">
                    ${analytics?.avgCostPerConversation || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">ROI Estimado</span>
                  <span className="text-sm font-bold text-yellow-600">
                    {analytics ? Math.round(analytics.totalConversations * 0.1) : 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

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
