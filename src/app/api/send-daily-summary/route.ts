import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendDailySummary } from '@/lib/notifications';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Obtener estadísticas del día actual
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Obtener conversaciones del día
    const { data: conversations, error } = await supabase
      .from('conversation_history')
      .select('*')
      .gte('created_at', startOfDay.toISOString())
      .lt('created_at', endOfDay.toISOString());

    if (error) {
      throw new Error(`Error obteniendo datos: ${error.message}`);
    }

    // Calcular métricas
    const totalConversations = conversations?.length || 0;
    const uniqueUsers = [...new Set(conversations?.map(c => c.session_id))].length;
    const totalMessages = conversations?.length || 0;

    // Calcular satisfacción promedio
    const ratingsData = conversations?.filter(c => c.rating) || [];
    const avgSatisfaction = ratingsData.length > 0
      ? (ratingsData.reduce((sum, c) => sum + (c.rating || 0), 0) / ratingsData.length).toFixed(1)
      : 'N/A';

    // Generar insight inteligente
    let insight = 'Día normal de operación del chatbot.';

    if (totalConversations === 0) {
      insight = 'No hubo conversaciones hoy. Considerar revisar la visibilidad del chatbot.';
    } else if (totalConversations > 50) {
      insight = '¡Día muy activo! Alto volumen de conversaciones.';
    } else if (avgSatisfaction !== 'N/A' && parseFloat(avgSatisfaction) < 3) {
      insight = 'Atención: Satisfacción baja detectada. Revisar respuestas del chatbot.';
    } else if (uniqueUsers / totalConversations > 0.8) {
      insight = 'Excelente alcance: Alto ratio de usuarios únicos vs conversaciones.';
    }

    // Enviar resumen por email
    const summaryData = {
      totalConversations,
      uniqueUsers,
      totalMessages,
      avgSatisfaction,
      insight
    };

    const result = await sendDailySummary(summaryData);

    if (!result.success) {
      throw new Error(result.error || 'Error enviando resumen');
    }

    return NextResponse.json({
      success: true,
      message: 'Resumen diario enviado correctamente',
      data: summaryData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error enviando resumen diario:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Error enviando resumen diario',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// También permitir GET para testing manual
export async function GET(request: NextRequest) {
  return POST(request);
}