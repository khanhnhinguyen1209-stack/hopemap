// components/map/MarkerModal.jsx
import React, { useState, useEffect } from 'react';

export default function MarkerModal({ isActive, markerType, onClose, onSubmit }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('Đánh dấu vị trí');

    useEffect(() => {
        const titles = {
            help: '🆘 Đánh dấu: Cần giúp đỡ',
            volunteer: '🌱 Đánh dấu: Tình nguyện viên',
            message: '💬 Đánh dấu: Nhắn tin hỗ trợ'
        };
        setTitle(titles[markerType] || 'Đánh dấu vị trí');
    }, [markerType]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ markerName: name, markerEmail: email, markerMessage: message });
        setName('');
        setEmail('');
        setMessage('');
    };

    if (!isActive) return null;

    return (
        <div className="modal active" id="markerModal">
            <div className="modal-content">
                <h3 id="modalTitle">{title}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group"><label htmlFor="markerName">Tên của bạn *</label> <input type="text" id="markerName" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                    <div className="form-group"><label htmlFor="markerEmail">Email</label> <input type="email" id="markerEmail" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                    <div className="form-group"><label htmlFor="markerMessage">Lời nhắn *</label> <textarea id="markerMessage" value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Chia sẻ điều bạn muốn nói..."></textarea></div>
                    <div className="modal-buttons">
                        <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button> 
                        <button type="submit" className="btn-primary">Tạo đánh dấu</button>
                    </div>
                </form>
            </div>
        </div>
    );
}