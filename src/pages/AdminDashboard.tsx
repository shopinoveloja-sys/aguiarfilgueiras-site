import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminSummary } from "../lib/api";

type AdminSummary = {
  totalUsers: number;
  activeSubscriptions: number;
  trialSubscriptions: number;
  pendingSubscriptions: number;
  churnThisMonth: number;
  revenueThisMonth: number;
  approvedPaymentsThisMonth: number;
  totalRevenue: number;
  totalApprovedPayments: number;
  pendingCommissionsAmount: number;
  pendingCommissionsCount: number;
  pendingWithdrawals: Array<{
    id: string;
    userName: string;
    userEmail: string;
    amount: number;
    pixKey: string;
    requestedFor?: string | null;
    createdAt: string;
  }>;
  latestSubscriptions: Array<{
    id: string;
    userName: string;
    userEmail: string;
    plan: string;
    status: string;
    value: number;
    updatedAt: string;
  }>;
  userGrowthLast7Days: Array<{ date: string; users: number }>;
  generatedAt: string;
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const number = new Intl.NumberFormat("pt-BR");

const statusLabel: Record<string, string> = {
  ACTIVE: "Ativa",
  TRIALING: "Teste",
  PENDING: "Pendente",
  EXPIRED: "Expirada",
  CANCELED: "Cancelada",
};

function timeAgo(value: string) {
  const diffMs = Date.now() - new Date(value).getTime();
  const minutes = Math.max(0, Math.floor(diffMs / 60000));
  if (minutes < 1) return "agora";
  if (minutes < 60) return `ha ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `ha ${hours}h`;
  const days = Math.floor(hours / 24);
  return `ha ${days}d`;
}

function StatCard({
  icon,
  label,
  value,
  hint,
  accent = "blue",
}: {
  icon: string;
  label: string;
  value: string;
  hint?: string;
  accent?: "blue" | "green" | "red" | "yellow";
}) {
  const color = {
    blue: "text-blue-500 bg-blue-500/10 border-l-blue-500",
    green: "text-emerald-400 bg-emerald-500/10 border-l-emerald-400",
    red: "text-red-400 bg-red-500/10 border-l-red-400",
    yellow: "text-yellow-300 bg-yellow-500/10 border-l-yellow-300",
  }[accent];

  return (
    <div className={`bg-[#1e293b66] p-6 rounded-2xl shadow-xl border-l-4 ${color.split(" ")[2]}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg ${color.split(" ").slice(0, 2).join(" ")}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        {hint ? <span className={`text-xs font-bold px-2 py-1 rounded-full ${color.split(" ").slice(0, 2).join(" ")}`}>{hint}</span> : null}
      </div>
      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
      <h3 className="text-3xl font-black">{value}</h3>
    </div>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    getAdminSummary()
      .then((data) => {
        if (mounted) {
          setSummary(data);
          setError("");
        }
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError("Nao foi possivel carregar os dados reais do admin.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const growthPath = useMemo(() => {
    const points = summary?.userGrowthLast7Days || [];
    if (!points.length) return "M0,170 L800,170";
    const max = Math.max(1, ...points.map((point) => point.users));
    return points
      .map((point, index) => {
        const x = (800 / Math.max(1, points.length - 1)) * index;
        const y = 170 - (point.users / max) * 120;
        return `${index === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  }, [summary]);

  const logout = () => {
    localStorage.removeItem("drivercash_token");
    localStorage.removeItem("drivercash_user");
    localStorage.removeItem("drivercash_access");
    navigate("/admin");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <header className="fixed top-0 w-full z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 shadow-xl flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/admin")} className="text-slate-400 hover:text-blue-400">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <img alt="Driver Cash Logo" className="w-8 h-8 object-contain" src="/drivercash-logo.svg" />
          <h1 className="text-lg font-bold bg-gradient-to-br from-blue-800 to-blue-500 bg-clip-text text-transparent">DriverCash Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs font-medium text-slate-400 hidden md:block">shopinove.loja@gmail.com</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">AD</div>
        </div>
      </header>

      <aside className="hidden md:flex h-full w-64 fixed left-0 top-0 bg-[#020617] border-r border-blue-500/10 shadow-2xl flex-col p-4 pt-20 gap-2 z-40">
        <div className="flex items-center gap-3 px-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#1e293b] flex items-center justify-center border border-blue-500/20">
            <span className="material-symbols-outlined text-blue-500">shield_person</span>
          </div>
          <div>
            <p className="text-sm font-bold">Cash Admin</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Dados reais da plataforma</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-gradient-to-br from-blue-800 to-blue-500 text-white rounded-xl shadow-lg" href="#">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </a>
        </nav>
        <div className="mt-auto border-t border-blue-500/10 pt-4">
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-colors">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-medium">Sair</span>
          </button>
        </div>
      </aside>

      <main className="md:pl-64 pt-24 pb-24 md:pb-8 px-6 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {loading ? (
            <div className="rounded-2xl bg-[#1e293b66] p-8 text-slate-300">Carregando dados reais...</div>
          ) : error ? (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-8 text-red-200">{error}</div>
          ) : summary ? (
            <>
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon="person" label="Total de usuarios" value={number.format(summary.totalUsers)} hint={`${summary.trialSubscriptions} em teste`} />
                <StatCard icon="verified" label="Assinaturas ativas" value={number.format(summary.activeSubscriptions)} hint={`${summary.pendingSubscriptions} pendentes`} accent="green" />
                <StatCard icon="account_balance_wallet" label="Faturamento do mes" value={money.format(summary.revenueThisMonth)} hint={`${summary.approvedPaymentsThisMonth} pagamentos`} />
                <StatCard icon="trending_down" label="Churn no mes" value={number.format(summary.churnThisMonth)} hint="canceladas/expiradas" accent="red" />
              </section>

              <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard icon="payments" label="Faturamento total aprovado" value={money.format(summary.totalRevenue)} hint={`${summary.totalApprovedPayments} pagamentos`} accent="yellow" />
                <StatCard icon="handshake" label="Comissoes pendentes" value={money.format(summary.pendingCommissionsAmount)} hint={`${summary.pendingCommissionsCount} itens`} accent="green" />
                <StatCard icon="request_quote" label="Saques pendentes" value={number.format(summary.pendingWithdrawals.length)} hint="parceiros" accent="yellow" />
              </section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#1e293b66] p-8 rounded-2xl relative overflow-hidden">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <h2 className="text-xl font-bold mb-1">Crescimento de usuarios</h2>
                      <p className="text-sm text-slate-500">Novas contas nos ultimos 7 dias</p>
                    </div>
                  </div>
                  <div className="relative h-64 w-full">
                    <svg className="w-full h-full" viewBox="0 0 800 200">
                      <defs>
                        <linearGradient id="admin-growth-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: "rgba(59, 130, 246, 0.4)" }} />
                          <stop offset="100%" style={{ stopColor: "rgba(59, 130, 246, 0)" }} />
                        </linearGradient>
                      </defs>
                      <path d={`${growthPath} L800,200 L0,200 Z`} fill="url(#admin-growth-gradient)" />
                      <path d={growthPath} fill="none" stroke="#3b82f6" strokeLinecap="round" strokeWidth="4" />
                    </svg>
                  </div>
                </div>

                <div className="bg-[#1e293b66] rounded-2xl flex flex-col">
                  <div className="p-6 border-b border-blue-500/10">
                    <h2 className="text-lg font-bold">Ultimas assinaturas</h2>
                  </div>
                  <div className="p-2 flex-grow overflow-y-auto max-h-[400px]">
                    {summary.latestSubscriptions.length === 0 ? (
                      <p className="p-4 text-sm text-slate-500">Nenhuma assinatura registrada.</p>
                    ) : (
                      summary.latestSubscriptions.map((subscription) => (
                        <div key={subscription.id} className="flex items-center justify-between p-4 hover:bg-slate-800/30 rounded-xl transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                              <span className="material-symbols-outlined text-blue-500">person</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold">{subscription.userName}</p>
                              <p className="text-[10px] text-slate-500">{statusLabel[subscription.status] || subscription.status} - {timeAgo(subscription.updatedAt)}</p>
                            </div>
                          </div>
                          <span className="text-sm font-black text-blue-500">{subscription.value > 0 ? money.format(subscription.value) : subscription.plan}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <section className="bg-[#1e293b66] p-6 rounded-2xl">
                <h2 className="text-lg font-bold mb-4">Pedidos de saque pendentes</h2>
                {summary.pendingWithdrawals.length === 0 ? (
                  <p className="text-sm text-slate-500">Nenhum saque pendente no momento.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-xs uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="py-3">Parceiro</th>
                          <th className="py-3">Valor</th>
                          <th className="py-3">PIX</th>
                          <th className="py-3">Pedido</th>
                        </tr>
                      </thead>
                      <tbody>
                        {summary.pendingWithdrawals.map((withdrawal) => (
                          <tr key={withdrawal.id} className="border-t border-blue-500/10">
                            <td className="py-3">
                              <p className="font-bold">{withdrawal.userName}</p>
                              <p className="text-xs text-slate-500">{withdrawal.userEmail}</p>
                            </td>
                            <td className="py-3 text-yellow-300 font-bold">{money.format(withdrawal.amount)}</td>
                            <td className="py-3 text-slate-300">{withdrawal.pixKey}</td>
                            <td className="py-3 text-slate-500">{timeAgo(withdrawal.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
}
