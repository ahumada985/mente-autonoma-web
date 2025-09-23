import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configurar transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { type, data, adminEmail = 'ahumada.gb85@gmail.com' } = await request.json();

    if (!type || !data) {
      return NextResponse.json({ error: 'Tipo y datos requeridos' }, { status: 400 });
    }

    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'new_lead':
        subject = '🎯 Nuevo Lead del Chatbot - Mente Autónoma';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center; color: white;">
              <h1>🎯 Nuevo Lead Captado</h1>
            </div>
            <div style="padding: 20px; background-color: #f9fafb;">
              <h2>Detalles del Contacto:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #e5e7eb;">
                  <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">Nombre:</td>
                  <td style="padding: 10px; border: 1px solid #d1d5db;">${data.name || 'No proporcionado'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">Email:</td>
                  <td style="padding: 10px; border: 1px solid #d1d5db;">${data.email || 'No proporcionado'}</td>
                </tr>
                <tr style="background-color: #e5e7eb;">
                  <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">Teléfono:</td>
                  <td style="padding: 10px; border: 1px solid #d1d5db;">${data.phone || 'No proporcionado'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">Mensaje:</td>
                  <td style="padding: 10px; border: 1px solid #d1d5db;">${data.message || 'No hay mensaje'}</td>
                </tr>
                <tr style="background-color: #e5e7eb;">
                  <td style="padding: 10px; border: 1px solid #d1d5db; font-weight: bold;">Fecha:</td>
                  <td style="padding: 10px; border: 1px solid #d1d5db;">${new Date().toLocaleString('es-ES')}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #dbeafe; border-left: 4px solid #3b82f6;">
                <strong>🚀 Acción recomendada:</strong> Contactar dentro de las próximas 2 horas para maximizar conversión.
              </div>
            </div>
          </div>
        `;
        break;

      case 'low_satisfaction':
        subject = '⚠️ Alerta: Baja Satisfacción en Chatbot';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #f59e0b 0%, #dc2626 100%); padding: 20px; text-align: center; color: white;">
              <h1>⚠️ Alerta de Satisfacción</h1>
            </div>
            <div style="padding: 20px; background-color: #fef2f2;">
              <h2>Detalles de la Evaluación:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #fee2e2;">
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Rating:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.rating}/5 ⭐</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Usuario:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.sessionId || 'Usuario anónimo'}</td>
                </tr>
                <tr style="background-color: #fee2e2;">
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Comentario:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.comment || 'Sin comentario'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Fecha:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${new Date().toLocaleString('es-ES')}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #fef3c7; border-left: 4px solid #f59e0b;">
                <strong>🔧 Acción recomendada:</strong> Revisar y mejorar la respuesta del chatbot para este tipo de consultas.
              </div>
            </div>
          </div>
        `;
        break;

      case 'technical_error':
        subject = '🚨 Error Técnico en el Chatbot';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 20px; text-align: center; color: white;">
              <h1>🚨 Error Técnico Detectado</h1>
            </div>
            <div style="padding: 20px; background-color: #fef2f2;">
              <h2>Detalles del Error:</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #fee2e2;">
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Tipo de Error:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.errorType || 'Error desconocido'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Mensaje:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.errorMessage || 'Sin mensaje'}</td>
                </tr>
                <tr style="background-color: #fee2e2;">
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Usuario Afectado:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${data.sessionId || 'Usuario anónimo'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px; border: 1px solid #fca5a5; font-weight: bold;">Fecha:</td>
                  <td style="padding: 10px; border: 1px solid #fca5a5;">${new Date().toLocaleString('es-ES')}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #fee2e2; border-left: 4px solid #dc2626;">
                <strong>🛠️ Acción requerida:</strong> Revisar logs del sistema y corregir el problema inmediatamente.
              </div>
            </div>
          </div>
        `;
        break;

      case 'daily_summary':
        subject = '📊 Resumen Diario del Chatbot';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 20px; text-align: center; color: white;">
              <h1>📊 Resumen Diario</h1>
            </div>
            <div style="padding: 20px; background-color: #f0fdf4;">
              <h2>Métricas del Día:</h2>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 24px; font-weight: bold; color: #3b82f6;">${data.totalConversations}</div>
                  <div style="color: #6b7280;">Conversaciones</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 24px; font-weight: bold; color: #10b981;">${data.uniqueUsers}</div>
                  <div style="color: #6b7280;">Usuarios Únicos</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 24px; font-weight: bold; color: #8b5cf6;">${data.totalMessages}</div>
                  <div style="color: #6b7280;">Mensajes</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                  <div style="font-size: 24px; font-weight: bold; color: #f59e0b;">${data.avgSatisfaction || 'N/A'}</div>
                  <div style="color: #6b7280;">Satisfacción Promedio</div>
                </div>
              </div>
              <div style="margin-top: 20px; padding: 15px; background-color: #ecfdf5; border-left: 4px solid #10b981;">
                <strong>💡 Insight:</strong> ${data.insight || 'Día normal de operación del chatbot.'}
              </div>
            </div>
          </div>
        `;
        break;

      default:
        return NextResponse.json({ error: 'Tipo de notificación no válido' }, { status: 400 });
    }

    // Enviar email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: 'Notificación enviada correctamente',
      type,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando notificación:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}