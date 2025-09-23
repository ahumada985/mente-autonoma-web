import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// POST - Crear configuración de handoff para un cliente
export async function POST(request: NextRequest) {
  try {
    const { client_id } = await request.json();

    if (!client_id) {
      return NextResponse.json({ error: 'client_id requerido' }, { status: 400 });
    }

    // Obtener información del cliente
    const { data: client } = await supabase
      .from('clients')
      .select('admin_email')
      .eq('id', client_id)
      .single();

    if (!client) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    // Crear configuración de handoff
    const { data, error } = await supabase
      .from('client_handoff_config')
      .insert({
        client_id,
        enabled: true,
        triggers: ["complex_query", "escalation_request", "bot_failure"],
        notification_methods: ["telegram", "email"],
        business_hours: {
          start: "09:00",
          end: "18:00",
          timezone: "America/Santiago",
          days: [1, 2, 3, 4, 5]
        },
        auto_response_template: "Hemos recibido tu consulta y un especialista te contactará pronto.",
        escalation_contacts: {
          support_email: client.admin_email
        },
        max_response_time: 120
      })
      .select()
      .single();

    if (error) {
      console.error('Error creando configuración handoff:', error);
      return NextResponse.json({ error: 'Error creando configuración' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Configuración de handoff creada exitosamente',
      config: data
    });

  } catch (error) {
    console.error('Error en POST handoff-config:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// GET - Obtener configuración de handoff
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');

    if (!clientId) {
      return NextResponse.json({ error: 'client_id requerido' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('client_handoff_config')
      .select('*')
      .eq('client_id', clientId)
      .single();

    if (error) {
      console.error('Error obteniendo configuración handoff:', error);
      return NextResponse.json({ error: 'Configuración no encontrada' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      config: data
    });

  } catch (error) {
    console.error('Error en GET handoff-config:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}