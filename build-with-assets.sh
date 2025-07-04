#!/bin/bash

echo "Building application..."
npm run build

echo "Copying assets to production directory..."
mkdir -p dist/public/assets
cp -r attached_assets/* dist/public/assets/

echo "Build complete with assets!"
echo "Files in dist/public/assets:"
ls -la dist/public/assets/ | head -5

echo "Starting production server..."
npm run start