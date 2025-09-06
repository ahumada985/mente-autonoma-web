// Sistema de Análisis de Partidos de Fútbol
import { SPORTS_BETTING_CONFIG, validateRecommendation } from './sports-betting-config';
import { Match, TeamForm, HeadToHead, AnalysisResult, MarketAnalysis } from './database-schema';

export class MatchAnalyzer {
  private match: Match;
  private homeTeamForm: TeamForm;
  private awayTeamForm: TeamForm;
  private headToHead: HeadToHead;

  constructor(
    match: Match,
    homeTeamForm: TeamForm,
    awayTeamForm: TeamForm,
    headToHead: HeadToHead
  ) {
    this.match = match;
    this.homeTeamForm = homeTeamForm;
    this.awayTeamForm = awayTeamForm;
    this.headToHead = headToHead;
  }

  // Análisis del mercado Resultado Final (1X2)
  analyzeMatchResult(): AnalysisResult {
    const homeWinProb = this.calculateHomeWinProbability();
    const drawProb = this.calculateDrawProbability();
    const awayWinProb = this.calculateAwayWinProbability();

    // Aplicar regla crítica: solo recomendar si probabilidad > 85%
    const homeWinRecommended = validateRecommendation("Resultado Final (1X2)", homeWinProb);
    const awayWinRecommended = validateRecommendation("Resultado Final (1X2)", awayWinProb);

    let bestSelection = "Draw";
    let bestProbability = drawProb;
    let isRecommended = false;

    if (homeWinRecommended && homeWinProb > bestProbability) {
      bestSelection = "Home Win";
      bestProbability = homeWinProb;
      isRecommended = true;
    } else if (awayWinRecommended && awayWinProb > bestProbability) {
      bestSelection = "Away Win";
      bestProbability = awayWinProb;
      isRecommended = true;
    }

    return {
      matchId: this.match.id,
      market: "Resultado Final (1X2)",
      selection: bestSelection,
      probability: bestProbability,
      confidence: this.getConfidenceLevel(bestProbability),
      reasoning: this.generateMatchResultReasoning(bestSelection, bestProbability),
      factors: {
        teamForm: this.calculateTeamFormFactor(),
        headToHead: this.calculateHeadToHeadFactor(),
        homeAdvantage: this.calculateHomeAdvantageFactor(),
        injuries: this.calculateInjuriesFactor(),
        motivation: this.calculateMotivationFactor()
      },
      recommendation: isRecommended
    };
  }

  // Análisis del mercado Más/Menos Goles
  analyzeOverUnderGoals(threshold: number): AnalysisResult {
    const overProb = this.calculateOverGoalsProbability(threshold);
    const underProb = 1 - overProb;

    const overRecommended = overProb >= 0.70;
    const underRecommended = underProb >= 0.70;

    let bestSelection = overProb > underProb ? `Over ${threshold}.5` : `Under ${threshold}.5`;
    let bestProbability = Math.max(overProb, underProb);
    let isRecommended = overRecommended || underRecommended;

    return {
      matchId: this.match.id,
      market: `Más/Menos de ${threshold}.5 Goles`,
      selection: bestSelection,
      probability: bestProbability,
      confidence: this.getConfidenceLevel(bestProbability),
      reasoning: this.generateOverUnderReasoning(threshold, bestSelection, bestProbability),
      factors: {
        teamForm: this.calculateTeamFormFactor(),
        headToHead: this.calculateHeadToHeadFactor(),
        homeAdvantage: this.calculateHomeAdvantageFactor(),
        injuries: this.calculateInjuriesFactor(),
        motivation: this.calculateMotivationFactor()
      },
      recommendation: isRecommended
    };
  }

  // Análisis del mercado Ambos Equipos Anotan
  analyzeBothTeamsScore(): AnalysisResult {
    const bttsProb = this.calculateBothTeamsScoreProbability();
    const noBttsProb = 1 - bttsProb;

    const bttsRecommended = bttsProb >= 0.70;
    const noBttsRecommended = noBttsProb >= 0.70;

    let bestSelection = bttsProb > noBttsProb ? "Sí" : "No";
    let bestProbability = Math.max(bttsProb, noBttsProb);
    let isRecommended = bttsRecommended || noBttsRecommended;

    return {
      matchId: this.match.id,
      market: "Ambos Equipos Anotan",
      selection: bestSelection,
      probability: bestProbability,
      confidence: this.getConfidenceLevel(bestProbability),
      reasoning: this.generateBttsReasoning(bestSelection, bestProbability),
      factors: {
        teamForm: this.calculateTeamFormFactor(),
        headToHead: this.calculateHeadToHeadFactor(),
        homeAdvantage: this.calculateHomeAdvantageFactor(),
        injuries: this.calculateInjuriesFactor(),
        motivation: this.calculateMotivationFactor()
      },
      recommendation: isRecommended
    };
  }

