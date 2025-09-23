// Sistema para obtener datos reales de partidos próximos
// Utiliza las APIs configuradas para obtener información real

export interface RealMatch {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;
  over25Odds?: number;
  under25Odds?: number;
  bothTeamsScoreOdds?: number;
  venue?: string;
  referee?: string;
}

export class RealDataFetcher {
  
  // Obtener partidos próximos reales de TheSportsDB
  static async getUpcomingMatchesFromTheSportsDB(): Promise<RealMatch[]> {
    try {
      const key = process.env.THE_SPORTS_DB_KEY;
      if (!key) {
        throw new Error('THE_SPORTS_DB_KEY no configurada');
      }

      console.log('🔍 Buscando partidos próximos en TheSportsDB...');
      
      // Obtener todas las ligas de fútbol
      const leaguesResponse = await fetch(
        `https://www.thesportsdb.com/api/v1/json/${key}/search_all_leagues.php?s=Soccer`
      );
      
      if (!leaguesResponse.ok) {
        throw new Error(`Error HTTP: ${leaguesResponse.status}`);
      }
      
      const leaguesData = await leaguesResponse.json();
      console.log(`📊 Encontradas ${leaguesData.leagues?.length || 0} ligas`);
      
      if (!leaguesData.leagues) {
        return [];
      }

      // Filtrar ligas de interés
      const targetLeagues = this.filterTargetLeagues(leaguesData.leagues);
      console.log(`🎯 Ligas de interés: ${targetLeagues.length}`);
      
      const allMatches: RealMatch[] = [];
      
      // Obtener partidos próximos de cada liga
      for (const league of targetLeagues) {
        try {
          console.log(`🔍 Obteniendo partidos de: ${league.strLeague}`);
          
          const eventsResponse = await fetch(
            `https://www.thesportsdb.com/api/v1/json/${key}/eventsnextleague.php?id=${league.idLeague}`
          );
          
          if (!eventsResponse.ok) {
            console.warn(`⚠️ Error obteniendo partidos de ${league.strLeague}: ${eventsResponse.status}`);
            continue;
          }
          
          const eventsData = await eventsResponse.json();
          
          if (eventsData.events && eventsData.events.length > 0) {
            const leagueMatches = eventsData.events.map((event: any) => ({
              id: event.idEvent,
              homeTeam: event.strHomeTeam || 'TBD',
              awayTeam: event.strAwayTeam || 'TBD',
              league: league.strLeague,
              date: event.dateEvent || new Date().toISOString().split('T')[0],
              time: event.strTime || '00:00',
              status: event.strStatus || 'Scheduled',
              venue: event.strVenue || '',
              referee: event.strReferee || ''
            }));
            
            allMatches.push(...leagueMatches);
            console.log(`✅ ${leagueMatches.length} partidos encontrados en ${league.strLeague}`);
          } else {
            console.log(`ℹ️ No hay partidos próximos en ${league.strLeague}`);
          }
          
          // Pequeña pausa para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 100));
          
        } catch (error) {
          console.error(`❌ Error procesando liga ${league.strLeague}:`, error);
        }
      }
      
      console.log(`🎉 Total de partidos encontrados: ${allMatches.length}`);
      return allMatches;
      
    } catch (error) {
      console.error('❌ Error obteniendo partidos de TheSportsDB:', error);
      return [];
    }
  }

  // Filtrar ligas de interés
  static filterTargetLeagues(leagues: any[]): any[] {
    const targetLeagueNames = [
      'Chile Primera División',
      'Argentina Liga Profesional',
      'Brasil Brasileirão',
      'Colombia Primera A',
      'Ecuador Liga Pro Serie A',
      'Paraguay Primera División',
      'Perú Liga 1',
      'Uruguay Primera División',
      'Premier League',
      'Bundesliga',
      'La Liga',
      'Serie A',
      'Ligue 1',
      'Champions League',
      'Europa League',
      'Liga MX',
      'MLS'
    ];

    return leagues.filter(league => {
      const leagueName = league.strLeague?.toLowerCase() || '';
      return targetLeagueNames.some(target => 
        leagueName.includes(target.toLowerCase()) ||
        target.toLowerCase().includes(leagueName)
      );
    });
  }

