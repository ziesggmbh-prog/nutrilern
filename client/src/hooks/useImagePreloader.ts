import { useEffect, useState } from 'react';

export function useImagePreloader(imageUrls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadImages = async () => {
      // Preload first 3 images immediately
      const priorityImages = imageUrls.slice(0, 3);
      
      priorityImages.forEach(url => {
        if (!loadedImages.has(url) && !loadingImages.has(url)) {
          setLoadingImages(prev => new Set(prev).add(url));
          
          const img = new Image();
          img.onload = () => {
            setLoadedImages(prev => new Set(prev).add(url));
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
          };
          img.onerror = () => {
            setLoadingImages(prev => {
              const newSet = new Set(prev);
              newSet.delete(url);
              return newSet;
            });
          };
          img.src = url;
        }
      });
      
      // Preload remaining images with reduced delay (images are now optimized and small)
      setTimeout(() => {
        const remainingImages = imageUrls.slice(3);
        remainingImages.forEach(url => {
          if (!loadedImages.has(url) && !loadingImages.has(url)) {
            setLoadingImages(prev => new Set(prev).add(url));
            
            const img = new Image();
            img.onload = () => {
              setLoadedImages(prev => new Set(prev).add(url));
              setLoadingImages(prev => {
                const newSet = new Set(prev);
                newSet.delete(url);
                return newSet;
              });
            };
            img.onerror = () => {
              setLoadingImages(prev => {
                const newSet = new Set(prev);
                newSet.delete(url);
                return newSet;
              });
            };
            img.src = url;
          }
        });
      }, 50);
    };

    if (imageUrls.length > 0) {
      preloadImages();
    }
  }, [imageUrls]);

  return {
    isLoaded: (url: string) => loadedImages.has(url),
    isLoading: (url: string) => loadingImages.has(url),
    loadedCount: loadedImages.size,
    totalCount: imageUrls.length
  };
}