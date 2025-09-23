#!/usr/bin/env node

/**
 * Script de Respaldo Automático a Git
 * Combina backup local + push automático a repositorio remoto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuración del respaldo
const backupConfig = {
  sourceDir: process.cwd(),
  backupDir: path.join(process.cwd(), 'backups'),
  gitRemote: 'origin', // Cambiar por tu repositorio remoto
  gitBranch: 'main',
  maxBackups: 7,
  excludePatterns: [
    'node_modules',
    '.next',
    '.git',
    'backups',
    'test-results',
    '*.log',
    '.env',
    '*.env.local'
  ]
};

function createGitBackup() {
  console.log('🔄 Iniciando respaldo automático a Git...\n');
  
  try {
    // 1. Verificar que estamos en un repositorio Git
    if (!fs.existsSync(path.join(backupConfig.sourceDir, '.git'))) {
      console.log('📦 Inicializando repositorio Git...');
      execSync('git init', { stdio: 'inherit', cwd: backupConfig.sourceDir });
      
      // Crear .gitignore si no existe
      const gitignoreContent = `# Dependencies
node_modules/
.pnp
.pnp.js

# Production
.next/
out/
build/
dist/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# dotenv environment variables file
.env

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# Backup files
backups/*.zip
backups/*.tar.gz
!backups/.gitkeep

# Test results
test-results/

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db
`;
      
      fs.writeFileSync(path.join(backupConfig.sourceDir, '.gitignore'), gitignoreContent);
      console.log('✅ .gitignore creado');
    }

    // 2. Crear backup local
    console.log('📦 Creando backup local...');
    createLocalBackup();

    // 3. Agregar cambios a Git
    console.log('📝 Agregando cambios a Git...');
    execSync('git add .', { stdio: 'inherit', cwd: backupConfig.sourceDir });

    // 4. Verificar si hay cambios
    try {
      const status = execSync('git status --porcelain', { 
        encoding: 'utf8', 
        cwd: backupConfig.sourceDir 
      });
      
      if (!status.trim()) {
        console.log('ℹ️ No hay cambios nuevos para respaldar');
        return;
      }
    } catch (error) {
      console.log('⚠️ Error verificando estado de Git:', error.message);
    }

    // 5. Crear commit automático
    const timestamp = new Date().toISOString();
    const commitMessage = `🤖 Respaldo automático - ${timestamp}`;
    
    execSync(`git commit -m "${commitMessage}"`, { 
      stdio: 'inherit', 
      cwd: backupConfig.sourceDir 
    });

    // 6. Push a repositorio remoto (si existe)
    try {
      console.log('🌐 Enviando respaldo a repositorio remoto...');
      execSync(`git push ${backupConfig.gitRemote} ${backupConfig.gitBranch}`, { 
        stdio: 'inherit', 
        cwd: backupConfig.sourceDir 
      });
      console.log('✅ Respaldo enviado exitosamente a Git');
    } catch (error) {
      console.log('⚠️ No se pudo enviar a repositorio remoto:', error.message);
      console.log('💡 Configura un repositorio remoto con: git remote add origin <URL>');
    }

    console.log('\n🎉 Respaldo automático completado!');
    console.log('📊 Respaldo local + Git configurado correctamente');
    
  } catch (error) {
    console.error('❌ Error durante el respaldo:', error.message);
    process.exit(1);
  }
}

function createLocalBackup() {
  // Crear directorio de backups si no existe
  if (!fs.existsSync(backupConfig.backupDir)) {
    fs.mkdirSync(backupConfig.backupDir, { recursive: true });
    // Crear archivo .gitkeep para mantener el directorio en Git
    fs.writeFileSync(path.join(backupConfig.backupDir, '.gitkeep'), '');
  }
  
  // Generar nombre del backup con timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupName = `backup-${timestamp}`;
  const backupPath = path.join(backupConfig.backupDir, backupName);
  
  // Crear backup usando PowerShell en Windows
  if (process.platform === 'win32') {
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
    const excludeArgs = backupConfig.excludePatterns.map(pattern => `--exclude=${pattern}`).join(' ');
    execSync(`tar -czf "${backupPath}.tar.gz" ${excludeArgs} -C "${backupConfig.sourceDir}" .`, { stdio: 'inherit' });
  }
  
  console.log(`✅ Backup local creado: ${backupName}`);
  
  // Limpiar backups antiguos
  cleanupOldBackups();
}

function cleanupOldBackups() {
  console.log('🧹 Limpiando backups antiguos...');
  
  try {
    const files = fs.readdirSync(backupConfig.backupDir)
      .filter(file => file.startsWith('backup-') && (file.endsWith('.zip') || file.endsWith('.tar.gz')))
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

function setupGitRemote() {
  console.log('\n🔧 Configuración de repositorio remoto:');
  console.log('1. Crea un repositorio en GitHub/GitLab');
  console.log('2. Ejecuta: git remote add origin <URL_DEL_REPOSITORIO>');
  console.log('3. Ejecuta: git push -u origin main');
  console.log('\n💡 Ejemplo:');
  console.log('git remote add origin https://github.com/tu-usuario/mente-autonoma.git');
  console.log('git push -u origin main');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  createGitBackup();
  setupGitRemote();
}

module.exports = { createGitBackup, setupGitRemote };



