// EJEMPLO DE CÓMO USAR LANGSMITH CON EL CÓDIGO QUE TE DIERON
// Este archivo es solo para referencia, no se usa en el chatbot

import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// Ejemplo de herramienta (tool) para obtener clima
const getWeather = tool(
  async (input: { city: string }) => {
    return `It's always sunny in ${input.city}!`;
  },
  {
    name: "getWeather",
    schema: z.object({
      city: z.string().describe("The city to get the weather for"),
    }),
    description: "Get weather for a given city.",
  }
);

// Configuración del LLM con LangSmith automático
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo", // Cambiado de gpt-5-mini a gpt-3.5-turbo
  // LangSmith se activa automáticamente con las variables de entorno
});

// Crear agente con herramientas
const agent = createReactAgent({
  llm,
  tools: [getWeather],
  prompt: "You are a helpful assistant for Mente Autónoma company.",
});

// Función para ejecutar el agente
export async function runAgentWithTools(userMessage: string) {
  try {
    const result = await agent.invoke({
      messages: [
        { role: "user", content: userMessage },
      ],
    });
    
    return result;
  } catch (error) {
    console.error('Error ejecutando agente:', error);
    throw error;
  }
}

// NOTA: Para usar este código necesitarías instalar:
// npm install @langchain/core @langchain/langgraph @langchain/openai zod
