// Script para verificar que el chatbot usa OpenAI real
const testOpenAI = async () => {
  const testMessages = [
    "¿Cuál es la capital de Francia?",
    "¿Qué es 2+2?",
    "¿Puedes escribir un poema sobre el mar?",
    "¿Cuál es la fecha de hoy?",
    "¿Qué significa IA?"
  ];

  console.log("🧪 PROBANDO CHATBOT CON DIFERENTES PREGUNTAS...\n");

  for (const message of testMessages) {
    try {
      console.log(`📤 Pregunta: ${message}`);
      
      const response = await fetch('https://mente-autonoma-qcknej542-carlos-projects-fd7d50f6.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          session_id: `test_${Date.now()}`,
          user_id: 'test_user'
        })
      });

      const data = await response.json();
      
      if (data.response) {
        console.log(`🤖 Respuesta: ${data.response}`);
        console.log(`✅ Status: ${data.status}`);
        console.log(`🔗 LangSmith: ${data.langsmith_enabled ? 'Habilitado' : 'Deshabilitado'}`);
      } else {
        console.log(`❌ Error: ${data.error}`);
      }
      
      console.log("─".repeat(80));
      
      // Esperar 1 segundo entre requests
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Error en la prueba: ${error.message}`);
    }
  }
};

// Ejecutar la prueba
testOpenAI();
