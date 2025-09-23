// Analizador Mejorado de CSVs Históricos - "Gran Henki Dama de Goku" v2.0
// Sistema mejorado para extraer fechas, temporadas y datos de equipos correctamente

const fs = require('fs');
const path = require('path');

// Configuración mejorada
const BASE_PATH = 'Resultados historicos';
const OUTPUT_FILE = 'enhanced-historical-analysis.json';

// Mapeo mejorado de archivos a ligas
const LEAGUE_MAPPING = {
  'E0': { name: 'Premier League', country: 'Inglaterra', tier: 1 },
  'E1': { name: 'Championship', country: 'Inglaterra', tier: 2 },
  'SP1': { name: 'La Liga', country: 'España', tier: 1 },
  'SP2': { name: 'La Liga 2', country: 'España', tier: 2 },
  'D1': { name: 'Bundesliga', country: 'Alemania', tier: 1 },
  'D2': { name: 'Bundesliga 2', country: 'Alemania', tier: 2 },
  'I1': { name: 'Serie A', country: 'Italia', tier: 1 },
  'I2': { name: 'Serie B', country: 'Italia', tier: 2 },
  'F1': { name: 'Ligue 1', country: 'Francia', tier: 1 },
  'F2': { name: 'Ligue 2', country: 'Francia', tier: 2 },
  'SC0': { name: 'Scottish Premiership', country: 'Escocia', tier: 1 },
  'G1': { name: 'Super League Greece', country: 'Grecia', tier: 1 },
  'T1': { name: 'Süper Lig', country: 'Turquía', tier: 1 },
  'B1': { name: 'Jupiler Pro League', country: 'Bélgica', tier: 1 },
  'AUT': { name: 'Austrian Bundesliga', country: 'Austria', tier: 1 },
  'DNK': { name: 'Danish Superliga', country: 'Dinamarca', tier: 1 },
  'SWE': { name: 'Allsvenskan', country: 'Suecia', tier: 1 },
  'SWZ': { name: 'Swiss Super League', country: 'Suiza', tier: 1 },
  'BRA': { name: 'Brasileirão Série A', country: 'Brasil', tier: 1 },
  'ARG': { name: 'Liga Profesional', country: 'Argentina', tier: 1 },
  'CHN': { name: 'Chinese Super League', country: 'China', tier: 1 },
  'JPN': { name: 'J.League', country: 'Japón', tier: 1 },
  'MEX': { name: 'Liga MX', country: 'México', tier: 1 },
  'USA': { name: 'MLS', country: 'Estados Unidos', tier: 1 }
};

// Función mejorada para analizar un archivo CSV
function analyzeCSVFileEnhanced(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
      return null;
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows = lines.slice(1);
    
    // Detectar formato mejorado
    const headerStr = headers.join(' ').toLowerCase();
    let format = 'unknown';
    
    // Detectar partidos
    if ((headerStr.includes('home') && headerStr.includes('away') && 
         (headerStr.includes('score') || headerStr.includes('goals'))) ||
        (headerStr.includes('home_team') && headerStr.includes('away_team'))) {
      format = 'matches';
    }
    // Detectar equipos/tablas
    else if ((headerStr.includes('position') && headerStr.includes('points') && 
              headerStr.includes('played')) ||
             (headerStr.includes('team') && (headerStr.includes('w') || headerStr.includes('wins')))) {
      format = 'teams';
    }
    // Detectar jugadores
    else if (headerStr.includes('player') && headerStr.includes('goals')) {
      format = 'players';
    }
    // Detectar eventos
    else if (headerStr.includes('event') && headerStr.includes('minute')) {
      format = 'events';
    }

    // Extraer información de la liga
    const leagueInfo = extractLeagueInfoEnhanced(filePath, headers, dataRows);
    
    // Extraer temporadas de los datos
    const seasons = extractSeasonsFromData(dataRows, headers);
    
    // Procesar datos específicos según formato
    let processedData = null;
    if (format === 'matches') {
      processedData = processMatchesData(dataRows, headers, leagueInfo);
    } else if (format === 'teams') {
      processedData = processTeamsData(dataRows, headers, leagueInfo);
    }

    return {
      filePath,
      filename: path.basename(filePath),
      format,
      headers,
      totalRows: dataRows.length,
      league: leagueInfo.league,
      country: leagueInfo.country,
      tier: leagueInfo.tier,
      seasons: seasons,
      dataQuality: dataRows.length > 100 ? 'good' : 'fair',
      processedData: processedData
    };

  } catch (error) {
    console.error(`Error analizando ${filePath}:`, error.message);
    return null;
  }
}

