'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import { useState } from 'react';

export default function Privacidad() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header especial para páginas legales */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <img src="/logo_final.png" alt="Mente Autónoma" className="w-10 h-10 object-contain" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Mente Autónoma</h1>
                <p className="text-sm text-gray-600">Soluciones Digitales</p>
              </div>
            </Link>
            
            {/* Menu */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Inicio
              </Link>
              <Link href="/noticias" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Noticias
              </Link>
              <Link href="/servicios-desarrollo-web" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Servicios
              </Link>
            </nav>
            
            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/contacto" 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl border-0 backdrop-blur-sm"
              >
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Política de Privacidad
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tu privacidad es importante para nosotros. Esta política describe cómo recopilamos, 
              usamos y protegemos tu información personal.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mt-6">
              📅 Última actualización: Enero 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">🔒</span>
                Información que Recopilamos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Recopilamos información que nos proporcionas directamente, como cuando:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Te suscribes a nuestro newsletter</li>
                  <li>Nos contactas a través de formularios</li>
                  <li>Participas en encuestas o eventos</li>
                  <li>Descargas recursos gratuitos</li>
                </ul>
                <p>
                  <strong>Tipos de información:</strong> Nombre, dirección de email, empresa, 
                  cargo, y cualquier otra información que elijas compartir.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🎯</span>
                Cómo Usamos tu Información
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Utilizamos tu información para:</p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Enviarte contenido relevante y actualizaciones</li>
                  <li>Proporcionar soporte técnico y atención al cliente</li>
                  <li>Mejorar nuestros servicios y experiencia del usuario</li>
                  <li>Enviar comunicaciones de marketing (con tu consentimiento)</li>
                  <li>Cumplir con obligaciones legales y contractuales</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">🤝</span>
                Compartir Información
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>No vendemos, alquilamos ni compartimos tu información personal</strong> 
                  con terceros, excepto en las siguientes circunstancias:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Con tu consentimiento explícito</li>
                  <li>Para cumplir con obligaciones legales</li>
                  <li>Con proveedores de servicios que nos ayudan a operar (con acuerdos de confidencialidad)</li>
                  <li>Para proteger nuestros derechos y seguridad</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">🛡️</span>
                Seguridad de Datos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas apropiadas para 
                  proteger tu información personal contra:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Acceso no autorizado</li>
                  <li>Alteración o destrucción</li>
                  <li>Divulgación accidental</li>
                  <li>Pérdida de datos</li>
                </ul>
                <p>
                  Utilizamos encriptación SSL/TLS, firewalls, y monitoreo continuo de seguridad.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">🍪</span>
                Cookies y Tecnologías de Seguimiento
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Utilizamos cookies y tecnologías similares para:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Mejorar la funcionalidad del sitio web</li>
                  <li>Analizar el tráfico y uso del sitio</li>
                  <li>Personalizar contenido y anuncios</li>
                  <li>Proporcionar funciones de redes sociales</li>
                </ul>
                <p>
                  Puedes controlar el uso de cookies a través de la configuración de tu navegador.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">📧</span>
                Tus Derechos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Tienes derecho a:</p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li><strong>Acceso:</strong> Solicitar una copia de tu información personal</li>
                  <li><strong>Rectificación:</strong> Corregir información inexacta o incompleta</li>
                  <li><strong>Eliminación:</strong> Solicitar la eliminación de tu información</li>
                  <li><strong>Portabilidad:</strong> Recibir tu información en formato estructurado</li>
                  <li><strong>Oposición:</strong> Oponerte al procesamiento de tus datos</li>
                  <li><strong>Retiro del consentimiento:</strong> Revocar tu consentimiento en cualquier momento</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">🌍</span>
                Transferencias Internacionales
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Tu información puede ser transferida y procesada en países fuera de tu residencia. 
                  Nos aseguramos de que estas transferencias cumplan con las leyes de protección 
                  de datos aplicables.
                </p>
              </div>
            </section>

           

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">📝</span>
                Cambios a esta Política
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                  sobre cambios significativos a través de:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Notificación en nuestro sitio web</li>
                  <li>Email directo a tu dirección registrada</li>
                  <li>Actualización de la fecha de &ldquo;última actualización&rdquo;</li>
                </ul>
                <p>
                  Te recomendamos revisar esta política periódicamente para mantenerte informado 
                  sobre cómo protegemos tu información.
                </p>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tienes Preguntas?
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos aquí para ayudarte con cualquier consulta sobre privacidad o protección de datos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📧 Contactar Soporte
              </button>
              <Link 
                href="/terminos"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                📋 Ver Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactType="soporte"
      />

      <Footer />
    </div>
  );
}
