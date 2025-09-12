// Sistema de base de conocimiento externa para el chatbot
export interface KnowledgeItem {
  id: string;
  category: string;
  title: string;
  content: string;
  tags: string[];
  priority: number; // 1-10, mayor = más importante
  lastUpdated: string;
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  items: KnowledgeItem[];
}

class KnowledgeBase {
  private categories: KnowledgeCategory[] = [];

  constructor() {
    this.loadDefaultKnowledge();
  }

  // Cargar conocimiento por defecto
  private loadDefaultKnowledge() {
    this.categories = [
      {
        id: 'empresa',
        name: 'Información de la Empresa',
        description: 'Datos generales sobre Mente Autónoma',
        items: [
          {
            id: 'empresa-1',
            category: 'empresa',
            title: 'Servicios Principales',
            content: 'Desarrollo web responsivo, Chatbots inteligentes, Automatización de procesos, Consultoría en IA, Capacitación tecnológica',
            tags: ['servicios', 'desarrollo', 'chatbot', 'automatización'],
            priority: 10,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'empresa-2',
            category: 'empresa',
            title: 'Precios y Tarifas',
            content: 'Desarrollo web desde $500.000 CLP, Chatbots desde $300.000 CLP, Consultoría $150.000 CLP/hora, Capacitación $200.000 CLP/día',
            tags: ['precios', 'tarifas', 'costos'],
            priority: 9,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'empresa-3',
            category: 'empresa',
            title: 'Información de Contacto',
            content: 'Teléfono: +56 9 1234 5678, Email: contacto@empresa.com, Ubicación: Antofagasta, Chile',
            tags: ['contacto', 'telefono', 'email', 'ubicacion'],
            priority: 10,
            lastUpdated: new Date().toISOString()
          }
        ]
      },
      {
        id: 'tecnologias',
        name: 'Tecnologías',
        description: 'Stack tecnológico y herramientas utilizadas',
        items: [
          {
            id: 'tech-1',
            category: 'tecnologias',
            title: 'Frontend',
            content: 'React, Vue.js, Angular, Next.js, TypeScript, Tailwind CSS',
            tags: ['frontend', 'react', 'vue', 'angular'],
            priority: 8,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'tech-2',
            category: 'tecnologias',
            title: 'Backend',
            content: 'Node.js, Python, Django, Flask, Express.js, FastAPI',
            tags: ['backend', 'nodejs', 'python', 'django'],
            priority: 8,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'tech-3',
            category: 'tecnologias',
            title: 'IA y Machine Learning',
            content: 'OpenAI GPT, LangChain, TensorFlow, PyTorch, Scikit-learn',
            tags: ['ia', 'machine-learning', 'openai', 'langchain'],
            priority: 9,
            lastUpdated: new Date().toISOString()
          }
        ]
      },
      {
        id: 'casos-exito',
        name: 'Casos de Éxito',
        description: 'Proyectos exitosos y resultados obtenidos',
        items: [
          {
            id: 'caso-1',
            category: 'casos-exito',
            title: 'E-commerce con 300% aumento en ventas',
            content: 'Desarrollamos una plataforma de e-commerce que aumentó las ventas en un 300% mediante optimización de UX y SEO',
            tags: ['ecommerce', 'ventas', 'optimizacion'],
            priority: 7,
            lastUpdated: new Date().toISOString()
          },
          {
            id: 'caso-2',
            category: 'casos-exito',
            title: 'Chatbot que redujo 80% consultas telefónicas',
            content: 'Implementamos un chatbot inteligente que redujo las consultas telefónicas en un 80%, mejorando la eficiencia del servicio al cliente',
            tags: ['chatbot', 'atencion-cliente', 'eficiencia'],
            priority: 8,
            lastUpdated: new Date().toISOString()
          }
        ]
      }
    ];
  }

