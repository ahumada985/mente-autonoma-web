# 🚀 Instrucciones para Iniciar n8n

## ⚠️ Problema de Configuración Detectado

Existe un conflicto con la configuración previa de n8n. Sigue estos pasos para solucionarlo:

## 📋 Pasos para Iniciar n8n

### 1. Limpiar Configuración Previa (OBLIGATORIO)

Abre el **Explorador de Archivos** y navega a:
```
C:\Users\usuario\.n8n
```

**Elimina completamente esta carpeta** si existe.

### 2. Iniciar n8n Manualmente

Abre una **nueva terminal** (PowerShell o CMD) y ejecuta:

```bash
cd "C:\Users\usuario\Desktop\Proyectos_IA\Oficial_MA\mente-autonoma-web\asistente-secretario-ia"
```

```bash
npx n8n start
```

### 3. Primera Configuración

1. **Abre tu navegador** y ve a: `http://localhost:5678`

2. **Crea tu cuenta de administrador** (primera vez):
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Contraseña: (elige una segura)

3. **Importar el Workflow**:
   - Ve a la pestaña "Workflows"
   - Haz clic en "Import from file"
   - Selecciona: `workflows/telegram-assistant.json`

### 4. Configurar Credenciales

#### A. Telegram Bot Token
1. Ve a "Credentials" en n8n
2. Crea nueva credencial tipo "Telegram"
3. Agrega tu bot token de Telegram

#### B. OpenAI API Key
1. Ve a "Credentials" en n8n
2. Crea nueva credencial tipo "OpenAI"
3. Agrega tu API key de OpenAI

### 5. Activar el Workflow

1. Abre el workflow importado
2. Haz clic en "Activate" (interruptor en la esquina superior derecha)
3. El workflow debe mostrar status "Active"

### 6. Configurar Webhook de Telegram

En una nueva terminal, ejecuta (reemplaza TU_BOT_TOKEN):

```bash
curl -X POST "https://api.telegram.org/botTU_BOT_TOKEN/setWebhook" -H "Content-Type: application/json" -d "{\"url\":\"http://localhost:5678/webhook/telegram\"}"
```

## 🎯 Verificar que Funciona

1. **n8n debe estar en**: `http://localhost:5678`
2. **Workflow debe estar**: "Active"
3. **Webhook debe estar configurado** en Telegram
4. **Envía un mensaje** a tu bot para probar

## 🔧 Solución de Problemas

### Si n8n no inicia:
```bash
# Limpiar cache de npm
npm cache clean --force

# Intentar con puerto diferente
npx n8n start --port 5679
```

### Si el workflow da errores:
1. Verifica que las credenciales estén configuradas
2. Asegúrate de que el webhook URL sea correcto
3. Revisa los logs en n8n

## 📞 URLs Importantes

- **n8n Interface**: http://localhost:5678
- **Webhook URL**: http://localhost:5678/webhook/telegram
- **Documentación**: https://docs.n8n.io

## ✅ Lista de Verificación

- [ ] Carpeta .n8n eliminada
- [ ] n8n iniciado correctamente
- [ ] Cuenta de administrador creada
- [ ] Workflow importado
- [ ] Credenciales configuradas
- [ ] Workflow activado
- [ ] Webhook de Telegram configurado
- [ ] Bot responde a mensajes

¡Una vez completados estos pasos, tu asistente secretario IA estará funcionando! 🤖