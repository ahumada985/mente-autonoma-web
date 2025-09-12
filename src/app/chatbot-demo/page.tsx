'use client';

import React from 'react';
import FloatingChatbot from '../../components/FloatingChatbot';

export default function ChatbotDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Demo en Vivo
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Chatbot
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> Inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Experimenta la potencia de la IA conversacional con nuestro chatbot avanzado
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                🚀 Probar Ahora
              </button>
              <button className="px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-300">
                📊 Ver Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Características Avanzadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro chatbot utiliza las últimas tecnologías en IA para brindar respuestas precisas y contextuales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 transform hover:-translate-y-2 text-center md:text-left">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">IA Avanzada</h3>
              <p className="text-gray-600 mb-4 text-center md:text-left">
                Powered by OpenAI GPT-3.5-turbo para respuestas inteligentes y contextuales
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-center md:text-left">
                <li>• Comprensión natural del lenguaje</li>
                <li>• Respuestas contextuales</li>
                <li>• Aprendizaje continuo</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 transform hover:-translate-y-2 text-center md:text-left">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics en Tiempo Real</h3>
              <p className="text-gray-600 mb-4 text-center md:text-left">
                Monitoreo completo con LangSmith para métricas detalladas de rendimiento
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-center md:text-left">
                <li>• Tiempo de respuesta</li>
                <li>• Tokens utilizados</li>
                <li>• Análisis de patrones</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all duration-300 transform hover:-translate-y-2 text-center md:text-left">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6 mx-auto md:mx-0 group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Respuesta Instantánea</h3>
              <p className="text-gray-600 mb-4 text-center md:text-left">
                Respuestas rápidas y precisas para mejorar la experiencia del usuario
              </p>
              <ul className="text-sm text-gray-500 space-y-1 text-center md:text-left">
                <li>• Respuesta en segundos</li>
                <li>• Disponible 24/7</li>
                <li>• Sin límites de consultas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Cómo Usar el Chatbot
            </h2>
            <p className="text-xl text-gray-600">
              Sigue estos simples pasos para comenzar a interactuar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Haz Clic</h3>
              <p className="text-gray-600">
                Busca el botón flotante 💬 en la esquina inferior derecha
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Escribe</h3>
              <p className="text-gray-600">
                Escribe tu pregunta o mensaje en el campo de texto
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Envía</h3>
              <p className="text-gray-600">
                Presiona Enter o haz clic en el botón de enviar
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recibe</h3>
              <p className="text-gray-600">
                Obtén respuestas inteligentes en tiempo real
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para Experimentar?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Haz clic en el botón flotante y comienza a chatear con nuestro chatbot inteligente
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-purple-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              💬 Iniciar Chat
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              📈 Ver Métricas
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Mente Autónoma. Chatbot con IA integrada.
          </p>
        </div>
      </div>

      <FloatingChatbot />
    </div>
  );
}