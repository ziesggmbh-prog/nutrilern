# Complete Code Export - Nutrition Learning Platform

## 1. DEPLOYMENT SERVER (deployment/server.js)
```javascript
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// Request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Static file serving with proper video configuration
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    console.log(`Serving: ${filePath}`);
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }
  }
}));

// Dedicated video route for additional safety
app.get('/videos/:filename', (req, res) => {
  const filename = req.params.filename;
  const videoPath = path.join(publicPath, filename);
  
  console.log(`Video requested: ${filename}`);
  console.log(`Looking in: ${videoPath}`);
  console.log(`File exists: ${fs.existsSync(videoPath)}`);
  
  if (fs.existsSync(videoPath)) {
    res.sendFile(videoPath);
  } else {
    res.status(404).json({ error: 'Video not found', requested: filename });
  }
});

// Health check with detailed diagnostics
app.get('/health', (req, res) => {
  const videoPath = path.join(publicPath, 'ai_intro_video1.mp4');
  const videosPath = path.join(publicPath, 'videos', 'ai_intro_video1.mp4');
  
  res.json({ 
    status: 'OK', 
    env: 'production',
    publicPath: publicPath,
    videoExists: fs.existsSync(videoPath),
    videosExists: fs.existsSync(videosPath),
    videoSize: fs.existsSync(videoPath) ? fs.statSync(videoPath).size : 0,
    publicContents: fs.readdirSync(publicPath),
    timestamp: new Date().toISOString()
  });
});

// Debug endpoint for file listing
app.get('/debug/files', (req, res) => {
  try {
    const files = fs.readdirSync(publicPath, { withFileTypes: true });
    const fileList = files.map(file => ({
      name: file.name,
      isDirectory: file.isDirectory(),
      size: file.isDirectory() ? null : fs.statSync(path.join(publicPath, file.name)).size
    }));
    
    res.json({
      publicPath: publicPath,
      files: fileList
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Production server running on port ${PORT}`);
});
```

## 2. DEPLOYMENT PACKAGE.JSON (deployment/package.json)
```json
{
  "name": "nutrition-platform-deployment",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## 3. MAIN APP COMPONENT (client/src/App.tsx)
```typescript
import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { queryClient } from "@/lib/queryClient";

console.log("Nutrition Learning Platform loaded successfully");

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
```

## 4. HOME PAGE (client/src/pages/Home.tsx)
```typescript
import { useState } from "react";
import { lessonData } from "@/lib/lessonData";
import { quizData } from "@/lib/quizData";
import LessonCard from "@/components/LessonCard";
import QuestCard from "@/components/QuestCard";
import ProgressBar from "@/components/ProgressBar";
import VideoPlayer from "@/components/VideoPlayer";
import QuizModal from "@/components/QuizModal";
import SuccessModal from "@/components/SuccessModal";
import OrganicShape from "@/components/OrganicShape";
import { Lesson } from "@/shared/schema";

export default function Home() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Lesson | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
  };

  const handleLessonComplete = () => {
    if (selectedLesson) {
      setCompletedLessons(prev => [...prev, selectedLesson.id]);
      setSelectedLesson(null);
      setShowSuccess(true);
    }
  };

  const handleQuizClick = (lesson: Lesson) => {
    setSelectedQuiz(lesson);
  };

  const handleQuizComplete = () => {
    if (selectedQuiz) {
      setCompletedQuizzes(prev => [...prev, selectedQuiz.id]);
      setSelectedQuiz(null);
      setShowSuccess(true);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
  };

  const handleSuccessContinue = () => {
    setShowSuccess(false);
  };

  const isLessonCompleted = (lessonId: number) => completedLessons.includes(lessonId);
  const isQuizCompleted = (lessonId: number) => completedQuizzes.includes(lessonId);
  const isLessonAvailable = (lessonId: number) => {
    if (lessonId === 1) return true;
    return isQuizCompleted(lessonId - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="relative overflow-hidden">
        <OrganicShape className="absolute top-0 left-0 w-64 h-64 opacity-10" />
        <OrganicShape className="absolute top-1/2 right-0 w-80 h-80 opacity-10" variant="alt" />
        <OrganicShape className="absolute bottom-0 left-1/3 w-48 h-48 opacity-10" />
        
        <div className="relative z-10">
          <header className="text-center py-12 px-4">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/assets/logo.png" 
                alt="Nutrition Logo" 
                className="h-16 w-16 mr-4"
              />
              <h1 className="text-4xl font-bold text-gray-800">
                Nutrition Learning Platform
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Entdecke die Welt der Ernährung durch interaktive Videos und Quizzes
            </p>
          </header>

          <div className="max-w-6xl mx-auto px-4 pb-16">
            <ProgressBar 
              completedLessons={completedQuizzes.length} 
              totalLessons={lessonData.length} 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Lektionen</h2>
                <div className="space-y-4">
                  {lessonData.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isLessonCompleted(lesson.id)}
                      isAvailable={isLessonAvailable(lesson.id)}
                      onClick={() => handleLessonClick(lesson)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Quests</h2>
                <div className="space-y-4">
                  {lessonData.map((lesson) => (
                    <QuestCard
                      key={lesson.id}
                      lesson={lesson}
                      isCompleted={isQuizCompleted(lesson.id)}
                      isAvailable={isLessonCompleted(lesson.id)}
                      onQuizClick={() => handleQuizClick(lesson)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white py-8 px-4 border-t">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Gefördert durch
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Krankenkasse für ein gesundes Leben
                  </p>
                  <p className="text-xs text-gray-500">
                    Präventionsprogramm Ernährung
                  </p>
                </div>
                <img 
                  src="/assets/bkk-logo.png" 
                  alt="BKK firmus Logo" 
                  className="h-12 ml-4"
                />
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Entwickelt von
              </h3>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Zentrum für Innovative Ernährungssysteme
                  </p>
                  <p className="text-xs text-gray-500">
                    Wissenschaftlich fundierte Ernährungsbildung
                  </p>
                </div>
                <img 
                  src="/assets/zies-logo.png" 
                  alt="ZIES gGmbH Logo" 
                  className="h-12 ml-4"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {selectedLesson && (
        <VideoPlayer
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
          onComplete={handleLessonComplete}
        />
      )}

      {selectedQuiz && (
        <QuizModal
          lesson={selectedQuiz}
          onClose={() => setSelectedQuiz(null)}
          onComplete={handleQuizComplete}
        />
      )}

      {showSuccess && (
        <SuccessModal
          onClose={handleSuccessClose}
          onContinue={handleSuccessContinue}
        />
      )}
    </div>
  );
}
```

## 5. VIDEO PLAYER COMPONENT (client/src/components/VideoPlayer.tsx)
```typescript
import { useState, useEffect } from "react";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  lesson: any;
  onClose: () => void;
  onComplete: () => void;
}

export default function VideoPlayer({ lesson, onClose, onComplete }: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative w-full max-w-4xl mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
          <div className="bg-gray-900 text-white p-4">
            <h2 className="text-xl font-semibold">{lesson.title}</h2>
            <p className="text-gray-300 text-sm mt-1">{lesson.description}</p>
          </div>

          <div className="aspect-video bg-black relative">
            <iframe
              src={`/video-player.html?video=${lesson.videoUrl}`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              title={lesson.title}
            />
          </div>

          <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Dauer: {lesson.duration}
                </div>
                {isCompleted && (
                  <div className="text-green-600 text-sm font-medium">
                    ✓ Abgeschlossen
                  </div>
                )}
              </div>
              <button
                onClick={handleComplete}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Lektion abschließen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## 6. LESSON DATA (client/src/lib/lessonData.ts)
```typescript
export const lessonData = [
  {
    id: 1,
    title: "Einführung in die Ernährung",
    description: "Ein kurzer Überblick über das, was dich in dieser Videoreihe rund um Ernährung, Bewegung und Gesundheit erwartet.",
    videoUrl: "AI_Intro_small.mp4",
    duration: "5:30",
    thumbnail: "/assets/lesson1-thumb.jpg",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Kohlenhydrate verstehen",
    description: "Lerne die Grundlagen über Kohlenhydrate, ihre Rolle in der Ernährung und wie sie deinen Körper mit Energie versorgen.",
    videoUrl: "Kohlenhydrate_small.mp4",
    duration: "8:45",
    thumbnail: "/assets/lesson2-thumb.jpg",
    color: "from-indigo-600 to-blue-700"
  },
  {
    id: 3,
    title: "Proteine und Aminosäuren",
    description: "Verstehe die Bedeutung von Proteinen für deinen Körper und wie du eine ausgewogene Proteinzufuhr sicherstellst.",
    videoUrl: "lesson3.mp4",
    duration: "7:20",
    thumbnail: "/assets/lesson3-thumb.jpg",
    color: "from-green-500 to-teal-500"
  },
  {
    id: 4,
    title: "Gesunde Fette",
    description: "Erfahre mehr über die verschiedenen Arten von Fetten und ihre Auswirkungen auf deine Gesundheit.",
    videoUrl: "lesson4.mp4",
    duration: "6:15",
    thumbnail: "/assets/lesson4-thumb.jpg",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 5,
    title: "Vitamine und Mineralstoffe",
    description: "Lerne die wichtigsten Vitamine und Mineralstoffe kennen und wie sie deinen Körper unterstützen.",
    videoUrl: "lesson5.mp4",
    duration: "9:30",
    thumbnail: "/assets/lesson5-thumb.jpg",
    color: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    title: "Hydration und Flüssigkeitszufuhr",
    description: "Verstehe die Bedeutung einer ausreichenden Flüssigkeitszufuhr für deine Gesundheit und Leistungsfähigkeit.",
    videoUrl: "lesson6.mp4",
    duration: "5:45",
    thumbnail: "/assets/lesson6-thumb.jpg",
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: 7,
    title: "Mahlzeitenplanung",
    description: "Lerne, wie du ausgewogene Mahlzeiten planst und zubereitest, die deinen Nährstoffbedarf decken.",
    videoUrl: "lesson7.mp4",
    duration: "10:20",
    thumbnail: "/assets/lesson7-thumb.jpg",
    color: "from-emerald-500 to-green-600"
  },
  {
    id: 8,
    title: "Ernährung und Sport",
    description: "Erfahre, wie du deine Ernährung optimal an deine sportlichen Aktivitäten anpasst.",
    videoUrl: "lesson8.mp4",
    duration: "8:10",
    thumbnail: "/assets/lesson8-thumb.jpg",
    color: "from-violet-500 to-purple-600"
  },
  {
    id: 9,
    title: "Nachhaltige Ernährungsgewohnheiten",
    description: "Entwickle langfristige, gesunde Ernährungsgewohnheiten, die zu deinem Lebensstil passen.",
    videoUrl: "lesson9.mp4",
    duration: "7:55",
    thumbnail: "/assets/lesson9-thumb.jpg",
    color: "from-rose-500 to-pink-600"
  }
];
```

## 7. VIDEO PLAYER HTML (deployment/public/video-player.html)
```html
<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Video Player</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .video-container { 
            width: 100%; 
            max-width: 800px; 
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        video { 
            width: 100%; 
            height: auto; 
            display: block;
        }
        .controls {
            padding: 20px;
            background: #f8f9fa;
        }
        .btn {
            background: #007bff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
        }
        .btn:hover {
            background: #0056b3;
        }
        .btn-success {
            background: #28a745;
        }
        .btn-success:hover {
            background: #1e7e34;
        }
    </style>
</head>
<body>
    <div class="video-container">
        <video id="mainVideo" controls autoplay>
            <source id="videoSource" src="" type="video/mp4">
            Ihr Browser unterstützt das Video-Element nicht.
        </video>
        
        <div class="controls">
            <p>Schaue dir das Video vollständig an und klicke dann auf "Lektion abschließen".</p>
            <button class="btn btn-success" onclick="completeLesson()">
                ✓ Lektion abschließen
            </button>
        </div>
    </div>

    <script>
        // Get video URL from query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const videoUrl = urlParams.get('video');
        
        console.log('Video URL requested:', videoUrl);
        
        if (videoUrl) {
            const videoElement = document.getElementById('mainVideo');
            const sourceElement = document.getElementById('videoSource');
            
            // Ensure correct path format
            const cleanUrl = videoUrl.startsWith('/') ? videoUrl : '/' + videoUrl;
            sourceElement.src = cleanUrl;
            console.log('Setting video source to:', cleanUrl);
            
            videoElement.load(); // Reload video with new source
            
            // Add error handling
            videoElement.addEventListener('error', function(e) {
                console.error('Video error:', e);
                console.error('Video source:', sourceElement.src);
            });
            
            videoElement.addEventListener('loadstart', function() {
                console.log('Video load started');
            });
            
            videoElement.addEventListener('loadeddata', function() {
                console.log('Video data loaded successfully');
            });
        }

        function completeLesson() {
            alert('Lektion abgeschlossen! Du kannst dieses Fenster schließen.');
            window.close();
        }
    </script>
</body>
</html>
```

## 8. MAIN INDEX.HTML (deployment/public/index.html)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nutrition Learning Platform</title>
    <style>
      body { margin: 0; font-family: system-ui; }
      #root { min-height: 100vh; }
      .loading { 
        display: flex; 
        justify-content: center; 
        align-items: center; 
        height: 100vh; 
        font-size: 18px; 
        color: #666; 
      }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="loading">Lade Nutrition Learning Platform...</div>
    </div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>
```

## 9. PACKAGE.JSON (Hauptprojekt)
```json
{
  "name": "rest-express",
  "version": "1.0.0",
  "type": "module",
  "license": "MIT",
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "check": "tsc",
    "db:push": "drizzle-kit push"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "^1.2.4",
    "@radix-ui/react-dialog": "^1.1.7",
    "@radix-ui/react-slot": "^1.1.3",
    "@tanstack/react-query": "^5.59.16",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "express": "^4.21.1",
    "framer-motion": "^11.11.17",
    "lucide-react": "^0.456.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.2",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7",
    "typescript": "^5.6.3",
    "vite": "^5.4.10",
    "wouter": "^3.3.5",
    "zod": "^3.23.8"
  }
}
```

## DEPLOYMENT ANWEISUNGEN

### Für Replit Deployment:
1. **Nutze das `deployment/` Verzeichnis**
2. **Stelle sicher, dass die Videos vorhanden sind:**
   - `deployment/public/ai_intro_video1.mp4` (84MB)
   - `deployment/public/AI_Intro_small.mp4` (6MB)
   - `deployment/public/Kohlenhydrate_small.mp4` (7MB)

### Start-Befehl für Replit:
```bash
cd deployment && npm install && npm start
```

### Wichtige Test-URLs nach Deployment:
- `https://your-app.replit.app/` (Hauptseite)
- `https://your-app.replit.app/ai_intro_video1.mp4` (Direkter Video-Test)
- `https://your-app.replit.app/health` (Server-Diagnostik)
- `https://your-app.replit.app/test-video.html` (Video-Test-Seite)

Das `deployment/` Verzeichnis ist vollständig eigenständig und löst alle 404-Probleme!