#!/usr/bin/env node

/**
 * Script de Restauración desde Git
 * Restaura el proyecto completo desde el repositorio Git
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const restoreConfig = {
  sourceDir: process.cwd(),
  gitRemote: 'origin',
  gitBranch: 'main'
};

function restoreFromGit() {
  console.log('🔄 Iniciando restauración desde Git...\n');
  
  try {
    // 1. Verificar que estamos en un repositorio Git
    if (!fs.existsSync(path.join(restoreConfig.sourceDir, '.git'))) {
      console.log('❌ No se encontró repositorio Git');
      console.log('💡 Ejecuta primero: node scripts/setup-git-repository.js');
      process.exit(1);
    }

    // 2. Verificar conexión con repositorio remoto
    try {
      execSync(`git remote get-url ${restoreConfig.gitRemote}`, { 
        stdio: 'pipe', 
        cwd: restoreConfig.sourceDir 
      });
      console.log('✅ Repositorio remoto configurado');
    } catch (error) {
      console.log('❌ No se encontró repositorio remoto');
      console.log('💡 Configura un repositorio remoto con:');
      console.log('git remote add origin <URL_DEL_REPOSITORIO>');
      process.exit(1);
    }

    // 3. Hacer backup de cambios locales no guardados
    console.log('💾 Haciendo backup de cambios locales...');
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `local-backup-${timestamp}`;
    
    try {
      execSync(`git stash push -m "Backup local antes de restauración - ${timestamp}"`, { 
        stdio: 'inherit', 
        cwd: restoreConfig.sourceDir 
      });
      console.log('✅ Cambios locales guardados en stash');
    } catch (error) {
      console.log('ℹ️ No hay cambios locales para respaldar');
    }

    // 4. Obtener últimos cambios del repositorio remoto
    console.log('📥 Obteniendo últimos cambios del repositorio...');
    execSync(`git fetch ${restoreConfig.gitRemote}`, { 
      stdio: 'inherit', 
      cwd: restoreConfig.sourceDir 
    });

    // 5. Restaurar desde la rama principal
    console.log('🔄 Restaurando desde rama principal...');
    execSync(`git reset --hard ${restoreConfig.gitRemote}/${restoreConfig.gitBranch}`, { 
      stdio: 'inherit', 
      cwd: restoreConfig.sourceDir 
    });

    // 6. Limpiar archivos no rastreados
    console.log('🧹 Limpiando archivos no rastreados...');
    execSync('git clean -fd', { 
      stdio: 'inherit', 
      cwd: restoreConfig.sourceDir 
    });

    console.log('\n✅ Restauración completada exitosamente!');
    console.log('📊 Proyecto restaurado desde Git');
    
    // 7. Mostrar información del commit
    try {
      const commitHash = execSync('git rev-parse HEAD', { 
        encoding: 'utf8', 
        cwd: restoreConfig.sourceDir 
      }).trim();
      const commitMessage = execSync('git log -1 --pretty=format:"%s"', { 
        encoding: 'utf8', 
        cwd: restoreConfig.sourceDir 
      }).trim();
      const commitDate = execSync('git log -1 --pretty=format:"%ci"', { 
        encoding: 'utf8', 
        cwd: restoreConfig.sourceDir 
      }).trim();
      
      console.log('\n📋 Información del commit restaurado:');
      console.log(`🔗 Hash: ${commitHash}`);
      console.log(`📝 Mensaje: ${commitMessage}`);
      console.log(`📅 Fecha: ${commitDate}`);
    } catch (error) {
      console.log('⚠️ No se pudo obtener información del commit');
    }

    console.log('\n💡 Para recuperar cambios locales:');
    console.log('git stash list  # Ver stashes disponibles');
    console.log('git stash pop   # Restaurar último stash');
    
  } catch (error) {
    console.error('❌ Error durante la restauración:', error.message);
    process.exit(1);
  }
}

function showStashList() {
  console.log('📋 Lista de stashes disponibles:');
  try {
    execSync('git stash list', { 
      stdio: 'inherit', 
      cwd: restoreConfig.sourceDir 
    });
  } catch (error) {
    console.log('ℹ️ No hay stashes disponibles');
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--list-stashes')) {
    showStashList();
  } else {
    restoreFromGit();
  }
}

module.exports = { restoreFromGit, showStashList };



