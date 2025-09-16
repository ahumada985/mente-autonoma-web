module.exports = {
  // Configuración básica de N8N
  database: {
    type: 'sqlite',
    database: './database.sqlite',
  },
  
  // Configuración de webhook
  webhookUrl: 'http://localhost:5678',
  
  // Configuración de seguridad
  security: {
    jwtSecret: 'tu_jwt_secret_aqui',
  },
  
  // Configuración de logs
  logging: {
    level: 'info',
  },
  
  // Configuración de puerto
  port: 5678,
  
  // Configuración de CORS
  cors: {
    origin: true,
    credentials: true,
  },
  
  // Configuración de timezone
  timezone: 'America/Santiago',
  
  // Configuración de ejecución
  execution: {
    mode: 'regular',
  },
  
  // Configuración de notificaciones
  notifications: {
    enabled: false,
  },
  
  // Configuración de métricas
  metrics: {
    enabled: true,
  }
};







