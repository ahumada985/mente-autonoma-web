# 🔐 Cómo Acceder a n8n en Google Cloud

## 🌐 Paso 1: Encontrar la URL

### Opción A: Google Cloud Console
1. Ve a: https://console.cloud.google.com
2. Busca tu proyecto
3. Menú lateral → **Compute Engine** → **Instancias de VM**
   - Busca la VM donde está n8n
   - Copia la **IP Externa**
   - Tu URL será: `http://[IP-EXTERNA]:5678`

### Opción B: Cloud Run (si usaste Cloud Run)
1. Ve a: https://console.cloud.google.com/run
2. Busca tu servicio n8n
3. Copia la URL del servicio
   - Formato: `https://n8n-XXXXX-uc.a.run.app`

### Opción C: App Engine (si usaste App Engine)
1. Ve a: https://console.cloud.google.com/appengine
2. Tu URL será: `https://[TU-PROYECTO].appspot.com`

### Opción D: Kubernetes (GKE)
1. Ve a: https://console.cloud.google.com/kubernetes
2. Servicios y entradas → Busca n8n
3. Copia el punto de entrada (Ingress)

---

## 🔑 Paso 2: Credenciales de Acceso

### Si activaste autenticación básica:
```
Usuario: admin (o el que configuraste)
Contraseña: [tu contraseña]
```

### Si NO hay autenticación:
- Solo necesitas la URL, acceso directo

---

## 🚀 Paso 3: Acceso Rápido

### Comando gcloud (Terminal)
```bash
# Listar instancias
gcloud compute instances list

# Ver detalles de tu instancia n8n
gcloud compute instances describe [NOMBRE-INSTANCIA] --zone=[ZONA]

# Ver IP Externa
gcloud compute instances describe [NOMBRE-INSTANCIA] \
  --zone=[ZONA] \
  --format="get(networkInterfaces[0].accessConfigs[0].natIP)"
```

### Ver servicios activos
```bash
# Si usaste Cloud Run
gcloud run services list

# Si usaste App Engine
gcloud app browse
```

---

## 🔍 Encontrar Proyecto ID

```bash
# Listar proyectos
gcloud projects list

# Ver proyecto actual
gcloud config get-value project
```

---

## 📝 URLs Comunes

Según tu configuración, tu n8n probablemente está en:

- **IP Pública:** `http://[TU-IP]:5678`
- **Dominio custom:** `https://n8n.tu-dominio.com`
- **Cloud Run:** `https://n8n-xxxxx-uc.a.run.app`
- **Localhost (solo desarrollo):** `http://localhost:5678`

---

## 🛠️ Solución Rápida

### 1. Busca en tu historial de navegador:
- Chrome: `Ctrl + H` → Busca "n8n" o "5678"

### 2. Revisa emails de Google Cloud:
- Busca emails con "deployed" o "n8n"
- Pueden tener la URL del servicio

### 3. Verifica facturación de Google Cloud:
- Ve a: https://console.cloud.google.com/billing
- Servicios activos → Busca Compute Engine o Cloud Run
- Clic en detalles → Ver recursos

---

## 🔐 Resetear Contraseña (si la olvidaste)

### Si tienes acceso SSH a la VM:
```bash
# Conectar a la VM
gcloud compute ssh [NOMBRE-INSTANCIA] --zone=[ZONA]

# Dentro de la VM, buscar n8n
pm2 list  # si usas PM2
docker ps  # si usas Docker
systemctl status n8n  # si usas systemd

# Ver configuración
cat ~/.n8n/config
```

### Variables de entorno importantes:
```bash
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=tu_password
```

---

## 📞 Comandos Útiles

### Verificar si n8n está corriendo:
```bash
# En la VM
curl http://localhost:5678

# Ver logs
journalctl -u n8n -f  # systemd
pm2 logs n8n  # PM2
docker logs [CONTAINER_ID]  # Docker
```

### Reiniciar n8n:
```bash
pm2 restart n8n  # PM2
systemctl restart n8n  # systemd
docker restart [CONTAINER_ID]  # Docker
```

---

## 🎯 Checklist Rápido

- [ ] Ir a: https://console.cloud.google.com
- [ ] Verificar Compute Engine → Instancias de VM
- [ ] Copiar IP Externa
- [ ] Probar: `http://[IP]:5678`
- [ ] Si no funciona, verificar Cloud Run
- [ ] Revisar historial del navegador
- [ ] Buscar en emails "n8n deployed"

---

## 🔗 Links Útiles

- **Google Cloud Console:** https://console.cloud.google.com
- **Compute Engine:** https://console.cloud.google.com/compute
- **Cloud Run:** https://console.cloud.google.com/run
- **Facturación:** https://console.cloud.google.com/billing
- **Logs:** https://console.cloud.google.com/logs

---

## 💡 Nota Importante

Tu configuración local (`.env`) tiene:
```
N8N_HOST=localhost
N8N_PORT=5678
```

Esto es para desarrollo local. Tu n8n de **producción en Google Cloud** tiene una URL diferente.

---

## 🚀 ¿Necesitas Ayuda?

Si aún no encuentras tu n8n, dime:
1. ¿Cómo lo desplegaste? (VM, Cloud Run, App Engine, GKE)
2. ¿Recuerdas el nombre del proyecto en Google Cloud?
3. ¿Tienes acceso a la consola de Google Cloud?

¡Te ayudaré a encontrarlo!
