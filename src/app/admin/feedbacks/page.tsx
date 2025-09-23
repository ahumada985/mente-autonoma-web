'use client';

import React, { useState, useEffect } from 'react';
import { feedbackManager, UnprocessedFeedback } from '../../../lib/supabase-feedback';
import { 
  MessageSquare, 
  ThumbsDown, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  RefreshCw,
  Eye,
  MessageCircle
} from 'lucide-react';

export default function FeedbacksAdminPage() {
  const [feedbacks, setFeedbacks] = useState<UnprocessedFeedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<UnprocessedFeedback | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [filter, setFilter] = useState<'all' | 'unprocessed' | 'processed'>('unprocessed');

  useEffect(() => {
    loadFeedbacks();
    
    // Suscribirse a cambios en tiempo real
    const subscription = feedbackManager.subscribeToFeedbacks((newFeedbacks) => {
      setFeedbacks(newFeedbacks);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadFeedbacks = async () => {
    try {
      setLoading(true);
      const data = await feedbackManager.getUnprocessedFeedbacks();
      setFeedbacks(data);
    } catch (error) {
      console.error('Error loading feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsProcessed = async (feedbackId: string) => {
    try {
      await feedbackManager.markFeedbackAsProcessed(feedbackId, adminNotes);
      setAdminNotes('');
      setSelectedFeedback(null);
      await loadFeedbacks();
    } catch (error) {
      console.error('Error marking feedback as processed:', error);
    }
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    if (filter === 'unprocessed') return !feedback.is_processed;
    if (filter === 'processed') return feedback.is_processed;
    return true;
  });

  const unprocessedCount = feedbacks.filter(f => !f.is_processed).length;
  const processedCount = feedbacks.filter(f => f.is_processed).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Feedbacks</h1>
              <p className="text-gray-600 mt-2">Gestiona los comentarios y calificaciones del chatbot</p>
            </div>
            <button
              onClick={loadFeedbacks}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualizar
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pendientes</p>
                <p className="text-2xl font-semibold text-gray-900">{unprocessedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Procesados</p>
                <p className="text-2xl font-semibold text-gray-900">{processedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="text-2xl font-semibold text-gray-900">{feedbacks.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('unprocessed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'unprocessed'
                  ? 'bg-red-100 text-red-700 border-2 border-red-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Pendientes ({unprocessedCount})
            </button>
            <button
              onClick={() => setFilter('processed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'processed'
                  ? 'bg-green-100 text-green-700 border-2 border-green-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Procesados ({processedCount})
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              Todos ({feedbacks.length})
            </button>
          </div>
        </div>

        {/* Feedbacks List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Feedbacks</h3>
          </div>
          
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No hay feedbacks para mostrar</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <ThumbsDown className="w-4 h-4 text-red-500" />
                        <span className="text-sm font-medium text-gray-900">
                          Feedback #{feedback.id.slice(-8)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          feedback.is_processed 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {feedback.is_processed ? 'Procesado' : 'Pendiente'}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3">{feedback.feedback}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                        <div>
                          <p><strong>Mensaje del usuario:</strong></p>
                          <p className="mt-1 p-2 bg-gray-100 rounded">{feedback.user_message}</p>
                        </div>
                        <div>
                          <p><strong>Respuesta del bot:</strong></p>
                          <p className="mt-1 p-2 bg-gray-100 rounded">{feedback.bot_response}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {new Date(feedback.created_at).toLocaleString()}
                        </div>
                        <div>
                          <strong>Sesión:</strong> {feedback.session_id.slice(-8)}
                        </div>
                        <div>
                          <strong>Página:</strong> {feedback.page_url ? new URL(feedback.page_url).pathname : 'N/A'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-4 flex space-x-2">
                      <button
                        onClick={() => setSelectedFeedback(feedback)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {!feedback.is_processed && (
                        <button
                          onClick={() => handleMarkAsProcessed(feedback.id)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                          Marcar como procesado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal para detalles */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Detalles del Feedback</h3>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Comentario del usuario
                    </label>
                    <p className="p-3 bg-gray-100 rounded">{selectedFeedback.feedback}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notas del administrador
                    </label>
                    <textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                      placeholder="Agrega notas sobre este feedback..."
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => setSelectedFeedback(null)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => handleMarkAsProcessed(selectedFeedback.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                      Marcar como procesado
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
