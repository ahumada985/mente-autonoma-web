'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { chatbotAnalytics } from '../lib/chatbot-analytics';

interface FloatingChatbotProps {
  apiUrl?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  theme?: 'default' | 'dark' | 'blue' | 'green' | 'red' | 'purple';
  size?: 'small' | 'medium' | 'large';
  style?: 'modern' | 'minimal' | 'rounded';
  clientId?: string; // 🆕 ID del cliente para multi-tenant
  businessName?: string; // 🆕 Nombre del negocio para personalización
  customPrompt?: string; // 🆕 Prompt personalizado del cliente
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
  theme = 'default',
  size = 'medium',
  style = 'modern',
  clientId = 'mente_autonoma',
  businessName = 'Mente Autónoma',
  customPrompt
}: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Estados dinámicos para personalización en tiempo real
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [currentPosition, setCurrentPosition] = useState(position);
  const [currentSize, setCurrentSize] = useState(size);
  const [currentStyle, setCurrentStyle] = useState(style);

  // Estados para funcionalidades del chat
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('medium'); // 'xs', 'small', 'medium', 'large'
  const [avatarMode, setAvatarMode] = useState('avatar'); // 'none', 'avatar'
  const [selectedAvatar, setSelectedAvatar] = useState(1); // 1-5 diferentes avatares
  const [avatarName, setAvatarName] = useState('María'); // Nombre del avatar seleccionado

  // Avatares disponibles con sus nombres
  const avatarList = [
    { id: 1, name: 'María', gender: 'female' },
    { id: 2, name: 'Carlos', gender: 'male' },
    { id: 3, name: 'Jenny', gender: 'female' },
    { id: 4, name: 'Valeria', gender: 'female' },
    { id: 5, name: 'Catalina', gender: 'female' }
  ];

  // Respuestas rápidas sugeridas
  const quickReplies = [
    "¿Cuáles son sus servicios?",
    "¿Cómo puedo contactarlos?",
    "¿Qué precios manejan?",
    "¿Tienen garantías?",
    "¿Qué tecnologías usan?",
    "¿Pueden ayudarme con mi proyecto?"
  ];

  // Componente de Avatar SVG
  const AvatarComponent = ({ avatarId, size = 32 }: { avatarId: number; size?: number }) => {
    const avatars = [
      // Avatar 1 - Mujer profesional cabello largo
      <svg key="avatar1" width={size} height={size} viewBox="0 0 64 64" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <defs>
          <linearGradient id="skin1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBCB4"/>
            <stop offset="100%" stopColor="#F8A192"/>
          </linearGradient>
          <linearGradient id="hair1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513"/>
            <stop offset="100%" stopColor="#654321"/>
          </linearGradient>
        </defs>
        {/* Fondo circular */}
        <circle cx="32" cy="32" r="32" fill="url(#linear-gradient(135deg, #667eea 0%, #764ba2 100%))"/>
        {/* Cabello */}
        <ellipse cx="32" cy="22" rx="18" ry="14" fill="url(#hair1)"/>
        <path d="M14 20 Q20 8 32 8 Q44 8 50 20 Q50 35 45 40 L19 40 Q14 35 14 20" fill="url(#hair1)"/>
        {/* Cara */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#skin1)"/>
        {/* Ojos */}
        <ellipse cx="26" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="38" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="26.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        <ellipse cx="38.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        {/* Nariz */}
        <ellipse cx="32" cy="38" rx="1" ry="2" fill="#F39C8B"/>
        {/* Boca */}
        <path d="M28 42 Q32 45 36 42" stroke="#E74C3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Ropa */}
        <path d="M18 55 Q32 50 46 55 L46 64 L18 64 Z" fill="#3498DB"/>
      </svg>,

      // Avatar 2 - Hombre profesional cabello corto
      <svg key="avatar2" width={size} height={size} viewBox="0 0 64 64" style={{ background: 'linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)' }}>
        <defs>
          <linearGradient id="skin2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBCB4"/>
            <stop offset="100%" stopColor="#F8A192"/>
          </linearGradient>
          <linearGradient id="hair2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2C3E50"/>
            <stop offset="100%" stopColor="#34495E"/>
          </linearGradient>
        </defs>
        {/* Fondo circular */}
        <circle cx="32" cy="32" r="32" fill="linear-gradient(135deg, #74b9ff 0%, #0984e3 100%)"/>
        {/* Cabello corto */}
        <ellipse cx="32" cy="20" rx="15" ry="12" fill="url(#hair2)"/>
        <path d="M17 18 Q25 10 32 10 Q39 10 47 18 Q47 28 42 32 L22 32 Q17 28 17 18" fill="url(#hair2)"/>
        {/* Cara */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#skin2)"/>
        {/* Ojos */}
        <ellipse cx="26" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="38" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="26.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        <ellipse cx="38.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        {/* Nariz */}
        <ellipse cx="32" cy="38" rx="1" ry="2" fill="#F39C8B"/>
        {/* Boca */}
        <path d="M28 42 Q32 45 36 42" stroke="#E74C3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Barba ligera */}
        <ellipse cx="32" cy="46" rx="8" ry="3" fill="#2C3E50" opacity="0.3"/>
        {/* Ropa */}
        <path d="M18 55 Q32 50 46 55 L46 64 L18 64 Z" fill="#2C3E50"/>
      </svg>,

      // Avatar 3 - Mujer joven cabello rizado
      <svg key="avatar3" width={size} height={size} viewBox="0 0 64 64" style={{ background: 'linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)' }}>
        <defs>
          <linearGradient id="skin3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4A574"/>
            <stop offset="100%" stopColor="#C18B4A"/>
          </linearGradient>
          <linearGradient id="hair3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A4A4A"/>
            <stop offset="100%" stopColor="#2C2C2C"/>
          </linearGradient>
        </defs>
        {/* Fondo circular */}
        <circle cx="32" cy="32" r="32" fill="linear-gradient(135deg, #fd79a8 0%, #fdcb6e 100%)"/>
        {/* Cabello rizado */}
        <g fill="url(#hair3)">
          <circle cx="18" cy="18" r="4"/>
          <circle cx="24" cy="12" r="3.5"/>
          <circle cx="32" cy="10" r="4"/>
          <circle cx="40" cy="12" r="3.5"/>
          <circle cx="46" cy="18" r="4"/>
          <circle cx="48" cy="26" r="3"/>
          <circle cx="16" cy="26" r="3"/>
          <ellipse cx="32" cy="22" rx="16" ry="8"/>
        </g>
        {/* Cara */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#skin3)"/>
        {/* Ojos */}
        <ellipse cx="26" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="38" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="26.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        <ellipse cx="38.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        {/* Nariz */}
        <ellipse cx="32" cy="38" rx="1" ry="2" fill="#C18B4A"/>
        {/* Boca */}
        <path d="M28 42 Q32 45 36 42" stroke="#E74C3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Ropa */}
        <path d="M18 55 Q32 50 46 55 L46 64 L18 64 Z" fill="#E17055"/>
      </svg>,

      // Avatar 4 - Mujer técnica
      <svg key="avatar4" width={size} height={size} viewBox="0 0 64 64" style={{ background: 'linear-gradient(135deg, #00b894 0%, #00a085 100%)' }}>
        <defs>
          <linearGradient id="skin4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBCB4"/>
            <stop offset="100%" stopColor="#F8A192"/>
          </linearGradient>
          <linearGradient id="hair4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513"/>
            <stop offset="100%" stopColor="#654321"/>
          </linearGradient>
        </defs>
        {/* Fondo circular */}
        <circle cx="32" cy="32" r="32" fill="linear-gradient(135deg, #00b894 0%, #00a085 100%)"/>
        {/* Cabello bob corto */}
        <path d="M16 20 Q20 12 32 12 Q44 12 48 20 Q48 32 44 38 L20 38 Q16 32 16 20" fill="url(#hair4)"/>
        {/* Cara */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#skin4)"/>
        {/* Gafas */}
        <ellipse cx="26" cy="32" rx="4" ry="3" fill="none" stroke="#2C3E50" strokeWidth="1.5"/>
        <ellipse cx="38" cy="32" rx="4" ry="3" fill="none" stroke="#2C3E50" strokeWidth="1.5"/>
        <line x1="30" y1="32" x2="34" y2="32" stroke="#2C3E50" strokeWidth="1.5"/>
        {/* Ojos */}
        <ellipse cx="26" cy="32" rx="2" ry="1.5" fill="#2C3E50"/>
        <ellipse cx="38" cy="32" rx="2" ry="1.5" fill="#2C3E50"/>
        {/* Nariz */}
        <ellipse cx="32" cy="38" rx="1" ry="2" fill="#F39C8B"/>
        {/* Boca */}
        <path d="M28 42 Q32 45 36 42" stroke="#E74C3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Ropa técnica */}
        <path d="M18 55 Q32 50 46 55 L46 64 L18 64 Z" fill="#2C3E50"/>
      </svg>,

      // Avatar 5 - Mujer educativa
      <svg key="avatar5" width={size} height={size} viewBox="0 0 64 64" style={{ background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)' }}>
        <defs>
          <linearGradient id="skin5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDBCB4"/>
            <stop offset="100%" stopColor="#F8A192"/>
          </linearGradient>
          <linearGradient id="hair5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B4513"/>
            <stop offset="100%" stopColor="#654321"/>
          </linearGradient>
        </defs>
        {/* Fondo circular */}
        <circle cx="32" cy="32" r="32" fill="linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)"/>
        {/* Cabello recogido */}
        <ellipse cx="32" cy="20" rx="16" ry="10" fill="url(#hair5)"/>
        <circle cx="32" cy="18" r="6" fill="url(#hair5)"/>
        {/* Cara */}
        <ellipse cx="32" cy="36" rx="14" ry="16" fill="url(#skin5)"/>
        {/* Ojos */}
        <ellipse cx="26" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="38" cy="32" rx="2.5" ry="2" fill="#2C3E50"/>
        <ellipse cx="26.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        <ellipse cx="38.5" cy="31.5" rx="0.8" ry="0.8" fill="#ECF0F1"/>
        {/* Nariz */}
        <ellipse cx="32" cy="38" rx="1" ry="2" fill="#F39C8B"/>
        {/* Boca sonriente */}
        <path d="M28 42 Q32 46 36 42" stroke="#E74C3C" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        {/* Ropa formal */}
        <path d="M18 55 Q32 50 46 55 L46 64 L18 64 Z" fill="#6C5CE7"/>
      </svg>
    ];

    return avatars[avatarId - 1] || avatars[0];
  };

  // Generar ID de sesión único
  const sessionId = useRef(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // No cargar historial al inicializar - cada sesión empieza limpia

  // Función para cargar historial desde localStorage
  const loadConversationHistory = async () => {
    try {
      const savedHistory = localStorage.getItem('chatbot_conversation_history');
      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          setMessages(parsedHistory);
        }
      }
    } catch (error) {
      console.error('Error cargando historial local:', error);
    }
  };

  // Función para guardar historial en Supabase (solo para analytics)
  const saveConversationHistory = async (messages: Message[]) => {
    try {
      // Guardar en Supabase para analytics
      await fetch('/api/conversation-history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId.current,
          client_id: clientId, // 🆕 Incluir client_id
          messages: messages
        })
      });
    } catch (error) {
      console.error('Error guardando historial en Supabase:', error);
    }
  };

  // Guardar historial cuando cambien los mensajes
  useEffect(() => {
    if (messages.length > 0) {
      saveConversationHistory(messages);
    }
  }, [messages]);

  // Filtrar mensajes cuando cambie la búsqueda
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = messages.filter(msg => 
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

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
        text: `¡Hola! 👋 Soy el asistente virtual de ${businessName}. ¿En qué puedo ayudarte hoy?`,
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  // Escuchar eventos de personalización en tiempo real
  useEffect(() => {
    const handleUpdateSettings = (event: CustomEvent) => {
      const { theme, size, position, style } = event.detail;

      console.log('🎨 Actualizando configuración del chatbot:', event.detail);

      if (theme && theme !== currentTheme) setCurrentTheme(theme);
      if (size && size !== currentSize) setCurrentSize(size);
      if (position && position !== currentPosition) setCurrentPosition(position);
      if (style && style !== currentStyle) setCurrentStyle(style);
    };

    window.addEventListener('updateChatbotSettings', handleUpdateSettings as EventListener);

    return () => {
      window.removeEventListener('updateChatbotSettings', handleUpdateSettings as EventListener);
    };
  }, [currentTheme, currentSize, currentPosition, currentStyle]); // Agregamos dependencias para evitar loops

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const messageText = inputValue.trim();
    
    // Verificar si es un comando especial
    if (messageText.startsWith('/')) {
      const isCommand = handleSpecialCommand(messageText);
      if (isCommand) {
        setInputValue('');
        return;
      }
    }
    
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

    } catch (error: any) {
      console.error('❌ ERROR COMPLETO:', error);
      console.error('❌ Error message:', error?.message || 'Error desconocido');
      console.error('❌ Error stack:', error?.stack || 'Stack no disponible');
      
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

  const handleRating = async (messageId: string, rating: 'thumbs_up' | 'thumbs_down') => {
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

    // Enviar calificación a analytics (ahora con persistencia en Supabase)
    await chatbotAnalytics.trackRating(messageId, rating);

    // 🆕 Mostrar confirmación visual
    if (rating === 'thumbs_up') {
      // Mostrar mensaje temporal de agradecimiento
      const thankYouMessage = {
        id: `thanks_${Date.now()}`,
        text: '¡Gracias por tu feedback positivo! 😊',
        sender: 'bot' as const,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, thankYouMessage]);

      // Remover mensaje después de 3 segundos
      setTimeout(() => {
        setMessages(prev => prev.filter(msg => msg.id !== thankYouMessage.id));
      }, 3000);
    }
  };

  const handleFeedbackSubmit = async (messageId: string) => {
    if (feedbackText.trim()) {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, feedback: feedbackText.trim() }
          : msg
      ));

      // Enviar feedback a analytics (ahora con persistencia en Supabase)
      await chatbotAnalytics.trackFeedback(messageId, feedbackText.trim());
      
      setFeedbackText('');
      setShowFeedbackForm(null);
    }
  };

  const handleFeedbackCancel = () => {
    setFeedbackText('');
    setShowFeedbackForm(null);
  };

  // Función para buscar en historial
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowSearch(query.trim().length > 0);
  };

  // Función para limpiar búsqueda
  const clearSearch = () => {
    setSearchQuery('');
    setShowSearch(false);
    setFilteredMessages(messages);
  };

  // Función para enviar respuesta rápida
  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setShowQuickReplies(false);
  };

  // Función para iniciar grabación de voz
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      recorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);

        // Mostrar indicador de transcripción
        setIsTranscribing(true);

        // Transcribir el audio con OpenAI Whisper
        const transcribedText = await transcribeAudio(blob);

        // Ocultar indicador de transcripción
        setIsTranscribing(false);

        if (transcribedText && !transcribedText.startsWith('Error:')) {
          setInputValue(transcribedText);
        } else {
          alert(transcribedText || 'Error transcribiendo audio');
        }

        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('No se pudo acceder al micrófono. Verifica los permisos.');
    }
  };

  // Función para detener grabación
  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // Transcripción real con OpenAI Whisper
  const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await fetch('/api/transcribe-audio', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return data.text;
      } else {
        console.error('Error transcribiendo:', data.error);
        return 'Error: No se pudo transcribir el audio. ' + (data.details || '');
      }
    } catch (error) {
      console.error('Error en transcripción:', error);
      return 'Error: Problema de conexión al transcribir.';
    }
  };

  // Función para manejar comandos especiales
  const handleSpecialCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case '/help':
        const helpMessage = {
          id: 'help',
          text: 'Comandos disponibles:\n/help - Mostrar esta ayuda\n/clear - Limpiar conversación\n/export - Exportar conversación\n/search - Buscar en historial\n/quick - Mostrar respuestas rápidas',
          sender: 'bot' as const,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, helpMessage]);
        break;
      case '/clear':
        clearHistory();
        break;
      case '/export':
        exportConversation();
        break;
      case '/search':
        setShowSearch(true);
        break;
      case '/quick':
        setShowQuickReplies(true);
        break;
      default:
        // Si no es un comando, enviar como mensaje normal
        return false;
    }
    return true;
  };

  // Limpiar historial de conversaciones
  const clearHistory = async () => {
    try {
      // Eliminar de Supabase
      await fetch(`/api/conversation-history?session_id=${sessionId.current}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error eliminando historial:', error);
    }
    
    // Limpiar estado local
    setMessages([]);
    
    // Generar un nuevo session ID para la próxima sesión
    sessionId.current = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Mostrar mensaje de bienvenida
    const welcomeMessage = {
      id: 'welcome',
      text: `¡Hola! 👋 Soy el asistente virtual de ${businessName}. ¿En qué puedo ayudarte hoy?`,
      sender: 'bot' as const,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  // Exportar conversación a texto
  const exportConversation = () => {
    const conversationText = messages
      .filter(msg => msg.id !== 'welcome')
      .map(msg => {
        const time = msg.timestamp.toLocaleString('es-CL');
        return `[${time}] ${msg.sender === 'user' ? 'Usuario' : 'Bot'}: ${msg.text}`;
      })
      .join('\n\n');

    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversacion-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const positionClasses = useMemo(() => {
    const baseClasses = isOpen ?
      'inset-0 sm:inset-auto' : // Pantalla completa en móvil cuando está abierto
      '';

    switch (currentPosition) {
      case 'bottom-left':
        return `${baseClasses} ${!isOpen ? 'bottom-4 left-4' : 'sm:bottom-4 sm:left-4'}`;
      case 'top-right':
        return `${baseClasses} ${!isOpen ? 'top-4 right-4' : 'sm:top-4 sm:right-4'}`;
      case 'top-left':
        return `${baseClasses} ${!isOpen ? 'top-4 left-4' : 'sm:top-4 sm:left-4'}`;
      case 'center':
        return `${baseClasses} ${!isOpen ? 'bottom-4 left-1/2 transform -translate-x-1/2' : 'sm:bottom-4 sm:left-1/2 sm:transform sm:-translate-x-1/2'}`;
      default:
        return `${baseClasses} ${!isOpen ? 'bottom-4 right-4' : 'sm:bottom-4 sm:right-4'}`;
    }
  }, [currentPosition, isOpen]);

  const themeClasses = useMemo(() => {
    switch (currentTheme) {
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'blue':
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white';
      case 'green':
        return 'bg-gradient-to-r from-green-500 to-green-600 text-white';
      case 'red':
        return 'bg-gradient-to-r from-red-500 to-red-600 text-white';
      case 'purple':
        return 'bg-gradient-to-r from-purple-500 to-purple-600 text-white';
      default:
        return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white';
    }
  }, [currentTheme]);

  const sizeClasses = useMemo(() => {
    switch (currentSize) {
      case 'small':
        return 'w-14 h-14'; // 15% más grande: 12 * 1.15 ≈ 14
      case 'large':
        return 'w-24 h-24'; // 15% más grande: 20 * 1.15 ≈ 23
      default:
        return 'w-20 h-20'; // 15% más grande: 16 * 1.15 ≈ 18
    }
  }, [currentSize]);

  const styleClasses = useMemo(() => {
    switch (currentStyle) {
      case 'minimal':
        return 'rounded-lg shadow-md';
      case 'rounded':
        return 'rounded-full shadow-xl';
      default:
        return 'rounded-2xl shadow-lg';
    }
  }, [currentStyle]);

  return (
    <>
      {/* Botón flotante */}
      <div
        className={`fixed ${positionClasses} z-50 cursor-pointer transition-all duration-500 hover:scale-125 group`}
        onClick={toggleChatbot}
        data-chatbot-button
      >
        <div className={`${sizeClasses} flex items-center justify-center relative transition-all duration-500 overflow-hidden rounded-full shadow-2xl ring-4 ring-white/20 hover:ring-${currentTheme === 'blue' ? 'blue' : currentTheme === 'green' ? 'green' : currentTheme === 'red' ? 'red' : 'purple'}-400/40`}>
          {/* Fondo animado basado en tema */}
          <div className={`absolute inset-0 bg-gradient-to-br ${
            currentTheme === 'blue' ? 'from-blue-500 via-cyan-500 to-indigo-600' :
            currentTheme === 'green' ? 'from-green-500 via-emerald-500 to-teal-600' :
            currentTheme === 'red' ? 'from-red-500 via-orange-500 to-pink-600' :
            'from-purple-500 via-pink-500 to-indigo-600'
          } animate-pulse`}></div>
          <div className={`absolute inset-0 bg-gradient-to-tr ${
            currentTheme === 'blue' ? 'from-cyan-300/60 via-transparent to-blue-300/40' :
            currentTheme === 'green' ? 'from-emerald-300/60 via-transparent to-green-300/40' :
            currentTheme === 'red' ? 'from-orange-300/60 via-transparent to-red-300/40' :
            'from-cyan-400/60 via-transparent to-yellow-400/40'
          } animate-spin`} style={{animationDuration: '4s'}}></div>
          <div className={`absolute inset-0 bg-gradient-to-bl ${
            currentTheme === 'blue' ? 'from-blue-400/30 via-transparent to-cyan-500/40' :
            currentTheme === 'green' ? 'from-green-400/30 via-transparent to-emerald-500/40' :
            currentTheme === 'red' ? 'from-red-400/30 via-transparent to-orange-500/40' :
            'from-emerald-400/30 via-transparent to-blue-500/40'
          } group-hover:animate-bounce`}></div>

          {/* Efectos de brillo */}
          <div className="absolute top-1 left-2 w-2 h-2 bg-white/90 rounded-full animate-ping"></div>
          <div className="absolute bottom-2 right-1 w-1.5 h-1.5 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-3 right-3 w-1 h-1 bg-blue-200 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>

          {avatarMode === 'avatar' ? (
            <img
              src="/avatar-maria.png"
              alt="María - Asistente Virtual"
              className="relative z-10 w-4/5 h-4/5 object-contain filter drop-shadow-xl"
            />
          ) : (
            <div className={`relative z-10 ${currentSize === 'small' ? 'text-lg' : currentSize === 'large' ? 'text-3xl' : 'text-2xl'} filter drop-shadow-lg`}>💬</div>
          )}

          {/* Onda de pulso externa */}
          <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-ping" style={{animationDuration: '2s'}}></div>
        </div>
      </div>

      {/* Widget del chatbot */}
      {isOpen && (
        <div className={`fixed ${positionClasses} z-50 w-full h-full sm:w-96 sm:h-[600px] sm:max-w-sm ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'} sm:rounded-3xl shadow-2xl border flex flex-col transition-all duration-300 transform sm:hover:scale-[1.02] backdrop-blur-lg`}>
          {/* Header Profesional - Estilo DataBot.cl MEJORADO 1000% */}
          <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600">
            {/* Efecto de brillo animado elegante */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] animate-pulse duration-3000"></div>

            <div className="relative p-4">
              <div className="flex items-start justify-between">
                {/* LADO IZQUIERDO: Avatar + Info */}
                <div className="flex items-center space-x-4 flex-1">
                  {avatarMode === 'avatar' ? (
                    <>
                      {/* Avatar GRANDE y profesional */}
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-3 border-white/40 shadow-2xl backdrop-blur-sm relative flex items-center justify-center">
                          {/* Fondo lindo del header */}
                          <div className="absolute inset-0 bg-gradient-to-br from-rose-300 via-pink-300 to-purple-400"></div>
                          <div className="absolute inset-0 bg-gradient-to-tl from-cyan-200/50 via-blue-200/30 to-indigo-300/50"></div>
                          {/* Patrón de puntos decorativo más pequeño */}
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-1 left-2 w-0.5 h-0.5 bg-white rounded-full"></div>
                            <div className="absolute top-3 right-1 w-1 h-1 bg-yellow-200 rounded-full"></div>
                            <div className="absolute bottom-2 left-1 w-0.5 h-0.5 bg-blue-200 rounded-full"></div>
                            <div className="absolute bottom-1 right-2 w-0.5 h-0.5 bg-pink-200 rounded-full"></div>
                          </div>
                          <img
                            src="/avatar-maria.png"
                            alt="María - Asistente Virtual"
                            className="relative z-10 w-14 h-14 object-contain filter drop-shadow-sm"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                      </div>
                      {/* Información del avatar */}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg mb-1">{avatarName}</h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm text-white/90 font-medium">En línea</span>
                        </div>
                        <p className="text-xs text-white/80">Asistente Virtual IA</p>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Modo sin avatar GRANDE */}
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-2xl">
                        <span className="text-3xl">🤖</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white drop-shadow-lg mb-1">Asistente IA</h3>
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-white/90 font-medium">En línea</span>
                        </div>
                        <p className="text-xs text-white/80">Asistente Virtual IA</p>
                      </div>
                    </>
                  )}
                </div>

                {/* LADO DERECHO: Controles Perfectos ✨ */}
                <div className="flex flex-col space-y-3">
                  {/* FILA SUPERIOR: Limpiar (izq) + Cerrar (der) - Alineados a la derecha */}
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={clearHistory}
                      className="w-9 h-9 rounded-2xl bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm border border-orange-400/30 text-white hover:from-orange-500/40 hover:to-red-500/40 hover:border-orange-300/60 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-orange-500/20"
                      title="Limpiar historial"
                    >
                      <span className="text-base group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">🗑️</span>
                    </button>

                    <button
                      onClick={toggleChatbot}
                      className="w-9 h-9 rounded-2xl bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-400/30 text-white hover:from-red-500/40 hover:to-pink-500/40 hover:border-red-300/60 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-red-500/20"
                      title="Cerrar chat"
                    >
                      <span className="text-xl font-bold group-hover:scale-125 group-hover:rotate-90 transition-all duration-300">×</span>
                    </button>
                  </div>

                  {/* FILA INFERIOR: 3 botones funcionales (Modo + A- + A+) */}
                  <div className="flex items-center space-x-2">
                    {/* Modo oscuro */}
                    <button
                      onClick={() => setIsDarkMode(prev => !prev)}
                      className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-sm border border-indigo-400/30 text-white hover:from-indigo-500/40 hover:to-purple-500/40 hover:border-indigo-300/60 transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-indigo-500/20"
                      title={isDarkMode ? "Modo claro" : "Modo oscuro"}
                    >
                      <span className="text-sm group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                        {isDarkMode ? (
                          <span className="filter drop-shadow-lg brightness-125 contrast-125">☀️</span>
                        ) : (
                          '🌙'
                        )}
                      </span>
                    </button>

                    {/* Tamaño de fuente - (con 4 niveles) */}
                    <button
                      onClick={() => {
                        if (fontSize === 'large') setFontSize('medium');
                        else if (fontSize === 'medium') setFontSize('small');
                        else if (fontSize === 'small') setFontSize('xs');
                      }}
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/30 text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-blue-500/20 ${
                        fontSize === 'xs'
                          ? 'text-white/40 cursor-not-allowed opacity-50'
                          : 'text-white hover:from-blue-500/40 hover:to-cyan-500/40 hover:border-blue-300/60 hover:scale-110'
                      }`}
                      title="Reducir tamaño de letra"
                      disabled={fontSize === 'xs'}
                    >
                      A-
                    </button>

                    {/* Tamaño de fuente + (con 4 niveles) */}
                    <button
                      onClick={() => {
                        if (fontSize === 'xs') setFontSize('small');
                        else if (fontSize === 'small') setFontSize('medium');
                        else if (fontSize === 'medium') setFontSize('large');
                      }}
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 ${
                        fontSize === 'large'
                          ? 'text-white/40 cursor-not-allowed opacity-50'
                          : 'text-white hover:from-emerald-500/40 hover:to-teal-500/40 hover:border-emerald-300/60 hover:scale-110'
                      }`}
                      title="Aumentar tamaño de letra"
                      disabled={fontSize === 'large'}
                    >
                      A+
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mensajes */}
          <div className={`flex-1 p-4 overflow-y-auto ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <div className="space-y-3">
              {/* Mostrar mensaje de búsqueda si hay filtros */}
              {showSearch && searchQuery && (
                <div className="text-center py-2">
                  <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {filteredMessages.length} resultado(s) para "{searchQuery}"
                  </span>
                </div>
              )}
              
              {(showSearch && searchQuery ? filteredMessages : messages).map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} items-start space-x-2`}
                  >
                    {/* Sin avatar en mensajes individuales - estilo DataBot.cl */}
                    <div
                      className={`max-w-xs px-3 py-2 rounded-2xl shadow-md ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : isDarkMode
                            ? 'bg-gray-700 text-white border border-gray-600'
                            : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                    >
                      <p className={`${
                        fontSize === 'xs' ? 'text-xs' :
                        fontSize === 'small' ? 'text-sm' :
                        fontSize === 'medium' ? 'text-base' :
                        fontSize === 'large' ? 'text-lg' :
                        fontSize === 'xl' ? 'text-lg' : 'text-base'
                      }`}>{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>

                    {/* Avatar del usuario */}
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        👤
                      </div>
                    )}
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
                    <div className={`ml-2 mt-2 p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        ¿Qué podemos mejorar en esta respuesta?
                      </p>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        placeholder="Escribe tu feedback aquí..."
                        className={`w-full p-2 text-xs border rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                          isDarkMode
                            ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400'
                            : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                        }`}
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
              {/* Indicador de escritura - sin avatar en mensajes */}
              {isLoading && (
                <div className="flex justify-start items-start space-x-2">
                  <div className={`px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600' : 'bg-white text-gray-800 border border-gray-200'}`}>
                    <div className="flex items-center space-x-1">
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{avatarMode === 'avatar' ? `${avatarName} está escribiendo` : 'Escribiendo'}</span>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Respuestas rápidas */}
          {showQuickReplies && (
            <div className={`p-3 border-t ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}>
              <div className={`text-xs mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Respuestas rápidas:</div>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickReply(reply)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      isDarkMode
                        ? 'bg-gray-600 border border-gray-500 text-white hover:bg-gray-500 hover:border-gray-400'
                        : 'bg-white border border-gray-300 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className={`p-4 border-t rounded-b-3xl ${
            isDarkMode
              ? 'border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800'
              : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'
          }`}>
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje o usa /help para comandos..."
                className={`flex-1 px-3 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent shadow-inner font-medium ${
                  isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                disabled={isLoading}
              />
              <button
                onClick={() => setShowQuickReplies(!showQuickReplies)}
                className={`px-3 py-2 transition-colors ${
                  isDarkMode
                    ? 'text-gray-400 hover:text-gray-200'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Respuestas rápidas"
              >
                💡
              </button>
              <button
                onClick={isRecording ? stopRecording : startRecording}
                disabled={isTranscribing}
                className={`px-3 py-2 transition-all duration-300 ${
                  isRecording
                    ? 'text-red-500 animate-pulse'
                    : isTranscribing
                      ? 'text-yellow-500 animate-spin'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-500 hover:text-blue-600'
                }`}
                title={
                  isRecording ? "Detener grabación" :
                  isTranscribing ? "Transcribiendo audio..." :
                  "Grabar mensaje de voz"
                }
              >
                {isRecording ? '⏸️' : isTranscribing ? '⚡' : '🎙️'}
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className={`relative w-12 h-12 rounded-full font-bold transition-all duration-300 transform hover:scale-110 shadow-lg flex items-center justify-center group overflow-hidden ${
                  !inputValue.trim() || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : currentTheme === 'blue'
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700 shadow-blue-500/30 hover:shadow-blue-500/50'
                      : currentTheme === 'green'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-green-500/30 hover:shadow-green-500/50'
                        : currentTheme === 'red'
                          ? 'bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700 shadow-red-500/30 hover:shadow-red-500/50'
                          : 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 shadow-purple-500/30 hover:shadow-purple-500/50'
                }`}
              >
                {/* Efecto de fondo animado */}
                {!(!inputValue.trim() || isLoading) && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                )}

                {isLoading ? (
                  <div className="flex items-center space-x-0.5">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                ) : (
                  <svg
                    className="w-6 h-6 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 relative z-10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}

                {/* Pulse ring cuando está activo */}
                {!(!inputValue.trim() || isLoading) && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-purple-400 animate-ping opacity-20"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
