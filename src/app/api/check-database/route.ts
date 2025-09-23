// API Endpoint para Verificar Base de Datos
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('🔍 Verificando base de datos...');
    
    // Contar registros
    const leagues = await prisma.league.count();
    const teams = await prisma.team.count();
    const matches = await prisma.match.count();
    const predictions = await prisma.prediction.count();
    
    // Obtener algunas ligas
    const leagueList = await prisma.league.findMany({
      take: 10,
      select: { 
        id: true,
        name: true, 
        country: true, 
        tier: true,
        region: true
      }
    });
    
    // Obtener algunos equipos
    const teamList = await prisma.team.findMany({
      take: 10,
      select: { 
        id: true,
        name: true, 
        league: true, 
        country: true,
        points: true,
        played: true
      }
    });
    
    // Obtener algunos partidos
    const matchList = await prisma.match.findMany({
      take: 5,
      include: {
        homeTeam: { select: { name: true } },
        awayTeam: { select: { name: true } },
        league: { select: { name: true } }
      },
      orderBy: { date: 'desc' }
    });
    
    const response = {
      success: true,
      message: 'Base de datos verificada exitosamente',
      data: {
        summary: {
          totalLeagues: leagues,
          totalTeams: teams,
          totalMatches: matches,
          totalPredictions: predictions,
          isEmpty: leagues === 0 && teams === 0 && matches === 0
        },
        leagues: leagueList,
        teams: teamList,
        matches: matchList,
        status: leagues === 0 && teams === 0 && matches === 0 ? 'EMPTY' : 'HAS_DATA'
      }
    };
    
    console.log('✅ Base de datos verificada');
    console.log(`📊 Resumen: ${leagues} ligas, ${teams} equipos, ${matches} partidos`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error verificando base de datos:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error verificando base de datos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}