  // Análisis completo de todos los mercados
  analyzeAllMarkets(): MarketAnalysis[] {
    const markets: MarketAnalysis[] = [];

    // Resultado Final
    const matchResult = this.analyzeMatchResult();
    markets.push({
      market: "Resultado Final (1X2)",
      selections: [
        {
          selection: "Home Win",
          probability: this.calculateHomeWinProbability(),
          recommendation: validateRecommendation("Resultado Final (1X2)", this.calculateHomeWinProbability())
        },
        {
          selection: "Draw",
          probability: this.calculateDrawProbability(),
          recommendation: false
        },
        {
          selection: "Away Win",
          probability: this.calculateAwayWinProbability(),
          recommendation: validateRecommendation("Resultado Final (1X2)", this.calculateAwayWinProbability())
        }
      ],
      bestSelection: matchResult.selection,
      confidence: matchResult.confidence
    });

    // Más/Menos Goles
    [1.5, 2.5, 3.5].forEach(threshold => {
      const overUnder = this.analyzeOverUnderGoals(threshold);
      markets.push({
        market: `Más/Menos de ${threshold}.5 Goles`,
        selections: [
          {
            selection: `Over ${threshold}.5`,
            probability: this.calculateOverGoalsProbability(threshold),
            recommendation: this.calculateOverGoalsProbability(threshold) >= 0.70
          },
          {
            selection: `Under ${threshold}.5`,
            probability: 1 - this.calculateOverGoalsProbability(threshold),
            recommendation: (1 - this.calculateOverGoalsProbability(threshold)) >= 0.70
          }
        ],
        bestSelection: overUnder.selection,
        confidence: overUnder.confidence
      });
    });

    // Ambos Equipos Anotan
    const btts = this.analyzeBothTeamsScore();
    markets.push({
      market: "Ambos Equipos Anotan",
      selections: [
        {
          selection: "Sí",
          probability: this.calculateBothTeamsScoreProbability(),
          recommendation: this.calculateBothTeamsScoreProbability() >= 0.70
        },
        {
          selection: "No",
          probability: 1 - this.calculateBothTeamsScoreProbability(),
          recommendation: (1 - this.calculateBothTeamsScoreProbability()) >= 0.70
        }
      ],
      bestSelection: btts.selection,
      confidence: btts.confidence
    });

    return markets;
  }

  // Métodos de cálculo de probabilidades
  private calculateHomeWinProbability(): number {
    const formFactor = this.calculateTeamFormFactor();
    const h2hFactor = this.calculateHeadToHeadFactor();
    const homeAdvantage = this.calculateHomeAdvantageFactor();
    
    // Cálculo basado en forma reciente (40%), H2H (30%), ventaja local (30%)
    let probability = 0.33; // Base neutral
    
    // Ajuste por forma del equipo
    const homeFormAdvantage = (this.homeTeamForm.wins - this.awayTeamForm.wins) / 10;
    probability += homeFormAdvantage * 0.4;
    
    // Ajuste por historial H2H
    if (this.headToHead.totalMatches > 0) {
      const h2hAdvantage = (this.headToHead.homeWins - this.headToHead.awayWins) / this.headToHead.totalMatches;
      probability += h2hAdvantage * 0.3;
    }
    
    // Ajuste por ventaja local
    probability += homeAdvantage * 0.3;
    
    return Math.max(0.1, Math.min(0.9, probability));
  }

  private calculateDrawProbability(): number {
    // Probabilidad de empate basada en defensas y forma similar
    const formDifference = Math.abs(this.homeTeamForm.wins - this.awayTeamForm.wins);
    const baseDrawProb = 0.25;
    
    // Si los equipos tienen forma similar, mayor probabilidad de empate
    const formFactor = Math.max(0, 0.1 - (formDifference * 0.02));
    
    return Math.max(0.15, Math.min(0.35, baseDrawProb + formFactor));
  }

  private calculateAwayWinProbability(): number {
    return 1 - this.calculateHomeWinProbability() - this.calculateDrawProbability();
  }

  private calculateOverGoalsProbability(threshold: number): number {
    const homeGoalsFor = this.homeTeamForm.goalsFor / this.homeTeamForm.matchesPlayed;
    const homeGoalsAgainst = this.homeTeamForm.goalsAgainst / this.homeTeamForm.matchesPlayed;
    const awayGoalsFor = this.awayTeamForm.goalsFor / this.awayTeamForm.matchesPlayed;
    const awayGoalsAgainst = this.awayTeamForm.goalsAgainst / this.awayTeamForm.matchesPlayed;
    
    // Promedio de goles esperados
    const expectedGoals = (homeGoalsFor + awayGoalsFor) / 2;
    
    // Ajuste por defensas débiles
    const weakDefense = (homeGoalsAgainst + awayGoalsAgainst) / 2;
    const defenseFactor = weakDefense > 1.5 ? 0.1 : 0;
    
    let probability = 0.5;
    
    if (threshold === 1.5) {
      probability = Math.min(0.85, 0.6 + (expectedGoals - 1.5) * 0.2 + defenseFactor);
    } else if (threshold === 2.5) {
      probability = Math.min(0.8, 0.4 + (expectedGoals - 2.5) * 0.3 + defenseFactor);
    } else if (threshold === 3.5) {
      probability = Math.min(0.7, 0.2 + (expectedGoals - 3.5) * 0.4 + defenseFactor);
    }
    
    return Math.max(0.1, Math.min(0.9, probability));
  }

