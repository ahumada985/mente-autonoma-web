#!/usr/bin/env node

/**
 * Script de Backup Automático
 * Configura backup automático del proyecto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración de backup
const backupConfig = {
  sourceDir: process.cwd(),
  backupDir: path.join(process.cwd(), 'backups'),
  maxBackups: 7, // Mantener 7 backups
  excludePatterns: [
    'node_modules',
    '.next',
    '.git',
    'backups',
    'test-results',
    '*.log'
  ]
};

function createBackup() {
  console.log('🔄 Iniciando backup automático...\n');
  
  try {
    // Crear directorio de backups si no existe
    if (!fs.existsSync(backupConfig.backupDir)) {
      fs.mkdirSync(backupConfig.backupDir, { recursive: true });
      console.log('📁 Directorio de backups creado');
    }
    
    // Generar nombre del backup con timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupName = `backup-${timestamp}`;
    const backupPath = path.join(backupConfig.backupDir, backupName);
    
    // Crear backup usando tar (Windows) o zip
    const excludeArgs = backupConfig.excludePatterns.map(pattern => `--exclude=${pattern}`).join(' ');
    
    if (process.platform === 'win32') {
      // Usar PowerShell para crear backup en Windows
      const psCommand = `
        $source = "${backupConfig.sourceDir}"
        $destination = "${backupPath}.zip"
        $exclude = @(${backupConfig.excludePatterns.map(p => `"${p}"`).join(', ')})
        
        # Crear archivo temporal con lista de archivos
        $tempFile = [System.IO.Path]::GetTempFileName()
        Get-ChildItem -Path $source -Recurse | Where-Object { 
          $item = $_
          $exclude | ForEach-Object { 
            if ($item.FullName -like "*$_*") { return $false }
          }
          return $true
        } | ForEach-Object { $_.FullName } | Out-File -FilePath $tempFile -Encoding UTF8
        
        # Crear ZIP
        Compress-Archive -Path (Get-Content $tempFile) -DestinationPath $destination -Force
        Remove-Item $tempFile
      `;
      
      execSync(`powershell -Command "${psCommand}"`, { stdio: 'inherit' });
    } else {
      // Usar tar en sistemas Unix
      execSync(`tar -czf "${backupPath}.tar.gz" ${excludeArgs} -C "${backupConfig.sourceDir}" .`, { stdio: 'inherit' });
    }
    
    console.log(`✅ Backup creado: ${backupName}`);
    
    // Limpiar backups antiguos
    cleanupOldBackups();
    
    // Crear script de restauración
    createRestoreScript(backupName);
    
    console.log('\n🎉 Backup automático completado exitosamente!');
    
  } catch (error) {
    console.error('❌ Error durante el backup:', error.message);
    process.exit(1);
  }
}

function cleanupOldBackups() {
  console.log('\n🧹 Limpiando backups antiguos...');
  
  try {
    const files = fs.readdirSync(backupConfig.backupDir)
      .filter(file => file.startsWith('backup-'))
      .map(file => ({
        name: file,
        path: path.join(backupConfig.backupDir, file),
        stats: fs.statSync(path.join(backupConfig.backupDir, file))
      }))
      .sort((a, b) => b.stats.mtime - a.stats.mtime);
    
    // Eliminar backups excedentes
    if (files.length > backupConfig.maxBackups) {
      const toDelete = files.slice(backupConfig.maxBackups);
      toDelete.forEach(file => {
        fs.unlinkSync(file.path);
        console.log(`🗑️ Eliminado backup antiguo: ${file.name}`);
      });
    }
    
    console.log(`📊 Total de backups mantenidos: ${Math.min(files.length, backupConfig.maxBackups)}`);
    
  } catch (error) {
    console.error('⚠️ Error limpiando backups antiguos:', error.message);
  }
}

function createRestoreScript(backupName) {
  const restoreScript = `#!/bin/bash
# Script de Restauración de Backup
# Generado automáticamente el ${new Date().toISOString()}

BACKUP_NAME="${backupName}"
BACKUP_DIR="${backupConfig.backupDir}"
SOURCE_DIR="${backupConfig.sourceDir}"

echo "🔄 Iniciando restauración desde backup: $BACKUP_NAME"

if [ ! -f "$BACKUP_DIR/$BACKUP_NAME.tar.gz" ]; then
    echo "❌ Backup no encontrado: $BACKUP_DIR/$BACKUP_NAME.tar.gz"
    exit 1
fi

echo "📦 Extrayendo backup..."
tar -xzf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$SOURCE_DIR"

echo "✅ Restauración completada exitosamente!"
echo "📁 Archivos restaurados en: $SOURCE_DIR"
`;

  const restoreScriptPath = path.join(backupConfig.backupDir, 'restore.sh');
  fs.writeFileSync(restoreScriptPath, restoreScript);
  fs.chmodSync(restoreScriptPath, '755');
  
  console.log(`📝 Script de restauración creado: ${restoreScriptPath}`);
}

function scheduleBackup() {
  console.log('\n⏰ Configurando backup automático...');
  
  const cronJob = `# Backup automático diario a las 2:00 AM
0 2 * * * cd ${backupConfig.sourceDir} && node scripts/backup-automation.js >> logs/backup.log 2>&1`;

  const cronFile = path.join(backupConfig.sourceDir, 'backup-cron.txt');
  fs.writeFileSync(cronFile, cronJob);
  
  console.log(`📅 Cron job configurado: ${cronFile}`);
  console.log('💡 Para activar el cron job, ejecuta: crontab backup-cron.txt');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createBackup();
  scheduleBackup();
}

module.exports = { createBackup, cleanupOldBackups };
