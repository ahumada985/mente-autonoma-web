// ============================================
// SCRIPT DE MIGRACIÓN: Google Sheets → Supabase
// Super Humano Digital
// ============================================

const { createClient } = require('@supabase/supabase-js');

// ============================================
// CONFIGURACIÓN
// ============================================

const SUPABASE_URL = 'https://lgqkqndlodyaqahbixtw.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'TU_SERVICE_ROLE_KEY'; // Reemplazar con tu key

// ID de tu Google Sheet
const GOOGLE_SHEET_ID = '1vmIpxm3PJ8mDvhDEavBqbEHE9Aq28r0sXRSf6ndcTpE';
const SHEET_NAME = 'Listas';

// ============================================
// INICIALIZAR SUPABASE
// ============================================

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// ============================================
// FUNCIÓN PRINCIPAL DE MIGRACIÓN
// ============================================

async function migrateData() {
  console.log('🚀 Iniciando migración de Google Sheets a Supabase...\n');

  try {
    // Paso 1: Leer datos de Google Sheets
    console.log('📊 Leyendo datos de Google Sheets...');
    const sheetsData = await fetchGoogleSheetsData();
    console.log(`✅ ${sheetsData.length} registros encontrados\n`);

    if (sheetsData.length === 0) {
      console.log('⚠️  No hay datos para migrar');
      return;
    }

    // Paso 2: Transformar datos
    console.log('🔄 Transformando datos...');
    const transformedData = transformData(sheetsData);
    console.log(`✅ ${transformedData.length} registros transformados\n`);

    // Paso 3: Insertar en Supabase
    console.log('💾 Insertando datos en Supabase...');
    const result = await insertToSupabase(transformedData);

    if (result.error) {
      console.error('❌ Error al insertar:', result.error);
      return;
    }

    console.log(`✅ ${result.data?.length || 0} registros insertados correctamente\n`);
    console.log('🎉 ¡Migración completada exitosamente!');

  } catch (error) {
    console.error('❌ Error en la migración:', error);
  }
}

// ============================================
// LEER DATOS DE GOOGLE SHEETS
// ============================================

async function fetchGoogleSheetsData() {
  // OPCIÓN A: Si tienes n8n corriendo, usar webhook
  // OPCIÓN B: Usar Google Sheets API directamente
  // OPCIÓN C: Exportar CSV y leer archivo

  // Por ahora, vamos a usar datos de ejemplo
  // TÚ DEBES REEMPLAZAR ESTO con tus datos reales

  const exampleData = [
    {
      chat_id: '6843729570',
      tipo: 'supermercado',
      titulo: 'Lista de supermercado',
      items: '["leche", "pan", "huevos"]',
      completado: 'false',
      fecha: '2025-10-14T00:47:05.917Z',
      ID_compuesta: '6843729570-supermercado'
    }
    // Agrega más registros aquí...
  ];

  return exampleData;
}

// ============================================
// TRANSFORMAR DATOS
// ============================================

function transformData(sheetsData) {
  return sheetsData.map(row => {
    // Parsear items si es string JSON
    let items = [];
    try {
      if (typeof row.items === 'string') {
        items = JSON.parse(row.items);
      } else if (Array.isArray(row.items)) {
        items = row.items;
      }
    } catch (e) {
      console.warn(`⚠️  Error parseando items para ${row.ID_compuesta}:`, e.message);
      items = [];
    }

    return {
      chat_id: parseInt(row.chat_id),
      tipo: row.tipo || '',
      titulo: row.titulo || `Lista de ${row.tipo}`,
      items: items,
      completado: row.completado === 'true' || row.completado === true,
      fecha: row.fecha || new Date().toISOString(),
      id_compuesta: row.ID_compuesta || `${row.chat_id}-${row.tipo}`,
      created_at: row.fecha || new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  });
}

// ============================================
// INSERTAR EN SUPABASE
// ============================================

async function insertToSupabase(data) {
  const { data: insertedData, error } = await supabase
    .from('assistant_lists')
    .insert(data)
    .select();

  return { data: insertedData, error };
}

// ============================================
// VERIFICAR MIGRACIÓN
// ============================================

async function verifyMigration() {
  console.log('\n🔍 Verificando migración...');

  const { data, error, count } = await supabase
    .from('assistant_lists')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('❌ Error al verificar:', error);
    return;
  }

  console.log(`✅ Total de registros en Supabase: ${count}`);
  console.log('\nPrimeros 3 registros:');
  data?.slice(0, 3).forEach((record, i) => {
    console.log(`\n${i + 1}. ${record.titulo}`);
    console.log(`   Tipo: ${record.tipo}`);
    console.log(`   Items: ${record.items.length} items`);
    console.log(`   Completado: ${record.completado}`);
  });
}

// ============================================
// EJECUTAR MIGRACIÓN
// ============================================

if (require.main === module) {
  migrateData()
    .then(() => verifyMigration())
    .catch(console.error);
}

module.exports = { migrateData, transformData };
