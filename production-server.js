import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Force production mode
process.env.NODE_ENV = 'production';

console.log('🚀 Starting Production Server');
console.log('Environment:', process.env.NODE_ENV);
console.log('Directory:', __dirname);

const publicPath = path.join(__dirname, 'dist', 'public');
const indexPath = path.join(publicPath, 'index.html');

console.log('Public path:', publicPath);
console.log('Index.html exists:', fs.existsSync(indexPath));

// Log requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Static files
app.use(express.static(publicPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.mp4')) {
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Accept-Ranges', 'bytes');
    }
  }
}));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    env: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    indexExists: fs.existsSync(indexPath)
  });
});

// SPA fallback
app.get('*', (req, res) => {
  console.log(`Serving ${req.path} -> index.html`);
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Index.html not found');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Production server running on port ${port}`);
  console.log(`📁 Serving files from: ${publicPath}`);
  console.log(`📄 Index.html available: ${fs.existsSync(indexPath)}`);
});