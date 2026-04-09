import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Ride {
  id: string;
  platform: string;
  name: string;
  time: string;
  distance: string;
  duration: string;
  value: string;
  profit: string;
}

export default function RideHistory() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("today");
  const [rides] = useState<Ride[]>([
    { id: "1", platform: "UBER", name: "Corrida #88291", time: "Hoje, 14:30", distance: "12.5 km", duration: "22 min", value: "$24.50", profit: "$18.20" },
    { id: "2", platform: "99", name: "Corrida #88290", time: "Hoje, 13:15", distance: "28.2 km", duration: "45 min", value: "$42.10", profit: "$32.00" },
    { id: "3", platform: "UBER", name: "Corrida #88289", time: "Hoje, 11:40", distance: "4.8 km", duration: "12 min", value: "$15.75", profit: "$10.20" },
    { id: "4", platform: "UBER", name: "Corrida #88288", time: "Hoje, 09:15", distance: "32.4 km", duration: "58 min", value: "$56.20", profit: "$44.80" },
  ]);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="sticky top-0 z-10 flex items-center bg-[#020617] p-4 border-b border-blue-500/10 justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="flex items-center justify-center size-10 rounded-full hover:bg-blue-500/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-bold">Histórico de Corridas</h1>
            <p className="text-xs text-blue-400 font-medium uppercase tracking-wider">Driver Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-blue-500/10">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-blue-500/10">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
      </header>

      <nav className="bg-[#020617] px-4 overflow-x-auto border-b border-blue-500/10">
        <div className="flex gap-6 min-w-max">
          {["Hoje", "Ontem", "Esta Semana", "Último Mês", "Personalizado"].map((item) => (
            <a
              key={item}
              className={`flex flex-col items-center justify-center py-4 border-b-2 ${filter === item.toLowerCase() ? "border-blue-500 text-blue-400" : "border-transparent text-slate-400"}`}
              href="#"
              onClick={(e) => { e.preventDefault(); setFilter(item.toLowerCase()); }}
            >
              <span className="text-sm font-medium">{item}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="grid grid-cols-3 gap-2 p-4 bg-blue-500/5">
        <div className="bg-[#1e293b66] p-3 rounded-lg border border-blue-500/20">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Total de Corridas</p>
          <p className="text-lg font-bold">{rides.length}</p>
        </div>
        <div className="bg-[#1e293b66] p-3 rounded-lg border border-blue-500/20">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Total Ganho</p>
          <p className="text-lg font-bold text-blue-400">$138.55</p>
        </div>
        <div className="bg-[#1e293b66] p-3 rounded-lg border border-blue-500/20">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Lucro Líquido</p>
          <p className="text-lg font-bold text-blue-400">$105.20</p>
        </div>
      </div>

      <div className="flex gap-2 p-4 overflow-x-auto">
        <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 px-4 text-white font-bold text-sm shadow-md">
          <span className="material-symbols-outlined text-lg">filter_list</span> Todas
        </button>
        <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500/10 px-4 text-slate-100 font-medium text-sm">Alto Lucro</button>
        <button className="flex h-9 shrink-0 items-center justify-center gap-2 rounded-full bg-blue-500/10 px-4 text-slate-100 font-medium text-sm">Viagens Curtas</button>
      </div>

      <main className="flex-1 px-4 space-y-3 pb-24">
        {rides.map((ride) => (
          <div key={ride.id} className="flex flex-col bg-[#1e293b66] border border-blue-500/10 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-10 rounded-lg bg-black text-white font-black text-xs">
                  {ride.platform}
                </div>
                <div>
                  <h3 className="font-bold">{ride.name}</h3>
                  <p className="text-xs text-slate-400">{ride.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-400">{ride.value}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold">Valor Total</p>
              </div>
            </div>
            <div className="flex items-center justify-between px-4 py-3 bg-blue-500/10">
              <div className="flex items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Distância</span>
                  <span className="text-sm font-semibold">{ride.distance}</span>
                </div>
                <div className="w-px h-6 bg-blue-500/20" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400">Tempo</span>
                  <span className="text-sm font-semibold">{ride.duration}</span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-blue-400 font-bold uppercase tracking-tighter">Lucro Líquido</span>
                <span className="text-base font-black text-blue-400">{ride.profit}</span>
              </div>
            </div>
          </div>
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-blue-500/10 bg-[#020617] px-4 pb-8">
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">dashboard</span>
          <p className="text-[10px] font-bold uppercase">Painel</p>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-blue-400" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          <p className="text-[10px] font-bold uppercase">Corridas</p>
        </a>
        <a className="relative flex flex-1 flex-col items-center justify-center gap-1 -top-4" href="#" onClick={(e) => { e.preventDefault(); navigate("/kinetic"); }}>
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-800 to-blue-500 text-white shadow-lg">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">insights</span>
          <p className="text-[10px] font-bold uppercase">Insights</p>
        </a>
        <a className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">person</span>
          <p className="text-[10px] font-bold uppercase">Perfil</p>
        </a>
      </nav>
    </div>
  );
}
