import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createKmDaily, getKmHistory, getTransactions, updateKmDaily } from "../lib/api";
import {
  MaintenancePlan,
  OperationLog,
  RideCountLog,
  RidePlatform,
  VehicleProfile,
  generateLocalId,
  getActiveVehicle,
  getDueMaintenance,
  getLatestVehicleKm,
  getPreviousVehicleKm,
  isOperationLogComplete,
  loadFuelLogs,
  loadMaintenancePlans,
  loadOperationLogs,
  loadRideCountLogs,
  loadVehicles,
  saveMaintenancePlans,
  saveOperationLogs,
  saveRideCountLogs,
  todayKey,
} from "../lib/fleet";

type Period = "day" | "week" | "month";

interface Transaction {
  id: string;
  type: "INCOME" | "EXPENSE";
  source?: string;
  category: string;
  value: number | string;
  date: string;
  createdAt?: string;
}

interface KmDaily {
  id: string;
  date: string;
  createdAt?: string;
  kmStart: number;
  kmEnd: number;
  kmTotal: number;
}

const maintenanceTemplates = [
  "Troca de oleo",
  "Filtro de oleo",
  "Filtro de ar",
  "Pastilha de freio",
  "Pneu",
  "Alinhamento e balanceamento",
  "Correia",
  "Outra",
];

const ridePlatforms: Array<{ id: RidePlatform; label: string; category?: string }> = [
  { id: "UBER", label: "Uber", category: "UBER" },
  { id: "99", label: "99", category: "99" },
  { id: "INDRIVE", label: "InDrive", category: "INDRIVE" },
  { id: "PARTICULAR", label: "Particular", category: "PARTICULAR" },
  { id: "OUTRAS", label: "Outras", category: "OUTRAS" },
];

const toNumber = (value: unknown) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const money = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });

const normalizeText = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

const dateKeyFromValue = (value?: string) => (value ? value.slice(0, 10) : "");
const isRewardCategory = (category: string) => normalizeText(category).startsWith("RECOMPENSA_");

const getPeriodRange = (period: Period, referenceDate: string) => {
  const now = new Date(`${referenceDate}T12:00:00`);
  const start = new Date(now);
  const end = new Date(now);

  if (period === "day") {
    return { start: todayKey(now), end: todayKey(now) };
  }

  if (period === "week") {
    const day = start.getDay();
    const daysFromMonday = day === 0 ? 6 : day - 1;
    start.setDate(start.getDate() - daysFromMonday);
    end.setTime(start.getTime());
    end.setDate(start.getDate() + 6);
    return { start: todayKey(start), end: todayKey(end) };
  }

  start.setDate(1);
  end.setMonth(start.getMonth() + 1, 0);
  return { start: todayKey(start), end: todayKey(end) };
};

const isDateInRange = (date: string, period: Period, referenceDate: string) => {
  const range = getPeriodRange(period, referenceDate);
  return date >= range.start && date <= range.end;
};

const getHoursBetween = (startTime: string, endTime: string) => {
  if (!startTime || !endTime) return 0;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  if ([startHour, startMinute, endHour, endMinute].some((value) => Number.isNaN(value))) return 0;
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  return end > start ? (end - start) / 60 : 0;
};

