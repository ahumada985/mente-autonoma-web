@echo off
echo ========================================
echo    CHATBOT REAL MENTE AUTONOMA
echo ========================================
echo.
echo Powered by LangChain + OpenAI GPT-4
echo Base de conocimientos vectorial
echo Memoria persistente
echo.
echo Iniciando Chat Web Real...
start "Chat Web Real" python chat_real.py
timeout /t 3 /nobreak > nul
echo.
echo Iniciando Bot de Telegram Real...
start "Bot Telegram Real" python telegram_real.py
timeout /t 3 /nobreak > nul
echo.
echo ========================================
echo    SISTEMA REAL INICIADO
echo ========================================
echo.
echo 🌐 CHAT WEB: http://localhost:8000
echo 📱 BOT TELEGRAM: Activo con LangChain
echo.
echo 🚀 CARACTERÍSTICAS:
echo ✅ Memoria persistente
echo ✅ Base de conocimientos
echo ✅ Herramientas inteligentes
echo ✅ Historial completo
echo ✅ Respuestas contextuales
echo.
echo Presiona cualquier tecla para detener...
pause > nul
echo.
echo Deteniendo servicios...
taskkill /f /im python.exe > nul 2>&1
echo Servicios detenidos.
pause
