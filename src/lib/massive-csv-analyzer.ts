// Analizador Masivo de CSVs Históricos - "Gran Henki Dama de Goku"
// Sistema para procesar miles de archivos CSV y crear la base de datos más completa del mundo

import fs from 'fs';
import path from 'path';
import { CSVAnalyzer, ProcessedMatchData, ProcessedTeamData } from './csv-analyzer';

export interface HistoricalCoverage {
  league: string;
  country: string;
  tier: number;
  seasons: string[];
  totalMatches: number;
  totalTeams: number;
  coveragePercentage: number;
  missingSeasons: string[];
  dataQuality: 'excellent' | 'good' | 'fair' | 'poor';
  sources: string[];
}

export interface GlobalCoverageReport {
  totalLeagues: number;
  totalCountries: number;
  totalMatches: number;
  totalTeams: number;
  totalSeasons: number;
  overallCoverage: number;
  leagues: HistoricalCoverage[];
  missingData: {
    leagues: string[];
    seasons: string[];
    countries: string[];
  };
  recommendations: string[];
}

export class MassiveCSVAnalyzer {
  private basePath: string;
  private processedData: {
    matches: ProcessedMatchData[];
    teams: ProcessedTeamData[];
    coverage: HistoricalCoverage[];
  };

  constructor(basePath: string = 'Resultados historicos') {
    this.basePath = basePath;
    this.processedData = {
      matches: [],
      teams: [],
      coverage: []
    };
  }

