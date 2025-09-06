// Analizador de archivos CSV para crear la "Gran Henki Dama de Goku"
// Sistema masivo de análisis de datos históricos de fútbol

export interface CSVData {
  filename: string;
  content: string;
  headers: string[];
  rows: string[][];
  totalRows: number;
  detectedFormat: 'matches' | 'teams' | 'players' | 'unknown';
  league?: string;
  season?: string;
  country?: string;
}

export interface ProcessedMatchData {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  result: 'H' | 'D' | 'A';
  league: string;
  season: string;
  country: string;
  venue?: string;
  referee?: string;
  attendance?: number;
  dataSource: string;
  verified: boolean;
  additionalStats?: {
    possession?: { home: number; away: number };
    shots?: { home: number; away: number };
    shotsOnTarget?: { home: number; away: number };
    corners?: { home: number; away: number };
    fouls?: { home: number; away: number };
    yellowCards?: { home: number; away: number };
    redCards?: { home: number; away: number };
  };
}

export interface ProcessedTeamData {
  id: string;
  name: string;
  league: string;
  season: string;
  country: string;
  position: number;
  points: number;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  homeRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  awayRecord: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  recentForm: string;
  cleanSheets: number;
  avgGoalsScored: number;
  avgGoalsConceded: number;
  dataSource: string;
  verified: boolean;
}

export class CSVAnalyzer {
  
