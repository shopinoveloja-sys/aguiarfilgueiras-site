import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  time?: string;
}

export default function KineticOverlay() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "user", content: "Quanto falta para minha meta?", time: "14:30" },
    { id: "2", role: "ai", content: "Para atingir sua meta diária de R$ 300,00, faltam apenas R$ 85,00. Tempo estimado: 2 horas. Demanda: Alta. Com base no fluxo atual do centro, essa é a melhor hora para continuar." },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: String(Date.now()),
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <header className="flex items-center bg-[#020617] border-b border-blue-500/10 p-4">
        <button onClick={() => navigate("/dashboard")} className="flex items-center justify-center size-10 rounded-full hover:bg-blue-500/10">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <div className="ml-3">
          <h2 className="text-lg font-bold">Driver Intelligence</h2>
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-blue-500" />
            <span className="text-xs text-blue-400 font-medium">IA Ativa</span>
          </div>
        </div>
        <div className="ml-auto">
          <button className="flex size-10 items-center justify-center rounded-full hover:bg-blue-500/10">
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex justify-center">
          <span className="text-slate-500 text-xs">Hoje</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
            {msg.role === "ai" && (
              <div className="size-8 shrink-0 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-xl">smart_toy</span>
              </div>
            )}
            <div className={`flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
              <p className="text-slate-400 text-[11px] font-bold uppercase px-1">
                {msg.role === "user" ? "Motorista" : "Assistente IA"}
              </p>
              <div className={`rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-gradient-to-br from-blue-800 to-blue-500 text-white rounded-tr-none" : "bg-[#1e293b66] text-slate-100 border border-blue-500/20 rounded-tl-none"} shadow-lg`}>
                <p>{msg.content}</p>
              </div>
              {msg.time && <p className="text-[10px] text-slate-500 mt-1">{msg.time}</p>}
            </div>
            {msg.role === "user" && (
              <div className="size-8 shrink-0 rounded-full bg-slate-800 overflow-hidden border border-blue-500/20">
                <img alt="Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMDPa0EWUjfSSACjt8nzDmRd2E1n5c_2QtMRt_VxLFsjtStAbyxuXiHEYg7gqwSauoG-EtM_vwhkAf5Io6r-XAvVeUvDPAhHcYsrj_-c6Zzmv6sz6XtTORo7qLnH" />
              </div>
            )}
          </div>
        ))}
      </main>

      <div className="p-4 bg-[#020617] border-t border-blue-500/10 shrink-0">
        <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-4 py-2 border border-blue-500/10">
          <button className="text-slate-400">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input
            className="flex-1 bg-transparent border-none focus:ring-0 text-white text-sm placeholder:text-slate-500"
            placeholder="Pergunte sobre sua performance..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend} className="size-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center text-white">
            <span className="material-symbols-outlined font-bold">arrow_upward</span>
          </button>
        </div>
      </div>

      <nav className="flex gap-2 border-t border-blue-500/10 bg-[#020617] p-4 pb-8">
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-blue-400" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">chat_bubble</span>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">bar_chart</span>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">map</span>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">person</span>
        </a>
      </nav>
    </div>
  );
}