  // Obtener partidos próximos de Football-Data.org
  static async getUpcomingMatchesFromFootballData(): Promise<RealMatch[]> {
    try {
      const key = process.env.FOOTBALL_DATA_KEY;
      if (!key) {
        throw new Error('FOOTBALL_DATA_KEY no configurada');
      }

      console.log('🔍 Buscando partidos próximos en Football-Data.org...');
      
      // Obtener competiciones disponibles
      const competitionsResponse = await fetch(
        'https://api.football-data.org/v4/competitions',
        {
          headers: {
            'X-Auth-Token': key
          }
        }
      );
      
      if (!competitionsResponse.ok) {
        throw new Error(`Error HTTP: ${competitionsResponse.status}`);
      }
      
      const competitionsData = await competitionsResponse.json();
      console.log(`📊 Encontradas ${competitionsData.competitions?.length || 0} competiciones`);
      
      if (!competitionsData.competitions) {
        return [];
      }

      // Filtrar competiciones de interés
      const targetCompetitions = this.filterTargetCompetitions(competitionsData.competitions);
      console.log(`🎯 Competiciones de interés: ${targetCompetitions.length}`);
      
      const allMatches: RealMatch[] = [];
      
      // Obtener partidos próximos de cada competición
      for (const competition of targetCompetitions) {
        try {
          console.log(`🔍 Obteniendo partidos de: ${competition.name}`);
          
          const matchesResponse = await fetch(
            `https://api.football-data.org/v4/competitions/${competition.id}/matches?status=SCHEDULED`,
            {
              headers: {
                'X-Auth-Token': key
              }
            }
          );
          
          if (!matchesResponse.ok) {
            console.warn(`⚠️ Error obteniendo partidos de ${competition.name}: ${matchesResponse.status}`);
            continue;
          }
          
          const matchesData = await matchesResponse.json();
          
          if (matchesData.matches && matchesData.matches.length > 0) {
            const competitionMatches = matchesData.matches.map((match: any) => ({
              id: match.id.toString(),
              homeTeam: match.homeTeam?.name || 'TBD',
              awayTeam: match.awayTeam?.name || 'TBD',
              league: competition.name,
              date: match.utcDate ? match.utcDate.split('T')[0] : new Date().toISOString().split('T')[0],
              time: match.utcDate ? match.utcDate.split('T')[1]?.substring(0, 5) : '00:00',
              status: match.status || 'SCHEDULED',
              venue: match.venue || '',
              referee: match.referees?.[0]?.name || ''
            }));
            
            allMatches.push(...competitionMatches);
            console.log(`✅ ${competitionMatches.length} partidos encontrados en ${competition.name}`);
          } else {
            console.log(`ℹ️ No hay partidos próximos en ${competition.name}`);
          }
          
          // Pequeña pausa para no sobrecargar la API
          await new Promise(resolve => setTimeout(resolve, 200));
          
        } catch (error) {
          console.error(`❌ Error procesando competición ${competition.name}:`, error);
        }
      }
      
      console.log(`🎉 Total de partidos encontrados: ${allMatches.length}`);
      return allMatches;
      
    } catch (error) {
      console.error('❌ Error obteniendo partidos de Football-Data.org:', error);
      return [];
    }
  }

  // Filtrar competiciones de interés
  static filterTargetCompetitions(competitions: any[]): any[] {
    const targetCompetitionNames = [
      'Premier League',
      'Bundesliga',
      'Primera División',
      'Serie A',
      'Ligue 1',
      'Champions League',
      'Europa League'
    ];

    return competitions.filter(competition => {
      const competitionName = competition.name?.toLowerCase() || '';
      return targetCompetitionNames.some(target => 
        competitionName.includes(target.toLowerCase()) ||
        target.toLowerCase().includes(competitionName)
      );
    });
  }

