import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { notifyNewLead } from '@/lib/notifications';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, message, sessionId, source = 'chatbot' } = await request.json();

    // Validar que al menos email o teléfono estén presentes
    if (!email && !phone) {
      return NextResponse.json({
        error: 'Se requiere al menos email o teléfono'
      }, { status: 400 });
    }

    // Crear objeto de lead
    const leadData = {
      name: name || 'Sin nombre',
      email: email || null,
      phone: phone || null,
      message: message || '',
      session_id: sessionId,
      source,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    // Guardar en Supabase
    const { data, error } = await supabase
      .from('leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      console.error('Error guardando lead:', error);

      // Aún así enviar la notificación por email
      try {
        await notifyNewLead({
          name,
          email,
          phone,
          message: `${message}\n\nNOTA: Error guardando en base de datos: ${error.message}`
        });
      } catch (notifError) {
        console.error('Error enviando notificación:', notifError);
      }

      return NextResponse.json({
        error: 'Error guardando lead, pero notificación enviada',
        details: error.message
      }, { status: 500 });
    }

    // Enviar notificación por email del nuevo lead
    try {
      const notificationResult = await notifyNewLead({
        name,
        email,
        phone,
        message
      });

      if (!notificationResult.success) {
        console.error('Error enviando notificación:', notificationResult.error);
      }
    } catch (notifError) {
      console.error('Error enviando notificación:', notifError);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead capturado correctamente',
      leadId: data.id,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error procesando lead:', error);
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

