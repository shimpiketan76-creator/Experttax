import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  MessageSquare, 
  Phone, 
  ExternalLink,
  Loader2,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../lib/utils';

// System prompt for Expitee
const SYSTEM_PROMPT = `You are Expitee, the expert digital assistant for "EXPERT TAX AND DIGITAL SERVICES". 
You represent the expert team of tax consultants and digital service providers. 
Your goal is to be helpful, professional, and personal. 

Languages:
- You are fluent in English, Marathi (मराठी), Hindi (हिन्दी), and Gujarati (ગુજરાતી).
- Always respond in the language the user is speaking, or English if preferred.
- Use local Boisar/Maharashtra context when appropriate.

Key values to emphasize:
- "Our expert team personally ensures every application is double-checked for zero errors."
- "We promise same-day processing for most digital services."
- "We are committed to 100% customer satisfaction."

If someone asks for pricing, refer to the rates on our website but offer a personalized quote if they share their specific requirements.
Always try to guide the user towards a WhatsApp conversation for sharing documents, as that is our primary workflow.`;

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ExpiteeChatbotProps {
  language?: string;
  userName?: string;
}

export default function ExpiteeChatbot({ language = 'en', userName = 'Guest' }: ExpiteeChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'bot',
      text: `Hello ${userName}! I am Expitee. I work directly with our expert team to ensure your tax and digital needs are handled perfectly. How can I help you today?`,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Proactive greeting logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        // You could trigger a notification here if desired
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      
      const chatHistory = messages.map(m => ({
        role: m.role === 'bot' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [
            ...chatHistory.map(h => ({ role: h.role, parts: h.parts })),
            { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.8,
          maxOutputTokens: 500,
        }
      });

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: response.text || "I'm looking into that for you. For faster processing, would you like to speak with our head consultant on WhatsApp?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot Error");
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: "I want to make sure I give you the most accurate info. Please message us on WhatsApp at 7410129655 and I'll make sure the owner sees it immediately.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '520px',
              width: '360px' 
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden mb-4 flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-5 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-sm">
                    <Bot size={22} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-blue-600 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-tight">Expitee Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-blue-100 uppercase tracking-wider flex items-center gap-1">
                      <div className="w-1 h-1 bg-white rounded-full"></div>
                      Official Support
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-5 space-y-5 bg-white">
                  {messages.map((m) => (
                    <div 
                      key={m.id} 
                      className={cn(
                        "flex flex-col max-w-[85%]",
                        m.role === 'user' ? "ml-auto items-end" : "items-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                          m.role === 'user' 
                            ? "bg-slate-900 text-white rounded-tr-none shadow-lg shadow-slate-200" 
                            : "bg-slate-50 text-slate-800 border border-slate-100 rounded-tl-none"
                        )}
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1.5 font-bold px-1 uppercase tracking-tighter">
                        {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl w-fit border border-slate-100 italic">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                      </div>
                      <span className="text-xs text-slate-500 font-bold">Expitee is typing...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                  {[
                    { label: 'Check Status', text: 'I want to check my application status' },
                    { label: 'Personal Quote', text: 'I need a specialized service, can I get a quote?' },
                    { label: 'Talk to Team Expert Tax', text: 'I want to speak with an expert from the team', isSpecial: true }
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => {
                        if (btn.isSpecial) {
                            window.open("https://wa.me/917410129655?text=Hi, I would like to speak with an expert regarding my requirements.", "_blank");
                        } else {
                            setInput(btn.text);
                        }
                      }}
                      className="whitespace-nowrap px-4 py-2 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-sm ring-blue-500/10 focus:ring-4 flex items-center gap-2 group"
                    >
                      {btn.isSpecial && <MessageSquare size={12} className="text-emerald-500 group-hover:scale-110 transition-transform" />}
                      {btn.label}
                    </button>
                  ))}
                </div>

                {/* Input */}
                <div className="p-5 bg-white border-t border-slate-100">
                  <div className="relative flex items-center gap-3">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="How can we help today?"
                      className="flex-grow bg-slate-50 border border-slate-200 rounded-2xl px-5 py-3 text-sm focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className="shrink-0 bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 active:scale-90 transition-all disabled:opacity-50 shadow-lg shadow-blue-200"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button Toggle */}
      {!isOpen && (
        <motion.button
          layoutId="chatbot-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-5 rounded-full shadow-2xl shadow-blue-500/40 flex items-center justify-center relative group"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          </div>
          <Bot size={34} />
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-4 bg-white text-slate-800 px-4 py-2 rounded-2xl text-xs font-black shadow-xl border border-slate-100 pointer-events-none whitespace-nowrap hidden group-hover:block"
          >
            👋 Hi! Need expert help?
          </motion.div>
        </motion.button>
      )}

      {/* WhatsApp Fallback Button (Permanent) */}
      <motion.a
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        href="https://wa.me/917410129655"
        target="_blank"
        rel="no-referrer"
        className="mt-4 bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl shadow-emerald-500/30 flex items-center justify-center group pointer-events-auto border-4 border-white"
        title="Direct WhatsApp"
      >
        <MessageSquare size={26} />
      </motion.a>
    </div>
  );
}
