import { useState, useEffect } from 'react';

// Use localStorage to persist fullscreen state across navigations
const FULLSCREEN_KEY = 'nutri-app-fullscreen-mode';

// Global state for fullscreen synchronization across pages
let globalFullscreenState = localStorage.getItem(FULLSCREEN_KEY) === 'true';
const fullscreenListeners: Set<(isFullscreen: boolean) => void> = new Set();

export function useFullscreenSync() {
  const [isFullscreen, setIsFullscreen] = useState(globalFullscreenState);

  useEffect(() => {
    // Add this component's setter to listeners
    const updateState = (newState: boolean) => {
      setIsFullscreen(newState);
    };
    fullscreenListeners.add(updateState);

    // Check actual fullscreen state on mount
    const checkActualFullscreen = () => {
      const actualFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      
      if (actualFullscreen !== globalFullscreenState) {
        updateGlobalFullscreenState(actualFullscreen, false);
      }
    };

    checkActualFullscreen();

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      const actualFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement
      );
      
      // Only update localStorage if this was a user-initiated change
      updateGlobalFullscreenState(actualFullscreen, true);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    // Cleanup
    return () => {
      fullscreenListeners.delete(updateState);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, []);

  // If we're navigating to a page and were previously in fullscreen, restore it
  useEffect(() => {
    const storedFullscreen = localStorage.getItem(FULLSCREEN_KEY) === 'true';
    
    if (storedFullscreen && !document.fullscreenElement) {
      console.log('Attempting to restore fullscreen mode...');
      
      // Longer delay to ensure page is fully loaded and stable
      const timer = setTimeout(async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
            console.log('Fullscreen restored successfully');
          } else if ((document.documentElement as any).webkitRequestFullscreen) {
            await (document.documentElement as any).webkitRequestFullscreen();
            console.log('Fullscreen restored successfully (webkit)');
          } else if ((document.documentElement as any).mozRequestFullScreen) {
            await (document.documentElement as any).mozRequestFullScreen();
            console.log('Fullscreen restored successfully (moz)');
          } else if ((document.documentElement as any).msRequestFullscreen) {
            await (document.documentElement as any).msRequestFullscreen();
            console.log('Fullscreen restored successfully (ms)');
          }
        } catch (error) {
          console.warn('Could not restore fullscreen (this is normal in some browsers):', error);
          // Don't clear the localStorage state here - user might want to try again
        }
      }, 500); // Increased delay

      return () => clearTimeout(timer);
    }
  }, []);

  return isFullscreen;
}

function updateGlobalFullscreenState(newState: boolean, updateStorage: boolean = true) {
  globalFullscreenState = newState;
  
  // Update localStorage to persist across navigation
  if (updateStorage) {
    if (newState) {
      localStorage.setItem(FULLSCREEN_KEY, 'true');
    } else {
      localStorage.removeItem(FULLSCREEN_KEY);
    }
  }
  
  // Notify all listening components
  fullscreenListeners.forEach(listener => listener(newState));
}