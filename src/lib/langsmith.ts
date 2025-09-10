import { Client } from 'langsmith';

class LangSmithTracker {
  private client: Client | null = null;
  private projectName: string;

  constructor() {
    this.projectName = process.env.LANGSMITH_PROJECT || 'mente-autonoma-chatbot';
    
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
      return;
    }

    try {
      // Crear el run completo de una vez con todos los datos
      await this.client.createRun({
        name: 'chatbot-conversation',
        inputs: {
          user_message: userMessage,
          user_id: userId,
          channel: channel,
          timestamp: new Date().toISOString()
        },
        outputs: {
          bot_response: botResponse,
          response_time: new Date().toISOString(),
          status: 'completed'
        },
        project_name: this.projectName,
        run_type: 'llm',
        tags: ['chatbot', 'openai', 'web', 'completed'],
        metadata: {
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 500,
          status: 'success',
          completed_at: new Date().toISOString(),
          // Información de tokens estimada
          estimated_tokens: Math.ceil((userMessage.length + botResponse.length) / 4),
          input_tokens: Math.ceil(userMessage.length / 4),
          output_tokens: Math.ceil(botResponse.length / 4),
          total_tokens: Math.ceil((userMessage.length + botResponse.length) / 4)
        },
        // Forzar el estado como completado
        status: 'success'
      });
      
      console.log('📊 Conversación registrada y completada en LangSmith');
    } catch (error) {
      console.error('❌ Error al registrar en LangSmith:', error);
      
      // Crear un run de error
      try {
        await this.client.createRun({
          name: 'chatbot-error',
          inputs: {
            user_message: userMessage,
            user_id: userId,
            error: error instanceof Error ? error.message : 'Unknown error'
          },
          outputs: {
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date().toISOString()
          },
          project_name: this.projectName,
          run_type: 'tool',
          tags: ['chatbot', 'error', 'web'],
          status: 'error'
        });
      } catch (errorRunError) {
        console.error('❌ Error al crear run de error:', errorRunError);
      }
    }
  }

  async trackError(
    userMessage: string,
    error: string,
    userId: string = 'web_user'
  ) {
    if (!this.client) {
      return;
    }

    try {
      await this.client.createRun({
        name: 'chatbot-error',
        inputs: {
          user_message: userMessage,
          user_id: userId,
          timestamp: new Date().toISOString()
        },
        outputs: {
          error: error,
          error_time: new Date().toISOString()
        },
        project_name: this.projectName,
        run_type: 'tool',
        tags: ['chatbot', 'error', 'web'],
        metadata: {
          error_type: 'api_error'
        }
      });
      
      console.log('📊 Error registrado en LangSmith');
    } catch (error) {
      console.error('❌ Error al registrar error en LangSmith:', error);
    }
  }

  isEnabled(): boolean {
    return this.client !== null;
  }
}

export const langSmithTracker = new LangSmithTracker();
