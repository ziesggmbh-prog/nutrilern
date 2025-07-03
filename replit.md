# Nutrition Learning Platform

## Overview

This is a React-based nutrition learning platform that provides an interactive experience for users to learn about nutrition through video lessons and quizzes. The application is built with a modern tech stack including React, TypeScript, Tailwind CSS, and uses a PostgreSQL database with Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth transitions and animations
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express server
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Build Tool**: Vite for development and production builds
- **Session Management**: PostgreSQL session store (connect-pg-simple)

### Design System
- **Color Palette**: Custom nutrition-focused color scheme with navy, green, purple, orange, and teal variations
- **Typography**: Modern, clean typography with proper hierarchy
- **Components**: Organic shapes and animated elements for visual appeal
- **Responsive**: Mobile-first design approach

## Key Components

### Database Schema
- **Users**: User authentication and progress tracking
- **Lessons**: Video lessons with metadata (title, description, video URL, duration, thumbnails)
- **Quizzes**: JSON-based quiz questions linked to lessons
- **User Progress**: Tracks lesson completion and quiz scores

### Core Features
- **Lesson Management**: Sequential lesson unlocking based on completion
- **Video Player**: Integrated video player with completion tracking
- **Quiz System**: Interactive quizzes with multiple choice questions
- **Progress Tracking**: Visual progress bars and achievement system
- **Responsive Design**: Optimized for both desktop and mobile devices

### UI Components
- **LessonCard**: Interactive lesson cards with completion states
- **VideoPlayer**: Modal-based video player component
- **QuizModal**: Interactive quiz interface with scoring
- **ProgressBar**: Animated progress visualization
- **OrganicShape**: Decorative elements for visual appeal

## Data Flow

1. **User Authentication**: Users create accounts and maintain session state
2. **Lesson Access**: Users can only access lessons in sequential order
3. **Video Completion**: Watching videos unlocks associated quizzes
4. **Quiz Completion**: Passing quizzes (scoring system) unlocks next lessons
5. **Progress Tracking**: All user interactions are tracked and stored

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form
- **UI Framework**: Radix UI primitives, Tailwind CSS
- **Database**: Drizzle ORM, Neon Database, PostgreSQL
- **Server**: Express, session management
- **Build Tools**: Vite, TypeScript, ESBuild

### Development Features
- **Replit Integration**: Specialized plugins for Replit environment
- **Development Tools**: Hot reload, error overlay, TypeScript checking
- **Code Quality**: ESLint configuration, proper TypeScript setup

## Deployment Strategy

### Development
- **Local Development**: `npm run dev` starts development server with hot reload
- **Database Management**: `npm run db:push` for schema migrations
- **Type Checking**: `npm run check` for TypeScript validation

### Production
- **Build Process**: Vite builds client-side assets, ESBuild bundles server
- **Static Assets**: Client build output served from Express
- **Environment Variables**: DATABASE_URL required for database connection
- **Server**: Node.js production server with proper error handling

### Architecture Decisions

1. **Database Choice**: PostgreSQL chosen for ACID compliance and complex querying capabilities
2. **ORM Selection**: Drizzle ORM provides type safety and performance
3. **State Management**: TanStack Query eliminates need for global state management
4. **Component Library**: Radix UI + shadcn/ui provides accessible, customizable components
5. **Animation Library**: Framer Motion adds polish without performance overhead
6. **Build Strategy**: Vite for fast development, ESBuild for production efficiency

## Changelog

```
Changelog:
- July 03, 2025. Initial setup
- July 03, 2025. Added footer information boxes with BKK firmus and ZIES gGmbH logos
- July 03, 2025. Integrated user's carrot-dumbbell logo in header
- July 03, 2025. Refined logo sizing and proportions for consistent display
- July 03, 2025. Implemented MP4 video support with static file serving for custom video content
- July 03, 2025. Enhanced VideoPlayer component to handle both MP4 and YouTube videos automatically
- July 03, 2025. Fixed Video 4 thumbnail display and adjusted color scheme for Video 5
- July 03, 2025. Implemented custom color system for Videos 1-9 with user-provided color references
- July 03, 2025. Added comprehensive quiz data for all 9 videos with educational content
- July 03, 2025. Updated Video 2 quiz with user-specific questions about brain energy and complex carbohydrates
- July 03, 2025. Added error message system in quiz with "Diese Antwort ist leider nicht korrekt" text
- July 03, 2025. Fixed button visibility in quiz modal - made "Zurück" and "Abbrechen" permanently visible
- July 03, 2025. Synchronized quest card colors with lesson card organic form colors for consistency
- July 03, 2025. Updated Video 2 color to dark navy blue based on user reference image
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```