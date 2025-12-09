// components/core/AppFooter.jsx
import React from 'react';
import { defaultConfig } from '@/lib/constants';

export default function Footer() {
    return (
        <footer className="footer">
            <h3>{defaultConfig.app_title}</h3>
            <p id="footerTagline">{defaultConfig.footer_tagline}</p>
            <div className="footer-small">
                <p>© 2025 Hope Map. Được tạo ra với ❤️ để hỗ trợ cộng đồng sức khỏe tâm thần.</p>
                <p>Đây không phải dịch vụ y tế chuyên nghiệp. Trong trường hợp khẩn cấp, vui lòng liên hệ 115.</p>
            </div>
        </footer>
    );
}