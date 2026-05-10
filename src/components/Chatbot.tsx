import { useState, useEffect, useRef } from "react";
import { MessageSquare, X, Send, Bot, User, Loader2, Minus, Maximize2, AlertTriangle, RefreshCw, Zap } from "lucide-react";
import { getServices, getPortfolio, getTeam, getSiteConfig } from "@/utils/data";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY || "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";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm the DevdigitaX AI. How can I help you now?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const generateContext = () => {
    const services = getServices().map(s => s.title).join(", ");
    const team = [
      "Shahriar Mahmud (CEO & Founder, WordPress Expert)",
      "Md Arnob Hasan Joy (Co-Founder, Software Developer)",
      "Md Gias Uddin (Advisor & Managing Director)",
      "Hafiz Muhammad Leghari (SEO Expert)",
      "Moin Uddin (WordPress Elementor Developer)"
    ].join(", ");

    const stats = "400+ projects delivered, 98% client retention, 8+ years experience, 24/7 support.";
    const contact = "Email: devdigitax@gmail.com, WhatsApp: +880 1837-692110, Phone: +880 9638-474596, Address: Savar 1340, Dhaka, Bangladesh.";

    return `You are the Official DevdigitaX AI. 
Company: DevdigitaX (Founded 2018).
Mission: Digital growth shouldn't be a black box. We build measurable systems for businesses.
Services: ${services}.
Team: ${team}.
Stats: ${stats}.
Contact: ${contact}.
Tone: Professional, helpful, and concise. 
If asked about the CEO, it is Shahriar Mahmud. 
If asked about the Co-Founder, it is Md Arnob Hasan Joy.`;
  };

  const typeMessage = async (text: string) => {
    let currentText = "";
    const words = text.split(" ");

    // Create an empty typing message
    setMessages(prev => [...prev, { role: "assistant", content: "", isTyping: true }]);

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + " ";
      // Update the last message
      setMessages(prev => {
        const newMsgs = [...prev];
        newMsgs[newMsgs.length - 1].content = currentText;
        return newMsgs;
      });
      // Small delay for smooth "streaming" feel
      await new Promise(r => setTimeout(r, 30 + Math.random() * 20));
    }

    // Mark as finished
    setMessages(prev => {
      const newMsgs = [...prev];
      newMsgs[newMsgs.length - 1].isTyping = false;
      return newMsgs;
    });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);
    setErrorDetails(null);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: generateContext() },
            ...messages.map(({ role, content }) => ({ role, content })),
            { role: "user", content: userMessage }
          ],
          temperature: 0.7,
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || `Error ${response.status}`);

      const botText = data.choices[0]?.message?.content;
      if (botText) {
        setIsLoading(false); // Stop loader before typing starts
        await typeMessage(botText);
      }
    } catch (err: any) {
      console.error("Groq Error:", err);
      setErrorDetails(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-28 right-4 sm:right-8 z-[100] font-sans">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl transition-all hover:scale-110 active:scale-95"
        >
          <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />
          <div className="absolute top-0 right-0 h-3 w-3 sm:h-4 sm:w-4 bg-emerald-500 rounded-full border-2 border-[#0A0A0C]" />
        </button>
      ) : (
        <div
          className={`bg-[#0A0A0C] border border-white/10 shadow-2xl rounded-3xl overflow-hidden flex flex-col transition-all duration-300 ${isMinimized
              ? "h-16 w-64 sm:w-72"
              : "h-[500px] sm:h-[550px] w-[calc(100vw-32px)] sm:w-[400px] max-h-[calc(100vh-100px)]"
            }`}
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="p-4 sm:p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 sm:h-10 sm:w-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <div className="text-sm font-bold text-white">DevdigitaX AI</div>
                <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Online</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsMinimized(!isMinimized)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                {isMinimized ? <Maximize2 className="h-4 w-4 text-zinc-500" /> : <Minus className="h-4 w-4 text-zinc-500" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-zinc-500 hover:text-red-500">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-3 sm:p-4 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-white/5 text-zinc-300 border border-white/5 rounded-tl-none"
                      }`}>
                      {m.content}
                      {m.isTyping && <span className="inline-block w-1.5 h-4 bg-blue-500 ml-1 animate-pulse vertical-middle" />}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />
                      <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Generating...</span>
                    </div>
                  </div>
                )}

                {errorDetails && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0" />
                    <span>Connection lost.</span>
                    <button onClick={handleSend} className="ml-auto underline font-bold">Retry</button>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 border-t border-white/5 bg-white/[0.02]">
                <div className="relative flex items-center gap-2">
                  <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Message DevdigitaX AI..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white outline-none focus:border-blue-500/50 transition-all placeholder:text-zinc-600"
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className="h-10 w-10 sm:h-11 sm:w-11 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
