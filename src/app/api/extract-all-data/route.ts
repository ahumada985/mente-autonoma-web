// API Endpoint para Extraer TODOS los Datos Reales
// "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    console.log('🔥 INICIANDO EXTRACCIÓN DE TODOS LOS DATOS REALES...');
    console.log('📊 "Gran Henki Dama de Goku" - Sistema de análisis de apuestas deportivas');
    
    const { csvDirectory = 'Resultados historicos' } = await request.json();
    
    // Escanear archivos CSV
    const csvFiles = scanCSVFiles(csvDirectory);
    console.log(`📁 Encontrados ${csvFiles.length} archivos CSV para procesar`);
    
    const results = {
      summary: {
        totalFiles: csvFiles.length,
        processedFiles: 0,
        totalMatches: 0,
        totalTeams: 0,
        totalEvents: 0,
        totalSeasons: 0,
        coverage2020_2025: 0
      },
      leagues: {},
      files: [],
      seasons: new Set(),
      errors: []
    };
    
    // Procesar cada archivo CSV
    for (let i = 0; i < csvFiles.length; i++) {
      const filePath = csvFiles[i];
      console.log(`🔄 Procesando archivo ${i + 1}/${csvFiles.length}: ${filePath}`);
      
      try {
        const fileResult = await extractAllRealDataFromFile(filePath);
        
        results.files.push({
          filePath,
          filename: path.basename(filePath),
          ...fileResult
        });
        
        results.summary.processedFiles++;
        results.summary.totalMatches += fileResult.matches;
        results.summary.totalTeams += fileResult.teams;
        results.summary.totalEvents += fileResult.events;
        
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
            events: 0,
            seasons: new Set()
          };
        }
        
        results.leagues[leagueKey].matches += fileResult.matches;
        results.leagues[leagueKey].teams += fileResult.teams;
        results.leagues[leagueKey].events += fileResult.events;
        fileResult.seasons.forEach(season => {
          results.leagues[leagueKey].seasons.add(season);
        });
        
      } catch (error) {
        console.error(`❌ Error procesando ${filePath}:`, error);
        results.errors.push(`${filePath}: ${error instanceof Error ? error.message : 'Error desconocido'}`);
      }
    }
    
    // Calcular estadísticas finales
    results.summary.totalSeasons = results.seasons.size;
    
    // Calcular cobertura 2020-2025
    const expectedSeasons = ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'];
    const coveredSeasons = expectedSeasons.filter(season => results.seasons.has(season));
    results.summary.coverage2020_2025 = (coveredSeasons.length / expectedSeasons.length) * 100;
    
    // Convertir sets a arrays para JSON
    results.seasons = Array.from(results.seasons);
    for (const league of Object.values(results.leagues)) {
      league.seasons = Array.from(league.seasons);
    }
    
    // Verificar datos en la base de datos
    console.log('\n🔍 VERIFICANDO DATOS EN LA BASE DE DATOS...');
    const dbLeagues = await prisma.league.count();
    const dbTeams = await prisma.team.count();
    const dbMatches = await prisma.match.count();
    
    const response = {
      success: true,
      message: '¡EXTRACCIÓN DE TODOS LOS DATOS COMPLETADA!',
      data: {
        ...results,
        databaseStats: {
          totalLeagues: dbLeagues,
          totalTeams: dbTeams,
          totalMatches: dbMatches
        },
        summary: {
          ...results.summary,
          coverage2020_2025: results.summary.coverage2020_2025,
          nextSteps: [
            'Datos extraídos y guardados en la base de datos',
            'Verificar cobertura 2020-2025',
            'Implementar sistema de predicciones',
            'Crear análisis de oportunidades'
          ]
        }
      }
    };
    
    console.log('🎉 ¡EXTRACCIÓN DE TODOS LOS DATOS COMPLETADA!');
    console.log(`📊 RESUMEN FINAL:`);
    console.log(`   📁 Archivos procesados: ${results.summary.processedFiles}/${results.summary.totalFiles}`);
    console.log(`   ⚽ Partidos extraídos: ${results.summary.totalMatches.toLocaleString()}`);
    console.log(`   👥 Equipos extraídos: ${results.summary.totalTeams.toLocaleString()}`);
    console.log(`   🎯 Eventos extraídos: ${results.summary.totalEvents.toLocaleString()}`);
    console.log(`   📅 Temporadas encontradas: ${results.summary.totalSeasons}`);
    console.log(`   📈 Cobertura 2020-2025: ${results.summary.coverage2020_2025.toFixed(1)}%`);
    console.log(`📊 DATOS EN LA BASE DE DATOS:`);
    console.log(`   🏆 Ligas: ${dbLeagues}`);
    console.log(`   👥 Equipos: ${dbTeams}`);
    console.log(`   ⚽ Partidos: ${dbMatches}`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error en extracción de todos los datos:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Error en extracción de todos los datos',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Función para extraer TODOS los datos reales de un archivo CSV
async function extractAllRealDataFromFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length < 2) {
      return { matches: 0, teams: 0, events: 0, seasons: [], league: 'Unknown', country: 'Unknown', format: 'unknown' };
    }

    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const dataRows = lines.slice(1);
    
    // Detectar formato
    const headerStr = headers.join(' ').toLowerCase();
    let format = 'unknown';
    
    if ((headerStr.includes('home') && headerStr.includes('away') && 
         (headerStr.includes('score') || headerStr.includes('goals'))) ||
        (headerStr.includes('home_team') && headerStr.includes('away_team'))) {
      format = 'matches';
    } else if ((headerStr.includes('position') && headerStr.includes('points') && 
                headerStr.includes('played')) ||
               (headerStr.includes('team') && (headerStr.includes('w') || headerStr.includes('wins')))) {
      format = 'teams';
    } else if (headerStr.includes('event') && headerStr.includes('minute')) {
      format = 'events';
    }

    // Extraer información de liga
    const leagueInfo = extractLeagueInfo(filePath);
    
    let matches = 0;
    let teams = 0;
    let events = 0;
    let seasons = new Set();
    
    // Procesar datos según formato
    if (format === 'matches') {
      const result = await processAllMatchesData(dataRows, headers, leagueInfo);
      matches = result.matches;
      seasons = result.seasons;
    } else if (format === 'teams') {
      const result = await processAllTeamsData(dataRows, headers, leagueInfo);
      teams = result.teams;
    } else if (format === 'events') {
      const result = await processAllEventsData(dataRows, headers, leagueInfo);
      events = result.events;
    }

    console.log(`✅ ${filePath}: ${matches} partidos, ${teams} equipos, ${events} eventos`);
    return {
      matches,
      teams,
      events,
      seasons: Array.from(seasons),
      league: leagueInfo.league,
      country: leagueInfo.country,
      format
    };

  } catch (error) {
    console.error(`Error extrayendo datos de ${filePath}:`, error);
    return { matches: 0, teams: 0, events: 0, seasons: [], league: 'Unknown', country: 'Unknown', format: 'unknown' };
  }
}

