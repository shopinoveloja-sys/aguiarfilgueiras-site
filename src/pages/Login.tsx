import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { googleLogin, login, register, saveSession } from "../lib/api";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
        };
      };
    };
  }
}

export default function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [referralCode, setReferralCode] = useState(() => new URLSearchParams(window.location.search).get("ref") || "");
  const [loading, setLoading] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement | null>(null);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (localStorage.getItem("drivercash_token")) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    if (!googleButtonRef.current) return;

    const initializeGoogle = () => {
      if (!googleClientId) {
        console.warn("VITE_GOOGLE_CLIENT_ID não configurada no ambiente.");
        return;
      }

      window.google?.accounts.id.initialize({
        client_id: googleClientId,
        callback: async (response) => {
          setLoading(true);
          try {
            const session = await googleLogin({
              credential: response.credential,
              phone: phone || undefined,
              document: documentNumber || undefined,
              referralCode: referralCode || undefined,
            });
            saveSession(session);
            toast.success("Autenticação Google realizada com sucesso!");
            navigate("/dashboard");
          } catch (error: any) {
            console.error(error);
            const message = error.response?.data?.message || "Falha na autenticação Google.";
            toast.error(message);
          } finally {
            setLoading(false);
          }
        },
      });

      window.google?.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
        width: googleButtonRef.current.offsetWidth,
        text: mode === "login" ? "signin_with" : "signup_with",
        locale: "pt-BR",
        shape: "pill",
      });
    };

    if (window.google) {
      initializeGoogle();
    } else {
      const script = window.document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogle;
      window.document.body.appendChild(script);
    }
  }, [documentNumber, googleClientId, mode, navigate, phone, referralCode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const session =
        mode === "login"
          ? await login({ email, password })
          : await register({ name, email, password, phone, document: documentNumber, referralCode: referralCode || undefined });

      saveSession(session);
      toast.success(mode === "login" ? "Login realizado com sucesso!" : "Conta criada com 15 dias de teste!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error(mode === "login" ? "E-mail ou senha inválidos." : "Não foi possível criar sua conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-[#0f172a] flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4 ring-1 ring-blue-500/30 overflow-hidden">
            <img
              alt="Driver Cash Logo"
              className="w-full h-full object-contain"
              src="/drivercash-logo.svg"
            />
          </div>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-br from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Driver Cash
          </h1>
          <p className="text-slate-400 text-sm mt-1 font-medium">Finanças para quem acelera</p>
        </div>

        <div className="bg-[#1e293b66] rounded-xl p-8 shadow-2xl ring-1 ring-blue-500/10">
          <header className="mb-8 text-center">
            <h2 className="text-xl font-bold text-white">{mode === "login" ? "Bem-vindo de volta" : "Criar conta"}</h2>
            <p className="text-slate-400 text-sm">
              {mode === "login" ? "Acesse sua conta financeira" : "Crie sua conta e ganhe 15 dias grátis para testar"}
            </p>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {mode === "register" && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="name">
                  Nome
                </label>
                <input
                  className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                  id="name"
                  placeholder="Seu nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {mode === "register" && (
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="phone">
                    Celular
                  </label>
                  <input
                    className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                    id="phone"
                    placeholder="(00) 00000-0000"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="document">
                    CPF/CNPJ
                  </label>
                  <input
                    className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                    id="document"
                    placeholder="Somente números"
                    type="text"
                    value={documentNumber}
                    onChange={(e) => setDocumentNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="referralCode">
                Código de indicação (Opcional)
              </label>
              <input
                className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center uppercase"
                id="referralCode"
                placeholder="CÓDIGO DE INDICAÇÃO"
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
              />
              {!referralCode && mode === "register" && (
                <p className="text-[9px] text-blue-400 text-center animate-pulse">Com indicação, você ainda participa do programa de parceiros.</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="email">
                E-mail
              </label>
              <input
                className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                id="email"
                placeholder="seu@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block w-full text-center" htmlFor="password">
                Senha
              </label>
              <input
                className="w-full bg-[#0f172a] border-transparent focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 transition-all duration-200 outline-none text-center"
                id="password"
                placeholder="********"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button
              className="w-full bg-gradient-to-br from-blue-800 to-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all active:scale-[0.98] disabled:opacity-60"
              type="submit"
              disabled={loading}
            >
              {loading ? "Aguarde..." : mode === "login" ? "Entrar" : "Começar teste grátis"}
            </button>
          </form>

          {googleClientId ? (
            <div className="mt-4 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-blue-500/10"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1e293b] px-2 text-slate-500">Ou continue com</span>
                </div>
              </div>
              <div ref={googleButtonRef} className="w-full flex justify-center" />
            </div>
          ) : (
            <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-center">
              <p className="text-amber-500 text-xs font-medium">
                Google Auth não configurado. Adicione VITE_GOOGLE_CLIENT_ID no Coolify.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-blue-500/10 text-center">
            <p className="text-sm text-slate-400">
              {mode === "login" ? "Não possui uma conta?" : "Já possui uma conta?"}{" "}
              <button
                type="button"
                className="text-blue-500 font-bold hover:underline underline-offset-4"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
              >
                {mode === "login" ? "Criar conta" : "Entrar"}
              </button>
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
