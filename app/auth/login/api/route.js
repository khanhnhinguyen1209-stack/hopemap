import { initDB } from "@/lib/initDB";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const db = await initDB();

    const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

    if (!user) {
      await db.close();
      return new Response(JSON.stringify({ success: false, message: "Email không tồn tại" }), { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      await db.close();
      return new Response(JSON.stringify({ success: false, message: "Mật khẩu không đúng" }), { status: 400 });
    }

    const token = generateToken(user);

    await db.close();
    return new Response(JSON.stringify({ success: true, token, user: { id: user.id, name: user.name, email: user.email } }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, message: err.message }), { status: 500 });
  }
}
