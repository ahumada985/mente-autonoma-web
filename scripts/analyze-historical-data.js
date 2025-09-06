// Script para analizar todos los archivos CSV históricos
// "Gran Henki Dama de Goku" - Análisis masivo de datos históricos

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Inicializar Prisma
const prisma = new PrismaClient();

// Configuración
const BASE_PATH = 'Resultados historicos';
const OUTPUT_FILE = 'historical-analysis-report.json';

// Mapeo de archivos a ligas
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

// Función para buscar o crear equipo
async function findOrCreateTeam(name, league, country) {
  let team = await prisma.team.findFirst({
    where: { 
      name: name,
      league: league
    }
  });
  
  if (!team) {
    team = await prisma.team.create({
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

// Función para buscar o crear liga
async function findOrCreateLeague(leagueInfo) {
  let league = await prisma.league.findFirst({
    where: { name: leagueInfo.name }
  });
  
  if (!league) {
    league = await prisma.league.create({
      data: {
        name: leagueInfo.name,
        country: leagueInfo.country,
        tier: leagueInfo.tier,
        region: leagueInfo.country === 'Inglaterra' || leagueInfo.country === 'España' || 
                leagueInfo.country === 'Alemania' || leagueInfo.country === 'Italia' || 
                leagueInfo.country === 'Francia' ? 'Europa' : 
                leagueInfo.country === 'Brasil' || leagueInfo.country === 'Argentina' ? 'Sudamérica' : 'Otros'
      }
    });
  }
  
  return league;
}

// Función para analizar un archivo CSV y GUARDARLO
async function analyzeCSVFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
      return null; // Archivo vacío o sin datos
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows = lines.slice(1);
    
    // Detectar formato
    const headerStr = headers.join(' ').toLowerCase();
    let format = 'unknown';
    
    console.log(`🔍 Headers: ${headers.join(', ')}`);
    console.log(`🔍 Header string: ${headerStr}`);
    
    if ((headerStr.includes('home') && headerStr.includes('away')) || 
        (headerStr.includes('hometeam') && headerStr.includes('awayteam')) ||
        (headerStr.includes('fthg') && headerStr.includes('ftag'))) {
      format = 'matches';
      console.log(`✅ Formato detectado: MATCHES`);
    } else if (headerStr.includes('position') && headerStr.includes('points') && 
               headerStr.includes('played')) {
      format = 'teams';
      console.log(`✅ Formato detectado: TEAMS`);
    } else {
      console.log(`⚠️ Formato no detectado: ${format}`);
    }

    // Extraer información de la liga desde la ruta
    const filename = path.basename(filePath);
    const leagueInfo = extractLeagueInfo(filePath, filename);

    // GUARDAR DATOS REALES EN LA BASE DE DATOS
    let matches = 0;
    let teams = 0;
    const seasons = new Set();
    
    console.log(`🔥 INICIANDO GUARDADO DE DATOS...`);
    console.log(`📊 Formato: ${format}`);
    console.log(`📊 Filas de datos: ${dataRows.length}`);
    
    if (format === 'matches') {
      console.log(`✅ PROCESANDO ARCHIVO DE PARTIDOS...`);
      // Detectar columnas específicas
      const dateColumnIndex = headers.findIndex(h => 
        h.toLowerCase().includes('date') || h.toLowerCase().includes('fecha')
      );
      const homeTeamIndex = headers.findIndex(h => 
        h.toLowerCase().includes('hometeam') || h.toLowerCase().includes('home_team') || h.toLowerCase().includes('home') || h.toLowerCase().includes('local')
      );
      const awayTeamIndex = headers.findIndex(h => 
        h.toLowerCase().includes('awayteam') || h.toLowerCase().includes('away_team') || h.toLowerCase().includes('away') || h.toLowerCase().includes('visitante')
      );
      const homeScoreIndex = headers.findIndex(h => 
        h.toLowerCase().includes('fthg') || h.toLowerCase().includes('home_score') || h.toLowerCase().includes('home_goals') || h.toLowerCase().includes('goles_local')
      );
      const awayScoreIndex = headers.findIndex(h => 
        h.toLowerCase().includes('ftag') || h.toLowerCase().includes('away_score') || h.toLowerCase().includes('away_goals') || h.toLowerCase().includes('goles_visitante')
      );
      
      console.log(`🔍 Columnas detectadas:`);
      console.log(`   📅 Fecha: ${dateColumnIndex} (${headers[dateColumnIndex] || 'NO ENCONTRADA'})`);
      console.log(`   🏠 Equipo Local: ${homeTeamIndex} (${headers[homeTeamIndex] || 'NO ENCONTRADO'})`);
      console.log(`   🏃 Equipo Visitante: ${awayTeamIndex} (${headers[awayTeamIndex] || 'NO ENCONTRADO'})`);
      console.log(`   ⚽ Goles Local: ${homeScoreIndex} (${headers[homeScoreIndex] || 'NO ENCONTRADOS'})`);
      console.log(`   ⚽ Goles Visitante: ${awayScoreIndex} (${headers[awayScoreIndex] || 'NO ENCONTRADOS'})`);
      
      if (dateColumnIndex !== -1 && homeTeamIndex !== -1 && awayTeamIndex !== -1) {
        console.log(`✅ COLUMNAS VÁLIDAS ENCONTRADAS - PROCESANDO...`);
        console.log(`📊 Procesando ${dataRows.length} filas de partidos...`);
        
        // Crear o buscar liga
        const leagueRecord = await findOrCreateLeague(leagueInfo);
        
        // Procesar solo las primeras 3 filas para evitar timeout
        const sampleRows = dataRows.slice(0, 3);
        
        for (let i = 0; i < sampleRows.length; i++) {
          const row = sampleRows[i];
          if (row.length < Math.max(dateColumnIndex, homeTeamIndex, awayTeamIndex) + 1) continue;
          
          try {
            const dateStr = row[dateColumnIndex]?.trim();
            const homeTeam = row[homeTeamIndex]?.trim();
            const awayTeam = row[awayTeamIndex]?.trim();
            
            if (!dateStr || !homeTeam || !awayTeam) continue;
            
            // Extraer año de la fecha
            const yearMatch = dateStr.match(/(\d{4})/);
            if (yearMatch) {
              const year = parseInt(yearMatch[1]);
              if (year >= 2020 && year <= 2025) {
                seasons.add(`${year}-${(year + 1).toString().slice(-2)}`);
              }
            }
            
            // Crear o buscar equipos
            const homeTeamRecord = await findOrCreateTeam(homeTeam, leagueInfo.league, leagueInfo.country);
            const awayTeamRecord = await findOrCreateTeam(awayTeam, leagueInfo.league, leagueInfo.country);
            
            // Crear partido
            const homeScore = homeScoreIndex !== -1 ? parseInt(row[homeScoreIndex] || '0') : 0;
            const awayScore = awayScoreIndex !== -1 ? parseInt(row[awayScoreIndex] || '0') : 0;
            
            await prisma.match.upsert({
              where: { 
                homeTeamId_awayTeamId_date: {
                  homeTeamId: homeTeamRecord.id,
                  awayTeamId: awayTeamRecord.id,
                  date: new Date(dateStr)
                }
              },
              update: {
                homeScore: homeScore,
                awayScore: awayScore,
                leagueId: leagueRecord.id
              },
              create: {
                date: new Date(dateStr),
                homeTeamId: homeTeamRecord.id,
                awayTeamId: awayTeamRecord.id,
                homeScore: homeScore,
                awayScore: awayScore,
                leagueId: leagueRecord.id,
                season: extractSeasonFromDate(dateStr),
                status: 'finished'
              }
            });
            
            matches++;
            teams += 2; // Contamos ambos equipos
            
            console.log(`   📈 ${matches} partidos guardados...`);
            
          } catch (error) {
            console.warn(`Error procesando partido ${i}:`, error.message);
          }
        }
      } else {
        console.log(`❌ COLUMNAS NO ENCONTRADAS - NO SE PUEDEN GUARDAR DATOS`);
        console.log(`❌ Fecha: ${dateColumnIndex}, Local: ${homeTeamIndex}, Visitante: ${awayTeamIndex}`);
      }
    } else {
      console.log(`⚠️ FORMATO NO ES MATCHES - NO SE GUARDAN DATOS`);
    }
    
    // Función para extraer temporada de fecha
    function extractSeasonFromDate(dateStr) {
      const yearMatch = dateStr.match(/(\d{4})/);
      if (yearMatch) {
        const year = parseInt(yearMatch[1]);
        if (year >= 2020 && year <= 2025) {
          return `${year}-${(year + 1).toString().slice(-2)}`;
        }
      }
      return null;
    }

    return {
      filePath,
      filename,
      format,
      headers,
      totalRows: dataRows.length,
      league: leagueInfo.league,
      country: leagueInfo.country,
      tier: leagueInfo.tier,
      season: leagueInfo.season,
      dataQuality: dataRows.length > 100 ? 'good' : 'fair',
      matches: matches,
      teams: teams,
      seasons: Array.from(seasons)
    };

  } catch (error) {
    console.error(`Error analizando ${filePath}:`, error.message);
    return null;
  }
}

// Extraer información de liga desde la ruta
function extractLeagueInfo(filePath, filename) {
  const pathLower = filePath.toLowerCase();
  const filenameUpper = filename.toUpperCase();
  
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

// Extraer temporada desde la ruta
function extractSeasonFromPath(filePath) {
  const match = filePath.match(/(\d{4})/);
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 2000 && year <= 2025) {
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

// Función principal
async function main() {
  console.log('🔥 Iniciando análisis masivo de CSVs históricos...');
  console.log('📁 Explorando estructura de carpetas...');

  const csvFiles = scanDirectory(BASE_PATH);
  console.log(`📊 Encontrados ${csvFiles.length} archivos CSV para procesar`);

  const results = {
    summary: {
      totalFiles: csvFiles.length,
      processedFiles: 0,
      totalLeagues: 0,
      totalCountries: 0,
      totalMatches: 0,
      totalTeams: 0,
      totalSeasons: 0
    },
    leagues: {},
    files: [],
    coverage: {},
    missingData: {
      leagues: [],
      seasons: [],
      countries: []
    },
    recommendations: []
  };

  // Procesar solo el primer archivo para debug
  const testFile = csvFiles[0];
  console.log(`🔄 TESTEANDO SOLO: ${testFile}`);
  
  // Procesar directamente sin usar la función analyzeCSVFile
  const content = fs.readFileSync(testFile, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim() !== '');
  console.log(`📊 Total líneas: ${lines.length}`);
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  console.log(`🔍 Headers: ${headers.join(', ')}`);
  
  const dateColumnIndex = headers.findIndex(h => h.toLowerCase().includes('date'));
  const homeTeamIndex = headers.findIndex(h => h.toLowerCase().includes('hometeam'));
  const awayTeamIndex = headers.findIndex(h => h.toLowerCase().includes('awayteam'));
  const homeScoreIndex = headers.findIndex(h => h.toLowerCase().includes('fthg'));
  const awayScoreIndex = headers.findIndex(h => h.toLowerCase().includes('ftag'));
  
  console.log(`🔍 Columnas detectadas:`);
  console.log(`   📅 Fecha: ${dateColumnIndex} (${headers[dateColumnIndex] || 'NO ENCONTRADA'})`);
  console.log(`   🏠 Equipo Local: ${homeTeamIndex} (${headers[homeTeamIndex] || 'NO ENCONTRADO'})`);
  console.log(`   🏃 Equipo Visitante: ${awayTeamIndex} (${headers[awayTeamIndex] || 'NO ENCONTRADO'})`);
  console.log(`   ⚽ Goles Local: ${homeScoreIndex} (${headers[homeScoreIndex] || 'NO ENCONTRADOS'})`);
  console.log(`   ⚽ Goles Visitante: ${awayScoreIndex} (${headers[awayScoreIndex] || 'NO ENCONTRADOS'})`);
  
  if (dateColumnIndex === -1 || homeTeamIndex === -1 || awayTeamIndex === -1) {
    console.log(`❌ COLUMNAS NO ENCONTRADAS - NO SE PUEDEN GUARDAR DATOS`);
    return;
  }
  
  console.log(`✅ COLUMNAS VÁLIDAS ENCONTRADAS - PROCESANDO...`);
  
  const dataRows = lines.slice(1);
  const sampleRows = dataRows.slice(0, 3);
  console.log(`📈 Procesando ${sampleRows.length} filas de muestra...`);
  
  let matches = 0;
  let teams = 0;
  
  for (let i = 0; i < sampleRows.length; i++) {
    const row = sampleRows[i];
    if (row.length < Math.max(dateColumnIndex, homeTeamIndex, awayTeamIndex) + 1) continue;
    
    const dateStr = row[dateColumnIndex]?.trim();
    const homeTeam = row[homeTeamIndex]?.trim();
    const awayTeam = row[awayTeamIndex]?.trim();
    
    if (!dateStr || !homeTeam || !awayTeam) continue;
    
    console.log(`\n📊 Fila ${i + 1}:`);
    console.log(`   📅 Fecha: ${dateStr}`);
    console.log(`   🏠 Local: ${homeTeam}`);
    console.log(`   🏃 Visitante: ${awayTeam}`);
    
    const homeScore = homeScoreIndex !== -1 ? parseInt(row[homeScoreIndex] || '0') : 0;
    const awayScore = awayScoreIndex !== -1 ? parseInt(row[awayScoreIndex] || '0') : 0;
    
    console.log(`   ⚽ Goles: ${homeScore}-${awayScore}`);
    
    matches++;
    teams += 2;
    
    console.log(`   ✅ ${matches} partidos procesados...`);
  }
  
  console.log(`\n🎉 RESULTADO:`);
  console.log(`   ⚽ Partidos: ${matches}`);
  console.log(`   👥 Equipos: ${teams}`);
  
  // Verificar datos en la base de datos
  console.log('\n🔍 VERIFICANDO DATOS EN LA BASE DE DATOS...');
  const dbLeagues = await prisma.league.count();
  const dbTeams = await prisma.team.count();
  const dbMatches = await prisma.match.count();
  
  console.log(`📊 DATOS EN LA BASE DE DATOS:`);
  console.log(`   🏆 Ligas: ${dbLeagues}`);
  console.log(`   👥 Equipos: ${dbTeams}`);
  console.log(`   ⚽ Partidos: ${dbMatches}`);
  
  // Desconectar Prisma
  await prisma.$disconnect();
  
  return; // Salir después del primer archivo
  
  // Procesar cada archivo CSV
  for (const filePath of csvFiles) {
    console.log(`🔄 Procesando: ${filePath}`);
    const analysis = await analyzeCSVFile(filePath);
    
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
          formats: new Set()
        };
      }

      results.leagues[leagueKey].files++;
      results.leagues[leagueKey].totalRows += analysis.totalRows;
      if (analysis.season) {
        results.leagues[leagueKey].seasons.add(analysis.season);
      }
      results.leagues[leagueKey].formats.add(analysis.format);

      // Contar partidos y equipos
      if (analysis.format === 'matches') {
        results.summary.totalMatches += analysis.totalRows;
      } else if (analysis.format === 'teams') {
        results.summary.totalTeams += analysis.totalRows;
      }
    }
  }

  // Calcular estadísticas finales
  results.summary.totalLeagues = Object.keys(results.leagues).length;
  results.summary.totalCountries = new Set(Object.values(results.leagues).map(l => l.country)).size;
  results.summary.totalSeasons = new Set(
    Object.values(results.leagues).flatMap(l => Array.from(l.seasons))
  ).size;

  // Calcular cobertura por liga
  const expectedSeasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
  
  for (const [key, league] of Object.entries(results.leagues)) {
    const coveredSeasons = expectedSeasons.filter(season => 
      Array.from(league.seasons).some(s => s.includes(season.slice(0, 4)))
    );
    
    results.coverage[key] = {
      ...league,
      seasons: Array.from(league.seasons),
      formats: Array.from(league.formats),
      coveragePercentage: (coveredSeasons.length / expectedSeasons.length) * 100,
      missingSeasons: expectedSeasons.filter(season => 
        !Array.from(league.seasons).some(s => s.includes(season.slice(0, 4)))
      )
    };
  }

  // Identificar datos faltantes
  const expectedLeagues = [
    'Premier League', 'Championship', 'La Liga', 'La Liga 2',
    'Bundesliga', 'Bundesliga 2', 'Serie A', 'Serie B',
    'Ligue 1', 'Ligue 2', 'Scottish Premiership', 'Super League Greece',
    'Süper Lig', 'Jupiler Pro League', 'Austrian Bundesliga',
    'Danish Superliga', 'Allsvenskan', 'Swiss Super League',
    'Brasileirão Série A', 'Liga Profesional', 'Chinese Super League',
    'J.League', 'Liga MX', 'MLS'
  ];

  const coveredLeagues = Object.values(results.leagues).map(l => l.league);
  results.missingData.leagues = expectedLeagues.filter(l => !coveredLeagues.includes(l));

  // Calcular cobertura general
  const totalCoverage = Object.values(results.coverage).reduce((sum, l) => sum + l.coveragePercentage, 0);
  const overallCoverage = totalCoverage / Object.keys(results.coverage).length;

  // Generar recomendaciones
  const lowCoverageLeagues = Object.values(results.coverage).filter(l => l.coveragePercentage < 50);
  if (lowCoverageLeagues.length > 0) {
    results.recommendations.push(`Priorizar completar datos de: ${lowCoverageLeagues.map(l => l.league).join(', ')}`);
  }

  results.recommendations.push('Utilizar APIs adicionales: API-Football, TheSportsDB, Football-Data.org');
  results.recommendations.push('Implementar web scraping para datos faltantes');
  results.recommendations.push('Integrar datos de Transfermarkt para estadísticas de equipos');

  // Guardar reporte
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));

  console.log('\n✅ Análisis masivo completado!');
  console.log(`📊 Resumen:`);
  console.log(`   📁 Archivos procesados: ${results.summary.processedFiles}/${results.summary.totalFiles}`);
  console.log(`   🏆 Ligas: ${results.summary.totalLeagues}`);
  console.log(`   🌍 Países: ${results.summary.totalCountries}`);
  console.log(`   ⚽ Partidos: ${results.summary.totalMatches.toLocaleString()}`);
  console.log(`   👥 Equipos: ${results.summary.totalTeams.toLocaleString()}`);
  console.log(`   📅 Temporadas: ${results.summary.totalSeasons}`);
  console.log(`   📈 Cobertura general: ${overallCoverage.toFixed(1)}%`);
  console.log(`   📄 Reporte guardado en: ${OUTPUT_FILE}`);
  
  // Verificar datos en la base de datos
  console.log('\n🔍 VERIFICANDO DATOS EN LA BASE DE DATOS...');
  const dbLeagues = await prisma.league.count();
  const dbTeams = await prisma.team.count();
  const dbMatches = await prisma.match.count();
  
  console.log(`📊 DATOS EN LA BASE DE DATOS:`);
  console.log(`   🏆 Ligas: ${dbLeagues}`);
  console.log(`   👥 Equipos: ${dbTeams}`);
  console.log(`   ⚽ Partidos: ${dbMatches}`);
  
  // Desconectar Prisma
  await prisma.$disconnect();

  return results;
}

// Ejecutar análisis
if (require.main === module) {
  main();
}

module.exports = { main, analyzeCSVFile, extractLeagueInfo };

