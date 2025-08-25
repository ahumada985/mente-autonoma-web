// Sistema de Protección contra Spam y Bots
import { getFirestore, collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

const db = getFirestore();

// Configuración de rate limiting
const RATE_LIMIT = {
  MAX_ATTEMPTS: 3,
  TIME_WINDOW: 60 * 60 * 1000, // 1 hora en milisegundos
  BLOCK_DURATION: 24 * 60 * 60 * 1000 // 24 horas en milisegundos
};

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
  'sharklasers.com',
  'spamspot.com',
  'spam4.me',
  'temp-mail.org',
  'tempmailaddress.com',
  'trashmail.com',
  'trashmail.net',
  'wegwerfemail.de',
  'wegwerfmail.de',
  'wegwerfmail.net',
  'wegwerfmail.org',
  'wegwerpmailadres.nl',
  'wetrainbayarea.com',
  'wetrainbayarea.org',
  'wetrainbayarea.net',
  'wetrainbayarea.info',
  'wetrainbayarea.biz',
  'wetrainbayarea.co',
  'wetrainbayarea.us',
  'wetrainbayarea.mobi',
  'wetrainbayarea.tv',
  'wetrainbayarea.cc',
  'wetrainbayarea.tk',
  'wetrainbayarea.ga',
  'wetrainbayarea.cf',
  'wetrainbayarea.gq',
  'wetrainbayarea.ml',
  'wetrainbayarea.tk',
  'wetrainbayarea.ga',
  'wetrainbayarea.cf',
  'wetrainbayarea.gq',
  'wetrainbayarea.ml'
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

// Función para verificar rate limiting por IP
export const checkRateLimit = async (ipAddress) => {
  try {
    const attemptsRef = collection(db, 'rateLimit');
    const q = query(
      attemptsRef,
      where('ipAddress', '==', ipAddress),
      where('timestamp', '>', new Date(Date.now() - RATE_LIMIT.TIME_WINDOW))
    );
    
    const querySnapshot = await getDocs(q);
    const attempts = querySnapshot.docs.length;
    
    if (attempts >= RATE_LIMIT.MAX_ATTEMPTS) {
      // Verificar si está bloqueado
      const blockQuery = query(
        attemptsRef,
        where('ipAddress', '==', ipAddress),
        where('blocked', '==', true),
        where('blockTimestamp', '>', new Date(Date.now() - RATE_LIMIT.BLOCK_DURATION))
      );
      
      const blockSnapshot = await getDocs(blockQuery);
      if (!blockSnapshot.empty) {
        return {
          allowed: false,
          reason: 'IP bloqueada temporalmente por exceder límite de intentos',
          remainingTime: RATE_LIMIT.BLOCK_DURATION - (Date.now() - blockSnapshot.docs[0].data().blockTimestamp)
        };
      }
      
      // Bloquear IP
      await addDoc(attemptsRef, {
        ipAddress,
        timestamp: serverTimestamp(),
        blocked: true,
        blockTimestamp: serverTimestamp(),
        reason: 'Excedió límite de intentos'
      });
      
      return {
        allowed: false,
        reason: 'IP bloqueada por exceder límite de intentos',
        remainingTime: RATE_LIMIT.BLOCK_DURATION
      };
    }
    
    return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS - attempts };
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return { allowed: true, remainingAttempts: RATE_LIMIT.MAX_ATTEMPTS }; // Fallback
  }
};

// Función para registrar intento de envío
export const logAttempt = async (ipAddress, email, success, reason = '') => {
  try {
    await addDoc(collection(db, 'rateLimit'), {
      ipAddress,
      email,
      timestamp: serverTimestamp(),
      success,
      reason,
      userAgent: navigator.userAgent,
      blocked: false
    });
  } catch (error) {
    console.error('Error logging attempt:', error);
  }
};

