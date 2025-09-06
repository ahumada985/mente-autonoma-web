// Reglas de Configuración para Oportunidades de Valor
// Define los criterios y umbrales para identificar oportunidades

export interface OpportunityRules {
  // Reglas de Valor
  minValuePercentage: number;        // Valor mínimo requerido (ej: 15%)
  maxValuePercentage: number;        // Valor máximo para evitar errores (ej: 50%)
  
  // Reglas de Confianza
  minConfidencePercentage: number;   // Confianza mínima requerida (ej: 70%)
  highConfidenceThreshold: number;   // Umbral para alta confianza (ej: 80%)
  
  // Reglas de Probabilidad
  minProbabilityPercentage: number;  // Probabilidad mínima (ej: 20%)
  maxProbabilityPercentage: number;  // Probabilidad máxima (ej: 90%)
  
  // Reglas de Mercados
  allowedMarkets: string[];          // Mercados permitidos
  priorityMarkets: string[];         // Mercados prioritarios
  
  // Reglas de Ligas
  allowedLeagues: string[];          // Ligas permitidas
  priorityLeagues: string[];         // Ligas prioritarias
  
  // Reglas de Tiempo
  maxDaysAhead: number;              // Máximo días de anticipación (ej: 7)
  minHoursAhead: number;             // Mínimo horas de anticipación (ej: 2)
  
  // Reglas de Cuotas
  minOdds: number;                   // Cuotas mínimas (ej: 1.10)
  maxOdds: number;                   // Cuotas máximas (ej: 10.00)
  
  // Reglas de Notificación
  alertHighValue: boolean;           // Alertar oportunidades de alto valor
  alertHighConfidence: boolean;      // Alertar oportunidades de alta confianza
  alertNewOpportunities: boolean;    // Alertar nuevas oportunidades
}

// Configuración por defecto
export const DEFAULT_OPPORTUNITY_RULES: OpportunityRules = {
  // Reglas de Valor
  minValuePercentage: 15,            // 15% de valor mínimo
  maxValuePercentage: 50,            // 50% de valor máximo (evitar errores)
  
  // Reglas de Confianza
  minConfidencePercentage: 70,       // 70% de confianza mínima
  highConfidenceThreshold: 80,       // 80% para alta confianza
  
  // Reglas de Probabilidad
  minProbabilityPercentage: 20,      // 20% de probabilidad mínima
  maxProbabilityPercentage: 90,      // 90% de probabilidad máxima
  
  // Reglas de Mercados
  allowedMarkets: [
    '1X2',
    'Over/Under 2.5',
    'Both Teams Score',
    'Over/Under 1.5',
    'Over/Under 3.5',
    'Draw No Bet',
    'Double Chance',
    'Handicap Asiático',
    'Handicap Europeo'
  ],
  priorityMarkets: [
    '1X2',
    'Over/Under 2.5',
    'Both Teams Score'
  ],
  
  // Reglas de Ligas
  allowedLeagues: [
    'Chile Primera División',
    'Argentina Liga Profesional',
    'Brasil Brasileirão',
    'Colombia Primera A',
    'Ecuador Liga Pro Serie A',
    'Paraguay Primera División',
    'Perú Liga 1',
    'Uruguay Primera División',
    'Premier League',
    'Bundesliga',
    'La Liga',
    'Serie A',
    'Ligue 1',
    'Champions League',
    'Europa League',
    'Liga MX',
    'MLS'
  ],
  priorityLeagues: [
    'Chile Primera División',
    'Argentina Liga Profesional',
    'Brasil Brasileirão',
    'Premier League',
    'Bundesliga',
    'La Liga',
    'Serie A'
  ],
  
  // Reglas de Tiempo
  maxDaysAhead: 7,                   // Máximo 7 días de anticipación
  minHoursAhead: 2,                  // Mínimo 2 horas de anticipación
  
  // Reglas de Cuotas
  minOdds: 1.10,                     // Cuotas mínimas 1.10
  maxOdds: 10.00,                    // Cuotas máximas 10.00
  
  // Reglas de Notificación
  alertHighValue: true,              // Alertar oportunidades de alto valor
  alertHighConfidence: true,         // Alertar oportunidades de alta confianza
  alertNewOpportunities: true        // Alertar nuevas oportunidades
};

// Configuración conservadora (más estricta)
export const CONSERVATIVE_OPPORTUNITY_RULES: OpportunityRules = {
  ...DEFAULT_OPPORTUNITY_RULES,
  minValuePercentage: 20,            // 20% de valor mínimo
  minConfidencePercentage: 80,       // 80% de confianza mínima
  highConfidenceThreshold: 85,       // 85% para alta confianza
  maxOdds: 5.00,                     // Cuotas máximas 5.00
  priorityMarkets: ['1X2'],          // Solo mercado 1X2
  priorityLeagues: [
    'Premier League',
    'Bundesliga',
    'La Liga',
    'Serie A'
  ]
};

