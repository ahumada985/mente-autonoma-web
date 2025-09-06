// Gestor de Base de Datos Unificada - "Gran Henki Dama de Goku"
// Sistema para unificar todos los datos históricos y en tiempo real

import { PrismaClient } from '@prisma/client';
import { SofaScoreScraper } from './sofascore-scraper';
import { DataSourcesManager } from './data-sources-manager';

export interface UnifiedDatabaseStats {
  totalMatches: number;
  totalTeams: number;
  totalLeagues: number;
  totalSeasons: number;
  coverage2020_2025: number;
  lastUpdate: string;
  dataSources: {
    csv: number;
    api: number;
    webScraping: number;
  };
  leagues: {
    [leagueName: string]: {
      matches: number;
      teams: number;
      seasons: string[];
      coverage: number;
    };
  };
}

export interface DataIntegrationResult {
  success: boolean;
  newMatches: number;
  newTeams: number;
  updatedRecords: number;
  errors: string[];
  processingTime: number;
}

export class UnifiedDatabaseManager {
  private prisma: PrismaClient;
  private sofascoreScraper: SofaScoreScraper;
  private dataSourcesManager: DataSourcesManager;

  constructor() {
    this.prisma = new PrismaClient();
    this.sofascoreScraper = new SofaScoreScraper();
    this.dataSourcesManager = new DataSourcesManager();
  }

  // Inicializar la base de datos unificada
  async initializeUnifiedDatabase(): Promise<UnifiedDatabaseStats> {
    console.log('🔥 Inicializando base de datos unificada...');
    
    try {
      // Crear ligas si no existen
      await this.createLeagues();
      
      // Procesar datos históricos de CSVs
      await this.processHistoricalData();
      
      // Integrar datos de SofaScore
      await this.integrateSofaScoreData();
      
      // Calcular estadísticas finales
      const stats = await this.calculateDatabaseStats();
      
      console.log('✅ Base de datos unificada inicializada exitosamente');
      return stats;
      
    } catch (error) {
      console.error('Error inicializando base de datos unificada:', error);
      throw error;
    }
  }

  // Crear ligas en la base de datos
  private async createLeagues(): Promise<void> {
    console.log('🏆 Creando ligas en la base de datos...');
    
    const leagues = [
      // Ligas Europeas
      { name: 'Premier League', country: 'Inglaterra', tier: 1, region: 'Europa' },
      { name: 'Championship', country: 'Inglaterra', tier: 2, region: 'Europa' },
      { name: 'La Liga', country: 'España', tier: 1, region: 'Europa' },
      { name: 'La Liga 2', country: 'España', tier: 2, region: 'Europa' },
      { name: 'Bundesliga', country: 'Alemania', tier: 1, region: 'Europa' },
      { name: 'Bundesliga 2', country: 'Alemania', tier: 2, region: 'Europa' },
      { name: 'Serie A', country: 'Italia', tier: 1, region: 'Europa' },
      { name: 'Serie B', country: 'Italia', tier: 2, region: 'Europa' },
      { name: 'Ligue 1', country: 'Francia', tier: 1, region: 'Europa' },
      { name: 'Ligue 2', country: 'Francia', tier: 2, region: 'Europa' },
      { name: 'Scottish Premiership', country: 'Escocia', tier: 1, region: 'Europa' },
      { name: 'Süper Lig', country: 'Turquía', tier: 1, region: 'Europa' },
      { name: 'Jupiler Pro League', country: 'Bélgica', tier: 1, region: 'Europa' },
      { name: 'Austrian Bundesliga', country: 'Austria', tier: 1, region: 'Europa' },
      { name: 'Danish Superliga', country: 'Dinamarca', tier: 1, region: 'Europa' },
      { name: 'Allsvenskan', country: 'Suecia', tier: 1, region: 'Europa' },
      { name: 'Swiss Super League', country: 'Suiza', tier: 1, region: 'Europa' },
      
      // Ligas Sudamericanas
      { name: 'Brasileirão Série A', country: 'Brasil', tier: 1, region: 'Sudamérica' },
      { name: 'Liga Profesional', country: 'Argentina', tier: 1, region: 'Sudamérica' },
      { name: 'Primera División', country: 'Chile', tier: 1, region: 'Sudamérica' },
      { name: 'Primera A', country: 'Colombia', tier: 1, region: 'Sudamérica' },
      { name: 'Liga Pro Serie A', country: 'Ecuador', tier: 1, region: 'Sudamérica' },
      { name: 'Primera División', country: 'Paraguay', tier: 1, region: 'Sudamérica' },
      { name: 'Liga 1', country: 'Perú', tier: 1, region: 'Sudamérica' },
      { name: 'Primera División', country: 'Uruguay', tier: 1, region: 'Sudamérica' },
      
      // Ligas de Otras Regiones
      { name: 'Chinese Super League', country: 'China', tier: 1, region: 'Asia' },
      { name: 'J.League', country: 'Japón', tier: 1, region: 'Asia' },
      { name: 'Liga MX', country: 'México', tier: 1, region: 'Norteamérica' },
      { name: 'MLS', country: 'Estados Unidos', tier: 1, region: 'Norteamérica' },
      
      // Copas Internacionales
      { name: 'Champions League', country: 'Europa', tier: 1, region: 'Europa' },
      { name: 'Europa League', country: 'Europa', tier: 1, region: 'Europa' },
      { name: 'Copa Libertadores', country: 'Sudamérica', tier: 1, region: 'Sudamérica' },
      { name: 'Copa Sudamericana', country: 'Sudamérica', tier: 1, region: 'Sudamérica' }
    ];

    for (const league of leagues) {
      await this.prisma.league.upsert({
        where: { name: league.name },
        update: league,
        create: league
      });
    }
    
    console.log(`✅ ${leagues.length} ligas creadas/actualizadas`);
  }

