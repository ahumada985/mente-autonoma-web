'use client';

import React, { useState } from 'react';

interface AvatarOption {
  id: number;
  name: string;
  gender: 'female' | 'male';
  description: string;
}

export default function ChatbotConfiguracion() {
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [avatarMode, setAvatarMode] = useState<'none' | 'avatar'>('avatar');
  const [selectedTheme, setSelectedTheme] = useState<'blue' | 'green' | 'red' | 'purple'>('blue');
  const [selectedPosition, setSelectedPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right');

  const avatarOptions: AvatarOption[] = [
    {
      id: 1,
      name: 'María',
      gender: 'female',
      description: 'Asistente profesional con experiencia en atención al cliente'
    },
    {
      id: 2,
      name: 'Carlos',
      gender: 'male',
      description: 'Ejecutivo especializado en soluciones empresariales'
    },
    {
      id: 3,
      name: 'Jenny',
      gender: 'female',
      description: 'Especialista joven en tecnología y soporte técnico'
    },
    {
      id: 4,
      name: 'Valeria',
      gender: 'female',
      description: 'Experta técnica en desarrollo y programación'
    },
    {
      id: 5,
      name: 'Catalina',
      gender: 'female',
      description: 'Consultora educativa y de capacitación'
    },
    {
      id: 6,
      name: 'Andrés',
      gender: 'male',
      description: 'Especialista en marketing digital y ventas'
    }
  ];

  const themes = [
    {
      id: 'purple',
      name: 'Morado Elegante',
      color: 'from-purple-500 to-purple-600',
      widget: 'from-purple-500 via-pink-500 to-indigo-600'
    },
    {
      id: 'blue',
      name: 'Azul Océano',
      color: 'from-blue-500 to-blue-600',
      widget: 'from-blue-500 via-cyan-500 to-indigo-600'
    },
    {
      id: 'green',
      name: 'Verde Naturaleza',
      color: 'from-green-500 to-green-600',
      widget: 'from-green-500 via-emerald-500 to-teal-600'
    },
    {
      id: 'red',
      name: 'Rojo Dinámico',
      color: 'from-red-500 to-red-600',
      widget: 'from-red-500 via-orange-500 to-pink-600'
    }
  ];

  const generateCode = () => {
    const avatarParam = avatarMode === 'avatar' ? `
        data-avatar="avatar${selectedAvatar}"
        data-avatar-name="${avatarOptions.find(a => a.id === selectedAvatar)?.name}"` : '';

    return `<script src="http://localhost:8001/widget.js"
        data-client="mi-empresa"
        data-theme="${selectedTheme}"
        data-position="${selectedPosition}"${avatarParam}></script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateCode());
    alert('¡Código copiado al portapapeles!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Configurador de Chatbot</h1>
              <p className="text-gray-600">Personaliza tu asistente virtual</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">

          {/* Modo Avatar */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎭 Modo de Avatar</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setAvatarMode('none')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  avatarMode === 'none'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">❌</div>
                  <div className="font-medium">Sin Avatar</div>
                  <div className="text-sm text-gray-500">Solo texto</div>
                </div>
              </button>
              <button
                onClick={() => setAvatarMode('avatar')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  avatarMode === 'avatar'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">👤</div>
                  <div className="font-medium">Con Avatar</div>
                  <div className="text-sm text-gray-500">Cara humana</div>
                </div>
              </button>
            </div>
          </div>

          {/* Selección de Avatar */}
          {avatarMode === 'avatar' && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">👥 Seleccionar Avatar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar.id}
                    onClick={() => setSelectedAvatar(avatar.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedAvatar === avatar.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-300 via-pink-300 to-purple-400 flex items-center justify-center relative overflow-hidden">
                        <img
                          src="/avatar-maria.png"
                          alt={avatar.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{avatar.name}</h3>
                        <p className="text-sm text-gray-600">{avatar.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tema de Colores */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">🎨 Tema de Colores</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id as any)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    selectedTheme === theme.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${theme.color} mx-auto mb-2`}></div>
                    <div className="font-medium text-sm">{theme.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Código de Integración */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">📋 Código de Integración</h2>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-sm overflow-x-auto">
              <pre>{generateCode()}</pre>
            </div>
            <div className="mt-4 flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📋 Copiar Código
              </button>
              <div className="text-sm text-gray-600 flex items-center">
                Solo pega este código en tu sitio web y el chatbot aparecerá automáticamente
              </div>
            </div>
          </div>

          {/* Vista Previa */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">👀 Vista Previa</h2>
            <div className="relative bg-gray-100 rounded-lg h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">🖥️</div>
                  <div>Tu sitio web</div>
                </div>
              </div>

              {/* Widget Preview */}
              <div className={`absolute ${selectedPosition === 'bottom-right' ? 'bottom-4 right-4' : 'bottom-4 left-4'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center relative overflow-hidden shadow-2xl ring-2 ring-white/30`}>
                  {/* Fondo animado basado en tema seleccionado */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${themes.find(t => t.id === selectedTheme)?.widget} animate-pulse`}></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-yellow-300/30 animate-spin" style={{animationDuration: '4s'}}></div>

                  {/* Efectos de brillo */}
                  <div className="absolute top-1 left-2 w-1.5 h-1.5 bg-white/90 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 right-1 w-1 h-1 bg-yellow-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>

                  {avatarMode === 'avatar' ? (
                    <img
                      src="/avatar-maria.png"
                      alt="Avatar Preview"
                      className="relative z-10 w-3/4 h-3/4 object-contain filter drop-shadow-lg"
                    />
                  ) : (
                    <div className="relative z-10 text-2xl text-white filter drop-shadow-lg animate-pulse">💬</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Configuración actual:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Avatar: {avatarMode === 'avatar' ? avatarOptions.find(a => a.id === selectedAvatar)?.name : 'Sin avatar'}</li>
                <li>• Tema: {themes.find(t => t.id === selectedTheme)?.name}</li>
                <li>• Posición: {selectedPosition === 'bottom-right' ? 'Inferior Derecha' : 'Inferior Izquierda'}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}