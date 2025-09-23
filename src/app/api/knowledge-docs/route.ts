import { NextResponse } from 'next/server';
import { documentKnowledge } from '@/lib/document-knowledge';

export async function GET() {
  try {
    const documents = documentKnowledge.getAllDocuments();
    
    // Convertir las fechas a string para JSON
    const documentsWithStringDates = documents.map(doc => ({
      ...doc,
      lastModified: doc.lastModified.toISOString()
    }));
    
    return NextResponse.json(documentsWithStringDates);
  } catch (error) {
    console.error('Error obteniendo documentos:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}
