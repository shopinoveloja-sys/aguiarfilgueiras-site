import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: string;
  origin: string;
  destination: string;
  time: string;
  distance: string;
  value: string;
  profit: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [trips] = useState<Trip[]>([
    { id: "1", origin: "Expresso Aeropuerto", destination: "Centro", time: "14:20", distance: "22.5 KM", value: "$42.50", profit: "$32.00" },
    { id: "2", origin: "Centro da Cidade", destination: "Shopping", time: "13:45", distance: "8.2 KM", value: "$15.20", profit: "$10.50" },
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 overflow-hidden">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2j9ssKo2CQwyzErikrfFIkWqyhW-AWAr2BgULOBvDgACyuFR230DWwGx2WvVD2SA2AIWvHc1dxNRBWEWxBxT-FautSZniUuwHHnlETooaKUlx8EpvQ7ElY1UWVyG9Wfrx7gzNUi6SZxQ4KaMpD-rLin-Gipn-X34SLrc7MSdVPDuw6Wa2W48zjZZogFyz_CQ2PZkruYCQMgdQh_8kgPx2j7CDidYXlwK0IyHi-cT6pBdadtEePs9zxDs2MZRzrqCZOKvHIAz" alt="Profile" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bem-vindo de volta,</p>
            <p className="text-base font-bold">Alex Rivera</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-blue-500/10 text-blue-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <section className="mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold">Desempenho de Hoje</h2>
            <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-500/10 text-blue-400 uppercase tracking-wider">Ao Vivo</span>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-4 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 text-xs uppercase font-bold mb-2">Lucro Líquido</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-blue-400">$188.40</span>
                <span className="text-sm font-medium text-blue-400 flex items-center">
                  <span className="material-symbols-outlined text-sm">trending_up</span> 12%
                </span>
              </div>
            </div>
            <div className="absolute right-[-20px] top-[-20px] opacity-10">
              <span className="material-symbols-outlined text-[120px] text-blue-500">payments</span>
            </div>
          </div>

          <div className="bg-[#1e293b66] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-400">Meta Diária: $250.00</span>
              <span className="text-sm font-bold text-blue-400">75%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5">
              <div className="bg-blue-400 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" style={{ width: "75%" }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400">account_balance_wallet</span>
                <span className="text-xs font-medium uppercase">Bruto</span>
              </div>
              <p className="text-xl font-bold">$245.50</p>
            </div>
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400">route</span>
                <span className="text-xs font-medium uppercase">Distância</span>
              </div>
              <p className="text-xl font-bold">124.2 KM</p>
            </div>
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400">schedule</span>
                <span className="text-xs font-medium uppercase">Por Hora</span>
              </div>
              <p className="text-xl font-bold">$32.10</p>
            </div>
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-400 mb-2">
                <span className="material-symbols-outlined text-blue-400">speed</span>
                <span className="text-xs font-medium uppercase">Por KM</span>
              </div>
              <p className="text-xl font-bold">$1.52</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
            <div className="size-12 shrink-0 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-blue-400">psychology</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Sugestão da IA</p>
              <p className="text-xs text-slate-400">Alta demanda detectada no Centro. Vá para o norte para melhores tarifas.</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">chevron_right</span>
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Últimas Viagens</h3>
          <div className="space-y-3">
            {trips.map((trip) => (
              <div key={trip.id} className="flex items-center justify-between p-3 bg-[#1e293b66] border border-blue-500/10 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="size-8 rounded bg-slate-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-sm text-blue-400">directions_car</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold">{trip.origin}</p>
                    <p className="text-[10px] text-slate-500">{trip.time} • {trip.distance}</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-blue-400">+{trip.profit}</p>
              </div>
            ))}
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
