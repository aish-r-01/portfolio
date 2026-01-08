
import React, { useState, useRef, useEffect } from 'react';
import { profile } from '../../data';
import { Bot, User, Sparkles, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: `Hello! I am ${profile.name}'s digital twin. I'm trained on my research papers, project repositories, and technical background. \n\nYou can ask me about:\n- **Vision Transformers** for dance classification\n- My **Best Paper Award** at IEEE TENCON\n- My upcoming role at **Barclays**\n- Technical expertise in **PyTorch** and **RAG** systems.` 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

const data = await res.json();
const response = data.reply;

    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const formatContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      const formattedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<span class="text-zinc-950 font-black">$1</span>')
        .replace(/^\* (.*)/g, '<li class="ml-4 list-disc mb-1">$1</li>')
        .replace(/^- (.*)/g, '<li class="ml-4 list-disc mb-1">$1</li>')
        .replace(/`([^`]+)`/g, '<code class="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-700 text-[11px]">$1</code>');
      
      if (formattedLine.startsWith('<li')) {
        return <ul key={i} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
      }
      return (
        <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <section id="chat" className="py-8 px-6 md:px-12 max-w-7xl mx-auto reveal-on-scroll">
      <div className="bg-white/95 backdrop-blur-3xl border border-zinc-100 rounded-[3.5rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.08)] max-w-4xl mx-auto flex flex-col h-[750px]">
        {/* Header */}
        <div className="px-10 py-8 border-b border-zinc-50 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-zinc-950 flex items-center justify-center text-[11px] font-black text-white shadow-xl">
                AR
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-600 rounded-full border-[3px] border-white" />
            </div>
            <div>
              <div className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-1 flex items-center gap-2">
                <Sparkles size={10} /> Intelligence Layer
              </div>
              <div className="text-base font-black text-zinc-950 uppercase tracking-tighter">Digital Representative</div>
            </div>
          </div>
        </div>

        {/* Messaging Interface */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar"
        >
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[85%] md:max-w-[70%] rounded-[2rem] px-8 py-6 text-[14px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-zinc-950 text-white font-medium rounded-tr-none shadow-sm' 
                  : 'bg-zinc-50 text-zinc-600 border border-zinc-100 rounded-tl-none'
              }`}>
                {formatContent(msg.content)}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start items-center gap-4">
               <div className="w-8 h-8 rounded-xl bg-zinc-50 flex items-center justify-center">
                  <Bot size={14} className="text-zinc-300" />
               </div>
              <div className="bg-zinc-50 border border-zinc-100 rounded-full px-8 py-4 flex items-center gap-4">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:200ms]" />
                  <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce [animation-delay:400ms]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-10 bg-white border-t border-zinc-50">
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire about Barclays, Research, or Tech Stack..."
              className="w-full bg-zinc-50 border-2 border-zinc-50 rounded-full pl-10 pr-20 py-7 text-sm focus:outline-none focus:border-indigo-600 focus:bg-white transition-all text-zinc-950 placeholder-zinc-400 font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 top-4 bottom-4 aspect-square flex items-center justify-center bg-zinc-950 text-white rounded-full hover:bg-indigo-600 transition-all shadow-xl active:scale-90 disabled:opacity-20"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ChatAssistant;
