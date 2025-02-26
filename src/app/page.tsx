'use client'
import React, { useState, useEffect } from 'react';
import LetterGlitch from '@/app/components/LetterGlitch';
import CharBlurText from '@/app/components/CharBlurText';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleStartChallenge = () => {
    router.push('/story');
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-30">
        <LetterGlitch 
          glitchColors={['#1a3b4c', '#4dc3a1', '#3498db']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* 内容区域 */}
      <div className="relative z-10 text-center px-6 w-full max-w-4xl">
        <CharBlurText
          text="CyberHack"
          className="mb-8 text-white block"
          charClassName="text-7xl font-bold"
          animationDelay={500}
        />

        <CharBlurText
          text="OhYeahSeC Challenge"
          className="mb-6 text-white block"
          charClassName="text-5xl font-semibold"
          animationDelay={1200}
        />

        <CharBlurText
          text="數位時代下的安全測驗"
          className="mb-10 text-white block"
          charClassName="text-4xl"
          animationDelay={1800}
        />

        {/* 延迟显示的按钮 */}
        <div
          className={`transition-all duration-500 flex justify-center ${
            showButton ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'
          }`}
        >
          <button
            className="px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl font-bold rounded-lg 
            hover:from-purple-700 hover:to-blue-600 
            transition-all duration-300 
            transform hover:scale-105 
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 
            shadow-lg"
            onClick={handleStartChallenge}
          >
            開始挑戰
          </button>
        </div>
      </div>

      {/* 渐变叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}