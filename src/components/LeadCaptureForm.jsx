'use client';

import { useState, useEffect } from 'react';
import { captureLead, checkEmailExists } from '@/lib/firebase';
import { validateEmail, logAttempt, detectSpamPatterns, generateCSRFToken } from '@/lib/antiSpam';

export default function LeadCaptureForm({ 
  title = "¡Únete a la Revolución IA!", 
  subtitle = "Recibe las últimas noticias y estrategias para tu negocio",
  buttonText = "Suscribirse Gratis",
  showNewsletter = true,
  showPDF = true,
  useOriginalStyle = false,
  compact = false
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Generar token CSRF al montar el componente
  useEffect(() => {
    setCsrfToken(generateCSRFToken());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Verificar honeypot (si se llenó, es un bot)
    if (honeypot) {
      console.log('Bot detectado por honeypot');
      setStatus('error');
      setMessage('Solicitud rechazada por seguridad');
      return;
    }
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Por favor ingresa un email válido');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // Obtener IP del cliente (en producción usarías un servicio real)
      const clientIP = '127.0.0.1'; // En desarrollo
      
      // Validación completa del email
      const validation = await validateEmail(email, clientIP);
      
      if (!validation.valid) {
        setStatus('error');
        setMessage(validation.reason);
        
        // Registrar intento fallido
        await logAttempt(clientIP, email, false, validation.reason);
        return;
      }
      
      // Detectar patrones de spam
      const spamCheck = detectSpamPatterns(email, navigator.userAgent);
      if (spamCheck.isSpam) {
        setStatus('error');
        setMessage('Email detectado como spam. Por favor usa un email válido.');
        
        // Registrar intento de spam
        await logAttempt(clientIP, email, false, `Spam detectado: ${spamCheck.reasons.join(', ')}`);
        return;
      }

      // Capturar el lead
      const result = await captureLead(email, {
        formType: 'newsletter',
        timestamp: new Date().toISOString(),
        csrfToken,
        userAgent: navigator.userAgent,
        clientIP
      });

      if (result.success) {
        setStatus('success');
        setMessage('¡Gracias! Tu email ha sido registrado exitosamente.');
        setEmail('');
        
        // Registrar intento exitoso
        await logAttempt(clientIP, email, true, 'Lead capturado exitosamente');
      } else {
        setStatus('error');
        setMessage('Hubo un error. Por favor intenta nuevamente.');
        
        // Registrar intento fallido
        await logAttempt(clientIP, email, false, result.error || 'Error desconocido');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error de conexión. Por favor verifica tu internet.');
      console.error('Error en handleSubmit:', error);
    }
  };

  return (
    <div className={
      compact ? "space-y-4" : 
      useOriginalStyle ? "space-y-6" : 
      "bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 rounded-3xl p-8 text-white shadow-2xl"
    }>
      {!useOriginalStyle && !compact && (
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">{title}</h3>
          <p className="text-lg text-gray-200">{subtitle}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className={compact ? "space-y-4" : "space-y-6"}>
        {/* Campo honeypot oculto para detectar bots */}
        <div className="hidden">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex="-1"
            autoComplete="off"
          />
        </div>
        
        <div className="relative">
          {!compact && (
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">📧</span>
              </div>
            </div>
          )}
          <input 
            type="email" 
            placeholder={compact ? "Tu correo electrónico" : "Ingresa tu correo empresarial aquí..."}
            className={`w-full ${compact ? 'px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 bg-white/95 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500' : 'pl-16 pr-6 py-4 bg-white/20 border-2 border-white/30 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:bg-white/30'} transition-all duration-300 text-lg`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!compact && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={status === 'loading'}
          className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white transition-all duration-500 transform hover:scale-105 shadow-2xl relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed ${
            compact 
              ? 'py-4 rounded-2xl font-bold text-lg border-2 border-white/20' 
              : 'py-5 rounded-2xl font-bold text-xl'
          }`}
        >
          {status === 'loading' ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Procesando...
            </span>
          ) : (
            <span className="relative z-10 flex items-center justify-center space-x-3">
              {compact ? (
                buttonText
              ) : (
                <>
                  <span>🚀 SUSCRIBIRME GRATIS</span>
                  <span className="text-sm opacity-90">+ PDF EXCLUSIVO</span>
                </>
              )}
            </span>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Mensajes de estado */}
        {status === 'success' && (
          <div className="bg-green-500/30 border-2 border-green-400 text-green-100 px-6 py-4 rounded-2xl text-center text-lg font-bold shadow-lg animate-pulse">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🎉</span>
              <span>{message}</span>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-500/30 border-2 border-red-400 text-red-100 px-6 py-4 rounded-2xl text-center text-lg font-bold shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">⚠️</span>
              <span>{message}</span>
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
        )}

        {/* Beneficios adicionales */}
        {useOriginalStyle && (
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🔮</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Tendencias Futuras</h4>
                <p className="text-gray-300 text-sm">Descubre qué tecnologías IA dominarán el mercado</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Contenido Premium</h4>
                <p className="text-gray-300 text-sm">Acceso a webinars y masterclasses exclusivas</p>
              </div>
              
              <div className="group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">🌟</span>
                </div>
                <h4 className="text-white font-semibold mb-2">Acceso VIP</h4>
                <p className="text-gray-300 text-sm">Contenido exclusivo y herramientas premium</p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
