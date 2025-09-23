# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is a Next.js 15.5.2 web application for "Mente Autónoma" - a web development agency in Antofagasta, Chile. The project serves as both a marketing landing page and a comprehensive business management platform with AI-powered features.

## Core Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (currently disabled during builds)
- `npm run backup` - Execute Git backup automation
- `npm run restore` - Restore from Git backup
- `npm run setup-git` - Setup Git repository

## Architecture Overview

### Multi-Purpose Application Structure
The application serves multiple business functions:

1. **Landing Page** (`src/app/page.tsx`) - Main marketing site for the agency
2. **Chatbot Demo** (`src/app/chatbot-demo/`) - AI chatbot demonstration
3. **Admin Dashboard** (`src/app/admin/`, `src/app/dashboard/`) - Business management tools
4. **Analytics System** (`src/app/analytics/`, `src/app/chatbot-analytics/`) - Performance tracking
5. **Data Processing** (`src/app/batch-processing/`, `src/app/data-extraction/`) - Business intelligence tools

### Key Technology Stack
- **Framework**: Next.js 15.5.2 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom implementations
- **Database**: Prisma ORM with Supabase integration
- **AI Integration**: OpenAI APIs with LangSmith tracing
- **Analytics**: Vercel Analytics + Google Analytics
- **Media**: Cloudinary for image optimization

### API Architecture
API routes follow RESTful patterns under `src/app/api/`:
- Lead capture and management
- Chatbot interactions with AI
- Analytics data collection
- Knowledge base management
- Batch data processing
- Database initialization and health checks

### Component Organization
- `src/components/ui/` - Reusable UI primitives (shadcn/ui style)
- `src/components/` - Business-specific components
- `src/lib/` - Utility libraries and service integrations
- `src/hooks/` - Custom React hooks

### Database Integration
- Uses Prisma as the ORM
- Supabase as the database provider
- Schema defined in `src/lib/database-schema.ts`
- Multiple initialization scripts for different data sources

## Development Workflow

### Environment Setup
- Copy `.env.example` to `.env.local` and configure:
  - OpenAI API keys for AI features
  - Supabase database credentials
  - Cloudinary for media uploads
  - Email service credentials (Nodemailer)
  - Analytics tracking IDs

### Project Structure Notes
- Path aliases configured with `@/*` pointing to `src/*`
- TypeScript strict mode enabled
- ESLint and TypeScript checks disabled during builds (for rapid iteration)
- Standalone output configuration for Vercel deployment

### Performance Optimizations
- Image optimization with multiple formats (WebP, AVIF)
- Font preloading with Inter font family
- DNS prefetching for external resources
- Custom security headers in `next.config.ts`

### AI Features Integration
- OpenAI integration for chatbot responses
- LangSmith for AI conversation tracing
- Knowledge base system for context-aware responses
- Analytics tracking for AI interaction metrics

## Development Notes

### Chatbot System
The chatbot functionality spans multiple components:
- `FloatingChatbot.tsx` - Main chat interface
- `src/app/api/chat-ai/route.ts` - AI processing endpoint
- `src/lib/chatbot-analytics.ts` - Analytics integration
- Knowledge base system for contextual responses

### Data Processing Pipeline
Multiple tools for handling business data:
- CSV batch processing for large datasets
- Real-time data extraction from various sources
- Opportunity detection and analysis
- Pattern recognition for business insights

### Multi-Client Architecture
The system supports multiple client configurations:
- Client-specific chatbot configurations
- Isolated data processing per client
- Analytics segmentation by client
- Knowledge base partitioning

## Important Files for AI Features
- `src/lib/langsmith.ts` - AI conversation tracing
- `src/lib/knowledge-base.ts` - Context management
- `src/lib/chatbot-analytics.ts` - Performance tracking
- `src/app/api/chat-ai/route.ts` - Main AI endpoint

## Deployment Configuration
- Vercel-optimized with standalone output
- Multiple Vercel configuration files for different environments
- Automated backup system with Git integration
- Performance monitoring with multiple analytics providers