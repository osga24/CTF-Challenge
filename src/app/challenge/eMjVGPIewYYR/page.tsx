// src/app/challenge/6/page.tsx
"use client";

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../../components/LetterGlitch';

// 第六關挑戰頁面
export default function Challenge6Page() {
  const level = 6;
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [downloadClicked, setDownloadClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // 題目內容
  const challenge = {
    title: "眾裡尋他",
    description: "系統日誌中充滿了大量的資訊，但其中隱藏著重要的機密。下載這份日誌文件，並在大量的資訊中找到隱藏的FLAG。",
    flag: "OYSC{F1L3_S34RCH_M4ST3R}", // 請確保這與你log.txt文件中的FLAG一致
    hint: "提示：仔細查看每一行，FLAG可能藏在不起眼的地方"
  };

  // 自動聚焦輸入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 處理檔案下載
  const handleDownload = () => {
    // 直接使用public目錄中的文件
    const fileUrl = '/log.txt';

    // 創建一個臨時的a標籤用於下載
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'log.txt';

    // 模擬點擊
    document.body.appendChild(link);
    link.click();

    // 清理
    setTimeout(() => {
      document.body.removeChild(link);
      setDownloadClicked(true);
    }, 100);
  };

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
        router.push('/challenge/BbbkammfHZID');
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
          <div className="mb-6 text-lg font-mono">
            {challenge.description}
          </div>

          {/* 終端界面模擬 */}
          <div className="mb-8 bg-black border border-green-500/50 rounded-md p-4 font-mono text-green-400 text-sm">
            <div className="flex items-center mb-2">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-400 text-xs">terminal@oysc-server</span>
            </div>
            <div className="mb-1">root@oysc-server:~# ls -la</div>
            <div className="mb-1">total 28</div>
            <div className="mb-1">drwxr-xr-x 2 root root 4096 Feb 26 01:23 .</div>
            <div className="mb-1">drwxr-xr-x 6 root root 4096 Feb 26 01:22 ..</div>
            <div className="mb-1">-rw-r--r-- 1 root root  220 Feb 26 01:22 .bash_logout</div>
            <div className="mb-1">-rw-r--r-- 1 root root 3526 Feb 26 01:22 .bashrc</div>
            <div className="mb-1">-rw-r--r-- 1 root root  807 Feb 26 01:22 .profile</div>
            <div className="mb-1 text-yellow-300">-rw-r--r-- 1 root root 12576 Feb 26 01:23 log.txt</div>
            <div className="mb-3">-rw-r--r-- 1 root root 8192 Feb 26 01:23 system.db</div>
            <div className="mb-1">root@oysc-server:~# cat log.txt | wc -l</div>
            <div className="mb-1">247</div>
            <div className="mb-1">root@oysc-server:~# head -n 3 log.txt</div>
            <div className="mb-1">====== 系統日誌 - OhYeahSeC 安全伺服器 ======</div>
            <div className="mb-1">生成時間: 2025-02-26 01:23:45</div>
            <div className="mb-1">安全等級: 最高機密</div>
            <div className="mb-1">root@oysc-server:~# _</div>
            <div className="animate-pulse inline-block h-4 w-2 bg-green-400"></div>
          </div>

          {/* 下載按鈕 */}
          <div className="mb-8 flex justify-center">
            <button
              onClick={handleDownload}
              className={`px-6 py-3 flex items-center space-x-2 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg ${
                downloadClicked
                  ? 'bg-green-700 text-white'
                  : 'bg-gradient-to-r from-green-600 to-teal-500 text-white hover:from-green-700 hover:to-teal-600'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              <span>{downloadClicked ? '已下載 log.txt' : '下載 log.txt'}</span>
            </button>
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
