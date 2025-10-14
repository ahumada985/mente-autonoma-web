import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            🤖 Super Humano Digital
          </h1>
          <p className="text-xl text-gray-700 mb-12">
            Tu asistente personal inteligente con memoria a largo plazo
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-lg font-semibold mb-2">Listas Inteligentes</h3>
              <p className="text-gray-600">
                Gestiona listas de supermercado, tareas, películas y más
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-lg font-semibold mb-2">Memoria RAG</h3>
              <p className="text-gray-600">
                Recuerda tus conversaciones y responde con contexto
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-lg font-semibold mb-2">Multimodal</h3>
              <p className="text-gray-600">
                Texto, voz e imágenes - procesa todo tipo de contenido
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6">Estado del Sistema</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-blue-600">✅</div>
                <div className="text-sm text-gray-600 mt-2">Supabase</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">✅</div>
                <div className="text-sm text-gray-600 mt-2">OpenAI API</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600">✅</div>
                <div className="text-sm text-gray-600 mt-2">RAG System</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-600">✅</div>
                <div className="text-sm text-gray-600 mt-2">Next.js 15</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Ir al Dashboard
            </Link>
            <div className="text-gray-600">
              o usa el bot de Telegram{' '}
              <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                @TuBotAqui
              </span>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Powered by:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              <span className="bg-white px-4 py-2 rounded-full shadow">Next.js 15</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">Supabase</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">OpenAI GPT-4o</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">pgvector</span>
              <span className="bg-white px-4 py-2 rounded-full shadow">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
