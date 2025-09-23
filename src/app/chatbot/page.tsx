'use client';

import { useState } from 'react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  isTyping?: boolean;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente virtual de Mente Autónoma. Puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué puedo ayudarte?",
      isUser: false
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOpenAIWorking, setIsOpenAIWorking] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');
  const [langSmithEnabled, setLangSmithEnabled] = useState(false);

  // Respuestas predefinidas como fallback
  const getPredefinedResponse = (message: string) => {
    const msg = message.toLowerCase();
    
    if (msg.includes('hola') || msg.includes('buenos') || msg.includes('buenas')) {
      return "¡Hola! ¿En qué puedo ayudarte? Puedo informarte sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito.";
    }
    
    if (msg.includes('servicios') || msg.includes('servicio')) {
      return "Ofrecemos:\n• Desarrollo web responsivo\n• Chatbots inteligentes\n• Automatización de procesos\n• Consultoría en IA\n• Capacitación tecnológica\n\n¿Te interesa alguno en particular?";
    }
    
    if (msg.includes('precios') || msg.includes('precio') || msg.includes('costo') || msg.includes('cuesta')) {
      return "Nuestros precios:\n• Desarrollo web: desde $500.000 CLP\n• Chatbots: desde $300.000 CLP\n• Consultoría: $150.000 CLP/hora\n• Capacitación: $200.000 CLP/día\n\n¿Quieres una cotización personalizada?";
    }
    
    if (msg.includes('contacto') || msg.includes('contactar') || msg.includes('llamar') || msg.includes('telefono')) {
      return "Información de contacto:\n• Teléfono: +56 9 1234 5678\n• Email: contacto@empresa.com\n• Ubicación: Antofagasta, Chile\n• Horarios: Lunes a Viernes 9:00-18:00\n\n¡Estamos aquí para ayudarte!";
    }
    
    if (msg.includes('horarios') || msg.includes('horario') || msg.includes('atencion') || msg.includes('abierto')) {
      return "Horarios de atención:\n• Lunes a Viernes: 9:00 - 18:00\n• Sábados: 9:00 - 14:00\n• Domingos: Cerrado\n\n¿Necesitas una cita fuera de estos horarios?";
    }
    
    if (msg.includes('tecnologias') || msg.includes('tecnologia') || msg.includes('lenguajes') || msg.includes('programacion')) {
      return "Tecnologías que manejamos:\n• Frontend: React, Vue.js, Angular\n• Backend: Node.js, Python, Django, Flask\n• IA: OpenAI GPT, LangChain, TensorFlow\n• Bases de datos: MongoDB, PostgreSQL, MySQL\n• Cloud: AWS, Google Cloud, Azure\n\n¿Te interesa alguna tecnología específica?";
    }
    
    if (msg.includes('casos') || msg.includes('exito') || msg.includes('proyectos') || msg.includes('trabajos')) {
      return "Casos de éxito:\n• E-commerce con 300% aumento en ventas\n• Chatbot que redujo 80% consultas telefónicas\n• Automatización que ahorra 50% tiempo\n• Sistema de IA para análisis de datos\n\n¿Quieres conocer más detalles de algún caso?";
    }
    
    if (msg.includes('gracias') || msg.includes('muchas gracias')) {
      return "¡De nada! Es un placer ayudarte. ¿Hay algo más en lo que pueda asistirte?";
    }
    
    if (msg.includes('adios') || msg.includes('chao') || msg.includes('hasta luego')) {
      return "¡Hasta luego! Fue un gusto ayudarte. ¡Que tengas un excelente día!";
    }
    
    return "Interesante pregunta. Aunque no tengo información específica sobre eso, puedo ayudarte con información sobre nuestros servicios, precios, horarios, tecnologías y casos de éxito. ¿En qué más puedo asistirte?";
  };

  const getBotResponse = async (message: string) => {
    try {
      setDebugInfo('🔄 Enviando mensaje a OpenAI...');
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      if (data.error) {
        setDebugInfo(`❌ Error de OpenAI: ${data.error}`);
        setIsOpenAIWorking(false);
        return `⚠️ OpenAI no disponible: ${data.error}\n\n${getPredefinedResponse(message)}`;
      }

      setDebugInfo('✅ OpenAI respondió correctamente');
      setIsOpenAIWorking(true);
      setLangSmithEnabled(data.langsmith_enabled || false);
      return data.response || 'Lo siento, no pude procesar tu mensaje.';
    } catch (error) {
      console.error('Error al obtener respuesta:', error);
      setDebugInfo(`❌ Error de conexión: ${error}`);
      setIsOpenAIWorking(false);
      return `⚠️ Sin conexión a OpenAI\n\n${getPredefinedResponse(message)}`;
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
        <div className={`text-center py-2 sm:py-3 font-semibold text-sm sm:text-base ${
          isOpenAIWorking ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
        }`}>
          {isOpenAIWorking ? 'Conectado ✅ - OpenAI activo' : 'Modo fallback ⚠️ - Respuestas predefinidas'}
        </div>
        
        {/* LangSmith Status */}
        <div className={`text-center py-1 text-xs sm:text-sm ${
          langSmithEnabled ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-500'
        }`}>
          {langSmithEnabled ? '📊 LangSmith: Monitoreando conversaciones' : '📊 LangSmith: No configurado'}
        </div>
        
        {/* Debug Info */}
        {debugInfo && (
          <div className="text-center py-1 bg-blue-50 text-blue-600 text-xs sm:text-sm">
            {debugInfo}
          </div>
        )}
        
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
        <div className="p-3 sm:p-6 bg-white border-t border-gray-200">
          <div className="flex gap-2 sm:gap-3 mb-2">
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
          
          {/* Botones de prueba */}
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setInputMessage('Hola')}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300"
            >
              Prueba: Hola
            </button>
            <button
              onClick={() => setInputMessage('Servicios')}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300"
            >
              Prueba: Servicios
            </button>
            <button
              onClick={() => setInputMessage('Precios')}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300"
            >
              Prueba: Precios
            </button>
            <button
              onClick={() => setInputMessage('¿Qué es la inteligencia artificial?')}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs hover:bg-gray-300"
            >
              Prueba: IA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
