'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import ContactModal from '@/components/ContactModal';
import { useState } from 'react';

export default function Terminos() {
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
              Términos de Servicio
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estos términos establecen las condiciones bajo las cuales Mente Autónoma proporciona 
              sus servicios digitales y de desarrollo web.
            </p>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mt-6">
              📅 Última actualización: Enero 2025
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">📋</span>
                Aceptación de Términos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Al acceder y utilizar nuestros servicios, aceptas estar sujeto a estos términos y condiciones. 
                  Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.
                </p>
                <p>
                  Estos términos se aplican a todos los servicios proporcionados por Mente Autónoma, incluyendo 
                  pero no limitado a desarrollo web, consultoría digital, y servicios de IA.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">🚀</span>
                Descripción de Servicios
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>Mente Autónoma ofrece los siguientes servicios:</p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Desarrollo de sitios web y aplicaciones web</li>
                  <li>Consultoría en estrategias digitales</li>
                  <li>Implementación de soluciones de IA</li>
                  <li>Optimización SEO y marketing digital</li>
                  <li>Mantenimiento y soporte técnico</li>
                </ul>
                <p>
                  Nos reservamos el derecho de modificar, suspender o discontinuar cualquier servicio 
                  con previo aviso a nuestros clientes.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">💰</span>
                Precios y Pagos
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Los precios de nuestros servicios están sujetos a cambios sin previo aviso. 
                  Los precios publicados no incluyen impuestos, que se aplicarán según corresponda.
                </p>
                <p>
                  <strong>Política de pagos:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Se requiere un depósito del 50% para iniciar el proyecto</li>
                  <li>El saldo restante se debe pagar al completar el proyecto</li>
                  <li>Aceptamos transferencias bancarias y pagos en línea</li>
                  <li>Los pagos atrasados pueden resultar en la suspensión del servicio</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">⏰</span>
                Plazos de Entrega
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Los plazos de entrega son estimaciones basadas en la información proporcionada por el cliente. 
                  Nos esforzamos por cumplir con estos plazos, pero no garantizamos fechas específicas de entrega.
                </p>
                <p>
                  <strong>Factores que pueden afectar los plazos:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Complejidad del proyecto</li>
                  <li>Disponibilidad de recursos</li>
                  <li>Retroalimentación oportuna del cliente</li>
                  <li>Cambios en los requisitos del proyecto</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">🔄</span>
                Revisiones y Cambios
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Incluimos un número limitado de revisiones en nuestros servicios. 
                  Las revisiones adicionales pueden incurrir en costos adicionales.
                </p>
                <p>
                  <strong>Política de revisiones:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Landing Pages: 2 revisiones incluidas</li>
                  <li>Sitios Web: 3 revisiones incluidas</li>
                  <li>Aplicaciones Web: 4 revisiones incluidas</li>
                  <li>Revisiones adicionales: $50.000 por revisión</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">🛡️</span>
                Propiedad Intelectual
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Una vez que se complete el pago total del proyecto, el cliente obtiene los derechos 
                  de uso del trabajo entregado, sujeto a las siguientes condiciones:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Mente Autónoma conserva el derecho de mostrar el trabajo en su portafolio</li>
                  <li>El cliente no puede revender o redistribuir el código fuente</li>
                  <li>Los elementos de terceros (fuentes, imágenes, etc.) mantienen sus licencias originales</li>
                  <li>Mente Autónoma puede reutilizar componentes genéricos en otros proyectos</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">📞</span>
                Soporte y Mantenimiento
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Nuestros servicios incluyen un período de soporte post-entrega. 
                  El mantenimiento continuo requiere un contrato separado.
                </p>
                <p>
                  <strong>Períodos de soporte incluidos:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Landing Pages: 30 días de soporte</li>
                  <li>Sitios Web: 60 días de soporte</li>
                  <li>Aplicaciones Web: 90 días de soporte</li>
                  <li>Soporte extendido: $100.000/mes</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">❌</span>
                Limitación de Responsabilidad
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Mente Autónoma no será responsable por daños indirectos, incidentales o consecuentes 
                  que surjan del uso de nuestros servicios.
                </p>
                <p>
                  <strong>Nuestra responsabilidad se limita a:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>El monto total pagado por el servicio</li>
                  <li>Corrección de errores en el código entregado</li>
                  <li>Garantía de funcionamiento según especificaciones acordadas</li>
                  <li>Soporte técnico durante el período contratado</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">🔒</span>
                Confidencialidad
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Mente Autónoma se compromete a mantener la confidencialidad de toda la información 
                  proporcionada por el cliente durante el desarrollo del proyecto.
                </p>
                <p>
                  <strong>Información protegida:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Datos comerciales y estratégicos</li>
                  <li>Información de usuarios y clientes</li>
                  <li>Propiedad intelectual y secretos comerciales</li>
                  <li>Información financiera y de precios</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mr-3">📝</span>
                Modificaciones
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Nos reservamos el derecho de modificar estos términos en cualquier momento. 
                  Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.
                </p>
                <p>
                  Te notificaremos sobre cambios significativos a través de:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-6">
                  <li>Notificación en nuestro sitio web</li>
                  <li>Email directo a tu dirección registrada</li>
                  <li>Actualización de la fecha de &ldquo;última actualización&rdquo;</li>
                </ul>
              </div>
            </section>
          </div>

          {/* CTA */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Tienes Preguntas?
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos aquí para ayudarte con cualquier consulta sobre nuestros términos de servicio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                📧 Contactar Legal
              </button>
              <Link 
                href="/privacidad"
                className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-2xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
              >
                📋 Ver Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de Contacto */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        contactType="legal"
      />

      <Footer />
    </div>
  );
}
