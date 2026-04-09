import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-[#0f172a] flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 ring-1 ring-blue-500/30 overflow-hidden">
            <img
              alt="Driver Cash Logo"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida/ADBb0uix-t2e7gzeCwLcr7BUBinDskuZ7__kyqBtAnVXUVbq6F1Plgv5VbJ6ElIpMu9QfxlgRLctoCL7MxyeAFzMkBgHRU1rlTb44kHOWZWiFJke0mseDGy5OZHOZBOgRGPe68LK_XGmHm1DkH0qgDjAL3Nccw6PsDix78PuqxKlRZatY93cGD5ik7yhx5iOJvKLmpdjcdM5xqx7z2y5IUaxFNYxrQ99KYK9qwSjMWktqqeBmMEEcjW_SMfNatUy"
            />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Driver Cash
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Finanças para quem acelera</p>
        </div>

        <div className="bg-[#1e293b66] rounded-xl p-8 shadow-2xl ring-1 ring-blue-500/10">
          <header className="mb-8 text-center">
            <h2 className="text-xl font-bold text-white">Bem-vindo de volta</h2>
            <p className="text-slate-400 text-sm">Acesse sua conta financeira</p>
          </header>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="email">
                E-mail
              </label>
              <div className="relative">
                <input
                  className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                  id="email"
                  placeholder="seu@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="password">
                Senha
              </label>
              <div className="relative">
                <input
                  className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-br from-blue-800 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-[0.98]"
              type="submit"
            >
              Entrar
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-blue-500/10 text-center">
            <p className="text-sm text-slate-400">
              Não possui uma conta?{" "}
              <a className="text-blue-500 font-bold hover:underline underline-offset-4" href="#">
                Criar conta
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 opacity-30 grayscale pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-xs">verified_user</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">Unidade Segura</span>
          </div>
        </div>
      </div>

      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full z-[-1]" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-800/10 blur-[120px] rounded-full z-[-1]" />
    </div>
  );
}
