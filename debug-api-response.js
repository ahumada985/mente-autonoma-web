// Script para debuggear la respuesta de la API
const debugAPI = async () => {
  try {
    console.log("🔍 DEBUGGEANDO LA API DEL CHATBOT...\n");
    
    const response = await fetch('https://mente-autonoma-ixt4lxh8u-carlos-projects-fd7d50f6.vercel.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Hola, ¿funcionas?",
        session_id: `debug_${Date.now()}`,
        user_id: 'debug_user'
      })
    });

    console.log("📊 STATUS:", response.status);
    console.log("📊 STATUS TEXT:", response.statusText);
    console.log("📊 HEADERS:", Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log("📊 RESPONSE LENGTH:", text.length);
    console.log("📊 FIRST 500 CHARS:", text.substring(0, 500));
    
    if (text.includes('<!doctype') || text.includes('<html')) {
      console.log("❌ PROBLEMA: La API está devolviendo HTML en lugar de JSON");
      console.log("🔍 Esto indica que hay un error en el servidor o la ruta no existe");
    } else {
      try {
        const json = JSON.parse(text);
        console.log("✅ RESPUESTA JSON:", json);
      } catch (e) {
        console.log("❌ NO ES JSON VÁLIDO");
      }
    }
    
  } catch (error) {
    console.error("❌ ERROR DE RED:", error.message);
  }
};

debugAPI();
