// app/api/chat/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function loadDatasetText() {
  try {
    const p = path.join(process.cwd(), "public", "qa_dataset.txt");
    return await fs.readFile(p, "utf8");
  } catch (err) {
    return "";
  }
}

function simpleMatchReply(userMessage, datasetText) {
  // datasetText contains "User: ...\nAssistant: ...\n..."
  // We'll try find a User: line that contains any keyword from userMessage
  const lines = datasetText.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.toLowerCase().startsWith("user:")) {
      const userExample = line.slice(5).trim().toLowerCase();
      // if any short token from userMessage is contained in example
      const tokens = userMessage.toLowerCase().split(/\s+/).filter(t => t.length > 2);
      for (const t of tokens) {
        if (userExample.includes(t)) {
          // find next Assistant line
          for (let j = i + 1; j < lines.length; j++) {
            if (lines[j].trim().toLowerCase().startsWith("assistant:")) {
              return lines[j].trim().slice(10).trim();
            }
          }
        }
      }
    }
  }
  // fallback generic supportive reply
  return "Mình lắng nghe bạn — bạn có thể kể rõ hơn điều đang khiến bạn buồn không?";
}

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message || !message.trim()) {
      return NextResponse.json({ reply: "Vui lòng nhập nội dung." });
    }

    const datasetText = await loadDatasetText();

    // Build system prompt (truncate dataset if too long)
    const promptDataset = datasetText ? datasetText.slice(0, 4000) : "";

    const systemPrompt = `
Bạn là "HopeAI" – trợ lý tâm lý của HopeMap. Trả lời nhẹ nhàng, ngắn gọn, đồng cảm, không đưa lời khuyên y tế.
Hãy bắt chước phong cách trong dataset sau:
${promptDataset}
`;

    // If OPENROUTER_API_KEY available, call OpenRouter (DeepSeek / Mistral free models)
    const key = process.env.OPENROUTER_API_KEY;
    if (key) {
      const body = {
        model: "mistralai/mistral-nemo", // free model; bạn có thể đổi nếu muốn
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 800
      };

      const res = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      // handle OpenRouter errors
      if (!res.ok) {
        const errMsg = data?.error?.message || JSON.stringify(data?.error || data);
        return NextResponse.json({ reply: `AI service lỗi: ${errMsg}` }, { status: 502 });
      }

      const reply = data?.choices?.[0]?.message?.content
        || data?.choices?.[0]?.message?.text
        || String(data);

      return NextResponse.json({ reply });
    }

    // Fallback: try to match dataset locally
    const fallback = simpleMatchReply(message, datasetText || "");
    return NextResponse.json({ reply: fallback });

  } catch (err) {
    console.error("API chat error:", err);
    return NextResponse.json({ reply: "Lỗi server: " + (err.message || String(err)) }, { status: 500 });
  }
}
