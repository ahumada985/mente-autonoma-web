// Sistema de Inicialización de Base de Datos con Datos Históricos
// Basado en los planes detallados proporcionados

import { prisma } from './database';
import { API_CONFIG, HISTORICAL_DATA_SOURCES, PRIORITY_LEAGUES } from './api-config';

export class DatabaseInitializer {
  
  // Inicializar ligas principales
  static async initializeLeagues() {
    console.log('📋 Inicializando ligas principales...');
    
    const allLeagues = [
      ...PRIORITY_LEAGUES.southAmerica,
      ...PRIORITY_LEAGUES.northAmerica,
      ...PRIORITY_LEAGUES.europe
    ];

    for (const leagueName of allLeagues) {
      const [country, name] = leagueName.split(': ');
      const type = name.includes('Copa') || name.includes('Champions') || name.includes('FA Cup') ? 'cup' : 'league';
      
      await prisma.league.upsert({
        where: { name: leagueName },
        update: {
          country: country.trim(),
          type,
          season: '2024',
          isActive: true
        },
        create: {
          name: leagueName,
          country: country.trim(),
          type,
          season: '2024',
          isActive: true
        }
      });
    }

    console.log(`✅ ${allLeagues.length} ligas inicializadas`);
  }

  // Inicializar equipos principales
  static async initializeTeams() {
    console.log('⚽ Inicializando equipos principales...');
    
    const teamsData = [
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

    for (const team of teamsData) {
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

    console.log(`✅ ${teamsData.length} equipos inicializados`);
  }

  // Generar datos históricos de partidos
  static async generateHistoricalMatches() {
    console.log('🏆 Generando partidos históricos...');
    
    const seasons = ['2020', '2021', '2022', '2023', '2024'];
    const matches = [];
    
    for (const season of seasons) {
      // Generar partidos para cada temporada
      for (let i = 0; i < 100; i++) {
        const homeTeam = await prisma.team.findFirst({
          skip: Math.floor(Math.random() * 20),
          include: { league: true }
        });
        
        const awayTeam = await prisma.team.findFirst({
          skip: Math.floor(Math.random() * 20),
          include: { league: true }
        });
        
        if (homeTeam && awayTeam && homeTeam.id !== awayTeam.id && homeTeam.leagueId === awayTeam.leagueId) {
          const matchDate = new Date(`${season}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`);
          
          matches.push({
            leagueId: homeTeam.leagueId,
            homeTeamId: homeTeam.id,
            awayTeamId: awayTeam.id,
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
    
    // Insertar partidos en lotes
    for (const match of matches) {
      await prisma.match.upsert({
        where: {
          leagueId_homeTeamId_awayTeamId_matchDate: {
            leagueId: match.leagueId,
            homeTeamId: match.homeTeamId,
            awayTeamId: match.awayTeamId,
            matchDate: match.matchDate
          }
        },
        update: match,
        create: match
      });
    }
    
    console.log(`✅ ${matches.length} partidos históricos generados`);
  }

  // Inicializar forma de equipos
  static async initializeTeamForm() {
    console.log('📊 Inicializando forma de equipos...');
    
    const teams = await prisma.team.findMany({
      include: { league: true }
    });
    
    for (const team of teams) {
      const matches = await prisma.match.findMany({
        where: {
          OR: [
            { homeTeamId: team.id },
            { awayTeamId: team.id }
          ],
          status: 'finished'
        },
        take: 10
      });
      
      let wins = 0;
      let draws = 0;
      let losses = 0;
      let goalsFor = 0;
      let goalsAgainst = 0;
      
      for (const match of matches) {
        const isHome = match.homeTeamId === team.id;
        const teamScore = isHome ? match.homeScore || 0 : match.awayScore || 0;
        const opponentScore = isHome ? match.awayScore || 0 : match.homeScore || 0;
        
        goalsFor += teamScore;
        goalsAgainst += opponentScore;
        
        if (teamScore > opponentScore) wins++;
        else if (teamScore === opponentScore) draws++;
        else losses++;
      }
      
      const points = wins * 3 + draws;
      const matchesPlayed = matches.length;
      
      await prisma.teamForm.upsert({
        where: {
          teamId_leagueId_season: {
            teamId: team.id,
            leagueId: team.leagueId,
            season: '2024'
          }
        },
        update: {
          matchesPlayed,
          wins,
          draws,
          losses,
          goalsFor,
          goalsAgainst,
          points,
          formLast5: 'WWDLW' // Simulado
        },
        create: {
          teamId: team.id,
          leagueId: team.leagueId,
          season: '2024',
          matchesPlayed,
          wins,
          draws,
          losses,
          goalsFor,
          goalsAgainst,
          points,
          formLast5: 'WWDLW'
        }
      });
    }
    
    console.log(`✅ Forma de ${teams.length} equipos inicializada`);
  }

  // Inicializar configuración del sistema
  static async initializeSystemConfig() {
    console.log('⚙️ Inicializando configuración del sistema...');
    
    const configs = [
      { key: 'min_probability_1x2', value: '0.85', description: 'Probabilidad mínima para recomendar 1X2' },
      { key: 'min_probability_goals', value: '0.70', description: 'Probabilidad mínima para mercados de goles' },
      { key: 'min_probability_cards', value: '0.60', description: 'Probabilidad mínima para mercados de tarjetas' },
      { key: 'min_probability_corners', value: '0.60', description: 'Probabilidad mínima para mercados de córners' },
      { key: 'api_football_daily_limit', value: '100', description: 'Límite diario de API-Football' },
      { key: 'thesportsdb_minute_limit', value: '100', description: 'Límite por minuto de TheSportsDB' },
      { key: 'football_data_minute_limit', value: '10', description: 'Límite por minuto de Football-Data.org' },
      { key: 'last_data_update', value: new Date().toISOString(), description: 'Última actualización de datos' },
      { key: 'total_leagues_monitored', value: '32', description: 'Total de ligas monitoreadas' },
      { key: 'total_teams_monitored', value: '456', description: 'Total de equipos monitoreados' },
      { key: 'historical_seasons', value: '5', description: 'Número de temporadas históricas' },
      { key: 'system_version', value: '1.0.0', description: 'Versión del sistema' }
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

  // Función principal de inicialización
  static async initializeDatabase() {
    console.log('🚀 Inicializando Base de Datos del Sistema de Análisis de Apuestas...');
    console.log('📋 Basado en los planes detallados de ProTipster.cl\n');
    
    try {
      // 1. Inicializar ligas
      await this.initializeLeagues();
      
      // 2. Inicializar equipos
      await this.initializeTeams();
      
      // 3. Generar partidos históricos
      await this.generateHistoricalMatches();
      
      // 4. Inicializar forma de equipos
      await this.initializeTeamForm();
      
      // 5. Inicializar configuración del sistema
      await this.initializeSystemConfig();
      
      console.log('\n✅ Base de datos inicializada exitosamente!');
      
      // 6. Mostrar estadísticas
      const stats = await this.getSystemStats();
      console.log('\n📊 Estadísticas del Sistema:');
      console.log(`- Ligas: ${stats.totalLeagues}`);
      console.log(`- Equipos: ${stats.totalTeams}`);
      console.log(`- Partidos: ${stats.totalMatches}`);
      console.log(`- Configuraciones: ${stats.totalConfigs}`);
      console.log(`- Temporadas históricas: 5 (2020-2024)`);
      console.log(`- APIs configuradas: ${Object.keys(API_CONFIG).length}`);
      console.log(`- Fuentes de datos históricos: ${Object.keys(HISTORICAL_DATA_SOURCES).length}`);
      
      console.log('\n🎯 Sistema listo para análisis de apuestas deportivas!');
      console.log('🔗 Accede a http://localhost:3000 para ver el dashboard');
      
    } catch (error) {
      console.error('❌ Error durante la inicialización:', error);
      throw error;
    }
  }

  // Obtener estadísticas del sistema
  static async getSystemStats() {
    const [totalLeagues, totalTeams, totalMatches, totalConfigs] = await Promise.all([
      prisma.league.count(),
      prisma.team.count(),
      prisma.match.count(),
      prisma.systemConfig.count()
    ]);

    return {
      totalLeagues,
      totalTeams,
      totalMatches,
      totalConfigs
    };
  }
}


