import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Obtener todos los clientes o uno específico
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');

    if (clientId) {
      // Obtener cliente específico
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', clientId)
        .single();

      if (error) {
        return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
      }

      return NextResponse.json({ success: true, client: data });
    } else {
      // Obtener todos los clientes
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error obteniendo clientes:', error);
        return NextResponse.json({ error: 'Error obteniendo clientes' }, { status: 500 });
      }

      return NextResponse.json({ success: true, clients: data || [] });
    }

  } catch (error) {
    console.error('Error en API de clientes:', error);
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

// POST - Crear nuevo cliente
export async function POST(request: NextRequest) {
  try {
    const {
      id,
      name,
      admin_email,
      domain,
      plan = 'basic',
      custom_prompt,
      theme_colors,
      business_hours
    } = await request.json();

    if (!id || !name || !admin_email) {
      return NextResponse.json({
        error: 'ID, nombre y email son requeridos'
      }, { status: 400 });
    }

    // Crear cliente en Supabase
    const { data, error } = await supabase
      .from('clients')
      .insert({
        id: id.toLowerCase().replace(/[^a-z0-9_]/g, '_'), // Sanitizar ID
        name,
        admin_email,
        domain,
        plan,
        custom_prompt,
        theme_colors: theme_colors || { primary: "#6366f1", secondary: "#8b5cf6" },
        business_hours: business_hours || { enabled: false, timezone: "America/Santiago" },
        active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creando cliente:', error);

      if (error.code === '23505') { // Duplicate key
        return NextResponse.json({
          error: 'El ID del cliente ya existe'
        }, { status: 409 });
      }

      return NextResponse.json({
        error: 'Error creando cliente'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cliente creado exitosamente',
      client: data
    });

  } catch (error) {
    console.error('Error en creación de cliente:', error);
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

// PUT - Actualizar cliente existente
export async function PUT(request: NextRequest) {
  try {
    const {
      id,
      name,
      admin_email,
      domain,
      plan,
      custom_prompt,
      theme_colors,
      business_hours,
      active
    } = await request.json();

    if (!id) {
      return NextResponse.json({
        error: 'ID del cliente es requerido'
      }, { status: 400 });
    }

    // Actualizar cliente en Supabase
    const updateData: any = { updated_at: new Date().toISOString() };

    if (name !== undefined) updateData.name = name;
    if (admin_email !== undefined) updateData.admin_email = admin_email;
    if (domain !== undefined) updateData.domain = domain;
    if (plan !== undefined) updateData.plan = plan;
    if (custom_prompt !== undefined) updateData.custom_prompt = custom_prompt;
    if (theme_colors !== undefined) updateData.theme_colors = theme_colors;
    if (business_hours !== undefined) updateData.business_hours = business_hours;
    if (active !== undefined) updateData.active = active;

    const { data, error } = await supabase
      .from('clients')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error actualizando cliente:', error);
      return NextResponse.json({
        error: 'Error actualizando cliente'
      }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        error: 'Cliente no encontrado'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cliente actualizado exitosamente',
      client: data
    });

  } catch (error) {
    console.error('Error en actualización de cliente:', error);
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

// DELETE - Desactivar cliente (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');

    if (!clientId) {
      return NextResponse.json({
        error: 'ID del cliente es requerido'
      }, { status: 400 });
    }

    // Desactivar cliente (soft delete)
    const { data, error } = await supabase
      .from('clients')
      .update({
        active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', clientId)
      .select()
      .single();

    if (error) {
      console.error('Error desactivando cliente:', error);
      return NextResponse.json({
        error: 'Error desactivando cliente'
      }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({
        error: 'Cliente no encontrado'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Cliente desactivado exitosamente'
    });

  } catch (error) {
    console.error('Error en desactivación de cliente:', error);
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