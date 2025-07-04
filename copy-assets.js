import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Copy attached_assets to dist/public/assets
const sourceDir = path.join(__dirname, 'attached_assets');
const targetDir = path.join(__dirname, 'dist/public/assets');

if (fs.existsSync(sourceDir)) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Copy all files from source to target
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isFile()) {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${file}`);
    }
  });
  
  console.log('Assets copied successfully!');
} else {
  console.log('Source directory does not exist:', sourceDir);
}