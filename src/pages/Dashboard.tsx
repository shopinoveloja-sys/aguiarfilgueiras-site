import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { createAnnualCheckout, getDashboardData, getRecurringExpenses, getReferralSummary, requestReferralWithdrawal, sendPhoneCode, updateProfile, verifyPhoneCode, redeemReferralCode } from "../lib/api";
import { toast } from "sonner";

interface DashboardData {
  totalIncomeMonth: number;
  totalExpenseMonth: number;
  netProfitMonth: number;
  daysWorked: number;
  daysRemaining: number;
  averageGoalMonth: number;
  bestGoalMonth: number;
  projectedMonth: number;
  dailyGoalTodayAverage: number;
  dailyGoalTodayBest: number;
  performanceStatus: 'below_average' | 'on_track' | 'above_average';
  incomeByCategory: CategorySummary[];
  expenseByCategory: CategorySummary[];
  todayKm: {
    kmStart: number;
    kmEnd: number;
    kmTotal: number;
    incomePerKm: number;
  } | null;
  chartData: {
    labels: number[];
    averageLine: number[];
    bestLine: number[];
    projectionLine: number[];
  };
}

interface CategorySummary {
  category: string;
  total: number;
  percentage: number;
}

interface PlanningData {
  summary?: {
    requiredPerDay: number;
  };
  expenses?: unknown[];
}

interface AccessData {
  status: "TRIALING" | "ACTIVE" | "EXPIRED";
  daysRemaining: number;
  annualPrice: number;
}

interface ReferralData {
  eligible: boolean;
  reason?: string;
  referralCode: string;
  referralUrl: string | null;
  confirmedCount: number;
  pendingAmount: number;
  requestedAmount: number;
  paidAmount: number;
}

interface SessionUser {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  phoneVerifiedAt?: string | null;
  profileCompletedAt?: string | null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [planning, setPlanning] = useState<PlanningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [previousBalance, setPreviousBalance] = useState("");
  const [referrals, setReferrals] = useState<ReferralData | null>(null);
  const [pixKey, setPixKey] = useState("");
  const [requestedFor, setRequestedFor] = useState("");
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(() => {
    const saved = localStorage.getItem("drivercash_user");
    return saved ? JSON.parse(saved) : null;
  });
  const [profileName, setProfileName] = useState(() => sessionUser?.name || "");
  const [profilePhone, setProfilePhone] = useState(() => sessionUser?.phone || "");
  const [profileDocument, setProfileDocument] = useState(() => sessionUser?.document || "");
  const [smsCode, setSmsCode] = useState("");
  const [access, setAccess] = useState<AccessData | null>(() => {
    const saved = localStorage.getItem("drivercash_access");
    return saved ? JSON.parse(saved) : null;
  });

