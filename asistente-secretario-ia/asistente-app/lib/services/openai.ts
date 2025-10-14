import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Genera embeddings para búsqueda semántica
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
      encoding_format: 'float',
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
}

/**
 * Genera respuesta del chat con GPT-4o-mini
 */
export async function generateChatResponse(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  model: 'gpt-4o-mini' | 'gpt-4o' = 'gpt-4o-mini'
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 2000,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw new Error('Failed to generate chat response');
  }
}

/**
 * Transcribe audio (Whisper)
 */
export async function transcribeAudio(audioFile: File): Promise<string> {
  try {
    const response = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
      language: 'es',
    });

    return response.text;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw new Error('Failed to transcribe audio');
  }
}

/**
 * Analiza imagen con GPT-4o
 */
export async function analyzeImage(
  imageUrl: string,
  prompt: string = 'Describe esta imagen en detalle'
): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 1000,
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error analyzing image:', error);
    throw new Error('Failed to analyze image');
  }
}

export default openai;
