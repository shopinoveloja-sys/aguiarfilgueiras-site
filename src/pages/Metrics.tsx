import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKmHistory, getMaintenanceAlerts, getTransactions } from "../lib/api";

type Period = "day" | "week" | "month";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  category: string;
  value: number | string;
  date: string;
}

interface KmDaily {
  id: string;
  date: string;
  kmStart: number;
  kmEnd: number;
  kmTotal: number;
}

interface MaintenanceAlert {
  id: string;
  name: string;
  kmInterval: number;
  lastKm: number;
  nextKm: number;
  enabled: boolean;
}

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const getPeriodRange = (period: Period) => {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (period === "day") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  if (period === "week") {
    const day = start.getDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - daysFromMonday);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  end.setMonth(start.getMonth() + 1, 0);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export default function Metrics() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("month");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [kmHistory, setKmHistory] = useState<KmDaily[]>([]);
  const [maintenance, setMaintenance] = useState<MaintenanceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [txs, kms, alerts] = await Promise.all([
          getTransactions(),
          getKmHistory(),
          getMaintenanceAlerts(),
        ]);
        setTransactions(Array.isArray(txs) ? txs : []);
        setKmHistory(Array.isArray(kms) ? kms : []);
        setMaintenance(Array.isArray(alerts) ? alerts : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const stats = useMemo(() => {
    const { start, end } = getPeriodRange(period);
    const inRange = (date: string) => {
      const parsed = new Date(date);
      return parsed >= start && parsed <= end;
    };

    const periodTransactions = transactions.filter((item) => inRange(item.date));
    const periodKm = kmHistory.filter((item) => inRange(item.date));
    const income = periodTransactions
      .filter((item) => item.type === "INCOME")
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const expense = periodTransactions
      .filter((item) => item.type === "EXPENSE")
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const fuel = periodTransactions
      .filter((item) => item.type === "EXPENSE" && item.category.toUpperCase().includes("COMBUSTIVEL"))
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const maintenanceCost = periodTransactions
      .filter((item) => item.type === "EXPENSE" && item.category.toUpperCase().includes("MANUTENCAO"))
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const kmTotal = periodKm.reduce((sum, item) => sum + toNumber(item.kmTotal), 0);
    const estimatedHours = kmTotal > 0 ? kmTotal / 30 : 0;

    return {
      income,
      expense,
      fuel,
      maintenanceCost,
      profit: income - expense,
      kmTotal,
      incomePerKm: kmTotal > 0 ? income / kmTotal : 0,
      profitPerKm: kmTotal > 0 ? (income - expense) / kmTotal : 0,
      fuelPerKm: kmTotal > 0 ? fuel / kmTotal : 0,
      incomePerHour: estimatedHours > 0 ? income / estimatedHours : 0,
      estimatedHours,
    };
  }, [transactions, kmHistory, period]);

  const periodLabels: Record<Period, string> = {
    day: "Hoje",
    week: "Semana",
    month: "Mes",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-28">
      <header className="sticky top-0 z-20 bg-[#020617]/95 backdrop-blur border-b border-blue-500/10 p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black">Metricas</h1>
            <p className="text-xs text-slate-500 font-bold uppercase">Combustivel, KM e manutencao</p>
          </div>
          <button onClick={() => navigate("/add")} className="size-10 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1">
          {(["day", "week", "month"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`h-10 rounded-lg text-xs font-bold uppercase ${period === item ? "bg-blue-500 text-white" : "text-slate-400"}`}
            >
              {periodLabels[item]}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-4xl mx-auto">
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-900 border border-emerald-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Ganho por KM</p>
            <p className="text-2xl font-black text-emerald-400">{money(stats.incomePerKm)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-blue-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Ganho por Hora</p>
            <p className="text-2xl font-black text-blue-400">{money(stats.incomePerHour)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-amber-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Combustivel por KM</p>
            <p className="text-2xl font-black text-amber-400">{money(stats.fuelPerKm)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-red-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Lucro por KM</p>
            <p className={`text-2xl font-black ${stats.profitPerKm >= 0 ? "text-emerald-400" : "text-red-400"}`}>{money(stats.profitPerKm)}</p>
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold">Resumo operacional</h2>
              <p className="text-xs text-slate-500">{stats.kmTotal.toLocaleString("pt-BR")} km registrados</p>
            </div>
            <span className="material-symbols-outlined text-blue-400">speed</span>
          </div>
          <div className="grid gap-3">
            {[
              ["Receitas", money(stats.income), "text-emerald-300"],
              ["Despesas", money(stats.expense), "text-red-300"],
              ["Combustivel", money(stats.fuel), "text-amber-300"],
              ["Manutencao", money(stats.maintenanceCost), "text-slate-300"],
              ["Horas estimadas", `${stats.estimatedHours.toFixed(1).replace(".", ",")} h`, "text-blue-300"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                <span className="text-xs font-bold uppercase text-slate-500">{label}</span>
                <span className={`text-sm font-black ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold">Manutencoes</h2>
              <p className="text-xs text-slate-500">Alertas cadastrados por quilometragem</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">build</span>
          </div>
          {maintenance.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">Nenhuma manutencao cadastrada.</p>
          ) : (
            <div className="space-y-3">
              {maintenance.slice(0, 6).map((item) => (
                <div key={item.id} className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-500">{item.kmInterval.toLocaleString("pt-BR")} km de intervalo</p>
                    </div>
                    <p className="text-sm font-black text-blue-300">{item.nextKm.toLocaleString("pt-BR")} km</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b66] backdrop-blur-md border-t border-blue-500/10 px-6 py-3 pb-8 flex items-center justify-around">
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold uppercase">Hoje</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/rides"); }}>
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold uppercase">Historico</span>
        </a>
        <a className="relative -top-8" href="#" onClick={(e) => { e.preventDefault(); navigate("/add"); }}>
          <button className="size-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-white ring-4 ring-[#020617] active:scale-95">
            <span className="material-symbols-outlined text-4xl">add</span>
          </button>
        </a>
        <a className="flex flex-col items-center gap-1 text-blue-400" href="#" onClick={(e) => { e.preventDefault(); navigate("/metrics"); }}>
          <span className="material-symbols-outlined">query_stats</span>
          <span className="text-[10px] font-bold uppercase">Metricas</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase">Perfil</span>
        </a>
      </nav>
    </div>
  );
}
