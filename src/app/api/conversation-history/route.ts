import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Obtener historial de conversaciones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID requerido' }, { status: 400 });
    }

    // Obtener conversaciones de Supabase
    const { data, error } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error obteniendo historial:', error);
      return NextResponse.json({ error: 'Error obteniendo historial' }, { status: 500 });
    }

    // Convertir datos de Supabase al formato esperado
    const conversations = data?.map(item => ({
      id: item.id,
      text: item.message_text,
      sender: item.sender,
      timestamp: new Date(item.created_at),
      rating: item.rating,
      feedback: item.feedback
    })) || [];

    return NextResponse.json({
      success: true,
      conversations,
      total: conversations.length
    });

  } catch (error) {
    console.error('Error en API de historial:', error);
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

// POST - Guardar historial de conversaciones
export async function POST(request: NextRequest) {
  try {
    const { session_id, messages } = await request.json();

    if (!session_id || !messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Datos requeridos' }, { status: 400 });
    }

    // Limpiar historial anterior para esta sesión
    await supabase
      .from('conversation_history')
      .delete()
      .eq('session_id', session_id);

    // Preparar datos para insertar
    const conversationData = messages
      .filter(msg => msg.id !== 'welcome') // Excluir mensaje de bienvenida
      .map(msg => ({
        session_id,
        message_id: msg.id,
        message_text: msg.text,
        sender: msg.sender,
        rating: msg.rating || null,
        feedback: msg.feedback || null,
        created_at: msg.timestamp instanceof Date ? msg.timestamp.toISOString() : new Date(msg.timestamp).toISOString()
      }));

    if (conversationData.length === 0) {
      return NextResponse.json({ success: true, message: 'No hay mensajes para guardar' });
    }

    // Insertar conversaciones en Supabase
    const { data, error } = await supabase
      .from('conversation_history')
      .insert(conversationData);

    if (error) {
      console.error('Error guardando historial:', error);
      return NextResponse.json({ error: 'Error guardando historial' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Historial guardado exitosamente',
      saved_messages: conversationData.length
    });

  } catch (error) {
    console.error('Error en API de historial:', error);
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

// DELETE - Limpiar historial de conversaciones
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID requerido' }, { status: 400 });
    }

    // Eliminar conversaciones de Supabase
    const { error } = await supabase
      .from('conversation_history')
      .delete()
      .eq('session_id', sessionId);

    if (error) {
      console.error('Error eliminando historial:', error);
      return NextResponse.json({ error: 'Error eliminando historial' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Historial eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en API de historial:', error);
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





