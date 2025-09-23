require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Verificar variables de entorno
console.log('🔍 Verificando variables de entorno...');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Configurado' : '❌ Faltante');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Configurado' : '❌ Faltante');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Configurado' : '❌ Faltante');

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error('❌ Error: Faltan variables de entorno de Cloudinary');
  console.error('Asegúrate de tener en .env.local:');
  console.error('CLOUDINARY_CLOUD_NAME=tu_cloud_name');
  console.error('CLOUDINARY_API_KEY=tu_api_key');
  console.error('CLOUDINARY_API_SECRET=tu_api_secret');
  process.exit(1);
}

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Función para subir imagen
async function uploadImage(imagePath, folderName) {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: folderName,
      transformation: [
        { width: 800, height: 600, crop: 'fill' },
        { quality: 'auto' }
      ]
    });
    
    console.log(`✅ Imagen subida: ${imagePath} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error subiendo ${imagePath}:`, error.message);
    return null;
  }
}

// Función principal
async function uploadAllImages() {
  console.log('\n🚀 Iniciando subida de imágenes a Cloudinary...\n');
  
  const publicDir = path.join(__dirname, '../public');
  const images = [
    { path: path.join(publicDir, 'logo_final.png'), folder: 'logos' },
    { path: path.join(publicDir, 'noticia1.webp'), folder: 'noticias' },
    { path: path.join(publicDir, 'noticia2.webp'), folder: 'noticias' },
    { path: path.join(publicDir, 'noticia3.webp'), folder: 'noticias' },
    { path: path.join(publicDir, 'logos/n.png'), folder: 'logos' },
    { path: path.join(publicDir, 'logos/p.png'), folder: 'logos' },
    { path: path.join(publicDir, 'logos/t.png'), folder: 'logos' }
  ];
  
  const results = [];
  
  for (const image of images) {
    if (fs.existsSync(image.path)) {
      const url = await uploadImage(image.path, image.folder);
      if (url) {
        results.push({
          original: image.path.replace(publicDir, ''),
          cloudinary: url,
          folder: image.folder
        });
      }
    } else {
      console.log(`⚠️ Imagen no encontrada: ${image.path}`);
    }
  }
  
  // Guardar resultados en un archivo
  const resultsPath = path.join(__dirname, '../cloudinary-urls.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  
  console.log('\n📋 Resumen de subidas:');
  console.log('========================');
  results.forEach(result => {
    console.log(`${result.original} -> ${result.cloudinary}`);
  });
  
  console.log(`\n💾 URLs guardadas en: ${resultsPath}`);
  console.log('\n🎉 ¡Subida completada!');
}

// Ejecutar si se llama directamente
if (require.main === module) {
  uploadAllImages().catch(console.error);
}

module.exports = { uploadImage, uploadAllImages };
