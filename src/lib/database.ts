// Cliente de Base de Datos para el Sistema de Análisis de Apuestas
import { PrismaClient } from '../generated/prisma';

// Cliente global de Prisma
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Funciones de utilidad para la base de datos
export class DatabaseService {
  
  // Inicializar ligas principales
  static async initializeLeagues() {
    const leagues = [
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

    for (const league of leagues) {
      await prisma.league.upsert({
        where: { name: league.name },
        update: league,
        create: league
      });
    }

    console.log(`✅ ${leagues.length} ligas inicializadas`);
  }

  // Obtener partidos de hoy
  static async getTodayMatches() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return await prisma.match.findMany({
      where: {
        matchDate: {
          gte: today,
          lt: tomorrow
        },
        status: 'scheduled'
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
        predictions: {
          where: { isRecommended: true }
        }
      },
      orderBy: { matchDate: 'asc' }
    });
  }

  // Obtener partidos por liga
  static async getMatchesByLeague(leagueName: string, days: number = 7) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + days);

    return await prisma.match.findMany({
      where: {
        league: {
          name: {
            contains: leagueName,
            mode: 'insensitive'
          }
        },
        matchDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        homeTeam: true,
        awayTeam: true,
        league: true,
        predictions: true
      },
      orderBy: { matchDate: 'asc' }
    });
  }

  // Obtener forma de equipos
  static async getTeamForm(teamId: string, leagueId: string, season: string) {
    return await prisma.teamForm.findUnique({
      where: {
        teamId_leagueId_season: {
          teamId,
          leagueId,
          season
        }
      }
    });
  }

  // Obtener historial H2H
  static async getHeadToHead(homeTeamId: string, awayTeamId: string, leagueId: string) {
    return await prisma.headToHead.findUnique({
      where: {
        homeTeamId_awayTeamId_leagueId: {
          homeTeamId,
          awayTeamId,
          leagueId
        }
      }
    });
  }

  // Crear predicción
  static async createPrediction(data: {
    matchId: string;
    market: string;
    selection: string;
    probability: number;
    confidence: 'low' | 'medium' | 'high';
    reasoning: string;
    algorithm: string;
    isRecommended: boolean;
  }) {
    return await prisma.prediction.create({
      data
    });
  }

  // Obtener predicciones recomendadas
  static async getRecommendedPredictions() {
    return await prisma.prediction.findMany({
      where: { isRecommended: true },
      include: {
        match: {
          include: {
            homeTeam: true,
            awayTeam: true,
            league: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Obtener estadísticas del sistema
  static async getSystemStats() {
    const [
      totalMatches,
      totalPredictions,
      recommendedPredictions,
      totalLeagues,
      totalTeams
    ] = await Promise.all([
      prisma.match.count(),
      prisma.prediction.count(),
      prisma.prediction.count({ where: { isRecommended: true } }),
      prisma.league.count(),
      prisma.team.count()
    ]);

    return {
      totalMatches,
      totalPredictions,
      recommendedPredictions,
      totalLeagues,
      totalTeams,
      recommendationRate: totalPredictions > 0 ? (recommendedPredictions / totalPredictions) * 100 : 0
    };
  }

  // Inicializar configuración del sistema
  static async initializeSystemConfig() {
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

    console.log('✅ Configuración del sistema inicializada');
  }
}

export default prisma;


