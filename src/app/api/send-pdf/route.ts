import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { name, email, company } = await request.json();

    // Configurar el transportador de email
              const transporter = nodemailer.createTransport({
      service: 'gmail', // Puedes cambiar a otro servicio
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Usar contraseña de aplicación de Gmail
      },
    });

    // Leer el PDF
    const pdfPath = path.join(process.cwd(), 'public', 'PDF', 'ia_pymes.pdf');
    const pdfBuffer = fs.readFileSync(pdfPath);

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎁 Tu PDF Exclusivo: 30 Ideas de IA para tu Negocio',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; border-radius: 20px; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🚀 ¡Bienvenido a la Revolución IA!</h1>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 15px; margin-bottom: 30px;">
            <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 22px;">Hola ${name},</h2>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              ¡Gracias por unirte a nuestra comunidad de innovadores! Como prometimos, aquí tienes tu 
              <strong>PDF exclusivo con las 30 mejores ideas para aplicar IA en tu negocio</strong>.
            </p>
            
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Este documento contiene estrategias probadas que están revolucionando negocios en todo el mundo.
              Cada idea incluye pasos específicos de implementación y casos de éxito reales.
            </p>
            
            <div style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 18px;">🎯 Lo que encontrarás en el PDF:</h3>
              <ul style="text-align: left; margin: 0; padding-left: 20px;">
                <li>Estrategias de automatización inteligente</li>
                <li>Sistemas de chatbots avanzados</li>
                <li>Análisis predictivo con IA</li>
                <li>Optimización de procesos empresariales</li>
                <li>Casos de éxito con métricas reales</li>
              </ul>
            </div>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 15px; margin-bottom: 30px;">
            <h3 style="color: #ffffff; margin: 0 0 15px 0; font-size: 20px;">📧 Próximos pasos:</h3>
            <p style="font-size: 16px; line-height: 1.6; margin: 0;">
              En los próximos días recibirás emails con contenido exclusivo sobre IA, tendencias del mercado 
              y estrategias avanzadas para implementar en tu empresa.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="font-size: 14px; color: rgba(255,255,255,0.8); margin: 0;">
              ¿Tienes preguntas? Responde a este email o contáctanos en 
              <a href="mailto:contacto@menteautonoma.cl" style="color: #ffffff; text-decoration: underline;">contacto@menteautonoma.cl</a>
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: '30_Ideas_IA_Para_Tu_Negocio.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'PDF enviado exitosamente' 
    });

  } catch (error) {
    console.error('Error enviando PDF:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error al enviar el PDF' 
      },
      { status: 500 }
    );
  }
}