// Extraer información de liga mejorada
function extractLeagueInfoEnhanced(filePath, headers, dataRows) {
  const pathLower = filePath.toLowerCase();
  const filenameUpper = path.basename(filePath).toUpperCase();
  
  // Buscar en el nombre del archivo
  for (const [code, info] of Object.entries(LEAGUE_MAPPING)) {
    if (filenameUpper.includes(code)) {
      return {
        league: info.name,
        country: info.country,
        tier: info.tier,
        season: extractSeasonFromPath(filePath)
      };
    }
  }

  // Buscar en la ruta
  if (pathLower.includes('premier')) return { league: 'Premier League', country: 'Inglaterra', tier: 1, season: null };
  if (pathLower.includes('laliga') || pathLower.includes('la_liga')) return { league: 'La Liga', country: 'España', tier: 1, season: null };
  if (pathLower.includes('bundesliga')) return { league: 'Bundesliga', country: 'Alemania', tier: 1, season: null };
  if (pathLower.includes('seria') || pathLower.includes('serie')) return { league: 'Serie A', country: 'Italia', tier: 1, season: null };
  if (pathLower.includes('francia') || pathLower.includes('ligue')) return { league: 'Ligue 1', country: 'Francia', tier: 1, season: null };
  if (pathLower.includes('escocia')) return { league: 'Scottish Premiership', country: 'Escocia', tier: 1, season: null };
  if (pathLower.includes('grecia')) return { league: 'Super League Greece', country: 'Grecia', tier: 1, season: null };
  if (pathLower.includes('turquia')) return { league: 'Süper Lig', country: 'Turquía', tier: 1, season: null };
  if (pathLower.includes('belgica')) return { league: 'Jupiler Pro League', country: 'Bélgica', tier: 1, season: null };
  if (pathLower.includes('austria')) return { league: 'Austrian Bundesliga', country: 'Austria', tier: 1, season: null };
  if (pathLower.includes('dinamarca')) return { league: 'Danish Superliga', country: 'Dinamarca', tier: 1, season: null };
  if (pathLower.includes('suecia')) return { league: 'Allsvenskan', country: 'Suecia', tier: 1, season: null };
  if (pathLower.includes('suiza')) return { league: 'Swiss Super League', country: 'Suiza', tier: 1, season: null };
  if (pathLower.includes('brasil')) return { league: 'Brasileirão Série A', country: 'Brasil', tier: 1, season: null };
  if (pathLower.includes('argentina')) return { league: 'Liga Profesional', country: 'Argentina', tier: 1, season: null };
  if (pathLower.includes('china')) return { league: 'Chinese Super League', country: 'China', tier: 1, season: null };
  if (pathLower.includes('japon')) return { league: 'J.League', country: 'Japón', tier: 1, season: null };
  if (pathLower.includes('mexico')) return { league: 'Liga MX', country: 'México', tier: 1, season: null };
  if (pathLower.includes('usa')) return { league: 'MLS', country: 'Estados Unidos', tier: 1, season: null };

  return { league: 'Unknown', country: 'Unknown', tier: 1, season: null };
}

// Extraer temporadas de los datos reales
function extractSeasonsFromData(dataRows, headers) {
  const seasons = new Set();
  
  // Buscar columna de fecha
  const dateColumnIndex = headers.findIndex(h => 
    h.toLowerCase().includes('date') || h.toLowerCase().includes('fecha')
  );
  
  if (dateColumnIndex !== -1) {
    dataRows.forEach(row => {
      if (row[dateColumnIndex]) {
        const dateStr = row[dateColumnIndex].trim();
        const year = extractYearFromDate(dateStr);
        if (year && year >= 2020 && year <= 2025) {
          seasons.add(`${year}-${(year + 1).toString().slice(-2)}`);
        }
      }
    });
  }
  
  return Array.from(seasons);
}

// Extraer año de una fecha
function extractYearFromDate(dateStr) {
  // Buscar patrón YYYY
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    return parseInt(yearMatch[1]);
  }
  return null;
}

