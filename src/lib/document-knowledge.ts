// Sistema de base de conocimiento basado en documentos
import fs from 'fs';
import path from 'path';

export interface DocumentKnowledge {
  id: string;
  title: string;
  content: string;
  category: string;
  lastModified: Date;
}

class DocumentKnowledgeBase {
  private documents: DocumentKnowledge[] = [];
  private knowledgePath: string;

  constructor() {
    this.knowledgePath = path.join(process.cwd(), 'src', 'data', 'knowledge-base');
    this.loadDocuments();
  }

  // Cargar todos los documentos de la carpeta
  private loadDocuments() {
    try {
      const files = fs.readdirSync(this.knowledgePath);
      
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const filePath = path.join(this.knowledgePath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const stats = fs.statSync(filePath);
          
          const document: DocumentKnowledge = {
            id: file.replace('.md', ''),
            title: this.extractTitle(content),
            content: content,
            category: this.extractCategory(file),
            lastModified: stats.mtime
          };
          
          this.documents.push(document);
        }
      });
      
      console.log(`📚 Cargados ${this.documents.length} documentos de conocimiento`);
    } catch (error) {
      console.error('Error cargando documentos:', error);
    }
  }

  // Extraer título del documento
  private extractTitle(content: string): string {
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('# ')) {
        return line.replace('# ', '').trim();
      }
    }
    return 'Documento sin título';
  }

  // Extraer categoría del nombre del archivo
  private extractCategory(filename: string): string {
    const categoryMap: { [key: string]: string } = {
      'quienes-somos': 'Empresa',
      'servicios': 'Servicios',
      'casos-exito': 'Casos de Éxito',
      'contacto': 'Contacto',
      'tecnologias': 'Tecnologías',
      'precios': 'Precios'
    };
    
    const key = filename.replace('.md', '');
    return categoryMap[key] || 'General';
  }

  // Buscar información relevante en los documentos
  searchKnowledge(query: string, maxResults: number = 3): DocumentKnowledge[] {
    const searchTerm = query.toLowerCase();
    const results: { document: DocumentKnowledge; score: number }[] = [];

    this.documents.forEach(doc => {
      let score = 0;
      const searchableText = `${doc.title} ${doc.content}`.toLowerCase();
      
      // Buscar en título (mayor peso)
      if (doc.title.toLowerCase().includes(searchTerm)) {
        score += 10;
      }
      
      // Buscar en contenido
      const contentMatches = (searchableText.match(new RegExp(searchTerm, 'g')) || []).length;
      score += contentMatches * 2;
      
      // Buscar palabras clave
      const queryWords = searchTerm.split(' ');
      queryWords.forEach(word => {
        if (searchableText.includes(word)) {
          score += 1;
        }
      });
      
      if (score > 0) {
        results.push({ document: doc, score });
      }
    });

    // Ordenar por relevancia y devolver los mejores resultados
    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map(result => result.document);
  }

  // Obtener contexto para el prompt del chatbot
  getContextForPrompt(userMessage: string): string {
    const relevantDocs = this.searchKnowledge(userMessage, 2);
    
    if (relevantDocs.length === 0) {
      return '';
    }

    let context = '\n\nINFORMACIÓN RELEVANTE DE LA BASE DE CONOCIMIENTO:\n';
    
    relevantDocs.forEach(doc => {
      context += `\n--- ${doc.title} (${doc.category}) ---\n`;
      context += `${doc.content}\n`;
    });
    
    return context;
  }

  // Obtener todos los documentos
  getAllDocuments(): DocumentKnowledge[] {
    return this.documents;
  }

  // Obtener documentos por categoría
  getDocumentsByCategory(category: string): DocumentKnowledge[] {
    return this.documents.filter(doc => doc.category === category);
  }

  // Obtener un documento específico
  getDocument(id: string): DocumentKnowledge | undefined {
    return this.documents.find(doc => doc.id === id);
  }

  // Recargar documentos (útil para desarrollo)
  reloadDocuments() {
    this.documents = [];
    this.loadDocuments();
  }
}

// Instancia global
export const documentKnowledge = new DocumentKnowledgeBase();
