# 🔄 Sistema de Respaldo Automático - Mente Autónoma

## 📋 Resumen

Este sistema combina **respaldo local** + **control de versiones Git** para máxima protección de datos.

## 🏗️ Arquitectura del Respaldo

### 📦 Respaldo Local
- **Ubicación:** `backups/`
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
```bash
node scripts/setup-git-repository.js
```

### 2. Configurar Repositorio Remoto
```bash
# Crear repositorio en GitHub/GitLab
git remote add origin <URL_DEL_REPOSITORIO>
git push -u origin main
```

### 3. Activar Respaldo Automático
```bash
# En Windows (Task Scheduler)
# Importar backup-cron.txt en Task Scheduler

# En Linux/Mac (Cron)
crontab backup-cron.txt
```

## 🔧 Comandos Útiles

### Respaldo Manual
```bash
node scripts/git-backup-automation.js
```

### Restaurar desde Git
```bash
node scripts/restore-from-git.js
```

### Ver Stashes (cambios locales guardados)
```bash
node scripts/restore-from-git.js --list-stashes
```

### Recuperar Cambios Locales
```bash
git stash list          # Ver stashes disponibles
git stash pop           # Restaurar último stash
git stash apply stash@{0} # Restaurar stash específico
```

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
```bash
# Restaurar desde backup local
cd backups/
# Extraer backup más reciente
# Reemplazar archivos corruptos
```

### 2. Pérdida de Computador
```bash
# Clonar repositorio en nuevo computador
git clone <URL_DEL_REPOSITORIO>
cd mente-autonoma
# Todo el proyecto restaurado
```

### 3. Cambios Accidentales
```bash
# Restaurar desde Git
node scripts/restore-from-git.js
```

## 📈 Monitoreo

### Logs de Respaldo
- **Ubicación:** `logs/backup.log`
- **Contenido:** Historial de respaldos
- **Rotación:** Automática

### Estado de Git
```bash
git status              # Estado actual
git log --oneline -10   # Últimos 10 commits
git remote -v           # Repositorios remotos
```

## 🔒 Seguridad

### Archivos Excluidos
- `.env` (variables de entorno)
- `node_modules/` (dependencias)
- `*.log` (archivos de log)
- `backups/*.zip` (backups locales)

### Credenciales
- **Nunca** se respaldan credenciales
- Variables de entorno en `.env` (excluido)
- Configuración sensible protegida

## 📞 Soporte

- **Email:** info@menteautonoma.com
- **Documentación:** Este archivo
- **Scripts:** `scripts/` directory

---
*Sistema configurado el 2025-09-16T04:24:56.249Z*
