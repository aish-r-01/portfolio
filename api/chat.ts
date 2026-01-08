import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question missing' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: question,
    });

    return res.status(200).json({
      answer: response.text ?? 'No response generated.',
    });
  } catch (err) {
    console.error('API ERROR:', err);

    // 🚨 IMPORTANT: ALWAYS return JSON
    return res.status(500).json({
      answer:
        'The intelligence layer is currently regenerating. Please try again shortly.',
    });
  }
}
