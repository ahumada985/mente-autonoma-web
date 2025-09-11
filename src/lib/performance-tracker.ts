// Helper para medir rendimiento del chatbot
export class PerformanceTracker {
  private startTime: number = 0;
  private endTime: number = 0;

  start() {
    this.startTime = performance.now();
  }

  end() {
    this.endTime = performance.now();
    return this.getDuration();
  }

  getDuration(): number {
    return Math.round(this.endTime - this.startTime);
  }

  // Calcular tokens estimados (aproximación)
  static estimateTokens(text: string): number {
    return Math.ceil(text.length / 4);
  }

  // Calcular costo estimado (GPT-3.5-turbo)
  static estimateCost(inputTokens: number, outputTokens: number): number {
    const inputCost = inputTokens * 0.0005 / 1000; // $0.0005 per 1K tokens
    const outputCost = outputTokens * 0.0015 / 1000; // $0.0015 per 1K tokens
    return inputCost + outputCost;
  }

  // Obtener información del navegador
  static getBrowserInfo() {
    return {
      user_agent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      cookie_enabled: navigator.cookieEnabled,
      on_line: navigator.onLine
    };
  }

  // Obtener información de la página
  static getPageInfo() {
    return {
      url: window.location.href,
      referrer: document.referrer,
      title: document.title,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    };
  }
}
