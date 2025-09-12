// Script para debuggear las métricas
console.log("🔍 DEBUGGEANDO MÉTRICAS...");

// Verificar si hay métricas en localStorage
const metrics = localStorage.getItem('chatbot_metrics');
console.log("📊 Métricas en localStorage:", metrics);

if (metrics) {
  const parsed = JSON.parse(metrics);
  console.log("📊 Métricas parseadas:", parsed);
  console.log("📊 Cantidad de métricas:", parsed.length);
} else {
  console.log("❌ No hay métricas en localStorage");
}

// Verificar si el chatbot está guardando métricas
console.log("🔍 Verificando si chatbotAnalytics está funcionando...");

// Simular una llamada para ver si se guardan métricas
const testData = {
  userMessage: "Test message",
  botResponse: "Test response",
  responseTime: 1000,
  totalTokens: 50,
  costEstimate: 0.001,
  timestamp: new Date().toISOString()
};

const existingMetrics = JSON.parse(localStorage.getItem('chatbot_metrics') || '[]');
existingMetrics.push(testData);
localStorage.setItem('chatbot_metrics', JSON.stringify(existingMetrics));

console.log("✅ Métrica de prueba agregada");
console.log("📊 Nuevas métricas:", JSON.parse(localStorage.getItem('chatbot_metrics')));
