@echo off
echo ========================================
echo    CHATBOT INTELIGENTE MENTE AUTONOMA
echo ========================================
echo.
echo Powered by OpenAI GPT-3.5-turbo
echo.
echo Iniciando Chat Web Inteligente...
start "Chat Web Inteligente" python chat_inteligente.py
timeout /t 3 /nobreak > nul
echo.
echo Iniciando Bot de Telegram Inteligente...
start "Bot Telegram Inteligente" python telegram_inteligente.py
timeout /t 3 /nobreak > nul
echo.
echo ========================================
echo    SERVICIOS INTELIGENTES INICIADOS
echo ========================================
echo.
echo 🌐 CHAT WEB: http://localhost:8000
echo 📱 BOT TELEGRAM: Activo con OpenAI
echo.
echo ¡Ahora puedes preguntar cualquier cosa!
echo - Clima en Antofagasta
echo - Noticias
echo - Información sobre la empresa
echo - Cualquier consulta
echo.
echo Presiona cualquier tecla para detener...
pause > nul
echo.
echo Deteniendo servicios...
taskkill /f /im python.exe > nul 2>&1
echo Servicios detenidos.
pause
