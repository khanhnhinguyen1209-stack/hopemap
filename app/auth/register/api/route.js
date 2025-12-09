// /app/auth/register/api/route.js
import { initDB } from "@/lib/initDB";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ success: false, message: "Thiếu thông tin bắt buộc" }), { status: 400 });
    }

    const db = await initDB();

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await db.get("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      await db.close();
      return new Response(JSON.stringify({ success: false, message: "Email đã được đăng ký" }), { status: 409 });
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm user mới
    await db.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    await db.close();

    return new Response(JSON.stringify({ success: true, message: "Đăng ký thành công" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
