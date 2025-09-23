# 🔥 Guía Completa de Configuración de Firebase

## 📋 **Paso 1: Crear Proyecto en Firebase**

1. Ve a [firebase.google.com](https://firebase.google.com)
2. Haz clic en "Comenzar"
3. Inicia sesión con tu cuenta de Google
4. Haz clic en "Crear un proyecto"
5. **Nombre del proyecto**: `mente-autonoma-leads` (o el que prefieras)
6. **Google Analytics**: Desactivar por ahora
7. Haz clic en "Crear proyecto"

## 🗄️ **Paso 2: Configurar Firestore Database**

1. En el panel de Firebase, haz clic en "Firestore Database"
2. Haz clic en "Crear base de datos"
3. **Modo de seguridad**: "Comenzar en modo de prueba"
4. **Ubicación**: Elige la más cercana (ej: `us-central1`)
5. Haz clic en "Habilitar"

## ⚙️ **Paso 3: Obtener Credenciales de Configuración**

1. Haz clic en el ícono de configuración (⚙️) junto a "Vista general del proyecto"
2. Selecciona "Configuración del proyecto"
3. Ve a la pestaña "General"
4. Baja hasta "Tus apps" y haz clic en "Agregar app"
5. Selecciona el ícono de web (</>)
6. **Apodo de la app**: `mente-autonoma-web`
7. Marca "También configurar Firebase Hosting"
8. Haz clic en "Registrar app"
9. **IMPORTANTE**: Copia y guarda la configuración que aparece

## 🔧 **Paso 4: Actualizar Configuración en el Código**

Reemplaza el contenido de `src/lib/firebase.js` con tus credenciales reales:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL_AQUI",
  authDomain: "tu-proyecto-real.firebaseapp.com",
  projectId: "tu-proyecto-real-id",
  storageBucket: "tu-proyecto-real.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};
```

## 🚀 **Paso 5: Probar la Funcionalidad**

1. Ejecuta `npm run dev`
2. Ve a la sección CTA de tu página
3. Ingresa un email de prueba
4. Verifica en la consola del navegador que aparezca el mensaje de éxito
5. Ve a Firebase Console → Firestore Database para ver el lead capturado

## 📊 **Paso 6: Ver Leads Capturados**

1. En Firebase Console, ve a "Firestore Database"
2. Verás una colección llamada "leads"
3. Cada documento contiene:
   - Email del usuario
   - Timestamp de registro
   - Fuente (website)
   - Tipo de formulario

## 🔒 **Paso 7: Configurar Reglas de Seguridad (Opcional)**

Para producción, actualiza las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{document} {
      allow write: if true;  // Cualquiera puede escribir
      allow read: if false;  // Solo tú puedes leer
    }
  }
}
```

## 💡 **Ventajas de Firebase vs SendGrid**

| Firebase | SendGrid |
|----------|----------|
| ✅ Base de datos en tiempo real | ❌ Solo envío de emails |
| ✅ Gratis hasta 50K leads/mes | ❌ Pago por email enviado |
| ✅ Integración más simple | ❌ API más compleja |
| ✅ Hosting incluido | ❌ Solo servicio de email |
| ✅ Escalabilidad automática | ❌ Límites estrictos |

## 🎯 **Próximos Pasos Recomendados**

1. **Configurar notificaciones** cuando se capture un lead
2. **Integrar con CRM** como HubSpot o Salesforce
3. **Crear dashboard** para analizar leads
4. **Implementar segmentación** por tipo de usuario
5. **Configurar email automático** de bienvenida

## 🆘 **Solución de Problemas Comunes**

### **Error: "Firebase App named '[DEFAULT]' already exists"**
- Solución: Reinicia el servidor de desarrollo

### **Error: "Permission denied"**
- Solución: Verifica que las reglas de Firestore permitan escritura

### **Error: "Network error"**
- Solución: Verifica tu conexión a internet y las credenciales

### **Leads no aparecen en Firestore**
- Solución: Verifica la consola del navegador para errores
- Asegúrate de que las credenciales sean correctas

---

**¿Necesitas ayuda con algún paso específico?** ¡Estoy aquí para ayudarte!
