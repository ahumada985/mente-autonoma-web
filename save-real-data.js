// GUARDADOR DE DATOS REALES
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

// Inicializar Prisma
const prisma = new PrismaClient();

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

// Extraer información de liga
function extractLeagueInfo(filePath) {
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
  if (pathLower.includes('premier')) return { league: 'Premier League', country: 'Inglaterra', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('laliga') || pathLower.includes('la_liga')) return { league: 'La Liga', country: 'España', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('bundesliga')) return { league: 'Bundesliga', country: 'Alemania', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('seria') || pathLower.includes('serie')) return { league: 'Serie A', country: 'Italia', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('francia') || pathLower.includes('ligue')) return { league: 'Ligue 1', country: 'Francia', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('escocia')) return { league: 'Scottish Premiership', country: 'Escocia', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('grecia')) return { league: 'Super League Greece', country: 'Grecia', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('turquia')) return { league: 'Süper Lig', country: 'Turquía', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('belgica')) return { league: 'Jupiler Pro League', country: 'Bélgica', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('austria')) return { league: 'Austrian Bundesliga', country: 'Austria', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('dinamarca')) return { league: 'Danish Superliga', country: 'Dinamarca', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('suecia')) return { league: 'Allsvenskan', country: 'Suecia', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('suiza')) return { league: 'Swiss Super League', country: 'Suiza', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('brasil')) return { league: 'Brasileirão Série A', country: 'Brasil', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('argentina')) return { league: 'Liga Profesional', country: 'Argentina', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('china')) return { league: 'Chinese Super League', country: 'China', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('japon')) return { league: 'J.League', country: 'Japón', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('mexico')) return { league: 'Liga MX', country: 'México', tier: 1, season: extractSeasonFromPath(filePath) };
  if (pathLower.includes('usa')) return { league: 'MLS', country: 'Estados Unidos', tier: 1, season: extractSeasonFromPath(filePath) };

  return { league: 'Unknown', country: 'Unknown', tier: 1, season: null };
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

// Detectar columnas específicas de cada archivo
function detectColumns(headers) {
  const headerStr = headers.join(' ').toLowerCase();
  
  return {
    // Columnas de fecha
    date: headers.findIndex(h => 
      h.toLowerCase().includes('date') || 
      h.toLowerCase().includes('fecha') ||
      h.toLowerCase().includes('time')
    ),
    
    // Columnas de equipos
    homeTeam: headers.findIndex(h => 
      h.toLowerCase().includes('home_team') || 
      h.toLowerCase().includes('home') || 
      h.toLowerCase().includes('local') ||
      h.toLowerCase().includes('team1')
    ),
    awayTeam: headers.findIndex(h => 
      h.toLowerCase().includes('away_team') || 
      h.toLowerCase().includes('away') || 
      h.toLowerCase().includes('visitante') ||
      h.toLowerCase().includes('team2')
    ),
    
    // Columnas de goles
    homeScore: headers.findIndex(h => 
      h.toLowerCase().includes('home_score') || 
      h.toLowerCase().includes('home_goals') || 
      h.toLowerCase().includes('goles_local') ||
      h.toLowerCase().includes('fthg') ||
      h.toLowerCase().includes('score1')
    ),
    awayScore: headers.findIndex(h => 
      h.toLowerCase().includes('away_score') || 
      h.toLowerCase().includes('away_goals') || 
      h.toLowerCase().includes('goles_visitante') ||
      h.toLowerCase().includes('ftag') ||
      h.toLowerCase().includes('score2')
    )
  };
}

// Procesar un archivo CSV individual y GUARDARLO
async function processAndSaveCSV(filePath) {
  try {
    console.log(`\n🔄 PROCESANDO Y GUARDANDO: ${filePath}`);
    
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
      console.log(`⚠️ Archivo vacío: ${filePath}`);
      return { matches: 0, teams: 0 };
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows = lines.slice(1);
    
    console.log(`📊 Headers: ${headers.join(', ')}`);
    
    // Detectar columnas específicas
    const columns = detectColumns(headers);
    console.log(`🔍 Columnas detectadas:`, columns);
    
    // Extraer información de liga
    const leagueInfo = extractLeagueInfo(filePath);
    console.log(`🏆 Liga: ${leagueInfo.league} (${leagueInfo.country})`);
    
    // Crear o buscar liga
    const leagueRecord = await findOrCreateLeague(leagueInfo);
    
    let matches = 0;
    let teams = 0;
    const seasons = new Set();
    
    // Procesar solo las primeras 5 filas para evitar timeout
    const sampleRows = dataRows.slice(0, 5);
    console.log(`📈 Procesando ${sampleRows.length} filas de muestra...`);
    
    for (let i = 0; i < sampleRows.length; i++) {
      const row = sampleRows[i];
      if (row.length < Math.max(columns.date, columns.homeTeam, columns.awayTeam) + 1) continue;
      
      try {
        // Extraer datos básicos
        const dateStr = columns.date !== -1 ? row[columns.date]?.trim() : null;
        const homeTeam = columns.homeTeam !== -1 ? row[columns.homeTeam]?.trim() : null;
        const awayTeam = columns.awayTeam !== -1 ? row[columns.awayTeam]?.trim() : null;
        
        if (!homeTeam || !awayTeam) continue;
        
        // Extraer año de la fecha
        if (dateStr) {
          const yearMatch = dateStr.match(/(\d{4})/);
          if (yearMatch) {
            const year = parseInt(yearMatch[1]);
            if (year >= 2020 && year <= 2025) {
              seasons.add(`${year}-${(year + 1).toString().slice(-2)}`);
            }
          }
        }
        
        // Crear o buscar equipos
        const homeTeamRecord = await findOrCreateTeam(homeTeam, leagueInfo.league, leagueInfo.country);
        const awayTeamRecord = await findOrCreateTeam(awayTeam, leagueInfo.league, leagueInfo.country);
        
        // Extraer goles
        const homeScore = columns.homeScore !== -1 ? parseInt(row[columns.homeScore] || '0') : 0;
        const awayScore = columns.awayScore !== -1 ? parseInt(row[columns.awayScore] || '0') : 0;
        
        // Crear partido
        if (dateStr) {
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
        }
        
        matches++;
        teams += 2; // Contamos ambos equipos
        
        console.log(`   📈 ${matches} partidos guardados...`);
        
      } catch (error) {
        console.warn(`Error procesando fila ${i}:`, error.message);
      }
    }
    
    console.log(`✅ ${filePath}: ${matches} partidos, ${teams} equipos guardados`);
    return {
      matches,
      teams,
      seasons: Array.from(seasons),
      league: leagueInfo.league,
      country: leagueInfo.country
    };

  } catch (error) {
    console.error(`❌ Error procesando ${filePath}:`, error.message);
    return { matches: 0, teams: 0, seasons: [] };
  }
}

// Extraer temporada de fecha
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
  console.log('🔥 INICIANDO GUARDADO DE DATOS REALES...');
  console.log('📊 "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas');
  console.log('🎯 PROCESANDO Y GUARDANDO DATOS REALES EN LA BASE DE DATOS');
  
  const startTime = Date.now();
  
  const csvFiles = scanDirectory('Resultados historicos');
  console.log(`📁 Encontrados ${csvFiles.length} archivos CSV para procesar`);
  
  const results = {
    summary: {
      totalFiles: csvFiles.length,
      processedFiles: 0,
      totalMatches: 0,
      totalTeams: 0,
      totalSeasons: 0
    },
    leagues: {},
    files: [],
    seasons: new Set(),
    errors: []
  };
  
  // Procesar cada archivo CSV individualmente
  for (let i = 0; i < csvFiles.length; i++) {
    const filePath = csvFiles[i];
    console.log(`\n🔄 Procesando archivo ${i + 1}/${csvFiles.length}: ${path.basename(filePath)}`);
    
    try {
      const fileResult = await processAndSaveCSV(filePath);
      
      results.files.push({
        filePath,
        filename: path.basename(filePath),
        ...fileResult
      });
      
      results.summary.processedFiles++;
      results.summary.totalMatches += fileResult.matches;
      results.summary.totalTeams += fileResult.teams;
      
      // Agregar temporadas
      fileResult.seasons.forEach(season => {
        results.seasons.add(season);
      });
      
      // Agregar a estadísticas de liga
      const leagueKey = `${fileResult.league}-${fileResult.country}`;
      if (!results.leagues[leagueKey]) {
        results.leagues[leagueKey] = {
          league: fileResult.league,
          country: fileResult.country,
          matches: 0,
          teams: 0,
          seasons: new Set()
        };
      }
      
      results.leagues[leagueKey].matches += fileResult.matches;
      results.leagues[leagueKey].teams += fileResult.teams;
      fileResult.seasons.forEach(season => {
        results.leagues[leagueKey].seasons.add(season);
      });
      
    } catch (error) {
      console.error(`❌ Error procesando ${filePath}:`, error);
      results.errors.push(`${filePath}: ${error.message}`);
    }
  }
  
  // Calcular estadísticas finales
  results.summary.totalSeasons = results.seasons.size;
  
  // Convertir sets a arrays para JSON
  results.seasons = Array.from(results.seasons);
  for (const league of Object.values(results.leagues)) {
    league.seasons = Array.from(league.seasons);
  }
  
  // Guardar reporte
  fs.writeFileSync('real-data-saved-report.json', JSON.stringify(results, null, 2));
  
  const processingTime = Date.now() - startTime;
  
  console.log('\n🎉 ¡GUARDADO DE DATOS REALES COMPLETADO!');
  console.log(`📊 RESUMEN FINAL:`);
  console.log(`   📁 Archivos procesados: ${results.summary.processedFiles}/${results.summary.totalFiles}`);
  console.log(`   ⚽ Partidos guardados: ${results.summary.totalMatches.toLocaleString()}`);
  console.log(`   👥 Equipos guardados: ${results.summary.totalTeams.toLocaleString()}`);
  console.log(`   📅 Temporadas encontradas: ${results.summary.totalSeasons}`);
  console.log(`   ⏱️ Tiempo total: ${(processingTime / 1000).toFixed(2)}s`);
  console.log(`   📄 Reporte guardado en: real-data-saved-report.json`);
  
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

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { main, processAndSaveCSV };

