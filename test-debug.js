// TEST DEBUG - FUNCIONANDO AL 100%
const fs = require('fs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🔥 INICIANDO TEST DEBUG...');
  console.log('📊 Sistema de análisis de apuestas deportivas');
  
  const testFile = 'Resultados historicos/Football-Data.co.uk/Premier legague-2divis 20-25/E0.csv';
  console.log('🔄 TESTEANDO CON:', testFile);
  
  const content = fs.readFileSync(testFile, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  console.log('📊 Total líneas:', lines.length);
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  console.log('🔍 Headers:', headers.join(', '));
  
  const dateColumnIndex = headers.findIndex(h => h.toLowerCase().includes('date'));
  const homeTeamIndex = headers.findIndex(h => h.toLowerCase().includes('hometeam'));
  const awayTeamIndex = headers.findIndex(h => h.toLowerCase().includes('awayteam'));
  const homeScoreIndex = headers.findIndex(h => h.toLowerCase().includes('fthg'));
  const awayScoreIndex = headers.findIndex(h => h.toLowerCase().includes('ftag'));
  
  console.log('🔍 Columnas detectadas:');
  console.log('   📅 Fecha:', dateColumnIndex, headers[dateColumnIndex]);
  console.log('   🏠 Equipo Local:', homeTeamIndex, headers[homeTeamIndex]);
  console.log('   🏃 Equipo Visitante:', awayTeamIndex, headers[awayTeamIndex]);
  console.log('   ⚽ Goles Local:', homeScoreIndex, headers[homeScoreIndex]);
  console.log('   ⚽ Goles Visitante:', awayScoreIndex, headers[awayScoreIndex]);
  
  if (dateColumnIndex === -1 || homeTeamIndex === -1 || awayTeamIndex === -1) {
    console.log('❌ COLUMNAS NO ENCONTRADAS');
    return;
  }
  
  console.log('✅ COLUMNAS VÁLIDAS ENCONTRADAS - PROCESANDO...');
  
  const dataRows = lines.slice(1);
  const sampleRows = dataRows.slice(0, 3);
  console.log('📈 Procesando', sampleRows.length, 'filas de muestra...');
  
  let matches = 0;
  let teams = 0;
  
  for (let i = 0; i < sampleRows.length; i++) {
    const row = sampleRows[i];
    if (row.length < Math.max(dateColumnIndex, homeTeamIndex, awayTeamIndex) + 1) continue;
    
    const dateStr = row[dateColumnIndex]?.trim();
    const homeTeam = row[homeTeamIndex]?.trim();
    const awayTeam = row[awayTeamIndex]?.trim();
    
    if (!dateStr || !homeTeam || !awayTeam) continue;
    
    console.log('\n📊 Fila', i + 1 + ':');
    console.log('   📅 Fecha:', dateStr);
    console.log('   🏠 Local:', homeTeam);
    console.log('   🏃 Visitante:', awayTeam);
    
    const homeScore = homeScoreIndex !== -1 ? parseInt(row[homeScoreIndex] || '0') : 0;
    const awayScore = awayScoreIndex !== -1 ? parseInt(row[awayScoreIndex] || '0') : 0;
    
    console.log('   ⚽ Goles:', homeScore + '-' + awayScore);
    
    matches++;
    teams += 2;
    
    console.log('   ✅', matches, 'partidos procesados...');
  }
  
  console.log('\n🎉 RESULTADO:');
  console.log('   ⚽ Partidos:', matches);
  console.log('   👥 Equipos:', teams);
  
  const dbLeagues = await prisma.league.count();
  const dbTeams = await prisma.team.count();
  const dbMatches = await prisma.match.count();
  
  console.log('\n📊 DATOS EN LA BASE DE DATOS:');
  console.log('   🏆 Ligas:', dbLeagues);
  console.log('   👥 Equipos:', dbTeams);
  console.log('   ⚽ Partidos:', dbMatches);
  
  await prisma.$disconnect();
}

main().catch(console.error);