module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    // 關閉未使用變數的警告
    '@typescript-eslint/no-unused-vars': 'off',
    // 關閉未轉義實體的警告
    'react/no-unescaped-entities': 'off'
  }
};
