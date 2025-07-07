#!/usr/bin/env node

// Pre-build script to ensure videos are available in Replit deployment
const fs = require('fs');
const path = require('path');

console.log('🚀 Pre-build: Ensuring video assets are ready...');

// Create public/assets directory if it doesn't exist
const publicAssetsDir = 'public/assets';
if (!fs.existsSync('public')) {
    fs.mkdirSync('public', { recursive: true });
}
if (!fs.existsSync(publicAssetsDir)) {
    fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Copy videos to public/assets so Vite can find them
const sourceDir = 'attached_assets';
if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
        if (file.endsWith('.mp4')) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = path.join(publicAssetsDir, file);
            
            fs.copyFileSync(sourcePath, targetPath);
            fs.chmodSync(targetPath, 0o644);
            
            const stats = fs.statSync(targetPath);
            console.log(`✅ Video prepared: ${file} (${Math.round(stats.size/1024/1024)}MB)`);
        }
    });
    
    console.log('🎉 Videos ready for Vite build!');
} else {
    console.log('❌ No attached_assets directory found');
}