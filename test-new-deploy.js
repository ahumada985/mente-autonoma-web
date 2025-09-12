// Script para probar el nuevo deploy
const testNewDeploy = async () => {
  try {
    console.log("🧪 PROBANDO NUEVO DEPLOY...\n");
    
    const response = await fetch('https://mente-autonoma-ee9b8mfr3-carlos-projects-fd7d50f6.vercel.app/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: "Hola, ¿funcionas con OpenAI?",
        session_id: `test_${Date.now()}`,
        user_id: 'test_user'
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
      console.log("❌ ERROR:", text.substring(0, 200));
    }
    
  } catch (error) {
    console.error("❌ ERROR DE CONEXIÓN:", error.message);
  }
};

testNewDeploy();
