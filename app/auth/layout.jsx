// app/(main)/layout.jsx
'use client';
import Header from '@/components/core/Header';
import Navbar from '@/components/core/Navbar';
import Footer from '@/components/core/Footer';
import { useAuth } from '@/hooks/useAuth'; 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function MainLayout({ children }) {
    const { currentUser, loading, logout } = useAuth(); 
    const router = useRouter();

    useEffect(() => {
        // Chuyển hướng đến trang login nếu không có người dùng sau khi tải xong
        if (!loading && !currentUser) {
            router.push('/login');
        }
    }, [loading, currentUser, router]);

    const handleLogout = () => {
        logout();
        router.push('/login');
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