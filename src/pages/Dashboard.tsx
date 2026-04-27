import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardData } from "../lib/api";

interface DashboardData {
  totalIncomeMonth: number;
  daysWorked: number;
  daysRemaining: number;
  averageGoalMonth: number;
  bestGoalMonth: number;
  projectedMonth: number;
  dailyGoalTodayAverage: number;
  dailyGoalTodayBest: number;
  performanceStatus: 'below_average' | 'on_track' | 'above_average';
  chartData: {
    labels: number[];
    averageLine: number[];
    bestLine: number[];
    projectionLine: number[];
  };
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboard = await getDashboardData();
        setData(dashboard);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const performanceLabel = {
    below_average: { text: "Abaixo da Média", color: "text-red-400", bg: "bg-red-500/10" },
    on_track: { text: "No Caminho", color: "text-blue-400", bg: "bg-blue-500/10" },
    above_average: { text: "Acima da Média", color: "text-emerald-400", bg: "bg-emerald-500/10" }
  }[data?.performanceStatus || 'on_track'];

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://avatar.vercel.sh/drivercash" alt="Profile" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bem-vindo,</p>
            <p className="text-base font-bold">Motorista</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-blue-500/10 text-blue-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <section className="mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold">Resumo Mensal</h2>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${performanceLabel.bg} ${performanceLabel.color} uppercase tracking-wider`}>
              {performanceLabel.text}
            </span>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-4 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs uppercase font-bold mb-2">Ganhos do Mês</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-blue-400">R$ {data?.totalIncomeMonth.toFixed(2)}</span>
                <span className="text-sm font-medium text-blue-400 flex items-center">
                  Proj: R$ {data?.projectedMonth.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#1e293b66] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-400">Meta Média: R$ {data?.averageGoalMonth}</span>
              <span className="text-sm font-bold text-blue-400">
                {data ? Math.round((data.totalIncomeMonth / data.averageGoalMonth) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5">
              <div 
                className="bg-blue-400 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                style={{ width: `${Math.min(data ? (data.totalIncomeMonth / data.averageGoalMonth) * 100 : 0, 100)}%` }} 
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400 text-sm">event_available</span>
                <span className="text-[10px] font-medium uppercase">Dias Trabalhados</span>
              </div>
              <p className="text-xl font-bold">{data?.daysWorked}</p>
            </div>
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400 text-sm">calendar_month</span>
                <span className="text-[10px] font-medium uppercase">Dias Restantes</span>
              </div>
              <p className="text-xl font-bold">{data?.daysRemaining}</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Metas de Hoje</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Média</p>
              <p className="text-2xl font-black text-blue-400">R$ {data?.dailyGoalTodayAverage}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Recorde</p>
              <p className="text-2xl font-black text-emerald-400">R$ {data?.dailyGoalTodayBest}</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="size-12 shrink-0 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">psychology</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Status da Projeção</p>
              <p className="text-xs text-slate-400">
                Você está projetado para fechar o mês com R$ {data?.projectedMonth}. 
                {data && data.projectedMonth > data.averageGoalMonth ? " Excelente ritmo!" : " Precisa acelerar um pouco."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b66] border-t border-blue-500/10 px-6 py-3 pb-8 flex items-center justify-around">
        <a className="flex flex-col items-center gap-1 text-blue-400" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Hoje</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/rides"); }}>
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Histórico</span>
        </a>
        <a className="relative -top-8" href="#" onClick={(e) => { e.preventDefault(); navigate("/kinetic"); }}>
          <button className="size-14 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white ring-4 ring-[#020617]">
            <span className="material-symbols-outlined text-3xl">smart_toy</span>
          </button>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">map</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Mapa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Ajustes</span>
        </a>
      </nav>
    </div>
  );
}
