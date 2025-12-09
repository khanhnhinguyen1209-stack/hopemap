// app/(main)/mood/page.jsx
'use client';
import React from 'react';
import MoodTracker from '@/components/mood/MoodTracker';
import { defaultConfig } from '@/lib/constants';

export default function MoodPage() {
    return (
        <section id="mood-section" className="section active">
            <div className="card">
                <h2 id="moodTitle">{defaultConfig.mood_title}</h2>
                <p>Hôm nay bạn cảm thấy thế nào?</p>
                <MoodTracker />
            </div>
        </section>
    );
}