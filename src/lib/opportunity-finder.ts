// Sistema de Búsqueda de Oportunidades de Valor
// Analiza partidos próximos y encuentra oportunidades de apuestas

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  homeOdds?: number;
  drawOdds?: number;
  awayOdds?: number;
  over25Odds?: number;
  under25Odds?: number;
  bothTeamsScoreOdds?: number;
  homeWinProbability?: number;
  drawProbability?: number;
  awayWinProbability?: number;
  over25Probability?: number;
  under25Probability?: number;
  bothTeamsScoreProbability?: number;
  valueRating?: number;
  confidence?: number;
}

export interface Opportunity {
  match: Match;
  market: string;
  prediction: string;
  odds: number;
  probability: number;
  value: number;
  confidence: number;
  reasoning: string;
}

export class OpportunityFinder {
  
  // Buscar partidos próximos de las ligas de interés
  static async findUpcomingMatches(): Promise<Match[]> {
    const matches: Match[] = [];
    
    try {
      // Usar TheSportsDB para buscar partidos próximos
      const leagues = [
        'Chile Primera División',
        'Argentina Liga Profesional', 
        'Brasil Brasileirão',
        'Colombia Primera A',
        'Premier League',
        'Bundesliga',
        'La Liga',
        'Serie A'
      ];

      for (const league of leagues) {
        const leagueMatches = await this.getLeagueUpcomingMatches(league);
        matches.push(...leagueMatches);
      }

      // Ordenar por fecha
      return matches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      
    } catch (error) {
      console.error('Error buscando partidos próximos:', error);
      return [];
    }
  }

  // Obtener partidos próximos de una liga específica
  static async getLeagueUpcomingMatches(league: string): Promise<Match[]> {
    try {
      const key = process.env.THE_SPORTS_DB_KEY;
      if (!key) return [];

      // Buscar la liga por nombre
      const leagueResponse = await fetch(
        `https://www.thesportsdb.com/api/v1/json/${key}/search_all_leagues.php?s=Soccer`
      );
      
      if (!leagueResponse.ok) return [];
      
      const leagueData = await leagueResponse.json();
      const targetLeague = leagueData.leagues?.find((l: any) => 
        l.strLeague?.toLowerCase().includes(league.toLowerCase())
      );
      
      if (!targetLeague) return [];

      // Buscar eventos próximos de la liga
      const eventsResponse = await fetch(
        `https://www.thesportsdb.com/api/v1/json/${key}/eventsnextleague.php?id=${targetLeague.idLeague}`
      );
      
      if (!eventsResponse.ok) return [];
      
      const eventsData = await eventsResponse.json();
      
      if (!eventsData.events) return [];

      // Convertir a formato Match
      return eventsData.events.map((event: any) => ({
        id: event.idEvent,
        homeTeam: event.strHomeTeam,
        awayTeam: event.strAwayTeam,
        league: targetLeague.strLeague,
        date: event.dateEvent,
        time: event.strTime,
        homeOdds: this.generateMockOdds(),
        drawOdds: this.generateMockOdds(),
        awayOdds: this.generateMockOdds(),
        over25Odds: this.generateMockOdds(),
        under25Odds: this.generateMockOdds(),
        bothTeamsScoreOdds: this.generateMockOdds(),
        homeWinProbability: this.calculateProbability(event.strHomeTeam, event.strAwayTeam, 'home'),
        drawProbability: this.calculateProbability(event.strHomeTeam, event.strAwayTeam, 'draw'),
        awayWinProbability: this.calculateProbability(event.strHomeTeam, event.strAwayTeam, 'away'),
        over25Probability: this.calculateOverUnderProbability(event.strHomeTeam, event.strAwayTeam, 2.5),
        under25Probability: this.calculateOverUnderProbability(event.strHomeTeam, event.strAwayTeam, 2.5, false),
        bothTeamsScoreProbability: this.calculateBothTeamsScoreProbability(event.strHomeTeam, event.strAwayTeam),
        valueRating: this.calculateValueRating(),
        confidence: this.calculateConfidence()
      }));

    } catch (error) {
      console.error(`Error obteniendo partidos de ${league}:`, error);
      return [];
    }
  }

