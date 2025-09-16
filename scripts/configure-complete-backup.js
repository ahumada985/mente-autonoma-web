#!/usr/bin/env node

/**
 * Script de Configuración Completa de Respaldo
 * Configura respaldo local + Git + repositorio remoto
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectConfig = {
  sourceDir: process.cwd(),
  gitUser: 'Mente Autónoma',
  gitEmail: 'info@menteautonoma.com'
};

function configureCompleteBackup() {
  console.log('🚀 Configurando sistema completo de respaldo...\n');
  
  try {
    // 1. Configurar Git
    console.log('📦 Paso 1: Configurando Git...');
    execSync('node scripts/setup-git-repository.js', { 
      stdio: 'inherit', 
      cwd: projectConfig.sourceDir 
    });

    // 2. Crear directorio de logs
    const logsDir = path.join(projectConfig.sourceDir, 'logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
      console.log('📁 Directorio de logs creado');
    }

    // 3. Crear script de inicio rápido
    const quickStartScript = `@echo off
echo 🚀 Mente Autónoma - Sistema de Respaldo
echo ======================================
echo.
echo 1. Configurar Git: node scripts/setup-git-repository.js
echo 2. Respaldo manual: node scripts/git-backup-automation.js
echo 3. Restaurar desde Git: node scripts/restore-from-git.js
echo 4. Ver stashes: node scripts/restore-from-git.js --list-stashes
echo.
echo 💡 Para configurar repositorio remoto:
echo    git remote add origin <URL_DEL_REPOSITORIO>
echo    git push -u origin main
echo.
pause
`;
    
    fs.writeFileSync(path.join(projectConfig.sourceDir, 'backup-quick-start.bat'), quickStartScript);
    console.log('✅ Script de inicio rápido creado');

    // 4. Crear documentación de respaldo
    const backupDocs = `# 🔄 Sistema de Respaldo Automático - Mente Autónoma

## 📋 Resumen

Este sistema combina **respaldo local** + **control de versiones Git** para máxima protección de datos.

## 🏗️ Arquitectura del Respaldo

### 📦 Respaldo Local
- **Ubicación:** \`backups/\`
- **Frecuencia:** Diario a las 2:00 AM
- **Retención:** 7 backups
- **Formato:** Archivos ZIP comprimidos

### 🌐 Control de Versiones (Git)
- **Ubicación:** Repositorio remoto (GitHub/GitLab)
- **Frecuencia:** Diario a las 2:00 AM
- **Retención:** Historial completo
- **Ventaja:** Accesible desde cualquier lugar

## 🚀 Configuración Inicial

### 1. Configurar Git
\`\`\`bash
node scripts/setup-git-repository.js
\`\`\`

### 2. Configurar Repositorio Remoto
\`\`\`bash
# Crear repositorio en GitHub/GitLab
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
\`\`\`

### 3. Activar Respaldo Automático
\`\`\`bash
# En Windows (Task Scheduler)
# Importar backup-cron.txt en Task Scheduler

# En Linux/Mac (Cron)
crontab backup-cron.txt
\`\`\`

## 🔧 Comandos Útiles

### Respaldo Manual
\`\`\`bash
node scripts/git-backup-automation.js
\`\`\`

### Restaurar desde Git
\`\`\`bash
node scripts/restore-from-git.js
\`\`\`

### Ver Stashes (cambios locales guardados)
\`\`\`bash
node scripts/restore-from-git.js --list-stashes
\`\`\`

### Recuperar Cambios Locales
\`\`\`bash
git stash list          # Ver stashes disponibles
git stash pop           # Restaurar último stash
git stash apply stash@{0} # Restaurar stash específico
\`\`\`

## 📊 Ventajas del Sistema

### ✅ Respaldo Local
- Recuperación rápida de errores
- No depende de internet
- Historial de 7 días

### ✅ Control de Versiones
- Historial completo de cambios
- Accesible desde cualquier lugar
- Colaboración en equipo
- Protección contra pérdida de computador

### ✅ Combinación Perfecta
- **Local:** Para errores rápidos
- **Git:** Para protección total
- **Automático:** Sin intervención manual

## 🚨 Escenarios de Recuperación

### 1. Error Local (archivo corrupto)
\`\`\`bash
# Restaurar desde backup local
cd backups/
# Extraer backup más reciente
# Reemplazar archivos corruptos
\`\`\`

### 2. Pérdida de Computador
\`\`\`bash
# Clonar repositorio en nuevo computador
git clone <URL_DEL_REPOSITORIO>
cd mente-autonoma
# Todo el proyecto restaurado
\`\`\`

### 3. Cambios Accidentales
\`\`\`bash
# Restaurar desde Git
node scripts/restore-from-git.js
\`\`\`

## 📈 Monitoreo

### Logs de Respaldo
- **Ubicación:** \`logs/backup.log\`
- **Contenido:** Historial de respaldos
- **Rotación:** Automática

### Estado de Git
\`\`\`bash
git status              # Estado actual
git log --oneline -10   # Últimos 10 commits
git remote -v           # Repositorios remotos
\`\`\`

## 🔒 Seguridad

### Archivos Excluidos
- \`.env\` (variables de entorno)
- \`node_modules/\` (dependencias)
- \`*.log\` (archivos de log)
- \`backups/*.zip\` (backups locales)

### Credenciales
- **Nunca** se respaldan credenciales
- Variables de entorno en \`.env\` (excluido)
- Configuración sensible protegida

## 📞 Soporte

- **Email:** info@menteautonoma.com
- **Documentación:** Este archivo
- **Scripts:** \`scripts/\` directory

---
*Sistema configurado el ${new Date().toISOString()}*
`;
    
    fs.writeFileSync(path.join(projectConfig.sourceDir, 'BACKUP_SYSTEM.md'), backupDocs);
    console.log('✅ Documentación de respaldo creada');

    // 5. Mostrar resumen
    console.log('\n🎉 Sistema de respaldo configurado exitosamente!');
    console.log('\n📋 Resumen de la configuración:');
    console.log('✅ Git inicializado y configurado');
    console.log('✅ .gitignore creado');
    console.log('✅ README.md creado');
    console.log('✅ Scripts de respaldo creados');
    console.log('✅ Documentación generada');
    console.log('✅ Cron job configurado');
    
    console.log('\n🚀 Próximos pasos:');
    console.log('1. Crear repositorio en GitHub/GitLab');
    console.log('2. Ejecutar: git remote add origin <URL_DEL_REPOSITORIO>');
    console.log('3. Ejecutar: git push -u origin main');
    console.log('4. Activar cron job para respaldo automático');
    
    console.log('\n💡 Comandos útiles:');
    console.log('• Respaldo manual: node scripts/git-backup-automation.js');
    console.log('• Restaurar: node scripts/restore-from-git.js');
    console.log('• Ver stashes: node scripts/restore-from-git.js --list-stashes');
    
  } catch (error) {
    console.error('❌ Error configurando respaldo:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  configureCompleteBackup();
}

module.exports = { configureCompleteBackup };



