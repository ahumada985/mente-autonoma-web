Write-Host "🔧 DIAGNÓSTICO Y SOLUCIÓN DE DEPLOY EN VERCEL" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# 1. Verificar estado de Git
Write-Host "`n📋 Verificando estado de Git..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain
    if ($gitStatus) {
        Write-Host "📝 Cambios pendientes detectados:" -ForegroundColor Red
        Write-Host $gitStatus
    } else {
        Write-Host "✅ No hay cambios pendientes" -ForegroundColor Green
    }
} catch {
    Write-Host "❌ Error al verificar estado de Git: $($_.Exception.Message)" -ForegroundColor Red
}

# 2. Verificar configuración remota
Write-Host "`n🌐 Verificando configuración remota..." -ForegroundColor Yellow
try {
    $remoteUrl = git config --get remote.origin.url
    if ($remoteUrl) {
        Write-Host "✅ Repositorio remoto: $remoteUrl" -ForegroundColor Green
        if ($remoteUrl -like "*github.com*") {
            Write-Host "✅ Repositorio GitHub detectado" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Repositorio no es de GitHub" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ No se encontró repositorio remoto" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error al verificar repositorio remoto: $($_.Exception.Message)" -ForegroundColor Red
}

# 3. Verificar último commit
Write-Host "`n📋 Verificando último commit..." -ForegroundColor Yellow
try {
    $lastCommit = git log -1 --oneline
    Write-Host "✅ Último commit: $lastCommit" -ForegroundColor Green
} catch {
    Write-Host "❌ Error al obtener último commit: $($_.Exception.Message)" -ForegroundColor Red
}

# 4. Verificar archivos de configuración
Write-Host "`n🔧 Verificando archivos de configuración..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    Write-Host "✅ package.json encontrado" -ForegroundColor Green
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    Write-Host "📋 Scripts disponibles: $($packageJson.scripts.PSObject.Properties.Name -join ', ')" -ForegroundColor Cyan
} else {
    Write-Host "❌ No se encontró package.json" -ForegroundColor Red
}

if (Test-Path "next.config.ts") {
    Write-Host "✅ next.config.ts encontrado" -ForegroundColor Green
} elseif (Test-Path "next.config.js") {
    Write-Host "✅ next.config.js encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  No se encontró configuración de Next.js" -ForegroundColor Yellow
}

if (Test-Path ".env.local") {
    Write-Host "✅ .env.local encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  No se encontró .env.local" -ForegroundColor Yellow
}

# 5. Intentar hacer commit y push
Write-Host "`n🚀 Intentando hacer commit y push..." -ForegroundColor Yellow
try {
    Write-Host "📝 Agregando archivos..." -ForegroundColor Cyan
    git add .
    
    Write-Host "💾 Haciendo commit..." -ForegroundColor Cyan
    git commit -m "feat: Agregar Google Analytics y optimizar deploy"
    
    Write-Host "📤 Haciendo push..." -ForegroundColor Cyan
    git push origin main
    
    Write-Host "✅ Commit y push completados exitosamente" -ForegroundColor Green
} catch {
    Write-Host "❌ Error durante commit/push: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n🎯 SOLUCIONES RECOMENDADAS" -ForegroundColor Green
Write-Host "=========================" -ForegroundColor Green
Write-Host "1. Verificar que Vercel esté conectado al repositorio GitHub" -ForegroundColor White
Write-Host "2. Verificar que las variables de entorno estén configuradas en Vercel" -ForegroundColor White
Write-Host "3. Verificar que el build funcione localmente: npm run build" -ForegroundColor White
Write-Host "4. Revisar los logs de deploy en el dashboard de Vercel" -ForegroundColor White

