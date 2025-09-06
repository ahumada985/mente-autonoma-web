// Verificador de Base de Datos - "Gran Henki Dama de Goku"
const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 Verificando base de datos...');
    
    // Contar registros
    const leagues = await prisma.league.count();
    const teams = await prisma.team.count();
    const matches = await prisma.match.count();
    const predictions = await prisma.prediction.count();
    
    console.log('\n📊 DATOS EN LA BASE DE DATOS:');
    console.log(`   🏆 Ligas: ${leagues}`);
    console.log(`   👥 Equipos: ${teams}`);
    console.log(`   ⚽ Partidos: ${matches}`);
    console.log(`   🎯 Predicciones: ${predictions}`);
    
    // Mostrar algunas ligas
    if (leagues > 0) {
      console.log('\n🏆 LIGAS ENCONTRADAS:');
      const leagueList = await prisma.league.findMany({
        take: 10,
        select: { name: true, country: true, tier: true }
      });
      leagueList.forEach(league => {
        console.log(`   - ${league.name} (${league.country}) - Tier ${league.tier}`);
      });
    }
    
    // Mostrar algunos equipos
    if (teams > 0) {
      console.log('\n👥 EQUIPOS ENCONTRADOS:');
      const teamList = await prisma.team.findMany({
        take: 10,
        select: { name: true, league: true, country: true }
      });
      teamList.forEach(team => {
        console.log(`   - ${team.name} (${team.league}, ${team.country})`);
      });
    }
    
    // Mostrar algunos partidos
    if (matches > 0) {
      console.log('\n⚽ PARTIDOS ENCONTRADOS:');
      const matchList = await prisma.match.findMany({
        take: 5,
        include: {
          homeTeam: { select: { name: true } },
          awayTeam: { select: { name: true } },
          league: { select: { name: true } }
        }
      });
      matchList.forEach(match => {
        console.log(`   - ${match.homeTeam.name} vs ${match.awayTeam.name} (${match.league.name}) - ${match.date.toISOString().split('T')[0]}`);
      });
    }
    
    if (leagues === 0 && teams === 0 && matches === 0) {
      console.log('\n❌ LA BASE DE DATOS ESTÁ VACÍA');
      console.log('   Necesitamos extraer y guardar los datos reales de los CSVs');
    }
    
  } catch (error) {
    console.error('❌ Error verificando base de datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();

