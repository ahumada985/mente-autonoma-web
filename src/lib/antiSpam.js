// Sistema de Protección contra Spam y Bots (Versión Simplificada)
// Esta versión no requiere Firebase y funciona completamente en el cliente

// Configuración de rate limiting (para futuras implementaciones)
// const RATE_LIMIT = {
//   MAX_ATTEMPTS: 3,
//   TIME_WINDOW: 60 * 60 * 1000, // 1 hora en milisegundos
//   BLOCK_DURATION: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
// };

// Dominios temporales/descartables conocidos
const TEMPORARY_DOMAINS = [
  '10minutemail.com',
  'guerrillamail.com',
  'mailinator.com',
  'tempmail.org',
  'throwaway.email',
  'yopmail.com',
  'getnada.com',
  'mailnesia.com',
  'sharklasers.com',
  'grr.la',
  'guerrillamailblock.com',
  'pokemail.net',
  'spam4.me',
  'bccto.me',
  'chacuo.net',
  'dispostable.com',
  'fakeinbox.com',
  'maildrop.cc',
  'mailmetrash.com',
  'mintemail.com',
  'mohmal.com',
  'mytrashmail.com',
  'nwytg.net',
  'spamspot.com',
  'temp-mail.org',
  'tempmailaddress.com',
  'trashmail.com',
  'trashmail.net',
  'wegwerfemail.de',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org'
];

// Función para verificar si un dominio es temporal
export const isTemporaryDomain = (email) => {
  const domain = email.split('@')[1]?.toLowerCase();
  return TEMPORARY_DOMAINS.includes(domain);
};

// Función para validar formato de email
export const isValidEmailFormat = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para verificar rate limiting por IP (versión simplificada)
export const checkRateLimit = async () => {
  // En esta versión simplificada, siempre permitimos el envío
  // En producción, esto se implementaría con una base de datos real
  return { allowed: true, attempts: 0, blocked: false };
};

// Función para registrar intento (versión simplificada)
export const recordAttempt = async () => {
  // En esta versión simplificada, no hacemos nada
  // En producción, esto registraría el intento en la base de datos
  return true;
};

// Función para verificar si está bloqueado (versión simplificada)
export const isBlocked = async () => {
  // En esta versión simplificada, nunca bloqueamos
  // En producción, esto verificaría el estado en la base de datos
  return false;
};

// Función para validar email completo
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, reason: 'Email no válido' };
  }

  if (!isValidEmailFormat(email)) {
    return { valid: false, reason: 'Formato de email inválido' };
  }

  if (isTemporaryDomain(email)) {
    return { valid: false, reason: 'No se permiten emails temporales' };
  }

  return { valid: true, reason: 'Email válido' };
};

// Función para validar formulario completo
export const validateForm = (formData) => {
  const errors = [];

  // Validar email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.valid) {
    errors.push(emailValidation.reason);
  }

  // Validar nombre (si existe)
  if (formData.name && formData.name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  // Validar mensaje (si existe)
  if (formData.message && formData.message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  return {
    valid: errors.length === 0,
    errors: errors
  };
};
