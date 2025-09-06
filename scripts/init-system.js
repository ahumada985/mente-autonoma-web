// Script de Inicialización del Sistema de Análisis de Apuestas
// Basado en los planes detallados de ProTipster.cl

const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

// Datos de ligas principales
const LEAGUES_DATA = [
  // Sudamérica
  { name: 'Argentina: Torneo Betano (Liga Profesional)', country: 'Argentina', type: 'league' },
  { name: 'Argentina: Copa Argentina', country: 'Argentina', type: 'cup' },
  { name: 'Bolivia: División Profesional', country: 'Bolivia', type: 'league' },
  { name: 'Brasil: Brasileirão Serie A', country: 'Brasil', type: 'league' },
  { name: 'Brasil: Brasileirão Serie B', country: 'Brasil', type: 'league' },
  { name: 'Brasil: Copa betano do Brasil', country: 'Brasil', type: 'cup' },
  { name: 'Chile: Liga de primera', country: 'Chile', type: 'league' },
  { name: 'Chile: Copa Chile', country: 'Chile', type: 'cup' },
  { name: 'Colombia: Primera A', country: 'Colombia', type: 'league' },
  { name: 'Colombia: Copa Colombia', country: 'Colombia', type: 'cup' },
  { name: 'Ecuador: Liga Pro Serie A', country: 'Ecuador', type: 'league' },
  { name: 'Ecuador: Copa Ecuador', country: 'Ecuador', type: 'cup' },
  { name: 'Paraguay: Primera División', country: 'Paraguay', type: 'league' },
  { name: 'Perú: Liga 1 (Primera División)', country: 'Perú', type: 'league' },
  { name: 'Uruguay: Primera División', country: 'Uruguay', type: 'league' },
  
  // Norteamérica
  { name: 'Concacaf: Clubs Leagues Cup', country: 'Concacaf', type: 'cup' },
  { name: 'Liga MX', country: 'México', type: 'league' },
  { name: 'Liga MLS', country: 'Estados Unidos', type: 'league' },
  { name: 'Copa Mexico', country: 'México', type: 'cup' },
  
  // Europa
  { name: 'Champions League', country: 'Europa', type: 'cup' },
  { name: 'Premier League', country: 'Inglaterra', type: 'league' },
  { name: 'Bundesliga', country: 'Alemania', type: 'league' },
  { name: 'Ligue 1', country: 'Francia', type: 'league' },
  { name: 'Liga de Italia', country: 'Italia', type: 'league' },
  { name: 'Liga de España', country: 'España', type: 'league' },
  { name: 'Liga de Holanda', country: 'Holanda', type: 'league' },
  { name: 'Liga de Portugal', country: 'Portugal', type: 'league' },
  { name: 'Liga de Bélgica', country: 'Bélgica', type: 'league' },
  { name: 'Liga de Escocia', country: 'Escocia', type: 'league' },
  { name: 'Liga de Dinamarca', country: 'Dinamarca', type: 'league' },
  { name: 'Liga de Grecia', country: 'Grecia', type: 'league' },
  { name: 'FA Cup', country: 'Inglaterra', type: 'cup' },
  { name: 'Copa Italia', country: 'Italia', type: 'cup' },
  { name: 'Copa Holanda', country: 'Holanda', type: 'cup' },
  { name: 'Copa Alemania', country: 'Alemania', type: 'cup' }
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

// Función principal
async function main() {
  console.log('🚀 Inicializando Sistema de Análisis de Apuestas Deportivas...');
  console.log('📋 Basado en los planes detallados de ProTipster.cl\n');
  
  try {
    // 1. Crear ligas
    console.log('📋 Creando ligas...');
    for (const league of LEAGUES_DATA) {
      await prisma.league.upsert({
        where: { name: league.name },
        update: league,
        create: {
          ...league,
          season: '2024',
          isActive: true
        }
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
    
    // 3. Crear configuración del sistema
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
    
    // 4. Mostrar estadísticas
    console.log('\n📊 Estadísticas del Sistema:');
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
    
    console.log('\n✅ Sistema inicializado exitosamente!');
    console.log('\n🎯 Próximos pasos:');
    console.log('1. Configurar claves de API en .env.local');
    console.log('2. Ejecutar: npm run dev');
    console.log('3. Acceder a http://localhost:3000');
    console.log('4. Ir a /config para configurar APIs');
    
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


