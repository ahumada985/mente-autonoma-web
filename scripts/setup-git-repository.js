#!/usr/bin/env node

/**
 * Script para configurar repositorio Git
 * Configura Git y repositorio remoto para respaldo automático
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectConfig = {
  sourceDir: process.cwd(),
  gitUser: 'Mente Autónoma',
  gitEmail: 'info@menteautonoma.com'
};

function setupGitRepository() {
  console.log('🔧 Configurando repositorio Git para respaldo automático...\n');
  
  try {
    // 1. Verificar si ya es un repositorio Git
    if (fs.existsSync(path.join(projectConfig.sourceDir, '.git'))) {
      console.log('✅ Repositorio Git ya existe');
    } else {
      console.log('📦 Inicializando repositorio Git...');
      execSync('git init', { stdio: 'inherit', cwd: projectConfig.sourceDir });
    }

    // 2. Configurar usuario Git
    console.log('👤 Configurando usuario Git...');
    execSync(`git config user.name "${projectConfig.gitUser}"`, { 
      stdio: 'inherit', 
      cwd: projectConfig.sourceDir 
    });
    execSync(`git config user.email "${projectConfig.gitEmail}"`, { 
      stdio: 'inherit', 
      cwd: projectConfig.sourceDir 
    });

    // 3. Crear .gitignore si no existe
    const gitignorePath = path.join(projectConfig.sourceDir, '.gitignore');
    if (!fs.existsSync(gitignorePath)) {
      console.log('📝 Creando .gitignore...');
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

# n8n specific
n8n-data/
*.sqlite
*.db

# Python specific
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
venv/
ENV/
env.bak/
venv.bak/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Temporary files
*.tmp
*.temp
`;
      
      fs.writeFileSync(gitignorePath, gitignoreContent);
      console.log('✅ .gitignore creado');
    } else {
      console.log('✅ .gitignore ya existe');
    }

    // 4. Crear README.md si no existe
    const readmePath = path.join(projectConfig.sourceDir, 'README.md');
    if (!fs.existsSync(readmePath)) {
      console.log('📖 Creando README.md...');
      const readmeContent = `# Mente Autónoma - Proyectos IA

Este repositorio contiene todos los proyectos de Mente Autónoma:

## 📁 Estructura de Proyectos

### 🤖 Asistente Secretario IA
- **Ubicación:** \`asistente-secretario-ia/\`
- **Descripción:** Asistente inteligente con n8n para gestión de calendario y listas
- **Estado:** ✅ Completado
- **Funcionalidades:** WhatsApp, Telegram, Google Calendar, OpenAI

### 💬 Chatbot Demo
- **Ubicación:** \`chatbot-multicanal/\`
- **Descripción:** Sistema de chatbot multicanal
- **Estado:** ✅ Completado

## 🔄 Respaldo Automático

Este repositorio se respalda automáticamente:
- **Frecuencia:** Diario a las 2:00 AM
- **Método:** Backup local + Push a Git
- **Retención:** 7 backups locales + historial completo en Git

## 🚀 Instalación

\`\`\`bash
# Clonar repositorio
git clone <URL_DEL_REPOSITORIO>
cd mente-autonoma

# Instalar dependencias del asistente
cd asistente-secretario-ia
npm install

# Configurar variables de entorno
cp n8n.env.example n8n.env
# Editar n8n.env con tus credenciales

# Iniciar asistente
npm start
\`\`\`

## 📞 Contacto

- **Email:** info@menteautonoma.com
- **Sitio Web:** https://menteautonoma.com

---
*Respaldo automático generado el ${new Date().toISOString()}*
`;
      
      fs.writeFileSync(readmePath, readmeContent);
      console.log('✅ README.md creado');
    } else {
      console.log('✅ README.md ya existe');
    }

    // 5. Hacer commit inicial
    console.log('📝 Creando commit inicial...');
    execSync('git add .', { stdio: 'inherit', cwd: projectConfig.sourceDir });
    execSync('git commit -m "🚀 Commit inicial - Configuración de respaldo automático"', { 
      stdio: 'inherit', 
      cwd: projectConfig.sourceDir 
    });

    console.log('\n🎉 Repositorio Git configurado exitosamente!');
    console.log('\n📋 Próximos pasos:');
    console.log('1. Crea un repositorio en GitHub/GitLab');
    console.log('2. Ejecuta: git remote add origin <URL_DEL_REPOSITORIO>');
    console.log('3. Ejecuta: git push -u origin main');
    console.log('\n💡 Ejemplo:');
    console.log('git remote add origin https://github.com/tu-usuario/mente-autonoma.git');
    console.log('git push -u origin main');
    
  } catch (error) {
    console.error('❌ Error configurando Git:', error.message);
    process.exit(1);
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  setupGitRepository();
}

module.exports = { setupGitRepository };