  private calculateBothTeamsScoreProbability(): number {
    const homeScoringRate = this.homeTeamForm.goalsFor / this.homeTeamForm.matchesPlayed;
    const awayScoringRate = this.awayTeamForm.goalsFor / this.awayTeamForm.matchesPlayed;
    const homeConcedingRate = this.homeTeamForm.goalsAgainst / this.homeTeamForm.matchesPlayed;
    const awayConcedingRate = this.awayTeamForm.goalsAgainst / this.awayTeamForm.matchesPlayed;
    
    // Probabilidad de que ambos equipos anoten
    const homeScoreProb = Math.min(0.9, homeScoringRate * 0.8);
    const awayScoreProb = Math.min(0.9, awayScoringRate * 0.8);
    
    return homeScoreProb * awayScoreProb;
  }

  // Métodos de cálculo de factores
  private calculateTeamFormFactor(): number {
    const homeForm = this.homeTeamForm.wins / this.homeTeamForm.matchesPlayed;
    const awayForm = this.awayTeamForm.wins / this.awayTeamForm.matchesPlayed;
    return homeForm - awayForm;
  }

  private calculateHeadToHeadFactor(): number {
    if (this.headToHead.totalMatches === 0) return 0;
    return (this.headToHead.homeWins - this.headToHead.awayWins) / this.headToHead.totalMatches;
  }

  private calculateHomeAdvantageFactor(): number {
    // Ventaja local típica en fútbol
    return 0.1;
  }

  private calculateInjuriesFactor(): number {
    // Placeholder - se implementaría con datos de lesiones
    return 0;
  }

  private calculateMotivationFactor(): number {
    // Placeholder - se implementaría con contexto del partido
    return 0;
  }

  private getConfidenceLevel(probability: number): 'low' | 'medium' | 'high' {
    if (probability >= 0.8) return 'high';
    if (probability >= 0.65) return 'medium';
    return 'low';
  }

  // Métodos de generación de reasoning
  private generateMatchResultReasoning(selection: string, probability: number): string {
    const homeForm = `${this.homeTeamForm.wins}W-${this.homeTeamForm.draws}D-${this.homeTeamForm.losses}L`;
    const awayForm = `${this.awayTeamForm.wins}W-${this.awayTeamForm.draws}D-${this.awayTeamForm.losses}L`;
    
    let reasoning = `Análisis basado en forma reciente: Local ${homeForm}, Visitante ${awayForm}. `;
    
    if (this.headToHead.totalMatches > 0) {
      reasoning += `H2H: ${this.headToHead.homeWins}-${this.headToHead.draws}-${this.headToHead.awayWins}. `;
    }
    
    reasoning += `Probabilidad calculada: ${(probability * 100).toFixed(1)}%. `;
    
    if (probability >= 0.85) {
      reasoning += "Recomendación de alta confianza.";
    } else if (probability >= 0.70) {
      reasoning += "Recomendación de confianza media.";
    } else {
      reasoning += "No se recomienda por baja probabilidad.";
    }
    
    return reasoning;
  }

  private generateOverUnderReasoning(threshold: number, selection: string, probability: number): string {
    const homeGoals = (this.homeTeamForm.goalsFor / this.homeTeamForm.matchesPlayed).toFixed(1);
    const awayGoals = (this.awayTeamForm.goalsFor / this.awayTeamForm.matchesPlayed).toFixed(1);
    
    return `Promedio de goles: Local ${homeGoals}, Visitante ${awayGoals}. ` +
           `Umbral ${threshold}.5 goles. Probabilidad ${(probability * 100).toFixed(1)}%. ` +
           `Recomendación: ${selection}.`;
  }

  private generateBttsReasoning(selection: string, probability: number): string {
    const homeScoring = (this.homeTeamForm.goalsFor / this.homeTeamForm.matchesPlayed).toFixed(1);
    const awayScoring = (this.awayTeamForm.goalsFor / this.awayTeamForm.matchesPlayed).toFixed(1);
    
    return `Capacidad goleadora: Local ${homeScoring} goles/partido, Visitante ${awayScoring} goles/partido. ` +
           `Probabilidad BTTS: ${(probability * 100).toFixed(1)}%. Recomendación: ${selection}.`;
  }
}


