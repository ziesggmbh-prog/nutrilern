const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Force production environment
process.env.NODE_ENV = 'production';

const publicDir = path.join(__dirname, 'dist', 'public');
const indexFile = path.join(publicDir, 'index.html');

console.log('Production Server Starting...');
console.log('Public directory:', publicDir);
console.log('Index file exists:', fs.existsSync(indexFile));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

// Static file middleware
app.use(express.static(publicDir, {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV,
    indexExists: fs.existsSync(indexFile),
    publicDir: publicDir
  });
});

// SPA catch-all
app.get('*', (req, res) => {
  console.log(`Serving SPA fallback for: ${req.url}`);
  
  if (fs.existsSync(indexFile)) {
    res.sendFile(indexFile);
  } else {
    console.error('INDEX.HTML NOT FOUND!');
    res.status(404).send(`
      <!DOCTYPE html>
      <html>
        <head><title>Error</title></head>
        <body>
          <h1>Server Error</h1>
          <p>Index file not found at: ${indexFile}</p>
          <p>Public directory: ${publicDir}</p>
          <p>Directory contents:</p>
          <pre>${fs.existsSync(publicDir) ? fs.readdirSync(publicDir).join('\n') : 'Directory does not exist'}</pre>
        </body>
      </html>
    `);
  }
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
  console.log(`Static files: ${publicDir}`);
  console.log(`Index available: ${fs.existsSync(indexFile)}`);
  
  if (fs.existsSync(publicDir)) {
    console.log('Public directory contents:', fs.readdirSync(publicDir));
  }
});