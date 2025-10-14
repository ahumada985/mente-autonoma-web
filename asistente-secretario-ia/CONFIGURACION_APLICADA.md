# ✅ Configuración Aplicada a n8n en Google Cloud

## 🔧 Variables de Entorno Configuradas

```bash
N8N_HOST=0.0.0.0              # Escucha en todas las interfaces
N8N_PORT=5678                  # Puerto de acceso
N8N_SECURE_COOKIE=false        # Permite acceso sin HTTPS
```

## 📋 Script de Auto-Inicio

La VM ejecuta automáticamente al arranque:

```bash
#!/bin/bash
cd /home/ahumada_gb85
export N8N_HOST=0.0.0.0
export N8N_PORT=5678
export N8N_SECURE_COOKIE=false
npx n8n start &
```

## 🌐 Reglas de Firewall

✅ **allow-n8n** (Puerto 5678)
- Permite: TCP 5678
- Origen: 0.0.0.0/0 (Todo internet)
- Descripción: Allow n8n access

✅ **allow-ssh** (Puerto 22)
- Permite: TCP 22
- Origen: 0.0.0.0/0
- Descripción: Allow SSH access

## 🔗 URLs de Acceso

- **Dashboard n8n:** http://34.176.242.21:5678
- **Webhook Base:** http://34.176.242.21:5678/webhook/
- **Workflow Telegram:** http://34.176.242.21:5678/webhook/asistente-clean

## ⚙️ Información de la VM

- **Proyecto:** mente-autonoma
- **Nombre:** n8n-server
- **Zona:** southamerica-west1-b
- **IP Externa:** 34.176.242.21
- **Tipo:** e2-micro
- **Estado:** RUNNING

## 🚨 Nota de Seguridad

⚠️ **N8N_SECURE_COOKIE=false** está configurado para permitir acceso HTTP.

**Para producción, se recomienda:**

### Opción 1: Configurar HTTPS con Certificado SSL (Recomendado)

```bash
# Instalar Nginx
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx

# Configurar dominio (ej: n8n.menteautonoma.cl)
# Obtener certificado SSL gratis con Let's Encrypt
sudo certbot --nginx -d n8n.menteautonoma.cl

# Nginx como proxy reverso a n8n
```

**Nginx config:**
```nginx
server {
    listen 80;
    server_name n8n.menteautonoma.cl;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name n8n.menteautonoma.cl;

    ssl_certificate /etc/letsencrypt/live/n8n.menteautonoma.cl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/n8n.menteautonoma.cl/privkey.pem;

    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Opción 2: Túnel SSH Local (Desarrollo)

```bash
# Desde tu PC
gcloud compute ssh n8n-server \
  --zone=southamerica-west1-b \
  --project=mente-autonoma \
  -- -L 5678:localhost:5678

# Luego acceder a: http://localhost:5678
```

### Opción 3: Basic Auth (Temporal)

```bash
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=admin
export N8N_BASIC_AUTH_PASSWORD=tu_password_seguro
```

## 🔄 Comandos Útiles

### Ver logs de n8n
```bash
gcloud compute ssh n8n-server --zone=southamerica-west1-b
journalctl -f | grep n8n
```

### Reiniciar n8n
```bash
gcloud compute instances reset n8n-server \
  --zone=southamerica-west1-b \
  --project=mente-autonoma
```

### Detener n8n
```bash
gcloud compute instances stop n8n-server \
  --zone=southamerica-west1-b \
  --project=mente-autonoma
```

### Iniciar n8n
```bash
gcloud compute instances start n8n-server \
  --zone=southamerica-west1-b \
  --project=mente-autonoma
```

## 📊 Próximos Pasos

1. ✅ Acceder a http://34.176.242.21:5678
2. ⬜ Importar workflow desde `asistente-secretario-ia/workflows/`
3. ⬜ Configurar credenciales (si es necesario)
4. ⬜ Activar workflow
5. ⬜ Configurar webhook en Telegram
6. ⬜ (Opcional) Configurar HTTPS con dominio custom

## ⚡ Estado Actual

- ✅ Firewall configurado
- ✅ n8n instalado
- ✅ Auto-inicio configurado
- ✅ Secure cookie deshabilitada
- ⬜ HTTPS (pendiente)
- ⬜ Basic Auth (pendiente)

---

**Última actualización:** 2025-10-04
**Configurado por:** Claude Code
