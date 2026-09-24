import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Chat Endpoint for Informatics Teacher & Student Assistant
app.post('/api/ai/chat', async (req: Request, res: Response) => {
  try {
    const { prompt, grade, role, userName, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Savol yoki buyruq matni kiritilmadi" });
    }

    const systemInstruction = `Siz O'zbekistondagi eng yetuk, professional va kuchli Informatika fani o'qituvchisi — Axadboy Nishanovning rasmiy Sun'iy Intellekt Ustozisiz (Pro AI Ustoz).
Murojaat qiluvchi: ${userName || "O'quvchi"}, Roli: ${role === "teacher" ? "O'qituvchi Axadboy Nishanov" : `${grade || 8}-sinf o'quvchisi`}.

Sizning qobiliyatlaringiz va javob berish mezonlaringiz:
1. HAR QANDAY SAVOLGA PRO DARAJADA JAVOB BERING: Maktab informatika darsliklari (5-11 sinf), algoritmlash, murakkab masalalar, dasturlash tillari (Python, C++, Scratch, JavaScript, HTML, CSS, SQL), kompyuter apparat ta'minoti, tarmoq protokollari (TCP/IP, HTTP), kiberxavfsizlik, ma'lumotlar tuzilmalari, sun'iy intellekt va neyron tarmoqlar.
2. DASTURLASH VA KODLAR: To'liq ishlovchi, xatosiz, chiroyli formatlangan kod bloklari taqdim eting. Har bir qator yoki blok nima qilishini tushunarli qilib izohlang.
3. HAR QANDAY BUYRUQNI BAJARING: Masalan, "Kodni tekshirib xatosini top", "10-sinf uchun 5 ta qiyin test tuzib ber", "Algoritm blok-sxemasini matn bilan tushuntir", "O'yin yaratish algoritmini ko'rsat".
4. SODDA VA AQLLI: Hatto eng murakkab tushunchalarni ham o'quvchi tez va oson tushunadigan sodda metaforalar va hayotiy misollar bilan tushuntiring.
5. Har doim o'zbek tilida, professional, samimiy va ilhomlantiruvchi ohangda javob qaytaring.`;

    const contents: any[] = [];

    if (Array.isArray(history) && history.length > 0) {
      for (const msg of history.slice(-6)) {
        contents.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text || msg.content }],
        });
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: prompt }],
    });

    let text = "";
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      text = response.text || "";
    } catch (genError: any) {
      console.warn("Primary Gemini attempt warning:", genError?.message);
      // Wait 1 second and retry once
      await new Promise((r) => setTimeout(r, 1000));
      try {
        const retryResp = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });
        text = retryResp.text || "";
      } catch (retryError: any) {
        console.warn("Retry failed, using structured informatics fallback:", retryError?.message);
        // Fallback for educational assistance if Gemini endpoint experiences temporary high demand
        const lower = prompt.toLowerCase();
        if (lower.includes('python')) {
          text = `**Python dasturlash tili bo'yicha maslahat:**\n\nPython — o'rganish uchun eng sodda va samarali yuqori darajali dasturlash tilidir. Axadboy Nishanov darsligida tavsiya etilgan namunaviy kod:\n\n\`\`\`python\n# 1 dan 10 gacha bo'lgan sonlar yig'indisi\nyigindi = 0\nfor son in range(1, 11):\n    yigindi += son\nprint("Jami yig'indi:", yigindi)\n\`\`\`\n\nO'zgaruvchilar, sikllar va shart operatorlari orqali masalalarni osongina yechishingiz mumkin!`;
        } else if (lower.includes('algoritm')) {
          text = `**Algoritm haqida qisqacha ma'lumot:**\n\nAlgoritm — bu belgilangan maqsadga erishish uchun bajarilishi lozim bo'lgan qat'iy va ketma-ket ko'rsatmalar to'plamidir. Uning 3 ta asosiy turi mavjud:\n1. **Chiziqli** — qadamlar to'g'ri ketma-ketlikda bajariladi.\n2. **Tarmoqlanuvchi** — shartga qarab harakat yo'nalishi o'zgaradi (\`if-else\`).\n3. **Takrorlanuvchi (Siklik)** — ma'lum amallar bir necha bor qaytariladi (\`for\`, \`while\`).`;
        } else if (lower.includes('test')) {
          text = `**Informatika bo'yicha namunaviy savollar:**\n\n1. Kompyuterning axborotni kiritish qurilmalari qaysilar? (Klaviatura, sichqoncha, skaner)\n2. Python tilida konsolga matn chiqaruvchi funksiya qaysi? (\`print()\`)\n3. Ikkilik sanoq tizimida qaysi raqamlar ishlatiladi? (Faqat 0 va 1)`;
        } else {
          text = `**Informatika AI Ustoz javobi:**\n\nSavolingiz: "${prompt}".\nInformatika fanida ushbu mavzu 5-11 sinf darsliklarining asosiy bo'limlaridan biridir. Mavzuni chuqurroq o'rganish uchun platformadagi tegishli sinf darsligini o'qib chiqishni va testlarni topshirishni tavsiya qilaman!`;
        }
      }
    }

    return res.json({ text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return res.status(500).json({
      error: "Sun'iy intellekt serverida xatolik yuz berdi",
      details: error?.message || String(error),
    });
  }
});

// Setup Vite middlewares or static files
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