// Procesar datos de partidos (optimizado para archivos grandes)
function processMatchesData(dataRows, headers, leagueInfo) {
  const matches = [];
  const maxMatches = 1000; // Límite para evitar stack overflow
  
  for (let i = 0; i < Math.min(dataRows.length, maxMatches); i++) {
    const row = dataRows[i];
    if (row.length < 4) continue;
    
    try {
      const match = {
        id: `${leagueInfo.league}-${i}-${Date.now()}`,
        date: getValueByHeader(row, headers, ['date', 'fecha']),
        homeTeam: getValueByHeader(row, headers, ['home_team', 'home', 'local']),
        awayTeam: getValueByHeader(row, headers, ['away_team', 'away', 'visitante']),
        homeScore: parseInt(getValueByHeader(row, headers, ['home_score', 'home_goals', 'goles_local']) || '0'),
        awayScore: parseInt(getValueByHeader(row, headers, ['away_score', 'away_goals', 'goles_visitante']) || '0'),
        league: leagueInfo.league,
        country: leagueInfo.country,
        season: extractSeasonFromDate(getValueByHeader(row, headers, ['date', 'fecha'])),
        venue: getValueByHeader(row, headers, ['venue', 'stadium', 'estadio']),
        referee: getValueByHeader(row, headers, ['referee', 'arbitro'])
      };
      
      if (match.homeTeam && match.awayTeam) {
        matches.push(match);
      }
    } catch (error) {
      // Ignorar filas con errores
    }
  }
  
  return matches;
}

// Procesar datos de equipos
function processTeamsData(dataRows, headers, leagueInfo) {
  const teams = [];
  
  dataRows.forEach((row, index) => {
    if (row.length < 6) return;
    
    try {
      const team = {
        id: `${leagueInfo.league}-${index}-${Date.now()}`,
        name: getValueByHeader(row, headers, ['team', 'name', 'equipo']),
        position: parseInt(getValueByHeader(row, headers, ['position', 'pos', 'posicion']) || '0'),
        points: parseInt(getValueByHeader(row, headers, ['points', 'pts', 'puntos']) || '0'),
        played: parseInt(getValueByHeader(row, headers, ['played', 'p', 'pj', 'partidos']) || '0'),
        wins: parseInt(getValueByHeader(row, headers, ['wins', 'w', 'g', 'ganados']) || '0'),
        draws: parseInt(getValueByHeader(row, headers, ['draws', 'd', 'e', 'empates']) || '0'),
        losses: parseInt(getValueByHeader(row, headers, ['losses', 'l', 'p', 'perdidos']) || '0'),
        goalsFor: parseInt(getValueByHeader(row, headers, ['goals_for', 'gf', 'goles_favor']) || '0'),
        goalsAgainst: parseInt(getValueByHeader(row, headers, ['goals_against', 'ga', 'goles_contra']) || '0'),
        league: leagueInfo.league,
        country: leagueInfo.country,
        season: leagueInfo.season
      };
      
      if (team.name) {
        teams.push(team);
      }
    } catch (error) {
      // Ignorar filas con errores
    }
  });
  
  return teams;
}

// Obtener valor por header
function getValueByHeader(row, headers, possibleHeaders) {
  for (const header of possibleHeaders) {
    const index = headers.findIndex(h => h.toLowerCase().includes(header.toLowerCase()));
    if (index !== -1 && row[index]) {
      return row[index].trim();
    }
  }
  return '';
}

// Extraer temporada de fecha
function extractSeasonFromDate(dateStr) {
  if (!dateStr) return null;
  const year = extractYearFromDate(dateStr);
  if (year && year >= 2020 && year <= 2025) {
    return `${year}-${(year + 1).toString().slice(-2)}`;
  }
  return null;
}

// Extraer temporada desde la ruta
function extractSeasonFromPath(filePath) {
  const match = filePath.match(/(\d{4})/);
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 2020 && year <= 2025) {
      return `${year}-${(year + 1).toString().slice(-2)}`;
    }
  }
  return null;
}

// Escanear directorio recursivamente
function scanDirectory(dir) {
  const csvFiles = [];
  
  function scan(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);
      
      for (const item of items) {
        const fullPath = path.join(currentDir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          scan(fullPath);
        } else if (item.endsWith('.csv')) {
          csvFiles.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`Error escaneando directorio ${currentDir}:`, error.message);
    }
  }

  scan(dir);
  return csvFiles;
}