  const [redeemCode, setRedeemCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  
  useEffect(() => {
    async function loadData() {
      try {
        const dashboard = await getDashboardData();
        setData(dashboard);
        try {
          const planData = await getRecurringExpenses();
          setPlanning(planData);
        } catch (e) {}
        try {
          const referralData = await getReferralSummary();
          setReferrals(referralData);
        } catch (e) {}
      } catch (error) {
        console.error("Failed to load dashboard data", error);
        setErrorMessage("Erro ao carregar os dados do painel. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) return;
    setRedeeming(true);
    try {
      const session = await redeemReferralCode(redeemCode.trim().toUpperCase());
      localStorage.setItem("drivercash_access", JSON.stringify(session.access));
      setAccess(session.access as AccessData);
      toast.success("Código resgatado! Você ganhou 15 dias de teste.");
      // Reload to refresh all limits
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao resgatar código.");
    } finally {
      setRedeeming(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center flex-col text-center p-4">
        <div className="text-red-400 text-lg font-bold mb-4">{errorMessage}</div>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data) return null;

  const performanceLabel = {
    below_average: { text: "Abaixo da Média", color: "text-red-400", bg: "bg-red-500/10" },
    on_track: { text: "No Caminho", color: "text-blue-400", bg: "bg-blue-500/10" },
    above_average: { text: "Acima da Média", color: "text-emerald-400", bg: "bg-emerald-500/10" }
  }[data.performanceStatus || 'on_track'];

  const handleSaveBalance = async () => {
    const val = parseInt(previousBalance, 10) / 100;
    if (val > 0) {
      try {
        const { createTransaction } = await import("../lib/api");
        await createTransaction({
          type: "INCOME",
          value: val,
          category: "SALDO_ANTERIOR",
          description: "Saldo anterior ao começar a usar o app",
          date: new Date().toISOString()
        });
        setShowBalanceModal(false);
        setPreviousBalance("");
        window.location.reload();
      } catch (e) {
        toast.error("Erro ao salvar saldo anterior.");
      }
    }
  };

  const formatBalanceInput = (val: string) => {
    if (!val) return "0,00";
    const num = parseInt(val, 10);
    return (num / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatMoney = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

  const formatMoneyPrecise = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatCategory = (category: string) =>
    category.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());

  const handleSubscribe = async () => {
    try {
      const checkout = await createAnnualCheckout();
      window.location.href = checkout.mercadoPagoCheckoutUrl;
    } catch (e) {
      toast.error("Erro ao iniciar checkout.");
    }
  };

  const handleWithdrawal = async () => {
    if (!pixKey.trim()) return;
    try {
      const withdrawal = await requestReferralWithdrawal({
        pixKey: pixKey.trim(),
        requestedFor: requestedFor || undefined,
      });
      setPixKey("");
      setRequestedFor("");
      setReferrals((current) => current ? {
        ...current,
        pendingAmount: 0,
        requestedAmount: current.requestedAmount + withdrawal.amount,
      } : current);
      toast.success("Pedido de saque realizado!");
    } catch (e) {
      toast.error("Erro ao solicitar saque.");
    }
  };

  const persistUser = (session: any) => {
    localStorage.setItem("drivercash_user", JSON.stringify(session.user));
    localStorage.setItem("drivercash_access", JSON.stringify(session.access));
    setSessionUser(session.user);
    setAccess(session.access);
  };

  const handleProfileSave = async () => {
    try {
      const session = await updateProfile({ name: profileName, phone: profilePhone, document: profileDocument });
      persistUser(session);
      toast.success("Perfil atualizado! Enviando código SMS...");
      await sendPhoneCode();
    } catch (e) {
      toast.error("Erro ao atualizar perfil.");
    }
  };

  const handleSendCode = async () => {
    try {
      await sendPhoneCode();
      toast.success("Código enviado por SMS.");
    } catch (e) {
      toast.error("Erro ao enviar SMS.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const session = await verifyPhoneCode(smsCode);
      persistUser(session);
      const referralData = await getReferralSummary();
      setReferrals(referralData);
      toast.success("Celular verificado com sucesso!");
    } catch (e) {
      toast.error("Código inválido ou expirado.");
    }
  };

  const projectionMessage =
    data.projectedMonth >= data.bestGoalMonth && data.bestGoalMonth > 0
      ? "Ritmo para igualar ou superar seu melhor cenario."
      : data.projectedMonth >= data.averageGoalMonth && data.averageGoalMonth > 0
        ? "Voce esta perto da media esperada para o mes."
        : "Voce esta abaixo da media esperada para o mes.";

  const projectionChart = data.chartData.labels.map((label, index) => ({
    day: label,
    media: data.chartData.averageLine[index],
    recorde: data.chartData.bestLine[index],
    projecao: data.chartData.projectionLine[index],
  }));

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      {/* Saldo Anterior Modal */}
      {showBalanceModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-end justify-center" onClick={() => setShowBalanceModal(false)}>
          <div className="bg-[#0f172a] w-full max-w-lg rounded-t-[32px] p-6 border-t border-blue-500/10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-bold text-white mb-2">Saldo Anterior</h3>
            <p className="text-xs text-slate-400 mb-5">Informe quanto você já ganhou neste mês antes de usar o app.</p>
            <div className="flex items-baseline justify-center gap-2 mb-6 py-4">
              <span className="text-2xl font-bold text-slate-500">R$</span>
              <span className="text-5xl font-black text-emerald-400">{formatBalanceInput(previousBalance)}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => setPreviousBalance(p => p.length < 8 ? p + n : p)} className="h-12 rounded-xl bg-[#1e293b] text-xl font-bold text-white active:scale-95">{n}</button>
              ))}
              <button onClick={() => setPreviousBalance(p => p + "00")} className="h-12 rounded-xl bg-[#1e293b] text-lg font-bold text-white active:scale-95">00</button>
              <button onClick={() => setPreviousBalance(p => p.length < 8 ? p + "0" : p)} className="h-12 rounded-xl bg-[#1e293b] text-xl font-bold text-white active:scale-95">0</button>
              <button onClick={() => setPreviousBalance(p => p.slice(0,-1))} className="h-12 rounded-xl bg-[#1e293b] text-slate-400 flex items-center justify-center active:scale-95">
                <span className="material-symbols-outlined">backspace</span>
              </button>
            </div>
            <button onClick={handleSaveBalance} className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 font-bold text-white shadow-lg active:scale-95">
              CONFIRMAR SALDO
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 overflow-hidden">
            <img className="w-full h-full object-cover" src={`https://avatar.vercel.sh/${sessionUser?.email || 'driver'}`} alt="Profile" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Bem-vindo,</p>
            <p className="text-base font-bold">{sessionUser?.name.split(' ')[0] || 'Motorista'}</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-blue-500/10 text-blue-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {access && access.status !== "ACTIVE" && (
          <section className="mb-6 space-y-4">
            <div className={`border rounded-xl p-4 flex flex-col gap-4 ${access.status === "EXPIRED" ? "bg-red-500/10 border-red-500/20" : "bg-emerald-500/10 border-emerald-500/20"}`}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">
                    {access.status === "EXPIRED" ? "Teste expirado" : `Teste gratis: ${access.daysRemaining} dia(s) restantes`}
                  </p>
                  <p className="text-xs text-slate-400">Assinatura anual por R$ {access.annualPrice}.</p>
                </div>
                <button
                  onClick={handleSubscribe}
                  className="shrink-0 px-4 py-2 rounded-xl bg-emerald-500 text-white text-xs font-bold active:scale-95"
                >
                  Assinar
                </button>
              </div>

              {access.status === "EXPIRED" || access.daysRemaining <= 0 ? (
                <div className="pt-4 border-t border-white/5">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Tem um código de indicação?</p>
                  <div className="flex gap-2">
                    <input
                      value={redeemCode}
                      onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                      placeholder="CÓDIGO"
                      className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500 transition-all uppercase"
                    />
                    <button
                      onClick={handleRedeemCode}
                      disabled={redeeming || !redeemCode}
                      className="px-4 py-2 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold rounded-lg border border-emerald-500/30 hover:bg-emerald-500/30 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {redeeming ? "..." : "RESGATAR"}
                    </button>
                  </div>
                  <p className="text-[9px] text-slate-500 mt-2">
                    Peça o código a quem te indicou para ganhar 15 dias extras de teste.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {referrals && (
          <section className="mb-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-sm font-bold text-white">Indique e Ganhe</p>
                  <p className="text-xs text-slate-400">R$ 10 por assinatura direta e R$ 5 no nível 2.</p>
                </div>
                <span className="material-symbols-outlined text-emerald-400">group_add</span>
              </div>

              {!referrals.eligible ? (
                <div className="space-y-3">
                  <p className="text-xs text-slate-400">{referrals.reason}</p>
                  <div className="grid gap-2">
                    <input value={profileName} onChange={(e) => setProfileName(e.target.value)} placeholder="Nome completo" className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-sm text-white" />
                    <input value={profilePhone} onChange={(e) => setProfilePhone(e.target.value)} placeholder="Celular" className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-sm text-white" />
                    <input value={profileDocument} onChange={(e) => setProfileDocument(e.target.value)} placeholder="CPF/CNPJ" className="bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-sm text-white" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <button onClick={handleProfileSave} className="w-full py-3 rounded-xl bg-blue-500 text-white text-xs font-bold active:scale-95">Salvar e enviar SMS</button>
                    <div className="flex gap-2">
                      <input value={smsCode} onChange={(e) => setSmsCode(e.target.value)} placeholder="Código SMS" className="flex-1 bg-[#0f172a] border border-slate-700 rounded-xl p-3 text-sm text-white" />
                      <button onClick={handleVerifyCode} className="px-4 py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold active:scale-95">Verificar</button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-[#0f172a] border border-emerald-500/10 rounded-xl p-3 mb-4">
                    <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Seu código</p>
                    <p className="text-xl font-black text-emerald-300">{referrals.referralCode}</p>
                    <p className="text-[11px] text-slate-500 break-all mt-1">{referrals.referralUrl}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#0f172a] rounded-xl p-2 text-center">
                      <p className="text-[8px] uppercase font-bold text-slate-500">Saldo</p>
                      <p className="text-sm font-black text-emerald-300">{formatMoneyPrecise(referrals.pendingAmount)}</p>
                    </div>
                    <div className="bg-[#0f172a] rounded-xl p-2 text-center">
                      <p className="text-[8px] uppercase font-bold text-slate-500">Saques</p>
                      <p className="text-sm font-black text-amber-300">{formatMoneyPrecise(referrals.requestedAmount)}</p>
                    </div>
                    <div className="bg-[#0f172a] rounded-xl p-2 text-center">
                      <p className="text-[8px] uppercase font-bold text-slate-500">Pago</p>
                      <p className="text-sm font-black text-blue-300">{formatMoneyPrecise(referrals.paidAmount)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        <section className="mb-6">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xl font-bold">Resumo Mensal</h2>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${performanceLabel.bg} ${performanceLabel.color} uppercase tracking-wider`}>
              {performanceLabel.text}
            </span>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 mb-4 relative overflow-hidden">
            <p className="text-slate-400 text-xs uppercase font-bold mb-2">Ganhos do Mês</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-blue-400">{formatMoney(data.totalIncomeMonth)}</span>
              <span className="text-sm font-medium text-blue-400 flex items-center">
                Proj: {formatMoney(data.projectedMonth)}
              </span>
            </div>
          </div>

          <button onClick={() => setShowBalanceModal(true)} className="w-full flex items-center gap-3 bg-[#1e293b44] border border-dashed border-slate-700 rounded-xl p-3 mb-4 hover:bg-slate-800/50 transition-colors">
            <span className="material-symbols-outlined text-slate-500 text-lg">account_balance_wallet</span>
            <span className="text-xs text-slate-500">Saldo anterior: <b className="text-slate-300">Ajustar aqui</b></span>
          </button>

          <div className="bg-[#1e293b66] rounded-xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-slate-400">Meta: {formatMoney(data.averageGoalMonth)}</span>
              <span className="text-sm font-bold text-blue-400">
                {data.averageGoalMonth > 0 ? Math.round((data.totalIncomeMonth / data.averageGoalMonth) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2.5">
              <div className="bg-blue-400 h-2.5 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)] transition-all" style={{ width: `${Math.min(data.averageGoalMonth > 0 ? (data.totalIncomeMonth / data.averageGoalMonth) * 100 : 0, 100)}%` }} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Trabalhados</p>
              <p className="text-xl font-bold">{data.daysWorked} dias</p>
            </div>
            <div className="bg-[#1e293b66] border border-blue-500/10 rounded-xl p-4">
              <p className="text-[10px] font-bold uppercase text-slate-400 mb-1">Restantes</p>
              <p className="text-xl font-bold">{data.daysRemaining} dias</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Metas Hoje</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Média</p>
              <p className="text-2xl font-black text-blue-400">{formatMoney(data.dailyGoalTodayAverage)}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-4">
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Recorde</p>
              <p className="text-2xl font-black text-emerald-400">{formatMoney(data.dailyGoalTodayBest)}</p>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-sm font-bold text-white mb-4 text-center">Progresso Mensal</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={projectionChart} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
                  <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#1e293b" }} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} width={54} tickFormatter={(value) => `R$ ${value}`} />
                  <Tooltip contentStyle={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="media" name="Média" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="recorde" name="Recorde" stroke="#34d399" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="projecao" name="Projeção" stroke="#f59e0b" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {planning?.summary && planning.summary.requiredPerDay > 0 && (
          <section className="mb-6">
            <div onClick={() => navigate('/calendar')} className="bg-gradient-to-br from-amber-500/10 border border-amber-500/20 rounded-xl p-5 cursor-pointer active:scale-[0.98]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400">savings</span>
                  <h3 className="text-xs font-bold uppercase text-amber-300">Reserva Diária</h3>
                </div>
                <span className="material-symbols-outlined text-slate-500 text-sm">chevron_right</span>
              </div>
              <p className="text-3xl font-black text-amber-400">{formatMoneyPrecise(planning.summary.requiredPerDay)}</p>
              <p className="text-[9px] text-slate-500 mt-1 font-medium">Separe hoje para cobrir suas despesas fixas.</p>
            </div>
          </section>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b66] backdrop-blur-md border-t border-blue-500/10 px-6 py-3 pb-8 flex items-center justify-around">
        <a className="flex flex-col items-center gap-1 text-blue-400" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
          <span className="text-[10px] font-bold uppercase">Hoje</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/rides"); }}>
          <span className="material-symbols-outlined">history</span>
          <span className="text-[10px] font-bold uppercase">Histórico</span>
        </a>
        <a className="relative -top-8" href="#" onClick={(e) => { e.preventDefault(); navigate("/add"); }}>
          <button className="size-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-white ring-4 ring-[#020617] active:scale-95">
            <span className="material-symbols-outlined text-4xl">add</span>
          </button>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/map"); }}>
          <span className="material-symbols-outlined">map</span>
          <span className="text-[10px] font-bold uppercase">Mapa</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase">Ajustes</span>
        </a>
      </nav>
    </div>
  );
}
