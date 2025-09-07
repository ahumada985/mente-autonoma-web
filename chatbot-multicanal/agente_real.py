"""
Agente Real con LangChain
- Memoria persistente
- Base de conocimientos
- Herramientas inteligentes
- Historial de conversaciones
"""

import os
import json
import time
from datetime import datetime
from typing import Dict, List, Any
from dotenv import load_dotenv

# LangChain imports
from langchain.agents import AgentExecutor, create_openai_tools_agent
from langchain.tools import Tool
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferWindowMemory, ConversationSummaryBufferMemory
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.document_loaders import TextLoader
from langchain.chains import RetrievalQA
from langchain.schema import Document

# Cargar variables de entorno
load_dotenv()

class AgenteReal:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        self.llm = ChatOpenAI(
            model="gpt-4",
            temperature=0.7,
            openai_api_key=openai_api_key
        )
        
        # Memoria persistente con resumen
        self.memory = ConversationSummaryBufferMemory(
            llm=self.llm,
            max_token_limit=1000,
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
            handle_parsing_errors=True,
            max_iterations=3,
            return_intermediate_steps=True
        )
        
        # Historial de conversaciones
        self.conversation_history = []
    
    def setup_knowledge_base(self):
        """Configurar base de conocimientos vectorial"""
        try:
            # Embeddings
            embeddings = OpenAIEmbeddings(openai_api_key=self.openai_api_key)
            
            # Cargar documentos de conocimiento
            documents = self.load_knowledge_documents()
            
            if documents:
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
            else:
                print("⚠️ No se encontraron documentos de conocimiento")
                
        except Exception as e:
            print(f"❌ Error configurando base de conocimientos: {e}")
            self.vectorstore = None
            self.qa_chain = None
    
    def load_knowledge_documents(self) -> List[Document]:
        """Cargar documentos de la base de conocimientos"""
        documents = []
        
        # Cargar desde archivos de texto
        knowledge_files = [
            "knowledge/empresa_info.txt",
            "knowledge/productos_servicios.txt",
            "knowledge/politicas.txt",
            "knowledge/faq.txt",
            "knowledge/tecnologias.txt",
            "knowledge/casos_exito.txt"
        ]
        
        for file_path in knowledge_files:
            if os.path.exists(file_path):
                try:
                    loader = TextLoader(file_path, encoding='utf-8')
                    docs = loader.load()
                    
                    # Dividir documentos
                    text_splitter = RecursiveCharacterTextSplitter(
                        chunk_size=1000,
                        chunk_overlap=200
                    )
                    splits = text_splitter.split_documents(docs)
                    documents.extend(splits)
                    print(f"✅ Cargado: {file_path}")
                except Exception as e:
                    print(f"❌ Error cargando {file_path}: {e}")
        
        return documents
    
    def create_tools(self) -> List[Tool]:
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
        def get_business_hours(query: str = "") -> str:
            """Obtener horarios de atención"""
            return "Horarios de atención: Lunes a Viernes 9:00-18:00, Sábados 9:00-14:00"
        
        tools.append(Tool(
            name="get_business_hours",
            description="Obtener horarios de atención de la empresa",
            func=get_business_hours
        ))
        
        # Herramienta de contacto
        def get_contact_info(query: str = "") -> str:
            """Obtener información de contacto"""
            return "Contacto: +56 9 1234 5678, email: contacto@empresa.com, ubicación: Antofagasta, Chile"
        
        tools.append(Tool(
            name="get_contact_info",
            description="Obtener información de contacto de la empresa",
            func=get_contact_info
        ))
        
        # Herramienta de precios
        def get_pricing_info(query: str = "") -> str:
            """Obtener información de precios"""
            return "Precios: Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora"
        
        tools.append(Tool(
            name="get_pricing_info",
            description="Obtener información de precios de la empresa",
            func=get_pricing_info
        ))
        
        # Herramienta de servicios
        def get_services_info(query: str = "") -> str:
            """Obtener información de servicios"""
            return "Servicios: Desarrollo web responsivo, Chatbots inteligentes, Automatización de procesos, Consultoría en IA, Capacitación tecnológica"
        
        tools.append(Tool(
            name="get_services_info",
            description="Obtener información de servicios de la empresa",
            func=get_services_info
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
- Usa la base de conocimientos para responder preguntas específicas
- Si no sabes algo, admítelo y ofrece contactar con un humano
- Mantén el contexto de la conversación
- Responde en el mismo idioma que el usuario
- Para consultas complejas, ofrece programar una llamada
- Usa las herramientas disponibles para obtener información precisa

HERRAMIENTAS DISPONIBLES:
- search_knowledge: Buscar en la base de conocimientos
- get_business_hours: Obtener horarios
- get_contact_info: Obtener contacto
- get_pricing_info: Obtener precios
- get_services_info: Obtener servicios"""),
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
        
        return response
    
    def get_conversation_history(self, user_id: str = None) -> List[Dict]:
        """Obtener historial de conversación"""
        if user_id:
            return [conv for conv in self.conversation_history if conv["user_id"] == user_id]
        return self.conversation_history
    
    def get_memory_summary(self) -> str:
        """Obtener resumen de la memoria"""
        try:
            return self.memory.moving_summary_buffer
        except:
            return "No hay resumen disponible"
    
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
    agent = AgenteReal(openai_api_key=os.getenv('OPENAI_API_KEY'))
    
    # Probar con diferentes mensajes
    print("🤖 Probando agente real...")
    
    test_messages = [
        "Hola, ¿cuáles son sus precios?",
        "¿Qué servicios ofrecen?",
        "¿Cuáles son sus horarios?",
        "¿Cómo puedo contactarlos?"
    ]
    
    for msg in test_messages:
        response = agent.process_message(msg, "user123", "test")
        print(f"Usuario: {msg}")
        print(f"Bot: {response}")
        print("-" * 50)
    
    # Mostrar historial
    print("\n📚 Historial de conversaciones:")
    for conv in agent.get_conversation_history():
        print(f"[{conv['timestamp']}] {conv['message']} -> {conv['response'][:50]}...")
