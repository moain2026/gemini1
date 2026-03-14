"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, ThinkingLevel, Modality } from "@google/genai";
import { Bot, X, Send, Image as ImageIcon, Mic, Sparkles, Wand2, Loader2, Upload, Play, Square } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "analyze">("chat");
  
  // Chat state
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([
    { role: "model", text: "مرحباً! أنا مساعد كيف الضيافة الذكي. كيف يمكنني مساعدتك في تخطيط مناسبتك اليوم؟" }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  // Image Analysis state
  const [analyzeImage, setAnalyzeImage] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Chat Handler
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput("");
    setChatHistory(prev => [...prev, { role: "user", text: userText }]);
    setIsThinking(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: userText,
        config: {
          systemInstruction: "أنت مساعد ذكي لشركة 'كيف الضيافة' في السعودية. تقدم استشارات حول خدمات الضيافة الفاخرة، القهوة السعودية، تنظيم الفعاليات، والمناسبات. أجب بلغة عربية راقية واحترافية.",
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
        }
      });
      
      const modelText = response.text || "عذراً، لم أتمكن من معالجة طلبك.";
      setChatHistory(prev => [...prev, { role: "model", text: modelText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatHistory(prev => [...prev, { role: "model", text: "حدث خطأ أثناء الاتصال بالخادم." }]);
    } finally {
      setIsThinking(false);
    }
  };

  // TTS Handler
  const handleTTS = async (text: string) => {
    if (isPlaying) {
      audioSourceRef.current?.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Zephyr" }
            }
          }
        }
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
        const ctx = audioContextRef.current;
        const binaryString = window.atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const audioBuffer = await ctx.decodeAudioData(bytes.buffer);
        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);
        source.start(0);
        audioSourceRef.current = source;
        
        source.onended = () => setIsPlaying(false);
      } else {
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("TTS error:", error);
      setIsPlaying(false);
    }
  };

  // Image Upload Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Image Analysis Handler
  const handleAnalyze = async () => {
    if (!analyzeImage) return;
    setIsAnalyzing(true);
    setAnalyzeResult("");

    try {
      const base64Data = analyzeImage.split(",")[1];
      const mimeType = analyzeImage.split(";")[0].split(":")[1];

      const response = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType } },
            { text: "حلل هذه الصورة لمكان مناسبة أو فعالية، واقترح أفضل ترتيبات وتجهيزات الضيافة (قهوة، شاي، تقديمات) التي تناسب هذا المكان." }
          ]
        }
      });
      setAnalyzeResult(response.text || "لم أتمكن من تحليل الصورة.");
    } catch (error) {
      console.error("Analyze error:", error);
      setAnalyzeResult("حدث خطأ أثناء تحليل الصورة.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-28 right-4 z-50 w-14 h-14 rounded-full flex items-center justify-center md:bottom-8 shadow-lg"
        style={{ background: "linear-gradient(135deg, #B8860B, #D4A017)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 1.5 }}
      >
        <Bot className="w-7 h-7 text-[#0f0f0f]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-50 w-[90vw] max-w-[400px] h-[600px] max-h-[80vh] rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-[#B8860B]/20"
            style={{ background: "rgba(15, 12, 5, 0.95)", backdropFilter: "blur(20px)" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#B8860B]/20 flex justify-between items-center bg-[#0f0f0f]/50">
              <div className="flex items-center gap-2">
                <Bot className="w-6 h-6 text-[#B8860B]" />
                <h3 className="text-[#F5F5DC] font-bold">المساعد الذكي</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-[#F5F5DC]/50 hover:text-[#F5F5DC]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#B8860B]/20 bg-[#0f0f0f]/30">
              <button onClick={() => setActiveTab("chat")} className={`flex-1 py-2 text-xs font-medium ${activeTab === "chat" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-[#F5F5DC]/50"}`}>استشارة</button>
              <button onClick={() => setActiveTab("analyze")} className={`flex-1 py-2 text-xs font-medium ${activeTab === "analyze" ? "text-[#B8860B] border-b-2 border-[#B8860B]" : "text-[#F5F5DC]/50"}`}>تحليل</button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              {activeTab === "chat" && (
                <div className="flex flex-col gap-4">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === "user" ? "bg-[#B8860B] text-[#0f0f0f] rounded-tl-none" : "bg-[#1a1a1a] text-[#F5F5DC] rounded-tr-none border border-[#B8860B]/10"}`}>
                        {msg.text}
                        {msg.role === "model" && (
                          <button onClick={() => handleTTS(msg.text)} className="mt-2 text-[#B8860B] hover:text-[#D4A017] flex items-center gap-1 text-xs">
                            {isPlaying ? <Square className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                            {isPlaying ? "إيقاف" : "استماع"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="bg-[#1a1a1a] p-3 rounded-2xl rounded-tr-none border border-[#B8860B]/10 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 text-[#B8860B] animate-spin" />
                        <span className="text-xs text-[#F5F5DC]/70">يفكر بعمق...</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "analyze" && (
                <div className="flex flex-col gap-4">
                  <div className="border-2 border-dashed border-[#B8860B]/30 rounded-xl p-6 flex flex-col items-center justify-center text-center relative">
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setAnalyzeImage)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                    {analyzeImage ? (
                      <img src={analyzeImage} alt="Preview" className="w-full h-32 object-cover rounded-lg mb-2" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-[#B8860B] mb-2" />
                        <p className="text-sm text-[#F5F5DC]/70">ارفع صورة لمكان المناسبة</p>
                      </>
                    )}
                  </div>
                  <button onClick={handleAnalyze} disabled={!analyzeImage || isAnalyzing} className="w-full py-2 bg-[#B8860B] text-[#0f0f0f] rounded-lg font-bold disabled:opacity-50 flex justify-center items-center gap-2">
                    {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                    تحليل الصورة
                  </button>
                  {analyzeResult && (
                    <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#B8860B]/20 text-sm text-[#F5F5DC] whitespace-pre-wrap">
                      {analyzeResult}
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Chat Input (Only visible in chat tab) */}
            {activeTab === "chat" && (
              <form onSubmit={handleChatSubmit} className="p-3 border-t border-[#B8860B]/20 bg-[#0f0f0f]/50 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  className="flex-1 bg-[#1a1a1a] border border-[#B8860B]/30 rounded-full px-4 py-2 text-sm text-[#F5F5DC] focus:outline-none focus:border-[#B8860B]"
                />
                <button type="submit" disabled={!chatInput.trim() || isThinking} className="w-10 h-10 rounded-full bg-[#B8860B] text-[#0f0f0f] flex items-center justify-center disabled:opacity-50">
                  <Send className="w-4 h-4 rtl:-scale-x-100" />
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