  // Generar cuotas mock (en producción vendrían de casas de apuestas)
  static generateMockOdds(): number {
    return Math.random() * 3 + 1.5; // Entre 1.5 y 4.5
  }

  // Calcular probabilidades basadas en análisis de equipos
  static calculateProbability(homeTeam: string, awayTeam: string, outcome: 'home' | 'draw' | 'away'): number {
    // Análisis básico basado en nombres de equipos y liga
    const homeStrength = this.getTeamStrength(homeTeam);
    const awayStrength = this.getTeamStrength(awayTeam);
    
    switch (outcome) {
      case 'home':
        return Math.min(0.85, Math.max(0.15, homeStrength / (homeStrength + awayStrength + 0.3)));
      case 'draw':
        return Math.min(0.35, Math.max(0.15, 0.3 - Math.abs(homeStrength - awayStrength) * 0.1));
      case 'away':
        return Math.min(0.85, Math.max(0.15, awayStrength / (homeStrength + awayStrength + 0.3)));
      default:
        return 0.33;
    }
  }

  // Calcular probabilidad Over/Under
  static calculateOverUnderProbability(homeTeam: string, awayTeam: string, line: number, over: boolean = true): number {
    const homeStrength = this.getTeamStrength(homeTeam);
    const awayStrength = this.getTeamStrength(awayTeam);
    const totalStrength = homeStrength + awayStrength;
    
    // Equipos más fuertes tienden a marcar más goles
    const baseProbability = Math.min(0.8, Math.max(0.2, totalStrength / 2));
    
    if (over) {
      return line <= 2.5 ? baseProbability : Math.max(0.1, baseProbability - 0.2);
    } else {
      return line <= 2.5 ? 1 - baseProbability : Math.max(0.1, 1 - baseProbability + 0.2);
    }
  }

  // Calcular probabilidad Both Teams Score
  static calculateBothTeamsScoreProbability(homeTeam: string, awayTeam: string): number {
    const homeStrength = this.getTeamStrength(homeTeam);
    const awayStrength = this.getTeamStrength(awayTeam);
    
    // Equipos más equilibrados tienen más probabilidad de BTS
    const balance = 1 - Math.abs(homeStrength - awayStrength);
    return Math.min(0.8, Math.max(0.3, 0.5 + balance * 0.3));
  }

  // Obtener fuerza del equipo basada en nombre (mock)
  static getTeamStrength(teamName: string): number {
    const strongTeams = ['real madrid', 'barcelona', 'manchester city', 'liverpool', 'bayern', 'psg'];
    const weakTeams = ['relegation', 'promoted', 'new', 'young'];
    
    const name = teamName.toLowerCase();
    
    if (strongTeams.some(strong => name.includes(strong))) return 0.8;
    if (weakTeams.some(weak => name.includes(weak))) return 0.3;
    
    return 0.5 + Math.random() * 0.3; // Entre 0.5 y 0.8
  }

  // Calcular rating de valor
  static calculateValueRating(): number {
    return Math.random() * 100; // Entre 0 y 100
  }

  // Calcular confianza
  static calculateConfidence(): number {
    return Math.random() * 40 + 60; // Entre 60 y 100
  }

