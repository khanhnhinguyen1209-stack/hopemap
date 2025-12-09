// hooks/useDataSdk.js
'use client';
import { useState, useEffect, useCallback } from 'react';

// State markers giả lập toàn cục (Singleton state)
// Khởi tạo một số marker mẫu
let globalMarkers = [
    { id: '1', type: 'volunteer', lat: 10.8231, lng: 106.6297, userName: 'Tình Nguyện Sài Gòn', message: 'Hỗ trợ trò chuyện tâm lý', timestamp: new Date().toISOString(), status: 'active' },
    { id: '2', type: 'help', lat: 10.7626, lng: 106.6601, userName: 'Người Cần Giúp Đỡ', message: 'Cần một người lắng nghe', timestamp: new Date().toISOString(), status: 'active' },
]; 
let listeners = [];

const notifyListeners = () => {
    listeners.forEach(listener => listener([...globalMarkers]));
};

export function useDataSdk() {
    const [data, setData] = useState(globalMarkers);

    useEffect(() => {
        // Đăng ký listener khi component mount
        const listener = (newData) => setData(newData);
        listeners.push(listener);
        
        // Cleanup: Hủy đăng ký listener khi component unmount
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    }, []);

    const create = useCallback(async (newItem) => {
        // Giả lập logic Data SDK create
        await new Promise(resolve => setTimeout(resolve, 500)); 
        
        if (globalMarkers.length >= 999) {
            return { isOk: false, error: 'Đã đạt giới hạn 999 đánh dấu.' };
        }

        globalMarkers.push(newItem);
        notifyListeners();
        return { isOk: true };
    }, []);

    // Trong một ứng dụng thực, bạn sẽ cần các hàm khác như update, remove, fetch.

    return { 
        data, 
        create
    };
}