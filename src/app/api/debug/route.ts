import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    langsmith_api_key: process.env.LANGSMITH_API_KEY ? '✅ Configurada' : '❌ No configurada',
    langsmith_tracing: process.env.LANGSMITH_TRACING,
    langsmith_endpoint: process.env.LANGSMITH_ENDPOINT,
    langsmith_project: process.env.LANGSMITH_PROJECT,
    openai_api_key: process.env.OPENAI_API_KEY ? '✅ Configurada' : '❌ No configurada',
    node_env: process.env.NODE_ENV,
    vercel_env: process.env.VERCEL_ENV,
  });
}
