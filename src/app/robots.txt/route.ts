// Robots.txt Optimizado
// Archivo: src/app/robots.txt/route.ts

import { generateOptimizedRobots } from '@/lib/performance-optimization';

export async function GET() {
  const robots = generateOptimizedRobots();

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800'
    }
  });
}
