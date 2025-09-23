import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validar que las variables de entorno estén disponibles
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ ERROR: Variables de entorno de Supabase no están configuradas');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ No configurada');
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Configurada' : '❌ No configurada');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Interfaces para TypeScript
interface LeadData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  source?: string;
}

interface QuoteData {
  name: string;
  email: string;
  company: string;
  phone?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  features?: string[];
  additionalServices?: string[];
}

interface SupabaseResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Funciones para manejar leads y cotizaciones
export const saveLead = async (leadData: LeadData): Promise<SupabaseResponse> => {
  try {
    // Verificar que Supabase esté configurado
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase no está configurado correctamente');
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: leadData.name,
          email: leadData.email,
          company: leadData.company,
          phone: leadData.phone,
          source: leadData.source || 'website',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving lead:', error);
    return { success: false, error: error.message };
  }
};

export const saveQuote = async (quoteData: QuoteData): Promise<SupabaseResponse> => {
  try {
    // Verificar que Supabase esté configurado
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase no está configurado correctamente');
    }

    const { data, error } = await supabase
      .from('quotes')
      .insert([
        {
          name: quoteData.name,
          email: quoteData.email,
          company: quoteData.company,
          phone: quoteData.phone,
          project_type: quoteData.projectType,
          budget: quoteData.budget,
          timeline: quoteData.timeline,
          description: quoteData.description,
          features: quoteData.features,
          additional_services: quoteData.additionalServices,
          status: 'pending',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving quote:', error);
    return { success: false, error: error.message };
  }
};

export const saveNewsletterSubscription = async (email: string): Promise<SupabaseResponse> => {
  try {
    // Verificar que Supabase esté configurado
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase no está configurado correctamente');
    }

    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([
        {
          email: email,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving newsletter subscription:', error);
    return { success: false, error: error.message };
  }
};

// Función para guardar contactos
export async function saveContact(
  name: string,
  email: string,
  company: string,
  message: string,
  contactType: string = 'general'
): Promise<SupabaseResponse> {
  try {
    // Verificar que Supabase esté configurado
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase no está configurado correctamente');
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([
        {
          name,
          email,
          company,
          message,
          contact_type: contactType,
          source: 'contact_form',
          created_at: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error saving contact:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Error saving contact:', error);
    return { success: false, error: error.message };
  }
}