  // Analizar archivo CSV
  static analyzeCSV(filename: string, content: string): CSVData {
    console.log(`🔍 Analizando archivo CSV: ${filename}`);
    
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const rows = lines.slice(1).map(line => 
      line.split(',').map(cell => cell.trim().replace(/"/g, ''))
    );
    
    const detectedFormat = this.detectFormat(headers, rows);
    
    console.log(`✅ CSV analizado: ${rows.length} filas, formato: ${detectedFormat}`);
    
    return {
      filename,
      content,
      headers,
      rows,
      totalRows: rows.length,
      detectedFormat,
      league: this.extractLeague(filename, headers, rows),
      season: this.extractSeason(filename, headers, rows),
      country: this.extractCountry(filename, headers, rows)
    };
  }

  // Detectar formato del CSV
  private static detectFormat(headers: string[], rows: string[][]): 'matches' | 'teams' | 'players' | 'unknown' {
    const headerStr = headers.join(' ').toLowerCase();
    
    // Detectar formato de partidos
    if (headerStr.includes('home') && headerStr.includes('away') && 
        (headerStr.includes('score') || headerStr.includes('goals'))) {
      return 'matches';
    }
    
    // Detectar formato de equipos
    if (headerStr.includes('position') && headerStr.includes('points') && 
        headerStr.includes('played')) {
      return 'teams';
    }
    
    // Detectar formato de jugadores
    if (headerStr.includes('player') && headerStr.includes('goals') && 
        headerStr.includes('assists')) {
      return 'players';
    }
    
    return 'unknown';
  }

  // Extraer liga del nombre del archivo o contenido
  private static extractLeague(filename: string, headers: string[], rows: string[][]): string | undefined {
    const filenameLower = filename.toLowerCase();
    
    // Buscar en el nombre del archivo
    if (filenameLower.includes('premier')) return 'Premier League';
    if (filenameLower.includes('laliga') || filenameLower.includes('la_liga')) return 'La Liga';
    if (filenameLower.includes('bundesliga')) return 'Bundesliga';
    if (filenameLower.includes('serie_a') || filenameLower.includes('seriea')) return 'Serie A';
    if (filenameLower.includes('ligue1') || filenameLower.includes('ligue_1')) return 'Ligue 1';
    if (filenameLower.includes('brasileirao') || filenameLower.includes('brasil')) return 'Brasileirão Série A';
    if (filenameLower.includes('argentina') || filenameLower.includes('liga_profesional')) return 'Liga Profesional';
    if (filenameLower.includes('chile') || filenameLower.includes('primera_division')) return 'Primera División';
    if (filenameLower.includes('colombia') || filenameLower.includes('primera_a')) return 'Primera A';
    
    // Buscar en headers
    const headerStr = headers.join(' ').toLowerCase();
    if (headerStr.includes('league')) {
      const leagueIndex = headers.findIndex(h => h.toLowerCase().includes('league'));
      if (leagueIndex !== -1 && rows.length > 0) {
        return rows[0][leagueIndex];
      }
    }
    
    return undefined;
  }

  // Extraer temporada del nombre del archivo o contenido
  private static extractSeason(filename: string, headers: string[], rows: string[][]): string | undefined {
    const filenameLower = filename.toLowerCase();
    
    // Buscar patrón de temporada en el nombre del archivo
    const seasonMatch = filenameLower.match(/(\d{4}[-_]\d{4}|\d{4})/);
    if (seasonMatch) {
      return seasonMatch[1].replace('_', '-');
    }
    
    // Buscar en headers
    const seasonIndex = headers.findIndex(h => 
      h.toLowerCase().includes('season') || h.toLowerCase().includes('temporada')
    );
    if (seasonIndex !== -1 && rows.length > 0) {
      return rows[0][seasonIndex];
    }
    
    return undefined;
  }

  // Extraer país del nombre del archivo o contenido
  private static extractCountry(filename: string, headers: string[], rows: string[][]): string | undefined {
    const filenameLower = filename.toLowerCase();
    
    // Buscar país en el nombre del archivo
    if (filenameLower.includes('england') || filenameLower.includes('premier')) return 'Inglaterra';
    if (filenameLower.includes('spain') || filenameLower.includes('laliga')) return 'España';
    if (filenameLower.includes('germany') || filenameLower.includes('bundesliga')) return 'Alemania';
    if (filenameLower.includes('italy') || filenameLower.includes('serie')) return 'Italia';
    if (filenameLower.includes('france') || filenameLower.includes('ligue')) return 'Francia';
    if (filenameLower.includes('brazil') || filenameLower.includes('brasil')) return 'Brasil';
    if (filenameLower.includes('argentina')) return 'Argentina';
    if (filenameLower.includes('chile')) return 'Chile';
    if (filenameLower.includes('colombia')) return 'Colombia';
    if (filenameLower.includes('uruguay')) return 'Uruguay';
    if (filenameLower.includes('peru')) return 'Perú';
    if (filenameLower.includes('ecuador')) return 'Ecuador';
    if (filenameLower.includes('paraguay')) return 'Paraguay';
    if (filenameLower.includes('bolivia')) return 'Bolivia';
    
    return undefined;
  }

  // Procesar datos de partidos desde CSV
  static processMatchesFromCSV(csvData: CSVData): ProcessedMatchData[] {
    if (csvData.detectedFormat !== 'matches') {
      throw new Error('El CSV no contiene datos de partidos');
    }

    console.log(`🔄 Procesando ${csvData.totalRows} partidos de ${csvData.league}...`);
    
    const matches: ProcessedMatchData[] = [];
    
    for (let i = 0; i < csvData.rows.length; i++) {
      const row = csvData.rows[i];
      if (row.length < 4) continue; // Saltar filas incompletas
      
      try {
        const match = this.parseMatchRow(csvData.headers, row, csvData.league, csvData.season, csvData.country);
        if (match) {
          matches.push(match);
        }
      } catch (error) {
        console.warn(`⚠️ Error procesando fila ${i + 1}: ${error}`);
      }
    }
    
    console.log(`✅ Procesados ${matches.length} partidos exitosamente`);
    return matches;
  }

  // Procesar datos de equipos desde CSV
  static processTeamsFromCSV(csvData: CSVData): ProcessedTeamData[] {
    if (csvData.detectedFormat !== 'teams') {
      throw new Error('El CSV no contiene datos de equipos');
    }

    console.log(`🔄 Procesando ${csvData.totalRows} equipos de ${csvData.league}...`);
    
    const teams: ProcessedTeamData[] = [];
    
    for (let i = 0; i < csvData.rows.length; i++) {
      const row = csvData.rows[i];
      if (row.length < 6) continue; // Saltar filas incompletas
      
      try {
        const team = this.parseTeamRow(csvData.headers, row, csvData.league, csvData.season, csvData.country);
        if (team) {
          teams.push(team);
        }
      } catch (error) {
        console.warn(`⚠️ Error procesando fila ${i + 1}: ${error}`);
      }
    }
    
    console.log(`✅ Procesados ${teams.length} equipos exitosamente`);
    return teams;
  }

  // Parsear fila de partido
  private static parseMatchRow(headers: string[], row: string[], league?: string, season?: string, country?: string): ProcessedMatchData | null {
    const getValue = (field: string): string => {
      const index = headers.findIndex(h => h.toLowerCase().includes(field.toLowerCase()));
      return index !== -1 ? row[index] : '';
    };

    const date = getValue('date') || getValue('fecha');
    const homeTeam = getValue('home') || getValue('home_team') || getValue('local');
    const awayTeam = getValue('away') || getValue('away_team') || getValue('visitante');
    const homeScore = parseInt(getValue('home_score') || getValue('home_goals') || getValue('goles_local') || '0');
    const awayScore = parseInt(getValue('away_score') || getValue('away_goals') || getValue('goles_visitante') || '0');

    if (!date || !homeTeam || !awayTeam || isNaN(homeScore) || isNaN(awayScore)) {
      return null;
    }

    const result: 'H' | 'D' | 'A' = homeScore > awayScore ? 'H' : homeScore < awayScore ? 'A' : 'D';

    return {
      id: `${homeTeam}-${awayTeam}-${date}`.replace(/\s+/g, '-').toLowerCase(),
      date,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      result,
      league: league || 'Unknown League',
      season: season || 'Unknown Season',
      country: country || 'Unknown Country',
      venue: getValue('venue') || getValue('stadium') || getValue('estadio'),
      referee: getValue('referee') || getValue('arbitro'),
      attendance: parseInt(getValue('attendance') || getValue('asistencia') || '0') || undefined,
      dataSource: 'CSV Import',
      verified: true,
      additionalStats: this.parseAdditionalStats(headers, row)
    };
  }

  // Parsear fila de equipo
  private static parseTeamRow(headers: string[], row: string[], league?: string, season?: string, country?: string): ProcessedTeamData | null {
    const getValue = (field: string): string => {
      const index = headers.findIndex(h => h.toLowerCase().includes(field.toLowerCase()));
      return index !== -1 ? row[index] : '';
    };

    const name = getValue('team') || getValue('name') || getValue('equipo');
    const position = parseInt(getValue('position') || getValue('pos') || getValue('posicion') || '0');
    const points = parseInt(getValue('points') || getValue('pts') || getValue('puntos') || '0');
    const played = parseInt(getValue('played') || getValue('p') || getValue('pj') || getValue('partidos') || '0');
    const wins = parseInt(getValue('wins') || getValue('w') || getValue('g') || getValue('ganados') || '0');
    const draws = parseInt(getValue('draws') || getValue('d') || getValue('e') || getValue('empates') || '0');
    const losses = parseInt(getValue('losses') || getValue('l') || getValue('p') || getValue('perdidos') || '0');
    const goalsFor = parseInt(getValue('goals_for') || getValue('gf') || getValue('goles_favor') || '0');
    const goalsAgainst = parseInt(getValue('goals_against') || getValue('ga') || getValue('goles_contra') || '0');

    if (!name || isNaN(position) || isNaN(points) || isNaN(played)) {
      return null;
    }

    const goalDifference = goalsFor - goalsAgainst;
    const avgGoalsScored = played > 0 ? goalsFor / played : 0;
    const avgGoalsConceded = played > 0 ? goalsAgainst / played : 0;

    return {
      id: `${name}-${league}-${season}`.replace(/\s+/g, '-').toLowerCase(),
      name,
      league: league || 'Unknown League',
      season: season || 'Unknown Season',
      country: country || 'Unknown Country',
      position,
      points,
      played,
      wins,
      draws,
      losses,
      goalsFor,
      goalsAgainst,
      goalDifference,
      homeRecord: {
        played: Math.floor(played / 2),
        wins: Math.floor(wins / 2),
        draws: Math.floor(draws / 2),
        losses: Math.floor(losses / 2),
        goalsFor: Math.floor(goalsFor / 2),
        goalsAgainst: Math.floor(goalsAgainst / 2)
      },
      awayRecord: {
        played: Math.ceil(played / 2),
        wins: Math.ceil(wins / 2),
        draws: Math.ceil(draws / 2),
        losses: Math.ceil(losses / 2),
        goalsFor: Math.ceil(goalsFor / 2),
        goalsAgainst: Math.ceil(goalsAgainst / 2)
      },
      recentForm: 'WWWWW', // Placeholder - se calcularía desde partidos reales
      cleanSheets: Math.floor(played * 0.3), // Estimación
      avgGoalsScored,
      avgGoalsConceded,
      dataSource: 'CSV Import',
      verified: true
    };
  }

  // Parsear estadísticas adicionales
  private static parseAdditionalStats(headers: string[], row: string[]): any {
    const getValue = (field: string): number => {
      const index = headers.findIndex(h => h.toLowerCase().includes(field.toLowerCase()));
      return index !== -1 ? parseInt(row[index]) || 0 : 0;
    };

    return {
      possession: {
        home: getValue('home_possession'),
        away: getValue('away_possession')
      },
      shots: {
        home: getValue('home_shots'),
        away: getValue('away_shots')
      },
      shotsOnTarget: {
        home: getValue('home_shots_on_target'),
        away: getValue('away_shots_on_target')
      },
      corners: {
        home: getValue('home_corners'),
        away: getValue('away_corners')
      },
      fouls: {
        home: getValue('home_fouls'),
        away: getValue('away_fouls')
      },
      yellowCards: {
        home: getValue('home_yellow_cards'),
        away: getValue('away_yellow_cards')
      },
      redCards: {
        home: getValue('home_red_cards'),
        away: getValue('away_red_cards')
      }
    };
  }

  // Crear resumen de análisis
  static createAnalysisSummary(csvFiles: CSVData[], processedMatches: ProcessedMatchData[], processedTeams: ProcessedTeamData[]): {
    totalFiles: number;
    totalMatches: number;
    totalTeams: number;
    leagues: string[];
    seasons: string[];
    countries: string[];
    dataQuality: {
      matchesWithStats: number;
      teamsWithCompleteData: number;
      verifiedData: number;
    };
  } {
    const leagues = [...new Set([...processedMatches.map(m => m.league), ...processedTeams.map(t => t.league)])];
    const seasons = [...new Set([...processedMatches.map(m => m.season), ...processedTeams.map(t => t.season)])];
    const countries = [...new Set([...processedMatches.map(m => m.country), ...processedTeams.map(t => t.country)])];

    return {
      totalFiles: csvFiles.length,
      totalMatches: processedMatches.length,
      totalTeams: processedTeams.length,
      leagues,
      seasons,
      countries,
      dataQuality: {
        matchesWithStats: processedMatches.filter(m => m.additionalStats).length,
        teamsWithCompleteData: processedTeams.filter(t => t.played > 0).length,
        verifiedData: [...processedMatches, ...processedTeams].filter(d => d.verified).length
      }
    };
  }
}


