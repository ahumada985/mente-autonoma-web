'use client';

import { useState } from 'react';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué puedo ayudarte?",
      isUser: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const getBotResponse = async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      if (data.error) {
        return `Lo siento, hay un problema técnico: ${data.error}. Por favor contacta directamente a +56 9 1234 5678.`;
      }

      return data.response || 'Lo siento, no pude procesar tu mensaje.';
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      return 'Lo siento, hay un problema de conexión. Por favor intenta de nuevo o contacta directamente a +56 9 1234 5678.';
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    // Mostrar indicador de escritura
    const typingMessage = {
      id: messages.length + 2,
      text: 'El bot está pensando...',
      isUser: false,
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const botResponse = await getBotResponse(currentMessage);
      
      // Remover indicador de escritura y agregar respuesta
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const botMessage = {
        id: messages.length + 3,
        text: botResponse,
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      // Remover indicador de escritura en caso de error
      setMessages(prev => prev.filter(msg => !msg.isTyping));
      
      const errorMessage = {
        id: messages.length + 3,
        text: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
        isUser: false
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl h-[95vh] sm:h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 sm:p-6 text-center rounded-t-2xl">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">🤖 Chatbot Mente Autónoma</h1>
          <p className="opacity-90 text-sm sm:text-base">Asistente virtual con IA</p>
        </div>
        
        {/* Status */}
        <div className="text-center py-2 sm:py-3 bg-green-50 text-green-600 font-semibold text-sm sm:text-base">
          Conectado ✅ - OpenAI activo
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-3 sm:p-6 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-3 sm:mb-4 p-3 sm:p-4 rounded-2xl max-w-[85%] sm:max-w-[80%] ${
                message.isUser
                  ? 'bg-blue-600 text-white ml-auto text-right'
                  : message.isTyping
                  ? 'bg-gray-200 text-gray-600 mr-auto animate-pulse'
                  : 'bg-white text-gray-800 border border-gray-200 mr-auto'
              }`}
            >
              <div className="whitespace-pre-line text-sm sm:text-base">{message.text}</div>
            </div>
          ))}
        </div>
        
        {/* Input */}
        <div className="p-3 sm:p-6 bg-white border-t border-gray-200 flex gap-2 sm:gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 px-3 sm:px-5 py-2 sm:py-3 border-2 border-gray-200 rounded-full text-sm sm:text-base outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            disabled={!inputMessage.trim()}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
