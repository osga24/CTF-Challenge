// src/app/challenge/2/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LetterGlitch from '../../components/LetterGlitch';

// 第一關挑戰頁面
export default function Challenge1Page() {
  const level = 1;
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 第一關題目內容
  const challenge = {
    title: "凱薩的秘密",
    description: "你截獲了一段加密的通訊訊息，並且發現了一張照片，不知道跟這串密文是否有關聯。\n\n密文: DNHR{RPTHPG_RXEWTG_GDI_UXUIC}",
    flag: "OYSC{CAESAR_CIPHER_ROT_FIFTN}",
    image: "/images/caesar.png" // 圖片路徑，你需要將圖片放在 public/images/ 目錄下
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
      setFeedback('恭喜！FLAG正確。正在前往下一關...');

      // 延遲跳轉到下一關
      setTimeout(() => {
        router.push('/challenge/cRAISYfsZYCC');
      }, 2000);
    } else {
      setFeedback('FLAG不正確，請再試一次。');
      setTimeout(() => {
        setFeedback('');
      }, 3000);
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden text-white">
      {/* 背景效果 */}
      <div className="absolute inset-0 opacity-20">
        <LetterGlitch />
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
          <div className="mb-8">
            <pre className="text-lg whitespace-pre-wrap font-mono leading-relaxed">
              {challenge.description}
            </pre>
          </div>

          {/* 圖片區域 */}
          <div className="mb-10 flex justify-center">
            {challenge.image && (
              <div className="relative w-full max-w-2xl h-[300px] rounded-lg overflow-hidden border-2 border-purple-500/30">
                <Image
                  src={challenge.image}
                  alt="凱薩密碼參考圖"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-lg"
                />
              </div>
            )}
          </div>

          {/* 輸入區域 */}
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="flex flex-col items-center space-y-4">
              <label htmlFor="flag" className="text-xl font-semibold">
                輸入FLAG:
              </label>
              <input
                ref={inputRef}
                type="text"
                id="flag"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full max-w-lg px-4 py-3 bg-gray-800 border border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                placeholder="輸入你的答案..."
                spellCheck="false"
                autoComplete="off"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-lg font-bold rounded-lg hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
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
