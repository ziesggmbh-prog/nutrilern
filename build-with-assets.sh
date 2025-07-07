#!/bin/bash

echo "🚀 Building Nutrition Learning Platform for Deployment..."

# Build the application
echo "📦 Building application..."
npm run build

# Copy and set permissions for video assets
echo "📂 Copying video assets..."
if [ -d "attached_assets" ]; then
    cp -r attached_assets/* dist/public/assets/
    
    # Set correct permissions for video files
    find dist/public/assets -name "*.mp4" -exec chmod 644 {} \;
    
    echo "✅ Video assets copied and permissions set"
else
    echo "⚠️  No attached_assets directory found"
fi

# Verify video files
echo "🔍 Verifying video assets..."
if [ -f "dist/public/assets/AI_Intro_X_1751549357807.mp4" ]; then
    echo "✅ AI_Intro video found"
fi
if [ -f "dist/public/assets/Kohlenhydrate_V5_1751550361289.mp4" ]; then
    echo "✅ Kohlenhydrate video found"
fi

echo "🎉 Build complete! Ready for deployment."