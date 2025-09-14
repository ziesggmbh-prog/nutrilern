import React, { useState, useEffect } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFullscreenSync } from '@/hooks/useFullscreenSync';

interface FullscreenToggleProps {
  className?: string;
}

export default function FullscreenToggle({ className = "" }: FullscreenToggleProps) {
  const isFullscreen = useFullscreenSync();

  // Check if fullscreen is supported
  const isFullscreenSupported = () => {
    return !!(
      document.documentElement.requestFullscreen ||
      (document.documentElement as any).webkitRequestFullscreen ||
      (document.documentElement as any).mozRequestFullScreen ||
      (document.documentElement as any).msRequestFullscreen
    );
  };

  // Enter fullscreen
  const enterFullscreen = async () => {
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
      console.warn('Could not enter fullscreen:', error);
    }
  };

  // Exit fullscreen
  const exitFullscreen = async () => {
    try {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        await (document as any).webkitExitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        await (document as any).mozCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        await (document as any).msExitFullscreen();
      }
    } catch (error) {
      console.warn('Could not exit fullscreen:', error);
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (isFullscreen) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  };


  // Don't render if fullscreen is not supported
  if (!isFullscreenSupported()) {
    return null;
  }

  return (
    <div className={`${className}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleFullscreen}
        className="w-10 h-10 bg-purple-custom rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
        aria-label={isFullscreen ? "Vollbildmodus verlassen" : "Vollbildmodus aktivieren"}
        title={isFullscreen ? "Vollbildmodus verlassen" : "Vollbildmodus aktivieren"}
      >
        <motion.div
          animate={{ rotate: isFullscreen ? 0 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isFullscreen ? (
            <Minimize2 className="text-white" size={20} />
          ) : (
            <Maximize2 className="text-white" size={20} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}