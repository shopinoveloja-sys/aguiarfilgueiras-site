import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getDashboardData, getReferralSummary, requestReferralWithdrawal, updateProfile } from "../lib/api";
import { toast } from "sonner";
import { TutorialCta } from "../components/TutorialCta";

interface ReferralData {
  eligible: boolean;
  reason?: string;
  referralCode: string | null;
  referralUrl: string | null;
  totalReferrals: number;
  convertedReferrals: number;
  secondLevelConversions: number;
  confirmedCount: number;
  pendingAmount: number;
  requestedAmount: number;
  paidAmount: number;
  minWithdrawalAmount: number;
  canRequestWithdrawal: boolean;
}

interface DashboardData {
  totalIncomeMonth: number;
  netProfitMonth: number;
  daysWorked: number;
  projectedMonth: number;
}

interface SessionUser {
  name: string;
  email: string;
  phone?: string;
  document?: string;
  avatarUrl?: string | null;
  profileCompletedAt?: string | null;
  phoneVerifiedAt?: string | null;
}

interface VehicleConfig {
  model?: string;
}

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export default function Profile() {
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<ReferralData | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [pixKey, setPixKey] = useState("");
  const [requestedFor, setRequestedFor] = useState("");
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
  const [vehicle, setVehicle] = useState<VehicleConfig | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileAvatar, setProfileAvatar] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    try {
      const storedUser = readStorage("drivercash_user");
      const storedVehicle = readStorage("drivercash_vehicle");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setSessionUser(parsedUser);
      setVehicle(storedVehicle ? JSON.parse(storedVehicle) : null);
      setProfileName(parsedUser?.name || "");
      setProfileAvatar(parsedUser?.avatarUrl || "");
    } catch {
      setSessionUser(null);
      setVehicle(null);
    }

    getReferralSummary()
      .then(setReferrals)
      .catch(() => setReferrals(null));
    getDashboardData()
      .then(setDashboard)
      .catch(() => setDashboard(null));
  }, []);

  const formatMoneyPrecise = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const formatMoney = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

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
    } catch {
      toast.error("Erro ao solicitar saque.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("drivercash_token");
    localStorage.removeItem("drivercash_user");
    localStorage.removeItem("drivercash_access");
    toast.success("Voce saiu da sua conta.");
    navigate("/", { replace: true });
  };

  const handleAvatarChange = (file?: File) => {
    if (!file) return;
    if (file.size > 450_000) {
      toast.error("Escolha uma imagem menor para o perfil.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfileAvatar(String(reader.result || ""));
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = async () => {
    if (!sessionUser) return;
    if (!profileName.trim()) {
      toast.error("Informe seu nome.");
      return;
    }

    setSavingProfile(true);
    try {
      const session = await updateProfile({
        name: profileName.trim(),
        phone: sessionUser.phone || "",
        document: sessionUser.document || "",
        avatarUrl: profileAvatar,
      });
      localStorage.setItem("drivercash_user", JSON.stringify(session.user));
      localStorage.setItem("drivercash_access", JSON.stringify(session.access));
      setSessionUser(session.user);
      setEditingProfile(false);
      toast.success("Perfil atualizado.");
    } catch (error) {
      console.error(error);
      toast.error("Nao foi possivel atualizar o perfil.");
    } finally {
      setSavingProfile(false);
    }
  };

  const userInitial = useMemo(() => (sessionUser?.name?.trim()?.[0] || "D").toUpperCase(), [sessionUser]);
  const profileStatus = sessionUser?.profileCompletedAt
    ? "Cadastro completo"
    : sessionUser?.phoneVerifiedAt
      ? "Cadastro quase pronto"
      : "Complete seu cadastro";

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-lg hover:bg-white/5">
            <span className="material-symbols-outlined text-blue-500">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold">Perfil</h1>
        </div>
        <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-white/5" aria-label="Sair">
          <span className="material-symbols-outlined text-red-400">logout</span>
        </button>
      </header>

      <main className="p-6 space-y-6">
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-blue-500/20 p-1 bg-gradient-to-tr from-blue-800 to-blue-500">
              {sessionUser?.avatarUrl ? (
                <img alt="Foto do perfil" src={sessionUser.avatarUrl} className="w-full h-full rounded-full object-cover bg-[#0f172a]" />
              ) : (
                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-4xl font-black text-blue-300">
                  {userInitial}
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1.5 shadow-lg">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            </div>
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">{sessionUser?.name || "Motorista DriverCash"}</h2>
            <p className="text-slate-400 text-sm font-medium">{profileStatus}</p>
            <p className="text-slate-500 text-xs">{sessionUser?.email || "Sem e-mail carregado"}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <button
              onClick={() => setEditingProfile(true)}
              className="rounded-xl border border-blue-500/20 bg-blue-500/10 px-4 py-3 text-sm font-bold text-blue-200 active:scale-95"
            >
              Editar perfil
            </button>
            <button
              onClick={handleLogout}
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-bold text-red-200 active:scale-95"
            >
              Sair
            </button>
          </div>
        </section>

        <TutorialCta compact />

        {editingProfile && (
          <section className="rounded-xl border border-blue-500/10 bg-[#1e293b66] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white">Editar perfil</h3>
              <button onClick={() => setEditingProfile(false)} className="text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Nome</span>
              <input
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                className="w-full rounded-xl border border-blue-500/20 bg-[#0f172a] p-3 text-sm outline-none focus:border-blue-500"
                placeholder="Seu nome"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleAvatarChange(event.target.files?.[0])}
                className="w-full rounded-xl border border-blue-500/20 bg-[#0f172a] p-3 text-sm text-slate-300"
              />
            </label>
            {profileAvatar ? (
              <button onClick={() => setProfileAvatar("")} className="text-xs font-bold text-red-300">
                Remover foto
              </button>
            ) : null}
            <button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="w-full rounded-xl bg-blue-600 py-3 text-sm font-bold text-white disabled:opacity-60"
            >
              {savingProfile ? "Salvando..." : "Salvar perfil"}
            </button>
          </section>
        )}

        <section className="grid grid-cols-2 gap-4">
          <button onClick={() => navigate("/vehicle")} className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">directions_car</span>
            </div>
            <div>
              <h3 className="font-bold">VeÃ­culo</h3>
              <p className="text-slate-400 text-xs mt-1">{vehicle?.model || "NÃ£o configurado"}</p>
            </div>
          </button>

          <button onClick={() => navigate("/earnings")} className="flex flex-col items-start p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left space-y-3">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <span className="material-symbols-outlined text-blue-500">attach_money</span>
            </div>
            <div>
              <h3 className="font-bold">Ganhos</h3>
              <p className="text-slate-400 text-xs mt-1">Configurar mÃ©tricas</p>
            </div>
          </button>

          <button onClick={() => navigate("/calendar")} className="col-span-2 flex items-center p-5 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors text-left gap-4">
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <span className="material-symbols-outlined text-purple-500">calendar_month</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold">Rotina e Folgas</h3>
              <p className="text-slate-400 text-xs mt-1">Marque seus descansos e planeje suas despesas</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">chevron_right</span>
          </button>

        </section>

        {referrals && (
          <section id="partner-panel" className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white">Indique e Ganhe</p>
                <p className="text-xs text-slate-400">R$ 10 por assinatura direta e R$ 5 no 2o nivel.</p>
              </div>
              <span className="material-symbols-outlined text-emerald-400">group_add</span>
            </div>

            {!referrals.eligible ? (
              <p className="text-xs text-slate-400">{referrals.reason}</p>
            ) : (
              <>
                <div className="bg-[#0f172a] border border-emerald-500/10 rounded-xl p-3">
                  <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Seu codigo</p>
                  <p className="text-xl font-black text-emerald-300">{referrals.referralCode}</p>
                  <p className="text-[11px] text-slate-500 break-all mt-1">{referrals.referralUrl}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0f172a] rounded-xl p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Indicacoes feitas</p>
                    <p className="text-2xl font-black text-white">{referrals.totalReferrals}</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Assinaturas geradas</p>
                    <p className="text-2xl font-black text-emerald-300">{referrals.convertedReferrals}</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500">2o nivel</p>
                    <p className="text-2xl font-black text-blue-300">{referrals.secondLevelConversions}</p>
                  </div>
                  <div className="bg-[#0f172a] rounded-xl p-3">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Saldo disponivel</p>
                    <p className="text-2xl font-black text-amber-300">{formatMoneyPrecise(referrals.pendingAmount)}</p>
                  </div>
                </div>

                <div className="bg-[#0f172a] border border-slate-800 rounded-xl p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-white">Painel do Parceiro</p>
                      <p className="text-xs text-slate-400">
                        Voce recebe R$ 10 no 1o nivel e R$ 5 no 2o nivel quando houver assinatura anual.
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase font-bold text-slate-500">Saque minimo</p>
                      <p className="text-sm font-black text-white">{formatMoneyPrecise(referrals.minWithdrawalAmount)}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-950/50 rounded-xl p-3 text-center">
                      <p className="text-[9px] uppercase font-bold text-slate-500">Saques</p>
                      <p className="text-sm font-black text-amber-300">{formatMoneyPrecise(referrals.requestedAmount)}</p>
                    </div>
                    <div className="bg-slate-950/50 rounded-xl p-3 text-center">
                      <p className="text-[9px] uppercase font-bold text-slate-500">Pago</p>
                      <p className="text-sm font-black text-blue-300">{formatMoneyPrecise(referrals.paidAmount)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-500">Solicitacao de saque</p>
                      <p className="text-xs text-slate-400">
                        {referrals.canRequestWithdrawal
                          ? "Seu saldo ja esta liberado para saque."
                          : `O saque so libera acima de ${formatMoneyPrecise(referrals.minWithdrawalAmount)}.`}
                      </p>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${referrals.canRequestWithdrawal ? "bg-emerald-500/10 text-emerald-300" : "bg-slate-800 text-slate-400"}`}>
                      {referrals.canRequestWithdrawal ? "Liberado" : "Aguardando"}
                    </span>
                  </div>

                  {referrals.canRequestWithdrawal && (
                    <div className="grid gap-2">
                      <input value={pixKey} onChange={(e) => setPixKey(e.target.value)} placeholder="Chave Pix" className="bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-sm text-white" />
                      <input value={requestedFor} onChange={(e) => setRequestedFor(e.target.value)} placeholder="Data desejada para saque (opcional)" className="bg-slate-950/50 border border-slate-700 rounded-xl p-3 text-sm text-white" />
                      <button onClick={handleWithdrawal} className="w-full py-3 rounded-xl bg-emerald-500 text-white text-xs font-bold active:scale-95">Solicitar saque</button>
                    </div>
                  )}
                </div>
              </>
            )}
          </section>
        )}
        <section className="bg-[#1e293b66] rounded-xl p-6 border border-blue-500/10 space-y-4">
          <h4 className="text-[10px] font-bold tracking-wider uppercase text-blue-500">Performance Rapida</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-400">Ganhos</p>
              <p className="text-lg font-bold">{formatMoney(dashboard?.totalIncomeMonth || 0)}</p>
            </div>
            <div className="text-center border-x border-blue-500/10">
              <p className="text-xs text-slate-400">Lucro</p>
              <p className="text-lg font-bold">{formatMoney(dashboard?.netProfitMonth || 0)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-400">Dias</p>
              <p className="text-lg font-bold">{dashboard?.daysWorked || 0}</p>
            </div>
          </div>
        </section>

        <button onClick={() => document.getElementById("partner-panel")?.scrollIntoView({ behavior: "smooth" })} className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#1e293b66] border border-blue-500/10 hover:bg-blue-500/5 transition-colors">
          <div className="bg-blue-500/10 p-2 rounded-lg">
            <span className="material-symbols-outlined text-blue-500">handshake</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white">Painel do Parceiro</h3>
            <p className="text-slate-400 text-xs">Assinantes indicados, saldo e pedidos de saque</p>
          </div>
          <span className="material-symbols-outlined text-slate-500">chevron_right</span>
        </button>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-[#1e293b66] border-t border-blue-500/10 px-6 py-3 pb-8 flex items-center justify-around">
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">explore</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Drive</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Stats</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/metrics"); }}>
          <span className="material-symbols-outlined">speed</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Metricas</span>
        </a>
        <a className="flex flex-col items-center justify-center bg-gradient-to-br from-blue-800 to-blue-500 text-white rounded-xl px-3 py-1.5 shadow-lg" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase tracking-tighter">Gear</span>
        </a>
      </nav>
    </div>
  );
}