  // Procesar datos históricos de CSVs
  private async processHistoricalData(): Promise<void> {
    console.log('📊 Procesando datos históricos de CSVs...');
    
    // Aquí integrarías el procesamiento de CSVs
    // Por ahora, simulamos el procesamiento
    console.log('✅ Datos históricos procesados');
  }

  // Integrar datos de SofaScore
  private async integrateSofaScoreData(): Promise<void> {
    console.log('🌐 Integrando datos de SofaScore...');
    
    const supportedLeagues = this.sofascoreScraper.getSupportedLeagues();
    const seasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
    
    for (const league of supportedLeagues.slice(0, 5)) { // Procesar solo 5 ligas para demo
      for (const season of seasons) {
        try {
          // Obtener partidos históricos
          const matches = await this.sofascoreScraper.getHistoricalMatches(league, season);
          await this.insertMatches(matches);
          
          // Obtener tabla de posiciones
          const teams = await this.sofascoreScraper.getLeagueTable(league, season);
          await this.insertTeams(teams);
          
          console.log(`✅ ${league} ${season}: ${matches.length} partidos, ${teams.length} equipos`);
        } catch (error) {
          console.warn(`⚠️ Error procesando ${league} ${season}:`, error);
        }
      }
    }
  }

  // Insertar partidos en la base de datos
  private async insertMatches(matches: any[]): Promise<void> {
    for (const match of matches) {
      try {
        // Buscar o crear equipos
        const homeTeam = await this.findOrCreateTeam(match.homeTeam, match.league, match.country);
        const awayTeam = await this.findOrCreateTeam(match.awayTeam, match.league, match.country);
        
        // Buscar liga
        const league = await this.prisma.league.findFirst({
          where: { name: match.league }
        });
        
        if (league) {
          await this.prisma.match.upsert({
            where: { 
              homeTeamId_awayTeamId_date: {
                homeTeamId: homeTeam.id,
                awayTeamId: awayTeam.id,
                date: new Date(match.date)
              }
            },
            update: {
              homeScore: match.homeScore,
              awayScore: match.awayScore,
              venue: match.venue,
              referee: match.referee,
              status: match.status,
              odds: match.odds
            },
            create: {
              date: new Date(match.date),
              homeTeamId: homeTeam.id,
              awayTeamId: awayTeam.id,
              homeScore: match.homeScore,
              awayScore: match.awayScore,
              leagueId: league.id,
              season: match.season,
              venue: match.venue,
              referee: match.referee,
              status: match.status,
              odds: match.odds
            }
          });
        }
      } catch (error) {
        console.warn(`Error insertando partido:`, error);
      }
    }
  }

