import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Funciones para manejar leads y cotizaciones
export const saveLead = async (leadData) => {
  try {
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
  } catch (error) {
    console.error('Error saving lead:', error);
    return { success: false, error: error.message };
  }
};

export const saveQuote = async (quoteData) => {
  try {
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
  } catch (error) {
    console.error('Error saving quote:', error);
    return { success: false, error: error.message };
  }
};

export const saveNewsletterSubscription = async (email) => {
  try {
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
  } catch (error) {
    console.error('Error saving newsletter subscription:', error);
    return { success: false, error: error.message };
  }
};
