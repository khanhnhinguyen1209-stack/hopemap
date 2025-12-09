'use client';
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { showToast } from "@/components/core/Toast";

import RegisterServiceForm from "@/components/RegisterServiceForm";
import ChatSystem from "@/components/chat/ChatSystem";
import MoodTracker from "@/components/mood/MoodTracker";
import EmotionTest from "@/components/mood/EmotionTest";
import MarkerModal from "@/components/map/MarkerModal";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

// Dynamic map
const MapComponent = dynamic(() => import("@/components/map/MapComponent"), { ssr: false });

export default function MapDashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // login | register
  const [activeTab, setActiveTab] = useState("map");
  const [modalOpen, setModalOpen] = useState(false);
  const [tempLatLng, setTempLatLng] = useState(null);
  const [markerType, setMarkerType] = useState("help");
  const [markers, setMarkers] = useState([]);

  // Kiểm tra token khi load trang
  useEffect(() => {
    const token = localStorage.getItem("hopeMapToken");
    if (token) setIsLoggedIn(true);
  }, []);

  // ------------------ MAP ------------------
  const handleMapClick = (latlng, type) => {
    setMarkerType(type);
    setTempLatLng(latlng);
    setModalOpen(true);
  };

  const handleCreateMarker = (data) => {
    if (!tempLatLng) return;
    const newMarker = {
      ...data,
      type: markerType,
      lat: tempLatLng.lat,
      lng: tempLatLng.lng,
      timestamp: new Date().toISOString(),
      status: "active",
    };
    setMarkers(prev => [...prev, newMarker]);
    setModalOpen(false);
    showToast("Đã tạo đánh dấu!", "success");
  };

  const handleRegisterFromForm = (data) => {
    const newMarker = {
      id: Date.now().toString(),
      ...data,
      timestamp: new Date().toISOString(),
      status: "active",
    };
    setMarkers(prev => [...prev, newMarker]);
    showToast("Đã tạo điểm đánh dấu trên bản đồ!", "success");
  };

  // ------------------ LOGIN / REGISTER ------------------
  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch("/auth/login/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("hopeMapToken", data.token);
        setIsLoggedIn(true);
        showToast("Đăng nhập thành công!", "success");
      } else {
        showToast(data.message || "Đăng nhập thất bại", "error");
      }
    } catch (err) {
      showToast("Lỗi server", "error");
    }
  };

  const handleRegister = async ({ name, email, password, passwordConfirm }) => {
    if (password !== passwordConfirm) {
      showToast("Mật khẩu xác nhận không khớp", "error");
      return;
    }
    try {
      const res = await fetch("/auth/register/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        showToast("Đăng ký thành công! Vui lòng đăng nhập", "success");
        setAuthTab("login");
      } else {
        showToast(data.message || "Đăng ký thất bại", "error");
      }
    } catch (err) {
      showToast("Lỗi server", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("hopeMapToken");
    setIsLoggedIn(false);
    showToast("Đã đăng xuất", "success");
  };

  // ------------------ TAB ------------------
  const ActiveComponent = useMemo(() => {
    switch (activeTab) {
      case "map": return <MapComponent markers={markers} onMapClick={handleMapClick} />;
      case "register": return <RegisterServiceForm onSubmitMarker={handleRegisterFromForm} />;
      case "mood": return <MoodTracker />;
      case "chat": return <ChatSystem />;
      case "test": return <EmotionTest />;
      default: return null;
    }
  }, [activeTab, markers]);

  // ------------------ UI ------------------
  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-blue-50 p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-xl ${authTab === "login" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              onClick={() => setAuthTab("login")}>Đăng nhập</button>
            <button
              className={`px-4 py-2 rounded-xl ${authTab === "register" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
              onClick={() => setAuthTab("register")}>Đăng ký</button>
          </div>

          {authTab === "login" ? (
            <LoginForm onSubmit={handleLogin} />
          ) : (
            <RegisterForm onSubmit={handleRegister} />
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto p-4">
        {/* NAV TABS */}
        <div className="flex justify-between items-center mb-4">
          <div className="bg-white p-4 rounded-xl shadow-sm flex gap-2 flex-wrap">
            <button onClick={() => setActiveTab("map")} className={`nav-btn ${activeTab === "map" ? "active" : ""}`}>🗺️ Bản Đồ</button>
            <button onClick={() => setActiveTab("register")} className={`nav-btn ${activeTab === "register" ? "active" : ""}`}>📝 Đăng Ký</button>
            <button onClick={() => setActiveTab("mood")} className={`nav-btn ${activeTab === "mood" ? "active" : ""}`}>😊 Tâm Trạng</button>
            <button onClick={() => setActiveTab("chat")} className={`nav-btn ${activeTab === "chat" ? "active" : ""}`}>💬 Trò Chuyện</button>
            <button onClick={() => setActiveTab("test")} className={`nav-btn ${activeTab === "test" ? "active" : ""}`}>🧠 Test tâm trạng</button>
          </div>
          <button onClick={handleLogout} className="btn-logout bg-red-500 text-white px-4 py-2 rounded-xl shadow">
            Đăng xuất
          </button>
        </div>

        <div className="card">{ActiveComponent}</div>
      </div>

      {/* Marker Modal */}
      <MarkerModal
        isActive={modalOpen}
        markerType={markerType}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateMarker}
      />
    </>
  );
}
