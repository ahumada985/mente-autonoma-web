# 🔧 Solucionar Acceso a n8n en Google Cloud

## ❌ Problema Detectado
IP: `34.176.242.21`
Puerto 5678 no responde (TIMEOUT)

---

## ✅ SOLUCIÓN 1: Abrir Puerto en Firewall (MÁS PROBABLE)

### Paso 1: Crear Regla de Firewall

**Opción A: Desde Consola Web (Recomendado)**

1. Ve a: https://console.cloud.google.com/networking/firewalls/list

2. Click **"CREAR REGLA DE FIREWALL"**

3. Configuración:
   ```
   Nombre: allow-n8n
   Destinos: Todas las instancias de la red
   Filtro de origen: Rangos de IPv4
   Rangos de IPv4 de origen: 0.0.0.0/0
   Protocolos y puertos especificados:
     ✅ tcp: 5678
   ```

4. Click **"CREAR"**

**Opción B: Comando gcloud (Rápido)**

```bash
gcloud compute firewall-rules create allow-n8n \
  --allow tcp:5678 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow n8n access"
```

### Paso 2: Verificar regla aplicada

```bash
gcloud compute firewall-rules list | grep n8n
```

---

## ✅ SOLUCIÓN 2: Verificar que n8n esté corriendo

### SSH a tu instancia:

```bash
# Conéctate a la VM
gcloud compute ssh [NOMBRE-INSTANCIA] --zone=[ZONA]
```

### Una vez dentro, verifica:

```bash
# Ver si n8n está corriendo
ps aux | grep n8n

# Si usas PM2
pm2 list

# Si usas systemd
systemctl status n8n

# Si usas Docker
docker ps | grep n8n

# Verificar puerto escuchando
netstat -tlnp | grep 5678
# O con ss
ss -tlnp | grep 5678
```

### Si n8n NO está corriendo, inícialo:

**Con PM2:**
```bash
pm2 start n8n
pm2 save
```

**Con systemd:**
```bash
systemctl start n8n
systemctl enable n8n
```

**Con Docker:**
```bash
docker start [CONTAINER-NAME]
```

**Directo:**
```bash
cd /ruta/a/n8n
npx n8n start
```

---

## ✅ SOLUCIÓN 3: Verificar configuración de n8n

### Archivo de configuración (~/.n8n/config):

```bash
cat ~/.n8n/config
```

Debe tener:
```
N8N_HOST=0.0.0.0  # IMPORTANTE: debe ser 0.0.0.0, NO localhost
N8N_PORT=5678
```

### Variables de entorno:

```bash
export N8N_HOST=0.0.0.0
export N8N_PORT=5678
```

---

## ✅ SOLUCIÓN 4: Usar túnel SSH (Temporal)

Si necesitas acceso inmediato mientras arreglas firewall:

```bash
# Desde tu PC local
gcloud compute ssh [NOMBRE-INSTANCIA] \
  --zone=[ZONA] \
  -- -L 5678:localhost:5678
```

Luego accede a: `http://localhost:5678`

---

## 🔍 Diagnóstico Completo

### Comando todo-en-uno (ejecutar en la VM):

```bash
#!/bin/bash
echo "=== DIAGNÓSTICO N8N ==="
echo ""
echo "1. Proceso n8n:"
ps aux | grep n8n | grep -v grep
echo ""
echo "2. Puerto 5678:"
netstat -tlnp | grep 5678
echo ""
echo "3. n8n en PM2:"
pm2 list 2>/dev/null || echo "PM2 no instalado"
echo ""
echo "4. n8n en systemd:"
systemctl status n8n 2>/dev/null || echo "Systemd service no configurado"
echo ""
echo "5. n8n en Docker:"
docker ps | grep n8n 2>/dev/null || echo "Docker no tiene n8n"
echo ""
echo "6. Configuración n8n:"
cat ~/.n8n/config 2>/dev/null || echo "No config file"
```

---

## 🚀 Checklist de Verificación

- [ ] Regla de firewall creada para puerto 5678
- [ ] n8n está corriendo en la VM
- [ ] N8N_HOST=0.0.0.0 (no localhost)
- [ ] Puerto 5678 escuchando en todas las interfaces
- [ ] VM tiene tag de red correcto (si usas tags)
- [ ] Regla de firewall aplicada a la VM correcta

---

## 💡 URLs a Probar

Una vez solucionado:

1. **Principal:** http://34.176.242.21:5678
2. **Con HTTPS (si tienes cert):** https://34.176.242.21:5678
3. **Webhook:** http://34.176.242.21:5678/webhook/asistente-clean

---

## 📞 Siguiente Paso

1. **Abrir firewall** (SOLUCIÓN 1)
2. **Verificar n8n corriendo** (SOLUCIÓN 2)
3. Probar URL: http://34.176.242.21:5678
4. ✅ ¡Listo!

---

## 🔗 Links Útiles

- **Firewall Rules:** https://console.cloud.google.com/networking/firewalls/list
- **VM Instances:** https://console.cloud.google.com/compute/instances
- **Cloud Shell:** https://console.cloud.google.com/?cloudshell=true
