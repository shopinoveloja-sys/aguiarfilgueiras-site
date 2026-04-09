import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EarningsSettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    valuePerKm: true,
    valuePerHour: true,
    valuePerMinute: false,
    profitPercentage: true,
    textNotification: true,
    voiceNotification: false,
    autoScreenshot: false
  });

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-blue-500">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Cálculo de Ganhos</h1>
        </div>
        <button className="hover:bg-white/5 p-2 rounded-lg">
          <span className="material-symbols-outlined text-slate-400">help_outline</span>
        </button>
      </header>

      <main className="pt-20 px-4 max-w-2xl mx-auto space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">Aplicativos</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["Uber", "99", "InDrive", "Maxim"].map((app) => (
              <div key={app} className="bg-[#1e293b66] rounded-xl border border-blue-500/10 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${app === "Uber" ? "bg-black" : app === "99" ? "bg-[#FFD100]" : app === "InDrive" ? "bg-[#bcfc01]" : "bg-red-600"}`}>
                    {app === "99" && <span className="text-black font-extrabold text-xl">99</span>}
                    {app === "InDrive" && <span className="text-black font-extrabold text-xs">ID</span>}
                    {app === "Maxim" && <span className="text-white font-extrabold text-xs">M</span>}
                    {app === "Uber" && <span className="text-white font-black text-xs">UBER</span>}
                  </div>
                  <span className="font-bold text-sm">{app}</span>
                </div>
                <div className="w-6 h-6 rounded-md border-2 border-blue-500 bg-blue-500 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-sm">check</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Métricas de Exibição</h2>
          <div className="bg-[#1e293b66] rounded-xl border border-blue-500/10 divide-y divide-blue-500/10">
            {[
              { key: "valuePerKm", icon: "attach_money", label: "Valor por Km" },
              { key: "valuePerHour", icon: "schedule", label: "Valor por Hora" },
              { key: "valuePerMinute", icon: "speed", label: "Valor por Minuto" },
              { key: "profitPercentage", icon: "trending_up", label: "Porcentagem de Lucro" }
            ].map((item) => (
              <div key={item.key} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                  className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${settings[item.key as keyof typeof settings] ? "bg-blue-500" : "bg-slate-700"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings[item.key as keyof typeof settings] ? "ml-auto" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 px-1">Avançado</h2>
          <div className="bg-[#1e293b66] rounded-xl border border-blue-500/10 divide-y divide-blue-500/10">
            {[
              { key: "textNotification", icon: "chat_bubble", label: "Notificação de Texto" },
              { key: "voiceNotification", icon: "campaign", label: "Notificação de Voz" },
              { key: "autoScreenshot", icon: "screenshot", label: "Auto Screenshot" }
            ].map((item) => (
              <div key={item.key} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                    <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  </div>
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                <button
                  onClick={() => setSettings({ ...settings, [item.key]: !settings[item.key as keyof typeof settings] })}
                  className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${settings[item.key as keyof typeof settings] ? "bg-blue-500" : "bg-slate-700"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${settings[item.key as keyof typeof settings] ? "ml-auto" : ""}`} />
                </button>
              </div>
            ))}
          </div>
        </section>

        <button className="w-full py-4 bg-gradient-to-br from-blue-800 to-blue-500 text-white font-bold rounded-xl shadow-lg active:scale-95 transition-all duration-200 mt-8 mb-4">
          Salvar Configurações
        </button>
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-3 pb-8 bg-[#020617]/80 backdrop-blur-md z-50 border-t border-blue-500/10">
        <div className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-400" onClick={() => navigate("/dashboard")}>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Dashboard</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-400" onClick={() => navigate("/rides")}>
          <span className="material-symbols-outlined">directions_car</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Rides</span>
        </div>
        <div className="flex flex-col items-center justify-center text-slate-500 hover:text-blue-400">
          <span className="material-symbols-outlined">insights</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Insights</span>
        </div>
        <div className="flex flex-col items-center justify-center text-blue-500 bg-blue-500/10 rounded-xl px-3 py-1" onClick={() => navigate("/profile")}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
        </div>
      </nav>
    </div>
  );
}
