// src/app/challenge/5/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../../components/LetterGlitch';

// 第五關挑戰頁面
export default function Challenge5Page() {
  const level = 5;
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 題目內容
  const challenge = {
    title: "除錯大師",
    description: "這是一個有語法錯誤的 Python 程式，修復它並執行，就能獲得正確的 FLAG。",
    code: `def decrypt_flag():
    encrypted = [79, 89, 83, 67, 123, 68, 69, 66, 85, 71, 71, 73, 78, 71, 95, 73, 83, 95, 70, 85, 78, 125]
    flag = ""

    for i in rnage(len(encrypted)):
        flag += chr(encrypted[i])

    return flag

def main():
    print("解密 FLAG...")
    flag = decrypt_flag()
    if flag.startswith("OYSC"):
        print("成功！FLAG 是:")
        print(flag)
    else
        print("還有錯誤，繼續除錯！")

if __name__ = "__main__":
    main()`,
    hint: "提示: 這個程式中有兩個語法錯誤，修復它們後就能正確執行並顯示 FLAG。",
    flag: "OYSC{DEBUGGING_IS_FUN}"
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
        router.push('/challenge/6_eMjVGPIewYYR');
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
          <div className="mb-6 text-lg font-mono">
            {challenge.description}
          </div>

          {/* 代碼區塊 - 使用樣式模擬 Markdown 代碼塊 */}
          <div className="mb-6 relative">
            <div className="absolute top-0 left-0 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-t-md">python</div>
            <pre className="bg-gray-800 p-4 rounded-md text-white overflow-x-auto font-mono text-sm leading-loose mt-6">
              <code>{challenge.code}</code>
            </pre>
          </div>

          {/* 提示信息 */}
          <div className="mb-8 text-yellow-300 italic">
            {challenge.hint}
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
