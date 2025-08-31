'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DemoModal({ isOpen, onClose }) {
  const [activeDemo, setActiveDemo] = useState(0);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: '¡Hola! Soy tu asistente virtual de Mente Autónoma. ¿En qué puedo ayudarte hoy?', time: '12:00' },
    { type: 'user', message: 'Necesito información sobre automatización de procesos', time: '12:01' },
    { type: 'bot', message: '¡Excelente! Te puedo ayudar con eso. Tenemos soluciones que pueden aumentar tu productividad hasta un 40%. ¿Te gustaría que te explique más detalles?', time: '12:01' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [petData, setPetData] = useState({
    name: 'Luna',
    type: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    weight: '25 kg'
  });

  const demos = [
    {
      id: 0,
      title: '🤖 Chatbot Inteligente',
      subtitle: 'Asistente Virtual con IA',
      description: 'Experimenta cómo nuestros chatbots entienden contexto y resuelven consultas complejas en tiempo real.',
             content: (
         <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-xl p-6 h-80 flex flex-col">
           {/* Header mejorado */}
           <div className="flex items-center justify-between mb-4">
             <div className="flex items-center space-x-3">
               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                 <span className="text-white text-lg">🤖</span>
               </div>
               <div>
                 <h3 className="text-lg font-bold text-gray-800">Asistente Virtual IA</h3>
                                   <p className="text-xs text-gray-600">Conectado • Respuesta: &lt;1s</p>
               </div>
             </div>
             <div className="flex space-x-2">
               <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
               <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
               <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
             </div>
           </div>
           
           {/* Chat mejorado con avatares */}
           <div className="flex-1 bg-white rounded-xl p-4 mb-4 overflow-y-auto shadow-inner">
             {chatMessages.map((msg, index) => (
               <motion.div
                 key={index}
                 initial={{ opacity: 0, y: 10, scale: 0.95 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 transition={{ delay: index * 0.1, type: "spring" }}
                 className={`mb-4 flex ${msg.type === 'bot' ? 'justify-start' : 'justify-end'}`}
               >
                 {msg.type === 'bot' && (
                   <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                     <span className="text-white text-sm">🤖</span>
                   </div>
                 )}
                 <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                   msg.type === 'bot' 
                     ? 'bg-gradient-to-r from-blue-50 to-indigo-100 text-blue-900 border border-blue-200' 
                     : 'bg-gradient-to-r from-green-50 to-emerald-100 text-green-900 border border-green-200'
                 }`}>
                   <p className="text-sm leading-relaxed">{msg.message}</p>
                   <div className="flex items-center justify-between mt-2">
                     <span className="text-xs opacity-60">{msg.time}</span>
                     {msg.type === 'bot' && (
                       <div className="flex space-x-1">
                         <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                         <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                         <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                       </div>
                     )}
                   </div>
                 </div>
                 {msg.type === 'user' && (
                   <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                     <span className="text-white text-sm">👤</span>
                   </div>
                 )}
               </motion.div>
             ))}
           </div>
           
           {/* Input mejorado */}
           <div className="flex space-x-3">
             <div className="flex-1 relative">
               <input
                 type="text"
                 value={newMessage}
                 onChange={(e) => setNewMessage(e.target.value)}
                 placeholder="Escribe tu mensaje..."
                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                 onKeyPress={(e) => {
                   if (e.key === 'Enter' && newMessage.trim()) {
                     const userMsg = { type: 'user', message: newMessage, time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) };
                     setChatMessages([...chatMessages, userMsg]);
                     
                     // Simular respuesta del bot
                     setTimeout(() => {
                       const botResponses = [
                         '¡Excelente pregunta! 🚀 Nuestros sistemas de IA pueden procesar esa información en tiempo real y generar insights automáticos.',
                         'Te puedo ayudar con eso! 💡 Nuestras soluciones incluyen análisis predictivo avanzado y machine learning personalizado.',
                         'Perfecto, esa es exactamente nuestra especialidad! ⭐ ¿Te gustaría que te contacte un experto para una consulta personalizada?'
                       ];
                       const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
                       const botMsg = { type: 'bot', message: randomResponse, time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }) };
                       setChatMessages(prev => [...prev, botMsg]);
                     }, 1000);
                     
                     setNewMessage('');
                   }
                 }}
               />
               <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                 <span className="text-sm">💬</span>
               </div>
             </div>
             <motion.button 
               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               ➤
             </motion.button>
           </div>
         </div>
       )
    },
         {
       id: 1,
       title: '📊 Dashboard Inteligente',
       subtitle: 'Análisis en Tiempo Real',
       description: 'Visualiza cómo nuestros dashboards procesan datos y generan insights automáticos para tu negocio.',
       content: (
         <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 rounded-xl p-6 h-80 overflow-hidden">
           {/* Header con indicadores en tiempo real */}
           <div className="flex items-center justify-between mb-4">
             <div>
               <h3 className="text-lg font-bold text-gray-800">🚀 Dashboard IA - E-commerce</h3>
               <p className="text-xs text-gray-600">Monitoreo en tiempo real • Última actualización: Hace 15 seg</p>
             </div>
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-sm font-semibold text-green-600">SISTEMA ACTIVO</span>
             </div>
           </div>
           
           {/* Métricas principales con iconos y animaciones */}
           <div className="grid grid-cols-3 gap-3 mb-4">
             <motion.div 
               className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-3 text-center relative overflow-hidden"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
               <div className="text-2xl font-bold">$24.5K</div>
               <div className="text-xs opacity-90">Ventas Hoy</div>
               <div className="text-xs text-green-200">↗️ +12.5%</div>
             </motion.div>
             
             <motion.div 
               className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-3 text-center relative overflow-hidden"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
               <div className="text-2xl font-bold">1,247</div>
               <div className="text-xs opacity-90">Visitas</div>
               <div className="text-xs text-green-200">↗️ +8.3%</div>
             </motion.div>
             
             <motion.div 
               className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-xl p-3 text-center relative overflow-hidden"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8"></div>
               <div className="text-2xl font-bold">89%</div>
               <div className="text-xs opacity-90">Conversión</div>
               <div className="text-xs text-green-200">↗️ +5.7%</div>
             </motion.div>
           </div>
           
           {/* Gráfico de tendencias interactivo */}
           <div className="bg-white rounded-xl p-4 mb-4">
             <div className="flex items-center justify-between mb-3">
               <h4 className="font-semibold text-gray-800">📈 Tendencias de Ventas</h4>
               <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                 <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
               </div>
             </div>
             
             {/* Gráfico de barras animado */}
             <div className="flex items-end justify-between h-20 space-x-1">
               {[65, 78, 92, 85, 96, 88, 94].map((height, index) => (
                 <motion.div
                   key={index}
                   className="bg-gradient-to-t from-blue-400 to-blue-600 rounded-t-lg flex-1"
                   initial={{ height: 0 }}
                   animate={{ height: `${height}%` }}
                   transition={{ delay: index * 0.1, duration: 0.8 }}
                   whileHover={{ scaleY: 1.2, scaleX: 1.1 }}
                 />
               ))}
             </div>
             
             <div className="flex justify-between text-xs text-gray-500 mt-2">
               <span>Lun</span>
               <span>Mar</span>
               <span>Mié</span>
               <span>Jue</span>
               <span>Vie</span>
               <span>Sáb</span>
               <span>Dom</span>
             </div>
           </div>
           
           {/* Alertas inteligentes de IA */}
           <div className="space-y-2">
             <motion.div 
               className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-lg p-3 flex items-center space-x-3"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
             >
               <div className="text-xl">🎯</div>
               <div className="flex-1">
                 <div className="text-sm font-semibold">IA Detectó: Pico de demanda</div>
                 <div className="text-xs opacity-90">Producto "Smart Watch Pro" - Stock bajo</div>
               </div>
               <div className="text-xs bg-white/20 px-2 py-1 rounded">Hace 2 min</div>
             </motion.div>
             
             <motion.div 
               className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-3 flex items-center space-x-3"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.7 }}
             >
               <div className="text-xl">🚀</div>
               <div className="flex-1">
                 <div className="text-sm font-semibold">IA Optimizó: Campaña de marketing</div>
                 <div className="text-xs opacity-90">ROI mejorado en 23% - Presupuesto ajustado</div>
               </div>
               <div className="text-xs bg-white/20 px-2 py-1 rounded">Hace 5 min</div>
             </motion.div>
           </div>
         </div>
       )
     },
         {
       id: 2,
       title: '📱 Generador de Contenido RRSS',
       subtitle: 'Sistema Funcional en Vivo',
       description: 'Experimenta cómo funciona nuestro generador de contenido cuando un cliente lo compra y comienza a usarlo.',
       content: (
         <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 rounded-xl p-6 h-80 overflow-hidden">
           {/* Header del sistema */}
           <div className="flex items-center justify-between mb-4">
             <div>
               <h3 className="text-lg font-bold text-gray-800">🚀 Sistema RRSS Activo</h3>
               <p className="text-xs text-gray-600">Cliente: Empresa Tech • Plan: Premium • Estado: Activo</p>
             </div>
             <div className="flex items-center space-x-2">
               <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
               <span className="text-sm font-semibold text-green-600">FUNCIONANDO</span>
             </div>
           </div>
           
           {/* Panel de control del cliente */}
           <div className="grid grid-cols-2 gap-3 mb-4">
             <motion.div 
               className="bg-white rounded-xl p-3 text-center relative overflow-hidden group cursor-pointer border-2 border-green-200"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="w-full h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg mb-2 flex items-center justify-center">
                 <span className="text-white text-xl">📊</span>
               </div>
               <div className="text-sm font-semibold text-gray-800">Posts Generados</div>
               <div className="text-xs text-green-600 font-bold">47 posts</div>
               <div className="text-xs text-gray-500">Este mes</div>
             </motion.div>
             
             <motion.div 
               className="bg-white rounded-xl p-3 text-center relative overflow-hidden group cursor-pointer border-2 border-blue-200"
               whileHover={{ scale: 1.05 }}
               transition={{ type: "spring", stiffness: 300 }}
             >
               <div className="w-full h-16 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg mb-2 flex items-center justify-center">
                 <span className="text-white text-xl">🎯</span>
               </div>
               <div className="text-sm font-semibold text-gray-800">Engagement Total</div>
               <div className="text-xs text-blue-600 font-bold">+89K</div>
               <div className="text-xs text-gray-500">+156% vs mes anterior</div>
             </motion.div>
           </div>
           
           {/* Generador de contenido en acción */}
           <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
             <div className="flex items-center justify-between mb-3">
               <h4 className="font-semibold text-gray-800">⚡ Generando Post en Vivo</h4>
               <div className="text-xs text-gray-500">Tema: "Inteligencia Artificial en 2025"</div>
             </div>
             
             {/* Proceso de generación paso a paso */}
             <div className="space-y-2">
               <motion.div 
                 className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.1 }}
               >
                 <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                   <span className="text-white text-xs">1</span>
                 </div>
                 <span className="text-sm text-gray-700">IA analiza tendencias del sector</span>
               </motion.div>
               
               <motion.div 
                 className="flex items-center space-x-3 p-2 bg-blue-50 rounded-lg"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.3 }}
               >
                 <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                   <span className="text-white text-xs">2</span>
                 </div>
                 <span className="text-sm text-gray-700">Genera copy optimizado para RRSS</span>
               </motion.div>
               
               <motion.div 
                 className="flex items-center space-x-3 p-2 bg-purple-50 rounded-lg"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.5 }}
               >
                 <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                   <span className="text-white text-xs">3</span>
                 </div>
                 <span className="text-sm text-gray-700">Crea hashtags relevantes</span>
               </motion.div>
               
               <motion.div 
                 className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg"
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.7 }}
               >
                 <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                   <span className="text-white text-xs">4</span>
                 </div>
                 <span className="text-sm text-gray-700">Programa publicación automática</span>
               </motion.div>
             </div>
           </div>
           
           {/* Resultados del cliente */}
           <div className="space-y-2">
             <motion.div 
               className="bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-lg p-3 flex items-center space-x-3"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.5 }}
             >
               <div className="text-xl">💰</div>
               <div className="flex-1">
                 <div className="text-sm font-semibold">ROI del Cliente: +234%</div>
                 <div className="text-xs opacity-90">Inversión: $299/mes • Retorno: $1,000+ en leads</div>
               </div>
               <div className="text-xs bg-white/20 px-2 py-1 rounded">+234%</div>
             </motion.div>
             
             <motion.div 
               className="bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-lg p-3 flex items-center space-x-3"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.7 }}
             >
               <div className="text-xl">📈</div>
               <div className="flex-1">
                 <div className="text-sm font-semibold">Crecimiento Orgánico</div>
                 <div className="text-xs opacity-90">Seguidores: 2.4K → 8.7K • Alcance: +367%</div>
               </div>
               <div className="text-xs bg-white/20 px-2 py-1 rounded">+367%</div>
             </motion.div>
           </div>
         </div>
       )
     }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">🚀 Simulaciones en Vivo</h2>
                <p className="text-blue-100">Experimenta nuestros servicios de IA en acción</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {demos.map((demo, index) => (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(index)}
                className={`flex-1 px-6 py-4 text-center transition-all duration-300 ${
                  activeDemo === index
                    ? 'bg-white border-b-2 border-blue-600 text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <div className="text-2xl mb-2">{demo.title.split(' ')[0]}</div>
                <div className="text-sm font-medium">{demo.title.split(' ').slice(1).join(' ')}</div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{demos[activeDemo].title}</h3>
              <p className="text-gray-600">{demos[activeDemo].description}</p>
            </div>
            
            {demos[activeDemo].content}
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Simulación en tiempo real</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Interactivo</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Con IA</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                ¿Te gustó lo que viste? <span className="font-semibold">¡Hablemos de tu proyecto!</span>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    onClose();
                    // Aquí podrías abrir el modal de contacto
                    window.location.href = '/contacto';
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
