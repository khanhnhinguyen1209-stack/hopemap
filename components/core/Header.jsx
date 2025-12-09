// components/core/Header.jsx
'use client';
import { useRouter } from 'next/navigation';

export default function Header({ onLogout }) {
  // Thay thế logic onLogout nếu bạn đã bỏ useAuth
  const router = useRouter(); 
  const handleAuthClick = () => {
    // Nếu app là public, nút này có thể là nút Đăng nhập/Đăng ký
    router.push('/auth/login'); 
  }

  return (
    <header className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto p-6 md:p-8 flex justify-between items-center">
        
        {/* Logo và Slogan */}
        <div className="text-center w-full">
          <h1 className="text-4xl font-extrabold tracking-tight">
            🗺️ Hope Map
          </h1>
          <p className="text-sm italic mt-1 opacity-90">
            "Khi bạn cảm thấy lạc lõng, hãy biết rằng vẫn có ánh sáng ở gần bạn — Hope Map sẽ dẫn đường."
          </p>
        </div>

        {/* Nút Đăng nhập/Đăng xuất (Nếu cần) */}
        {/*
        <button 
          onClick={onLogout || handleAuthClick} 
          className="ml-4 px-4 py-2 text-sm bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition duration-150"
        >
          {onLogout ? 'Đăng xuất' : 'Đăng nhập'}
        </button>
        */}
      </div>
    </header>
  );
}