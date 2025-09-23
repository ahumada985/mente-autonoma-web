@echo off
REM Script para configurar reportes semanales automáticos en Windows

echo 📊 Configurando reportes semanales automáticos...

REM Crear directorio de logs si no existe
if not exist "logs" mkdir logs

REM Obtener la ruta actual del proyecto
set "PROJECT_PATH=%~dp0.."
set "SCRIPT_PATH=%PROJECT_PATH%\scripts\weekly-reports-automation.js"
set "LOG_PATH=%PROJECT_PATH%\logs\weekly-reports.log"

echo 📁 Ruta del proyecto: %PROJECT_PATH%
echo 📄 Script: %SCRIPT_PATH%
echo 📋 Log: %LOG_PATH%

REM Verificar que Node.js esté instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado. Instálalo desde https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js encontrado

REM Probar el script manualmente
echo 🧪 Probando el script...
cd /d "%PROJECT_PATH%"
node "%SCRIPT_PATH%"

if errorlevel 1 (
    echo ❌ Error ejecutando el script. Revisa la configuración.
    pause
    exit /b 1
)

echo ✅ Script probado exitosamente

REM Crear tarea programada para Windows
echo 📅 Configurando tarea programada (cada lunes a las 9:00 AM)...

schtasks /create ^
    /tn "Reportes Semanales Chatbot" ^
    /tr "cmd /c cd /d \"%PROJECT_PATH%\" && node \"%SCRIPT_PATH%\" >> \"%LOG_PATH%\" 2>&1" ^
    /sc weekly ^
    /d MON ^
    /st 09:00 ^
    /f

if errorlevel 1 (
    echo ❌ Error creando tarea programada. Ejecuta como administrador.
    pause
    exit /b 1
)

echo ✅ Tarea programada creada exitosamente

echo.
echo 🎉 CONFIGURACIÓN COMPLETA
echo.
echo 📅 Los reportes se enviarán automáticamente cada LUNES a las 9:00 AM
echo 📋 Logs en: %LOG_PATH%
echo 🔧 Para ver/editar la tarea: taskschd.msc
echo.
echo 🧪 COMANDOS ÚTILES:
echo    Ejecutar ahora: node "%SCRIPT_PATH%"
echo    Ver tareas: schtasks /query /tn "Reportes Semanales Chatbot"
echo    Eliminar tarea: schtasks /delete /tn "Reportes Semanales Chatbot" /f
echo.

pause