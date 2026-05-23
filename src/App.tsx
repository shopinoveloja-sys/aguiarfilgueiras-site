import { Component, useState, type ErrorInfo, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { toast } from "sonner";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import VehicleSettings from "./pages/VehicleSettings";
import EarningsSettings from "./pages/EarningsSettings";
import RideHistory from "./pages/RideHistory";
import KineticOverlay from "./pages/KineticOverlay";
import AdminDashboard from "./pages/AdminDashboard";
import Onboarding from "./pages/Onboarding";
import QuickAdd from "./pages/QuickAdd";
import Privacy from "./pages/Privacy";
import WorkCalendar from "./pages/WorkCalendar";
import Metrics from "./pages/Metrics";
import { clearSession, login, saveSession } from "./lib/api";
import "./index.css";

const ADMIN_EMAIL = "shopinove.loja@gmail.com";

class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("DriverCash render error", error, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 text-center">
        <div className="max-w-sm">
          <h1 className="text-xl font-bold text-white mb-2">Não foi possível abrir esta tela</h1>
          <p className="text-sm text-slate-400 mb-5">
            Atualize a página. Se continuar, entre novamente para renovar sua sessão.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold"
              onClick={() => window.location.reload()}
            >
              Atualizar
            </button>
            <button
              type="button"
              className="px-4 py-3 rounded-xl bg-slate-800 text-slate-200 text-sm font-bold"
              onClick={() => {
                clearSession();
                window.location.replace("/");
              }}
            >
              Entrar novamente
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const isDesktopBrowser = () => {
  const nativeApp = Boolean((window as any).__DRIVERCASH_PLAY_APP__ && (window as any).ReactNativeWebView);
  const mobileUserAgent = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const wideViewport = window.matchMedia("(min-width: 900px)").matches;
  return !nativeApp && wideViewport && !mobileUserAgent;
};

function DesktopAppBlocked() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-center text-white">
      <div className="max-w-md rounded-2xl border border-blue-500/20 bg-[#0f172a] p-8 shadow-2xl">
        <img alt="DriverCash" src="/drivercash-logo.svg" className="mx-auto mb-5 h-16 w-16 object-contain" />
        <h1 className="mb-3 text-2xl font-black">DriverCash agora e exclusivo pelo app</h1>
        <p className="mb-6 text-sm leading-6 text-slate-400">
          A area do motorista foi otimizada para uso no celular. No navegador desktop, somente a area administrativa fica disponivel.
        </p>
        <a
          href="/admin"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-bold text-white transition-colors hover:bg-blue-500"
        >
          Acessar area administrativa
        </a>
      </div>
    </div>
  );
}

function AppOnlyRoute({ children }: { children: ReactNode }) {
  return isDesktopBrowser() ? <DesktopAppBlocked /> : <>{children}</>;
}

const readSessionUserEmail = () => {
  try {
    const raw = localStorage.getItem("drivercash_user");
    if (!raw) return "";
    const parsed = JSON.parse(raw);
    return typeof parsed?.email === "string" ? parsed.email.toLowerCase().trim() : "";
  } catch {
    return "";
  }
};

function AdminOnlyRoute() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionEmail = readSessionUserEmail();

  if (sessionEmail === ADMIN_EMAIL) {
    return <AdminDashboard />;
  }

  const handleAdminLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail !== ADMIN_EMAIL) {
      toast.error("Acesso administrativo restrito.");
      return;
    }

    setLoading(true);
    try {
      const session = await login({ email: normalizedEmail, password });
      const userEmail = typeof session?.user?.email === "string" ? session.user.email.toLowerCase().trim() : "";
      if (userEmail !== ADMIN_EMAIL) {
        clearSession();
        toast.error("Este usuario nao tem permissao administrativa.");
        return;
      }
      saveSession(session);
      toast.success("Acesso administrativo liberado.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Nao foi possivel entrar na area administrativa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 text-white">
      <form
        onSubmit={handleAdminLogin}
        className="w-full max-w-md rounded-2xl border border-blue-500/20 bg-[#0f172a] p-8 shadow-2xl"
      >
        <img alt="DriverCash" src="/drivercash-logo.svg" className="mx-auto mb-5 h-16 w-16 object-contain" />
        <h1 className="mb-2 text-center text-2xl font-black">Area administrativa</h1>
        <p className="mb-6 text-center text-sm leading-6 text-slate-400">
          Acesso restrito ao administrador autorizado.
        </p>
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="admin-email">
          E-mail
        </label>
        <input
          id="admin-email"
          className="mb-4 h-12 w-full rounded-xl border border-blue-500/20 bg-[#111827] px-4 text-white outline-none focus:border-blue-500"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400" htmlFor="admin-password">
          Senha
        </label>
        <input
          id="admin-password"
          className="mb-6 h-12 w-full rounded-xl border border-blue-500/20 bg-[#111827] px-4 text-white outline-none focus:border-blue-500"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Entrando..." : "Entrar no admin"}
        </button>
      </form>
    </div>
  );
}

function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppOnlyRoute><Login /></AppOnlyRoute>} />
          <Route path="/dashboard" element={<AppOnlyRoute><Dashboard /></AppOnlyRoute>} />
          <Route path="/profile" element={<AppOnlyRoute><Profile /></AppOnlyRoute>} />
          <Route path="/vehicle" element={<AppOnlyRoute><VehicleSettings /></AppOnlyRoute>} />
          <Route path="/earnings" element={<AppOnlyRoute><EarningsSettings /></AppOnlyRoute>} />
          <Route path="/rides" element={<AppOnlyRoute><RideHistory /></AppOnlyRoute>} />
          <Route path="/kinetic" element={<AppOnlyRoute><KineticOverlay /></AppOnlyRoute>} />
          <Route path="/admin" element={<AdminOnlyRoute />} />
          <Route path="/onboarding" element={<AppOnlyRoute><Onboarding /></AppOnlyRoute>} />
          <Route path="/add" element={<AppOnlyRoute><QuickAdd /></AppOnlyRoute>} />
          <Route path="/calendar" element={<AppOnlyRoute><WorkCalendar /></AppOnlyRoute>} />
          <Route path="/metrics" element={<AppOnlyRoute><Metrics /></AppOnlyRoute>} />
          <Route path="/agent" element={<Navigate to="/dashboard" replace />} />
          <Route path="/map" element={<AppOnlyRoute><Metrics /></AppOnlyRoute>} />
          <Route path="/privacidade" element={<Privacy />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Toaster position="top-center" />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
