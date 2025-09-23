// Función helper para detectar información de contacto en mensajes
export function extractContactInfo(message: string): {
  email?: string;
  phone?: string;
  name?: string;
} {
  const result: { email?: string; phone?: string; name?: string } = {};

  // Buscar email
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const emailMatch = message.match(emailRegex);
  if (emailMatch) {
    result.email = emailMatch[0];
  }

  // Buscar teléfono (varios formatos chilenos)
  const phoneRegex = /(?:\+?56\s?)?(?:9\s?)?\d{8}|\(\+?56\)\s?\d{8,9}|\+?56\s?\d{8,9}/g;
  const phoneMatch = message.match(phoneRegex);
  if (phoneMatch) {
    result.phone = phoneMatch[0].replace(/\s+/g, '');
  }

  // Buscar nombre (muy básico, después de "soy", "me llamo", etc.)
  const nameRegex = /(?:soy|me llamo|mi nombre es)\s+([A-Za-zÁÉÍÓÚáéíóúñÑ\s]+)/i;
  const nameMatch = message.match(nameRegex);
  if (nameMatch) {
    result.name = nameMatch[1].trim();
  }

  return result;
}