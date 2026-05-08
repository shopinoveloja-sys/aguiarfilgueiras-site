import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { createAnnualCheckout, getDashboardData, getRecurringExpenses, getReferralSummary, redeemReferralCode, updateTransaction, deleteTransaction, updateRecurringExpense, deleteRecurringExpense } from "../lib/api";
import { toast } from "sonner";

interface DashboardData {
  totalIncomeMonth: number;
  totalExpenseMonth: number;
  netProfitMonth: number;
  todayIncome: number;
  todayExpense: number;
  todayProfit: number;
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

interface EditableExpenseItem {
  id: string;
  kind: "transaction" | "recurring";
  value: number;
  date: string;
  createdAt?: string;
  description: string;
  recurrenceType?: "MONTHLY" | "WEEKLY" | "SPECIFIC_DATE";
  dueDay?: number | null;
  dueDayOfWeek?: number | null;
  dueDate?: string | null;
}

type CategoryPeriod = "day" | "week" | "month";

interface PlanningData {
  summary?: {
    requiredPerDay: number;
    totalAccumulated: number;
    plannedToDate?: number;
    totalExpense: number;
    remainingAmount: number;
  };
  expenses?: unknown[];
  todayTransactionAmount?: number;
}

interface PlanningExpenseItem {
  id: string;
  name: string;
  recurrenceType?: "MONTHLY" | "WEEKLY" | "SPECIFIC_DATE";
  isDueToday?: boolean;
  remainingAmount?: number;
  requiredPerDay?: number;
  totalExpense?: number;
  accumulated?: number;
  reservedToDate?: number;
  progressPercentage?: number;
  payableAmount?: number;
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

const toInputDate = (value?: string | null) => (value ? value.split("T")[0] : "");

const emptyChartData: DashboardData["chartData"] = {
  labels: [],
  averageLine: [],
  bestLine: [],
  projectionLine: [],
};

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const toCategoryList = (value: unknown): CategorySummary[] => {
  if (!Array.isArray(value)) return [];
  return value.map((item: Partial<CategorySummary>) => ({
    category: typeof item.category === "string" && item.category.trim() ? item.category : "OUTROS",
    total: toNumber(item.total),
    percentage: toNumber(item.percentage),
  }));
};

function normalizeDashboardData(value: Partial<DashboardData> | null | undefined): DashboardData {
  const chart = value?.chartData;
  return {
    totalIncomeMonth: toNumber(value?.totalIncomeMonth),
    totalExpenseMonth: toNumber(value?.totalExpenseMonth),
    netProfitMonth: toNumber(value?.netProfitMonth),
    todayIncome: toNumber(value?.todayIncome),
    todayExpense: toNumber(value?.todayExpense),
    todayProfit: toNumber(value?.todayProfit),
    daysWorked: toNumber(value?.daysWorked),
    daysRemaining: toNumber(value?.daysRemaining),
    averageGoalMonth: toNumber(value?.averageGoalMonth),
    bestGoalMonth: toNumber(value?.bestGoalMonth),
    projectedMonth: toNumber(value?.projectedMonth),
    dailyGoalTodayAverage: toNumber(value?.dailyGoalTodayAverage),
    dailyGoalTodayBest: toNumber(value?.dailyGoalTodayBest),
    performanceStatus: value?.performanceStatus || "on_track",
    incomeByCategory: toCategoryList(value?.incomeByCategory),
    expenseByCategory: toCategoryList(value?.expenseByCategory),
    todayKm: value?.todayKm
      ? {
          kmStart: toNumber(value.todayKm.kmStart),
          kmEnd: toNumber(value.todayKm.kmEnd),
          kmTotal: toNumber(value.todayKm.kmTotal),
          incomePerKm: toNumber(value.todayKm.incomePerKm),
        }
      : null,
    chartData: {
      labels: Array.isArray(chart?.labels) ? chart.labels.map(toNumber) : emptyChartData.labels,
      averageLine: Array.isArray(chart?.averageLine) ? chart.averageLine.map(toNumber) : emptyChartData.averageLine,
      bestLine: Array.isArray(chart?.bestLine) ? chart.bestLine.map(toNumber) : emptyChartData.bestLine,
      projectionLine: Array.isArray(chart?.projectionLine) ? chart.projectionLine.map(toNumber) : emptyChartData.projectionLine,
    },
  };
}

function safeParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function readStorage(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseSessionUser(value: string | null): SessionUser | null {
  const parsed = safeParse<Partial<SessionUser>>(value);
  if (!parsed || typeof parsed.name !== "string" || typeof parsed.email !== "string") {
    return null;
  }
  return parsed as SessionUser;
}

function parseAccess(value: string | null): AccessData | null {
  const parsed = safeParse<Partial<AccessData>>(value);
  if (!parsed || typeof parsed.status !== "string" || typeof parsed.daysRemaining !== "number") {
    return null;
  }
  return parsed as AccessData;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardData | null>(null);
  const [planning, setPlanning] = useState<PlanningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [previousBalance, setPreviousBalance] = useState("");
  const [balanceNegative, setBalanceNegative] = useState(false);
  const [editCategory, setEditCategory] = useState<CategorySummary | null>(null);
  const [editTransactions, setEditTransactions] = useState<EditableExpenseItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editRecurringType, setEditRecurringType] = useState<EditableExpenseItem["recurrenceType"]>("MONTHLY");
  const [editRecurringDueDay, setEditRecurringDueDay] = useState("1");
  const [editRecurringDueDayOfWeek, setEditRecurringDueDayOfWeek] = useState("0");
  const [editRecurringDueDate, setEditRecurringDueDate] = useState("");
  const [editIncomeCategory, setEditIncomeCategory] = useState<CategorySummary | null>(null);
  const [editIncomeTransactions, setEditIncomeTransactions] = useState<Array<{ id: string; value: number; date: string; description: string }>>([]);
  const [categoryPeriod, setCategoryPeriod] = useState<CategoryPeriod>("month");
  const [referrals, setReferrals] = useState<ReferralData | null>(null);
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(() => {
    return parseSessionUser(readStorage("drivercash_user"));
  });
  const [access, setAccess] = useState<AccessData | null>(() => {
    return parseAccess(readStorage("drivercash_access"));
  });

  const [redeemCode, setRedeemCode] = useState("");
  const [redeeming, setRedeeming] = useState(false);
  const [payingExpenseId, setPayingExpenseId] = useState<string | null>(null);
  const [paidTodayExpenses, setPaidTodayExpenses] = useState<Array<{ id: string; name: string; amount: number }>>([]);
  
  const loadDashboard = async () => {
    try {
      const dashboard = await getDashboardData(categoryPeriod);
      setData(normalizeDashboardData(dashboard));
      try {
        const planData = await getRecurringExpenses();
        setPlanning(planData);
      } catch (e) {}
    } catch (error) {
      console.error("Failed to load dashboard data", error);
      setErrorMessage("Erro ao carregar os dados do painel. Por favor, tente novamente.");
    }
  };

  useEffect(() => {
    async function init() {
      await loadDashboard();
      try {
        const referralData = await getReferralSummary();
        setReferrals(referralData);
      } catch (e) {}
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadDashboard();
    }
  }, [categoryPeriod]);

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) return;
    setRedeeming(true);
    try {
      const session = await redeemReferralCode(redeemCode.trim().toUpperCase());
      localStorage.setItem("drivercash_access", JSON.stringify(session.access));
      setAccess(session.access as AccessData);
      toast.success("CÃƒÂ³digo resgatado! VocÃƒÂª ganhou 15 dias de teste.");
      // Reload to refresh all limits
      window.location.reload();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao resgatar cÃƒÂ³digo.");
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

  const firstName = sessionUser?.name?.trim().split(/\s+/)[0] || "Motorista";

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

  if (!data) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center flex-col text-center p-4">
        <div className="text-slate-300 text-lg font-bold mb-2">Painel sem dados no momento</div>
        <div className="text-slate-500 text-sm mb-4 max-w-sm">A pÃƒÂ¡gina carregou, mas ainda nÃƒÂ£o recebeu os dados do dashboard. Tente recarregar.</div>
        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">
          Recarregar
        </button>
      </div>
    );
  }