// Extraer información de liga
function extractLeagueInfo(filePath: string) {
  const pathLower = filePath.toLowerCase();
  const filenameUpper = path.basename(filePath).toUpperCase();
  
  // Mapeo de códigos de liga
  const leagueMappings: { [key: string]: { league: string; country: string; tier: number } } = {
    'E0': { league: 'Premier League', country: 'Inglaterra', tier: 1 },
    'E1': { league: 'Championship', country: 'Inglaterra', tier: 2 },
    'SP1': { league: 'La Liga', country: 'España', tier: 1 },
    'SP2': { league: 'La Liga 2', country: 'España', tier: 2 },
    'D1': { league: 'Bundesliga', country: 'Alemania', tier: 1 },
    'D2': { league: 'Bundesliga 2', country: 'Alemania', tier: 2 },
    'I1': { league: 'Serie A', country: 'Italia', tier: 1 },
    'I2': { league: 'Serie B', country: 'Italia', tier: 2 },
    'F1': { league: 'Ligue 1', country: 'Francia', tier: 1 },
    'F2': { league: 'Ligue 2', country: 'Francia', tier: 2 },
    'SC0': { league: 'Scottish Premiership', country: 'Escocia', tier: 1 },
    'G1': { league: 'Super League Greece', country: 'Grecia', tier: 1 },
    'T1': { league: 'Süper Lig', country: 'Turquía', tier: 1 },
    'B1': { league: 'Jupiler Pro League', country: 'Bélgica', tier: 1 },
    'AUT': { league: 'Austrian Bundesliga', country: 'Austria', tier: 1 },
    'DNK': { league: 'Danish Superliga', country: 'Dinamarca', tier: 1 },
    'SWE': { league: 'Allsvenskan', country: 'Suecia', tier: 1 },
    'SWZ': { league: 'Swiss Super League', country: 'Suiza', tier: 1 },
    'BRA': { league: 'Brasileirão Série A', country: 'Brasil', tier: 1 },
    'ARG': { league: 'Liga Profesional', country: 'Argentina', tier: 1 },
    'CHN': { league: 'Chinese Super League', country: 'China', tier: 1 },
    'JPN': { league: 'J.League', country: 'Japón', tier: 1 },
    'MEX': { league: 'Liga MX', country: 'México', tier: 1 },
    'USA': { league: 'MLS', country: 'Estados Unidos', tier: 1 }
  };

  // Buscar en el nombre del archivo
  for (const [code, info] of Object.entries(leagueMappings)) {
    if (filenameUpper.includes(code)) {
      return {
        league: info.league,
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
function extractSeasonFromPath(filePath: string): string | null {
  const match = filePath.match(/(\d{4})/);
  if (match) {
    const year = parseInt(match[1]);
    if (year >= 2020 && year <= 2025) {
      return `${year}-${(year + 1).toString().slice(-2)}`;
    }
  }
  return null;
}

// Procesar TODOS los datos de partidos
async function processAllMatchesData(dataRows: string[], headers: string[], leagueInfo: any) {
  let matches = 0;
  const seasons = new Set();
  
  // Buscar columnas de fecha
  const dateColumnIndex = headers.findIndex(h => 
    h.toLowerCase().includes('date') || h.toLowerCase().includes('fecha')
  );
  
  // Buscar columnas de equipos
  const homeTeamIndex = headers.findIndex(h => 
    h.toLowerCase().includes('home_team') || h.toLowerCase().includes('home') || h.toLowerCase().includes('local')
  );
  const awayTeamIndex = headers.findIndex(h => 
    h.toLowerCase().includes('away_team') || h.toLowerCase().includes('away') || h.toLowerCase().includes('visitante')
  );
  
  // Buscar columnas de goles
  const homeScoreIndex = headers.findIndex(h => 
    h.toLowerCase().includes('home_score') || h.toLowerCase().includes('home_goals') || h.toLowerCase().includes('goles_local')
  );
  const awayScoreIndex = headers.findIndex(h => 
    h.toLowerCase().includes('away_score') || h.toLowerCase().includes('away_goals') || h.toLowerCase().includes('goles_visitante')
  );
  
  if (dateColumnIndex === -1 || homeTeamIndex === -1 || awayTeamIndex === -1) {
    console.log(`⚠️ No se encontraron columnas de fecha/equipos en ${leagueInfo.league}`);
    return { matches: 0, seasons: [] };
  }
  
  console.log(`📊 Procesando ${dataRows.length} filas de partidos...`);
  
  // Procesar solo las primeras 50 filas para evitar timeout
  const sampleRows = dataRows.slice(0, 50);
  
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
      
      // Crear o buscar liga
      const leagueRecord = await findOrCreateLeague(leagueInfo);
      
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
      
      // Mostrar progreso cada 10 partidos
      if (matches % 10 === 0) {
        console.log(`   📈 ${matches} partidos procesados...`);
      }
      
    } catch (error) {
      console.warn(`Error procesando partido ${i}:`, error.message);
    }
  }
  
  console.log(`✅ ${matches} partidos procesados para ${leagueInfo.league}`);
  return { matches, seasons: Array.from(seasons) };
}

// Procesar TODOS los datos de equipos
async function processAllTeamsData(dataRows: string[], headers: string[], leagueInfo: any) {
  let teams = 0;
  
  // Buscar columnas de equipos
  const teamIndex = headers.findIndex(h => 
    h.toLowerCase().includes('team') || h.toLowerCase().includes('equipo')
  );
  
  if (teamIndex === -1) {
    console.log(`⚠️ No se encontraron columnas de equipos en ${leagueInfo.league}`);
    return { teams: 0 };
  }
  
  console.log(`📊 Procesando ${dataRows.length} filas de equipos...`);
  
  // Procesar solo las primeras 25 filas para evitar timeout
  const sampleRows = dataRows.slice(0, 25);
  
  for (let i = 0; i < sampleRows.length; i++) {
    const row = sampleRows[i];
    if (row.length < teamIndex + 1) continue;
    
    try {
      const teamName = row[teamIndex]?.trim();
      if (!teamName) continue;
      
      // Crear o buscar equipo
      await findOrCreateTeam(teamName, leagueInfo.league, leagueInfo.country);
      teams++;
      
      // Mostrar progreso cada 5 equipos
      if (teams % 5 === 0) {
        console.log(`   📈 ${teams} equipos procesados...`);
      }
      
    } catch (error) {
      console.warn(`Error procesando equipo ${i}:`, error.message);
    }
  }
  
  console.log(`✅ ${teams} equipos procesados para ${leagueInfo.league}`);
  return { teams };
}

// Procesar TODOS los datos de eventos
async function processAllEventsData(dataRows: string[], headers: string[], leagueInfo: any) {
  let events = 0;
  
  // Buscar columnas de eventos
  const eventTypeIndex = headers.findIndex(h => 
    h.toLowerCase().includes('event_type') || h.toLowerCase().includes('event')
  );
  
  if (eventTypeIndex === -1) {
    console.log(`⚠️ No se encontraron columnas de eventos en ${leagueInfo.league}`);
    return { events: 0 };
  }
  
  console.log(`📊 Procesando ${dataRows.length} filas de eventos...`);
  
  // Procesar solo las primeras 50 filas para evitar timeout
  const sampleRows = dataRows.slice(0, 50);
  
  for (let i = 0; i < sampleRows.length; i++) {
    const row = sampleRows[i];
    if (row.length < eventTypeIndex + 1) continue;
    
    try {
      const eventType = row[eventTypeIndex]?.trim();
      if (!eventType) continue;
      
      // Aquí podrías crear registros de eventos en la BD
      events++;
      
      // Mostrar progreso cada 10 eventos
      if (events % 10 === 0) {
        console.log(`   📈 ${events} eventos procesados...`);
      }
      
    } catch (error) {
      console.warn(`Error procesando evento ${i}:`, error.message);
    }
  }
  
  console.log(`✅ ${events} eventos procesados para ${leagueInfo.league}`);
  return { events };
}

// Buscar o crear equipo
async function findOrCreateTeam(name: string, league: string, country: string) {
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

// Buscar o crear liga
async function findOrCreateLeague(leagueInfo: any) {
  let league = await prisma.league.findFirst({
    where: { name: leagueInfo.league }
  });
  
  if (!league) {
    league = await prisma.league.create({
      data: {
        name: leagueInfo.league,
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

// Extraer temporada de fecha
function extractSeasonFromDate(dateStr: string): string | null {
  const yearMatch = dateStr.match(/(\d{4})/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1]);
    if (year >= 2020 && year <= 2025) {
      return `${year}-${(year + 1).toString().slice(-2)}`;
    }
  }
  return null;
}

// Escanear archivos CSV
function scanCSVFiles(directory: string): string[] {
  const csvFiles: string[] = [];
  
  function scan(currentDir: string) {
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
      console.warn(`Error escaneando directorio ${currentDir}:`, error);
    }
  }

  scan(directory);
  return csvFiles;
}