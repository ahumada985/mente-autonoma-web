@echo off
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
