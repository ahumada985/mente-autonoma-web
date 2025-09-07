"""
Agente principal con LangChain para múltiples canales
Base de conocimientos compartida entre WhatsApp, Web, Telegram, etc.
"""

from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.chains import RetrievalQA
import os
from typing import Dict, Any
import json
import time
from monitoring.logger import logger

class MultiChannelAgent:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.7,
            openai_api_key=openai_api_key
        )
        
        # Memoria compartida para todos los canales
        self.memory = ConversationBufferWindowMemory(
            k=10,  # Mantener últimas 10 conversaciones
            memory_key="chat_history",
            return_messages=True
        )
        
        # Base de conocimientos vectorial
        self.vectorstore = None
        self.qa_chain = None
        self.setup_knowledge_base()
        
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
            handle_parsing_errors=True
        )
    
    def setup_knowledge_base(self):
        """Configurar base de conocimientos vectorial"""
        try:
            # Embeddings
            embeddings = OpenAIEmbeddings(openai_api_key=self.openai_api_key)
            
            # Cargar documentos de conocimiento
            documents = self.load_knowledge_documents()
            
            # Crear vectorstore
            self.vectorstore = Chroma.from_documents(
                documents=documents,
                embedding=embeddings,
                persist_directory="./knowledge_db"
            )
            
            # Crear cadena de QA
            self.qa_chain = RetrievalQA.from_chain_type(
                llm=self.llm,
                chain_type="stuff",
                retriever=self.vectorstore.as_retriever(search_kwargs={"k": 3})
            )
            
            print("✅ Base de conocimientos configurada correctamente")
            
        except Exception as e:
            print(f"❌ Error configurando base de conocimientos: {e}")
            self.vectorstore = None
            self.qa_chain = None
    
    def load_knowledge_documents(self):
        """Cargar documentos de la base de conocimientos"""
        documents = []
        
        # Cargar desde archivos de texto
        knowledge_files = [
            "knowledge/empresa_info.txt",
            "knowledge/productos_servicios.txt",
            "knowledge/politicas.txt",
            "knowledge/faq.txt"
        ]
        
        for file_path in knowledge_files:
            if os.path.exists(file_path):
                loader = TextLoader(file_path, encoding='utf-8')
                docs = loader.load()
                
                # Dividir documentos
                text_splitter = RecursiveCharacterTextSplitter(
                    chunk_size=1000,
                    chunk_overlap=200
                )
                splits = text_splitter.split_documents(docs)
                documents.extend(splits)
        
        return documents
    
    def create_tools(self):
        """Crear herramientas para el agente"""
        tools = []
        
        # Herramienta de búsqueda en base de conocimientos
        if self.qa_chain:
            def search_knowledge(query: str) -> str:
                """Buscar información en la base de conocimientos"""
                try:
                    result = self.qa_chain.run(query)
                    return result
                except Exception as e:
                    return f"Error buscando información: {e}"
            
            tools.append(Tool(
                name="search_knowledge",
                description="Buscar información en la base de conocimientos de la empresa",
                func=search_knowledge
            ))
        
        # Herramienta de consulta de horarios
        def get_business_hours() -> str:
            """Obtener horarios de atención"""
            return "Horarios de atención: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00"
        
        tools.append(Tool(
            name="get_business_hours",
            description="Obtener horarios de atención de la empresa",
            func=get_business_hours
        ))
        
        # Herramienta de contacto
        def get_contact_info() -> str:
            """Obtener información de contacto"""
            return "Contacto: +56 9 1234 5678, email: contacto@empresa.com"
        
        tools.append(Tool(
            name="get_contact_info",
            description="Obtener información de contacto de la empresa",
            func=get_contact_info
        ))
        
        return tools
    
    def create_prompt(self):
        """Crear prompt para el agente"""
        return ChatPromptTemplate.from_messages([
            ("system", """Eres un asistente virtual inteligente de la empresa. 
            Tu objetivo es ayudar a los clientes de manera amable y profesional.
            
            INSTRUCCIONES:
            - Siempre sé cortés y profesional
            - Usa la base de conocimientos para responder preguntas
            - Si no sabes algo, admítelo y ofrece contactar con un humano
            - Mantén el contexto de la conversación
            - Responde en el mismo idioma que el usuario
            - Para consultas complejas, ofrece programar una llamada
            
            CANALES SOPORTADOS:
            - WhatsApp
            - Web Chat
            - Telegram
            - Facebook Messenger
            - Discord"""),
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
            # Agregar contexto del canal
            context_message = f"[Canal: {channel}] {message}"
            
            # Procesar con el agente
            response = self.agent_executor.invoke({
                "input": context_message,
                "user_id": user_id
            })
            
            success = True
            return response["output"]
            
        except Exception as e:
            error_msg = f"Lo siento, hubo un error procesando tu mensaje: {e}"
            response = error_msg
            
            # Registrar error
            logger.log_error(str(e), channel)
            
            return error_msg
        
        finally:
            # Calcular tiempo de respuesta
            response_time = time.time() - start_time
            
            # Registrar mensaje en el sistema de monitoreo
            logger.log_message(
                user_id=user_id,
                channel=channel,
                message=message,
                response=response,
                response_time=response_time,
                success=success
            )
    
    def get_conversation_history(self, user_id: str) -> list:
        """Obtener historial de conversación de un usuario"""
        # En una implementación real, esto vendría de una base de datos
        return self.memory.chat_memory.messages
    
    def clear_memory(self, user_id: str = None):
        """Limpiar memoria de conversación"""
        if user_id:
            # Limpiar memoria específica del usuario
            pass
        else:
            # Limpiar toda la memoria
            self.memory.clear()

# Ejemplo de uso
if __name__ == "__main__":
    # Configurar variables de entorno
    os.environ["OPENAI_API_KEY"] = "tu-api-key-aqui"
    
    # Crear agente
    agent = MultiChannelAgent(openai_api_key="tu-api-key-aqui")
    
    # Probar con diferentes canales
    print("🤖 Probando agente multicanal...")
    
    # Simular mensaje desde WhatsApp
    response_whatsapp = agent.process_message(
        "Hola, ¿cuáles son sus horarios de atención?",
        user_id="user123",
        channel="whatsapp"
    )
    print(f"📱 WhatsApp: {response_whatsapp}")
    
    # Simular mensaje desde Web
    response_web = agent.process_message(
        "¿Qué servicios ofrecen?",
        user_id="user123",
        channel="web"
    )
    print(f"🌐 Web: {response_web}")

