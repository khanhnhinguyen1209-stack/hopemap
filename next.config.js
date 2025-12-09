// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Chỉ rõ thư mục gốc là thư mục hiện tại ('./')
  // hoặc tên thư mục dự án (ví dụ: 'my-hope-map')
  turbopack: {
    root: './', 
  },
  // ... cấu hình khác
};
module.exports = nextConfig;