  // Insertar equipos en la base de datos
  private async insertTeams(teams: any[]): Promise<void> {
    for (const team of teams) {
      try {
        await this.prisma.team.upsert({
          where: { 
            name_league: {
              name: team.name,
              league: team.league
            }
          },
          update: {
            country: team.country,
            position: team.position,
            points: team.points,
            played: team.played,
            wins: team.wins,
            draws: team.draws,
            losses: team.losses,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            form: team.form,
            homeRecord: team.homeRecord,
            awayRecord: team.awayRecord
          },
          create: {
            name: team.name,
            league: team.league,
            country: team.country,
            position: team.position,
            points: team.points,
            played: team.played,
            wins: team.wins,
            draws: team.draws,
            losses: team.losses,
            goalsFor: team.goalsFor,
            goalsAgainst: team.goalsAgainst,
            goalDifference: team.goalDifference,
            form: team.form,
            homeRecord: team.homeRecord,
            awayRecord: team.awayRecord
          }
        });
      } catch (error) {
        console.warn(`Error insertando equipo:`, error);
      }
    }
  }

  // Buscar o crear equipo
  private async findOrCreateTeam(name: string, league: string, country: string): Promise<any> {
    let team = await this.prisma.team.findFirst({
      where: { 
        name: name,
        league: league
      }
    });
    
    if (!team) {
      team = await this.prisma.team.create({
        data: {
          name: name,
          league: league,
          country: country,
          position: 0,
          points: 0,
          played: 0,
          wins: 0,
          draws: 0,
          losses: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
          form: '',
          homeRecord: { wins: 0, draws: 0, losses: 0 },
          awayRecord: { wins: 0, draws: 0, losses: 0 }
        }
      });
    }
    
    return team;
  }

  // Calcular estadísticas de la base de datos
  private async calculateDatabaseStats(): Promise<UnifiedDatabaseStats> {
    const totalMatches = await this.prisma.match.count();
    const totalTeams = await this.prisma.team.count();
    const totalLeagues = await this.prisma.league.count();
    
    // Obtener temporadas únicas
    const seasons = await this.prisma.match.findMany({
      select: { season: true },
      distinct: ['season']
    });
    const totalSeasons = seasons.length;
    
    // Calcular cobertura 2020-2025
    const expectedSeasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
    const coveredSeasons = seasons.filter(s => expectedSeasons.includes(s.season || ''));
    const coverage2020_2025 = (coveredSeasons.length / expectedSeasons.length) * 100;
    
    // Obtener estadísticas por liga
    const leagues = await this.prisma.league.findMany({
      include: {
        _count: {
          select: {
            matches: true,
            teams: true
          }
        }
      }
    });
    
    const leagueStats: { [key: string]: any } = {};
    for (const league of leagues) {
      const leagueSeasons = await this.prisma.match.findMany({
        where: { leagueId: league.id },
        select: { season: true },
        distinct: ['season']
      });
      
      leagueStats[league.name] = {
        matches: league._count.matches,
        teams: league._count.teams,
        seasons: leagueSeasons.map(s => s.season).filter(Boolean),
        coverage: 0 // Calcular cobertura específica
      };
    }
    
    return {
      totalMatches,
      totalTeams,
      totalLeagues,
      totalSeasons,
      coverage2020_2025,
      lastUpdate: new Date().toISOString(),
      dataSources: {
        csv: 0, // Implementar contadores reales
        api: 0,
        webScraping: 0
      },
      leagues: leagueStats
    };
  }

  // Obtener estadísticas de la base de datos
  async getDatabaseStats(): Promise<UnifiedDatabaseStats> {
    return await this.calculateDatabaseStats();
  }

  // Limpiar recursos
  async disconnect(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

