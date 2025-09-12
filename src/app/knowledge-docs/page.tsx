'use client';

import React, { useState, useEffect } from 'react';

interface DocumentKnowledge {
  id: string;
  title: string;
  content: string;
  category: string;
  lastModified: string;
}

export default function KnowledgeDocsPage() {
  const [documents, setDocuments] = useState<DocumentKnowledge[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentKnowledge | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/knowledge-docs');
      if (response.ok) {
        const docs = await response.json();
        setDocuments(docs);
      }
    } catch (error) {
      console.error('Error cargando documentos:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(documents.map(doc => doc.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando documentos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Base de Conocimiento</h1>
          <p className="mt-2 text-gray-600">Documentos que usa el chatbot para responder preguntas</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar en los documentos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Lista de documentos */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Documentos</h3>
              
              {/* Categorías */}
              {categories.map(category => (
                <div key={category} className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">{category}</h4>
                  <div className="space-y-1">
                    {filteredDocs
                      .filter(doc => doc.category === category)
                      .map(doc => (
                        <button
                          key={doc.id}
                          onClick={() => setSelectedDoc(doc)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedDoc?.id === doc.id
                              ? 'bg-blue-100 text-blue-700'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {doc.title}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Content - Documento seleccionado */}
          <div className="lg:col-span-2">
            {selectedDoc ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedDoc.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedDoc.category} • Actualizado: {new Date(selectedDoc.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div className="p-6">
                  <div className="prose max-w-none">
                    <div className="relative">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700 blur-sm select-none pointer-events-none">
                        {selectedDoc.content}
                      </pre>
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                        <div className="text-center">
                          <div className="text-4xl mb-4">🔒</div>
                          <h3 className="text-lg font-semibold text-gray-700 mb-2">Contenido Protegido</h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Este contenido es confidencial y solo el chatbot puede acceder a él
                          </p>
                          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                            <span className="mr-2">🤖</span>
                            Solo visible para IA
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Selecciona un documento</h3>
                  <p className="mt-1 text-sm text-gray-500">Elige un documento de la lista para ver su contenido</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">¿Cómo funciona?</h3>
          <p className="text-blue-800">
            El chatbot usa estos documentos para responder preguntas. Cuando un usuario pregunta algo, 
            el sistema busca información relevante en estos documentos y la incluye en la respuesta.
          </p>
          <div className="mt-4 text-sm text-blue-700">
            <p><strong>Total de documentos:</strong> {documents.length}</p>
            <p><strong>Categorías:</strong> {categories.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
