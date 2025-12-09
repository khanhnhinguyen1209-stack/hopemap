// app/(main)/chat/page.jsx
'use client';
import React from 'react';
import ChatSystem from '@/components/chat/ChatSystem';
import { defaultConfig } from '@/lib/constants';

export default function ChatPage() {
    return (
        <section id="chat-section" className="section active">
            <div className="card">
                <h2 id="chatTitle">{defaultConfig.chat_title}</h2>
                <p>Đừng ngần ngại chia sẻ, chúng tôi luôn sẵn sàng lắng nghe bạn</p>
                <ChatSystem />
            </div>
        </section>
    );
}