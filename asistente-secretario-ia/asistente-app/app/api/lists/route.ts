import { NextRequest, NextResponse } from 'next/server';
import {
  getUserLists,
  getListByType,
  createList,
  addItemsToList,
  removeItemsFromList,
  markListAsCompleted,
  deleteList,
} from '@/lib/services/lists';

/**
 * GET /api/lists?chatId=123
 * Obtiene todas las listas de un usuario
 */
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const chatId = searchParams.get('chatId');
    const tipo = searchParams.get('tipo');

    if (!chatId) {
      return NextResponse.json(
        { error: 'chatId es requerido' },
        { status: 400 }
      );
    }

    const chatIdNum = parseInt(chatId);

    // Si se especifica tipo, obtener solo esa lista
    if (tipo) {
      const list = await getListByType(chatIdNum, tipo);
      return NextResponse.json({ list });
    }

    // Sino, obtener todas las listas
    const lists = await getUserLists(chatIdNum);
    return NextResponse.json({ lists });
  } catch (error) {
    console.error('Error in GET /api/lists:', error);
    return NextResponse.json(
      { error: 'Error obteniendo listas' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/lists
 * Crea o actualiza una lista
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { chatId, tipo, items, titulo, action } = body;

    if (!chatId || !tipo) {
      return NextResponse.json(
        { error: 'chatId y tipo son requeridos' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'create':
        result = await createList(chatId, tipo, items, titulo);
        break;

      case 'add':
        result = await addItemsToList(chatId, tipo, items || []);
        break;

      case 'remove':
        result = await removeItemsFromList(chatId, tipo, items || []);
        break;

      case 'complete':
        result = await markListAsCompleted(chatId, tipo, true);
        break;

      case 'uncomplete':
        result = await markListAsCompleted(chatId, tipo, false);
        break;

      default:
        // Por defecto, agregar items
        result = await addItemsToList(chatId, tipo, items || []);
    }

    return NextResponse.json({ success: true, list: result });
  } catch (error) {
    console.error('Error in POST /api/lists:', error);
    return NextResponse.json(
      { error: 'Error procesando lista' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/lists?chatId=123&tipo=supermercado
 * Elimina una lista completa
 */
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const chatId = searchParams.get('chatId');
    const tipo = searchParams.get('tipo');

    if (!chatId || !tipo) {
      return NextResponse.json(
        { error: 'chatId y tipo son requeridos' },
        { status: 400 }
      );
    }

    const chatIdNum = parseInt(chatId);
    await deleteList(chatIdNum, tipo);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/lists:', error);
    return NextResponse.json(
      { error: 'Error eliminando lista' },
      { status: 500 }
    );
  }
}
