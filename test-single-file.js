// TEST DE UN SOLO ARCHIVO
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testSingleFile() {
  console.log('🔥 TESTEANDO UN SOLO ARCHIVO...');
  
  const filePath = 'Resultados historicos/Football-Data.co.uk/Premier legague-2divis 20-25/E0.csv';
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    console.log(`📊 Total líneas: ${lines.length}`);
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    console.log(`🔍 Headers: ${headers.join(', ')}`);
    
    const headerStr = headers.join(' ').toLowerCase();
    console.log(`🔍 Header string: ${headerStr}`);
    
    // Detectar formato
    let format = 'unknown';
    if ((headerStr.includes('home') && headerStr.includes('away')) || 
        (headerStr.includes('hometeam') && headerStr.includes('awayteam')) ||
        (headerStr.includes('fthg') && headerStr.includes('ftag'))) {
      format = 'matches';
      console.log(`✅ Formato detectado: MATCHES`);
    } else {
      console.log(`⚠️ Formato no detectado: ${format}`);
    }
    
    if (format === 'matches') {
      console.log(`✅ PROCESANDO ARCHIVO DE PARTIDOS...`);
      
      // Detectar columnas
      const dateColumnIndex = headers.findIndex(h => 
        h.toLowerCase().includes('date') || h.toLowerCase().includes('fecha')
      );
      const homeTeamIndex = headers.findIndex(h => 
        h.toLowerCase().includes('hometeam') || h.toLowerCase().includes('home_team') || h.toLowerCase().includes('home')
      );
      const awayTeamIndex = headers.findIndex(h => 
        h.toLowerCase().includes('awayteam') || h.toLowerCase().includes('away_team') || h.toLowerCase().includes('away')
      );
      const homeScoreIndex = headers.findIndex(h => 
        h.toLowerCase().includes('fthg') || h.toLowerCase().includes('home_score')
      );
      const awayScoreIndex = headers.findIndex(h => 
        h.toLowerCase().includes('ftag') || h.toLowerCase().includes('away_score')
      );
      
      console.log(`🔍 Columnas detectadas:`);
      console.log(`   📅 Fecha: ${dateColumnIndex} (${headers[dateColumnIndex] || 'NO ENCONTRADA'})`);
      console.log(`   🏠 Equipo Local: ${homeTeamIndex} (${headers[homeTeamIndex] || 'NO ENCONTRADO'})`);
      console.log(`   🏃 Equipo Visitante: ${awayTeamIndex} (${headers[awayTeamIndex] || 'NO ENCONTRADO'})`);
      console.log(`   ⚽ Goles Local: ${homeScoreIndex} (${headers[homeScoreIndex] || 'NO ENCONTRADOS'})`);
      console.log(`   ⚽ Goles Visitante: ${awayScoreIndex} (${headers[awayScoreIndex] || 'NO ENCONTRADOS'})`);
      
      if (dateColumnIndex !== -1 && homeTeamIndex !== -1 && awayTeamIndex !== -1) {
        console.log(`✅ COLUMNAS VÁLIDAS ENCONTRADAS - PROCESANDO...`);
        
        const dataRows = lines.slice(1);
        console.log(`📊 Procesando ${dataRows.length} filas de partidos...`);
        
        // Procesar solo las primeras 3 filas
        const sampleRows = dataRows.slice(0, 3);
        
        for (let i = 0; i < sampleRows.length; i++) {
          const row = sampleRows[i];
          console.log(`\n📊 Fila ${i + 1}:`);
          console.log(`   Fecha: ${row[dateColumnIndex]}`);
          console.log(`   Local: ${row[homeTeamIndex]}`);
          console.log(`   Visitante: ${row[awayTeamIndex]}`);
          console.log(`   Goles Local: ${row[homeScoreIndex]}`);
          console.log(`   Goles Visitante: ${row[awayScoreIndex]}`);
        }
        
        console.log(`\n🎉 ¡TEST COMPLETADO EXITOSAMENTE!`);
        
      } else {
        console.log(`❌ COLUMNAS NO ENCONTRADAS`);
      }
    }
    
  } catch (error) {
    console.error(`❌ Error:`, error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testSingleFile();

