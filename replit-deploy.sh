#!/bin/bash

echo "🚀 Replit Deployment Script - Nutrition Learning Platform"
echo "============================================================"

# Step 1: Build the application
echo "📦 Building application..."
npm run build

# Step 2: Copy video assets (critical for deployment)
echo "📹 Copying video assets to deployment directory..."
if [ -d "attached_assets" ]; then
    # Copy MP4 files
    cp attached_assets/*.mp4 dist/public/assets/ 2>/dev/null || echo "No MP4 files to copy"
    
    # Set proper permissions
    chmod 644 dist/public/assets/*.mp4 2>/dev/null || echo "No MP4 files to set permissions"
    
    # Verify videos
    for video in "AI_Intro_X_1751549357807.mp4" "Kohlenhydrate_V5_1751550361289.mp4"; do
        if [ -f "dist/public/assets/$video" ]; then
            size=$(stat -c%s "dist/public/assets/$video" 2>/dev/null || stat -f%z "dist/public/assets/$video" 2>/dev/null || echo "0")
            size_mb=$((size / 1024 / 1024))
            echo "✅ $video deployed (${size_mb}MB)"
        else
            echo "❌ $video NOT FOUND"
        fi
    done
else
    echo "❌ attached_assets directory not found"
fi

# Step 3: Verify deployment readiness
echo ""
echo "🔍 Deployment Verification:"
echo "- Build directory: $(ls -la dist/ | wc -l) items"
echo "- Video assets: $(ls -la dist/public/assets/*.mp4 2>/dev/null | wc -l) videos"
echo "- Server binary: $(ls -la dist/index.js 2>/dev/null && echo "✅ Ready" || echo "❌ Missing")"

echo ""
echo "🎉 Deployment preparation complete!"
echo "Videos are now ready for Replit deployment."

# Step 4: Create deployment verification
echo ""
echo "To verify deployment after it's live:"
echo "1. Visit your deployment URL"
echo "2. Check /debug/video-test route"
echo "3. Videos should load and play correctly"