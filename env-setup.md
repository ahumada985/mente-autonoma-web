# Configuración de Variables de Entorno

## Para Desarrollo Local

Crea un archivo `.env.local` en la raíz del proyecto con estas variables:

```bash
# OpenAI
OPENAI_API_KEY=tu_clave_openai_aqui

# LangSmith
LANGSMITH_TRACING=true
LANGSMITH_ENDPOINT=https://api.smith.langchain.com
LANGSMITH_API_KEY=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
LANGSMITH_PROJECT=pr-artistic-injunction-89

# Base de datos (si usas Prisma)
DATABASE_URL=tu_database_url_aqui
```

## Para Vercel (Producción)

Ve a https://vercel.com/dashboard → tu proyecto → Settings → Environment Variables

Agrega estas variables:

- `OPENAI_API_KEY` = tu_clave_openai_aqui
- `LANGSMITH_TRACING` = true
- `LANGSMITH_ENDPOINT` = https://api.smith.langchain.com
- `LANGSMITH_API_KEY` = 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
- `LANGSMITH_PROJECT` = pr-artistic-injunction-89

## Dónde Configurar

1. **Desarrollo Local**: Archivo `.env.local` (no se sube a GitHub)
2. **Producción (Vercel)**: Variables de entorno en el dashboard de Vercel
3. **NO uses**: `.env` (se sube a GitHub y es inseguro)
