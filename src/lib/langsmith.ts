import { Client } from 'langsmith';

class LangSmithTracker {
  private client: Client | null = null;
  private projectName: string;

  constructor() {
    this.projectName = process.env.LANGSMITH_PROJECT || 'pr-artistic-injunction-89';
    
    // Debug: Mostrar todas las variables de entorno
    console.log('🔍 DEBUG LANGSMITH:');
    console.log('LANGSMITH_API_KEY:', process.env.LANGSMITH_API_KEY ? '✅ Configurada' : '❌ No configurada');
    console.log('LANGSMITH_TRACING:', process.env.LANGSMITH_TRACING);
    console.log('LANGSMITH_ENDPOINT:', process.env.LANGSMITH_ENDPOINT);
    console.log('LANGSMITH_PROJECT:', process.env.LANGSMITH_PROJECT);
    
    if (process.env.LANGSMITH_API_KEY && process.env.LANGSMITH_TRACING?.toLowerCase() === 'true') {
      this.client = new Client({
        apiKey: process.env.LANGSMITH_API_KEY,
        apiUrl: process.env.LANGSMITH_ENDPOINT || 'https://api.smith.langchain.com',
      });
      console.log(`✅ LangSmith conectado al proyecto: ${this.projectName}`);
      console.log(`📊 Endpoint: ${process.env.LANGSMITH_ENDPOINT}`);
    } else {
      console.log('⚠️ LangSmith no configurado. Variables requeridas: LANGSMITH_API_KEY, LANGSMITH_TRACING=true');
      console.log('🔍 Variables actuales:');
      console.log('- LANGSMITH_API_KEY:', process.env.LANGSMITH_API_KEY ? 'Presente' : 'Ausente');
      console.log('- LANGSMITH_TRACING:', process.env.LANGSMITH_TRACING);
    }
  }

  async trackConversation(
    userMessage: string,
    botResponse: string,
    userId: string = 'web_user',
    channel: string = 'web'
  ) {
    if (!this.client) {
      console.log('⚠️ LangSmith no está configurado. Verifica las variables de entorno.');
      return;
    }

    try {
      console.log('📊 Registrando conversación en LangSmith...');
      
      // SOLUCIÓN DEFINITIVA: Usar createRun con end_time para completar automáticamente
      const runId = `chatbot-${Date.now()}`;
      
      const run = await this.client.createRun({
        name: runId,
        inputs: {
          user_message: userMessage,
          user_id: userId,
          channel: channel,
          timestamp: new Date().toISOString()
        },
        outputs: {
          bot_response: botResponse,
          response_time: new Date().toISOString(),
          status: 'completed',
          success: true
        },
        project_name: this.projectName,
        run_type: 'llm',
        // CLAVE: Usar end_time para marcar como completado
        end_time: new Date().toISOString()
      });

      console.log(`✅ Run creado y completado: ${runId}`);
      console.log('✅ Conversación registrada exitosamente en LangSmith');
      return runId;
    } catch (error) {
      console.error('❌ Error al registrar en LangSmith:', error);
      
      // Registrar error
      try {
        const errorRun = await this.client.createRun({
          name: `chatbot-error-${Date.now()}`,
          inputs: {
            user_message: userMessage,
            user_id: userId,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          },
          outputs: {
            error: error instanceof Error ? error.message : 'Unknown error',
            error_time: new Date().toISOString(),
            status: 'error'
          },
          project_name: this.projectName,
          run_type: 'tool',
          end_time: new Date().toISOString()
        });
        
        console.log('📊 Error registrado en LangSmith');
        return `error-${Date.now()}`;
      } catch (errorRunError) {
        console.error('❌ Error al registrar error en LangSmith:', errorRunError);
        return null;
      }
    }
  }

  async trackError(
    userMessage: string,
    error: string,
    userId: string = 'web_user'
  ) {
    if (!this.client) {
      console.log('⚠️ LangSmith no está configurado. Verifica las variables de entorno.');
      return;
    }

    try {
      const errorRun = await this.client.createRun({
        name: `chatbot-error-${Date.now()}`,
        inputs: {
          user_message: userMessage,
          user_id: userId,
          timestamp: new Date().toISOString()
        },
        outputs: {
          error: error,
          error_time: new Date().toISOString(),
          status: 'error'
        },
        project_name: this.projectName,
        run_type: 'tool',
        end_time: new Date().toISOString()
      });
      
      console.log('📊 Error registrado en LangSmith');
      return `error-${Date.now()}`;
    } catch (error) {
      console.error('❌ Error al registrar error en LangSmith:', error);
      return null;
    }
  }

  isEnabled(): boolean {
    return this.client !== null;
  }
}

export const langSmithTracker = new LangSmithTracker();
