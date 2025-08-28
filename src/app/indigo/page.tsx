'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Indigo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company || null
          // Solo enviamos los campos que existen en la tabla
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', terms: false });
        setTimeout(() => setSubmitStatus(''), 3000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus(''), 3000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Estándar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-300" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Soluciones Digitales</p>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Inicio
              </Link>
              <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <Link href="/contacto" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* CTA - Newsletter + PDF Gratuito */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-slate-800 to-black text-white relative overflow-hidden">
        {/* Elementos decorativos de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="mb-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white px-8 py-3 text-sm shadow-2xl rounded-full inline-block animate-pulse">
              🚀 ACCESO EXCLUSIVO
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
              ¿Quieres Ser el Primero en
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent"> Implementar IA en tu Industria?</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Únete a nuestra comunidad de innovadores y recibe acceso anticipado a las últimas tecnologías de IA.
              <span className="text-white font-semibold"> Suscríbete HOY</span> y obtén nuestro reporte exclusivo con
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent font-bold"> estrategias secretas de IA que están revolucionando negocios</span>.
            </p>
          </div>
          
          {/* Formulario de suscripción mejorado */}
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              {/* Efecto de brillo exterior */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              {/* Container principal del formulario */}
              <div className="relative bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-emerald-500/20 shadow-2xl">
                {/* Header del formulario */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full px-6 py-2 border border-emerald-500/30 mb-4">
                    <span className="text-2xl">🎯</span>
                    <span className="text-emerald-300 font-semibold">OFERTA LIMITADA</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    🚀 Únete a la Revolución IA
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto">
                    Recibe estrategias exclusivas y el <span className="text-emerald-300 font-semibold">PDF gratuito</span> con las 
                    <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent font-bold"> 30 mejores ideas para aplicar IA en tu negocio</span>
                  </p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Campo Nombre */}
                    <div className="relative group">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Tu nombre completo"
                        className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
                        required
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Campo Email */}
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                        className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
                        required
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>

                  {/* Campo Empresa (opcional) */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Nombre de tu empresa (opcional)"
                      className="w-full px-6 py-4 bg-white/5 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 backdrop-blur-sm group-hover:border-gray-600/50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>

                  {/* Checkbox de términos */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="mt-1.5 w-5 h-5 bg-white/5 border-2 border-gray-700/50 rounded text-emerald-500 focus:ring-emerald-500/50 focus:ring-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-300 leading-relaxed">
                      Acepto recibir emails con contenido exclusivo sobre IA y estrategias de negocio. 
                      <span className="text-emerald-300">Puedes cancelar en cualquier momento.</span>
                    </label>
                  </div>

                  {/* Mensaje de estado */}
                  {submitStatus === 'success' && (
                    <div className="text-center p-4 bg-green-500/20 border border-green-500/30 rounded-xl">
                      <p className="text-green-300 font-semibold">¡Gracias! Te hemos enviado el PDF por email.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="text-center p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                      <p className="text-red-300 font-semibold">Hubo un error. Por favor intenta nuevamente.</p>
                    </div>
                  )}

                  {/* Botón de suscripción */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-bold py-5 px-8 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <div className="relative flex items-center justify-center space-x-3">
                      <span className="text-2xl">🚀</span>
                      <span className="text-lg font-bold">
                        {isSubmitting ? 'Enviando...' : 'Suscribirse Gratis + Obtener PDF'}
                      </span>
                      <span className="text-2xl">🎁</span>
                    </div>
                  </button>

                  {/* Garantía de seguridad */}
                  <div className="text-center pt-4">
                    <p className="text-sm text-gray-400 flex items-center justify-center space-x-2">
                      <span>🔒</span>
                      <span>100% seguro. Sin spam. Cancela cuando quieras.</span>
                    </p>
                  </div>
                </form>

                {/* Beneficios destacados */}
                <div className="mt-8 pt-8 border-t border-gray-700/30">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                      <div className="text-2xl mb-2">📊</div>
                      <h4 className="font-semibold text-white mb-1">Estrategias Probadas</h4>
                      <p className="text-xs text-gray-300">30 ideas implementables</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-xl border border-teal-500/20">
                      <div className="text-2xl mb-2">⚡</div>
                      <h4 className="font-semibold text-white mb-1">Acceso Inmediato</h4>
                      <p className="text-xs text-gray-300">PDF en tu email al instante</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20">
                      <div className="text-2xl mb-2">🎯</div>
                      <h4 className="font-semibold text-white mb-1">Contenido Exclusivo</h4>
                      <p className="text-xs text-gray-300">Solo para suscriptores</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Estándar */}
      <Footer />

      <style jsx>{`
        @keyframes tilt {
          0%, 50%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(0.5deg);
          }
          75% {
            transform: rotate(-0.5deg);
          }
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
      `}</style>
    </div>
  )
}
