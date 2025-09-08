"""
Agente Simple y Funcional con LangChain
- Sin dependencias problemáticas
- Funciona perfectamente
- Base de conocimientos básica
"""

import os
import json
import time
from datetime import datetime
from typing import Dict, List, Any
from dotenv import load_dotenv

# LangChain imports (versiones correctas)
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder

# Cargar variables de entorno
load_dotenv()

class AgenteSimple:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        self.llm = ChatOpenAI(
            model="gpt-3.5-turbo",
            temperature=0.7,
            openai_api_key=openai_api_key
        )
        
        # Memoria simple
        self.memory = ConversationBufferWindowMemory(
            k=10,
            memory_key="chat_history",
            return_messages=True
        )
        
        # Herramientas del agente
        self.tools = self.create_tools()
        
        # Prompt del agente
        self.prompt = self.create_prompt()
        
        # Ejecutor del agente
        self.agent = create_openai_tools_agent(
            llm=self.llm,
            tools=self.tools,
            prompt=self.prompt
        )
        
        self.agent_executor = AgentExecutor(
            agent=self.agent,
            tools=self.tools,
            memory=self.memory,
            verbose=True,
            handle_parsing_errors=True,
            max_iterations=3
        )
        
        # Historial de conversaciones
        self.conversation_history = []
    
    def create_tools(self) -> List[Tool]:
        """Crear herramientas para el agente"""
        tools = []
        
        # Herramienta de consulta de horarios
        def get_business_hours(query: str) -> str:
            """Obtener horarios de atención"""
            return "Horarios de atención: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00"
        
        tools.append(Tool(
            name="get_business_hours",
            description="Obtener horarios de atención de la empresa",
            func=get_business_hours
        ))
        
        # Herramienta de contacto
        def get_contact_info(query: str) -> str:
            """Obtener información de contacto"""
            return "Contacto: +56 9 1234 5678, email: contacto@empresa.com, ubicación: Antofagasta, Chile"
        
        tools.append(Tool(
            name="get_contact_info",
            description="Obtener información de contacto de la empresa",
            func=get_contact_info
        ))
        
        # Herramienta de precios
        def get_pricing_info(query: str) -> str:
            """Obtener información de precios"""
            return "Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora"
        
        tools.append(Tool(
            name="get_pricing_info",
            description="Obtener información de precios de la empresa",
            func=get_pricing_info
        ))
        
        # Herramienta de servicios
        def get_services_info(query: str) -> str:
            """Obtener información de servicios"""
            return "Servicios: Desarrollo web responsivo, Chatbots inteligentes, Automatización de procesos, Consultoría en IA, Capacitación tecnológica"
        
        tools.append(Tool(
            name="get_services_info",
            description="Obtener información de servicios de la empresa",
            func=get_services_info
        ))
        
        # Herramienta de tecnologías
        def get_technologies_info(query: str) -> str:
            """Obtener información de tecnologías"""
            return "Tecnologías: React, Node.js, Python, Django, Flask, OpenAI GPT, LangChain, MongoDB, PostgreSQL, AWS, Google Cloud"
        
        tools.append(Tool(
            name="get_technologies_info",
            description="Obtener información de tecnologías que manejamos",
            func=get_technologies_info
        ))
        
        # Herramienta de casos de éxito
        def get_success_cases(query: str) -> str:
            """Obtener casos de éxito"""
            return "Casos de éxito: E-commerce con 300% aumento en ventas, Chatbot que redujo 80% consultas telefónicas, Automatización que ahorra 50% tiempo, Sistema de gestión completo"
        
        tools.append(Tool(
            name="get_success_cases",
            description="Obtener casos de éxito y testimonios",
            func=get_success_cases
        ))
        
        return tools
    
    def create_prompt(self):
        """Crear prompt para el agente"""
        return ChatPromptTemplate.from_messages([
            ("system", """Eres un asistente virtual inteligente de Mente Autónoma, una empresa especializada en desarrollo web e inteligencia artificial en Antofagasta, Chile.

INFORMACIÓN DE LA EMPRESA:
- Nombre: Mente Autónoma
- Ubicación: Antofagasta, Chile
- Servicios: Desarrollo web, chatbots, automatización, consultoría en IA
- Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora
- Horarios: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00

INSTRUCCIONES:
- Siempre sé cortés y profesional
- Usa las herramientas disponibles para responder preguntas específicas
- Si no sabes algo, admítelo y ofrece contactar con un humano
- Mantén el contexto de la conversación
- Responde en el mismo idioma que el usuario
- Para consultas complejas, ofrece programar una llamada

HERRAMIENTAS DISPONIBLES:
- get_business_hours: Obtener horarios
- get_contact_info: Obtener contacto
- get_pricing_info: Obtener precios
- get_services_info: Obtener servicios
- get_technologies_info: Obtener tecnologías
- get_success_cases: Obtener casos de éxito"""),
            MessagesPlaceholder(variable_name="chat_history"),
            ("human", "{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad")
        ])
    
    def process_message(self, message: str, user_id: str, channel: str) -> str:
        """Procesar mensaje desde cualquier canal"""
        start_time = time.time()
        success = False
        response = ""
        
        try:
            # Procesar con el agente
            result = self.agent_executor.invoke({
                "input": message
            })
            
            response = result["output"]
            success = True
            
        except Exception as e:
            error_msg = f"Lo siento, hubo un error procesando tu mensaje: {e}"
            response = error_msg
            print(f"Error procesando mensaje: {e}")
        
        finally:
            # Calcular tiempo de respuesta
            response_time = time.time() - start_time
            
            # Guardar en historial
            self.conversation_history.append({
                "timestamp": datetime.now().isoformat(),
                "user_id": user_id,
                "channel": channel,
                "message": message,
                "response": response,
                "response_time": response_time,
                "success": success
            })
            
            # Mantener solo últimos 100 conversaciones
            if len(self.conversation_history) > 100:
                self.conversation_history = self.conversation_history[-100:]
            
            # Log de conversación
            print(f"💬 [{channel}] {user_id}: {message[:50]}...")
            print(f"🤖 Respuesta: {response[:50]}...")
        
        return response
    
    def get_conversation_history(self, user_id: str = None) -> List[Dict]:
        """Obtener historial de conversación"""
        if user_id:
            return [conv for conv in self.conversation_history if conv["user_id"] == user_id]
        return self.conversation_history
    
    def clear_memory(self, user_id: str = None):
        """Limpiar memoria de conversación"""
        if user_id:
            # Limpiar memoria específica del usuario
            self.conversation_history = [conv for conv in self.conversation_history if conv["user_id"] != user_id]
        else:
            # Limpiar toda la memoria
            self.memory.clear()
            self.conversation_history = []
    
    def save_conversation_to_file(self, filename: str = None):
        """Guardar conversación en archivo"""
        if not filename:
            filename = f"conversation_history_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(self.conversation_history, f, ensure_ascii=False, indent=2)
            print(f"✅ Conversación guardada en: {filename}")
        except Exception as e:
            print(f"❌ Error guardando conversación: {e}")

# Ejemplo de uso
if __name__ == "__main__":
    # Crear agente
    agent = AgenteSimple(openai_api_key=os.getenv('OPENAI_API_KEY'))
    
    # Probar con diferentes mensajes
    print("🤖 Probando agente simple...")
    
    test_messages = [
        "Hola, ¿cuáles son sus horarios?",
        "¿Qué servicios ofrecen?",
        "¿Cuáles son sus precios?",
        "¿Cómo puedo contactarlos?"
    ]
    
    for msg in test_messages:
        response = agent.process_message(msg, "user123", "test")
        print(f"Usuario: {msg}")
        print(f"Bot: {response}")
        print("-" * 50)