  // Encontrar oportunidades de valor
  static findValueOpportunities(matches: Match[]): Opportunity[] {
    const opportunities: Opportunity[] = [];
    
    for (const match of matches) {
      // Analizar mercado 1X2
      if (match.homeWinProbability && match.homeOdds) {
        const value = this.calculateValue(match.homeWinProbability, match.homeOdds);
        if (value > 0.1) { // Valor > 10%
          opportunities.push({
            match,
            market: '1X2',
            prediction: 'Local',
            odds: match.homeOdds,
            probability: match.homeWinProbability,
            value,
            confidence: match.confidence || 0,
            reasoning: `El equipo local tiene ${(match.homeWinProbability * 100).toFixed(1)}% de probabilidad de ganar, pero las cuotas ofrecen ${match.homeOdds.toFixed(2)} (${(1/match.homeOdds * 100).toFixed(1)}% implícita). Valor: ${(value * 100).toFixed(1)}%`
          });
        }
      }

      if (match.awayWinProbability && match.awayOdds) {
        const value = this.calculateValue(match.awayWinProbability, match.awayOdds);
        if (value > 0.1) {
          opportunities.push({
            match,
            market: '1X2',
            prediction: 'Visitante',
            odds: match.awayOdds,
            probability: match.awayWinProbability,
            value,
            confidence: match.confidence || 0,
            reasoning: `El equipo visitante tiene ${(match.awayWinProbability * 100).toFixed(1)}% de probabilidad de ganar, pero las cuotas ofrecen ${match.awayOdds.toFixed(2)} (${(1/match.awayOdds * 100).toFixed(1)}% implícita). Valor: ${(value * 100).toFixed(1)}%`
          });
        }
      }

      // Analizar mercado Over/Under 2.5
      if (match.over25Probability && match.over25Odds) {
        const value = this.calculateValue(match.over25Probability, match.over25Odds);
        if (value > 0.1) {
          opportunities.push({
            match,
            market: 'Over/Under 2.5',
            prediction: 'Over 2.5',
            odds: match.over25Odds,
            probability: match.over25Probability,
            value,
            confidence: match.confidence || 0,
            reasoning: `Probabilidad de Over 2.5: ${(match.over25Probability * 100).toFixed(1)}%, cuotas: ${match.over25Odds.toFixed(2)}. Valor: ${(value * 100).toFixed(1)}%`
          });
        }
      }

      if (match.under25Probability && match.under25Odds) {
        const value = this.calculateValue(match.under25Probability, match.under25Odds);
        if (value > 0.1) {
          opportunities.push({
            match,
            market: 'Over/Under 2.5',
            prediction: 'Under 2.5',
            odds: match.under25Odds,
            probability: match.under25Probability,
            value,
            confidence: match.confidence || 0,
            reasoning: `Probabilidad de Under 2.5: ${(match.under25Probability * 100).toFixed(1)}%, cuotas: ${match.under25Odds.toFixed(2)}. Valor: ${(value * 100).toFixed(1)}%`
          });
        }
      }

      // Analizar mercado Both Teams Score
      if (match.bothTeamsScoreProbability && match.bothTeamsScoreOdds) {
        const value = this.calculateValue(match.bothTeamsScoreProbability, match.bothTeamsScoreOdds);
        if (value > 0.1) {
          opportunities.push({
            match,
            market: 'Both Teams Score',
            prediction: 'Sí',
            odds: match.bothTeamsScoreOdds,
            probability: match.bothTeamsScoreProbability,
            value,
            confidence: match.confidence || 0,
            reasoning: `Probabilidad de BTS: ${(match.bothTeamsScoreProbability * 100).toFixed(1)}%, cuotas: ${match.bothTeamsScoreOdds.toFixed(2)}. Valor: ${(value * 100).toFixed(1)}%`
          });
        }
      }
    }

    // Ordenar por valor descendente
    return opportunities.sort((a, b) => b.value - a.value);
  }

  // Calcular valor de una apuesta
  static calculateValue(probability: number, odds: number): number {
    const impliedProbability = 1 / odds;
    return probability - impliedProbability;
  }

  // Filtrar oportunidades por confianza mínima
  static filterByConfidence(opportunities: Opportunity[], minConfidence: number = 70): Opportunity[] {
    return opportunities.filter(opp => opp.confidence >= minConfidence);
  }

  // Filtrar oportunidades por valor mínimo
  static filterByValue(opportunities: Opportunity[], minValue: number = 0.15): Opportunity[] {
    return opportunities.filter(opp => opp.value >= minValue);
  }

  // Obtener resumen de oportunidades
  static getOpportunitiesSummary(opportunities: Opportunity[]): {
    total: number;
    highValue: number;
    highConfidence: number;
    byMarket: Record<string, number>;
    byLeague: Record<string, number>;
  } {
    const summary = {
      total: opportunities.length,
      highValue: opportunities.filter(opp => opp.value >= 0.2).length,
      highConfidence: opportunities.filter(opp => opp.confidence >= 80).length,
      byMarket: {} as Record<string, number>,
      byLeague: {} as Record<string, number>
    };

    // Contar por mercado
    opportunities.forEach(opp => {
      summary.byMarket[opp.market] = (summary.byMarket[opp.market] || 0) + 1;
      summary.byLeague[opp.match.league] = (summary.byLeague[opp.match.league] || 0) + 1;
    });

    return summary;
  }
}


