import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const clientId = searchParams.get('client_id') || 'mente_autonoma'; // Por defecto Mente Autónoma
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    // Obtener estadísticas de conversaciones filtradas por cliente
    const { data: conversations, error: convError } = await supabase
      .from('conversation_history')
      .select('*')
      .eq('client_id', clientId)
      .gte('created_at', dateFrom.toISOString());

    if (convError) {
      console.error('Error obteniendo conversaciones:', convError);
      return NextResponse.json({ error: 'Error obteniendo datos' }, { status: 500 });
    }

    // Analizar datos
    const analytics = {
      totalConversations: conversations?.length || 0,
      totalMessages: conversations?.length || 0,
      uniqueUsers: [...new Set(conversations?.map(c => c.session_id))].length,
      avgMessagesPerUser: conversations?.length ?
        (conversations.length / [...new Set(conversations.map(c => c.session_id))].length) : 0,

      // Análisis por día
      dailyStats: getDailyStats(conversations || []),

      // Análisis de sentimiento (ratings)
      satisfactionStats: getSatisfactionStats(conversations || []),

      // Palabras más usadas
      popularKeywords: getPopularKeywords(conversations || []),

      // Horarios más activos
      busyHours: getBusyHours(conversations || []),

      // Tipos de consulta más comunes
      queryTypes: getQueryTypes(conversations || [])
    };

    return NextResponse.json({
      success: true,
      analytics,
      period: `${days} días`,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en analytics:', error);
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

function getDailyStats(conversations: any[]) {
  const dailyMap = new Map();

  conversations.forEach(conv => {
    const date = new Date(conv.created_at).toISOString().split('T')[0];
    if (!dailyMap.has(date)) {
      dailyMap.set(date, { date, messages: 0, users: new Set() });
    }
    const dayData = dailyMap.get(date);
    dayData.messages++;
    dayData.users.add(conv.session_id);
  });

  return Array.from(dailyMap.values()).map(day => ({
    date: day.date,
    messages: day.messages,
    uniqueUsers: day.users.size
  })).sort((a, b) => a.date.localeCompare(b.date));
}

function getSatisfactionStats(conversations: any[]) {
  const ratings = conversations
    .filter(c => c.rating)
    .map(c => c.rating);

  if (ratings.length === 0) {
    return { average: 0, total: 0, distribution: {} };
  }

  const distribution = ratings.reduce((acc, rating) => {
    acc[rating] = (acc[rating] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  return {
    average: ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length,
    total: ratings.length,
    distribution
  };
}

function getPopularKeywords(conversations: any[]) {
  const keywords = new Map();
  const stopWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'como', 'del', 'al'];

  conversations
    .filter(c => c.sender === 'user')
    .forEach(conv => {
      const words = conv.message_text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter((word: string) => word.length > 3 && !stopWords.includes(word));

      words.forEach((word: string) => {
        keywords.set(word, (keywords.get(word) || 0) + 1);
      });
    });

  return Array.from(keywords.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

function getBusyHours(conversations: any[]) {
  const hourMap = new Map();

  conversations.forEach(conv => {
    const hour = new Date(conv.created_at).getHours();
    hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
  });

  return Array.from(hourMap.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([hour, count]) => ({ hour, count }));
}

function getQueryTypes(conversations: any[]) {
  const types = new Map();
  const userMessages = conversations.filter(c => c.sender === 'user');

  userMessages.forEach(conv => {
    const text = conv.message_text.toLowerCase();
    let type = 'general';

    if (text.includes('precio') || text.includes('costo') || text.includes('cuanto')) {
      type = 'pricing';
    } else if (text.includes('ayuda') || text.includes('help') || text.includes('problema')) {
      type = 'support';
    } else if (text.includes('producto') || text.includes('servicio') || text.includes('feature')) {
      type = 'product';
    } else if (text.includes('contacto') || text.includes('hablar') || text.includes('llamar')) {
      type = 'contact';
    }

    types.set(type, (types.get(type) || 0) + 1);
  });

  return Array.from(types.entries())
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
}