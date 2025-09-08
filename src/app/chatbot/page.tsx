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

  const getBotResponse = (message: string) => {
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

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    setTimeout(() => {
      const botResponse = getBotResponse(inputMessage);
      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isUser: false
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 text-center rounded-t-2xl">
          <h1 className="text-2xl font-bold mb-2">🤖 Chatbot Mente Autónoma</h1>
          <p className="opacity-90">Asistente virtual inteligente</p>
        </div>
        
        {/* Status */}
        <div className="text-center py-3 bg-green-50 text-green-600 font-semibold">
          Conectado ✅ - Sistema activo
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 p-4 rounded-2xl max-w-[80%] ${
                message.isUser
                  ? 'bg-blue-600 text-white ml-auto text-right'
                  : 'bg-white text-gray-800 border border-gray-200 mr-auto'
              }`}
            >
              <div className="whitespace-pre-line">{message.text}</div>
            </div>
          ))}
        </div>
        
        {/* Input */}
        <div className="p-6 bg-white border-t border-gray-200 flex gap-3">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-full text-base outline-none focus:border-blue-500 transition-colors"
          />
          <button
            onClick={sendMessage}
            className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
