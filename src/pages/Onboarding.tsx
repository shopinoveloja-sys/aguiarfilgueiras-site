import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveOnboarding } from "../lib/api";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState("350");
  const [workDays, setWorkDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  const weekdays = [
    { id: 0, name: "D" },
    { id: 1, name: "S" },
    { id: 2, name: "T" },
    { id: 3, name: "Q" },
    { id: 4, name: "Q" },
    { id: 5, name: "S" },
    { id: 6, name: "S" },
  ];

  const toggleDay = (id: number) => {
    if (workDays.includes(id)) {
      setWorkDays(workDays.filter(d => d !== id));
    } else {
      setWorkDays([...workDays, id]);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveOnboarding({
        estimatedDailyEarnings: Number(earnings),
        workDays
      });
      toast.success("Configurações salvas!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white p-6 flex flex-col justify-center">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-black mb-2 bg-gradient-to-r from-emerald-400 to-emerald-400 bg-clip-text text-transparent">
          BEM-VINDO AO DRIVERCASH
        </h1>
        <p className="text-slate-400">Vamos configurar suas metas iniciais.</p>
      </div>

      <div className="space-y-8">
        <section>
          <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
            Quanto você deseja ganhar por dia?
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-500">R$</span>
            <input
              type="number"
              value={earnings}
              onChange={(e) => setEarnings(e.target.value)}
              className="w-full bg-[#1f2a3d66] border border-emerald-500/20 rounded-2xl py-6 pl-16 pr-6 text-4xl font-black focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </section>

        <section>
          <label className="block text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
            Quais dias da semana você trabalha?
          </label>
          <div className="flex justify-between">
            {weekdays.map(day => (
              <button
                key={day.id}
                onClick={() => toggleDay(day.id)}
                className={`size-11 rounded-xl font-bold transition-all ${
                  workDays.includes(day.id)
                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    : "bg-slate-800 text-slate-500"
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </section>

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full py-5 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-2xl font-black text-xl shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? "CONFIGURANDO..." : "COMEÇAR AGORA"}
        </button>
      </div>
    </div>
  );
}
