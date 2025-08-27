'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    setIsLoading(true);
    setTestResult('Probando conexión...');
    
    try {
      // Verificar variables de entorno
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      if (!url || !key) {
        setTestResult('❌ ERROR: Variables de entorno no disponibles');
        return;
      }

      // Probar conexión simple
      const { data, error } = await supabase
        .from('leads')
        .select('count')
        .limit(1);

      if (error) {
        setTestResult(`❌ ERROR de conexión: ${error.message}`);
      } else {
        setTestResult('✅ CONEXIÓN EXITOSA con Supabase');
      }
    } catch (error) {
      setTestResult(`❌ ERROR: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 z-50">
      <h3 className="font-bold text-gray-800 mb-2">🔍 Test Supabase</h3>
      <button
        onClick={testConnection}
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Probando...' : 'Probar Conexión'}
      </button>
      {testResult && (
        <p className="mt-2 text-sm text-gray-600">{testResult}</p>
      )}
    </div>
  );
}
