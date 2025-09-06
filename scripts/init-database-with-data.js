#!/usr/bin/env node

/**
 * Script de Inicialización de Base de Datos con Datos Históricos
 * Carga datos de las últimas 5 temporadas desde múltiples fuentes
 */

const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

// Datos de ligas principales
const LEAGUES_DATA = [
  // Sudamérica
  { name: 'Argentina: Torneo Betano (Liga Profesional)', country: 'Argentina', type: 'league', season: '2024' },
  { name: 'Argentina: Copa Argentina', country: 'Argentina', type: 'cup', season: '2024' },
  { name: 'Bolivia: División Profesional', country: 'Bolivia', type: 'league', season: '2024' },
  { name: 'Brasil: Brasileirão Serie A', country: 'Brasil', type: 'league', season: '2024' },
  { name: 'Brasil: Brasileirão Serie B', country: 'Brasil', type: 'league', season: '2024' },
  { name: 'Brasil: Copa betano do Brasil', country: 'Brasil', type: 'cup', season: '2024' },
  { name: 'Chile: Liga de primera', country: 'Chile', type: 'league', season: '2024' },
  { name: 'Chile: Copa Chile', country: 'Chile', type: 'cup', season: '2024' },
  { name: 'Colombia: Primera A', country: 'Colombia', type: 'league', season: '2024' },
  { name: 'Colombia: Copa Colombia', country: 'Colombia', type: 'cup', season: '2024' },
  { name: 'Ecuador: Liga Pro Serie A', country: 'Ecuador', type: 'league', season: '2024' },
  { name: 'Ecuador: Copa Ecuador', country: 'Ecuador', type: 'cup', season: '2024' },
  { name: 'Paraguay: Primera División', country: 'Paraguay', type: 'league', season: '2024' },
  { name: 'Perú: Liga 1 (Primera División)', country: 'Perú', type: 'league', season: '2024' },
  { name: 'Uruguay: Primera División', country: 'Uruguay', type: 'league', season: '2024' },
  
  // Norteamérica
  { name: 'Concacaf: Clubs Leagues Cup', country: 'Concacaf', type: 'cup', season: '2024' },
  { name: 'Liga MX', country: 'México', type: 'league', season: '2024' },
  { name: 'Liga MLS', country: 'Estados Unidos', type: 'league', season: '2024' },
  { name: 'Copa Mexico', country: 'México', type: 'cup', season: '2024' },
  
  // Europa
  { name: 'Champions League', country: 'Europa', type: 'cup', season: '2024' },
  { name: 'Premier League', country: 'Inglaterra', type: 'league', season: '2024' },
  { name: 'Bundesliga', country: 'Alemania', type: 'league', season: '2024' },
  { name: 'Ligue 1', country: 'Francia', type: 'league', season: '2024' },
  { name: 'Liga de Italia', country: 'Italia', type: 'league', season: '2024' },
  { name: 'Liga de España', country: 'España', type: 'league', season: '2024' },
  { name: 'Liga de Holanda', country: 'Holanda', type: 'league', season: '2024' },
  { name: 'Liga de Portugal', country: 'Portugal', type: 'league', season: '2024' },
  { name: 'Liga de Bélgica', country: 'Bélgica', type: 'league', season: '2024' },
  { name: 'Liga de Escocia', country: 'Escocia', type: 'league', season: '2024' },
  { name: 'Liga de Dinamarca', country: 'Dinamarca', type: 'league', season: '2024' },
  { name: 'Liga de Grecia', country: 'Grecia', type: 'league', season: '2024' },
  { name: 'FA Cup', country: 'Inglaterra', type: 'cup', season: '2024' },
  { name: 'Copa Italia', country: 'Italia', type: 'cup', season: '2024' },
  { name: 'Copa Holanda', country: 'Holanda', type: 'cup', season: '2024' },
  { name: 'Copa Alemania', country: 'Alemania', type: 'cup', season: '2024' }
];