// Configuración agresiva (menos estricta)
export const AGGRESSIVE_OPPORTUNITY_RULES: OpportunityRules = {
  ...DEFAULT_OPPORTUNITY_RULES,
  minValuePercentage: 10,            // 10% de valor mínimo
  minConfidencePercentage: 60,       // 60% de confianza mínima
  highConfidenceThreshold: 75,       // 75% para alta confianza
  maxOdds: 15.00,                    // Cuotas máximas 15.00
  allowedMarkets: [
    ...DEFAULT_OPPORTUNITY_RULES.allowedMarkets,
    'Total de Goles Exacto',
    'Primer Gol',
    'Último Gol',
    'Tarjetas',
    'Córners'
  ]
};

// Función para validar una oportunidad contra las reglas
export function validateOpportunity(opportunity: any, rules: OpportunityRules): {
  isValid: boolean;
  reasons: string[];
  score: number;
} {
  const reasons: string[] = [];
  let score = 0;
  
  // Validar valor
  const valuePercentage = opportunity.value * 100;
  if (valuePercentage < rules.minValuePercentage) {
    reasons.push(`Valor insuficiente: ${valuePercentage.toFixed(1)}% < ${rules.minValuePercentage}%`);
  } else {
    score += 20;
  }
  
  if (valuePercentage > rules.maxValuePercentage) {
    reasons.push(`Valor sospechoso: ${valuePercentage.toFixed(1)}% > ${rules.maxValuePercentage}%`);
  }
  
  // Validar confianza
  if (opportunity.confidence < rules.minConfidencePercentage) {
    reasons.push(`Confianza insuficiente: ${opportunity.confidence}% < ${rules.minConfidencePercentage}%`);
  } else {
    score += 20;
  }
  
  // Validar probabilidad
  const probabilityPercentage = opportunity.probability * 100;
  if (probabilityPercentage < rules.minProbabilityPercentage) {
    reasons.push(`Probabilidad insuficiente: ${probabilityPercentage.toFixed(1)}% < ${rules.minProbabilityPercentage}%`);
  } else {
    score += 15;
  }
  
  if (probabilityPercentage > rules.maxProbabilityPercentage) {
    reasons.push(`Probabilidad sospechosa: ${probabilityPercentage.toFixed(1)}% > ${rules.maxProbabilityPercentage}%`);
  }
  
  // Validar mercado
  if (!rules.allowedMarkets.includes(opportunity.market)) {
    reasons.push(`Mercado no permitido: ${opportunity.market}`);
  } else {
    score += 15;
  }
  
  // Validar liga
  if (!rules.allowedLeagues.includes(opportunity.match.league)) {
    reasons.push(`Liga no permitida: ${opportunity.match.league}`);
  } else {
    score += 15;
  }
  
  // Validar cuotas
  if (opportunity.odds < rules.minOdds) {
    reasons.push(`Cuotas muy bajas: ${opportunity.odds.toFixed(2)} < ${rules.minOdds}`);
  } else {
    score += 10;
  }
  
  if (opportunity.odds > rules.maxOdds) {
    reasons.push(`Cuotas muy altas: ${opportunity.odds.toFixed(2)} > ${rules.maxOdds}`);
  }
  
  // Validar tiempo
  const matchDate = new Date(opportunity.match.date);
  const now = new Date();
  const hoursUntilMatch = (matchDate.getTime() - now.getTime()) / (1000 * 60 * 60);
  
  if (hoursUntilMatch < rules.minHoursAhead) {
    reasons.push(`Muy poco tiempo: ${hoursUntilMatch.toFixed(1)}h < ${rules.minHoursAhead}h`);
  } else {
    score += 5;
  }
  
  if (hoursUntilMatch > rules.maxDaysAhead * 24) {
    reasons.push(`Demasiado tiempo: ${(hoursUntilMatch / 24).toFixed(1)}d > ${rules.maxDaysAhead}d`);
  }
  
  const isValid = reasons.length === 0;
  
  return {
    isValid,
    reasons,
    score
  };
}

// Función para obtener configuración por perfil
export function getRulesByProfile(profile: 'conservative' | 'balanced' | 'aggressive'): OpportunityRules {
  switch (profile) {
    case 'conservative':
      return CONSERVATIVE_OPPORTUNITY_RULES;
    case 'aggressive':
      return AGGRESSIVE_OPPORTUNITY_RULES;
    default:
      return DEFAULT_OPPORTUNITY_RULES;
  }
}

// Función para personalizar reglas
export function customizeRules(
  baseRules: OpportunityRules,
  customizations: Partial<OpportunityRules>
): OpportunityRules {
  return {
    ...baseRules,
    ...customizations
  };
}


