// components/auth/LoginForm.jsx
'use client';
import React, { useState } from 'react';

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 500)); // giả lập API call
    onSubmit({ email, password });
    setLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          🔐 Đăng Nhập
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="loginEmail" className="mb-2 font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="loginEmail"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="loginPassword" className="mb-2 font-medium text-gray-700">Mật khẩu</label>
            <input
              type="password"
              id="loginPassword"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Chưa có tài khoản?{' '}
          <a href="/register" className="text-blue-600 font-medium hover:underline">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  );
}
