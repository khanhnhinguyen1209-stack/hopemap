'use client';
import React from 'react';
import { createRoot } from 'react-dom/client';

// Quản lý danh sách toast và root React 18
let toasts = [];
let root = null;
let toastContainer = null;

// Component hiển thị từng Toast
const ToastItem = ({ message, type, onClose }) => {
    // Style cơ bản cho Toast
    const baseStyle = {
        padding: '12px 24px',
        marginBottom: '10px',
        borderRadius: '8px',
        color: '#fff',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: '250px',
        animation: 'slideIn 0.3s ease-out',
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        fontSize: '14px',
    };

    const typeStyles = {
        success: { backgroundColor: '#10B981' }, // Xanh lá
        error: { backgroundColor: '#EF4444' },   // Đỏ
        info: { backgroundColor: '#3B82F6' },    // Xanh dương
        warning: { backgroundColor: '#F59E0B' }  // Vàng
    };

    return (
        <div style={{ ...baseStyle, ...(typeStyles[type] || typeStyles.success) }}>
            <span>{message}</span>
            <button 
                onClick={onClose}
                style={{ 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#fff', 
                    marginLeft: '15px', 
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold'
                }}
            >
                ×
            </button>
        </div>
    );
};

// Component chứa danh sách Toast
const ToastList = ({ items, removeToast }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            pointerEvents: 'none' // Để click xuyên qua vùng trống
        }}>
            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
            {items.map((t) => (
                <div key={t.id} style={{ pointerEvents: 'auto' }}>
                    <ToastItem 
                        message={t.message} 
                        type={t.type} 
                        onClose={() => removeToast(t.id)} 
                    />
                </div>
            ))}
        </div>
    );
};

// Hàm render chính sử dụng createRoot (React 18)
const render = () => {
    // Chỉ chạy trên client
    if (typeof window === 'undefined') return;

    // 1. Tạo container nếu chưa có
    if (!toastContainer) {
        toastContainer = document.getElementById('toast-container-root');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.id = 'toast-container-root';
            document.body.appendChild(toastContainer);
        }
    }

    // 2. Tạo root nếu chưa có (Singleton pattern)
    if (!root) {
        root = createRoot(toastContainer);
    }

    // 3. Render component vào root
    const removeToast = (id) => {
        toasts = toasts.filter(t => t.id !== id);
        render();
    };

    root.render(<ToastList items={toasts} removeToast={removeToast} />);
};

// Named Export để sử dụng: import { showToast } from ...
export const showToast = (message, type = 'success') => {
    // Đảm bảo mã chỉ chạy dưới client
    if (typeof window === 'undefined') return;

    const id = Date.now().toString();
    toasts = [...toasts, { id, message, type }];
    
    render();

    // Tự động xóa sau 3 giây
    setTimeout(() => {
        toasts = toasts.filter(t => t.id !== id);
        render();
    }, 3000);
};