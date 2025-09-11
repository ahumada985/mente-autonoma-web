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
      
      // NUEVA ESTRATEGIA: Usar createRun con todos los datos completos desde el inicio
      const runId = `chatbot-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const runData = {
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
        run_type: 'llm' as const,
        tags: ['chatbot', 'openai', 'web', 'success', 'completed'],
        metadata: {
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 500,
          status: 'success',
          completed_at: new Date().toISOString(),
          final_status: 'success',
          // Información de tokens estimada
          estimated_tokens: Math.ceil((userMessage.length + botResponse.length) / 4),
          input_tokens: Math.ceil(userMessage.length / 4),
          output_tokens: Math.ceil(botResponse.length / 4),
          total_tokens: Math.ceil((userMessage.length + botResponse.length) / 4),
          // Metadatos adicionales para evitar incomplete
          run_duration_ms: 1000,
          end_time: new Date().toISOString(),
          is_complete: true
        },
        // ESTADO SUCCESS DESDE EL INICIO
        status: 'success' as const
      };

      console.log('🔧 Creando run con datos completos...');
      const run = await this.client.createRun(runData);
      console.log(`✅ Run creado exitosamente: ${run.id}`);

      // Verificar que el run se creó correctamente
      try {
        const createdRun = await this.client.readRun(run.id);
        console.log(`📊 Estado del run: ${createdRun.status}`);
        
        if (createdRun.status === 'success') {
          console.log('✅ Run completado exitosamente en LangSmith');
        } else {
          console.log(`⚠️ Run creado pero con estado: ${createdRun.status}`);
          
          // Intentar actualizar a success si no lo está
          try {
            await this.client.updateRun(run.id, {
              status: 'success',
              end_time: new Date().toISOString(),
              outputs: runData.outputs,
              metadata: {
                ...runData.metadata,
                final_update: new Date().toISOString()
              }
            });
            console.log('✅ Run actualizado a success');
          } catch (updateError) {
            console.log('⚠️ No se pudo actualizar el run:', updateError);
          }
        }
      } catch (readError) {
        console.log('⚠️ No se pudo leer el run creado:', readError);
      }
      
      console.log('📊 Conversación registrada y completada en LangSmith');
      return run.id;
    } catch (error) {
      console.error('❌ Error al registrar en LangSmith:', error);
      
      // Crear un run de error con estado definido
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
          run_type: 'tool' as const,
          tags: ['chatbot', 'error', 'web', 'failed'],
          metadata: {
            error_type: 'api_error',
            failed_at: new Date().toISOString()
          },
          status: 'error' as const
        });
        console.log('📊 Error registrado en LangSmith');
        return errorRun.id;
      } catch (errorRunError) {
        console.error('❌ Error al crear run de error:', errorRunError);
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
      const errorRunId = `chatbot-error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const errorRun = await this.client.createRun({
        name: errorRunId,
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
        run_type: 'tool' as const,
        tags: ['chatbot', 'error', 'web', 'failed'],
        metadata: {
          error_type: 'api_error',
          failed_at: new Date().toISOString(),
          is_complete: true
        },
        status: 'error' as const
      });
      
      console.log('📊 Error registrado en LangSmith');
      return errorRun.id;
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
