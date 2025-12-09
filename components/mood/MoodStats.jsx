'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList, Cell } from 'recharts';

const moodLabels = {
  'very-happy': 'Rất vui',
  'happy': 'Vui',
  'neutral': 'Bình thường',
  'sad': 'Buồn',
  'very-sad': 'Rất buồn',
};

const moodColors = {
  'very-happy': '#FACC15', // vàng
  'happy': '#34D399', // xanh lá
  'neutral': '#9CA3AF', // xám
  'sad': '#60A5FA', // xanh dương
  'very-sad': '#F87171', // đỏ nhạt
};

export default function MoodStats({ refresh }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const moods = JSON.parse(localStorage.getItem('moodStats') || '{}');
    const todayMoods = moods[today] || [];

    const count = todayMoods.reduce((acc, item) => {
      acc[item.mood] = (acc[item.mood] || 0) + 1;
      return acc;
    }, {});

    const chartData = Object.keys(moodLabels).map(mood => ({
      mood,
      label: moodLabels[mood],
      count: count[mood] || 0,
      fill: moodColors[mood],
    }));

    setData(chartData);
  }, [refresh]);

  return (
    <div className="mt-6 p-4 bg-white rounded-xl shadow">
      <h3 className="text-lg font-bold mb-4 text-center">📊 Thống kê tâm trạng hôm nay</h3>

      {data.every(d => d.count === 0) ? (
        <p className="text-center text-gray-500">Chưa có dữ liệu hôm nay</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <XAxis type="number" allowDecimals={false} />
            <YAxis dataKey="label" type="category" width={100} />
            <Tooltip formatter={(value) => [`${value}`, 'Số người']} />
            <Bar dataKey="count">
              <LabelList dataKey="count" position="right" />
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