export default function Metrics() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<Period>("month");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [legacyKmHistory, setLegacyKmHistory] = useState<KmDaily[]>([]);
  const [vehicles, setVehicles] = useState<VehicleProfile[]>([]);
  const [operationLogs, setOperationLogs] = useState<OperationLog[]>([]);
  const [maintenancePlans, setMaintenancePlansState] = useState<MaintenancePlan[]>([]);
  const [rideCountLogs, setRideCountLogs] = useState<RideCountLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingLog, setSavingLog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [logDraft, setLogDraft] = useState({
    date: todayKey(),
    startTime: "",
    endTime: "",
    kmStart: "",
    kmEnd: "",
  });
  const [rideDraft, setRideDraft] = useState<Record<RidePlatform, string>>({
    UBER: "",
    "99": "",
    INDRIVE: "",
    PARTICULAR: "",
    OUTRAS: "",
  });
  const [maintenanceTemplate, setMaintenanceTemplate] = useState("Troca de oleo");
  const [maintenanceCustomName, setMaintenanceCustomName] = useState("");
  const [maintenanceDueKm, setMaintenanceDueKm] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const localVehicles = loadVehicles();
        const localLogs = loadOperationLogs();
        const localMaintenance = loadMaintenancePlans();
        const localRideCounts = loadRideCountLogs();
        setVehicles(localVehicles);
        setOperationLogs(localLogs);
        setMaintenancePlansState(localMaintenance);
        setRideCountLogs(localRideCounts);

        const [txs, kms] = await Promise.all([getTransactions(), getKmHistory()]);
        setTransactions(Array.isArray(txs) ? txs : []);
        setLegacyKmHistory(Array.isArray(kms) ? kms : []);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const activeVehicle = useMemo(() => getActiveVehicle(vehicles), [vehicles]);

  useEffect(() => {
    if (!activeVehicle) return;
    const existing = operationLogs.find((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate);
    const existingRideCounts = rideCountLogs.find((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate);
    const fallbackKmStart = getPreviousVehicleKm(activeVehicle.id, selectedDate);
    setLogDraft({
      date: existing?.date || selectedDate,
      startTime: existing?.startTime || "",
      endTime: existing?.endTime || "",
      kmStart: existing?.kmStart?.toString() || (fallbackKmStart != null ? String(fallbackKmStart) : ""),
      kmEnd: existing?.kmEnd?.toString() || "",
    });
    setRideDraft({
      UBER: existingRideCounts?.counts.UBER ? String(existingRideCounts.counts.UBER) : "",
      "99": existingRideCounts?.counts["99"] ? String(existingRideCounts.counts["99"]) : "",
      INDRIVE: existingRideCounts?.counts.INDRIVE ? String(existingRideCounts.counts.INDRIVE) : "",
      PARTICULAR: existingRideCounts?.counts.PARTICULAR ? String(existingRideCounts.counts.PARTICULAR) : "",
      OUTRAS: existingRideCounts?.counts.OUTRAS ? String(existingRideCounts.counts.OUTRAS) : "",
    });
  }, [activeVehicle, operationLogs, rideCountLogs, selectedDate]);

  const mergedOperationLogs = useMemo(() => {
    const existingDates = new Set(operationLogs.map((item) => `${item.vehicleId}:${item.date}`));
    const fallbackLogs: OperationLog[] = activeVehicle
      ? legacyKmHistory
          .filter((item) => !existingDates.has(`${activeVehicle.id}:${dateKeyFromValue(item.date)}`))
          .map((item) => ({
            id: `legacy-${item.id}`,
            date: dateKeyFromValue(item.date),
            vehicleId: activeVehicle.id,
            startTime: "",
            endTime: "",
            kmStart: item.kmStart,
            kmEnd: item.kmEnd,
            syncedKmId: item.id,
            createdAt: item.createdAt || item.date,
            updatedAt: item.createdAt || item.date,
          }))
      : [];

    return [...operationLogs, ...fallbackLogs].sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [activeVehicle, legacyKmHistory, operationLogs]);

  const activeVehicleLogs = useMemo(
    () => mergedOperationLogs.filter((item) => item.vehicleId === activeVehicle?.id),
    [activeVehicle, mergedOperationLogs],
  );

  const completeLogs = useMemo(
    () => activeVehicleLogs.filter((item) => isOperationLogComplete(item)),
    [activeVehicleLogs],
  );

  const fuelLogs = useMemo(
    () => loadFuelLogs().filter((item) => item.vehicleId === activeVehicle?.id),
    [activeVehicle],
  );
  const activeRideLogs = useMemo(
    () => rideCountLogs.filter((item) => item.vehicleId === activeVehicle?.id),
    [activeVehicle, rideCountLogs],
  );

  const dueMaintenance = useMemo(() => {
    const currentKm = getLatestVehicleKm(activeVehicle?.id || "");
    return activeVehicle ? getDueMaintenance(activeVehicle.id, currentKm) : [];
  }, [activeVehicle, maintenancePlans]);

  const stats = useMemo(() => {
    const periodTransactions = transactions
      .filter((item) => !(item.type === "EXPENSE" && (item as any).source === "APP"))
      .filter((item) => isDateInRange(dateKeyFromValue(item.date || item.createdAt), period, selectedDate));
    const periodFuelLogs = fuelLogs.filter((item) => isDateInRange(item.date, period, selectedDate));
    const periodLogs = completeLogs.filter((item) => isDateInRange(item.date, period, selectedDate));
    const periodRideLogs = activeRideLogs.filter((item) => isDateInRange(item.date, period, selectedDate));
    const income = periodTransactions
      .filter((item) => item.type === "INCOME")
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const operationalIncome = periodTransactions
      .filter((item) => item.type === "INCOME" && !isRewardCategory(item.category))
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const expense = periodTransactions
      .filter((item) => item.type === "EXPENSE")
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const maintenanceCost = periodTransactions
      .filter((item) => item.type === "EXPENSE" && normalizeText(item.category).includes("MANUTENCAO"))
      .reduce((sum, item) => sum + toNumber(item.value), 0);
    const kmTotal = periodLogs.reduce((sum, item) => sum + (item.kmEnd! - item.kmStart!), 0);
    const hoursTotal = periodLogs.reduce((sum, item) => sum + getHoursBetween(item.startTime, item.endTime), 0);
    const fuelTotal = periodFuelLogs.reduce((sum, item) => sum + item.totalPrice, 0);
    const fuelQuantity = periodFuelLogs.reduce((sum, item) => sum + item.quantity, 0);
    const incomePerKm = kmTotal > 0 ? operationalIncome / kmTotal : 0;
    const incomePerHour = hoursTotal > 0 ? operationalIncome / hoursTotal : 0;
    const fuelPerKm = kmTotal > 0 ? fuelTotal / kmTotal : 0;
    const profitPerKm = kmTotal > 0 ? (operationalIncome - expense) / kmTotal : 0;
    const consumptionAverage = fuelQuantity > 0 ? kmTotal / fuelQuantity : 0;
    const ridesByPlatform = ridePlatforms.reduce(
      (acc, platform) => {
        acc[platform.id] = periodRideLogs.reduce((sum, item) => sum + (item.counts[platform.id] || 0), 0);
        return acc;
      },
      {} as Record<RidePlatform, number>,
    );
    const incomeByPlatform = ridePlatforms.reduce(
      (acc, platform) => {
        acc[platform.id] = periodTransactions
          .filter((item) => item.type === "INCOME" && platform.category && normalizeText(item.category) === platform.category)
          .reduce((sum, item) => sum + toNumber(item.value), 0);
        return acc;
      },
      {} as Record<RidePlatform, number>,
    );
    const totalRides = Object.values(ridesByPlatform).reduce((sum, value) => sum + value, 0);
    const averagePerRide = totalRides > 0 ? operationalIncome / totalRides : 0;
    const platformRideSummaries = ridePlatforms.map((platform) => {
      const rides = ridesByPlatform[platform.id] || 0;
      const incomeValue = incomeByPlatform[platform.id] || 0;
      return {
        ...platform,
        rides,
        income: incomeValue,
        valuePerRide: rides > 0 ? incomeValue / rides : 0,
      };
    });
    return {
      income,
      operationalIncome,
      expense,
      fuelTotal,
      fuelQuantity,
      maintenanceCost,
      kmTotal,
      hoursTotal,
      incomePerKm,
      incomePerHour,
      fuelPerKm,
      profitPerKm,
      consumptionAverage,
      totalRides,
      averagePerRide,
      platformRideSummaries,
    };
  }, [activeRideLogs, completeLogs, fuelLogs, period, selectedDate, transactions]);

  const saveLocalOperationLogs = (nextLogs: OperationLog[]) => {
    setOperationLogs(nextLogs);
    saveOperationLogs(nextLogs);
  };

  const saveMaintenancePlansLocal = (nextPlans: MaintenancePlan[]) => {
    setMaintenancePlansState(nextPlans);
    saveMaintenancePlans(nextPlans);
  };

  const saveRideCountsLocal = (nextLogs: RideCountLog[]) => {
    setRideCountLogs(nextLogs);
    saveRideCountLogs(nextLogs);
  };

  const handleSaveLog = async () => {
    if (!activeVehicle) {
      toast.error("Cadastre um veiculo antes de registrar a jornada.");
      return;
    }

    const parsedStart = logDraft.kmStart ? Number(logDraft.kmStart) : null;
    const parsedEnd = logDraft.kmEnd ? Number(logDraft.kmEnd) : null;
    if (parsedStart !== null && parsedEnd !== null && parsedEnd < parsedStart) {
      toast.error("O KM final nao pode ser menor que o inicial.");
      return;
    }

    const existing = operationLogs.find((item) => item.vehicleId === activeVehicle.id && item.date === logDraft.date);
    const nextLog: OperationLog = {
      id: existing?.id || generateLocalId("op"),
      vehicleId: activeVehicle.id,
      date: selectedDate,
      startTime: logDraft.startTime,
      endTime: logDraft.endTime,
      kmStart: parsedStart,
      kmEnd: parsedEnd,
      syncedKmId: existing?.syncedKmId || null,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const nextLogs = existing
      ? operationLogs.map((item) => (item.id === existing.id ? nextLog : item))
      : [nextLog, ...operationLogs];
    saveLocalOperationLogs(nextLogs);

    if (activeVehicle) {
      const existingRideCounts = rideCountLogs.find((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate);
      const nextRideCounts: RideCountLog = {
        id: existingRideCounts?.id || generateLocalId("ride"),
        vehicleId: activeVehicle.id,
        date: selectedDate,
        counts: {
          UBER: Number(rideDraft.UBER) || 0,
          "99": Number(rideDraft["99"]) || 0,
          INDRIVE: Number(rideDraft.INDRIVE) || 0,
          PARTICULAR: Number(rideDraft.PARTICULAR) || 0,
          OUTRAS: Number(rideDraft.OUTRAS) || 0,
        },
        createdAt: existingRideCounts?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const nextRideLogs = existingRideCounts
        ? rideCountLogs.map((item) => (item.id === existingRideCounts.id ? nextRideCounts : item))
        : [nextRideCounts, ...rideCountLogs];
      saveRideCountsLocal(nextRideLogs);
    }

    if (!isOperationLogComplete(nextLog)) {
      toast.success("Jornada salva. Voce pode completar os dados no fim do dia.");
      return;
    }

    setSavingLog(true);
    try {
      const legacyMatch = legacyKmHistory.find((item) => dateKeyFromValue(item.date) === nextLog.date);
      if (nextLog.syncedKmId || legacyMatch?.id) {
        const kmId = nextLog.syncedKmId || legacyMatch?.id;
        await updateKmDaily(kmId!, {
          date: nextLog.date,
          kmStart: nextLog.kmStart!,
          kmEnd: nextLog.kmEnd!,
        });
        const syncedLogs = nextLogs.map((item) => (item.id === nextLog.id ? { ...item, syncedKmId: kmId } : item));
        saveLocalOperationLogs(syncedLogs);
      } else {
        const response = await createKmDaily({
          date: nextLog.date,
          kmStart: nextLog.kmStart!,
          kmEnd: nextLog.kmEnd!,
        });
        const syncedId = response?.kmDaily?.id || null;
        if (syncedId) {
          const syncedLogs = nextLogs.map((item) => (item.id === nextLog.id ? { ...item, syncedKmId: syncedId } : item));
          saveLocalOperationLogs(syncedLogs);
        }
      }
      toast.success("Jornada e KM atualizados com sucesso.");
    } catch (error) {
      console.error(error);
      toast.error("A jornada foi salva localmente, mas falhou ao sincronizar o KM.");
    } finally {
      setSavingLog(false);
    }
  };

  const handleSaveMaintenance = () => {
    if (!activeVehicle) {
      toast.error("Cadastre um veiculo antes de criar manutencoes.");
      return;
    }
    const dueKm = Number(maintenanceDueKm);
    const name = maintenanceTemplate === "Outra" ? maintenanceCustomName.trim() : maintenanceTemplate;
    if (!name) {
      toast.error("Informe o nome da manutencao.");
      return;
    }
    if (!Number.isFinite(dueKm) || dueKm <= 0) {
      toast.error("Informe o KM da manutencao.");
      return;
    }
    const nextPlans = [
      {
        id: generateLocalId("maintenance"),
        vehicleId: activeVehicle.id,
        name,
        dueKm,
        notes: maintenanceTemplate === "Outra" ? maintenanceCustomName.trim() : "",
        enabled: true,
        createdAt: new Date().toISOString(),
        lastDismissedAtKm: null,
      },
      ...maintenancePlans,
    ];
    saveMaintenancePlansLocal(nextPlans);
    setMaintenanceDueKm("");
    setMaintenanceCustomName("");
    setMaintenanceTemplate("Troca de oleo");
    toast.success("Manutencao cadastrada.");
  };

  const dismissMaintenance = (plan: MaintenancePlan) => {
    const currentKm = getLatestVehicleKm(activeVehicle?.id || "");
    const nextPlans = maintenancePlans.map((item) =>
      item.id === plan.id ? { ...item, lastDismissedAtKm: currentKm } : item,
    );
    saveMaintenancePlansLocal(nextPlans);
    toast.success("Alerta de manutencao marcado como tratado.");
  };

  const removeMaintenance = (planId: string) => {
    saveMaintenancePlansLocal(maintenancePlans.filter((item) => item.id !== planId));
    toast.success("Manutencao removida.");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500" />
      </div>
    );
  }

  const activeLabel = activeVehicle?.label || "Sem veiculo";
  const currentKm = getLatestVehicleKm(activeVehicle?.id || "");

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-28">
      <header className="sticky top-0 z-20 bg-[#0b0f19]/95 backdrop-blur border-b border-emerald-500/10 p-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate("/dashboard")} className="size-10 rounded-full hover:bg-white/5 flex items-center justify-center">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-black">Metricas</h1>
            <p className="text-xs text-slate-500 font-bold uppercase">Combustivel, KM e manutencao</p>
          </div>
          <button onClick={() => navigate("/vehicle")} className="size-10 rounded-full bg-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined">directions_car</span>
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-slate-900 border border-slate-800 p-1">
          {(["day", "week", "month"] as Period[]).map((item) => (
            <button
              key={item}
              onClick={() => setPeriod(item)}
              className={`h-10 rounded-lg text-xs font-bold uppercase ${period === item ? "bg-emerald-500 text-white" : "text-slate-400"}`}
            >
              {item === "day" ? "Hoje" : item === "week" ? "Semana" : "Mes"}
            </button>
          ))}
        </div>
      </header>

      <main className="p-4 space-y-4 max-w-4xl mx-auto">
        <section className="rounded-xl bg-slate-900 border border-emerald-500/20 p-4">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-bold">Jornada operacional</h2>
              <p className="text-xs text-slate-500">{activeLabel} em uso - lance inicio, fim, horario e KM.</p>
            </div>
            <button onClick={() => navigate("/vehicle")} className="text-xs font-bold text-emerald-300">Trocar veiculo</button>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Data</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
            <div className="rounded-lg bg-[#161e2e] border border-slate-800 px-3 py-3 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">KM atual</span>
              <span className="text-sm font-black text-emerald-300">{stats.kmTotal.toLocaleString("pt-BR")} km no periodo</span>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Horario de inicio</label>
              <input
                type="time"
                value={logDraft.startTime}
                onChange={(e) => setLogDraft((prev) => ({ ...prev, startTime: e.target.value }))}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Horario de termino</label>
              <input
                type="time"
                value={logDraft.endTime}
                onChange={(e) => setLogDraft((prev) => ({ ...prev, endTime: e.target.value }))}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">KM inicial</label>
              <input
                type="number"
                min="0"
                value={logDraft.kmStart}
                onChange={(e) => setLogDraft((prev) => ({ ...prev, kmStart: e.target.value }))}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">KM final</label>
              <input
                type="number"
                min="0"
                value={logDraft.kmEnd}
                onChange={(e) => setLogDraft((prev) => ({ ...prev, kmEnd: e.target.value }))}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Corridas por plataforma</p>
            <div className="grid gap-3 md:grid-cols-5">
              {ridePlatforms.map((platform) => (
                <div key={platform.id}>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">{platform.label}</label>
                  <input
                    type="number"
                    min="0"
                    value={rideDraft[platform.id]}
                    onChange={(e) => setRideDraft((prev) => ({ ...prev, [platform.id]: e.target.value }))}
                    className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={handleSaveLog}
            disabled={savingLog}
            className="mt-4 w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60"
          >
            {savingLog ? "Salvando..." : "Salvar jornada"}
          </button>
        </section>

        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-900 border border-emerald-500/20 p-4">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Ganho por KM</p>
              <p className="text-2xl font-black text-emerald-400">{money(stats.incomePerKm)}</p>
              <p className="mt-1 text-[10px] text-slate-500">{stats.kmTotal.toLocaleString("pt-BR")} km percorridos</p>
            </div>
          <div className="rounded-xl bg-slate-900 border border-emerald-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Ganho por Hora</p>
            <p className="text-2xl font-black text-emerald-400">{money(stats.incomePerHour)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-amber-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Combustivel por KM</p>
            <p className="text-2xl font-black text-amber-400">{money(stats.fuelPerKm)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-red-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Lucro por KM</p>
            <p className={`text-2xl font-black ${stats.profitPerKm >= 0 ? "text-emerald-400" : "text-red-400"}`}>{money(stats.profitPerKm)}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-violet-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Corridas no periodo</p>
            <p className="text-2xl font-black text-violet-300">{stats.totalRides.toLocaleString("pt-BR")}</p>
          </div>
          <div className="rounded-xl bg-slate-900 border border-cyan-500/20 p-4">
            <p className="text-[10px] font-bold uppercase text-slate-500 mb-2">Valor por corrida</p>
            <p className="text-2xl font-black text-cyan-300">{money(stats.averagePerRide)}</p>
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold">Resumo operacional</h2>
              <p className="text-xs text-slate-500">{stats.kmTotal.toLocaleString("pt-BR")} km registrados no periodo</p>
            </div>
            <span className="material-symbols-outlined text-emerald-400">speed</span>
          </div>
          <div className="grid gap-3">
            {[
              ["Receitas", money(stats.income), "text-emerald-300"],
              ["Receita operacional", money(stats.operationalIncome), "text-cyan-300"],
              ["Despesas", money(stats.expense), "text-red-300"],
              ["Combustivel", money(stats.fuelTotal), "text-amber-300"],
              ["Manutencao", money(stats.maintenanceCost), "text-slate-300"],
              ["Corridas", stats.totalRides.toLocaleString("pt-BR"), "text-violet-300"],
              ["Horas registradas", `${stats.hoursTotal.toFixed(1).replace(".", ",")} h`, "text-emerald-300"],
            ].map(([label, value, color]) => (
              <div key={label} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                <span className="text-xs font-bold uppercase text-slate-500">{label}</span>
                <span className={`text-sm font-black ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-violet-500/20 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold">Corridas por plataforma</h2>
              <p className="text-xs text-slate-500">Use as corridas do periodo para acompanhar ticket medio por app.</p>
            </div>
            <span className="material-symbols-outlined text-violet-300">local_taxi</span>
          </div>
          <div className="space-y-3">
            {stats.platformRideSummaries.map((platform) => (
              <div key={platform.id} className="rounded-lg bg-slate-950/60 border border-slate-800 px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">{platform.label}</p>
                    <p className="text-[10px] text-slate-500">
                      {platform.rides.toLocaleString("pt-BR")} corridas - {money(platform.valuePerRide)} por corrida
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-emerald-300">{money(platform.income)}</p>
                    <p className="text-[10px] text-slate-500">Receita</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-amber-500/20 p-4">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-bold">Consumo de combustivel</h2>
              <p className="text-xs text-slate-500">Leva em conta tipo usado, valor da unidade e total abastecido.</p>
            </div>
            <button onClick={() => navigate("/add")} className="size-10 rounded-full bg-amber-500/10 text-amber-300 flex items-center justify-center">
              <span className="material-symbols-outlined">local_gas_station</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Media real</p>
              <p className="text-xl font-black text-amber-300">{stats.consumptionAverage.toFixed(1).replace(".", ",")} km/L</p>
            </div>
            <div className="rounded-lg bg-slate-950/70 border border-slate-800 p-3">
              <p className="text-[10px] font-bold uppercase text-slate-500 mb-1">Quantidade</p>
              <p className="text-xl font-black text-emerald-300">{stats.fuelQuantity.toFixed(1).replace(".", ",")} L</p>
            </div>
          </div>
          <div className="space-y-2">
            {fuelLogs.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-lg bg-slate-950/50 border border-slate-800 px-3 py-2">
                <div>
                  <p className="text-xs font-bold text-slate-200">{item.date}</p>
                  <p className="text-[10px] text-slate-500">
                    {item.fuelType.toUpperCase()} - {item.unitPrice.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/un
                    {item.odometerKm ? ` - KM ${item.odometerKm.toLocaleString("pt-BR")}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-amber-300">{money(item.totalPrice)}</p>
                  <p className="text-[10px] text-slate-500">{item.quantity.toFixed(2).replace(".", ",")} unidades</p>
                </div>
              </div>
            ))}
            {fuelLogs.length === 0 && <p className="text-sm text-slate-500 py-2">Nenhum abastecimento detalhado ainda.</p>}
          </div>
        </section>

        <section className="rounded-xl bg-slate-900 border border-slate-800 p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold">Manutencoes</h2>
              <p className="text-xs text-slate-500">Avise no painel principal quando o KM bater com a manutencao planejada.</p>
            </div>
            <span className="material-symbols-outlined text-slate-400">build</span>
          </div>
          <div className="grid gap-3 md:grid-cols-[1.1fr_0.9fr] mb-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Tipo</label>
              <select
                value={maintenanceTemplate}
                onChange={(e) => setMaintenanceTemplate(e.target.value)}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              >
                {maintenanceTemplates.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">KM da manutencao</label>
              <input
                type="number"
                min="0"
                value={maintenanceDueKm}
                onChange={(e) => setMaintenanceDueKm(e.target.value)}
                className="w-full bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
              />
            </div>
          </div>
          {maintenanceTemplate === "Outra" && (
            <input
              type="text"
              value={maintenanceCustomName}
              onChange={(e) => setMaintenanceCustomName(e.target.value)}
              placeholder="Descreva a manutencao"
              className="w-full mb-4 bg-[#161e2e] border border-emerald-500/20 rounded-lg p-3 text-white"
            />
          )}
          <button onClick={handleSaveMaintenance} className="mb-4 w-full rounded-xl bg-slate-800 py-3 font-bold text-white">
            Salvar manutencao
          </button>

          {dueMaintenance.length > 0 && (
            <div className="space-y-2 mb-4">
              {dueMaintenance.map((item) => (
                <div key={item.id} className="rounded-lg border border-red-500/20 bg-red-500/5 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-bold text-red-300">{item.name}</p>
                      <p className="text-xs text-red-400/80">Venceu em {item.dueKm.toLocaleString("pt-BR")} km</p>
                    </div>
                    <button onClick={() => dismissMaintenance(item)} className="text-[10px] font-bold rounded-lg bg-emerald-500 px-3 py-1.5 text-white">
                      FEITO
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {maintenancePlans.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">Nenhuma manutencao cadastrada.</p>
          ) : (
            <div className="space-y-3">
              {maintenancePlans
                .filter((item) => item.vehicleId === activeVehicle?.id)
                .sort((a, b) => a.dueKm - b.dueKm)
                .map((item) => (
                  <div key={item.id} className="rounded-lg bg-slate-950/60 border border-slate-800 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-[10px] text-slate-500">{item.dueKm.toLocaleString("pt-BR")} km</p>
                      </div>
                      <button onClick={() => removeMaintenance(item.id)} className="text-slate-500 hover:text-red-300">
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
