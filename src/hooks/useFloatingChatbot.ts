import { useState, useEffect, useRef } from 'react';
import { chatbotAnalytics } from '../lib/chatbot-analytics';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isLoading?: boolean;
}

export interface FloatingChatbotConfig {
  apiUrl: string;
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme: 'default' | 'dark' | 'blue' | 'green';
  autoOpen?: boolean;
  showWelcomeMessage?: boolean;
  maxMessages?: number;
}

export function useFloatingChatbot(config: FloatingChatbotConfig) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-abrir si está configurado
  useEffect(() => {
    if (config.autoOpen) {
      setIsOpen(true);
    }
  }, [config.autoOpen]);

  // Mostrar mensaje de bienvenida
  useEffect(() => {
    if (config.showWelcomeMessage && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        text: '¡Hola! Soy tu asistente de IA. ¿En qué puedo ayudarte?',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [config.showWelcomeMessage, messages.length]);

  // Scroll automático a la parte inferior
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Enviar mensaje
  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text || isLoading) return;

    setInputValue('');
    setError(null);

    // Agregar mensaje del usuario
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      text,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => {
      const newMessages = [...prev, userMessage];
      // Limitar número de mensajes si está configurado
      if (config.maxMessages && newMessages.length > config.maxMessages) {
        return newMessages.slice(-config.maxMessages);
      }
      return newMessages;
    });

    // Mostrar indicador de carga
    const loadingMessage: ChatMessage = {
      id: `loading_${Date.now()}`,
      text: 'Escribiendo...',
      sender: 'bot',
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);
    setIsLoading(true);

    try {
      // Iniciar medición de tiempo
      chatbotAnalytics.startTiming();

      // Llamar a la API del chatbot
      const response = await fetch(config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          session_id: sessionId.current,
          user_id: 'web_user'
        })
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));

      // Agregar respuesta del bot
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        text: data.response || 'Lo siento, no pude procesar tu mensaje.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => {
        const newMessages = [...prev, botMessage];
        // Limitar número de mensajes si está configurado
        if (config.maxMessages && newMessages.length > config.maxMessages) {
          return newMessages.slice(-config.maxMessages);
        }
        return newMessages;
      });

      // Trackear en LangSmith con métricas
      const responseTime = chatbotAnalytics.endTiming();
      await chatbotAnalytics.trackConversationWithMetrics(
        text,
        botMessage.text,
        'web_user',
        'web'
      );

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      // Remover mensaje de carga
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
      
      // Mostrar mensaje de error
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        text: 'Lo siento, hubo un error. Inténtalo de nuevo.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar tecla Enter
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Toggle del chatbot
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Cerrar chatbot
  const closeChatbot = () => {
    setIsOpen(false);
  };

  // Limpiar mensajes
  const clearMessages = () => {
    setMessages([]);
    setError(null);
  };

  // Obtener estadísticas
  const getStats = () => {
    return chatbotAnalytics.getRealTimeStats();
  };

  return {
    // Estado
    isOpen,
    messages,
    inputValue,
    isLoading,
    error,
    
    // Referencias
    messagesEndRef,
    
    // Acciones
    sendMessage,
    toggleChatbot,
    closeChatbot,
    clearMessages,
    setInputValue,
    handleKeyPress,
    getStats,
    
    // Configuración
    config
  };
}
