// Tipos de la base de datos Supabase

export interface User {
  id: string;
  email?: string;
  nombre?: string;
  avatar_url?: string;
  chat_id?: number;
  phone?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface AssistantList {
  id: string;
  user_id?: string;
  chat_id: number;
  tipo: string;
  titulo?: string;
  items: string[] | any[];
  completado: boolean;
  fecha: string;
  id_compuesta: string;
  created_at: string;
  updated_at: string;
}

export interface AssistantTask {
  id: string;
  user_id?: string;
  chat_id: number;
  tipo: string;
  contenido: string;
  detalles?: Record<string, any>;
  completado: boolean;
  prioridad: 'baja' | 'media' | 'alta';
  fecha_creacion: string;
  fecha_vencimiento?: string;
  created_at: string;
  updated_at: string;
}

export interface AssistantConversation {
  id: string;
  user_id?: string;
  chat_id: number;
  user_message: string;
  ai_response: string;
  context_used?: any[];
  embedding?: number[];
  metadata?: Record<string, any>;
  created_at: string;
}

export interface AssistantReminder {
  id: string;
  user_id?: string;
  chat_id: number;
  mensaje: string;
  fecha_recordatorio: string;
  enviado: boolean;
  metadata?: Record<string, any>;
  created_at: string;
}

export interface AssistantCalendarEvent {
  id: string;
  user_id?: string;
  chat_id: number;
  google_event_id: string;
  summary: string;
  description?: string;
  start_time: string;
  end_time: string;
  location?: string;
  attendees?: any[];
  metadata?: Record<string, any>;
  synced_at: string;
  created_at: string;
}

// Tipos para respuestas RPC
export interface SearchConversationResult {
  id: string;
  user_message: string;
  ai_response: string;
  similarity: number;
  created_at: string;
}

export interface UserStats {
  total_lists: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  pending_reminders: number;
  total_conversations: number;
  upcoming_events: number;
}
