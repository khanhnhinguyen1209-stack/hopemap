'use client';

import { useState } from 'react';
import MoodStats from './MoodStats';
import { showToast } from '@/components/core/Toast';

const moodOptions = [
  { emoji: '😄', label: 'Rất vui', mood: 'very-happy' },
  { emoji: '🙂', label: 'Vui', mood: 'happy' },
  { emoji: '😐', label: 'Bình thường', mood: 'neutral' },
  { emoji: '😔', label: 'Buồn', mood: 'sad' },
  { emoji: '😢', label: 'Rất buồn', mood: 'very-sad' },
];

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleSaveMood = async () => {
    if (!selectedMood) {
      showToast('Vui lòng chọn tâm trạng', 'error');
      return;
    }
    setLoading(true);
    await new Promise(res => setTimeout(res, 500));

    const today = new Date().toISOString().slice(0, 10);
    const moods = JSON.parse(localStorage.getItem('moodStats') || '{}');

    if (!moods[today]) moods[today] = [];
    moods[today].push({ mood: selectedMood, timestamp: new Date().toISOString() });

    localStorage.setItem('moodStats', JSON.stringify(moods));
    showToast(`Đã lưu tâm trạng: ${selectedMood}`, 'success');

    setSelectedMood(null);
    setLoading(false);
    setRefresh(prev => !prev);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">📝 Theo Dõi Tâm Trạng Hôm Nay</h2>
      
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {moodOptions.map(option => (
          <button
            key={option.mood}
            className={`px-6 py-3 rounded-2xl border text-lg font-medium transition-colors ${
              selectedMood === option.mood ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-100'
            }`}
            onClick={() => setSelectedMood(option.mood)}
          >
            {option.emoji} <span className="ml-2">{option.label}</span>
          </button>
        ))}
      </div>

      <button
        onClick={handleSaveMood}
        disabled={loading || !selectedMood}
        className="w-full max-w-4xl py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 mb-8 text-lg font-semibold"
      >
        {loading ? 'Đang lưu...' : 'Lưu tâm trạng'}
      </button>

      {/* Biểu đồ */}
      <div className="w-full max-w-6xl h-[80vh]">
        <MoodStats refresh={refresh} />
      </div>
    </div>
  );
}
