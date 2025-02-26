// src/app/challenge/10/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LetterGlitch from '../../components/LetterGlitch';

// 第十關挑戰頁面 - 最終關卡
export default function Challenge10Page() {
  const level = 10;
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef(null);
  const router = useRouter();

  // 題目內容
  const challenge = {
    title: "最後的挑戰",
    description: "恭喜你到達最終關卡！在這最後的挑戰中，你將運用你的社交媒體搜索技巧。請查看下方照片，找出這個人的Instagram帳號，並提交作為最終的FLAG。",
    flag: "os324_" // 替換為你的Instagram用戶名
  };

  // 自動聚焦輸入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 處理FLAG提交
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 驗證答案 - 去除頭尾空格後進行比較
    const trimmedInput = userInput.trim();
    const correctFlag = challenge.flag.trim();

    if (trimmedInput === correctFlag) {
      setFeedback('恭喜！你已完成所有挑戰！正在前往完成頁面...');

      // 延遲跳轉到完成頁面
      setTimeout(() => {
        router.push('/end_HUAterpbJppw');
      }, 2000);
    } else {
      setFeedback('用戶名不正確，請再試一次。');
      setTimeout(() => {
        setFeedback('');
      }, 3000);
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-20">
      <LetterGlitch
          glitchColors={['#1a3b4c', '#4dc3a1', '#3498db']}
          glitchSpeed={50}
          centerVignette={false}
          outerVignette={true}
          smooth={true}
        />
      </div>

      {/* 內容區域 */}
      <div className="relative z-10 h-full flex flex-col items-center overflow-y-auto">
        {/* 標題區域 */}
        <div className="w-full py-4 bg-gradient-to-r from-purple-900/50 to-blue-900/50 text-center mb-8">
          <h1 className="text-3xl font-bold">
            第{level}關：{challenge.title}
          </h1>
        </div>

        {/* 內容區域 */}
        <div className="w-full max-w-4xl px-6 py-8 bg-gradient-to-b from-gray-900/70 to-black/70 rounded-lg shadow-2xl mx-auto mb-8">
          {/* 題目描述 */}
          <div className="mb-8 text-lg font-mono">
            {challenge.description}
          </div>

          {/* 照片區域 */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-md h-[400px] overflow-hidden rounded-lg border-2 border-purple-500/30">
              <Image
                src="/images/osga.png" // 請將照片放在 public/images/ 目錄下
                alt="個人照片"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* 輸入區域 */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col items-center space-y-4">
              <label htmlFor="flag" className="text-xl font-semibold">
                輸入Instagram用戶名:
              </label>
              <div className="relative w-full max-w-lg">
                <span className="absolute left-4 top-3 text-gray-400">@</span>
                <input
                  ref={inputRef}
                  type="text"
                  id="flag"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full px-10 py-3 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  placeholder="Instagram用戶名..."
                  spellCheck="false"
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                提交
              </button>

              {/* 反饋信息 */}
              {feedback && (
                <div className={`mt-4 px-6 py-3 rounded-lg ${feedback.includes('恭喜') ? 'bg-green-700/50' : 'bg-red-700/50'}`}>
                  {feedback}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-white/50">
        © 2025 OhYeahSeC Challenge
      </div>
    </div>
  );
}
