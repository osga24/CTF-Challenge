import React, { useState, useEffect } from 'react';

const CharBlurText = ({ text, className = "", charClassName = "", animationDelay = 0 }) => {
  const [clearChars, setClearChars] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 初始状态：所有字符都是模糊的，组件不可见
    setClearChars(Array(text.length).fill(false));

    // 先让组件从下往上出现
    const timer1 = setTimeout(() => {
      setVisible(true);
    }, animationDelay);

    // 依次使每个字符变清晰
    const revealChars = async () => {
      // 等待组件出现动画完成后再开始字符清晰化
      await new Promise(resolve => setTimeout(resolve, animationDelay + 600));

      // 然后逐个字符变清晰
      for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => {
          setTimeout(() => {
            setClearChars(prev => {
              const newStates = [...prev];
              newStates[i] = true;
              return newStates;
            });
            resolve();
          }, 150 + Math.random() * 250); // 每个字符有略微随机的变清晰时间
        });
      }
    };

    revealChars();

    // 清理函数（在组件卸载时）
    return () => {
      clearTimeout(timer1);
    };
  }, [text, animationDelay]);

  return (
    <div
      className={`${className} transition-all duration-700 transform`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)'
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-700 ${clearChars[index] ? 'blur-none' : 'blur-md'} ${charClassName}`}
          style={{
            opacity: clearChars[index] ? 1 : 0.6,
            textShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
            whiteSpace: 'pre'  // 确保空格被保留并显示
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default CharBlurText;
