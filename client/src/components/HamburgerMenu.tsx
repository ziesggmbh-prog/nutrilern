import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Info, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';

interface HamburgerMenuProps {
  className?: string;
}

export default function HamburgerMenu({ className = "" }: HamburgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: Home, label: 'Start', href: '/' },
    { icon: BookOpen, label: 'Für Lehrer:innen', href: '/teachers' },
    { icon: Info, label: 'Über das Programm', href: '/about' }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 bg-purple-custom rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
        aria-label="Menü öffnen"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="text-white" size={20} />
          ) : (
            <Menu className="text-white" size={20} />
          )}
        </motion.div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-56 bg-black bg-opacity-30 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700 overflow-hidden z-[100]"
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-300 hover:bg-purple-custom hover:bg-opacity-20 hover:text-white transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon 
                      size={18} 
                      className="mr-3 text-gray-400 group-hover:text-white transition-colors"
                    />
                    <span className="font-medium">{item.label}</span>
                  </a>
                </motion.div>

              ))}
            </div>
            
            {/* Decorative Bottom */}
            <div className="h-1 bg-gradient-to-r from-purple-custom via-green-custom to-orange-custom"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-20 z-[90]"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}