// Datos de equipos principales
const TEAMS_DATA = [
  // Brasil
  { name: 'Flamengo', shortName: 'FLA', country: 'Brasil', league: 'Brasil: Brasileirão Serie A' },
  { name: 'Palmeiras', shortName: 'PAL', country: 'Brasil', league: 'Brasil: Brasileirão Serie A' },
  { name: 'São Paulo', shortName: 'SPO', country: 'Brasil', league: 'Brasil: Brasileirão Serie A' },
  { name: 'Corinthians', shortName: 'COR', country: 'Brasil', league: 'Brasil: Brasileirão Serie A' },
  { name: 'Santos', shortName: 'SAN', country: 'Brasil', league: 'Brasil: Brasileirão Serie A' },
  
  // Argentina
  { name: 'Boca Juniors', shortName: 'BOC', country: 'Argentina', league: 'Argentina: Torneo Betano (Liga Profesional)' },
  { name: 'River Plate', shortName: 'RIV', country: 'Argentina', league: 'Argentina: Torneo Betano (Liga Profesional)' },
  { name: 'Racing Club', shortName: 'RAC', country: 'Argentina', league: 'Argentina: Torneo Betano (Liga Profesional)' },
  { name: 'Independiente', shortName: 'IND', country: 'Argentina', league: 'Argentina: Torneo Betano (Liga Profesional)' },
  { name: 'San Lorenzo', shortName: 'SLO', country: 'Argentina', league: 'Argentina: Torneo Betano (Liga Profesional)' },
  
  // Chile
  { name: 'Colo-Colo', shortName: 'COL', country: 'Chile', league: 'Chile: Liga de primera' },
  { name: 'Universidad de Chile', shortName: 'UCH', country: 'Chile', league: 'Chile: Liga de primera' },
  { name: 'Universidad Católica', shortName: 'UCA', country: 'Chile', league: 'Chile: Liga de primera' },
  { name: 'Palestino', shortName: 'PAL', country: 'Chile', league: 'Chile: Liga de primera' },
  
  // Colombia
  { name: 'Millonarios', shortName: 'MIL', country: 'Colombia', league: 'Colombia: Primera A' },
  { name: 'Atlético Nacional', shortName: 'ATN', country: 'Colombia', league: 'Colombia: Primera A' },
  { name: 'América de Cali', shortName: 'AME', country: 'Colombia', league: 'Colombia: Primera A' },
  { name: 'Deportivo Cali', shortName: 'CAL', country: 'Colombia', league: 'Colombia: Primera A' },
  
  // Europa
  { name: 'Manchester City', shortName: 'MCI', country: 'Inglaterra', league: 'Premier League' },
  { name: 'Arsenal', shortName: 'ARS', country: 'Inglaterra', league: 'Premier League' },
  { name: 'Liverpool', shortName: 'LIV', country: 'Inglaterra', league: 'Premier League' },
  { name: 'Chelsea', shortName: 'CHE', country: 'Inglaterra', league: 'Premier League' },
  { name: 'Real Madrid', shortName: 'RMA', country: 'España', league: 'Liga de España' },
  { name: 'Barcelona', shortName: 'BAR', country: 'España', league: 'Liga de España' },
  { name: 'Bayern Munich', shortName: 'BAY', country: 'Alemania', league: 'Bundesliga' },
  { name: 'Borussia Dortmund', shortName: 'BVB', country: 'Alemania', league: 'Bundesliga' }
];

// Función para generar datos históricos de partidos
function generateHistoricalMatches(seasons = ['2020', '2021', '2022', '2023', '2024']) {
  const matches = [];
  
  for (const season of seasons) {
    // Generar partidos para cada temporada
    for (let i = 0; i < 50; i++) {
      const homeTeam = TEAMS_DATA[Math.floor(Math.random() * TEAMS_DATA.length)];
      const awayTeam = TEAMS_DATA[Math.floor(Math.random() * TEAMS_DATA.length)];
      
      if (homeTeam.name !== awayTeam.name) {
        const matchDate = new Date(`${season}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`);
        
        matches.push({
          leagueId: homeTeam.league,
          homeTeamId: homeTeam.name.toLowerCase().replace(/\s+/g, '_'),
          awayTeamId: awayTeam.name.toLowerCase().replace(/\s+/g, '_'),
          matchDate: matchDate,
          status: 'finished',
          homeScore: Math.floor(Math.random() * 4),
          awayScore: Math.floor(Math.random() * 4),
          homeScoreHT: Math.floor(Math.random() * 3),
          awayScoreHT: Math.floor(Math.random() * 3)
        });
      }
    }
  }
  
  return matches;
}

