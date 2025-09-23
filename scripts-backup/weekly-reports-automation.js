#!/usr/bin/env node

/**
 * Script para enviar reportes semanales automáticos
 * Ejecutar todos los lunes a las 9:00 AM
 */

const https = require('https');

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3004';

async function sendWeeklyReports() {
  console.log('🚀 Iniciando envío de reportes semanales...');
  console.log(`📅 Fecha: ${new Date().toLocaleDateString('es-ES')}`);

  try {
    // Obtener todos los clientes activos
    const clientsResponse = await fetch(`${API_BASE_URL}/api/clients`);
    const clientsData = await clientsResponse.json();

    if (!clientsData.success) {
      throw new Error(`Error obteniendo clientes: ${clientsData.error}`);
    }

    const clients = clientsData.clients;
    console.log(`👥 Clientes encontrados: ${clients.length}`);

    let successCount = 0;
    let errorCount = 0;

    // Enviar reporte a cada cliente
    for (const client of clients) {
      try {
        console.log(`📧 Enviando reporte a: ${client.name} (${client.admin_email})`);

        const reportResponse = await fetch(`${API_BASE_URL}/api/weekly-reports`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientId: client.id
          })
        });

        const reportData = await reportResponse.json();

        if (reportData.success) {
          console.log(`✅ Reporte enviado exitosamente a ${client.name}`);
          successCount++;
        } else {
          console.error(`❌ Error enviando reporte a ${client.name}: ${reportData.error}`);
          errorCount++;
        }

        // Pausa entre envíos para no saturar el servidor
        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (error) {
        console.error(`❌ Error enviando reporte a ${client.name}:`, error.message);
        errorCount++;
      }
    }

    // Resumen final
    console.log('\n📊 RESUMEN DE ENVÍO:');
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Fallidos: ${errorCount}`);
    console.log(`📧 Total: ${successCount + errorCount}`);

    // Enviar notificación Telegram del resumen
    await sendTelegramSummary(successCount, errorCount, clients.length);

  } catch (error) {
    console.error('💥 Error crítico en envío de reportes:', error.message);

    // Notificar error por Telegram
    await sendTelegramError(error.message);
  }
}

async function sendTelegramSummary(success, errors, total) {
  try {
    const message = `📊 REPORTES SEMANALES ENVIADOS

✅ Exitosos: ${success}
❌ Fallidos: ${errors}
📧 Total clientes: ${total}

📅 ${new Date().toLocaleDateString('es-ES')} - ${new Date().toLocaleTimeString('es-ES')}`;

    await fetch(`${API_BASE_URL}/api/send-telegram-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'daily_summary',
        data: {
          totalConversations: success,
          uniqueUsers: total,
          totalMessages: success + errors,
          insight: `Reportes semanales automáticos: ${success}/${total} exitosos`
        }
      })
    });

    console.log('📱 Resumen enviado por Telegram');
  } catch (error) {
    console.error('Error enviando resumen por Telegram:', error.message);
  }
}

async function sendTelegramError(errorMessage) {
  try {
    await fetch(`${API_BASE_URL}/api/send-telegram-notification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'technical_error',
        data: {
          errorType: 'Error en reportes automáticos',
          errorMessage: errorMessage,
          sessionId: 'weekly_reports_automation'
        }
      })
    });

    console.log('📱 Error notificado por Telegram');
  } catch (telegramError) {
    console.error('Error notificando por Telegram:', telegramError.message);
  }
}

// Función helper para fetch (compatible con Node.js)
async function fetch(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    if (options.body) {
      requestOptions.headers['Content-Length'] = Buffer.byteLength(options.body);
    }

    const protocol = urlObj.protocol === 'https:' ? https : require('http');

    const req = protocol.request(requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(jsonData)
          });
        } catch (error) {
          resolve({
            ok: false,
            status: res.statusCode,
            json: () => Promise.resolve({ error: 'Invalid JSON response' })
          });
        }
      });
    });

    req.on('error', reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  sendWeeklyReports()
    .then(() => {
      console.log('🏁 Proceso completado');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Error fatal:', error);
      process.exit(1);
    });
}

module.exports = { sendWeeklyReports };