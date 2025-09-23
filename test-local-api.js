// Script para probar la API local
const testLocalAPI = async () => {
  try {
    console.log("🧪 PROBANDO API LOCAL...\n");
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Hola, ¿funcionas con OpenAI?",
        session_id: `local_test_${Date.now()}`,
        user_id: 'local_user'
      })
    });

    console.log("📊 STATUS:", response.status);
    console.log("📊 STATUS TEXT:", response.statusText);
    
    if (response.ok) {
      const data = await response.json();
      console.log("✅ RESPUESTA EXITOSA:");
      console.log("🤖 Bot:", data.response);
      console.log("📊 Status:", data.status);
      console.log("🔗 LangSmith:", data.langsmith_enabled);
      
      // Verificar si es respuesta de OpenAI
      if (data.response && data.response.length > 50) {
        console.log("✅ PARECE SER RESPUESTA DE OPENAI (más de 50 caracteres)");
      } else {
        console.log("❌ PARECE SER RESPUESTA PREDEFINIDA (muy corta)");
      }
    } else {
      const text = await response.text();
      console.log("❌ ERROR:", text);
    }
    
  } catch (error) {
    console.error("❌ ERROR DE CONEXIÓN:", error.message);
    console.log("💡 Asegúrate de que el servidor esté corriendo en localhost:3000");
  }
};

testLocalAPI();
