# Configuración en Heroku

## 1. Crear cuenta en Heroku
- Ve a: https://heroku.com/
- Crea nueva app: "chatbot-multicanal"

## 2. Instalar Heroku CLI
```bash
# Windows
winget install Heroku.HerokuCLI

# O descargar desde: https://devcenter.heroku.com/articles/heroku-cli
```

## 3. Deploy desde GitHub
```bash
heroku login
heroku git:remote -a chatbot-multicanal
git push heroku main
```

## 4. Configurar variables de entorno
```bash
heroku config:set OPENAI_API_KEY=sk-...
heroku config:set TELEGRAM_BOT_TOKEN=7753848250:AAFdSOS4j...
heroku config:set LANGSMITH_API_KEY=ls__...
heroku config:set EMAIL_USER=ahumada.gb85@gmail.com
heroku config:set EMAIL_PASS=abcd efgh ijkl mnop
```

## 5. Costos
- **Gratis:** 550 horas/mes (limitado)
- **Pago:** $7/mes por dyno básico
- **Económico** para empezar

## 6. Ventajas
- ✅ Muy estable
- ✅ Fácil de usar
- ✅ Buena documentación
- ✅ Escalable
