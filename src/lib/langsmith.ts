import { Client } from 'langsmith';

class LangSmithTracker {
  private client: Client | null = null;
  private projectName: string;

  constructor() {
    this.projectName = process.env.LANGCHAIN_PROJECT || 'mente-autonoma-chatbot';
    
    if (process.env.LANGSMITH_API_KEY) {
      this.client = new Client({
        apiKey: process.env.LANGSMITH_API_KEY,
      });
      console.log(`✅ LangSmith conectado al proyecto: ${this.projectName}`);
    } else {
      console.log('⚠️ LANGSMITH_API_KEY no configurada. LangSmith deshabilitado.');
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
          response_time: new Date().toISOString()
        },
        project_name: this.projectName,
        run_type: 'llm',
        tags: ['chatbot', 'openai', 'web'],
        metadata: {
          model: 'gpt-3.5-turbo',
          temperature: 0.7,
          max_tokens: 500
        }
      });
      
      console.log('📊 Conversación registrada en LangSmith');
    } catch (error) {
      console.error('❌ Error al registrar en LangSmith:', error);
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
