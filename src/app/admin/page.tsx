'use client';

import React from 'react';
import Link from 'next/link';
import { 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Users, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona el chatbot y sus métricas</p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feedbacks */}
          <Link href="/admin/feedbacks" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform transition-transform">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg group-hover:bg-red-200 transition-colors">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Feedbacks</h3>
                  <p className="text-gray-600 text-sm">Gestiona comentarios y calificaciones</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <AlertCircle className="w-4 h-4 mr-1" />
                Revisar feedbacks pendientes
              </div>
            </div>
          </Link>

          {/* Satisfacción */}
          <Link href="/admin/satisfaction" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform transition-transform">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Satisfacción</h3>
                  <p className="text-gray-600 text-sm">Dashboard de métricas en tiempo real</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <BarChart3 className="w-4 h-4 mr-1" />
                Ver estadísticas detalladas
              </div>
            </div>
          </Link>

          {/* Analytics */}
          <Link href="/analytics" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform transition-transform">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                  <p className="text-gray-600 text-sm">Métricas de rendimiento del chatbot</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Activity className="w-4 h-4 mr-1" />
                Ver análisis completo
              </div>
            </div>
          </Link>

          {/* Configuración */}
          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Settings className="w-6 h-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Configuración</h3>
                <p className="text-gray-600 text-sm">Próximamente</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 mr-1" />
              En desarrollo
            </div>
          </div>

          {/* Usuarios */}
          <div className="bg-white rounded-lg shadow p-6 opacity-50">
            <div className="flex items-center">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Users className="w-6 h-6 text-gray-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Usuarios</h3>
                <p className="text-gray-600 text-sm">Próximamente</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <CheckCircle className="w-4 h-4 mr-1" />
              En desarrollo
            </div>
          </div>

          {/* Chatbot Demo */}
          <Link href="/chatbot-demo" className="group">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow group-hover:scale-105 transform transition-transform">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Chatbot Demo</h3>
                  <p className="text-gray-600 text-sm">Probar el chatbot</p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-gray-500">
                <Activity className="w-4 h-4 mr-1" />
                Interactuar con el bot
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen Rápido</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Sistema Activo</p>
                  <p className="text-2xl font-semibold text-gray-900">Online</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Persistencia</p>
                  <p className="text-2xl font-semibold text-gray-900">Supabase</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Tiempo Real</p>
                  <p className="text-2xl font-semibold text-gray-900">Activo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
