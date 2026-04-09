import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VehicleSettings() {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState({
    model: "Toyota Corolla",
    consumption: "12.5",
    fuelPrice: "5.89",
    fuelType: "gasolina"
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="sticky top-0 z-10 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/profile")} className="flex items-center justify-center p-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Configuração do Veículo</h1>
        <div className="w-10" />
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <section className="space-y-1">
          <h2 className="text-2xl font-bold">Detalhes do Veículo</h2>
          <p className="text-sm text-slate-400">Mantenha os dados atualizados para cálculos precisos.</p>
        </section>

        <div className="bg-[#1e293b66] rounded-xl border border-blue-500/10 p-5 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Modelo do Veículo</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/60">directions_car</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-slate-500 transition-all"
                placeholder="Ex: Toyota Corolla"
                type="text"
                value={vehicle.model}
                onChange={(e) => setVehicle({ ...vehicle, model: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Consumo Médio (km/L)</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/60">ev_station</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-slate-500 transition-all"
                placeholder="Ex: 12.5"
                type="number"
                step="0.1"
                value={vehicle.consumption}
                onChange={(e) => setVehicle({ ...vehicle, consumption: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Preço do Combustível</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/60">payments</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white placeholder-slate-500 transition-all"
                placeholder="Ex: 5.89"
                type="number"
                step="0.01"
                value={vehicle.fuelPrice}
                onChange={(e) => setVehicle({ ...vehicle, fuelPrice: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Tipo de Combustível</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-blue-500/60">local_gas_station</span>
              <select
                className="w-full pl-10 pr-4 py-3 bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-lg text-white transition-all"
                value={vehicle.fuelType}
                onChange={(e) => setVehicle({ ...vehicle, fuelType: e.target.value })}
              >
                <option value="gasolina">Gasolina</option>
                <option value="alcool">Álcool / Etanol</option>
                <option value="gnv">GNV</option>
                <option value="diesel">Diesel</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-xl border border-blue-500/20">
          <span className="material-symbols-outlined text-blue-400 mt-0.5">info</span>
          <p className="text-sm leading-relaxed text-slate-300">
            Os valores informados acima são utilizados pelo nosso algoritmo para calcular o seu <strong className="text-blue-400 font-semibold">Custo por KM</strong> automaticamente durante suas viagens.
          </p>
        </div>

        <button className="w-full bg-gradient-to-br from-blue-800 to-blue-500 hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
          Salvar Configurações
        </button>
      </main>

      <nav className="sticky bottom-0 bg-[#020617] border-t border-blue-500/10 pb-8 pt-3 px-6">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <a className="flex flex-col items-center gap-1 group" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-400">dashboard</span>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-400">Dashboard</span>
          </a>
          <a className="flex flex-col items-center gap-1 group" href="#" onClick={(e) => { e.preventDefault(); navigate("/rides"); }}>
            <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-400">route</span>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-400">Viagens</span>
          </a>
          <a className="flex flex-col items-center gap-1 group" href="#">
            <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-400">insights</span>
            <span className="text-[10px] font-medium text-slate-400 group-hover:text-blue-400">Insights</span>
          </a>
          <a className="flex flex-col items-center gap-1 group" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
            <span className="material-symbols-outlined text-blue-400" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            <span className="text-[10px] font-medium text-blue-400">Ajustes</span>
          </a>
        </div>
      </nav>
    </div>
  );
}