  // Obtener todos los partidos próximos de todas las APIs
  static async getAllUpcomingMatches(): Promise<RealMatch[]> {
    console.log('🚀 Iniciando búsqueda de partidos próximos...');
    
    const allMatches: RealMatch[] = [];
    
    try {
      // Obtener de TheSportsDB
      const theSportsDBMatches = await this.getUpcomingMatchesFromTheSportsDB();
      allMatches.push(...theSportsDBMatches);
      
      // Obtener de Football-Data.org
      const footballDataMatches = await this.getUpcomingMatchesFromFootballData();
      allMatches.push(...footballDataMatches);
      
      // Eliminar duplicados basándose en el ID y fecha
      const uniqueMatches = this.removeDuplicates(allMatches);
      
      // Ordenar por fecha
      uniqueMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
      console.log(`🎉 Total de partidos únicos encontrados: ${uniqueMatches.length}`);
      return uniqueMatches;
      
    } catch (error) {
      console.error('❌ Error obteniendo partidos próximos:', error);
      return [];
    }
  }

  // Eliminar duplicados
  static removeDuplicates(matches: RealMatch[]): RealMatch[] {
    const seen = new Set();
    return matches.filter(match => {
      const key = `${match.homeTeam}-${match.awayTeam}-${match.date}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  // Obtener estadísticas de equipos (mock por ahora)
  static async getTeamStats(teamName: string, league: string): Promise<any> {
    // En producción, esto vendría de análisis de datos históricos
    return {
      form: Math.random() * 100,
      homeRecord: Math.random() * 100,
      awayRecord: Math.random() * 100,
      goalsScored: Math.floor(Math.random() * 50) + 20,
      goalsConceded: Math.floor(Math.random() * 40) + 15,
      cleanSheets: Math.floor(Math.random() * 15) + 5
    };
  }

  // Calcular probabilidades basadas en estadísticas reales
  static async calculateRealProbabilities(match: RealMatch): Promise<{
    homeWin: number;
    draw: number;
    awayWin: number;
    over25: number;
    under25: number;
    bothTeamsScore: number;
  }> {
    try {
      const homeStats = await this.getTeamStats(match.homeTeam, match.league);
      const awayStats = await this.getTeamStats(match.awayTeam, match.league);
      
      // Cálculo básico de probabilidades (en producción sería más sofisticado)
      const homeStrength = homeStats.form / 100;
      const awayStrength = awayStats.form / 100;
      
      const homeWin = Math.min(0.85, Math.max(0.15, homeStrength / (homeStrength + awayStrength + 0.3)));
      const awayWin = Math.min(0.85, Math.max(0.15, awayStrength / (homeStrength + awayStrength + 0.3)));
      const draw = Math.min(0.35, Math.max(0.15, 0.3 - Math.abs(homeStrength - awayStrength) * 0.1));
      
      // Normalizar probabilidades
      const total = homeWin + draw + awayWin;
      const normalizedHomeWin = homeWin / total;
      const normalizedDraw = draw / total;
      const normalizedAwayWin = awayWin / total;
      
      // Calcular Over/Under basado en goles promedio
      const avgGoals = (homeStats.goalsScored + awayStats.goalsConceded + awayStats.goalsScored + homeStats.goalsConceded) / 4;
      const over25 = Math.min(0.8, Math.max(0.2, avgGoals / 3));
      const under25 = 1 - over25;
      
      // Calcular Both Teams Score
      const bothTeamsScore = Math.min(0.8, Math.max(0.3, 0.5 + (homeStats.form + awayStats.form) / 200));
      
      return {
        homeWin: normalizedHomeWin,
        draw: normalizedDraw,
        awayWin: normalizedAwayWin,
        over25,
        under25,
        bothTeamsScore
      };
      
    } catch (error) {
      console.error('Error calculando probabilidades:', error);
      // Retornar probabilidades por defecto
      return {
        homeWin: 0.33,
        draw: 0.33,
        awayWin: 0.34,
        over25: 0.5,
        under25: 0.5,
        bothTeamsScore: 0.5
      };
    }
  }
}


