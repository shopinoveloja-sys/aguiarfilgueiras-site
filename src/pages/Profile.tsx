import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-lg hover:bg-white/5">
            <span className="material-symbols-outlined text-blue-500">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Perfil</h1>
        </div>
        <button className="p-2 rounded-lg hover:bg-white/5">
          <span className="material-symbols-outlined text-blue-500">account_circle</span>
        </button>
      </header>

      <main className="p-6 space-y-6">
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500/20 p-1 bg-gradient-to-tr from-blue-800 to-blue-500">
              <img
                alt="Driver Profile"
                className="w-full h-full rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX_BrWh_fOlKBNm4QLZHTP7JSymtqCP73UkamtpZP9rkg06scfNsYaWt-HSC6duLom32PNXdbd_HIA4W5kjoptK-NcPBPBkrTvOtbWBv1Qvmnk_C06BWhxbUe4SquYONfW41DUB3pFzHG5U3XmJZ92Q51dJNCqmuyzQveFTazcLZrX0oCJKCQQz9jBJQlZZB87cOv5QT8O4zl8PpT6C0ilseEwwHt-BuYjamv3eXTcxIpK6keKmfpDaRmUrkujuKP2f59HRTVGw1ib"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1.5 shadow-lg">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Alex Rivera</h2>
            <p className="text-slate-400 text-sm font-medium">Motorista Elite • 4.98 ★</p>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate("/vehicle")} className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">directions_car</span>
            </div>
            <div>
              <h3 className="font-bold">Veículo</h3>
              <p className="text-slate-400 text-xs mt-1">Toyota Corolla</p>
            </div>
          </button>
          
          <button onClick={() => navigate("/earnings")} className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">attach_money</span>
            </div>
            <div>
              <h3 className="font-bold">Ganhos</h3>
              <p className="text-slate-400 text-xs mt-1">Configurar métricas</p>
            </div>
          </button>

          <button className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">emoji_events</span>
            </div>
            <div>
              <h3 className="font-bold">Sorteio Semanal</h3>
              <p className="text-slate-400 text-xs mt-1">Participe e ganhe bônus</p>
            </div>
          </button>

          <button className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">groups</span>
            </div>
            <div>
              <h3 className="font-bold">Grupo de Facebook</h3>
              <p className="text-slate-400 text-xs mt-1">Comunidade de motoristas</p>
            </div>
          </button>
        </section>

        <section className="bg-[#1e293b66] rounded-xl p-6 border border-blue-500/10 space-y-4">
          <h4 className="text-[10px] font-bold tracking-wider uppercase text-blue-500">Performance Rápida</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-400">Ganhos</p>
              <p className="text-lg font-bold">R$ 1.240</p>
            </div>
            <div className="text-center border-x border-blue-500/10">
              <p className="text-xs text-slate-400">Horas</p>
              <p className="text-lg font-bold">38h</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Viagens</p>
              <p className="text-lg font-bold">142</p>
            </div>
          </div>
        </section>

        <button onClick={() => navigate("/admin")} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <span className="material-symbols-outlined text-blue-500">admin_panel_settings</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Admin Panel</h3>
            <p className="text-slate-400 text-xs">Acesso administrativo</p>
          </div>
          <span className="material-symbols-outlined text-slate-500">chevron_right</span>
        </button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b66] border-t border-blue-500/10 px-6 py-3 pb-8 flex items-center justify-around">
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">DRIVE</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">STATS</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">memory</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">TECH</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-500 text-white rounded-xl px-3 py-1.5 shadow-lg" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">GEAR</span>
        </a>
      </nav>
    </div>
  );
}
