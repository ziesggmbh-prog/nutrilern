import { useState, useEffect } from 'react';

// Global state for fullscreen synchronization across pages
let globalFullscreenState = false;
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
        updateGlobalFullscreenState(actualFullscreen);
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
      
      updateGlobalFullscreenState(actualFullscreen);
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
    if (globalFullscreenState && !document.fullscreenElement) {
      // Small delay to allow page to render before going fullscreen
      const timer = setTimeout(async () => {
        try {
          if (document.documentElement.requestFullscreen) {
            await document.documentElement.requestFullscreen();
          } else if ((document.documentElement as any).webkitRequestFullscreen) {
            await (document.documentElement as any).webkitRequestFullscreen();
          } else if ((document.documentElement as any).mozRequestFullScreen) {
            await (document.documentElement as any).mozRequestFullScreen();
          } else if ((document.documentElement as any).msRequestFullscreen) {
            await (document.documentElement as any).msRequestFullscreen();
          }
        } catch (error) {
          console.warn('Could not restore fullscreen:', error);
          updateGlobalFullscreenState(false);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return isFullscreen;
}

function updateGlobalFullscreenState(newState: boolean) {
  globalFullscreenState = newState;
  // Notify all listening components
  fullscreenListeners.forEach(listener => listener(newState));
}