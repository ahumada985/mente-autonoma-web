// Procesador de Lotes de CSVs - "Gran Henki Dama de Goku"
// Sistema para procesar archivos CSV grandes en lotes para evitar stack overflow

import { PrismaClient } from '@prisma/client';

export interface BatchProcessingResult {
  totalFiles: number;
  processedFiles: number;
  totalMatches: number;
  totalTeams: number;
  totalLeagues: number;
  totalSeasons: number;
  errors: string[];
  processingTime: number;
  coverage: {
    leagues: { [key: string]: number };
    seasons: { [key: string]: number };
    countries: { [key: string]: number };
  };
}

export interface CSVFileInfo {
  path: string;
  filename: string;
  size: number;
  estimatedRows: number;
  league?: string;
  country?: string;
  season?: string;
  format?: 'matches' | 'teams' | 'players' | 'events';
}

export class BatchCSVProcessor {
  private prisma: PrismaClient;
  private batchSize: number;
  private maxMemoryUsage: number;

  constructor(batchSize: number = 1000, maxMemoryUsage: number = 100 * 1024 * 1024) {
    this.prisma = new PrismaClient();
    this.batchSize = batchSize;
    this.maxMemoryUsage = maxMemoryUsage;
  }

  // Procesar todos los archivos CSV en lotes
  async processAllCSVFiles(csvDirectory: string): Promise<BatchProcessingResult> {
    const startTime = Date.now();
    const result: BatchProcessingResult = {
      totalFiles: 0,
      processedFiles: 0,
      totalMatches: 0,
      totalTeams: 0,
      totalLeagues: 0,
      totalSeasons: 0,
      errors: [],
      processingTime: 0,
      coverage: {
        leagues: {},
        seasons: {},
        countries: {}
      }
    };

    try {
      console.log('🔥 Iniciando procesamiento por lotes de CSVs históricos...');
      
      // Escanear archivos CSV
      const csvFiles = await this.scanCSVFiles(csvDirectory);
      result.totalFiles = csvFiles.length;
      
      console.log(`📁 Encontrados ${csvFiles.length} archivos CSV para procesar`);

      // Procesar archivos en lotes
      for (let i = 0; i < csvFiles.length; i += this.batchSize) {
        const batch = csvFiles.slice(i, i + this.batchSize);
        console.log(`🔄 Procesando lote ${Math.floor(i / this.batchSize) + 1}/${Math.ceil(csvFiles.length / this.batchSize)}`);
        
        const batchResult = await this.processBatch(batch);
        
        result.processedFiles += batchResult.processedFiles;
        result.totalMatches += batchResult.totalMatches;
        result.totalTeams += batchResult.totalTeams;
        result.totalLeagues += batchResult.totalLeagues;
        result.totalSeasons += batchResult.totalSeasons;
        result.errors.push(...batchResult.errors);
        
        // Actualizar cobertura
        Object.entries(batchResult.coverage.leagues).forEach(([league, count]) => {
          result.coverage.leagues[league] = (result.coverage.leagues[league] || 0) + count;
        });
        Object.entries(batchResult.coverage.seasons).forEach(([season, count]) => {
          result.coverage.seasons[season] = (result.coverage.seasons[season] || 0) + count;
        });
        Object.entries(batchResult.coverage.countries).forEach(([country, count]) => {
          result.coverage.countries[country] = (result.coverage.countries[country] || 0) + count;
        });

        // Verificar uso de memoria
        if (this.getMemoryUsage() > this.maxMemoryUsage) {
          console.log('⚠️ Límite de memoria alcanzado, liberando memoria...');
          await this.cleanupMemory();
        }
      }

      result.processingTime = Date.now() - startTime;
      
      console.log('✅ Procesamiento por lotes completado!');
      console.log(`📊 Resumen:`);
      console.log(`   📁 Archivos procesados: ${result.processedFiles}/${result.totalFiles}`);
      console.log(`   ⚽ Partidos: ${result.totalMatches.toLocaleString()}`);
      console.log(`   👥 Equipos: ${result.totalTeams.toLocaleString()}`);
      console.log(`   🏆 Ligas: ${result.totalLeagues}`);
      console.log(`   📅 Temporadas: ${result.totalSeasons}`);
      console.log(`   ⏱️ Tiempo: ${(result.processingTime / 1000).toFixed(2)}s`);

      return result;

    } catch (error) {
      console.error('Error en procesamiento por lotes:', error);
      result.errors.push(`Error general: ${error}`);
      result.processingTime = Date.now() - startTime;
      return result;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  // Procesar un lote de archivos
  private async processBatch(files: CSVFileInfo[]): Promise<BatchProcessingResult> {
    const result: BatchProcessingResult = {
      totalFiles: files.length,
      processedFiles: 0,
      totalMatches: 0,
      totalTeams: 0,
      totalLeagues: 0,
      totalSeasons: 0,
      errors: [],
      processingTime: 0,
      coverage: {
        leagues: {},
        seasons: {},
        countries: {}
      }
    };

    for (const file of files) {
      try {
        const fileResult = await this.processSingleFile(file);
        
        result.processedFiles++;
        result.totalMatches += fileResult.matches;
        result.totalTeams += fileResult.teams;
        result.totalLeagues += fileResult.leagues;
        result.totalSeasons += fileResult.seasons;
        
        // Actualizar cobertura
        if (fileResult.league) {
          result.coverage.leagues[fileResult.league] = (result.coverage.leagues[fileResult.league] || 0) + 1;
        }
        if (fileResult.season) {
          result.coverage.seasons[fileResult.season] = (result.coverage.seasons[fileResult.season] || 0) + 1;
        }
        if (fileResult.country) {
          result.coverage.countries[fileResult.country] = (result.coverage.countries[fileResult.country] || 0) + 1;
        }

      } catch (error) {
        console.error(`Error procesando ${file.filename}:`, error);
        result.errors.push(`${file.filename}: ${error}`);
      }
    }

    return result;
  }

  // Procesar un archivo individual
  private async processSingleFile(file: CSVFileInfo): Promise<{
    matches: number;
    teams: number;
    leagues: number;
    seasons: number;
    league?: string;
    season?: string;
    country?: string;
  }> {
    const fs = require('fs');
    const path = require('path');
    
    try {
      const content = fs.readFileSync(file.path, 'utf-8');
      const lines = content.split('\n').filter(line => line.trim() !== '');
      
      if (lines.length < 2) {
        return { matches: 0, teams: 0, leagues: 0, seasons: 0 };
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
      const dataRows = lines.slice(1);
      
      // Detectar formato
      const format = this.detectFormat(headers);
      
      // Extraer información de liga
      const leagueInfo = this.extractLeagueInfo(file.path);
      
      // Procesar datos según formato
      let matches = 0;
      let teams = 0;
      
      if (format === 'matches') {
        matches = await this.processMatchesData(dataRows, headers, leagueInfo);
      } else if (format === 'teams') {
        teams = await this.processTeamsData(dataRows, headers, leagueInfo);
      }

      return {
        matches,
        teams,
        leagues: leagueInfo.league ? 1 : 0,
        seasons: leagueInfo.season ? 1 : 0,
        league: leagueInfo.league,
        season: leagueInfo.season,
        country: leagueInfo.country
      };

    } catch (error) {
      console.error(`Error procesando archivo ${file.filename}:`, error);
      return { matches: 0, teams: 0, leagues: 0, seasons: 0 };
    }
  }

  // Detectar formato del archivo
  private detectFormat(headers: string[]): 'matches' | 'teams' | 'players' | 'events' | 'unknown' {
    const headerStr = headers.join(' ').toLowerCase();
    
    if ((headerStr.includes('home') && headerStr.includes('away') && 
         (headerStr.includes('score') || headerStr.includes('goals'))) ||
        (headerStr.includes('home_team') && headerStr.includes('away_team'))) {
      return 'matches';
    } else if ((headerStr.includes('position') && headerStr.includes('points') && 
                headerStr.includes('played')) ||
               (headerStr.includes('team') && (headerStr.includes('w') || headerStr.includes('wins')))) {
      return 'teams';
    } else if (headerStr.includes('player') && headerStr.includes('goals')) {
      return 'players';
    } else if (headerStr.includes('event') && headerStr.includes('minute')) {
      return 'events';
    }
    
    return 'unknown';
  }

  // Extraer información de liga
  private extractLeagueInfo(filePath: string): {
    league?: string;
    country?: string;
    season?: string;
  } {
    const pathLower = filePath.toLowerCase();
    const filenameUpper = require('path').basename(filePath).toUpperCase();
    
    // Mapeo de códigos de liga
    const leagueMappings: { [key: string]: { league: string; country: string } } = {
      'E0': { league: 'Premier League', country: 'Inglaterra' },
      'E1': { league: 'Championship', country: 'Inglaterra' },
      'SP1': { league: 'La Liga', country: 'España' },
      'SP2': { league: 'La Liga 2', country: 'España' },
      'D1': { league: 'Bundesliga', country: 'Alemania' },
      'D2': { league: 'Bundesliga 2', country: 'Alemania' },
      'I1': { league: 'Serie A', country: 'Italia' },
      'I2': { league: 'Serie B', country: 'Italia' },
      'F1': { league: 'Ligue 1', country: 'Francia' },
      'F2': { league: 'Ligue 2', country: 'Francia' },
      'SC0': { league: 'Scottish Premiership', country: 'Escocia' },
      'G1': { league: 'Super League Greece', country: 'Grecia' },
      'T1': { league: 'Süper Lig', country: 'Turquía' },
      'B1': { league: 'Jupiler Pro League', country: 'Bélgica' },
      'AUT': { league: 'Austrian Bundesliga', country: 'Austria' },
      'DNK': { league: 'Danish Superliga', country: 'Dinamarca' },
      'SWE': { league: 'Allsvenskan', country: 'Suecia' },
      'SWZ': { league: 'Swiss Super League', country: 'Suiza' },
      'BRA': { league: 'Brasileirão Série A', country: 'Brasil' },
      'ARG': { league: 'Liga Profesional', country: 'Argentina' },
      'CHN': { league: 'Chinese Super League', country: 'China' },
      'JPN': { league: 'J.League', country: 'Japón' },
      'MEX': { league: 'Liga MX', country: 'México' },
      'USA': { league: 'MLS', country: 'Estados Unidos' }
    };

    // Buscar en el nombre del archivo
    for (const [code, info] of Object.entries(leagueMappings)) {
      if (filenameUpper.includes(code)) {
        return {
          league: info.league,
          country: info.country,
          season: this.extractSeasonFromPath(filePath)
        };
      }
    }

    // Buscar en la ruta
    if (pathLower.includes('premier')) return { league: 'Premier League', country: 'Inglaterra', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('laliga') || pathLower.includes('la_liga')) return { league: 'La Liga', country: 'España', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('bundesliga')) return { league: 'Bundesliga', country: 'Alemania', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('seria') || pathLower.includes('serie')) return { league: 'Serie A', country: 'Italia', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('francia') || pathLower.includes('ligue')) return { league: 'Ligue 1', country: 'Francia', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('escocia')) return { league: 'Scottish Premiership', country: 'Escocia', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('grecia')) return { league: 'Super League Greece', country: 'Grecia', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('turquia')) return { league: 'Süper Lig', country: 'Turquía', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('belgica')) return { league: 'Jupiler Pro League', country: 'Bélgica', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('austria')) return { league: 'Austrian Bundesliga', country: 'Austria', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('dinamarca')) return { league: 'Danish Superliga', country: 'Dinamarca', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('suecia')) return { league: 'Allsvenskan', country: 'Suecia', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('suiza')) return { league: 'Swiss Super League', country: 'Suiza', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('brasil')) return { league: 'Brasileirão Série A', country: 'Brasil', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('argentina')) return { league: 'Liga Profesional', country: 'Argentina', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('china')) return { league: 'Chinese Super League', country: 'China', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('japon')) return { league: 'J.League', country: 'Japón', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('mexico')) return { league: 'Liga MX', country: 'México', season: this.extractSeasonFromPath(filePath) };
    if (pathLower.includes('usa')) return { league: 'MLS', country: 'Estados Unidos', season: this.extractSeasonFromPath(filePath) };

    return {};
  }

  // Extraer temporada desde la ruta
  private extractSeasonFromPath(filePath: string): string | undefined {
    const match = filePath.match(/(\d{4})/);
    if (match) {
      const year = parseInt(match[1]);
      if (year >= 2020 && year <= 2025) {
        return `${year}-${(year + 1).toString().slice(-2)}`;
      }
    }
    return undefined;
  }

  // Procesar datos de partidos
  private async processMatchesData(dataRows: string[], headers: string[], leagueInfo: any): Promise<number> {
    let processedCount = 0;
    const batchSize = 100; // Procesar en lotes pequeños
    
    for (let i = 0; i < dataRows.length; i += batchSize) {
      const batch = dataRows.slice(i, i + batchSize);
      const matches = [];
      
      for (const row of batch) {
        if (row.length < 4) continue;
        
        try {
          const match = this.parseMatchRow(row, headers, leagueInfo);
          if (match) {
            matches.push(match);
          }
        } catch (error) {
          // Ignorar filas con errores
        }
      }
      
      if (matches.length > 0) {
        // Aquí insertarías en la base de datos
        // await this.insertMatches(matches);
        processedCount += matches.length;
      }
    }
    
    return processedCount;
  }

  // Procesar datos de equipos
  private async processTeamsData(dataRows: string[], headers: string[], leagueInfo: any): Promise<number> {
    let processedCount = 0;
    const batchSize = 50; // Procesar en lotes pequeños
    
    for (let i = 0; i < dataRows.length; i += batchSize) {
      const batch = dataRows.slice(i, i + batchSize);
      const teams = [];
      
      for (const row of batch) {
        if (row.length < 6) continue;
        
        try {
          const team = this.parseTeamRow(row, headers, leagueInfo);
          if (team) {
            teams.push(team);
          }
        } catch (error) {
          // Ignorar filas con errores
        }
      }
      
      if (teams.length > 0) {
        // Aquí insertarías en la base de datos
        // await this.insertTeams(teams);
        processedCount += teams.length;
      }
    }
    
    return processedCount;
  }

  // Parsear fila de partido
  private parseMatchRow(row: string, headers: string[], leagueInfo: any): any | null {
    const values = row.split(',');
    if (values.length < 4) return null;
    
    const homeTeam = this.getValueByHeader(values, headers, ['home_team', 'home', 'local']);
    const awayTeam = this.getValueByHeader(values, headers, ['away_team', 'away', 'visitante']);
    
    if (!homeTeam || !awayTeam) return null;
    
    return {
      date: this.getValueByHeader(values, headers, ['date', 'fecha']),
      homeTeam,
      awayTeam,
      homeScore: parseInt(this.getValueByHeader(values, headers, ['home_score', 'home_goals', 'goles_local']) || '0'),
      awayScore: parseInt(this.getValueByHeader(values, headers, ['away_score', 'away_goals', 'goles_visitante']) || '0'),
      league: leagueInfo.league,
      country: leagueInfo.country,
      season: leagueInfo.season
    };
  }

  // Parsear fila de equipo
  private parseTeamRow(row: string, headers: string[], leagueInfo: any): any | null {
    const values = row.split(',');
    if (values.length < 6) return null;
    
    const name = this.getValueByHeader(values, headers, ['team', 'name', 'equipo']);
    if (!name) return null;
    
    return {
      name,
      position: parseInt(this.getValueByHeader(values, headers, ['position', 'pos', 'posicion']) || '0'),
      points: parseInt(this.getValueByHeader(values, headers, ['points', 'pts', 'puntos']) || '0'),
      played: parseInt(this.getValueByHeader(values, headers, ['played', 'p', 'pj', 'partidos']) || '0'),
      wins: parseInt(this.getValueByHeader(values, headers, ['wins', 'w', 'g', 'ganados']) || '0'),
      draws: parseInt(this.getValueByHeader(values, headers, ['draws', 'd', 'e', 'empates']) || '0'),
      losses: parseInt(this.getValueByHeader(values, headers, ['losses', 'l', 'p', 'perdidos']) || '0'),
      goalsFor: parseInt(this.getValueByHeader(values, headers, ['goals_for', 'gf', 'goles_favor']) || '0'),
      goalsAgainst: parseInt(this.getValueByHeader(values, headers, ['goals_against', 'ga', 'goles_contra']) || '0'),
      league: leagueInfo.league,
      country: leagueInfo.country,
      season: leagueInfo.season
    };
  }

  // Obtener valor por header
  private getValueByHeader(values: string[], headers: string[], possibleHeaders: string[]): string {
    for (const header of possibleHeaders) {
      const index = headers.findIndex(h => h.toLowerCase().includes(header.toLowerCase()));
      if (index !== -1 && values[index]) {
        return values[index].trim();
      }
    }
    return '';
  }

  // Escanear archivos CSV
  private async scanCSVFiles(directory: string): Promise<CSVFileInfo[]> {
    const fs = require('fs');
    const path = require('path');
    const csvFiles: CSVFileInfo[] = [];
    
    function scan(currentDir: string) {
      try {
        const items = fs.readdirSync(currentDir);
        
        for (const item of items) {
          const fullPath = path.join(currentDir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scan(fullPath);
          } else if (item.endsWith('.csv')) {
            csvFiles.push({
              path: fullPath,
              filename: item,
              size: stat.size,
              estimatedRows: Math.floor(stat.size / 100) // Estimación aproximada
            });
          }
        }
      } catch (error) {
        console.warn(`Error escaneando directorio ${currentDir}:`, error);
      }
    }

    scan(directory);
    return csvFiles;
  }

  // Obtener uso de memoria
  private getMemoryUsage(): number {
    const used = process.memoryUsage();
    return used.heapUsed;
  }

  // Limpiar memoria
  private async cleanupMemory(): Promise<void> {
    if (global.gc) {
      global.gc();
    }
  }
}

