# Configuración en Google Cloud

## 1. Crear proyecto en Google Cloud
- Ve a: https://console.cloud.google.com/
- Crea nuevo proyecto: "chatbot-multicanal"
- Habilita Cloud Run API

## 2. Crear Dockerfile
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "telegram_real.py"]
```

## 3. Desplegar en Cloud Run
```bash
# Instalar Google Cloud CLI
gcloud auth login
gcloud config set project tu-proyecto-id

# Construir y desplegar
gcloud run deploy chatbot-telegram \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

## 4. Configurar variables de entorno
- En Cloud Run Console
- Agregar todas las variables necesarias
- OPENAI_API_KEY, TELEGRAM_BOT_TOKEN, etc.

## 5. Costos
- **Gratis:** 2 millones de requests/mes
- **Pago:** $0.40 por millón de requests adicionales
- **Muy económico** para chatbots

## 6. Ventajas
- ✅ Escalable automáticamente
- ✅ Solo pagas por uso
- ✅ Muy confiable
- ✅ Integración con Google Cloud
