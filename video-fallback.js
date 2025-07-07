// Video fallback solution - serve videos differently based on browser capability
import fs from 'fs';
import path from 'path';

export function setupVideoFallback(app) {
  // Serve videos with proper streaming headers
  app.get('/stream/:videoFile', (req, res) => {
    const videoFile = req.params.videoFile;
    const videoPath = path.join(process.cwd(), 'dist/public/assets', videoFile);
    
    if (!fs.existsSync(videoPath)) {
      return res.status(404).send('Video not found');
    }
    
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;
    
    if (range) {
      // Handle range requests for streaming
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(videoPath, { start, end });
      
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
        'Cache-Control': 'no-cache'
      };
      
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      // Serve complete file
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache'
      };
      
      res.writeHead(200, head);
      fs.createReadStream(videoPath).pipe(res);
    }
  });
}