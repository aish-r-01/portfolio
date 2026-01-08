import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';
import { profile } from '../data';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const SYSTEM_INSTRUCTION = `
You are Aishwarya R's Research & Career Twin.

Tone: professional, concise, confident.
Use "I" when referring to Aishwarya.
Mention email ${profile.email} when relevant.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { question } = req.body;

    const response = await ai.models.generateContent({
      model: 'gemini-1.5-pro',
      contents: question,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.status(200).json({
      answer: response.text,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      answer:
        'The intelligence layer is regenerating. Please try again shortly.',
    });
  }
}
