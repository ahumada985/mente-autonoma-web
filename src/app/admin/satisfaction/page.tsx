'use client';

import React, { useState, useEffect } from 'react';
import { feedbackManager, SatisfactionStats } from '../../../lib/supabase-feedback';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  ThumbsUp, 
  ThumbsDown,
  RefreshCw,
  Activity,
  Users
} from 'lucide-react';

export default function SatisfactionDashboardPage() {
  const [stats, setStats] = useState<SatisfactionStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<7 | 30 | 90>(7);

  useEffect(() => {
    loadStats();
    
    // Suscribirse a cambios en tiempo real
    const subscription = feedbackManager.subscribeToRatings((newStats) => {
      setStats(newStats);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [timeRange]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await feedbackManager.getSatisfactionStats(timeRange);
      setStats(data);
    } catch (error) {
      console.error('Error loading satisfaction stats:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular estadísticas generales
  const totalRatings = stats.reduce((sum, stat) => sum + stat.total_ratings, 0);
  const totalThumbsUp = stats.reduce((sum, stat) => sum + stat.thumbs_up, 0);
  const totalThumbsDown = stats.reduce((sum, stat) => sum + stat.thumbs_down, 0);
  const avgSatisfaction = totalRatings > 0 ? (totalThumbsUp / totalRatings) * 100 : 0;

  // Datos para gráficos
  const chartData = stats.map(stat => ({
    date: new Date(stat.date).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
    satisfaccion: stat.satisfaction_rate,
    positivas: stat.thumbs_up,
    negativas: stat.thumbs_down,
    total: stat.total_ratings
  })).reverse();

  const pieData = [
    { name: 'Positivas', value: totalThumbsUp, color: '#10B981' },
    { name: 'Negativas', value: totalThumbsDown, color: '#EF4444' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard de Satisfacción</h1>
              <p className="text-gray-600 mt-2">Métricas de satisfacción del chatbot en tiempo real</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value) as 7 | 30 | 90)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={7}>Últimos 7 días</option>
                <option value={30}>Últimos 30 días</option>
                <option value={90}>Últimos 90 días</option>
              </select>
              <button
                onClick={loadStats}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Satisfacción Promedio</p>
                <p className="text-2xl font-semibold text-gray-900">{avgSatisfaction.toFixed(1)}%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  {avgSatisfaction > 80 ? 'Excelente' : avgSatisfaction > 60 ? 'Buena' : 'Necesita mejora'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <ThumbsUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Calificaciones Positivas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalThumbsUp}</p>
                <p className="text-xs text-blue-600 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {totalRatings > 0 ? ((totalThumbsUp / totalRatings) * 100).toFixed(1) : 0}% del total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <ThumbsDown className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Calificaciones Negativas</p>
                <p className="text-2xl font-semibold text-gray-900">{totalThumbsDown}</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {totalRatings > 0 ? ((totalThumbsDown / totalRatings) * 100).toFixed(1) : 0}% del total
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total de Calificaciones</p>
                <p className="text-2xl font-semibold text-gray-900">{totalRatings}</p>
                <p className="text-xs text-purple-600 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  En {timeRange} días
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de satisfacción por día */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Satisfacción por Día</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`, 
                    name === 'satisfaccion' ? 'Satisfacción' : name
                  ]}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="satisfaccion" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de distribución */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Calificaciones</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de volumen de calificaciones */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Volumen de Calificaciones por Día</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="positivas" 
                stackId="1" 
                stroke="#10B981" 
                fill="#10B981" 
                name="Positivas"
              />
              <Area 
                type="monotone" 
                dataKey="negativas" 
                stackId="1" 
                stroke="#EF4444" 
                fill="#EF4444" 
                name="Negativas"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Tabla de datos detallados */}
        <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Datos Detallados por Día</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Positivas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Negativas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfacción
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(stat.date).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {stat.total_ratings}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                      {stat.thumbs_up}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {stat.thumbs_down}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        stat.satisfaction_rate >= 80 
                          ? 'bg-green-100 text-green-800'
                          : stat.satisfaction_rate >= 60
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {stat.satisfaction_rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
