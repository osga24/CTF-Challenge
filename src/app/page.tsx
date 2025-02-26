'use client'
import React, { useState, useEffect } from 'react';
import LetterGlitch from '@/app/components/LetterGlitch';
import CharBlurText from '@/app/components/CharBlurText';
import { useRouter } from 'next/navigation';

export default function Page() {  // 修改 page 为 Page
  const [showButton, setShowButton] = useState(false);
  const router = useRouter();

  // 设置延迟显示按钮
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 3000); // 3秒后显示按钮，给足够时间让字体效果完成

    return () => clearTimeout(timer);
  }, []);

  // 处理按钮点击事件
  const handleStartChallenge = () => {
    router.push('/story'); // 跳转到第一关挑战页面
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* LetterGlitch as background */}
      <div className="absolute inset-0 opacity-30">
        <LetterGlitch />
      </div>

      {/* Centered content with character-level blur text effects */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        <div className="text-center p-6">
          <CharBlurText
            text="CyberHack"
            className="mb-8 text-white"
            charClassName="text-7xl font-bold"
            animationDelay={500} // 第一个标题最先出现
          />

          <CharBlurText
            text="OhYeahSeC Challenge"
            className="mb-6 text-white"
            charClassName="text-5xl font-semibold"
            animationDelay={1200} // 第二个标题延迟出现
          />

          <CharBlurText
            text="數位時代下的安全測驗"
            className="mb-6 text-white"
            charClassName="text-4xl"
            animationDelay={1800} // 第三个标题最后出现
          />

          {/* 延迟显示的简单渐变按钮 */}
          <div
            className={`mt-16 transition-all duration-500 ${showButton ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-4'}`}
          >
            <button
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-xl font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 shadow-lg"
              onClick={handleStartChallenge}
            >
              開始挑戰
            </button>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay to enhance text visibility */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent pointer-events-none"></div>
    </div>
  );
}
