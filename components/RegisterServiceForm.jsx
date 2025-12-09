'use client';

import React, { useState } from 'react';

export default function ServiceRegistrationPage({ onNewData }) {
  const [urgency, setUrgency] = useState("emergency");
  const [district, setDistrict] = useState("");
  const [contactMethods, setContactMethods] = useState([]);
  const [volunteerTypes, setVolunteerTypes] = useState([]);
  const [volunteerArea, setVolunteerArea] = useState("");

  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  const handleContactChange = (e) => {
    const { value, checked } = e.target;
    setContactMethods(prev =>
      checked ? [...prev, value] : prev.filter(i => i !== value)
    );
  };

  const handleVolunteerTypeChange = (e) => {
    const { value, checked } = e.target;
    setVolunteerTypes(prev =>
      checked ? [...prev, value] : prev.filter(i => i !== value)
    );
  };

  // ----------------------------
  // SUBMIT FORM
  // ----------------------------
  const submitForm = (data) => {
    // Validate
    if (data.type === "help") {
      if (!description.trim()) return alert("Vui lòng nhập mô tả ngắn.");

      if (urgency === "emergency" && !phone.trim()) {
        return alert("Yêu cầu khẩn cấp cần số điện thoại!");
      }
    }

    if (data.type === "help") {
      const requests = JSON.parse(localStorage.getItem("hopeMapRequests") || "[]");
      localStorage.setItem("hopeMapRequests", JSON.stringify([...requests, data]));
    } else {
      const helpers = JSON.parse(localStorage.getItem("hopeMapHelpers") || "[]");
      localStorage.setItem("hopeMapHelpers", JSON.stringify([...helpers, data]));
    }

    if (onNewData) onNewData();
    alert("Gửi thành công!");
  };

  return (
    <section className="p-8 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">

        {/* ====================== LEFT - NEED HELP ====================== */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
            🙋‍♀️ Tôi Cần Hỗ Trợ
          </h2>

          {/* Urgency */}
          <div className="mb-6">
            <label className="font-medium text-gray-700 block mb-2">
              Mức độ cần hỗ trợ:
            </label>

            <div className="space-y-3">
              <label className={`flex items-center border rounded-xl p-4 cursor-pointer ${
                urgency === "emergency" ? "border-red-500 bg-red-50" : "hover:bg-gray-50"
              }`}>
                <input
                  type="radio"
                  name="urgency"
                  value="emergency"
                  checked={urgency === "emergency"}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="mr-3"
                />
                <p className="font-semibold text-red-600">🚨 Khẩn cấp</p>
              </label>

              <label className={`flex items-center border rounded-xl p-4 cursor-pointer ${
                urgency === "chat" ? "border-yellow-500 bg-yellow-50" : "hover:bg-gray-50"
              }`}>
                <input
                  type="radio"
                  name="urgency"
                  value="chat"
                  checked={urgency === "chat"}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="mr-3"
                />
                <p className="font-semibold text-yellow-600">💛 Cần trò chuyện</p>
              </label>
            </div>
          </div>

          {/* District */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Quận/Huyện:</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full p-3 rounded-xl border-gray-300 shadow-sm"
            >
              <option value="">Chọn quận/huyện</option>
              <option value="quan1">Quận 1</option>
              <option value="quan3">Quận 3</option>
              <option value="quan4">Quận 4</option>
              <option value="quan5">Quận 5</option>
              <option value="quan6">Quận 6</option>
              <option value="quan7">Quận 7</option>
              <option value="quan8">Quận 8</option>
              <option value="quan10">Quận 10</option>
              <option value="quan11">Quận 11</option>
              <option value="quan12">Quận 12</option>
              <option value="binhThanh">Bình Thạnh</option>
              <option value="goVap">Gò Vấp</option>
              <option value="tanBinh">Tân Bình</option>
              <option value="tanPhu">Tân Phú</option>
              <option value="phuNhuan">Phú Nhuận</option>
              <option value="thuDuc">Thủ Đức</option>
              <option value="binhTan">Bình Tân</option>
              <option value="nhaBe">Nhà Bè</option>
              <option value="binhChanh">Bình Chánh</option>
              <option value="cuChi">Củ Chi</option>
              <option value="hocMon">Hóc Môn</option>
              <option value="canGio">Cần Giờ</option>
              <option value="other">Khu vực khác</option>
              <option value="online">Hỗ trợ trực tuyến</option>
            </select>
          </div>

          {/* Contact Methods */}
          <div className="mb-6">
            <label className="font-medium text-gray-700 block mb-2">
              Phương thức liên hệ ưa thích:
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="chat" onChange={handleContactChange} />
              <span className="ml-2">Chat ẩn danh</span>
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="email" onChange={handleContactChange} />
              <span className="ml-2">Email tạm thời</span>
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="call" onChange={handleContactChange} />
              <span className="ml-2">Cuộc gọi (ẩn số)</span>
            </label>
          </div>

          {/* Short Description */}
          <div className="mb-6">
            <label className="font-medium text-gray-700 block mb-2">
              Mô tả ngắn:
            </label>
            <textarea
              className="w-full border rounded-xl p-3"
              rows={4}
              placeholder="Hãy mô tả vấn đề bạn đang gặp..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Phone (optional unless emergency) */}
          {urgency === "emergency" && (
            <div className="mb-6">
              <label className="font-medium text-red-600 block mb-2">
                Số điện thoại (bắt buộc với yêu cầu khẩn cấp):
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-xl"
                placeholder="Nhập số điện thoại..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={() =>
              submitForm({
                type: "help",
                urgency,
                district,
                contactMethods,
                description,
                phone,
                timestamp: Date.now(),
              })
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-lg"
          >
            💙 Gửi Yêu Cầu Hỗ Trợ
          </button>
        </div>

        {/* ====================== RIGHT - VOLUNTEER ====================== */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
            🤝 Tôi Muốn Giúp Đỡ
          </h2>

          {/* Volunteer types */}
          <div className="mb-6">
            <label className="text-gray-700 font-medium block mb-2">
              Loại hỗ trợ:
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="listening" onChange={handleVolunteerTypeChange} />
              <span className="ml-2">Lắng nghe</span>
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="counseling" onChange={handleVolunteerTypeChange} />
              <span className="ml-2">Tư vấn tâm lý</span>
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="emergency" onChange={handleVolunteerTypeChange} />
              <span className="ml-2">Hỗ trợ khẩn cấp</span>
            </label>

            <label className="flex items-center mb-1">
              <input type="checkbox" value="resource" onChange={handleVolunteerTypeChange} />
              <span className="ml-2">Kết nối nguồn lực</span>
            </label>
          </div>

          {/* Volunteer area */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-1">Khu vực hoạt động:</label>
            <select
              className="w-full p-3 rounded-xl border-gray-300"
              value={volunteerArea}
              onChange={(e) => setVolunteerArea(e.target.value)}
            >
              <option value="">Chọn quận/huyện</option>
              <option value="quan1">Quận 1</option>
              <option value="quan3">Quận 3</option>
              <option value="quan4">Quận 4</option>
              <option value="quan5">Quận 5</option>
              <option value="quan6">Quận 6</option>
              <option value="quan7">Quận 7</option>
              <option value="quan8">Quận 8</option>
              <option value="quan10">Quận 10</option>
              <option value="quan11">Quận 11</option>
              <option value="quan12">Quận 12</option>
              <option value="binhThanh">Bình Thạnh</option>
              <option value="goVap">Gò Vấp</option>
              <option value="tanBinh">Tân Bình</option>
              <option value="tanPhu">Tân Phú</option>
              <option value="phuNhuan">Phú Nhuận</option>
              <option value="thuDuc">Thủ Đức</option>
              <option value="binhTan">Bình Tân</option>
              <option value="nhaBe">Nhà Bè</option>
              <option value="binhChanh">Bình Chánh</option>
              <option value="cuChi">Củ Chi</option>
              <option value="hocMon">Hóc Môn</option>
              <option value="canGio">Cần Giờ</option>
            </select>
          </div>

          <button
            onClick={() =>
              submitForm({
                type: "volunteer",
                volunteerTypes,
                district: volunteerArea,
                timestamp: Date.now(),
              })
            }
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl shadow-xl"
          >
            💚 Đăng Ký Tình Nguyện Viên
          </button>
        </div>
      </div>
    </section>
  );
}
