// src/app/challenge/8/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../../components/LetterGlitch';

// 第八關挑戰頁面
export default function Challenge8Page() {
  const level = 8;
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 登入平台網址
  const loginURL = "https://secret-system.ohyeahsec.org/"; // 替換為你的實際登入頁面URL

  // 題目內容
  const challenge = {
    title: "管理員登入",
    description: "我們發現了一個可疑的登入頁面，據信這裡存放了重要的機密資訊。嘗試找出管理員的憑證並成功登入系統。FLAG就在前端的某處。",
    flag: "OYSC{FR0NT3ND_S3CR3TS_4R3_N3V3R_S4F3}" // 確保這與你隱藏在前端的FLAG一致
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
        router.push('/challenge/9_tFwbyvOPpotb');
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

          {/* 網頁登入鏈結 */}
          <div className="mb-12 flex flex-col items-center">
            <div className="mb-4 text-xl text-yellow-300 font-semibold">
              登入頁面:
            </div>
            <a
              href={loginURL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-bold rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>開啟登入頁面</span>
            </a>

            {/* 隱藏註解，提示用戶檢查源代碼 */}
            {/* <!-- 提示: 檢查HTML和JavaScript源代碼，或許管理員的憑證就藏在其中 --> */}
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

      {/* HTML註釋中的提示: 這些都不會顯示在頁面上 */}
      {/*
        隱藏在源代碼中的提示，在這個頁面中沒有實際作用，
        但可以讓解題者習慣閱讀HTML源代碼
      */}
    </div>
  );
}
