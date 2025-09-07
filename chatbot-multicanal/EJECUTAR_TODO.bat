@echo off
echo ========================================
echo    CHATBOT MENTE AUTONOMA
echo ========================================
echo.
echo Iniciando Chat Web...
start "Chat Web" python run_chat.py
timeout /t 3 /nobreak > nul
echo.
echo Iniciando Bot de Telegram...
start "Bot Telegram" python run_telegram.py
timeout /t 3 /nobreak > nul
echo.
echo ========================================
echo    SERVICIOS INICIADOS
echo ========================================
echo.
echo 🌐 CHAT WEB: http://localhost:8000
echo 📱 BOT TELEGRAM: Activo
echo.
echo Presiona cualquier tecla para detener...
pause > nul
echo.
echo Deteniendo servicios...
taskkill /f /im python.exe > nul 2>&1
echo Servicios detenidos.
pause
