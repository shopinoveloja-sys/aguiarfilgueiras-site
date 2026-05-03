import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 shadow-xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/profile")} className="text-slate-400 hover:text-blue-400">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <img alt="Driver Cash Logo" className="w-8 h-8 object-contain" src="/drivercash-logo.svg" />
          <h1 className="text-lg font-bold bg-gradient-to-br from-blue-800 to-blue-500 bg-clip-text text-transparent">Driver Cash Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-blue-400">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-400 hidden md:block">Admin User</span>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">AU</div>
          </div>
        </div>
      </header>

      <aside className="hidden md:flex h-full w-64 fixed left-0 top-0 bg-[#020617] border-r border-blue-500/10 shadow-2xl flex-col p-4 pt-20 gap-2 z-40">
        <div className="flex items-center gap-3 px-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#1e293b] flex items-center justify-center border border-blue-500/20">
            <span className="material-symbols-outlined text-blue-500">shield_person</span>
          </div>
          <div>
            <p className="text-sm font-bold">Cash Admin</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Operational Unit</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-blue-800 to-blue-500 text-white rounded-xl shadow-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium">Users</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-medium">Subscriptions</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition-colors" href="#">
            <span className="material-symbols-outlined">monitoring</span>
            <span className="text-sm font-medium">Revenue</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-blue-500/10 pt-4">
          <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors" href="#">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Sign Out</span>
          </a>
        </div>
      </aside>

      <main className="md:pl-64 pt-24 pb-24 md:pb-8 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1e293b66] p-6 rounded-2xl shadow-xl hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-blue-500">person</span>
                </div>
                <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">+12%</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total de Usuários</p>
              <h3 className="text-3xl font-black">12,842</h3>
            </div>

            <div className="bg-[#1e293b66] p-6 rounded-2xl shadow-xl hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-blue-500">verified</span>
                </div>
                <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-full">Ativas</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Assinaturas Ativas</p>
              <h3 className="text-3xl font-black">8,105</h3>
            </div>

            <div className="bg-[#1e293b66] p-6 rounded-2xl shadow-xl hover:border-blue-500/30 transition-all border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-blue-500">account_balance_wallet</span>
                </div>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Faturamento (MRR)</p>
              <h3 className="text-3xl font-black">R$ 142.4k</h3>
            </div>

            <div className="bg-[#1e293b66] p-6 rounded-2xl shadow-xl hover:border-red-500/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <span className="material-symbols-outlined text-red-500">trending_down</span>
                </div>
                <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded-full">2.4%</span>
              </div>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Churn Mensal</p>
              <h3 className="text-3xl font-black">152</h3>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#1e293b66] p-8 rounded-2xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h2 className="text-xl font-bold mb-1">Crescimento de Usuários</h2>
                  <p className="text-sm text-slate-500">Dados consolidados da última semana operacional</p>
                </div>
              </div>
              <div className="relative h-64 w-full">
                <svg className="w-full h-full" viewBox="0 0 800 200">
                  <defs>
                    <linearGradient id="gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "rgba(59, 130, 246, 0.4)" }} />
                      <stop offset="100%" style={{ stopColor: "rgba(59, 130, 246, 0)" }} />
                    </linearGradient>
                  </defs>
                  <path d="M0,150 Q100,140 200,160 T400,100 T600,120 T800,40 L800,200 L0,200 Z" fill="url(#gradient)" />
                  <path d="M0,150 Q100,140 200,160 T400,100 T600,120 T800,40" fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="4" />
                  <circle cx="800" cy="40" fill="#3b82f6" r="6" />
                </svg>
              </div>
            </div>

            <div className="bg-[#1e293b66] rounded-2xl flex flex-col">
              <div className="p-6 border-b border-blue-500/10">
                <h2 className="text-lg font-bold">Últimas Assinaturas</h2>
              </div>
              <div className="p-2 flex-grow overflow-y-auto max-h-[400px]">
                {[
                  { name: "Ricardo Santos", plan: "Plano Anual", time: "Há 2 min", value: "R$ 499" },
                  { name: "Carla Mendes", plan: "Plano Mensal", time: "Há 15 min", value: "R$ 59" },
                  { name: "Marcos Oliveira", plan: "Plano Trimestral", time: "Há 1h", value: "R$ 159" },
                  { name: "Bruno Lima", plan: "Plano Mensal", time: "Há 3h", value: "R$ 59" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                        <span className="material-symbols-outlined text-blue-500">person</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-[10px] text-slate-500">{user.plan} • {user.time}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-blue-500">{user.value}</span>
                  </div>
                ))}
              </div>
              <button className="m-4 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-blue-500 transition-colors border border-blue-500/10 rounded-xl bg-blue-500/5">
                Ver Todos os Relatórios
              </button>
            </div>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-white text-3xl">rocket_launch</span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Performance do Sistema</h4>
                <p className="text-sm text-slate-400">Uptime de 99.98% nas últimas 24 horas. Todos os servidores operando em escala otimizada.</p>
              </div>
            </div>
            <div className="bg-[#1e293b66] p-6 rounded-2xl flex items-center gap-6">
              <div className="bg-slate-700 w-16 h-16 rounded-2xl flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-500 text-3xl">support_agent</span>
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Fila de Suporte</h4>
                <p className="text-sm text-slate-400">3 tickets pendentes. Tempo médio de resposta: 12 minutos. Satisfação do usuário: 4.9/5.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center h-16 px-4 bg-[#020617]/80 backdrop-blur-md border-t border-blue-500/10 z-50">
        <a className="flex flex-col items-center justify-center text-blue-500" href="#">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-500" href="#">
          <span className="material-symbols-outlined">bar_chart</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Analytics</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-500" href="#">
          <span className="material-symbols-outlined">notifications</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Alerts</span>
        </a>
        <a className="flex flex-col items-center justify-center text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-wider">Settings</span>
        </a>
      </nav>
    </div>
  );
}
