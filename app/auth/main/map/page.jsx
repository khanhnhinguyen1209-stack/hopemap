// app/(main)/map/page.jsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import MapComponent from '@/components/map/MapComponent';
import { defaultConfig } from '@/lib/constants';

// Trang này chỉ là container, logic phức tạp nằm trong MapComponent
export default function MapPage() {
    return (
        <section id="map-section" className="section active">
            <div className="card">
                <h2 id="mapTitle">{defaultConfig.map_title}</h2>
                <p>Đánh dấu vị trí của bạn hoặc xem các điểm hỗ trợ xung quanh</p>
                {/* MapComponent chứa toàn bộ logic Leaflet, Buttons và Modal */}
                <MapComponent />
            </div>
        </section>
    );
}