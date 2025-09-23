// Script de prueba para verificar que LangSmith funciona correctamente
const { langSmithTracker } = require('./src/lib/langsmith.ts');

async function testLangSmithFix() {
  console.log('🧪 Iniciando prueba de LangSmith...');
  
  // Verificar si LangSmith está habilitado
  if (!langSmithTracker.isEnabled()) {
    console.log('❌ LangSmith no está configurado. Asegúrate de tener las variables de entorno:');
    console.log('   - LANGSMITH_API_KEY');
    console.log('   - LANGSMITH_TRACING=true');
    console.log('   - LANGSMITH_ENDPOINT=https://api.smith.langchain.com');
    console.log('   - LANGSMITH_PROJECT=mente-autonoma-chatbot');
    return;
  }

  console.log('✅ LangSmith está configurado correctamente');

  // Probar registro de conversación exitosa
  console.log('\n📊 Probando registro de conversación...');
  try {
    const runId = await langSmithTracker.trackConversation(
      'Hola, ¿cómo estás?',
      '¡Hola! Estoy muy bien, gracias por preguntar. ¿En qué puedo ayudarte hoy?',
      'test-user-123',
      'web'
    );
    
    if (runId) {
      console.log(`✅ Conversación registrada exitosamente. Run ID: ${runId}`);
    } else {
      console.log('❌ No se pudo registrar la conversación');
    }
  } catch (error) {
    console.error('❌ Error al registrar conversación:', error);
  }

  // Probar registro de error
  console.log('\n📊 Probando registro de error...');
  try {
    const errorRunId = await langSmithTracker.trackError(
      'Mensaje que causó error',
      'Error de prueba: No se pudo procesar la solicitud',
      'test-user-456'
    );
    
    if (errorRunId) {
      console.log(`✅ Error registrado exitosamente. Run ID: ${errorRunId}`);
    } else {
      console.log('❌ No se pudo registrar el error');
    }
  } catch (error) {
    console.error('❌ Error al registrar error:', error);
  }

  console.log('\n🎉 Prueba completada. Revisa tu dashboard de LangSmith para verificar que los registros aparecen con estado "success" o "error" en lugar de "incomplete".');
}

// Ejecutar la prueba
testLangSmithFix().catch(console.error);
