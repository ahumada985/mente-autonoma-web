const { execSync } = require('child_process');
const fs = require('fs');

console.log('🔧 DIAGNÓSTICO Y SOLUCIÓN DE DEPLOY EN VERCEL');
console.log('================================================');

// 1. Verificar si es un repositorio Git
try {
  const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
  console.log('✅ Repositorio Git detectado');
  
  // 2. Verificar cambios pendientes
  if (gitStatus.trim()) {
    console.log('📝 Cambios pendientes detectados:');
    console.log(gitStatus);
  } else {
    console.log('✅ No hay cambios pendientes');
  }
  
  // 3. Verificar configuración remota
  try {
    const remoteUrl = execSync('git config --get remote.origin.url', { encoding: 'utf8' }).trim();
    console.log('🌐 Repositorio remoto:', remoteUrl);
    
    if (remoteUrl.includes('github.com')) {
      console.log('✅ Repositorio GitHub detectado');
    } else {
      console.log('⚠️  Repositorio no es de GitHub');
    }
  } catch (error) {
    console.log('❌ No se pudo obtener URL remota:', error.message);
  }
  
  // 4. Verificar última commit
  try {
    const lastCommit = execSync('git log -1 --oneline', { encoding: 'utf8' }).trim();
    console.log('📋 Último commit:', lastCommit);
  } catch (error) {
    console.log('❌ Error al obtener último commit:', error.message);
  }
  
  // 5. Verificar si hay cambios sin commitear
  try {
    const diff = execSync('git diff --name-only', { encoding: 'utf8' }).trim();
    if (diff) {
      console.log('📝 Archivos modificados sin commitear:');
      console.log(diff);
    } else {
      console.log('✅ No hay archivos modificados sin commitear');
    }
  } catch (error) {
    console.log('❌ Error al verificar cambios:', error.message);
  }
  
} catch (error) {
  console.log('❌ No es un repositorio Git válido:', error.message);
}

// 6. Verificar configuración de Vercel
console.log('\n🔧 VERIFICANDO CONFIGURACIÓN DE VERCEL');
console.log('=====================================');

// Verificar si existe vercel.json
if (fs.existsSync('vercel.json')) {
  console.log('✅ Archivo vercel.json encontrado');
  const vercelConfig = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  console.log('📋 Configuración Vercel:', JSON.stringify(vercelConfig, null, 2));
} else {
  console.log('⚠️  No se encontró vercel.json');
}

// Verificar package.json
if (fs.existsSync('package.json')) {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log('✅ package.json encontrado');
  console.log('📋 Scripts disponibles:', Object.keys(packageJson.scripts || {}));
  
  // Verificar script de build
  if (packageJson.scripts && packageJson.scripts.build) {
    console.log('✅ Script de build encontrado:', packageJson.scripts.build);
  } else {
    console.log('❌ No se encontró script de build');
  }
} else {
  console.log('❌ No se encontró package.json');
}

// 7. Verificar archivos de configuración Next.js
console.log('\n🔧 VERIFICANDO CONFIGURACIÓN NEXT.JS');
console.log('===================================');

if (fs.existsSync('next.config.ts')) {
  console.log('✅ next.config.ts encontrado');
} else if (fs.existsSync('next.config.js')) {
  console.log('✅ next.config.js encontrado');
} else {
  console.log('⚠️  No se encontró configuración de Next.js');
}

// 8. Verificar variables de entorno
console.log('\n🔧 VERIFICANDO VARIABLES DE ENTORNO');
console.log('===================================');

if (fs.existsSync('.env.local')) {
  console.log('✅ .env.local encontrado');
} else {
  console.log('⚠️  No se encontró .env.local');
}

if (fs.existsSync('.env.example')) {
  console.log('✅ .env.example encontrado');
} else {
  console.log('⚠️  No se encontró .env.example');
}

console.log('\n🚀 SOLUCIONES RECOMENDADAS');
console.log('==========================');
console.log('1. Si hay cambios pendientes, hacer commit y push');
console.log('2. Verificar que el repositorio esté conectado a GitHub');
console.log('3. Verificar que Vercel esté conectado al repositorio');
console.log('4. Verificar que las variables de entorno estén configuradas en Vercel');
console.log('5. Verificar que el build funcione localmente: npm run build');

