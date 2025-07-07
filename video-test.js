// Test script to verify video deployment setup
import fs from 'fs';
import path from 'path';

console.log('🔍 Video Deployment Test');
console.log('========================');

// 1. Check source videos exist
console.log('\n1. Source Videos:');
const sourceVideos = ['AI_Intro_small.mp4', 'Kohlenhydrate_small.mp4'];
sourceVideos.forEach(video => {
  const videoPath = path.join('attached_assets', video);
  if (fs.existsSync(videoPath)) {
    const stats = fs.statSync(videoPath);
    console.log(`✅ ${video} (${Math.round(stats.size/1024/1024)}MB)`);
  } else {
    console.log(`❌ ${video} - NOT FOUND`);
  }
});

// 2. Check build directory videos
console.log('\n2. Build Directory Videos:');
const buildDir = 'dist/public/assets';
if (fs.existsSync(buildDir)) {
  const buildVideos = fs.readdirSync(buildDir).filter(f => f.endsWith('.mp4'));
  buildVideos.forEach(video => {
    const videoPath = path.join(buildDir, video);
    const stats = fs.statSync(videoPath);
    console.log(`✅ ${video} (${Math.round(stats.size/1024/1024)}MB)`);
  });
} else {
  console.log(`❌ Build directory not found: ${buildDir}`);
}

// 3. Check lessonData URLs
console.log('\n3. Lesson Data URLs:');
const lessonDataPath = 'client/src/lib/lessonData.ts';
if (fs.existsSync(lessonDataPath)) {
  const content = fs.readFileSync(lessonDataPath, 'utf8');
  const urls = content.match(/videoUrl: "([^"]+)"/g);
  if (urls) {
    urls.forEach(url => {
      const videoUrl = url.match(/"([^"]+)"/)[1];
      console.log(`🔗 ${videoUrl}`);
    });
  }
} else {
  console.log(`❌ Lesson data file not found`);
}

console.log('\n✅ Video deployment check complete!');