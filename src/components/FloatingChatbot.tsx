'use client';

import React, { useState, useEffect, useRef } from 'react';
import { chatbotAnalytics } from '../lib/chatbot-analytics';

interface FloatingChatbotProps {
  apiUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'default' | 'dark' | 'blue' | 'green';
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  rating?: 'thumbs_up' | 'thumbs_down' | null;
  feedback?: string;
}

export default function FloatingChatbot({ 
  apiUrl = '/api/chat',
  position = 'bottom-right',
  theme = 'default'
}: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generar ID de sesión único
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mostrar mensaje de bienvenida
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage = {
        id: 'welcome',
        text: '¡Hola! 👋 ¿En qué puedo ayudarte hoy?',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    setInputValue('');
    
    // Agregar mensaje del usuario
    const userMessageObj = {
      id: `user_${Date.now()}`,
      text: messageText,
      sender: 'user' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessageObj]);

    // Mostrar indicador de carga
    const loadingMessage = {
      id: `loading_${Date.now()}`,
      text: 'Escribiendo...',
      sender: 'bot' as const,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      console.log('🚀 Iniciando llamada a la API...');
      console.log('📤 Mensaje:', messageText);
      console.log('🔗 URL:', apiUrl);
      
      // Iniciar medición de tiempo
      chatbotAnalytics.startTiming();

      // Llamar a la API del chatbot
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          session_id: sessionId.current,
          user_id: 'web_user'
        })
      });

      console.log('📊 Response status:', response.status);
      console.log('📊 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        throw new Error(`Error en la respuesta del servidor: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Data recibida:', data);
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      // Agregar respuesta del bot
      const botMessage = {
        id: `bot_${Date.now()}`,
        text: data.response || 'Lo siento, no pude procesar tu mensaje.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

      // Trackear en LangSmith con métricas
      const responseTime = chatbotAnalytics.endTiming();
      await chatbotAnalytics.trackConversationWithMetrics(
        messageText,
        botMessage.text,
        'web_user',
        'web'
      );

    } catch (error) {
      console.error('❌ ERROR COMPLETO:', error);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Mostrar mensaje de error
      const errorMessage = {
        id: `error_${Date.now()}`,
        text: 'Lo siento, hubo un error. Inténtalo de nuevo.',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRating = (messageId: string, rating: 'thumbs_up' | 'thumbs_down') => {
    setMessages(prev => prev.map(msg => 
      msg.id === messageId 
        ? { ...msg, rating }
        : msg
    ));

    // Si es thumbs_down, mostrar formulario de feedback
    if (rating === 'thumbs_down') {
      setShowFeedbackForm(messageId);
    } else {
      setShowFeedbackForm(null);
    }

    // Enviar calificación a analytics
    chatbotAnalytics.trackRating(messageId, rating);
  };

  const handleFeedbackSubmit = (messageId: string) => {
    if (feedbackText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: feedbackText.trim() }
          : msg
      ));

      // Enviar feedback a analytics
      chatbotAnalytics.trackFeedback(messageId, feedbackText.trim());
      
      setFeedbackText('');
      setShowFeedbackForm(null);
    }
  };

  const handleFeedbackCancel = () => {
    setFeedbackText('');
    setShowFeedbackForm(null);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'top-left':
        return 'top-4 left-4';
      default:
        return 'bottom-4 right-4';
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'green':
        return 'bg-green-600 text-white';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    }
  };

  return (
    <>
      {/* Botón flotante */}
      <div 
        className={`fixed ${getPositionClasses()} z-50 cursor-pointer transition-all duration-300 hover:scale-110`}
        onClick={toggleChatbot}
        data-chatbot-button
      >
        <div className={`w-16 h-16 rounded-full ${getThemeClasses()} shadow-lg flex items-center justify-center relative`}>
          <div className="text-2xl">💬</div>
          {/* Animación de pulso */}
          <div className="absolute inset-0 rounded-full bg-white opacity-30 animate-ping"></div>
        </div>
      </div>

      {/* Widget del chatbot */}
      {isOpen && (
        <div className={`fixed ${getPositionClasses()} z-50 w-80 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col transition-all duration-300`}>
          {/* Header */}
          <div className={`p-4 rounded-t-lg ${getThemeClasses()} flex justify-between items-center`}>
            <h3 className="text-lg font-semibold">Mente Autónoma</h3>
            <button 
              onClick={toggleChatbot}
              className="text-white hover:text-gray-200 text-xl font-bold"
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-3 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  
                  {/* Botones de calificación para mensajes del bot */}
                  {message.sender === 'bot' && message.id !== 'welcome' && (
                    <div className="flex justify-start mt-2 ml-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleRating(message.id, 'thumbs_up')}
                          className={`p-1 rounded-full transition-colors ${
                            message.rating === 'thumbs_up'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                          }`}
                          title="Me gusta esta respuesta"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleRating(message.id, 'thumbs_down')}
                          className={`p-1 rounded-full transition-colors ${
                            message.rating === 'thumbs_down'
                              ? 'bg-red-100 text-red-600'
                              : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600'
                          }`}
                          title="No me gusta esta respuesta"
                        >
                          👎
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Formulario de feedback */}
                  {showFeedbackForm === message.id && (
                    <div className="ml-2 mt-2 p-3 bg-gray-100 rounded-lg">
                      <p className="text-xs text-gray-600 mb-2">
                        ¿Qué podemos mejorar en esta respuesta?
                      </p>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Escribe tu feedback aquí..."
                        className="w-full p-2 text-xs border border-gray-300 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                        rows={2}
                      />
                      <div className="flex space-x-2 mt-2">
                        <button
                          onClick={() => handleFeedbackSubmit(message.id)}
                          className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                        >
                          Enviar
                        </button>
                        <button
                          onClick={handleFeedbackCancel}
                          className="px-3 py-1 bg-gray-300 text-gray-700 text-xs rounded hover:bg-gray-400 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  !inputValue.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : `${getThemeClasses()} hover:opacity-90`
                }`}
              >
                {isLoading ? '⏳' : '📤'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
