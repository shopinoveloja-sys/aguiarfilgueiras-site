import { Component, type ErrorInfo, type ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
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
import WorkCalendar from "./pages/WorkCalendar";
import Metrics from "./pages/Metrics";
import "./index.css";

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
          <h1 className="text-xl font-bold text-white mb-2">Nao foi possivel abrir esta tela</h1>
          <p className="text-sm text-slate-400 mb-5">
            Atualize a pagina. Se continuar, entre novamente para renovar sua sessao.
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
                localStorage.removeItem("drivercash_token");
                window.location.href = "/";
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

function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/vehicle" element={<VehicleSettings />} />
          <Route path="/earnings" element={<EarningsSettings />} />
          <Route path="/rides" element={<RideHistory />} />
          <Route path="/kinetic" element={<KineticOverlay />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/add" element={<QuickAdd />} />
          <Route path="/calendar" element={<WorkCalendar />} />
          <Route path="/metrics" element={<Metrics />} />
          <Route path="/map" element={<Metrics />} />
        </Routes>

        <Toaster position="top-center" />
      </BrowserRouter>
    </AppErrorBoundary>
  );
}

export default App;
