'use client';

import React from 'react';
import FloatingChatbot from '../../components/FloatingChatbot';

export default function ChatbotDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">
                  Demo Chatbot Flotante
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Mente Autónoma IA
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Prueba el Chatbot Flotante
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Haz clic en el botón flotante en la esquina inferior derecha para comenzar a chatear
          </p>
          
          {/* Información del chatbot */}
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Características del Chatbot
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🤖 Inteligencia Artificial</h4>
                <p className="text-gray-600 text-sm">
                  Respuestas inteligentes basadas en GPT-3.5-turbo
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📊 Análisis en Tiempo Real</h4>
                <p className="text-gray-600 text-sm">
                  Monitoreo con LangSmith para métricas detalladas
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎨 Personalizable</h4>
                <p className="text-gray-600 text-sm">
                  Múltiples temas y posiciones configurables
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📱 Responsive</h4>
                <p className="text-gray-600 text-sm">
                  Funciona perfectamente en móviles y escritorio
                </p>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="mt-12 bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Cómo usar el chatbot:
            </h3>
            <ol className="text-left text-blue-800 space-y-2">
              <li>1. Haz clic en el botón flotante 💬</li>
              <li>2. Escribe tu pregunta o mensaje</li>
              <li>3. Presiona Enter o haz clic en enviar</li>
              <li>4. Recibe respuestas inteligentes en tiempo real</li>
            </ol>
          </div>

          {/* Estadísticas en tiempo real */}
          <div className="mt-8 bg-green-50 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-green-900 mb-3">
              Métricas en Tiempo Real
            </h3>
            <p className="text-green-800 text-sm">
              El chatbot está configurado para trackear automáticamente:
            </p>
            <ul className="text-left text-green-700 text-sm mt-2 space-y-1">
              <li>• Tiempo de respuesta</li>
              <li>• Tokens utilizados</li>
              <li>• Costo estimado</li>
              <li>• Satisfacción del usuario</li>
              <li>• Patrones de uso</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2024 Mente Autónoma. Chatbot con IA integrada.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot flotante */}
      <FloatingChatbot 
        apiUrl="/api/chat"
        position="bottom-right"
        theme="default"
      />
    </div>
  );
}