  const performanceLabel = {
    below_average: { text: "Abaixo da Media", color: "text-red-400", bg: "bg-red-500/10" },
    on_track: { text: "No Caminho", color: "text-blue-400", bg: "bg-blue-500/10" },
    above_average: { text: "Acima da Media", color: "text-emerald-400", bg: "bg-emerald-500/10" }
  }[data.performanceStatus || 'on_track'];

  const handleSaveBalance = async () => {
    const val = parseInt(previousBalance, 10) / 100;
    const finalValue = balanceNegative ? -val : val;
    if (finalValue === 0) return;
    try {
      const { createTransaction } = await import("../lib/api");
      await createTransaction({
        type: finalValue > 0 ? "INCOME" : "EXPENSE",
        value: Math.abs(finalValue),
        category: "SALDO_ANTERIOR",
        source: "MANUAL",
        description: "Saldo anterior ao comeÃƒÂ§ar a usar o app",
        date: new Date().toISOString()
      });
      setShowBalanceModal(false);
      setPreviousBalance("");
      setBalanceNegative(false);
      window.location.reload();
    } catch (e) {
      toast.error("Erro ao salvar saldo anterior.");
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

  const categoryPeriodLabels: Record<CategoryPeriod, string> = {
    day: "Hoje",
    week: "Semana",
    month: "Mes",
  };

  const weekDays = [
    { value: "0", label: "Dom" },
    { value: "1", label: "Seg" },
    { value: "2", label: "Ter" },
    { value: "3", label: "Qua" },
    { value: "4", label: "Qui" },
    { value: "5", label: "Sex" },
    { value: "6", label: "Sab" },
  ];

  const getCategoryPeriodRange = () => {
    const now = new Date();
    const start = new Date(now);
    const end = new Date(now);

    if (categoryPeriod === "day") {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
      return { start: start.toISOString(), end: end.toISOString() };
    }

    if (categoryPeriod === "week") {
      const day = start.getDay();
      const daysFromMonday = day === 0 ? 6 : day - 1;
      start.setDate(start.getDate() - daysFromMonday);
      start.setHours(0, 0, 0, 0);
      end.setTime(start.getTime());
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      return { start: start.toISOString(), end: end.toISOString() };
    }

    start.setDate(1);
    start.setHours(0, 0, 0, 0);
    end.setMonth(start.getMonth() + 1, 0);
    end.setHours(23, 59, 59, 999);
    return { start: start.toISOString(), end: end.toISOString() };
  };

  const CategoryPeriodFilter = () => (
    <div className="flex rounded-lg bg-slate-950/70 border border-slate-800 p-1">
      {(["day", "week", "month"] as CategoryPeriod[]).map((period) => (
        <button
          key={period}
          type="button"
          onClick={() => setCategoryPeriod(period)}
          className={`px-2.5 py-1.5 text-[10px] font-bold uppercase rounded-md transition-colors ${
            categoryPeriod === period
              ? "bg-blue-500 text-white shadow-sm"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          {categoryPeriodLabels[period]}
        </button>
      ))}
    </div>
  );

  const openEditCategory = async (cat: CategorySummary) => {
    setEditCategory(cat);
    try {
      const { default: api } = await import("../lib/api");
      const [transactionsRes, planningRes] = await Promise.all([
        api.get("/transactions"),
        api.get("/planning/expenses/planning"),
      ]);
      const { start, end } = getCategoryPeriodRange();
      const txs = (transactionsRes.data || []).filter((t: any) =>
        t.type === "EXPENSE" &&
        t.category === cat.category &&
        t.date >= start &&
        t.date <= end
      );
      const recurring = ((planningRes.data?.expenses || []) as any[])
        .filter((expense: any) => expense.name === cat.category)
        .map((expense: any) => ({
          id: expense.id,
          kind: "recurring" as const,
          value: Number(expense.totalExpense || expense.value || 0),
          date: toInputDate(expense.dueDate),
          description: "Despesa recorrente",
          recurrenceType: expense.recurrenceType,
          dueDay: expense.dueDay ?? null,
          dueDayOfWeek: expense.dueDayOfWeek ?? null,
          dueDate: toInputDate(expense.dueDate) || null,
        }));
      setEditTransactions([
        ...txs.map((t: any) => ({
          id: t.id,
          kind: "transaction" as const,
          value: Number(t.value),
          date: toInputDate(t.date),
          createdAt: t.createdAt,
          description: t.description || "",
        })),
        ...recurring,
      ]);
    } catch {
      setEditTransactions([]);
    }
  };

  const openEditIncomeCategory = async (cat: CategorySummary) => {
    setEditIncomeCategory(cat);
    setEditingId(null);
    setEditValue("");
    setEditIncomeTransactions([]);
    try {
      const { default: api } = await import("../lib/api");
      const res = await api.get("/transactions");
      const { start, end } = getCategoryPeriodRange();
      const txs = (res.data || []).filter((t: any) => {
        const txDate = t.date || t.createdAt || "";
        const categoryMatch = t.category === cat.category || t.source === cat.category || t.description === cat.category;
        return t.type === "INCOME" && categoryMatch && txDate >= start && txDate <= end;
      });
      setEditIncomeTransactions(txs.map((t: any) => ({ id: t.id, value: Number(t.value), date: toInputDate(t.date), description: t.description || "" })));
    } catch {
      setEditIncomeTransactions([]);
    }
  };

  const handleEditTx = (tx: typeof editTransactions[0]) => {
    setEditingId(tx.id);
    const val = (tx.value * 100).toFixed(0);
    setEditValue(val);
    setEditDate(tx.date || "");
    if (tx.kind === "recurring") {
      setEditRecurringType(tx.recurrenceType || "MONTHLY");
      setEditRecurringDueDay(String(tx.dueDay ?? 1));
      setEditRecurringDueDayOfWeek(String(tx.dueDayOfWeek ?? 0));
      setEditRecurringDueDate(tx.dueDate || "");
    }
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editValue) return;
    const val = parseInt(editValue, 10) / 100;
    try {
      const currentItem = editTransactions.find((t) => t.id === editingId);
      if (!currentItem) return;
      if (currentItem.kind === "recurring") {
        const payload: Record<string, unknown> = {
          value: val,
          name: editCategory?.category,
          recurrenceType: editRecurringType,
        };
        if (editRecurringType === "MONTHLY") {
          payload.dueDay = Math.min(Math.max(parseInt(editRecurringDueDay, 10) || 1, 1), 31);
        }
        if (editRecurringType === "WEEKLY") {
          payload.dueDayOfWeek = parseInt(editRecurringDueDayOfWeek, 10) || 0;
        }
        if (editRecurringType === "SPECIFIC_DATE" && editRecurringDueDate) {
          payload.dueDate = new Date(`${editRecurringDueDate}T12:00:00`).toISOString();
        }
        await updateRecurringExpense(editingId, payload);
      } else {
        await updateTransaction(editingId, {
          value: val,
          date: editDate ? new Date(`${editDate}T12:00:00`).toISOString() : undefined,
        });
      }
      setEditTransactions((prev) => prev.map((t) => t.id === editingId ? { ...t, value: val, date: t.kind === "transaction" && editDate ? editDate : t.date } : t));
      setEditingId(null);
      setEditValue("");
      setEditDate("");
      setEditRecurringDueDate("");
      loadDashboard();
      toast.success("Valor atualizado!");
    } catch {
      toast.error("Erro ao atualizar.");
    }
  };

  const handleDeleteTx = async (id: string) => {
    try {
      const currentItem = editTransactions.find((t) => t.id === id);
      if (!currentItem) return;
      if (currentItem.kind === "recurring") {
        await deleteRecurringExpense(id);
      } else {
        await deleteTransaction(id);
      }
      setEditTransactions((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) { setEditingId(null); setEditValue(""); setEditDate(""); setEditRecurringDueDate(""); }
      loadDashboard();
      toast.success("Despesa removida!");
    } catch {
      toast.error("Erro ao remover.");
    }
  };

  const handleEditIncomeTx = (tx: typeof editIncomeTransactions[0]) => {
    setEditingId(tx.id);
    const val = (tx.value * 100).toFixed(0);
    setEditValue(val);
    setEditDate(tx.date || "");
  };

  const handleSaveIncomeEdit = async () => {
    if (!editingId || !editValue) return;
    const val = parseInt(editValue, 10) / 100;
    try {
      await updateTransaction(editingId, {
        value: val,
        date: editDate ? new Date(`${editDate}T12:00:00`).toISOString() : undefined,
      });
      setEditIncomeTransactions((prev) => prev.map((t) => t.id === editingId ? { ...t, value: val, date: editDate || t.date } : t));
      setEditingId(null);
      setEditValue("");
      setEditDate("");
      loadDashboard();
      toast.success("Valor atualizado!");
    } catch {
      toast.error("Erro ao atualizar.");
    }
  };

  const handleDeleteIncomeTx = async (id: string) => {
    try {
      await deleteTransaction(id);
      setEditIncomeTransactions((prev) => prev.filter((t) => t.id !== id));
      if (editingId === id) { setEditingId(null); setEditValue(""); setEditDate(""); }
      loadDashboard();
      toast.success("Receita removida!");
    } catch {
      toast.error("Erro ao remover.");
    }
  };

  const handlePayExpense = async (expense: any) => {
    if (payingExpenseId === expense.id) return;
    setPayingExpenseId(expense.id);
    try {
      const { default: api } = await import("../lib/api");
      await api.patch(`/planning/expenses/${expense.id}/accumulate`, { amount: expense.totalExpense });
      setPaidTodayExpenses((current) =>
        current.some((item) => item.id === expense.id)
          ? current
          : [...current, { id: expense.id, name: expense.name, amount: Number(expense.payableAmount || expense.totalExpense || 0) }],
      );
      toast.success(`${expense.name} quitado com sucesso!`);
      loadDashboard();
    } catch {
      toast.error(`Erro ao quitar ${expense.name}.`);
    } finally {
      setPayingExpenseId(null);
    }
  };

  const handleSubscribe = async () => {
    try {
      const checkout = await createAnnualCheckout();
      window.location.href = checkout.mercadoPagoCheckoutUrl;
    } catch (e) {
      toast.error("Erro ao iniciar checkout.");
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

  const recurringExpenses = Array.isArray(planning?.expenses) ? (planning?.expenses as PlanningExpenseItem[]) : [];
  const dueTodayExpenses = recurringExpenses.filter(
    (expense) =>
      expense.isDueToday &&
      Number(expense.payableAmount || expense.totalExpense || 0) > 0 &&
      !paidTodayExpenses.some((paid) => paid.id === expense.id),
  );
  const hiddenRecurringDayCategories = new Set(
    categoryPeriod === "day"
      ? recurringExpenses
          .filter((expense) => expense.name && expense.isDueToday === false)
          .map((expense) => expense.name.trim().toLowerCase())
      : [],
  );

  const visibleExpenseCategories = (data.expenseByCategory || []).filter((item) => {
    if (categoryPeriod !== "day") return true;
    return !hiddenRecurringDayCategories.has(item.category.trim().toLowerCase());
  });

  const currentEditingExpense = editingId ? editTransactions.find((item) => item.id === editingId) : null;

  const recurringScheduleLabel = (tx: EditableExpenseItem, days: typeof weekDays) => {
    if (tx.kind !== "recurring") return `Lancado em ${tx.date}`;
    if (tx.recurrenceType === "WEEKLY" && typeof tx.dueDayOfWeek === "number") {
      return `Semanal - ${days.find((day) => day.value === String(tx.dueDayOfWeek))?.label || "Dia"}`;
    }
    if (tx.recurrenceType === "MONTHLY" && tx.dueDay) {
      return `Mensal - dia ${tx.dueDay}`;
    }
    if (tx.recurrenceType === "SPECIFIC_DATE" && tx.dueDate) {
      return `Data - ${tx.dueDate}`;
    }
    return "Despesa recorrente";
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">
      {/* Saldo Anterior Modal */}
      {showBalanceModal && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-end justify-center" onClick={() => setShowBalanceModal(false)}>
          <div className="bg-[#0f172a] w-full max-w-lg rounded-t-[32px] p-6 border-t border-blue-500/10" onClick={e => e.stopPropagation()}>
            <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-bold text-white mb-2">Saldo Anterior</h3>
            <p className="text-xs text-slate-400 mb-5">Informe quanto voce ja tinha de saldo antes de usar o app.</p>
            {balanceNegative ? (
              <>
                <div className="flex items-baseline justify-center gap-2 mb-2 py-4">
                  <span className="text-2xl font-bold text-slate-500">-R$</span>
                  <span className="text-5xl font-black text-red-400">{formatBalanceInput(previousBalance)}</span>
                </div>
                <button onClick={() => setBalanceNegative(false)} className="w-full text-xs text-emerald-400 font-bold mb-4 py-2 rounded-xl hover:bg-emerald-500/10">Mudar para positivo (+)</button>
              </>
            ) : (
              <>
                <div className="flex items-baseline justify-center gap-2 mb-2 py-4">
                  <span className="text-2xl font-bold text-slate-500">R$</span>
                  <span className="text-5xl font-black text-emerald-400">{formatBalanceInput(previousBalance)}</span>
                </div>
                <button onClick={() => setBalanceNegative(true)} className="w-full text-xs text-red-400 font-bold mb-4 py-2 rounded-xl hover:bg-red-500/10">Mudar para negativo (-)</button>
              </>
            )}
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
            <p className="text-base font-bold">{firstName}</p>
          </div>
        </div>
        <button className="p-2 rounded-full bg-blue-500/10 text-blue-400">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <section className="mb-6">
          <button onClick={() => navigate("/agent")} className="w-full rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 flex items-center gap-3 text-left active:scale-[0.99]">
            <div className="size-11 rounded-xl bg-blue-500/10 text-blue-300 flex items-center justify-center">
              <span className="material-symbols-outlined">smart_toy</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Agente DriverCash</p>
              <p className="text-xs text-slate-400">Converse com seus dados e receba insights prÃƒÂ¡ticos.</p>
            </div>
            <span className="material-symbols-outlined text-slate-500">chevron_right</span>
          </button>
        </section>

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
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Tem um cÃƒÂ³digo de indicaÃƒÂ§ÃƒÂ£o?</p>
                  <div className="flex gap-2">
                    <input
                      value={redeemCode}
                      onChange={(e) => setRedeemCode(e.target.value.toUpperCase())}
                      placeholder="CÃƒâ€œDIGO"
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
                    PeÃƒÂ§a o cÃƒÂ³digo a quem te indicou para ganhar 15 dias extras de teste.
                  </p>
                </div>
              ) : null}
            </div>
          </section>
        )}

        {referrals?.eligible && referrals.referralCode && (
          <section className="mb-6">
            <div className="bg-[#0f172a] border border-emerald-500/10 rounded-xl p-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Seu cÃƒÂ³digo de indicaÃƒÂ§ÃƒÂ£o</p>
                <p className="text-xl font-black text-emerald-300">{referrals.referralCode}</p>
              </div>
              <button onClick={() => navigate("/profile")} className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-300 text-[10px] font-bold uppercase">
                Ajustes
              </button>
            </div>
          </section>
        )}

        {(dueTodayExpenses.length > 0 || paidTodayExpenses.length > 0) && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 px-1">Vencem Hoje</h2>
            <div className="space-y-3">
              {dueTodayExpenses.map((expense: any) => (
                <div key={expense.id} className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-red-300">{expense.name}</p>
                    <p className="text-xs text-red-500/70">{formatMoneyPrecise(expense.payableAmount || expense.totalExpense || 0)}</p>
                  </div>
                  <button
                    onClick={() => handlePayExpense(expense)}
                    disabled={payingExpenseId === expense.id}
                    className="text-[10px] font-bold bg-red-500 text-white px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-60"
                  >
                    {payingExpenseId === expense.id ? "..." : "QUITAR"}
                  </button>
                </div>
              ))}
              {paidTodayExpenses.map((expense) => (
                <div key={expense.id} className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-300">{expense.name}</p>
                    <p className="text-xs text-emerald-500/70">{formatMoneyPrecise(expense.amount)}</p>
                  </div>
                  <button
                    disabled
                    className="text-[10px] font-bold bg-emerald-500 text-white px-3 py-1.5 rounded-lg opacity-90"
                  >
                    QUITADO
                  </button>
                </div>
              ))}
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
            <p className="text-slate-400 text-xs uppercase font-bold mb-2">Ganhos do MÃƒÂªs</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-extrabold text-blue-400">{formatMoney(data.totalIncomeMonth)}</span>
              <span className="text-sm font-medium text-blue-400 flex items-center">
                Proj: {formatMoney(data.projectedMonth)}
              </span>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/20 grid grid-cols-2 gap-4">
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Lucro do MÃƒÂªs</p>
                <p className={`text-xl font-black ${data.netProfitMonth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatMoney(data.netProfitMonth)}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs uppercase font-bold mb-1">Lucro do Dia</p>
                <p className={`text-xl font-black ${data.todayProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {formatMoney(data.todayProfit)}
                </p>
              </div>
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
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Receita do dia</p>
              <p className="text-xs text-slate-400 font-bold uppercase mb-1">Media</p>
              <p className="text-2xl font-black text-blue-400">{formatMoney(data.dailyGoalTodayAverage)}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl p-4">
              <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Receita do dia</p>
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
                  <Line type="monotone" dataKey="media" name="Media" stroke="#60a5fa" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="recorde" name="Recorde" stroke="#34d399" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="projecao" name="ProjeÃƒÂ§ÃƒÂ£o" stroke="#f59e0b" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-4 md:grid-cols-2">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-sm font-bold text-white">Receita por Fonte</p>
                <p className="text-xs text-slate-400">Toque em uma fonte para editar</p>
              </div>
              <div className="flex items-center gap-3">
                <CategoryPeriodFilter />
                <span className="material-symbols-outlined text-emerald-400">payments</span>
              </div>
            </div>
            <div className="space-y-3">
              {(data.incomeByCategory || []).length > 0 ? (
                data.incomeByCategory.map((item) => (
                  <div key={item.category} onClick={() => openEditIncomeCategory(item)} className="cursor-pointer hover:bg-white/5 rounded-lg -mx-2 px-2 py-1 transition-colors group">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">{formatCategory(item.category)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-emerald-300">{formatMoneyPrecise(item.total)} - {item.percentage}%</span>
                        <button
                          type="button"
                          aria-label={`Editar receita ${formatCategory(item.category)}`}
                          className="p-1 rounded-md hover:bg-emerald-500/10 text-emerald-300 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditIncomeCategory(item);
                          }}
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                        </button>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(item.percentage, 100)}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Nenhuma receita registrada neste periodo.</p>
              )}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <p className="text-sm font-bold text-white">Despesas por Categoria</p>
                <p className="text-xs text-slate-400">Peso de cada despesa no periodo</p>
              </div>
              <div className="flex items-center gap-3">
                <CategoryPeriodFilter />
                <span className="material-symbols-outlined text-red-400">receipt_long</span>
              </div>
            </div>
            <div className="space-y-3">
              {visibleExpenseCategories.length > 0 ? (
                visibleExpenseCategories.map((item) => (
                  <div key={item.category} onClick={() => openEditCategory(item)} className="cursor-pointer hover:bg-white/5 rounded-lg -mx-2 px-2 py-1 transition-colors group">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-300">{formatCategory(item.category)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-red-300">{formatMoneyPrecise(item.total)} - {item.percentage}%</span>
                        <span className="material-symbols-outlined text-slate-600 text-xs opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-red-400" style={{ width: `${Math.min(item.percentage, 100)}%` }} />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">Nenhuma despesa registrada neste periodo.</p>
              )}
            </div>
          </div>
        </section>

        {editCategory && (
          <div className="fixed inset-0 z-[100] bg-black/70 flex items-end justify-center" onClick={() => { setEditCategory(null); setEditingId(null); }}>
            <div className="bg-[#0f172a] w-full max-w-lg rounded-t-[32px] p-6 border-t border-blue-500/10 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-lg font-bold text-white mb-1">Editar {formatCategory(editCategory.category)}</h3>
              <p className="text-xs text-slate-400 mb-4">Clique no valor para editar ou no icone de lixeira para remover.</p>

              {editTransactions.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Nenhuma transacao encontrada.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {editTransactions.map((tx) => (
                    <div key={tx.id} className="bg-[#1e293b] rounded-xl p-3 flex items-center justify-between gap-3">
                      {editingId === tx.id ? (
                        <>
                          <div className="flex-1 space-y-2">
                            <input
                              type="number"
                              inputMode="decimal"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-28 bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm text-center focus:outline-none"
                              autoFocus
                            />
                            <span className="block text-[10px] text-slate-500">
                              {(parseInt(editValue, 10) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                            {currentEditingExpense?.kind === "transaction" && (
                              <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm focus:outline-none"
                              />
                            )}
                            {currentEditingExpense?.kind === "recurring" && (
                              <div className="space-y-2">
                                <div className="grid grid-cols-3 gap-2">
                                  {(["MONTHLY", "WEEKLY", "SPECIFIC_DATE"] as const).map((type) => (
                                    <button
                                      key={type}
                                      type="button"
                                      onClick={() => setEditRecurringType(type)}
                                      className={`h-9 rounded-lg text-[10px] font-bold ${
                                        editRecurringType === type ? "bg-blue-500 text-white" : "bg-[#0f172a] text-slate-400"
                                      }`}
                                    >
                                      {type === "MONTHLY" ? "Mensal" : type === "WEEKLY" ? "Semanal" : "Data"}
                                    </button>
                                  ))}
                                </div>
                                {editRecurringType === "WEEKLY" && (
                                  <div className="grid grid-cols-7 gap-1.5">
                                    {weekDays.map((day) => (
                                      <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => setEditRecurringDueDayOfWeek(day.value)}
                                        className={`h-8 rounded-lg text-[10px] font-bold ${
                                          editRecurringDueDayOfWeek === day.value ? "bg-blue-500 text-white" : "bg-[#0f172a] text-slate-400"
                                        }`}
                                      >
                                        {day.label}
                                      </button>
                                    ))}
                                  </div>
                                )}
                                {editRecurringType === "MONTHLY" && (
                                  <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={editRecurringDueDay}
                                    onChange={(e) => setEditRecurringDueDay(e.target.value)}
                                    className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm focus:outline-none"
                                  />
                                )}
                                {editRecurringType === "SPECIFIC_DATE" && (
                                  <input
                                    type="date"
                                    value={editRecurringDueDate}
                                    onChange={(e) => setEditRecurringDueDate(e.target.value)}
                                    className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm focus:outline-none"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-1 ml-auto">
                            <button onClick={handleSaveEdit} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold">Salvar</button>
                            <button onClick={() => { setEditingId(null); setEditValue(""); setEditDate(""); setEditRecurringDueDate(""); }} className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-[10px] font-bold">Cancelar</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="cursor-pointer flex-1" onClick={() => handleEditTx(tx)}>
                            <p className="text-sm font-bold text-white">
                              {tx.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </p>
                            <p className="text-[10px] text-slate-500">{recurringScheduleLabel(tx, weekDays)}</p>
                          </div>
                          <button onClick={() => handleDeleteTx(tx.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-slate-500 hover:text-red-400 transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => { setEditCategory(null); setEditingId(null); }} className="w-full py-4 rounded-2xl bg-slate-700 text-slate-300 font-bold active:scale-95">
                FECHAR
              </button>
            </div>
          </div>
        )}

        {editIncomeCategory && (
          <div className="fixed inset-0 z-[100] bg-black/70 flex items-end justify-center" onClick={() => { setEditIncomeCategory(null); setEditingId(null); }}>
            <div className="bg-[#0f172a] w-full max-w-lg rounded-t-[32px] p-6 border-t border-blue-500/10 max-h-[70vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-slate-600 rounded-full mx-auto mb-6"></div>
              <h3 className="text-lg font-bold text-white mb-1">Editar Receita - {formatCategory(editIncomeCategory.category)}</h3>
              <p className="text-xs text-slate-400 mb-4">Clique no valor para editar ou no icone de lixeira para remover.</p>

              {editIncomeTransactions.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Nenhuma receita encontrada para esta fonte no mes atual.</p>
              ) : (
                <div className="space-y-2 mb-4">
                  {editIncomeTransactions.map((tx) => (
                    <div key={tx.id} className="bg-[#1e293b] rounded-xl p-3 flex items-center justify-between gap-3">
                      {editingId === tx.id ? (
                        <>
                          <div className="flex-1 space-y-2">
                            <input
                              type="number"
                              inputMode="decimal"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-28 bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm text-center focus:outline-none"
                              autoFocus
                            />
                            <span className="block text-[10px] text-slate-500">
                              {(parseInt(editValue, 10) / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </span>
                            <input
                              type="date"
                              value={editDate}
                              onChange={(e) => setEditDate(e.target.value)}
                              className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-white text-sm focus:outline-none"
                            />
                          </div>
                          <div className="flex gap-1 ml-auto">
                            <button onClick={handleSaveIncomeEdit} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-bold">Salvar</button>
                            <button onClick={() => { setEditingId(null); setEditValue(""); setEditDate(""); }} className="px-3 py-1.5 rounded-lg bg-slate-700 text-slate-300 text-[10px] font-bold">Cancelar</button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="cursor-pointer flex-1" onClick={() => handleEditIncomeTx(tx)}>
                            <p className="text-sm font-bold text-white">
                              {tx.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </p>
                            <p className="text-[10px] text-slate-500">{tx.date}</p>
                          </div>
                          <button onClick={() => handleDeleteIncomeTx(tx.id)} className="p-2 rounded-lg hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-400 transition-colors">
                            <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => { setEditIncomeCategory(null); setEditingId(null); }} className="w-full py-4 rounded-2xl bg-slate-700 text-slate-300 font-bold active:scale-95">
                FECHAR
              </button>
            </div>
          </div>
        )}

        {planning?.summary && planning.summary.requiredPerDay > 0 && (
          <section className="mb-6">
            <div onClick={() => navigate('/calendar')} className="bg-gradient-to-br from-amber-500/10 border border-amber-500/20 rounded-xl p-5 cursor-pointer active:scale-[0.98]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-400">savings</span>
                  <h3 className="text-xs font-bold uppercase text-amber-300">Reserva Diaria</h3>
                </div>
                <span className="material-symbols-outlined text-slate-500 text-sm">chevron_right</span>
              </div>
              <p className="text-3xl font-black text-amber-400">{formatMoneyPrecise(planning.summary.requiredPerDay)}</p>
              <p className="text-[9px] text-slate-500 mt-1 font-medium">Separe hoje para cobrir suas despesas fixas.</p>
              <div className="mt-3 pt-3 border-t border-amber-500/20 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase text-slate-400">Total reservado</span>
                <span className="text-sm font-black text-amber-300">
                  {formatMoneyPrecise(planning.summary.totalAccumulated || 0)}
                </span>
              </div>
              {planning.summary.totalExpense > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                    <span>Reservado ate hoje</span>
                    <span>
                      {formatMoneyPrecise(planning.summary.totalAccumulated || 0)} de {formatMoneyPrecise(planning.summary.totalExpense || 0)}
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-900/80 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{
                        width: `${Math.min(
                          100,
                          ((planning.summary.totalAccumulated || 0) / Math.max(planning.summary.totalExpense || 0, 1)) * 100,
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}
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
          <span className="text-[10px] font-bold uppercase">HistÃƒÂ³rico</span>
        </a>
        <a className="relative -top-8" href="#" onClick={(e) => { e.preventDefault(); navigate("/add"); }}>
          <button className="size-16 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 shadow-lg shadow-emerald-500/40 flex items-center justify-center text-white ring-4 ring-[#020617] active:scale-95">
            <span className="material-symbols-outlined text-4xl">add</span>
          </button>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/metrics"); }}>
          <span className="material-symbols-outlined">query_stats</span>
          <span className="text-[10px] font-bold uppercase">Metricas</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/profile"); }}>
          <span className="material-symbols-outlined">settings</span>
          <span className="text-[10px] font-bold uppercase">Ajustes</span>
        </a>
      </nav>
    </div>
  );
}
