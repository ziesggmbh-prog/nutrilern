import React, { useState, useEffect } from 'react';
import { Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullscreenRestoreNotificationProps {
  className?: string;
}

export default function FullscreenRestoreNotification({ className = "" }: FullscreenRestoreNotificationProps) {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Check if user was previously in fullscreen mode
    const wasInFullscreen = localStorage.getItem('nutri-app-fullscreen-mode') === 'true';
    
    // Check if we're currently NOT in fullscreen
    const isCurrentlyFullscreen = !!(
      document.fullscreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).msFullscreenElement
    );

    // Show notification if user was in fullscreen but isn't anymore
    if (wasInFullscreen && !isCurrentlyFullscreen) {
      // Small delay to allow page to settle
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const restoreFullscreen = async () => {
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
      setShowNotification(false);
    } catch (error) {
      console.warn('Could not enter fullscreen:', error);
    }
  };

  const dismissNotification = () => {
    setShowNotification(false);
    // Clear the fullscreen preference since user dismissed it
    localStorage.removeItem('nutri-app-fullscreen-mode');
  };

  return (
    <AnimatePresence>
      {showNotification && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          <div className="bg-purple-600 text-white rounded-lg shadow-lg border border-purple-500 p-4 max-w-md">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Maximize2 className="text-purple-200" size={20} />
                <div>
                  <p className="font-semibold text-sm">Vollbildmodus wiederherstellen?</p>
                  <p className="text-purple-200 text-xs">Klicken Sie hier, um wieder in den Vollbildmodus zu wechseln</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={restoreFullscreen}
                  className="bg-purple-500 hover:bg-purple-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Aktivieren
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={dismissNotification}
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  <X size={16} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}