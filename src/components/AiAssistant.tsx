import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Trash2,
  Copy,
  Check,
  Code2,
  Lightbulb,
  HelpCircle,
  X,
  Minimize2,
  Maximize2,
  Cpu
} from 'lucide-react';
import { UserProfile, GradeLevel } from '../types';

interface AiAssistantProps {
  currentUser: UserProfile;
  currentGrade?: GradeLevel;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC<AiAssistantProps> = ({
  currentUser,
  currentGrade = 8,
  isOpen,
  onClose,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-pro-ai',
      role: 'model',
      text: `Salom, **${currentUser.name}**! Men **Axadboy Nishanovning Pro Sun'iy Intellekt Ustoziman** 🤖✨\n\nInformatika, dasturlash (Python, C++, HTML/CSS, Scratch), algoritmlar, testlar yoki amaliy masalalar bo'yicha **har qanday savolingizga** yordam berishga tayyorman. Savolingizni yozing yoki mikrofon orqali ovozda ayting!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Speech Recognition (Web Speech API)
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'uz-UZ';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputPrompt((prev) => (prev ? prev + ' ' + transcript : transcript));
        }
        setIsListening(false);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech recognition warning:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleMic = () => {
    if (!recognitionRef.current) {
      alert("Kechirasiz, brauzeringizda ovozni aniqlash (Speech Recognition) qo'llab-quvvatlanmaydi.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Text-to-Speech (TTS)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) {
      alert("Kechirasiz, brauzeringiz ovozli o'qishni qo'llab-quvvatlamaydi.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown symbols for cleaner speech
    const cleanText = text
      .replace(/[#*`_~]/g, '')
      .replace(/```[\s\S]*?```/g, "Dastur kodi keltirilgan")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'uz-UZ';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customPrompt?: string) => {
    const promptToSend = (customPrompt || inputPrompt).trim();
    if (!promptToSend || loading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      text: promptToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          grade: currentUser.grade || currentGrade,
          role: currentUser.role,
          userName: currentUser.name,
          history: messages.slice(-6).map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const botText = data.text || "Kechirasiz, javobni shakllantirishda xatolik bo'ldi. Qaytadan so'rang.";

      const botMsg: ChatMessage = {
        id: 'msg-bot-' + Date.now(),
        role: 'model',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          role: 'model',
          text: "Tarmoq xatoligi yoki sun'iy intellekt band. Iltimos, bir ozdan so'ng qayta urinib ko'ring.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    if (confirm("Suhbat tarixini tozalashni xohlaysizmi?")) {
      setMessages([
        {
          id: 'welcome-reset',
          role: 'model',
          text: `Suhbat tozalandi. Yangi savolingizni berishingiz mumkin, **${currentUser.name}**!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isExpanded
          ? 'inset-4 md:inset-8'
          : 'bottom-4 right-4 w-[95vw] sm:w-[500px] h-[650px] max-h-[90vh]'
      }`}
    >
      <div className="w-full h-full rounded-3xl bg-slate-950/95 border border-cyan-500/40 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/25">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-white text-sm">
                  Pro AI Ustoz
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 text-[10px] font-black text-white shadow-sm">
                  PRO AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Axadboy Nishanov nomidagi virtual o'qituvchi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <button
              onClick={clearChat}
              title="Tarixni tozalash"
              className="p-1.5 rounded-xl hover:text-white hover:bg-slate-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? 'Kichraytirish' : 'Kattalashtirish'}
              className="p-1.5 rounded-xl hover:text-white hover:bg-slate-800"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              title="Yopish"
              className="p-1.5 rounded-xl hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleSend("Python da kalkulyator dasturi kodini yozib ber")}
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-600/40 text-cyan-300 text-[11px] font-semibold whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
          >
            <Code2 className="w-3 h-3" />
            Kalkulyator kodi
          </button>
          <button
            onClick={() => handleSend("Algoritm nima va uning turlarini sodda tushuntirib ber")}
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-600/40 text-cyan-300 text-[11px] font-semibold whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
          >
            <Lightbulb className="w-3 h-3" />
            Algoritm turlari
          </button>
          <button
            onClick={() => handleSend("8-sinf informatika uchun 3 ta qiziqarli test savoli tuz")}
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-600/40 text-cyan-300 text-[11px] font-semibold whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
          >
            <HelpCircle className="w-3 h-3" />
            Test tuzish
          </button>
          <button
            onClick={() => handleSend("Kompyuter kiberxavfsizligi va parollar himoyasi haqida maslahat ber")}
            className="px-2.5 py-1 rounded-xl bg-slate-800/80 hover:bg-indigo-600/40 text-cyan-300 text-[11px] font-semibold whitespace-nowrap border border-slate-700/60 flex items-center gap-1"
          >
            <Sparkles className="w-3 h-3" />
            Kiberxavfsizlik
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {messages.map((msg) => {
            const isMe = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                {!isMe && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 text-cyan-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2 relative group ${
                    isMe
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  <div className="whitespace-pre-line leading-relaxed">
                    {msg.text}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>

                    {!isMe && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => speakText(msg.text)}
                          title="Ovozli eshitish"
                          className="hover:text-cyan-300 flex items-center gap-1"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>O'qish</span>
                        </button>

                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          title="Nusxa olish"
                          className="hover:text-cyan-300 flex items-center gap-1"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                          <span>Nusxa</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isMe && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-1">
                    {currentUser.avatar || '👨‍💻'}
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 items-center text-xs text-cyan-400">
              <div className="w-8 h-8 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center animate-spin">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>Pro AI Ustoz javobni tahlil qilib yozmoqda...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-900/90 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            {/* Mic Button */}
            <button
              type="button"
              onClick={toggleMic}
              title={isListening ? "Mikrofonni o'chirish" : "Ovoz orqali gapirish"}
              className={`p-3 rounded-2xl border transition-all ${
                isListening
                  ? 'bg-rose-600 text-white border-rose-400 animate-pulse shadow-lg shadow-rose-600/40'
                  : 'bg-slate-950 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            {/* Input text */}
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder={isListening ? "Eshitilmoqda, gapiring..." : "Informatika yoki kod bo'yicha savol bering..."}
              className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputPrompt.trim() || loading}
              className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 text-white shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="text-[10px] text-slate-500 text-center mt-1.5">
            Axadboy Nishanov Pro AI Ustoz — Ovozli buyruqlar va murakkab masalalarni yechish qobiliyatiga ega
          </div>
        </div>
      </div>
    </div>
  );
};
