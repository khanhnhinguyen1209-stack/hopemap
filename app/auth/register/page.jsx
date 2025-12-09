'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import RegisterForm from '@/components/auth/RegisterForm';
import { showToast } from '@/components/core/Toast';

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async ({ name, email, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      showToast('Mật khẩu xác nhận không khớp', 'error');
      return;
    }

    try {
      const res = await fetch('/auth/register/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast(`Đăng ký thành công cho ${name}!`, 'success');
        router.push('/auth/login'); // chuyển sang trang login sau khi đăng ký
      } else {
        showToast(`Lỗi: ${data.error}`, 'error');
      }
    } catch (err) {
      showToast(`Lỗi server: ${err.message}`, 'error');
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">📝 Đăng ký</h2>
        <RegisterForm onSubmit={handleRegister} />

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <p style={{ color: '#666', marginBottom: '10px' }}>Đã có tài khoản?</p>
          <button
            className="btn-login"
            onClick={() => router.push('/auth/login')}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
}
