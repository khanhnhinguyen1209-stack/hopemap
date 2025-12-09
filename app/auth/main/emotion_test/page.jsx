// app/(main)/emotion-test/page.jsx
'use client';
import React from 'react';
import EmotionTest from '@/components/mood/EmotionTest';
import { defaultConfig } from '@/lib/constants';

export default function EmotionTestPage() {
    return (
        <section id="stories-section" className="section active">
            <div className="card">
                <h2 id="storyTitle">{defaultConfig.story_title}</h2>
                <p>Đánh giá tình trạng cảm xúc và sức khỏe tâm thần của bạn</p>
                <EmotionTest />
            </div>
        </section>
    );
}