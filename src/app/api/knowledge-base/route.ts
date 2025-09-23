import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateContent, detectMassivePaste, suggestContentDivision, PLAN_LIMITS } from '@/lib/content-limits';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET - Obtener documentos de la base de conocimiento
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clientId = searchParams.get('client_id');
    const documentType = searchParams.get('type');
    const searchTerm = searchParams.get('q');

    if (!clientId) {
      return NextResponse.json({ error: 'client_id requerido' }, { status: 400 });
    }

    let query = supabase
      .from('client_knowledge_base')
      .select('*')
      .eq('client_id', clientId)
      .eq('active', true);

    // Filtrar por tipo si se especifica
    if (documentType) {
      query = query.eq('document_type', documentType);
    }

    // Búsqueda de texto simple
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('Error obteniendo base de conocimiento:', error);
      return NextResponse.json({ error: 'Error obteniendo documentos' }, { status: 500 });
    }

    // 🆕 Si se solicita estadísticas de uso
    if (searchParams.get('stats') === 'true') {
      // Obtener información del cliente y plan
      const { data: client } = await supabase
        .from('clients')
        .select('plan, name')
        .eq('id', clientId)
        .single();

      if (!client) {
        return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
      }

      // Calcular estadísticas de uso
      const totalContent = data?.reduce((sum, doc) => sum + doc.content.length, 0) || 0;
      const totalDocuments = data?.length || 0;
      const planLimits = PLAN_LIMITS[client.plan] || PLAN_LIMITS.basic;

      // Agrupar por tipo de documento
      const documentsByType = data?.reduce((acc, doc) => {
        acc[doc.document_type] = (acc[doc.document_type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>) || {};

      return NextResponse.json({
        success: true,
        client: {
          name: client.name,
          plan: client.plan
        },
        usage: {
          documents: {
            current: totalDocuments,
            limit: planLimits.maxDocuments,
            percentage: Math.round((totalDocuments / planLimits.maxDocuments) * 100)
          },
          content: {
            current: totalContent,
            limit: planLimits.maxTotalContent,
            percentage: Math.round((totalContent / planLimits.maxTotalContent) * 100)
          },
          documentsByType,
          allowedTypes: planLimits.allowedTypes
        },
        documents: data || [],
        total: data?.length || 0
      });
    }

    return NextResponse.json({
      success: true,
      documents: data || [],
      total: data?.length || 0
    });

  } catch (error) {
    console.error('Error en API knowledge-base:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// POST - Crear nuevo documento
export async function POST(request: NextRequest) {
  try {
    const {
      client_id,
      document_type,
      title,
      content,
      metadata = {}
    } = await request.json();

    if (!client_id || !document_type || !title || !content) {
      return NextResponse.json({
        error: 'client_id, document_type, title y content son requeridos'
      }, { status: 400 });
    }

    // Validar tipos de documento permitidos
    const allowedTypes = ['about', 'services', 'faq', 'cases', 'values', 'policies'];
    if (!allowedTypes.includes(document_type)) {
      return NextResponse.json({
        error: `Tipo de documento inválido. Permitidos: ${allowedTypes.join(', ')}`
      }, { status: 400 });
    }

    // Verificar límites por plan del cliente
    const { data: client } = await supabase
      .from('clients')
      .select('plan')
      .eq('id', client_id)
      .single();

    if (!client) {
      return NextResponse.json({ error: 'Cliente no encontrado' }, { status: 404 });
    }

    // 🆕 Detectar si es un pegado masivo
    const massivePasteCheck = detectMassivePaste(content);
    if (massivePasteCheck.suspicious) {
      return NextResponse.json({
        error: 'Contenido sospechoso detectado',
        reasons: massivePasteCheck.reasons,
        confidence: massivePasteCheck.confidence,
        suggestion: 'Divide el contenido en documentos más específicos',
        suggestedDivision: suggestContentDivision(content, PLAN_LIMITS[client.plan]?.maxContentLength || 2000)
      }, { status: 400 });
    }

    // Obtener contenido total existente del cliente
    const { data: existingContent } = await supabase
      .from('client_knowledge_base')
      .select('content')
      .eq('client_id', client_id)
      .eq('active', true);

    const clientTotalContent = existingContent?.reduce((total, doc) => total + doc.content.length, 0) || 0;

    // 🆕 Usar sistema completo de validación
    const validation = validateContent(client.plan, content, clientTotalContent);

    if (!validation.valid) {
      return NextResponse.json({
        error: validation.error,
        suggestions: validation.suggestions,
        currentPlan: client.plan,
        limits: PLAN_LIMITS[client.plan],
        currentUsage: {
          totalContent: clientTotalContent,
          newContentLength: content.length
        }
      }, { status: 403 });
    }

    // Contar documentos existentes para límite de cantidad
    const { count } = await supabase
      .from('client_knowledge_base')
      .select('*', { count: 'exact', head: true })
      .eq('client_id', client_id)
      .eq('active', true);

    const planLimits = PLAN_LIMITS[client.plan] || PLAN_LIMITS.basic;

    if ((count || 0) >= planLimits.maxDocuments) {
      return NextResponse.json({
        error: `Límite de documentos alcanzado para plan ${client.plan}. Máximo: ${planLimits.maxDocuments}`,
        currentCount: count,
        maxAllowed: planLimits.maxDocuments
      }, { status: 403 });
    }

    // Verificar que el tipo de documento esté permitido en el plan
    if (!planLimits.allowedTypes.includes(document_type)) {
      return NextResponse.json({
        error: `Tipo de documento "${document_type}" no permitido en plan ${client.plan}`,
        allowedTypes: planLimits.allowedTypes,
        suggestion: 'Upgrader a un plan superior para acceder a más tipos de documentos'
      }, { status: 403 });
    }

    // Crear documento
    const { data, error } = await supabase
      .from('client_knowledge_base')
      .insert({
        client_id,
        document_type,
        title,
        content,
        metadata,
        active: true
      })
      .select()
      .single();

    if (error) {
      console.error('Error creando documento:', error);
      return NextResponse.json({ error: 'Error creando documento' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Documento creado exitosamente',
      document: data
    });

  } catch (error) {
    console.error('Error en POST knowledge-base:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// PUT - Actualizar documento existente
export async function PUT(request: NextRequest) {
  try {
    const { id, title, content, metadata, active } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID del documento requerido' }, { status: 400 });
    }

    const updateData: any = { updated_at: new Date().toISOString() };

    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (metadata !== undefined) updateData.metadata = metadata;
    if (active !== undefined) updateData.active = active;

    const { data, error } = await supabase
      .from('client_knowledge_base')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error actualizando documento:', error);
      return NextResponse.json({ error: 'Error actualizando documento' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Documento actualizado exitosamente',
      document: data
    });

  } catch (error) {
    console.error('Error en PUT knowledge-base:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}

// DELETE - Eliminar documento (soft delete)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID del documento requerido' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('client_knowledge_base')
      .update({
        active: false,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error eliminando documento:', error);
      return NextResponse.json({ error: 'Error eliminando documento' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Documento no encontrado' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Documento eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en DELETE knowledge-base:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}