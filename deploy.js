import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting deployment process...');

// Step 1: Build the application
console.log('📦 Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Copy assets
console.log('📂 Copying video assets...');
try {
  const sourceDir = 'attached_assets';
  const targetDir = 'dist/public/assets';
  
  if (fs.existsSync(sourceDir)) {
    // Ensure target directory exists
    fs.mkdirSync(targetDir, { recursive: true });
    
    // Copy all files
    const files = fs.readdirSync(sourceDir);
    let copiedCount = 0;
    
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      if (fs.statSync(sourcePath).isFile()) {
        fs.copyFileSync(sourcePath, targetPath);
        copiedCount++;
        
        if (file.endsWith('.mp4')) {
          console.log(`  📹 Copied video: ${file}`);
        }
      }
    });
    
    console.log(`✅ Copied ${copiedCount} assets`);
  } else {
    console.log('⚠️  No assets directory found');
  }
} catch (error) {
  console.error('❌ Asset copying failed:', error.message);
  process.exit(1);
}

// Step 3: Verify assets
console.log('🔍 Verifying video assets...');
try {
  const assetsDir = 'dist/public/assets';
  const videoFiles = fs.readdirSync(assetsDir).filter(file => file.endsWith('.mp4'));
  
  videoFiles.forEach(video => {
    const videoPath = path.join(assetsDir, video);
    const stats = fs.statSync(videoPath);
    console.log(`  ✅ ${video} - ${(stats.size / 1024 / 1024).toFixed(1)}MB`);
  });
  
  console.log(`✅ ${videoFiles.length} videos ready for deployment`);
} catch (error) {
  console.error('❌ Asset verification failed:', error.message);
}

console.log('🎉 Deployment preparation complete!');
console.log('');
console.log('Next steps:');
console.log('1. Use Replit Deploy with Autoscale');
console.log('2. Videos will be served from /assets/ path');
console.log('3. All assets are in dist/public/assets/');