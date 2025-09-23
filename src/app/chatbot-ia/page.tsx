'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRocket, FaRobot, FaBolt, FaCheckCircle, FaChartLine, FaCrown } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// Usando componentes HTML básicos para evitar dependencias
import { saveLead, saveContact } from '@/lib/supabase';
import FloatingChatbot from '../../components/FloatingChatbot';
import Footer from '@/components/Footer';

// Componente de partículas flotantes (ultra optimizado)
const FloatingParticles = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear"
          }}
          style={{
            left: `${20 + i * 20}%`,
            top: `${20 + i * 15}%`,
          }}
        />
      ))}
    </div>
  );
});

// Contador animado (optimizado)
const AnimatedCounter = React.memo(({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Resetear contador a 0 cuando cambia el valor
    setCount(0);

    // Animar el contador
    let currentCount = 0;
    const increment = value / 20; // Dividir en 20 pasos para animación suave
    const duration = 2000; // 2 segundos total
    const stepTime = duration / 20;

    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentCount));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count.toLocaleString()}{suffix}</span>;
});

// Contador de tiempo de respuesta animado hasta 1.5s
const ResponseTimeCounter = React.memo(({ suffix = "s" }: { suffix?: string }) => {
  const [responseTime, setResponseTime] = useState(0);

  useEffect(() => {
    let current = 0;
    const target = 1.5;
    const increment = target / 30; // 30 pasos para animación suave
    const stepTime = 80; // Más rápido que otros contadores

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setResponseTime(target);
        clearInterval(timer);
      } else {
        setResponseTime(Number(current.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return <span>{responseTime}{suffix}</span>;
});

// Contador 24/7 que anima desde 0/0 hasta 24/7
const AvailabilityCounter = React.memo(({ suffix = "/7" }: { suffix?: string }) => {
  const [hours, setHours] = useState(0);
  const [days, setDays] = useState(0);

  useEffect(() => {
    // Animar las horas primero (0 a 24)
    if (hours < 24) {
      const timer = setTimeout(() => {
        setHours(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timer);
    }
    // Luego animar los días (0 a 7)
    else if (days < 7) {
      const timer = setTimeout(() => {
        setDays(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [hours, days]);

  return <span>{hours}/{days}</span>;
});

export default function ChatbotIAPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [chatbotTheme, setChatbotTheme] = useState('blue');
  const [chatbotSize, setChatbotSize] = useState('medium'); // small, medium, large
  const [chatbotPosition, setChatbotPosition] = useState('bottom-right'); // bottom-right, bottom-left, center
  const [chatbotStyle, setChatbotStyle] = useState('modern'); // modern, minimal, rounded
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    planInterest: 'pro'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Función para cambiar el tema del chatbot
  const changeTheme = (theme: string) => {
    setChatbotTheme(theme);
    updateChatbotSettings({ theme });
  };

  // Función para cambiar el tamaño del chatbot
  const changeSize = (size: string) => {
    setChatbotSize(size);
    updateChatbotSettings({ size });
  };

  // Función para cambiar la posición del chatbot
  const changePosition = (position: string) => {
    setChatbotPosition(position);
    updateChatbotSettings({ position });
  };

  // Función para cambiar el estilo del chatbot
  const changeStyle = (style: string) => {
    setChatbotStyle(style);
    updateChatbotSettings({ style });
  };

  // Función unificada para actualizar el chatbot
  const updateChatbotSettings = (newSettings: any) => {
    // Enviar evento para actualizar el FloatingChatbot
    const event = new CustomEvent('updateChatbotSettings', {
      detail: {
        theme: chatbotTheme,
        size: chatbotSize,
        position: chatbotPosition,
        style: chatbotStyle,
        ...newSettings
      }
    });
    window.dispatchEvent(event);
  };

  const plans = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '30.000',
      originalPrice: '50.000',
      badge: 'Más Popular',
      badgeColor: 'bg-green-500',
      description: 'Perfecto para empezar',
      features: [
        'Chatbot con respuestas predefinidas',
        'Widget personalizable',
        '100 conversaciones/mes (luego modo solo lectura)',
        'Soporte por email (48h)',
        'Analytics básicos',
        'Instalación en 30 segundos'
      ],
      color: 'from-green-400 to-emerald-600',
      icon: FaRocket
    },
    {
      id: 'pro',
      name: 'Plan Pro',
      price: '60.000',
      originalPrice: '100.000',
      badge: 'Recomendado',
      badgeColor: 'bg-purple-500',
      description: 'IA real conversacional',
      features: [
        'Todo del plan Básico +',
        'IA real OpenAI GPT-4',
        '1.000 conversaciones/mes',
        'Memoria conversacional (7 mensajes)',
        'Reportes mensuales detallados',
        'Analytics avanzados',
        'Soporte prioritario 24h'
      ],
      color: 'from-purple-500 to-blue-600',
      icon: FaRobot
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '100.000',
      originalPrice: '180.000',
      badge: 'Máximo Poder',
      badgeColor: 'bg-yellow-500',
      description: 'Para empresas serias',
      features: [
        'Todo del plan Pro +',
        'Conversaciones ILIMITADAS',
        'Memoria conversacional (15 mensajes)',
        'API completa acceso total',
        'Integraciones personalizadas',
        'Base de conocimiento propia',
        'Reportes ejecutivos',
        'Soporte 24/7',
        'Consultoría incluida'
      ],
      color: 'from-yellow-400 to-orange-500',
      icon: FaCrown
    }
  ];

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos requeridos
    if (!contactForm.name || !contactForm.email || !contactForm.company) {
      alert('Por favor completa todos los campos requeridos (Nombre, Email, Empresa)');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 Enviando formulario de contacto...', {
        name: contactForm.name,
        email: contactForm.email,
        company: contactForm.company,
        planInterest: contactForm.planInterest
      });

      // Primero guardar el contacto
      const contactResult = await saveContact(
        contactForm.name,
        contactForm.email,
        contactForm.company,
        contactForm.message,
        'chatbot_lead'
      );

      console.log('📝 Resultado del contacto:', contactResult);

      // Luego guardar el lead
      const leadResult = await saveLead({
        name: contactForm.name,
        email: contactForm.email,
        company: contactForm.company,
        phone: contactForm.phone,
        source: `chatbot_plan_${contactForm.planInterest}`
      });

      console.log('👤 Resultado del lead:', leadResult);

      // Verificar ambos resultados
      if (contactResult.success && leadResult.success) {
        console.log('✅ Formulario enviado exitosamente a ambas tablas');
        setSubmitStatus('success');
        // Limpiar formulario
        setContactForm({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          planInterest: 'pro'
        });
      } else {
        console.error('❌ Error en el envío:', {
          contactSuccess: contactResult.success,
          contactError: contactResult.error,
          leadSuccess: leadResult.success,
          leadError: leadResult.error
        });

        // Si al menos uno fue exitoso, considerarlo parcial éxito
        if (contactResult.success || leadResult.success) {
          console.log('⚠️ Envío parcial exitoso');
          setSubmitStatus('success');
        } else {
          setSubmitStatus('error');
        }
      }
    } catch (error) {
      console.error('💥 Error submitting form:', error);
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      <FloatingParticles />

      {/* Hero Section - DE OTRO MUNDO */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium mb-8 shadow-lg"
          >
            <FaBolt className="w-4 h-4 mr-2 animate-pulse" />
            Chatbot IA de Nueva Generación
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-6xl md:text-8xl font-bold mb-8"
          >
            Chatbot
            <span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent block">
              Inteligencia Artificial
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
          >
            La revolución de la atención al cliente ha llegado.
            <span className="text-yellow-400 font-semibold"> IA que entiende, aprende y vende por ti</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Button
              onClick={() => {
                const chatbotButton = document.querySelector('[data-chatbot-button]') as HTMLElement;
                if (chatbotButton) chatbotButton.click();
              }}
              className="px-10 py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-2xl font-bold text-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              <FaRocket className="mr-3" />
              Ver Demo Ahora
            </Button>

            <Button
              onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
              variant="outline"
              className="px-10 py-6 border-2 border-purple-400 text-purple-400 rounded-2xl font-bold text-xl hover:bg-purple-400 hover:text-white transition-all duration-300"
            >
              <FaCrown className="mr-3" />
              Ver Planes
            </Button>
          </motion.div>

          {/* Estadísticas Impresionantes */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {[
              { value: 99, suffix: '%', label: 'Satisfacción', interactive: true },
              { value: 5, suffix: 'min', label: 'Instalación', interactive: true },
              { value: 24, suffix: '/7', label: 'Disponible', interactive: true },
              { value: 1.5, suffix: 's', label: 'Respuesta', interactive: true }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center cursor-pointer group"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                  {stat.label === 'Respuesta' ? (
                    <ResponseTimeCounter suffix={stat.suffix} />
                  ) : stat.label === 'Disponible' ? (
                    <AvailabilityCounter suffix={stat.suffix} />
                  ) : (
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-gray-400 font-medium group-hover:text-white transition-colors">{stat.label}</div>
                <motion.div
                  className="h-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Características Revolucionarias */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Tecnología
              </span> del Futuro
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No es solo un chatbot, es tu empleado virtual más inteligente
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: FaRobot,
                title: "IA GPT-4 Avanzada",
                description: "Powered by OpenAI para conversaciones naturales que convierten",
                features: ["Comprensión contextual", "Respuestas personalizadas", "Aprendizaje continuo"],
                gradient: "from-blue-500 to-purple-600"
              },
              {
                icon: FaChartLine,
                title: "Analytics en Tiempo Real",
                description: "Monitoreo completo con LangSmith para optimización constante",
                features: ["Métricas de conversión", "Tiempo de respuesta", "Patrones de usuarios"],
                gradient: "from-green-500 to-teal-600"
              },
              {
                icon: FaBolt,
                title: "Instalación Instantánea",
                description: "Una línea de código y listo. Compatible con cualquier sitio web",
                features: ["30 segundos setup", "Universal compatible", "Cero configuración"],
                gradient: "from-yellow-500 to-orange-600"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <Card className="h-full bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500 transition-all duration-500 transform perspective-1000">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="text-3xl text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-3">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-300 text-base">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* La Magia en Vivo - Demo Interactivo AVANZADO */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">
                Personaliza tu Chatbot
              </span> en Tiempo Real
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              No solo cambia colores. Ajusta tamaño, posición, estilo y más.
              <span className="text-yellow-400 font-semibold"> El poder de personalización total.</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-700"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">🎨 Personalizador Avanzado</h3>
              <p className="text-gray-300">
                Cambia todo en tiempo real y ve los resultados al instante →
                <span className="text-yellow-400 font-semibold"> (Observa la esquina inferior derecha)</span>
              </p>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
              {/* Temas de Color */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">🎨</span> Temas de Color
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'blue', color: 'from-blue-500 to-blue-600', emoji: '🔵', name: 'Azul' },
                    { id: 'green', color: 'from-green-500 to-green-600', emoji: '🟢', name: 'Verde' },
                    { id: 'red', color: 'from-red-500 to-red-600', emoji: '🔴', name: 'Rojo' },
                    { id: 'purple', color: 'from-purple-500 to-purple-600', emoji: '🟣', name: 'Morado' }
                  ].map((theme) => (
                    <Button
                      key={theme.id}
                      onClick={() => changeTheme(theme.id)}
                      className={`py-2 px-3 rounded-lg font-semibold transition-all duration-300 text-sm ${
                        chatbotTheme === theme.id
                          ? `bg-gradient-to-r ${theme.color} text-white ring-2 ring-white`
                          : `bg-gradient-to-r ${theme.color} text-white hover:scale-105`
                      }`}
                    >
                      {theme.emoji}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Tamaños */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📏</span> Tamaño
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'small', name: 'Pequeño', emoji: '🔸' },
                    { id: 'medium', name: 'Mediano', emoji: '🔹' },
                    { id: 'large', name: 'Grande', emoji: '🔶' }
                  ].map((size) => (
                    <Button
                      key={size.id}
                      onClick={() => changeSize(size.id)}
                      className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                        chatbotSize === size.id
                          ? 'bg-yellow-500 text-black ring-2 ring-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {size.emoji} {size.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Posiciones */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">📍</span> Posición
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'bottom-right', name: 'Abajo Derecha', emoji: '↘️' },
                    { id: 'bottom-left', name: 'Abajo Izquierda', emoji: '↙️' },
                    { id: 'center', name: 'Centro', emoji: '🎯' }
                  ].map((position) => (
                    <Button
                      key={position.id}
                      onClick={() => changePosition(position.id)}
                      className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                        chatbotPosition === position.id
                          ? 'bg-pink-500 text-white ring-2 ring-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {position.emoji} {position.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Estilos */}
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                  <span className="mr-2">✨</span> Estilo
                </h4>
                <div className="space-y-2">
                  {[
                    { id: 'modern', name: 'Moderno', emoji: '🚀' },
                    { id: 'minimal', name: 'Minimalista', emoji: '⚪' },
                    { id: 'rounded', name: 'Redondeado', emoji: '🟡' }
                  ].map((style) => (
                    <Button
                      key={style.id}
                      onClick={() => changeStyle(style.id)}
                      className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 text-sm ${
                        chatbotStyle === style.id
                          ? 'bg-emerald-500 text-white ring-2 ring-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                    >
                      {style.emoji} {style.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Área de conversaciones sugeridas */}
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-600 mb-8">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center">
                <span className="mr-2">💬</span> Conversaciones de Prueba
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  '¿Cuánto cuesta?',
                  '¿Cómo funciona?',
                  'Necesito un chatbot para mi restaurante',
                  '¿Funciona en Shopify?',
                  'Quiero el plan premium',
                  '¿Tienes soporte 24/7?'
                ].map((question, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
                    <FaBolt className="text-yellow-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">"{question}"</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action Final */}
            <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-6 border border-yellow-400/30 text-center">
              <h4 className="text-2xl font-bold text-yellow-400 mb-3">🎯 Configuración Actual</h4>
              <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Tema:</span>
                  <span className="text-white font-semibold ml-2 capitalize">{chatbotTheme}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Tamaño:</span>
                  <span className="text-white font-semibold ml-2 capitalize">{chatbotSize}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Posición:</span>
                  <span className="text-white font-semibold ml-2 capitalize">{chatbotPosition.replace('-', ' ')}</span>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <span className="text-gray-400">Estilo:</span>
                  <span className="text-white font-semibold ml-2 capitalize">{chatbotStyle}</span>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Esta configuración se aplicará automáticamente a tu sitio web.
                <span className="text-white font-semibold"> Instalación: una línea de código.</span>
              </p>
              <Button
                onClick={() => document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
              >
                <FaRocket className="mr-2" />
                ¡Quiero Esta Configuración!
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Planes de Precios - INSUPERABLES */}
      <section id="planes" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Planes que
              <span className="bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent"> Revolucionan</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desde emprendedores hasta corporaciones. Tenemos el plan perfecto para ti.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`relative ${selectedPlan === plan.id ? 'ring-4 ring-yellow-400' : ''}`}
              >
                <Card className={`h-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 hover:border-purple-500 transition-all duration-500 ${selectedPlan === plan.id ? 'border-yellow-400 shadow-2xl shadow-yellow-400/25' : 'border-gray-700'}`}>
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 ${plan.badgeColor} text-white text-sm font-bold rounded-full`}>
                      {plan.badge}
                    </div>
                  )}

                  <CardHeader className="text-center pt-8">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center`}>
                      <plan.icon className="text-2xl text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>

                    <div className="my-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                        <span className="text-gray-400 ml-2">/mes</span>
                      </div>
                      <div className="text-sm text-gray-500 line-through">${plan.originalPrice}/mes</div>
                      <div className="text-green-400 font-semibold text-sm mt-1">
                        Ahorras ${parseInt(plan.originalPrice) - parseInt(plan.price)}/mes
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-gray-300">
                          <FaCheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                          <span className={feature.includes('Todo del plan') ? 'text-yellow-400 font-semibold' : ''}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => {
                        setSelectedPlan(plan.id);
                        setContactForm(prev => ({ ...prev, planInterest: plan.id }));
                        document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full py-4 font-bold text-lg rounded-xl transition-all duration-300 ${
                        selectedPlan === plan.id
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-300 hover:to-orange-400'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      }`}
                    >
                      {selectedPlan === plan.id ? '✨ Plan Seleccionado' : '🚀 Seleccionar Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Garantía */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full text-white font-semibold">
              <FaCheckCircle className="mr-2" />
              Demo GRATUITO disponible - Sin compromisos
            </div>
          </motion.div>
        </div>
      </section>

      {/* Formulario de Contacto - NEXT LEVEL */}
      <section id="contacto" className="py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ¿Listo para
              </span> Revolucionar?
            </h2>
            <p className="text-xl text-gray-300">
              Únete a las empresas que ya están dominando con IA
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-white">
                  Obtén tu Chatbot IA Personalizado
                </CardTitle>
                <CardDescription className="text-center text-gray-300">
                  Plan seleccionado: <span className="text-yellow-400 font-semibold">
                    {plans.find(p => p.id === selectedPlan)?.name}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitContact} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-medium mb-2">Nombre *</label>
                      <input
                        id="name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-white font-medium mb-2">Email *</label>
                      <input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-white font-medium mb-2">Empresa *</label>
                      <input
                        id="company"
                        type="text"
                        value={contactForm.company}
                        onChange={(e) => setContactForm(prev => ({ ...prev, company: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-white font-medium mb-2">Teléfono</label>
                      <input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-medium mb-2">Mensaje</label>
                    <textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      placeholder="Cuéntanos sobre tu proyecto y cómo podemos ayudarte..."
                    />
                  </div>

                  <AnimatePresence>
                    {submitStatus === 'success' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-green-600 text-white p-4 rounded-lg"
                      >
                        ¡Excelente! Hemos recibido tu solicitud. Te contactaremos pronto.
                      </motion.div>
                    )}

                    {submitStatus === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-red-600 text-white p-4 rounded-lg"
                      >
                        Hubo un error. Por favor intenta nuevamente.
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xl rounded-xl hover:from-yellow-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                        Enviando...
                      </div>
                    ) : (
                      <>
                        <FaRocket className="mr-3" />
                        Obtener Mi Chatbot IA Ahora
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer estándar de Mente Autónoma */}
      <Footer />

      <FloatingChatbot />

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}