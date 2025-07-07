# Deployment Guide - Nutrition Learning Platform

## Pre-Deployment Checklist

### 1. Build Process
```bash
# Run the deployment script
node deploy.js
```

This will:
- Build the React application (`npm run build`)
- Bundle the server code with ESBuild
- Copy all video assets to `dist/public/assets/`
- Verify video files are properly copied

### 2. Video Asset Verification
✅ **Video Files Successfully Copied:**
- AI_Intro_X_1751549357807.mp4 (80.6MB)
- Kohlenhydrate_V5_1751550361289.mp4 (57.6MB)

### 3. Production Server Testing
The server is configured to serve videos with proper headers:
- **Content-Type**: video/mp4
- **Accept-Ranges**: bytes
- **Cache-Control**: public, max-age=0

### 4. Debug Route Available
Access `/debug/video-test` to test video loading in production

## Deployment Steps

### Option 1: Replit Deploy (Recommended)
1. Click "Deploy" in Replit
2. Select "Autoscale" for better performance
3. The build process will automatically run `npm run build`
4. Videos will be served from `/assets/` path

### Option 2: Manual Production Server
```bash
# Start production server
NODE_ENV=production node dist/index.js
```

## Video Troubleshooting

### Common Issues & Solutions

1. **Video Size Limits**
   - Current videos are within Replit's 100MB limit
   - AI_Intro: 80.6MB ✅
   - Kohlenhydrate: 57.6MB ✅

2. **MIME Type Issues**
   - Server automatically sets `Content-Type: video/mp4`
   - Browsers should recognize MP4 format

3. **Network Connectivity**
   - Use `/debug/video-test` to test video loading
   - Check browser developer tools for network errors

### Debug Information
- **Development Server**: Videos served from `attached_assets/`
- **Production Server**: Videos served from `dist/public/assets/`
- **Asset Paths**: All assets use `/assets/` prefix in URLs

## Technical Implementation

### Asset Serving Strategy
1. **Development**: Direct file serving from `attached_assets/`
2. **Production**: Static file serving from `dist/public/assets/`
3. **Deployment**: Automated asset copying with `deploy.js`

### Server Configuration
- **Port**: 5000 (Replit standard)
- **Host**: 0.0.0.0 (accessible externally)
- **Static Assets**: Express.static middleware
- **Video Headers**: Proper MIME types and caching

## Success Metrics
- [x] Videos build and copy successfully
- [x] Production server serves videos with HTTP 200
- [x] Proper MIME types (video/mp4) returned
- [x] Asset sizes within limits
- [x] Debug route functional

## Final Notes
The application is ready for deployment. All video assets are properly configured and the server is optimized for production use. The debug route provides real-time testing capabilities for troubleshooting any deployment issues.