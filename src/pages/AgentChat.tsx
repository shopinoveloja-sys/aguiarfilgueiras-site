import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAgentIntro, sendAgentMessage } from "../lib/api";
import { toast } from "sonner";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
};

const quickPrompts = [
  "Qual foi minha media e meu recorde de sexta?",
  "Como esta minha situacao financeira hoje?",
  "Onde estou gastando mais no periodo?",
  "Como esta meu lucro por KM?",
  "Como esta minha reserva diaria?",
];

export default function AgentChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAgentIntro()
      .then((data) => {
        setMessages([
          {
            role: "assistant",
            content: data.message || "Sou o agente DriverCash. Posso conversar sobre seus dados, metas, despesas, KM e uso da plataforma.",
          },
        ]);
      })
      .catch(() => {
        setMessages([
          {
            role: "assistant",
            content: "Sou o agente DriverCash. Posso analisar seus dados financeiros e sugerir próximos passos dentro da plataforma.",
          },
        ]);
      });
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const ask = async (text: string) => {
    const message = text.trim();
    if (!message || loading) return;

    setInput("");
    setMessages((current) => [...current, { role: "user", content: message }]);
    setLoading(true);

    try {
      const data = await sendAgentMessage(message);
      setMessages((current) => [...current, { role: "assistant", content: data.answer }]);
    } catch {
      toast.error("Não consegui falar com o agente agora.");
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "Tive uma falha para responder agora. Tente novamente em alguns segundos.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <header className="sticky top-0 z-20 bg-[#020617]/95 backdrop-blur border-b border-blue-500/10 p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black">Agente DriverCash</h1>
            <p className="text-xs text-slate-500 font-bold uppercase">Insights dos seus dados</p>
          </div>
          <div className="size-10 rounded-full bg-blue-500/10 text-blue-300 flex items-center justify-center">
            <span className="material-symbols-outlined">smart_toy</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4 max-w-3xl w-full mx-auto">
        <section className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-300">shield</span>
            <div>
              <p className="text-sm font-bold">Escopo protegido</p>
              <p className="text-xs text-slate-400 mt-1">
                O agente conversa apenas sobre dados do DriverCash, uso da plataforma, receitas, despesas, KM, combustivel, manutencao e metas. Voce pode perguntar sobre media, recorde, dias especificos e situacao financeira.
              </p>
            </div>
          </div>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => ask(prompt)}
              className="shrink-0 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-300 active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        <section className="space-y-3">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-sm"
                    : "bg-slate-900 border border-slate-800 text-slate-100 rounded-bl-sm"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-slate-400">
                Analisando seus dados...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </section>
      </main>

      <footer className="border-t border-blue-500/10 bg-[#020617]/95 backdrop-blur p-4">
        <form
          className="max-w-3xl mx-auto flex gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            ask(input);
          }}
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Pergunte sobre seus ganhos, despesas, KM ou metas"
            className="flex-1 rounded-xl bg-slate-900 border border-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-blue-500"
          />
          <button type="submit" disabled={loading || !input.trim()} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50">
            Enviar
          </button>
        </form>
      </footer>
    </div>
  );
}