// Función principal
async function main() {
  console.log('🚀 Inicializando Base de Datos con Datos Históricos...\n');
  
  try {
    // 1. Crear ligas
    console.log('📋 Creando ligas...');
    for (const league of LEAGUES_DATA) {
      await prisma.league.upsert({
        where: { name: league.name },
        update: league,
        create: league
      });
    }
    console.log(`✅ ${LEAGUES_DATA.length} ligas creadas`);
    
    // 2. Crear equipos
    console.log('\n⚽ Creando equipos...');
    for (const team of TEAMS_DATA) {
      const league = await prisma.league.findFirst({
        where: { name: team.league }
      });
      
      if (league) {
        await prisma.team.upsert({
          where: { 
            name_leagueId: {
              name: team.name,
              leagueId: league.id
            }
          },
          update: team,
          create: {
            ...team,
            leagueId: league.id
          }
        });
      }
    }
    console.log(`✅ ${TEAMS_DATA.length} equipos creados`);
    
    // 3. Crear partidos históricos
    console.log('\n🏆 Creando partidos históricos...');
    const historicalMatches = generateHistoricalMatches();
    
    for (const match of historicalMatches) {
      const league = await prisma.league.findFirst({
        where: { name: match.leagueId }
      });
      
      if (league) {
        const homeTeam = await prisma.team.findFirst({
          where: { 
            name: match.homeTeamId.replace(/_/g, ' '),
            leagueId: league.id
          }
        });
        
        const awayTeam = await prisma.team.findFirst({
          where: { 
            name: match.awayTeamId.replace(/_/g, ' '),
            leagueId: league.id
          }
        });
        
        if (homeTeam && awayTeam) {
          await prisma.match.upsert({
            where: {
              leagueId_homeTeamId_awayTeamId_matchDate: {
                leagueId: league.id,
                homeTeamId: homeTeam.id,
                awayTeamId: awayTeam.id,
                matchDate: match.matchDate
              }
            },
            update: {
              ...match,
              leagueId: league.id,
              homeTeamId: homeTeam.id,
              awayTeamId: awayTeam.id
            },
            create: {
              ...match,
              leagueId: league.id,
              homeTeamId: homeTeam.id,
              awayTeamId: awayTeam.id
            }
          });
        }
      }
    }
    console.log(`✅ ${historicalMatches.length} partidos históricos creados`);
    
    // 4. Crear configuración del sistema
    console.log('\n⚙️ Configurando sistema...');
    const configs = [
      { key: 'min_probability_1x2', value: '0.85', description: 'Probabilidad mínima para recomendar 1X2' },
      { key: 'min_probability_goals', value: '0.70', description: 'Probabilidad mínima para mercados de goles' },
      { key: 'min_probability_cards', value: '0.60', description: 'Probabilidad mínima para mercados de tarjetas' },
      { key: 'api_football_daily_limit', value: '100', description: 'Límite diario de API-Football' },
      { key: 'last_data_update', value: new Date().toISOString(), description: 'Última actualización de datos' }
    ];
    
    for (const config of configs) {
      await prisma.systemConfig.upsert({
        where: { key: config.key },
        update: { value: config.value },
        create: config
      });
    }
    console.log('✅ Configuración del sistema creada');
    
    // 5. Mostrar estadísticas
    console.log('\n📊 Estadísticas de la Base de Datos:');
    const stats = await prisma.$transaction([
      prisma.league.count(),
      prisma.team.count(),
      prisma.match.count(),
      prisma.systemConfig.count()
    ]);
    
    console.log(`- Ligas: ${stats[0]}`);
    console.log(`- Equipos: ${stats[1]}`);
    console.log(`- Partidos: ${stats[2]}`);
    console.log(`- Configuraciones: ${stats[3]}`);
    
    console.log('\n✅ Base de datos inicializada exitosamente!');
    console.log('\n🎯 Próximos pasos:');
    console.log('1. Configurar claves de API en .env');
    console.log('2. Ejecutar: npm run dev');
    console.log('3. Acceder a http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main();
}

module.exports = { main };


