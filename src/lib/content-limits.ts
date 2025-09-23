// Sistema de límites de contenido por plan

export interface PlanLimits {
  maxDocuments: number;
  maxContentLength: number; // Caracteres por documento
  maxTotalContent: number;   // Total de caracteres por cliente
  allowedTypes: string[];
}

export const PLAN_LIMITS: Record<string, PlanLimits> = {
  basic: {
    maxDocuments: 5,
    maxContentLength: 2000,     // 2,000 caracteres por documento
    maxTotalContent: 8000,      // 8,000 caracteres totales
    allowedTypes: ['about', 'services', 'faq']
  },
  pro: {
    maxDocuments: 20,
    maxContentLength: 5000,     // 5,000 caracteres por documento
    maxTotalContent: 50000,     // 50,000 caracteres totales
    allowedTypes: ['about', 'services', 'faq', 'cases', 'values']
  },
  premium: {
    maxDocuments: 999999,
    maxContentLength: 20000,    // 20,000 caracteres por documento
    maxTotalContent: 999999999, // Sin límite práctico
    allowedTypes: ['about', 'services', 'faq', 'cases', 'values', 'policies']
  }
};

export function validateContent(plan: string, content: string, clientTotalContent: number): {
  valid: boolean;
  error?: string;
  suggestions?: string[];
} {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.basic;

  // Validar longitud del documento individual
  if (content.length > limits.maxContentLength) {
    return {
      valid: false,
      error: `Documento demasiado largo. Máximo ${limits.maxContentLength} caracteres para plan ${plan}`,
      suggestions: [
        `Dividir en ${Math.ceil(content.length / limits.maxContentLength)} documentos más pequeños`,
        `Upgrader a plan superior para más espacio`,
        `Resumir el contenido manteniendo lo esencial`
      ]
    };
  }

  // Validar contenido total del cliente
  const newTotal = clientTotalContent + content.length;
  if (newTotal > limits.maxTotalContent) {
    return {
      valid: false,
      error: `Límite total de contenido alcanzado. Máximo ${limits.maxTotalContent} caracteres para plan ${plan}`,
      suggestions: [
        `Eliminar documentos antiguos para hacer espacio`,
        `Upgrader a plan superior`,
        `Optimizar contenido existente`
      ]
    };
  }

  return { valid: true };
}

// Función para sugerir división de contenido
export function suggestContentDivision(content: string, maxLength: number): {
  suggestedParts: string[];
  titles: string[];
} {
  const words = content.split(' ');
  const parts: string[] = [];
  const titles: string[] = [];

  let currentPart = '';
  let partIndex = 1;

  for (const word of words) {
    if ((currentPart + ' ' + word).length > maxLength) {
      parts.push(currentPart.trim());
      titles.push(`Documento ${partIndex}`);
      currentPart = word;
      partIndex++;
    } else {
      currentPart += (currentPart ? ' ' : '') + word;
    }
  }

  if (currentPart) {
    parts.push(currentPart.trim());
    titles.push(`Documento ${partIndex}`);
  }

  return { suggestedParts: parts, titles };
}

// Detectar si el contenido parece ser "pegado masivo"
export function detectMassivePaste(content: string): {
  suspicious: boolean;
  reasons: string[];
  confidence: number;
} {
  const reasons: string[] = [];
  let suspicionScore = 0;

  // 1. Muy largo para ser escrito manualmente
  if (content.length > 5000) {
    reasons.push('Contenido excesivamente largo');
    suspicionScore += 30;
  }

  // 2. Múltiples secciones claramente diferentes
  const sections = content.split(/\n\s*\n|\n-|\n\d+\./).length;
  if (sections > 10) {
    reasons.push('Múltiples secciones detectadas');
    suspicionScore += 25;
  }

  // 3. Cambios abruptos de tema
  const topics = ['precio', 'horario', 'servicio', 'historia', 'contacto', 'producto'];
  const topicCount = topics.filter(topic =>
    content.toLowerCase().includes(topic)
  ).length;

  if (topicCount > 4) {
    reasons.push('Múltiples temas mezclados');
    suspicionScore += 20;
  }

  // 4. Formato inconsistente
  if (content.includes('•') && content.includes('-') && content.includes('1.')) {
    reasons.push('Formatos de lista mezclados');
    suspicionScore += 15;
  }

  // 5. URLs o referencias externas
  if (content.match(/https?:\/\/|www\./)) {
    reasons.push('Contiene URLs (posible copia de web)');
    suspicionScore += 20;
  }

  return {
    suspicious: suspicionScore > 50,
    reasons,
    confidence: Math.min(suspicionScore, 100)
  };
}