import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'wouter';

interface LevelDropdownProps {
  className?: string;
}

export default function LevelDropdown({ className = "" }: LevelDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const levels = [
    { id: 1, title: 'Einzelspielermodus', href: '/' },
    { id: 2, title: 'Gruppenmodus', href: '/level2' }
  ];

  const currentLevel = levels.find(level => level.href === location) || levels[0];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-navy-light rounded-full px-4 py-2 flex items-center gap-2 text-green-custom font-semibold hover:bg-opacity-80 transition-colors"
      >
        <span>{currentLevel.title}</span>
        <ChevronDown 
          size={16} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-12 left-0 w-full bg-navy-light rounded-xl shadow-xl border border-gray-700 overflow-hidden z-50"
          >
            {levels.map((level) => (
              <Link key={level.id} href={level.href}>
                <div
                  className={`block px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                    location === level.href 
                      ? 'bg-green-custom text-white' 
                      : 'text-gray-300 hover:bg-green-custom hover:bg-opacity-20 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {level.title}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}