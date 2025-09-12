'use client';

import React, { useState, useEffect } from 'react';
import { knowledgeBase, KnowledgeItem, KnowledgeCategory } from '@/lib/knowledge-base';

export default function KnowledgeAdminPage() {
  const [categories, setCategories] = useState<KnowledgeCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);
  const [newItem, setNewItem] = useState({
    title: '',
    content: '',
    tags: '',
    priority: 5
  });

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const cats = knowledgeBase.getCategories();
    setCategories(cats);
    if (cats.length > 0 && !selectedCategory) {
      setSelectedCategory(cats[0].id);
    }
  };

  const handleAddItem = () => {
    if (!selectedCategory || !newItem.title || !newItem.content) return;

    const tags = newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const success = knowledgeBase.addKnowledgeItem(selectedCategory, {
      category: selectedCategory,
      title: newItem.title,
      content: newItem.content,
      tags,
      priority: newItem.priority
    });

    if (success) {
      loadCategories();
      setNewItem({ title: '', content: '', tags: '', priority: 5 });
      setShowAddForm(false);
    }
  };

  const handleEditItem = (item: KnowledgeItem) => {
    setEditingItem(item);
    setNewItem({
      title: item.title,
      content: item.content,
      tags: item.tags.join(', '),
      priority: item.priority
    });
    setShowAddForm(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;

    const tags = newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const success = knowledgeBase.updateKnowledgeItem(editingItem.id, {
      title: newItem.title,
      content: newItem.content,
      tags,
      priority: newItem.priority
    });

    if (success) {
      loadCategories();
      setEditingItem(null);
      setNewItem({ title: '', content: '', tags: '', priority: 5 });
      setShowAddForm(false);
    }
  };

  const handleDeleteItem = (itemId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      knowledgeBase.deleteKnowledgeItem(itemId);
      loadCategories();
    }
  };

  const filteredItems = selectedCategory 
    ? categories.find(cat => cat.id === selectedCategory)?.items || []
    : [];

  const searchResults = searchQuery 
    ? knowledgeBase.searchKnowledge(searchQuery)
    : [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrador de Base de Conocimiento</h1>
          <p className="mt-2 text-gray-600">Gestiona la información que usa el chatbot</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar en la base de conocimiento..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">Categorías</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name} ({category.items.length})
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                + Agregar Elemento
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {searchQuery ? (
              /* Search Results */
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">
                    Resultados de búsqueda: "{searchQuery}" ({searchResults.length})
                  </h3>
                </div>
                <div className="p-6">
                  {searchResults.length === 0 ? (
                    <p className="text-gray-500">No se encontraron resultados</p>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 mt-1">{item.content}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {item.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Category Items */
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold">
                    {categories.find(cat => cat.id === selectedCategory)?.name || 'Selecciona una categoría'}
                  </h3>
                </div>
                <div className="p-6">
                  {filteredItems.length === 0 ? (
                    <p className="text-gray-500">No hay elementos en esta categoría</p>
                  ) : (
                    <div className="space-y-4">
                      {filteredItems.map(item => (
                        <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <p className="text-gray-600 mt-1">{item.content}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {item.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <p className="text-xs text-gray-400 mt-2">
                                Prioridad: {item.priority} | Actualizado: {new Date(item.lastUpdated).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => handleEditItem(item)}
                                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4">
              <h3 className="text-lg font-semibold mb-4">
                {editingItem ? 'Editar Elemento' : 'Agregar Nuevo Elemento'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título
                  </label>
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Título del elemento"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenido
                  </label>
                  <textarea
                    value={newItem.content}
                    onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                    placeholder="Contenido del elemento"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (separados por comas)
                  </label>
                  <input
                    type="text"
                    value={newItem.tags}
                    onChange={(e) => setNewItem({...newItem, tags: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridad (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newItem.priority}
                    onChange={(e) => setNewItem({...newItem, priority: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingItem(null);
                    setNewItem({ title: '', content: '', tags: '', priority: 5 });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  {editingItem ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
