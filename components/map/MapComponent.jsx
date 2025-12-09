"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const districtCoordinates = {
  'quan1': [10.7756, 106.7019],
  'quan3': [10.7821, 106.6862],
  'quan4': [10.7649, 106.7050],
  'quan5': [10.7543, 106.6664],
  'quan6': [10.7464, 106.6492],
  'quan7': [10.7314, 106.7243],
  'quan8': [10.7243, 106.6286],
  'quan10': [10.7679, 106.6664],
  'quan11': [10.7639, 106.6433],
  'quan12': [10.8633, 106.6544],
  'binhThanh': [10.8011, 106.6981],
  'goVap': [10.8387, 106.6653],
  'tanBinh': [10.7972, 106.6453],
  'tanPhu': [10.7905, 106.6281],
  'phuNhuan': [10.7992, 106.6753],
  'thuDuc': [10.8497, 106.7717],
  'binhTan': [10.7656, 106.6033],
  'nhaBe': [10.6967, 106.7967],
  'binhChanh': [10.7200, 106.5667],
  'cuChi': [10.9733, 106.4933],
  'hocMon': [10.8794, 106.5953],
  'canGio': [10.4147, 106.9667],
  'other': [10.8231, 106.6297],
  'online': [10.8231, 106.6297]
};

export default function MapComponent({ refresh }) {
  const mapRef = useRef(null);
  const markerLayerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("main-map").setView([10.8231, 106.6297], 12);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);

      markerLayerRef.current = L.layerGroup().addTo(mapRef.current);
    }

    loadMarkers();
  }, [refresh]);

  const loadMarkers = () => {
    if (!markerLayerRef.current) return;

    markerLayerRef.current.clearLayers();

    const helpers = JSON.parse(localStorage.getItem("hopeMapHelpers") || "[]");
    const requests = JSON.parse(localStorage.getItem("hopeMapRequests") || "[]");

    helpers.forEach(h => addMarker(h, "helper"));
    requests.forEach(r => addMarker(r, "request"));
  };

  const addMarker = (data, type) => {
    let [lat, lng] =
      data.district && districtCoordinates[data.district]
        ? districtCoordinates[data.district]
        : [10.75 + Math.random() * 0.15, 106.60 + Math.random() * 0.15];

    const color =
      type === "helper" ? "green" : data.urgency === "emergency" ? "red" : "yellow";

    L.circleMarker([lat, lng], {
      color,
      fillColor: color,
      fillOpacity: 0.9,
      radius: 10,
    })
      .addTo(markerLayerRef.current)
      .bindPopup(`
        <div>
          <b>${type === "helper" ? "Tình nguyện viên" : "Yêu cầu hỗ trợ"}</b><br>
          Khu vực: ${data.district || data.area || "TP.HCM"}<br>
          <small>${data.description || data.support_type || ""}</small>
        </div>
      `);
  };

  return (
    <section id="map-section" className="section-content">
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🌍 Bản Đồ Cộng Đồng Hỗ Trợ
        </h2>

        {/* Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center justify-center p-4 bg-red-50 rounded-xl">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
            <span className="font-medium text-red-700">Cần hỗ trợ khẩn cấp</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-yellow-50 rounded-xl">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
            <span className="font-medium text-yellow-700">Cần trò chuyện</span>
          </div>
          <div className="flex items-center justify-center p-4 bg-green-50 rounded-xl">
            <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
            <span className="font-medium text-green-700">Tình nguyện viên</span>
          </div>
        </div>

        <div id="main-map" className="w-full h-[500px] rounded-lg shadow border"></div>
      </div>
    </section>
  );
}
