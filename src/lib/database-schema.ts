// Esquema de Base de Datos para Sistema de Análisis de Apuestas Deportivas

export interface League {
  id: string;
  name: string;
  country: string;
  type: 'league' | 'cup' | 'international';
  season: string;
  isActive: boolean;
  apiId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  country: string;
  leagueId: string;
  logo?: string;
  founded?: number;
  stadium?: string;
  apiId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Match {
  id: string;
  leagueId: string;
  homeTeamId: string;
  awayTeamId: string;
  matchDate: Date;
  status: 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';
  homeScore?: number;
  awayScore?: number;
  homeScoreHT?: number;
  awayScoreHT?: number;
  referee?: string;
  venue?: string;
  apiId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MatchStatistics {
  id: string;
  matchId: string;
  teamId: string;
  possession: number;
  shots: number;
  shotsOnTarget: number;
  corners: number;
  fouls: number;
  yellowCards: number;
  redCards: number;
  offsides: number;
  passes: number;
  passesAccuracy: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Odds {
  id: string;
  matchId: string;
  bookmaker: string;
  market: string;
  selection: string;
  odds: number;
  probability: number;
  timestamp: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prediction {
  id: string;
  matchId: string;
  market: string;
  selection: string;
  probability: number;
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
  algorithm: string;
  isRecommended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamForm {
  id: string;
  teamId: string;
  leagueId: string;
  season: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  position: number;
  homeWins: number;
  homeDraws: number;
  homeLosses: number;
  awayWins: number;
  awayDraws: number;
  awayLosses: number;
  formLast5: string; // "WWDLW"
  createdAt: Date;
  updatedAt: Date;
}

export interface HeadToHead {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  leagueId: string;
  totalMatches: number;
  homeWins: number;
  draws: number;
  awayWins: number;
  homeGoals: number;
  awayGoals: number;
  lastMeeting?: Date;
  lastMeetingResult?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  username: string;
  subscription: 'free' | 'premium' | 'vip';
  preferences: {
    leagues: string[];
    markets: string[];
    notifications: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Tipster {
  id: string;
  userId: string;
  name: string;
  description: string;
  specialties: string[];
  trackRecord: {
    totalPredictions: number;
    correctPredictions: number;
    accuracy: number;
    profit: number;
  };
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para análisis
export interface AnalysisResult {
  matchId: string;
  market: string;
  selection: string;
  probability: number;
  confidence: 'low' | 'medium' | 'high';
  reasoning: string;
  factors: {
    teamForm: number;
    headToHead: number;
    homeAdvantage: number;
    injuries: number;
    motivation: number;
  };
  recommendation: boolean;
  odds?: number;
  value?: number;
}

export interface MarketAnalysis {
  market: string;
  selections: {
    selection: string;
    probability: number;
    odds?: number;
    value?: number;
    recommendation: boolean;
  }[];
  bestSelection?: string;
  confidence: 'low' | 'medium' | 'high';
}

// Configuración de la base de datos
export const DATABASE_CONFIG = {
  tables: {
    leagues: 'leagues',
    teams: 'teams',
    matches: 'matches',
    matchStatistics: 'match_statistics',
    odds: 'odds',
    predictions: 'predictions',
    teamForm: 'team_form',
    headToHead: 'head_to_head',
    users: 'users',
    tipsters: 'tipsters'
  },
  
  indexes: {
    matches: ['leagueId', 'matchDate', 'status'],
    odds: ['matchId', 'bookmaker', 'market'],
    predictions: ['matchId', 'market', 'isRecommended'],
    teamForm: ['teamId', 'leagueId', 'season']
  }
};

// Funciones de utilidad para la base de datos
export class DatabaseUtils {
  static generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  static formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
  
  static calculateProbability(odds: number): number {
    return 1 / odds;
  }
  
  static calculateValue(probability: number, odds: number): number {
    return (probability * odds) - 1;
  }
  
  static isValueBet(probability: number, odds: number, threshold: number = 0.1): boolean {
    const value = this.calculateValue(probability, odds);
    return value > threshold;
  }
}


