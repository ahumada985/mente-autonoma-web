// Sistema de Verificación de APIs
// Prueba que las APIs configuradas funcionen correctamente

export class APIVerification {
  
  // Verificar TheSportsDB
  static async verifyTheSportsDB() {
    const key = process.env.THE_SPORTS_DB_KEY;
    if (!key) {
      return { status: 'error', message: 'Clave no configurada' };
    }

    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/${key}/search_all_leagues.php?s=Soccer`);
      
      if (!response.ok) {
        return { status: 'error', message: `Error HTTP: ${response.status}` };
      }

      const data = await response.json();
      
      if (data.leagues && data.leagues.length > 0) {
        return { 
          status: 'success', 
          message: 'API funcionando correctamente',
          data: {
            leaguesFound: data.leagues.length,
            sampleLeagues: data.leagues.slice(0, 3).map((league: any) => league.strLeague)
          }
        };
      } else {
        return { status: 'error', message: 'No se encontraron ligas' };
      }
    } catch (error) {
      return { status: 'error', message: `Error de conexión: ${error}` };
    }
  }

  // Verificar Football-Data.org
  static async verifyFootballData() {
    const key = process.env.FOOTBALL_DATA_KEY;
    if (!key) {
      return { status: 'error', message: 'Clave no configurada' };
    }

    try {
      const response = await fetch('https://api.football-data.org/v4/competitions', {
        headers: {
          'X-Auth-Token': key
        }
      });
      
      if (!response.ok) {
        return { status: 'error', message: `Error HTTP: ${response.status}` };
      }

      const data = await response.json();
      
      if (data.competitions && data.competitions.length > 0) {
        return { 
          status: 'success', 
          message: 'API funcionando correctamente',
          data: {
            competitionsFound: data.competitions.length,
            sampleCompetitions: data.competitions.slice(0, 3).map((comp: any) => comp.name)
          }
        };
      } else {
        return { status: 'error', message: 'No se encontraron competiciones' };
      }
    } catch (error) {
      return { status: 'error', message: `Error de conexión: ${error}` };
    }
  }

  // Verificar Sportmonks
  static async verifySportmonks() {
    const key = process.env.SPORTMONKS_KEY;
    if (!key) {
      return { status: 'error', message: 'Clave no configurada' };
    }

    try {
      const response = await fetch(`https://api.sportmonks.com/v3/football/leagues?api_token=${key}`);
      
      if (!response.ok) {
        return { status: 'error', message: `Error HTTP: ${response.status}` };
      }

      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        return { 
          status: 'success', 
          message: 'API funcionando correctamente',
          data: {
            leaguesFound: data.data.length,
            sampleLeagues: data.data.slice(0, 3).map((league: any) => league.name)
          }
        };
      } else {
        return { status: 'error', message: 'No se encontraron ligas' };
      }
    } catch (error) {
      return { status: 'error', message: `Error de conexión: ${error}` };
    }
  }

  // Verificar todas las APIs
  static async verifyAllAPIs() {
    console.log('🔍 Verificando APIs configuradas...\n');
    
    const results = {
      theSportsDB: await this.verifyTheSportsDB(),
      footballData: await this.verifyFootballData(),
      sportmonks: await this.verifySportmonks()
    };

    // Mostrar resultados
    console.log('📊 Resultados de Verificación:');
    console.log('================================');
    
    Object.entries(results).forEach(([apiName, result]) => {
      const status = result.status === 'success' ? '✅' : '❌';
      console.log(`${status} ${apiName.toUpperCase()}: ${result.message}`);
      
      if (result.status === 'success' && result.data) {
        console.log(`   📈 Datos encontrados: ${JSON.stringify(result.data)}`);
      }
    });

    const workingAPIs = Object.values(results).filter(result => result.status === 'success').length;
    const totalAPIs = Object.keys(results).length;
    
    console.log(`\n🎯 Resumen: ${workingAPIs}/${totalAPIs} APIs funcionando`);
    
    if (workingAPIs > 0) {
      console.log('✅ Sistema listo para funcionar con APIs disponibles');
    } else {
      console.log('❌ Ninguna API funcionando - revisar configuración');
    }

    return results;
  }

  // Obtener estadísticas de APIs
  static getAPIStats() {
    const stats = {
      configured: 0,
      working: 0,
      total: 3
    };

    // Verificar si las claves están configuradas
    if (process.env.THE_SPORTS_DB_KEY) stats.configured++;
    if (process.env.FOOTBALL_DATA_KEY) stats.configured++;
    if (process.env.SPORTMONKS_KEY) stats.configured++;

    return stats;
  }
}


