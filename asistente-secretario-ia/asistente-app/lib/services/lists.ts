import { supabaseAdmin } from '../supabase';
import type { AssistantList } from '../types/database';

/**
 * Obtiene todas las listas de un usuario
 */
export async function getUserLists(chatId: number): Promise<AssistantList[]> {
  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .select('*')
    .eq('chat_id', chatId)
    .order('updated_at', { ascending: false });

  if (error) {
    console.error('Error fetching lists:', error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene una lista por tipo
 */
export async function getListByType(
  chatId: number,
  tipo: string
): Promise<AssistantList | null> {
  const idCompuesta = `${chatId}-${tipo}`;

  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .select('*')
    .eq('id_compuesta', idCompuesta)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No encontrado
      return null;
    }
    console.error('Error fetching list:', error);
    throw error;
  }

  return data;
}

/**
 * Crea una nueva lista
 */
export async function createList(
  chatId: number,
  tipo: string,
  items: string[] = [],
  titulo?: string
): Promise<AssistantList> {
  const idCompuesta = `${chatId}-${tipo}`;

  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .insert({
      chat_id: chatId,
      tipo,
      titulo: titulo || `Lista de ${tipo}`,
      items,
      completado: false,
      fecha: new Date().toISOString(),
      id_compuesta: idCompuesta,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating list:', error);
    throw error;
  }

  return data;
}

/**
 * Agrega items a una lista existente (sin borrar los anteriores)
 */
export async function addItemsToList(
  chatId: number,
  tipo: string,
  newItems: string[]
): Promise<AssistantList> {
  // 1. Obtener lista actual
  const existingList = await getListByType(chatId, tipo);

  if (!existingList) {
    // Si no existe, crear nueva lista
    return createList(chatId, tipo, newItems);
  }

  // 2. Combinar items existentes con nuevos (sin duplicados)
  const currentItems = Array.isArray(existingList.items) ? existingList.items : [];
  const uniqueItems = [...new Set([...currentItems, ...newItems])];

  // 3. Actualizar lista
  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .update({
      items: uniqueItems,
      updated_at: new Date().toISOString(),
    })
    .eq('id_compuesta', existingList.id_compuesta)
    .select()
    .single();

  if (error) {
    console.error('Error updating list:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina items de una lista
 */
export async function removeItemsFromList(
  chatId: number,
  tipo: string,
  itemsToRemove: string[]
): Promise<AssistantList> {
  const existingList = await getListByType(chatId, tipo);

  if (!existingList) {
    throw new Error(`Lista de tipo "${tipo}" no encontrada`);
  }

  const currentItems = Array.isArray(existingList.items) ? existingList.items : [];
  const updatedItems = currentItems.filter(
    (item) => !itemsToRemove.includes(item)
  );

  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .update({
      items: updatedItems,
      updated_at: new Date().toISOString(),
    })
    .eq('id_compuesta', existingList.id_compuesta)
    .select()
    .single();

  if (error) {
    console.error('Error removing items:', error);
    throw error;
  }

  return data;
}

/**
 * Marca una lista como completada
 */
export async function markListAsCompleted(
  chatId: number,
  tipo: string,
  completed: boolean = true
): Promise<AssistantList> {
  const idCompuesta = `${chatId}-${tipo}`;

  const { data, error } = await supabaseAdmin
    .from('assistant_lists')
    .update({
      completado: completed,
      updated_at: new Date().toISOString(),
    })
    .eq('id_compuesta', idCompuesta)
    .select()
    .single();

  if (error) {
    console.error('Error marking list as completed:', error);
    throw error;
  }

  return data;
}

/**
 * Elimina una lista completa
 */
export async function deleteList(chatId: number, tipo: string): Promise<void> {
  const idCompuesta = `${chatId}-${tipo}`;

  const { error } = await supabaseAdmin
    .from('assistant_lists')
    .delete()
    .eq('id_compuesta', idCompuesta);

  if (error) {
    console.error('Error deleting list:', error);
    throw error;
  }
}
