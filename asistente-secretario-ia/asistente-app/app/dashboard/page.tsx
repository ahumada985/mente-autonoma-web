'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface List {
  id: string;
  tipo: string;
  titulo: string;
  items: string[];
  completado: boolean;
  updated_at: string;
}

export default function DashboardPage() {
  const [lists, setLists] = useState<List[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatId, setChatId] = useState('');

  // Cargar listas
  const loadLists = async () => {
    if (!chatId) return;

    try {
      const response = await fetch(`/api/lists?chatId=${chatId}`);
      const data = await response.json();
      setLists(data.lists || []);
    } catch (error) {
      console.error('Error loading lists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chatId) {
      loadLists();
    }
  }, [chatId]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              📊 Dashboard - Super Humano Digital
            </h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Volver
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Input Chat ID */}
        {!chatId && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Ingresa tu Chat ID</h2>
            <p className="text-sm text-gray-600 mb-4">
              Puedes obtener tu Chat ID enviando /start a tu bot de Telegram
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ej: 123456789"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setChatId((e.target as HTMLInputElement).value);
                  }
                }}
              />
              <button
                onClick={(e) => {
                  const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                  setChatId(input.value);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Cargar
              </button>
            </div>
          </div>
        )}

        {/* Lists Display */}
        {chatId && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Mis Listas ({lists.length})
              </h2>
              <button
                onClick={loadLists}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium"
              >
                🔄 Actualizar
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Cargando listas...</p>
              </div>
            ) : lists.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No tienes listas aún
                </h3>
                <p className="text-gray-600">
                  Envía un mensaje a tu bot de Telegram para crear tu primera lista
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {list.titulo}
                      </h3>
                      {list.completado && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          ✓ Completada
                        </span>
                      )}
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">
                        {list.items.length} items
                      </p>
                      <ul className="space-y-1">
                        {list.items.slice(0, 5).map((item, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-start"
                          >
                            <span className="mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                        {list.items.length > 5 && (
                          <li className="text-sm text-gray-500 italic">
                            ... y {list.items.length - 5} más
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="text-xs text-gray-400 border-t pt-3">
                      Actualizada: {new Date(list.updated_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
