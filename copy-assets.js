import fs from 'fs';
import path from 'path';

console.log('🔄 Starting asset copy process...');

// Ensure target directory exists
const targetDir = 'dist/public/assets';
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log('📁 Created target directory');
}

// Copy all assets from attached_assets
const sourceDir = 'attached_assets';
if (fs.existsSync(sourceDir)) {
    const files = fs.readdirSync(sourceDir);
    
    files.forEach(file => {
        const sourcePath = path.join(sourceDir, file);
        const targetPath = path.join(targetDir, file);
        
        if (fs.statSync(sourcePath).isFile()) {
            fs.copyFileSync(sourcePath, targetPath);
            
            // Set proper permissions
            fs.chmodSync(targetPath, 0o644);
            
            if (file.endsWith('.mp4')) {
                const stats = fs.statSync(targetPath);
                console.log(`✅ Video copied: ${file} (${Math.round(stats.size/1024/1024)}MB)`);
            }
        }
    });
    
    console.log('🎉 Asset copying complete!');
} else {
    console.log('❌ No attached_assets directory found');
}

// Verify videos exist
const videoFiles = ['AI_Intro_X_1751549357807.mp4', 'Kohlenhydrate_V5_1751550361289.mp4'];
videoFiles.forEach(video => {
    const videoPath = path.join(targetDir, video);
    if (fs.existsSync(videoPath)) {
        console.log(`✅ ${video} ready for deployment`);
    } else {
        console.log(`❌ ${video} NOT FOUND`);
    }
});