  // Analizar todos los archivos CSV en la estructura de carpetas
  async analyzeAllCSVFiles(): Promise<GlobalCoverageReport> {
    console.log('🔥 Iniciando análisis masivo de CSVs históricos...');
    console.log('📁 Explorando estructura de carpetas...');

    const csvFiles = await this.discoverCSVFiles();
    console.log(`📊 Encontrados ${csvFiles.length} archivos CSV para procesar`);

    // Procesar cada archivo CSV
    for (const filePath of csvFiles) {
      try {
        console.log(`🔄 Procesando: ${filePath}`);
        await this.processCSVFile(filePath);
      } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error);
      }
    }

    // Generar reporte de cobertura
    const report = this.generateCoverageReport();
    console.log('✅ Análisis masivo completado');
    
    return report;
  }

  // Descubrir todos los archivos CSV en la estructura
  private async discoverCSVFiles(): Promise<string[]> {
    const csvFiles: string[] = [];
    
    const scanDirectory = (dir: string): void => {
      try {
        const items = fs.readdirSync(dir);
        
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            scanDirectory(fullPath);
          } else if (item.endsWith('.csv')) {
            csvFiles.push(fullPath);
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error escaneando directorio ${dir}:`, error);
      }
    };

    scanDirectory(this.basePath);
    return csvFiles;
  }

  // Procesar un archivo CSV individual
  private async processCSVFile(filePath: string): Promise<void> {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const filename = path.basename(filePath);
      const csvData = CSVAnalyzer.analyzeCSV(filename, content);

      // Procesar según el tipo detectado
      if (csvData.detectedFormat === 'matches') {
        const matches = CSVAnalyzer.processMatchesFromCSV(csvData);
        this.processedData.matches.push(...matches);
        console.log(`✅ Procesados ${matches.length} partidos de ${csvData.league}`);
      } else if (csvData.detectedFormat === 'teams') {
        const teams = CSVAnalyzer.processTeamsFromCSV(csvData);
        this.processedData.teams.push(...teams);
        console.log(`✅ Procesados ${teams.length} equipos de ${csvData.league}`);
      }

      // Actualizar cobertura
      this.updateCoverage(csvData, filePath);

    } catch (error) {
      console.error(`❌ Error procesando ${filePath}:`, error);
    }
  }

  // Actualizar información de cobertura
  private updateCoverage(csvData: any, filePath: string): void {
    const league = this.extractLeagueFromPath(filePath) || csvData.league || 'Unknown';
    const country = this.extractCountryFromPath(filePath) || csvData.country || 'Unknown';
    const tier = this.extractTierFromPath(filePath);
    const season = csvData.season || this.extractSeasonFromPath(filePath) || 'Unknown';

    let coverage = this.processedData.coverage.find(c => c.league === league);
    if (!coverage) {
      coverage = {
        league,
        country,
        tier,
        seasons: [],
        totalMatches: 0,
        totalTeams: 0,
        coveragePercentage: 0,
        missingSeasons: [],
        dataQuality: 'fair',
        sources: []
      };
      this.processedData.coverage.push(coverage);
    }

    if (!coverage.seasons.includes(season)) {
      coverage.seasons.push(season);
    }

    if (csvData.detectedFormat === 'matches') {
      coverage.totalMatches += csvData.totalRows;
    } else if (csvData.detectedFormat === 'teams') {
      coverage.totalTeams += csvData.totalRows;
    }

    coverage.sources.push(filePath);
  }

  // Extraer información de liga desde la ruta del archivo
  private extractLeagueFromPath(filePath: string): string | null {
    const pathLower = filePath.toLowerCase();
    
    // Mapeo de rutas a ligas
    const leagueMap: { [key: string]: string } = {
      'premier legague': 'Premier League',
      'e0': 'Premier League',
      'e1': 'Championship',
      'la liga': 'La Liga',
      'sp1': 'La Liga',
      'sp2': 'La Liga 2',
      'bundesliga': 'Bundesliga',
      'd1': 'Bundesliga',
      'd2': 'Bundesliga 2',
      'seria a': 'Serie A',
      'i1': 'Serie A',
      'i2': 'Serie B',
      'francia': 'Ligue 1',
      'f1': 'Ligue 1',
      'f2': 'Ligue 2',
      'escocia': 'Scottish Premiership',
      'sc0': 'Scottish Premiership',
      'grecia': 'Super League Greece',
      'g1': 'Super League Greece',
      'turquia': 'Süper Lig',
      't1': 'Süper Lig',
      'belgica': 'Jupiler Pro League',
      'b1': 'Jupiler Pro League',
      'austria': 'Austrian Bundesliga',
      'dinamarca': 'Danish Superliga',
      'suecia': 'Allsvenskan',
      'suiza': 'Swiss Super League',
      'brasil': 'Brasileirão Série A',
      'argentina': 'Liga Profesional',
      'china': 'Chinese Super League',
      'japon': 'J.League',
      'mexico': 'Liga MX',
      'usa': 'MLS'
    };

    for (const [key, league] of Object.entries(leagueMap)) {
      if (pathLower.includes(key)) {
        return league;
      }
    }

    return null;
  }

  // Extraer país desde la ruta del archivo
  private extractCountryFromPath(filePath: string): string | null {
    const pathLower = filePath.toLowerCase();
    
    const countryMap: { [key: string]: string } = {
      'premier legague': 'Inglaterra',
      'e0': 'Inglaterra',
      'e1': 'Inglaterra',
      'la liga': 'España',
      'sp1': 'España',
      'sp2': 'España',
      'bundesliga': 'Alemania',
      'd1': 'Alemania',
      'd2': 'Alemania',
      'seria a': 'Italia',
      'i1': 'Italia',
      'i2': 'Italia',
      'francia': 'Francia',
      'f1': 'Francia',
      'f2': 'Francia',
      'escocia': 'Escocia',
      'sc0': 'Escocia',
      'grecia': 'Grecia',
      'g1': 'Grecia',
      'turquia': 'Turquía',
      't1': 'Turquía',
      'belgica': 'Bélgica',
      'b1': 'Bélgica',
      'austria': 'Austria',
      'dinamarca': 'Dinamarca',
      'suecia': 'Suecia',
      'suiza': 'Suiza',
      'brasil': 'Brasil',
      'argentina': 'Argentina',
      'china': 'China',
      'japon': 'Japón',
      'mexico': 'México',
      'usa': 'Estados Unidos'
    };

    for (const [key, country] of Object.entries(countryMap)) {
      if (pathLower.includes(key)) {
        return country;
      }
    }

    return null;
  }

  // Extraer división desde la ruta del archivo
  private extractTierFromPath(filePath: string): number {
    const pathLower = filePath.toLowerCase();
    
    if (pathLower.includes('2') || pathLower.includes('ii') || pathLower.includes('segunda')) {
      return 2;
    }
    
    return 1;
  }

  // Extraer temporada desde la ruta del archivo
  private extractSeasonFromPath(filePath: string): string | null {
    const match = filePath.match(/(\d{4})/);
    if (match) {
      const year = parseInt(match[1]);
      if (year >= 2000 && year <= 2025) {
        return `${year}-${(year + 1).toString().slice(-2)}`;
      }
    }
    return null;
  }

  // Generar reporte completo de cobertura
  private generateCoverageReport(): GlobalCoverageReport {
    console.log('📊 Generando reporte de cobertura global...');

    // Calcular estadísticas generales
    const totalLeagues = this.processedData.coverage.length;
    const totalCountries = new Set(this.processedData.coverage.map(c => c.country)).size;
    const totalMatches = this.processedData.matches.length;
    const totalTeams = this.processedData.teams.length;
    const totalSeasons = new Set(this.processedData.matches.map(m => m.season)).size;

    // Calcular cobertura por liga
    this.processedData.coverage.forEach(coverage => {
      const expectedSeasons = this.getExpectedSeasons(2020, 2025);
      const coveredSeasons = coverage.seasons.filter(s => 
        expectedSeasons.some(exp => s.includes(exp.slice(0, 4)))
      );
      
      coverage.coveragePercentage = (coveredSeasons.length / expectedSeasons.length) * 100;
      coverage.missingSeasons = expectedSeasons.filter(exp => 
        !coverage.seasons.some(s => s.includes(exp.slice(0, 4)))
      );
      
      // Evaluar calidad de datos
      if (coverage.totalMatches > 1000 && coverage.coveragePercentage > 80) {
        coverage.dataQuality = 'excellent';
      } else if (coverage.totalMatches > 500 && coverage.coveragePercentage > 60) {
        coverage.dataQuality = 'good';
      } else if (coverage.totalMatches > 100 && coverage.coveragePercentage > 40) {
        coverage.dataQuality = 'fair';
      } else {
        coverage.dataQuality = 'poor';
      }
    });

    // Calcular cobertura general
    const overallCoverage = this.processedData.coverage.reduce((sum, c) => sum + c.coveragePercentage, 0) / totalLeagues;

    // Identificar datos faltantes
    const missingData = this.identifyMissingData();

    // Generar recomendaciones
    const recommendations = this.generateRecommendations();

    return {
      totalLeagues,
      totalCountries,
      totalMatches,
      totalTeams,
      totalSeasons,
      overallCoverage,
      leagues: this.processedData.coverage,
      missingData,
      recommendations
    };
  }

  // Obtener temporadas esperadas
  private getExpectedSeasons(startYear: number, endYear: number): string[] {
    const seasons: string[] = [];
    for (let year = startYear; year <= endYear; year++) {
      seasons.push(`${year}-${(year + 1).toString().slice(-2)}`);
    }
    return seasons;
  }

  // Identificar datos faltantes
  private identifyMissingData(): { leagues: string[]; seasons: string[]; countries: string[] } {
    const expectedLeagues = [
      'Premier League', 'Championship', 'La Liga', 'La Liga 2',
      'Bundesliga', 'Bundesliga 2', 'Serie A', 'Serie B',
      'Ligue 1', 'Ligue 2', 'Scottish Premiership', 'Super League Greece',
      'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga',
      'Danish Superliga', 'Allsvenskan', 'Swiss Super League',
      'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League',
      'J.League', 'Liga MX', 'MLS'
    ];

    const expectedCountries = [
      'Inglaterra', 'España', 'Alemania', 'Italia', 'Francia',
      'Escocia', 'Grecia', 'Turquía', 'Bélgica', 'Austria',
      'Dinamarca', 'Suecia', 'Suiza', 'Brasil', 'Argentina',
      'China', 'Japón', 'México', 'Estados Unidos'
    ];

    const coveredLeagues = this.processedData.coverage.map(c => c.league);
    const coveredCountries = this.processedData.coverage.map(c => c.country);

    return {
      leagues: expectedLeagues.filter(l => !coveredLeagues.includes(l)),
      seasons: this.getExpectedSeasons(2020, 2025).filter(s => 
        !this.processedData.matches.some(m => m.season === s)
      ),
      countries: expectedCountries.filter(c => !coveredCountries.includes(c))
    };
  }

  // Generar recomendaciones
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];

    // Analizar cobertura por liga
    const lowCoverageLeagues = this.processedData.coverage.filter(c => c.coveragePercentage < 50);
    if (lowCoverageLeagues.length > 0) {
      recommendations.push(`Priorizar completar datos de: ${lowCoverageLeagues.map(l => l.league).join(', ')}`);
    }

    // Analizar temporadas faltantes
    const missingSeasons = this.processedData.coverage
      .flatMap(c => c.missingSeasons)
      .filter((s, i, arr) => arr.indexOf(s) === i);
    
    if (missingSeasons.length > 0) {
      recommendations.push(`Completar temporadas faltantes: ${missingSeasons.slice(0, 5).join(', ')}${missingSeasons.length > 5 ? '...' : ''}`);
    }

    // Recomendaciones de fuentes
    recommendations.push('Utilizar APIs adicionales: API-Football, TheSportsDB, Football-Data.org');
    recommendations.push('Implementar web scraping para datos faltantes');
    recommendations.push('Integrar datos de Transfermarkt para estadísticas de equipos');
    recommendations.push('Agregar datos de Whoscored para estadísticas avanzadas');

    return recommendations;
  }

  // Obtener estadísticas detalladas por liga
  getLeagueStats(league: string): HistoricalCoverage | null {
    return this.processedData.coverage.find(c => c.league === league) || null;
  }

  // Obtener datos procesados
  getProcessedData() {
    return this.processedData;
  }
}


