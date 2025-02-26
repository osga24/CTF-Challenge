'use client'
import React, { useState, useEffect } from 'react';

const CharBlurText = ({ 
  text, 
  className = "", 
  charClassName = "", 
  animationDelay = 0 
}: { 
  text: string;
  className?: string; 
  charClassName?: string; 
  animationDelay?: number;
}) => {
  const [clearChars, setClearChars] = useState<number[]>([]);

  useEffect(() => {
    if (text) {
      const chars = text.split('');
      const timer = setTimeout(() => {
        const revealInterval = setInterval(() => {
          setClearChars(prev => {
            if (prev.length < chars.length) {
              return [...prev, prev.length];
            }
            clearInterval(revealInterval);
            return prev;
          });
        }, 50);

        return () => {
          clearInterval(revealInterval);
        };
      }, animationDelay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, animationDelay]);

  return (
    <div className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`
            inline-block 
            transition-all 
            duration-300 
            ${clearChars.includes(index) ? 'opacity-100' : 'opacity-0 blur-lg'}
            ${charClassName}
            ${char === ' ' ? 'mr-2' : ''}
          `}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default CharBlurText;