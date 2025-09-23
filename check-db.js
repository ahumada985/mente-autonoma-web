const { PrismaClient } = require('@prisma/client');

async function checkDatabase() {
  const prisma = new PrismaClient();
  
  try {
    console.log('🔍 VERIFICANDO BASE DE DATOS...');
    
    const leagues = await prisma.league.count();
    const teams = await prisma.team.count();
    const matches = await prisma.match.count();
    
    console.log('📊 DATOS EN LA BASE DE DATOS:');
    console.log(`   🏆 Ligas: ${leagues}`);
    console.log(`   👥 Equipos: ${teams}`);
    console.log(`   ⚽ Partidos: ${matches}`);
    
    if (teams > 0) {
      console.log('✅ ¡DATOS GUARDADOS EXITOSAMENTE!');
    } else {
      console.log('❌ NO HAY DATOS EN LA BASE DE DATOS');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDatabase();

