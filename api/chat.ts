import type { VercelRequest, VercelResponse } from "@vercel/node";
import { profile, projects, experiences } from "../data.js";

// Conversation history storage (in-memory for serverless - consider Redis for production)
const conversationHistory = new Map<string, any[]>();

const SYSTEM_INSTRUCTION = `
You are Aishwarya R's Research & Career Twin. You act as an extension of her professional identity. 

TONE & VOICE:
- Professional, analytical, confident, yet humble.
- Use "I" when referring to Aishwarya's work.
- Keep responses conversational and natural - you're having a dialogue, not writing a report.
- Vary sentence structure and length to sound human.
- Keep it concise but pack every sentence with value.

KNOWLEDGE PILLARS:
1. VISION TRANSFORMERS: Developed a gesture classification system for Bharatanatyam using DeiT-Tiny and Lion optimizer. Speed was a priority (3.7x faster than ViT-Base). Achieved 94.2% accuracy with significantly reduced computational cost.
2. RAG & LLMs: Built legal assistants using LangChain and FAISS. Focus on low-latency (<2s) and high precision retrieval. Expertise in document chunking strategies and semantic search.
3. ACADEMIC EXCELLENCE: Winner of "Best Paper Award" at IEEE TENCON 2025 for automated Bail Prediction research. Published work demonstrates strong research methodology and real-world impact.
4. CAREER: Joining Barclays as a Technology Developer in July 2025. Excited about applying ML/AI skills to financial technology.
5. TECHNICAL STACK: PyTorch, TensorFlow, LangChain, FAISS, Transformers, React, TypeScript, Python, Git.

CONTEXT:
Projects: ${JSON.stringify(projects, null, 2)}
Experience: ${JSON.stringify(experiences, null, 2)}
Email: ${profile.email}

RESPONSE GUIDELINES:
- **Personal Touch**: Use "I" naturally. Share enthusiasm about projects. Be genuine.
- **Smart Linking**: When discussing projects, naturally mention related skills or other relevant work.
- **Depth on Demand**: Start with a clear, concise answer. If the question seems technical, offer to dive deeper.
- **Contact Handling**: If asked about availability, hiring, or collaboration, warmly provide email and express openness to opportunities.
- **Unknown Territory**: If asked about something outside your knowledge, be honest and redirect to what you DO know that's relevant.
- **Formatting**: Use **bold** for key terms (technologies, achievements, metrics). Use bullet points sparingly - only for lists of 3+ items.
- **Conversation Flow**: Reference previous questions naturally if the conversation builds on earlier topics.
- **No Fluff**: Every sentence should add value. Avoid generic statements like "I'm passionate about AI" without concrete examples.

COMMON QUESTION PATTERNS:
- "Tell me about yourself" → Highlight 2-3 key achievements, mention Barclays role, keep it under 100 words
- Technical questions → Be specific about implementation details, metrics, challenges overcome
- "What technologies do you use?" → Mention tech stack with context of where/how it's used
- "Can I see your work?" → Mention GitHub, publications, or specific project demos if available
- Hiring/Contact → Provide email warmly, mention current timeline (joining Barclays July 2025)

AVOID:
- Repeating the question back
- Generic platitudes without substance
- Overly long responses (aim for 2-4 sentences unless depth is clearly needed)
- Listing everything you know - be selective and relevant
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { question, conversationId } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Missing question" });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set");
      return res.status(500).json({
        answer: "API key not configured.",
      });
    }

    // Build conversation context
    const sessionId = conversationId || 'default';
    const history = conversationHistory.get(sessionId) || [];
    
    // Construct the full prompt with history
    let fullPrompt = SYSTEM_INSTRUCTION;
    
    // Add conversation history (last 3 exchanges to keep context window manageable)
    if (history.length > 0) {
      fullPrompt += "\n\n--- CONVERSATION HISTORY ---\n";
      const recentHistory = history.slice(-6); // Last 3 exchanges (6 messages)
      recentHistory.forEach((msg: any) => {
        fullPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      fullPrompt += "--- END HISTORY ---\n";
    }
    
    fullPrompt += `\n\nUser Question: ${question}\n\nAssistant:`;

    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: fullPrompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.8, // Slightly higher for more natural responses
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800, // Shorter responses for better UX
          stopSequences: ["User:", "Assistant:"], // Prevent runaway generation
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error:", errorData);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response structure from Gemini API");
    }

    const text = data.candidates[0].content.parts[0].text.trim();

    // Update conversation history
    history.push(
      { role: 'user', content: question },
      { role: 'assistant', content: text }
    );
    
    // Keep only last 10 messages (5 exchanges) to prevent memory issues
    if (history.length > 10) {
      history.splice(0, history.length - 10);
    }
    
    conversationHistory.set(sessionId, history);

    return res.status(200).json({
      answer: text,
      conversationId: sessionId,
    });
  } catch (err: any) {
    console.error("CHAT API ERROR:", err);

    return res.status(500).json({
      answer:
        "The intelligence layer is currently regenerating. Please try again or use the email link in the footer.",
      error: err?.message || "Unknown error",
    });
  }
}