  // Buscar conocimiento por término
  searchKnowledge(query: string, category?: string): KnowledgeItem[] {
    const searchTerm = query.toLowerCase();
    let results: KnowledgeItem[] = [];

    this.categories.forEach(cat => {
      if (category && cat.id !== category) return;
      
      cat.items.forEach(item => {
        const searchableText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
        if (searchableText.includes(searchTerm)) {
          results.push(item);
        }
      });
    });

    // Ordenar por prioridad y relevancia
    return results.sort((a, b) => {
      const aRelevance = this.calculateRelevance(a, searchTerm);
      const bRelevance = this.calculateRelevance(b, searchTerm);
      return (b.priority + bRelevance) - (a.priority + aRelevance);
    });
  }

  // Calcular relevancia del resultado
  private calculateRelevance(item: KnowledgeItem, query: string): number {
    const queryWords = query.split(' ');
    let relevance = 0;
    
    queryWords.forEach(word => {
      if (item.title.toLowerCase().includes(word)) relevance += 3;
      if (item.content.toLowerCase().includes(word)) relevance += 2;
      if (item.tags.some(tag => tag.includes(word))) relevance += 1;
    });
    
    return relevance;
  }

  // Obtener contexto para el prompt del chatbot
  getContextForPrompt(userMessage: string): string {
    const relevantKnowledge = this.searchKnowledge(userMessage);
    
    if (relevantKnowledge.length === 0) {
      return '';
    }

    let context = '\n\nINFORMACIÓN RELEVANTE DE LA BASE DE CONOCIMIENTO:\n';
    
    relevantKnowledge.slice(0, 3).forEach(item => {
      context += `- ${item.title}: ${item.content}\n`;
    });
    
    return context;
  }

  // Agregar nuevo conocimiento
  addKnowledgeItem(categoryId: string, item: Omit<KnowledgeItem, 'id' | 'lastUpdated'>): boolean {
    const category = this.categories.find(cat => cat.id === categoryId);
    if (!category) return false;

    const newItem: KnowledgeItem = {
      ...item,
      id: `${categoryId}-${Date.now()}`,
      lastUpdated: new Date().toISOString()
    };

    category.items.push(newItem);
    this.saveToLocalStorage();
    return true;
  }

  // Actualizar conocimiento existente
  updateKnowledgeItem(itemId: string, updates: Partial<KnowledgeItem>): boolean {
    for (const category of this.categories) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        Object.assign(item, updates);
        item.lastUpdated = new Date().toISOString();
        this.saveToLocalStorage();
        return true;
      }
    }
    return false;
  }

  // Eliminar conocimiento
  deleteKnowledgeItem(itemId: string): boolean {
    for (const category of this.categories) {
      const index = category.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        category.items.splice(index, 1);
        this.saveToLocalStorage();
        return true;
      }
    }
    return false;
  }

  // Obtener todas las categorías
  getCategories(): KnowledgeCategory[] {
    return this.categories;
  }

  // Obtener items por categoría
  getItemsByCategory(categoryId: string): KnowledgeItem[] {
    const category = this.categories.find(cat => cat.id === categoryId);
    return category ? category.items : [];
  }

  // Guardar en localStorage (solo en el cliente)
  private saveToLocalStorage() {
    if (typeof window === 'undefined') return; // No ejecutar en el servidor
    localStorage.setItem('knowledge_base', JSON.stringify(this.categories));
  }

  // Cargar desde localStorage (solo en el cliente)
  loadFromLocalStorage() {
    if (typeof window === 'undefined') return; // No ejecutar en el servidor
    
    const stored = localStorage.getItem('knowledge_base');
    if (stored) {
      try {
        this.categories = JSON.parse(stored);
      } catch (error) {
        console.error('Error cargando base de conocimiento:', error);
        this.loadDefaultKnowledge();
      }
    }
  }

  // Exportar base de conocimiento
  exportKnowledge(): string {
    return JSON.stringify(this.categories, null, 2);
  }

  // Importar base de conocimiento
  importKnowledge(jsonData: string): boolean {
    try {
      const imported = JSON.parse(jsonData);
      this.categories = imported;
      this.saveToLocalStorage();
      return true;
    } catch (error) {
      console.error('Error importando base de conocimiento:', error);
      return false;
    }
  }
}

// Instancia global
export const knowledgeBase = new KnowledgeBase();

// Cargar desde localStorage al inicializar
knowledgeBase.loadFromLocalStorage();
