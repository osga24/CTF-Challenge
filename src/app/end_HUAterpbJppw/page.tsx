// src/app/challenge/end_HUAterpbJppw/page.tsx
"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LetterGlitch from '../components/LetterGlitch';
import Confetti from 'react-confetti';

// 挑戰完成頁面
export default function ChallengeCompletePage() {
  const [typedText, setTypedText] = useState("");
  const [congratsVisible, setCongratsVisible] = useState(false);
  const [cakeVisible, setCakeVisible] = useState(false);
  const [certificateVisible, setCertificateVisible] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const confettiRef = useRef(null); // 添加這行解決未使用的 useRef 問題

  // 監聽視窗大小變化
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      });
    };

    // 初次設定
    handleResize();

    // 添加監聽器
    window.addEventListener('resize', handleResize);

    // 清理監聽器
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ASCII 蛋糕圖案（增強版）
  const asciiCake = `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢔⠊⠳⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣳⣶⠜⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⣟⣿⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⡿⣷⣯⢷⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⡶⠾⠛⠛⠻⢿⣿⣳⣯⣟⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⠟⠁⣀⠀⠀⠀⠀⠀⠀⠈⠉⠉⠉⠉⠻⢶⣄⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡰⡆⠀⠀⠀⠀⠀⠀⢿⣄⠀⠉⠀⠀⠀⠀⠀⠀⠀⠀⠛⠀⠀⠀⠀⠙⣧⡀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣧⡎⠀⠀⠀⠀⠀⠀⠀⠉⣿⠛⠷⠶⣦⣤⣤⣤⣤⣤⣤⣴⠾⠓⠀⠀⠘⣷⡀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣻⣇⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣷⠀⠀⠀
⠀⡰⣚⡉⠉⣉⡉⠉⣠⣁⣈⠬⡇⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⡇⠀⠀
⠀⢇⠀⠈⠉⠀⠈⠉⠀⠀⠀⣰⠃⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡄⠈⣿⠀⠀
⠐⠛⠛⠛⢻⣿⣿⣿⡿⠛⠛⠛⠛⠀⠀⢠⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⡇⠀⢹⡆⠀
⠀⠀⠀⠀⠀⠀⠀⠈⠻⣆⠀⠀⠀⠀⢠⡿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⠇⠀⠘⣧⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢷⣄⣀⣰⡟⠁⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⣿⡄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠉⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⢹⡇
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣏⠀⠀⠀⠘⣷
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⡿⠀⠀⠀⠀⣿
  `;

  // 打字機效果的文字
  const finalMessage = "恭喜你完成了所有的挑戰！你的毅力和技術能力令人印象深刻。這只是你資安旅程的起點，世界上還有更多謎題等待你解開。資訊安全是一場永無止境的探索，每一個漏洞、每一段代碼都蘊含著新的知識。希望這次的挑戰能夠點燃你對資安的熱情，無論是CTF競賽、滲透測試，還是系統防禦，都有你大展身手的舞台。持續學習，保持好奇，也許未來的某一天，我們能在資安的世界裡再次相遇。願你在這條充滿挑戰的道路上，不斷成長，不斷超越自己！";

  // 打字機效果和動畫序列
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 顯示動畫序列
      setTimeout(() => setCongratsVisible(true), 500);
      setTimeout(() => setCakeVisible(true), 1500);

      let i = 0;
      const typing = setInterval(() => {
        if (i < finalMessage.length) {
          setTypedText(finalMessage.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typing);
          setTimeout(() => setCertificateVisible(true), 500);
          setTimeout(() => setButtonVisible(true), 1000);
        }
      }, 50);

      return () => clearInterval(typing);
    }
  }, []);

  // 處理回到首頁
  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
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

      {/* 五彩紙屑效果 - 全螢幕覆蓋 */}
      <Confetti
        className="fixed z-50"
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={buttonVisible ? 500 : 0}
        recycle={false}
        run={buttonVisible}
        colors={['#4dc3a1', '#3498db', '#9b59b6', '#f1c40f', '#e74c3c']}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 50
        }}
      />

      {/* 內容區域 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center py-10 px-4">
        {/* 標題區域 */}
        <div
          className={`w-full max-w-4xl py-6 bg-gradient-to-r from-purple-900/70 via-blue-800/70 to-purple-900/70 text-center mb-8 rounded-xl transform transition-all duration-1000 ${
            congratsVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-100 to-yellow-300 animate-pulse">
            挑戰完成！
          </h1>
        </div>

        {/* 內容區域 */}
        <div className="w-full max-w-4xl bg-gradient-to-b from-gray-900/90 to-black/90 rounded-2xl shadow-[0_0_15px_rgba(138,43,226,0.5)] backdrop-blur-sm overflow-hidden">
          {/* ASCII蛋糕 */}
          <div
            className={`py-8 flex justify-center transform transition-all duration-1000 ${
              cakeVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <pre className="text-center text-green-400 font-mono text-sm sm:text-base whitespace-pre">
              {asciiCake}
            </pre>
          </div>

          {/* 打字機效果訊息 */}
          <div className="px-6 sm:px-12 py-6 text-center">
            <p className="text-lg sm:text-xl text-cyan-100 leading-relaxed font-mono relative">
              <span className="relative z-10">{typedText}</span>
              <span className={`h-5 w-2 bg-cyan-400 inline-block ml-1 animate-blink ${typedText.length === finalMessage.length ? 'opacity-0' : 'opacity-100'}`}></span>
            </p>
          </div>

          {/* 證書區域 */}
          <div
            className={`m-8 p-8 border-4 border-double border-yellow-500/70 rounded-lg bg-black/70 transform transition-all duration-1000 relative overflow-hidden ${
              certificateVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {/* 裝飾性元素 */}
            <div className="absolute -top-16 -left-16 w-32 h-32 border-r-4 border-b-4 border-yellow-500/30 rounded-br-full"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 border-l-4 border-t-4 border-yellow-500/30 rounded-tl-full"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-center text-yellow-300 mb-6 font-serif">榮譽證書</h3>
              <div className="text-center space-y-4">
                <p className="text-lg">授予 <span className="text-yellow-200 font-semibold">勇敢的挑戰者</span></p>
                <p>成功完成 <span className="text-yellow-200 font-semibold">OhYeahSeC CTF Challenge</span> 的所有關卡</p>
                <p>完成時間：<span className="text-yellow-200 font-semibold">{new Date().toLocaleDateString()}</span></p>
                <div className="pt-4 border-t border-yellow-500/30 mt-4">
                  <p className="italic text-yellow-100/70">知識是防禦的第一道防線，好奇心是進步的原動力</p>
                </div>
              </div>
            </div>
          </div>

          {/* 返回按鈕 */}
          <div
            className={`flex justify-center pb-10 transform transition-all duration-1000 ${
              buttonVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <button
              onClick={handleGoHome}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-lg font-bold rounded-full hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_15px_rgba(138,43,226,0.7)]"
            >
              返回首頁
            </button>
          </div>
        </div>
      </div>

      {/* 底部信息 */}
      <div className="relative text-center text-white/50 pb-6">
        © 2025 OhYeahSeC Challenge
      </div>
    </div>
  );
}