// Función para validar email completo
export const validateEmail = async (email, ipAddress) => {
  // 1. Validar formato básico
  if (!isValidEmailFormat(email)) {
    return {
      valid: false,
      reason: 'Formato de email inválido'
    };
  }
  
  // 2. Verificar dominio temporal
  if (isTemporaryDomain(email)) {
    return {
      valid: false,
      reason: 'No se permiten dominios de email temporales'
    };
  }
  
  // 3. Verificar rate limiting
  const rateLimitCheck = await checkRateLimit(ipAddress);
  if (!rateLimitCheck.allowed) {
    return {
      valid: false,
      reason: rateLimitCheck.reason,
      remainingTime: rateLimitCheck.remainingTime
    };
  }
  
  // 4. Verificar si email ya existe
  try {
    const leadsRef = collection(db, 'leads');
    const q = query(leadsRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return {
        valid: false,
        reason: 'Este email ya está registrado'
      };
    }
  } catch (error) {
    console.error('Error checking existing email:', error);
    return {
      valid: false,
      reason: 'Error al verificar email existente'
    };
  }
  
  return {
    valid: true,
    remainingAttempts: rateLimitCheck.remainingAttempts
  };
};

// Función para obtener IP del cliente (en producción usarías un servicio real)
export const getClientIP = async () => {
  try {
    // En desarrollo, usar IP local
    if (process.env.NODE_ENV === 'development') {
      return '127.0.0.1';
    }
    
    // En producción, usar servicio de IP
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error('Error getting client IP:', error);
    return 'unknown';
  }
};

// Función para limpiar registros antiguos (ejecutar periódicamente)
export const cleanupOldRecords = async () => {
  try {
    const cutoffDate = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)); // 7 días
    
    // Limpiar intentos antiguos
    const attemptsRef = collection(db, 'rateLimit');
    const oldAttemptsQuery = query(
      attemptsRef,
      where('timestamp', '<', cutoffDate)
    );
    
    const oldAttemptsSnapshot = await getDocs(oldAttemptsQuery);
    
    // En una implementación real, usarías batch delete
    console.log(`Limpiando ${oldAttemptsSnapshot.size} registros antiguos`);
    
  } catch (error) {
    console.error('Error cleaning up old records:', error);
  }
};

// Función para generar token CSRF
export const generateCSRFToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

// Función para verificar token CSRF
export const verifyCSRFToken = (token, storedToken) => {
  return token === storedToken;
};

// Función para detectar patrones de spam
export const detectSpamPatterns = (email, userAgent) => {
  const patterns = {
    // Emails con patrones sospechosos
    suspiciousEmails: [
      /^test\d+@/i,
      /^admin\d+@/i,
      /^user\d+@/i,
      /^demo\d+@/i,
      /^info\d+@/i,
      /^contact\d+@/i,
      /^hello\d+@/i,
      /^hi\d+@/i,
      /^a@/i,
      /^b@/i,
      /^c@/i,
      /^1@/i,
      /^2@/i,
      /^3@/i
    ],
    
    // User agents sospechosos
    suspiciousUserAgents: [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /java/i,
      /php/i,
      /perl/i,
      /ruby/i,
      /go-http-client/i,
      /http-client/i,
      /okhttp/i,
      /apache-httpclient/i,
      /requests/i,
      /urllib/i
    ]
  };
  
  let score = 0;
  let reasons = [];
  
  // Verificar patrones de email
  patterns.suspiciousEmails.forEach(pattern => {
    if (pattern.test(email)) {
      score += 2;
      reasons.push('Patrón de email sospechoso');
    }
  });
  
  // Verificar user agent
  patterns.suspiciousUserAgents.forEach(pattern => {
    if (pattern.test(userAgent)) {
      score += 3;
      reasons.push('User agent sospechoso');
    }
  });
  
  // Verificar longitud de email
  if (email.length < 10) {
    score += 1;
    reasons.push('Email muy corto');
  }
  
  // Verificar caracteres repetitivos
  const repeatedChars = email.match(/(.)\1{3,}/g);
  if (repeatedChars) {
    score += 1;
    reasons.push('Caracteres repetitivos');
  }
  
  return {
    score,
    reasons,
    isSpam: score >= 3
  };
};
