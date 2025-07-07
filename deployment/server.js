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