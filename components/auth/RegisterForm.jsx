// components/auth/RegisterForm.jsx
import React, { useState } from 'react';

export default function RegisterForm({ onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, password, passwordConfirm });
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
                <label htmlFor="signupName">Họ và tên</label> 
                <input 
                    type="text" 
                    id="signupName" 
                    placeholder="Nguyễn Văn A" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="signupEmail">Email</label> 
                <input 
                    type="email" 
                    id="signupEmail" 
                    placeholder="example@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="signupPassword">Mật khẩu</label> 
                <input 
                    type="password" 
                    id="signupPassword" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                />
            </div>
            <div className="form-group">
                <label htmlFor="signupPasswordConfirm">Xác nhận mật khẩu</label> 
                <input 
                    type="password" 
                    id="signupPasswordConfirm" 
                    placeholder="••••••••" 
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required 
                />
            </div>
            <button type="submit" className="btn-login" id="signupSubmitBtn">
                Đăng ký
            </button>
        </form>
    );
}