# Deployment Troubleshooting Checklist

## Pre-Deployment Verification

### 1. File Structure Check
- [ ] Video file exists in `/public/ai_intro_video1.mp4` (84MB)
- [ ] Video file also in `/public/videos/ai_intro_video1.mp4`
- [ ] `video-player.html` exists in `/public/`
- [ ] `index.html` exists in `/public/`

### 2. File Permissions
- [ ] Video files have correct read permissions
- [ ] No case sensitivity issues (all lowercase filenames)
- [ ] No spaces or special characters in filenames

### 3. Server Configuration
- [ ] Express static middleware configured: `app.use(express.static('public'))`
- [ ] Video headers set: Content-Type: video/mp4, Accept-Ranges: bytes
- [ ] SPA fallback route configured for index.html

## Testing URLs (Replace with your domain)

### Direct Video Tests
- [ ] `https://your-app.replit.app/ai_intro_video1.mp4` (should return video)
- [ ] `https://your-app.replit.app/videos/ai_intro_video1.mp4` (alternative path)

### Application Tests
- [ ] `https://your-app.replit.app/` (main app loads)
- [ ] `https://your-app.replit.app/video-player.html?video=ai_intro_video1.mp4` (video player)
- [ ] `https://your-app.replit.app/test-video.html` (test page with multiple video elements)

### Debug Endpoints
- [ ] `https://your-app.replit.app/health` (server diagnostics)
- [ ] `https://your-app.replit.app/debug/files` (file listing)

## Common Issues & Solutions

### 404 Video Not Found
1. Check file exists in correct directory
2. Verify filename spelling (case-sensitive)
3. Check static file middleware configuration
4. Verify deployment copied all files

### Video Loads But Won't Play
1. Check video format (H.264 Baseline recommended)
2. Verify Content-Type headers
3. Check file permissions
4. Test with different browser

### Page 404 Not Found
1. Verify SPA fallback route: `app.get('*', (req, res) => res.sendFile('index.html'))`
2. Check index.html exists in public directory
3. Verify static middleware order (before fallback route)

## Replit-Specific Notes
- Files must be in public directory to be served
- Check Replit console for deployment errors
- Verify all files copied during build process
- Test locally first if possible

## Alternative Testing
If issues persist, try:
1. Upload a small test video file
2. Test with different video format
3. Deploy to different platform (Netlify, Vercel) for comparison
4. Contact Replit support if platform-specific issue