// Función principal mejorada
function main() {
  console.log('🔥 Iniciando análisis mejorado de CSVs históricos...');
  console.log('📊 Versión 2.0 - Extracción mejorada de fechas y temporadas');

  const csvFiles = scanDirectory(BASE_PATH);
  console.log(`📁 Encontrados ${csvFiles.length} archivos CSV para procesar`);

  const results = {
    summary: {
      totalFiles: csvFiles.length,
      processedFiles: 0,
      totalLeagues: 0,
      totalCountries: 0,
      totalMatches: 0,
      totalTeams: 0,
      totalSeasons: 0,
      coverage2020_2025: 0
    },
    leagues: {},
    files: [],
    coverage: {},
    seasons2020_2025: new Set(),
    missingData: {
      leagues: [],
      seasons: [],
      countries: []
    },
    recommendations: []
  };

  // Procesar cada archivo CSV
  for (const filePath of csvFiles) {
    console.log(`🔄 Procesando: ${filePath}`);
    const analysis = analyzeCSVFileEnhanced(filePath);
    
    if (analysis) {
      results.files.push(analysis);
      results.summary.processedFiles++;

      // Agregar a estadísticas de liga
      const leagueKey = `${analysis.league}-${analysis.country}`;
      if (!results.leagues[leagueKey]) {
        results.leagues[leagueKey] = {
          league: analysis.league,
          country: analysis.country,
          tier: analysis.tier,
          files: 0,
          totalRows: 0,
          seasons: new Set(),
          formats: new Set(),
          matches: [],
          teams: []
        };
      }

      results.leagues[leagueKey].files++;
      results.leagues[leagueKey].totalRows += analysis.totalRows;
      
      // Agregar temporadas
      analysis.seasons.forEach(season => {
        results.leagues[leagueKey].seasons.add(season);
        results.seasons2020_2025.add(season);
      });
      
      results.leagues[leagueKey].formats.add(analysis.format);

      // Agregar datos procesados (con límite para evitar stack overflow)
      if (analysis.processedData && analysis.processedData.length > 0) {
        if (analysis.format === 'matches') {
          // Limitar a 1000 partidos por archivo para evitar stack overflow
          const limitedMatches = analysis.processedData.slice(0, 1000);
          results.leagues[leagueKey].matches.push(...limitedMatches);
          results.summary.totalMatches += limitedMatches.length;
        } else if (analysis.format === 'teams') {
          // Limitar a 100 equipos por archivo
          const limitedTeams = analysis.processedData.slice(0, 100);
          results.leagues[leagueKey].teams.push(...limitedTeams);
          results.summary.totalTeams += limitedTeams.length;
        }
      }
    }
  }

  // Calcular estadísticas finales
  results.summary.totalLeagues = Object.keys(results.leagues).length;
  results.summary.totalCountries = new Set(Object.values(results.leagues).map(l => l.country)).size;
  results.summary.totalSeasons = results.seasons2020_2025.size;

  // Calcular cobertura 2020-2025
  const expectedSeasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
  const coveredSeasons = expectedSeasons.filter(season => results.seasons2020_2025.has(season));
  results.summary.coverage2020_2025 = (coveredSeasons.length / expectedSeasons.length) * 100;

  // Calcular cobertura por liga
  for (const [key, league] of Object.entries(results.leagues)) {
    const leagueSeasons = Array.from(league.seasons);
    const coveredLeagueSeasons = expectedSeasons.filter(season => leagueSeasons.includes(season));
    
    results.coverage[key] = {
      ...league,
      seasons: leagueSeasons,
      formats: Array.from(league.formats),
      coveragePercentage: (coveredLeagueSeasons.length / expectedSeasons.length) * 100,
      missingSeasons: expectedSeasons.filter(season => !leagueSeasons.includes(season)),
      totalMatches: league.matches.length,
      totalTeams: league.teams.length
    };
  }

  // Generar recomendaciones
  results.recommendations.push(`Cobertura actual 2020-2025: ${results.summary.coverage2020_2025.toFixed(1)}%`);
  results.recommendations.push(`Temporadas cubiertas: ${coveredSeasons.join(', ')}`);
  results.recommendations.push(`Temporadas faltantes: ${expectedSeasons.filter(s => !coveredSeasons.includes(s)).join(', ')}`);
  results.recommendations.push('Integrar SofaScore.com para datos en tiempo real');
  results.recommendations.push('Implementar web scraping para datos faltantes');

  // Guardar reporte
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  console.log('\n✅ Análisis mejorado completado!');
  console.log(`📊 Resumen:`);
  console.log(`   📁 Archivos procesados: ${results.summary.processedFiles}/${results.summary.totalFiles}`);
  console.log(`   🏆 Ligas: ${results.summary.totalLeagues}`);
  console.log(`   🌍 Países: ${results.summary.totalCountries}`);
  console.log(`   ⚽ Partidos: ${results.summary.totalMatches.toLocaleString()}`);
  console.log(`   👥 Equipos: ${results.summary.totalTeams.toLocaleString()}`);
  console.log(`   📅 Temporadas 2020-2025: ${results.summary.totalSeasons}`);
  console.log(`   📈 Cobertura 2020-2025: ${results.summary.coverage2020_2025.toFixed(1)}%`);
  console.log(`   📄 Reporte guardado en: ${OUTPUT_FILE}`);

  return results;
}

// Ejecutar análisis
if (require.main === module) {
  main();
}

module.exports = { main, analyzeCSVFileEnhanced, extractSeasonsFromData };

