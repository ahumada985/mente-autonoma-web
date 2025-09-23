// 🤝 Sistema de Detección Automática de Handoff Humano

export interface HandoffDecision {
  shouldHandoff: boolean;
  reason: HandoffReason;
  priority: HandoffPriority;
  confidence: number;
  explanation: string;
  suggestedResponse?: string;
  ticket_created?: boolean;
}

export type HandoffReason =
  | 'complex_query'
  | 'escalation_request'
  | 'bot_failure'
  | 'specialized_knowledge'
  | 'complaint'
  | 'technical_support'
  | 'legal_query'
  | 'custom_request';

export type HandoffPriority = 'low' | 'medium' | 'high' | 'urgent';

// Palabras clave para diferentes tipos de handoff
const HANDOFF_KEYWORDS = {
  escalation: [
    'hablar con un humano', 'quiero hablar con una persona', 'gerente', 'supervisor',
    'jefe', 'encargado', 'responsable', 'atención al cliente', 'no entiendes',
    'eres un robot', 'no sirves', 'no me ayudas', 'contactar con', 'hablar con alguien'
  ],

  complaint: [
    'reclamo', 'queja', 'molesto', 'indignado', 'terrible', 'pésimo', 'horrible',
    'problema serio', 'muy mal', 'deficiente', 'insatisfecho', 'devolver dinero',
    'reembolso', 'cancelar', 'nunca más', 'disgusto', 'decepcionado'
  ],

  technical: [
    'no funciona', 'error', 'falla', 'defecto', 'roto', 'problema técnico',
    'no carga', 'no responde', 'se cuelga', 'instalación', 'configuración',
    'manual', 'instrucciones', 'garantía', 'servicio técnico'
  ],

  legal: [
    'demanda', 'abogado', 'legal', 'contrato', 'términos', 'condiciones',
    'política', 'privacidad', 'derecho', 'ley', 'regulación', 'cumplimiento'
  ],

  specialized: [
    'presupuesto personalizado', 'cotización especial', 'evento grande',
    'pedido especial', 'customizado', 'a medida', 'diseño específico',
    'necesidades particulares', 'caso especial', 'excepción'
  ],

  complex: [
    'múltiples', 'varios', 'combinación', 'integración', 'complejo',
    'detallado', 'específico', 'particular', 'exacto', 'preciso'
  ]
};

// Frases que indican frustración del usuario
const FRUSTRATION_INDICATORS = [
  'no entiendes', 'no me entiendes', 'no sirves', 'no funcionas',
  'eres inútil', 'no me ayudas', 'no sabes', 'no puedes',
  'estoy harto', 'ya probé', 'sigo sin', 'aún no', 'todavía no'
];

