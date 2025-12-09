// app/(main)/layout.jsx
'use client';
import Header from '@/components/core/Header';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import { useAuth } from '@/hooks/useAuth'; // <-- ĐÃ SỬA: BỎ COMMENT
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MainLayout({ children }) {
    const { currentUser, loading, logout } = useAuth(); // <-- ĐÃ SỬA: BỎ COMMENT
    const router = useRouter();

    useEffect(() => {
        // Chuyển hướng đến trang login nếu không có người dùng sau khi tải xong
        if (!loading && !currentUser) {
            router.replace('/auth/login'); // Dùng replace để không thêm vào lịch sử
        }
    }, [loading, currentUser, router]);

    const handleLogout = () => {
        logout();
        router.replace('/auth/login');
    };

    if (loading || !currentUser) {
        return <div className="login-screen">Đang tải...</div>;
    }

    return (
        <div className="app-wrapper">
            <Header onLogout={handleLogout} />
            <Navbar />
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
}