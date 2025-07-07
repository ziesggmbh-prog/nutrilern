#!/usr/bin/env node

// Post-build script to copy videos after Vite build
import fs from 'fs';
import path from 'path';

console.log('🔄 Post-build: Copying video assets...');

const sourceDir = 'attached_assets';
const targetDir = 'dist/public/assets';

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy video files
if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
        if (file.endsWith('.mp4')) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(targetDir, file);
            
            // Copy file
            fs.copyFileSync(sourcePath, targetPath);
            
            // Set proper permissions
            fs.chmodSync(targetPath, 0o644);
            
            const stats = fs.statSync(targetPath);
            console.log(`✅ Video deployed: ${file} (${Math.round(stats.size/1024/1024)}MB)`);
        }
    });
} else {
    console.log('❌ Source directory not found:', sourceDir);
}

console.log('🎉 Post-build complete - Videos ready for deployment!');