// Detectar si el bot debe derivar la consulta
export function detectHandoffNeed(
  userMessage: string,
  botResponse: string,
  conversationHistory: Array<{sender: string, message: string}> = [],
  clientContext?: any
): HandoffDecision {

  const normalizedMessage = userMessage.toLowerCase().trim();
  let score = 0;
  let detectedReasons: string[] = [];
  let priority: HandoffPriority = 'medium';

  // 1. 🚨 SOLICITUD EXPLÍCITA DE ESCALACIÓN (Prioridad Alta)
  const escalationFound = HANDOFF_KEYWORDS.escalation.some(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (escalationFound) {
    return {
      shouldHandoff: true,
      reason: 'escalation_request',
      priority: 'high',
      confidence: 95,
      explanation: 'Usuario solicita explícitamente hablar con un humano',
      suggestedResponse: 'Entiendo que prefieres hablar con una persona. Te conectaré con uno de nuestros especialistas.'
    };
  }

  // 2. 😟 QUEJAS O RECLAMOS (Prioridad Alta)
  const complaintKeywords = HANDOFF_KEYWORDS.complaint.filter(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (complaintKeywords.length > 0) {
    score += complaintKeywords.length * 30;
    detectedReasons.push('Palabras de queja detectadas');
    priority = 'high';
  }

  // 3. 🔧 PROBLEMAS TÉCNICOS
  const technicalKeywords = HANDOFF_KEYWORDS.technical.filter(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (technicalKeywords.length > 1) {
    score += technicalKeywords.length * 20;
    detectedReasons.push('Múltiples problemas técnicos mencionados');
    priority = priority === 'high' ? 'high' : 'medium';
  }

  // 4. ⚖️ CONSULTAS LEGALES
  const legalKeywords = HANDOFF_KEYWORDS.legal.filter(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (legalKeywords.length > 0) {
    score += 40;
    detectedReasons.push('Consulta legal detectada');
    priority = 'high';
  }

  // 5. 🎓 CONOCIMIENTO ESPECIALIZADO
  const specializedKeywords = HANDOFF_KEYWORDS.specialized.filter(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (specializedKeywords.length > 0) {
    score += specializedKeywords.length * 25;
    detectedReasons.push('Requerimiento especializado detectado');
  }

  // 6. 🤔 CONSULTA COMPLEJA
  const complexKeywords = HANDOFF_KEYWORDS.complex.filter(keyword =>
    normalizedMessage.includes(keyword)
  );

  if (complexKeywords.length > 1 && userMessage.length > 200) {
    score += 20;
    detectedReasons.push('Consulta compleja y extensa');
  }

  // 7. 😤 FRUSTRACIÓN DEL USUARIO
  const frustrationFound = FRUSTRATION_INDICATORS.some(indicator =>
    normalizedMessage.includes(indicator)
  );

  if (frustrationFound) {
    score += 35;
    detectedReasons.push('Frustración del usuario detectada');
    priority = 'high';
  }

  // 8. 🔄 CONVERSACIÓN CIRCULAR (Usuario repite la misma pregunta)
  const repetitionDetected = checkForRepetition(userMessage, conversationHistory);
  if (repetitionDetected) {
    score += 25;
    detectedReasons.push('Usuario repite la misma consulta');
  }

  // 9. 🤖 RESPUESTA DEL BOT INADECUADA
  const botFailure = checkBotFailure(botResponse);
  if (botFailure.failed) {
    score += botFailure.severity;
    detectedReasons.push(botFailure.reason);
  }

  // 10. 📞 SOLICITUDES DE CONTACTO DIRECTO
  const contactRequest = /contacto|teléfono|llamar|visitar|dirección|ubicación|whatsapp/i.test(normalizedMessage);
  if (contactRequest && normalizedMessage.includes('urgente')) {
    score += 15;
    detectedReasons.push('Solicitud urgente de contacto directo');
  }

  // Determinar el motivo principal
  let mainReason: HandoffReason = 'complex_query';

  if (complaintKeywords.length > 0) mainReason = 'complaint';
  else if (technicalKeywords.length > 1) mainReason = 'technical_support';
  else if (legalKeywords.length > 0) mainReason = 'legal_query';
  else if (specializedKeywords.length > 0) mainReason = 'specialized_knowledge';
  else if (frustrationFound || repetitionDetected) mainReason = 'bot_failure';
  else if (specializedKeywords.length > 0) mainReason = 'custom_request';

  // Decisión final
  const shouldHandoff = score >= 50;
  const confidence = Math.min(score, 100);

  // Respuesta sugerida según el contexto
  const suggestedResponse = generateSuggestedResponse(mainReason, clientContext);

  return {
    shouldHandoff,
    reason: mainReason,
    priority,
    confidence,
    explanation: detectedReasons.join(', ') || 'Análisis de contexto general',
    suggestedResponse
  };
}

// Verificar si hay repetición en la conversación
function checkForRepetition(
  currentMessage: string,
  history: Array<{sender: string, message: string}>
): boolean {
  if (history.length < 4) return false;

  const userMessages = history
    .filter(msg => msg.sender === 'user')
    .slice(-3) // Últimos 3 mensajes del usuario
    .map(msg => msg.message.toLowerCase());

  const current = currentMessage.toLowerCase();

  // Verificar similitud semántica básica
  return userMessages.some(prevMsg => {
    const similarity = calculateSimilarity(current, prevMsg);
    return similarity > 0.7; // 70% de similitud
  });
}

// Calcular similitud básica entre dos strings
function calculateSimilarity(str1: string, str2: string): number {
  const words1 = str1.split(/\s+/);
  const words2 = str2.split(/\s+/);

  const commonWords = words1.filter(word =>
    words2.includes(word) && word.length > 3
  );

  const totalWords = Math.max(words1.length, words2.length);
  return commonWords.length / totalWords;
}

// Verificar si la respuesta del bot indica falla
function checkBotFailure(botResponse: string): {failed: boolean, severity: number, reason: string} {
  const response = botResponse.toLowerCase();

  // Respuestas que indican que el bot no pudo ayudar
  const failureIndicators = [
    'no entiendo', 'no sé', 'no puedo', 'no tengo información',
    'disculpa', 'perdón', 'no está claro', 'intenta de nuevo',
    'reformula', 'específica', 'no comprendo', 'error'
  ];

  const foundIndicators = failureIndicators.filter(indicator =>
    response.includes(indicator)
  );

  if (foundIndicators.length > 0) {
    return {
      failed: true,
      severity: foundIndicators.length * 15,
      reason: 'Bot indica que no puede resolver la consulta'
    };
  }

  // Respuestas muy genéricas o cortas
  if (botResponse.length < 50) {
    return {
      failed: true,
      severity: 10,
      reason: 'Respuesta del bot demasiado genérica'
    };
  }

  return { failed: false, severity: 0, reason: '' };
}

// Generar respuesta sugerida según el tipo de handoff
function generateSuggestedResponse(reason: HandoffReason, clientContext?: any): string {
  const clientName = clientContext?.name || 'nuestro equipo';

  const responses = {
    escalation_request: `Entiendo que prefieres hablar con una persona. Te conectaré inmediatamente con uno de nuestros especialistas de ${clientName}.`,

    complaint: `Lamento mucho los inconvenientes que has experimentado. Tu satisfacción es muy importante para nosotros. Te conectaré con nuestro equipo de atención al cliente para resolver esto de inmediato.`,

    technical_support: `Veo que tienes un problema técnico específico. Te derivaré con nuestro equipo de soporte técnico que podrá ayudarte de manera más especializada.`,

    legal_query: `Para consultas legales y temas contractuales, es mejor que hables directamente con nuestro equipo legal. Te conectaré con ellos.`,

    specialized_knowledge: `Tu consulta requiere conocimiento especializado. Te derivaré con un experto de ${clientName} que podrá atenderte de manera personalizada.`,

    bot_failure: `Disculpa si no he podido ayudarte como esperabas. Te conectaré con una persona que podrá resolver tu consulta de manera más efectiva.`,

    custom_request: `Para solicitudes personalizadas como la tuya, es mejor que hables directamente con nuestro equipo. Te conectaré con un especialista.`,

    complex_query: `Tu consulta es muy detallada y merece atención personalizada. Te derivaré con un especialista que podrá ayudarte mejor.`
  };

  return responses[reason] || responses.complex_query;
}

// Función para validar si un cliente tiene horario de atención
export function isWithinBusinessHours(clientConfig?: any): boolean {
  if (!clientConfig?.business_hours) return true;

  const now = new Date();
  const businessHours = clientConfig.business_hours;

  // Verificar día de la semana (1 = lunes, 7 = domingo)
  const currentDay = now.getDay() || 7; // Convertir domingo de 0 a 7
  const workDays = businessHours.days || [1, 2, 3, 4, 5];

  if (!workDays.includes(currentDay)) {
    return false; // Fuera de días laborales
  }

  // Verificar hora
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = currentHour + (currentMinutes / 60);

  const startTime = parseTime(businessHours.start || '09:00');
  const endTime = parseTime(businessHours.end || '18:00');

  return currentTime >= startTime && currentTime <= endTime;
}

// Helper para parsear tiempo HH:MM a decimal
function parseTime(timeStr: string): number {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours + (minutes / 60);
}