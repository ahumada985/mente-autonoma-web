import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json({ error: 'No se encontró archivo de audio' }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedTypes = ['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/webm'];
    if (!allowedTypes.includes(audioFile.type)) {
      return NextResponse.json({ error: 'Tipo de archivo no soportado' }, { status: 400 });
    }

    // Validar tamaño (máximo 25MB según OpenAI)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: 'Archivo demasiado grande (máximo 25MB)' }, { status: 400 });
    }

    // Transcribir con OpenAI Whisper
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'es', // Español
      response_format: 'json',
      temperature: 0.2, // Menos creatividad, más precisión
    });

    return NextResponse.json({
      success: true,
      text: transcription.text,
      duration: audioFile.size, // Aproximado
      cost: calculateCost(audioFile.size) // Calcular costo aproximado
    });

  } catch (error) {
    console.error('Error en transcripción:', error);

    if (error instanceof Error) {
      // Manejar errores específicos de OpenAI
      if (error.message.includes('insufficient_quota')) {
        return NextResponse.json({
          error: 'Cuota de OpenAI agotada',
          details: 'Contacta al administrador'
        }, { status: 429 });
      }

      if (error.message.includes('invalid_api_key')) {
        return NextResponse.json({
          error: 'API Key inválida',
          details: 'Error de configuración'
        }, { status: 401 });
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Error procesando audio',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}

// Calcular costo aproximado (OpenAI cobra $0.006 por minuto)
function calculateCost(fileSizeBytes: number): number {
  // Estimación muy básica: 1MB ≈ 1 minuto de audio
  const estimatedMinutes = fileSizeBytes / (1024 * 1024);
  return Math.round(estimatedMinutes * 0.006 * 1000) / 1000; // Redondear a 3 decimales
}

export const config = {
  api: {
    bodyParser: false, // Necesario para manejar FormData
  },
};