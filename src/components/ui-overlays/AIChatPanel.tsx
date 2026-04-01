"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useMarketStore } from "@/stores/marketStore";
import { MARKET_DATA } from "@/data/marketData";
import { X, Send, MapPin, Bot, User, Sparkles, Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

/** Parse [[PLACE:id:name]] markers from AI text into renderable segments */
function parseAIMessage(text: string) {
  const regex = /\[\[PLACE:([a-z_]+):([^\]]+)\]\]/g;
  const segments: Array<{ type: "text" | "place"; content: string; placeId?: string; placeName?: string }> = [];
  
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Push text before this match
    if (match.index > lastIndex) {
      segments.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }
    segments.push({
      type: "place",
      content: match[2],
      placeId: match[1],
      placeName: match[2]
    });
    lastIndex = match.index + match[0].length;
  }
  
  // Trailing text
  if (lastIndex < text.length) {
    segments.push({ type: "text", content: text.slice(lastIndex) });
  }
  
  return segments;
}

export function AIChatPanel({
  isOpen,
  onClose,
  initialQuery
}: {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { triggerFlyTo } = useMarketStore();
  const hasProcessedInitial = useRef(false);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Send initial query if provided (when coming from IntentEngine search bar)
  useEffect(() => {
    if (isOpen && initialQuery && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      sendMessage(initialQuery);
    }
  }, [isOpen, initialQuery]);

  // Reset state when closed
  useEffect(() => {
    if (!isOpen) {
      hasProcessedInitial.current = false;
      setMessages([]);
      setInputValue("");
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: "user", text: text.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const apiMessages = updatedMessages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { role: "ai", text: `⚠️ ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: "ai", text: "Sorry, I couldn't process that. Try again!" }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "ai", text: "Connection error. Please check your internet and try again." }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const handleLocate = (placeId: string) => {
    const market = MARKET_DATA.find(m => m.id === placeId);
    if (market) {
      triggerFlyTo(market);
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  if (!isOpen) return null;

  return (
    <div className="
      absolute top-4 left-4 bottom-16 z-[90] w-[380px] max-w-[calc(100vw-32px)]
      bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl
      flex flex-col overflow-hidden
      animate-in slide-in-from-left-8 duration-300
    ">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Sparkles size={18} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-black text-white tracking-tight">Delhi Vibe AI</h3>
            <p className="text-[10px] text-indigo-300/60 font-bold uppercase tracking-widest">Urban Advisor</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all"
        >
          <X size={16} />
        </button>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
        
        {/* Welcome message if no messages yet */}
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Bot size={28} className="text-indigo-400" />
            </div>
            <p className="text-sm text-white/60 font-medium mb-2">
              Hey! I&apos;m your Delhi guide. 🗺️
            </p>
            <p className="text-xs text-white/30 max-w-[250px] mx-auto leading-relaxed">
              Tell me what you need — budget shopping, late-night food, bridal lehengas, tech repairs — and I&apos;ll find the perfect spot.
            </p>
            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 justify-center mt-5">
              {["Budget thrift shopping", "Best bridal market", "Cheap phone repair"].map(q => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[11px] px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-indigo-500/10 hover:text-indigo-300 hover:border-indigo-500/20 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat messages */}
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5
              ${msg.role === "user" 
                ? "bg-indigo-500/20 text-indigo-400" 
                : "bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm shadow-indigo-500/20"}
            `}>
              {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
            </div>
            
            {/* Bubble */}
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed
              ${msg.role === "user" 
                ? "bg-indigo-500/20 text-indigo-100 border border-indigo-500/20 rounded-br-md" 
                : "bg-white/[0.04] text-white/80 border border-white/[0.06] rounded-bl-md"}
            `}>
              {msg.role === "user" ? (
                msg.text
              ) : (
                <AIMessageContent text={msg.text} onLocate={handleLocate} />
              )}
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm shadow-indigo-500/20">
              <Bot size={14} />
            </div>
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-2">
              <Loader2 size={14} className="animate-spin text-indigo-400" />
              <span className="text-xs text-white/40">Thinking about Delhi...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-black/30">
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about Delhi..."
            disabled={isLoading}
            className="flex-1 bg-transparent border-none outline-none text-sm text-white font-medium py-2.5 placeholder:text-white/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-400 disabled:bg-white/5 disabled:text-white/20 text-white transition-all flex-shrink-0"
          >
            <Send size={14} />
          </button>
        </div>
      </form>
    </div>
  );
}

/** Renders AI text with interactive place locate buttons */
function AIMessageContent({ text, onLocate }: { text: string; onLocate: (id: string) => void }) {
  const segments = parseAIMessage(text);

  return (
    <div className="space-y-1">
      {segments.map((seg, i) => {
        if (seg.type === "text") {
          // Render markdown-like bold: **text**
          const parts = seg.content.split(/(\*\*[^*]+\*\*)/g);
          return (
            <span key={i}>
              {parts.map((part, j) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>;
                }
                return <span key={j}>{part}</span>;
              })}
            </span>
          );
        }
        
        // Place marker → interactive button
        return (
          <button
            key={i}
            onClick={() => seg.placeId && onLocate(seg.placeId)}
            className="
              inline-flex items-center gap-1.5 px-2.5 py-1 my-0.5 rounded-lg
              bg-indigo-500/15 border border-indigo-500/25 text-indigo-300
              hover:bg-indigo-500/25 hover:text-indigo-200 hover:border-indigo-400/40
              transition-all cursor-pointer text-[12px] font-bold
              group
            "
          >
            <MapPin size={11} className="group-hover:animate-bounce" />
            {seg.placeName}
            <span className="text-[9px] text-indigo-400/50 font-medium ml-0.5">LOCATE</span>
          </button>
        );
      })}
    </div>
  );
}
