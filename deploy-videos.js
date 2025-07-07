import fs from 'fs';
import path from 'path';

// Ensure dist/public exists
if (!fs.existsSync('dist/public')) {
  fs.mkdirSync('dist/public', { recursive: true });
}

// Copy videos to deployment directory
const videosSource = 'public/ai_intro_video1.mp4';
const videosTarget = 'dist/public/ai_intro_video1.mp4';

if (fs.existsSync(videosSource)) {
  fs.copyFileSync(videosSource, videosTarget);
  console.log('✓ Video copied to deployment directory');
  console.log(`File size: ${fs.statSync(videosTarget).size} bytes`);
} else {
  console.error('❌ Source video not found');
}

// Copy video player HTML
const htmlSource = 'public/video-player.html';
const htmlTarget = 'dist/public/video-player.html';

if (fs.existsSync(htmlSource)) {
  fs.copyFileSync(htmlSource, htmlTarget);
  console.log('✓ Video player HTML copied to deployment directory');
} else {
  console.error('❌ Video player HTML not found');
}