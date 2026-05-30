import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  RideTimerDay,
  RideTimerSession,
  generateLocalId,
  getActiveVehicle,
  getOperationLogForDate,
  getRideTimerSessionDurationMs,
  loadRideTimerDays,
  loadRideTimerSessions,
  loadVehicles,
  saveRideTimerDays,
  saveRideTimerSessions,
  todayKey,
} from "../lib/fleet";

const moneyTime = (ms: number) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((item) => String(item).padStart(2, "0")).join(":");
};

const shortTime = (value?: string | null) => {
  if (!value) return "--:--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--:--";
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
};

const getHoursBetween = (startTime?: string, endTime?: string) => {
  if (!startTime || !endTime) return 0;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  if ([startHour, startMinute, endHour, endMinute].some((value) => Number.isNaN(value))) return 0;
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  return end > start ? (end - start) / 60 : 0;
};

export default function RideHistory() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(todayKey());
  const [sessions, setSessions] = useState<RideTimerSession[]>([]);
  const [closedDays, setClosedDays] = useState<RideTimerDay[]>([]);
  const [tick, setTick] = useState(Date.now());

  const activeVehicle = useMemo(() => getActiveVehicle(loadVehicles()), []);

  useEffect(() => {
    setSessions(loadRideTimerSessions());
    setClosedDays(loadRideTimerDays());
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => setTick(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  const daySessions = useMemo(
    () => sessions.filter((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate),
    [activeVehicle.id, selectedDate, sessions],
  );

  const runningSession = useMemo(
    () => daySessions.find((item) => !item.endAt) || null,
    [daySessions],
  );

  const closedDay = useMemo(
    () => closedDays.find((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate) || null,
    [activeVehicle.id, closedDays, selectedDate],
  );

  const totalRouteMs = useMemo(
    () => daySessions.reduce((sum, item) => sum + getRideTimerSessionDurationMs(item, new Date(tick)), 0),
    [daySessions, tick],
  );

  const operationLog = useMemo(
    () => getOperationLogForDate(selectedDate, activeVehicle.id),
    [activeVehicle.id, selectedDate, sessions],
  );
  const workMs = getHoursBetween(operationLog?.startTime, operationLog?.endTime) * 3600000;
  const idleMs = Math.max(0, workMs - totalRouteMs);

  const persistSessions = (nextSessions: RideTimerSession[]) => {
    setSessions(nextSessions);
    saveRideTimerSessions(nextSessions);
  };

  const persistDays = (nextDays: RideTimerDay[]) => {
    setClosedDays(nextDays);
    saveRideTimerDays(nextDays);
  };

  const startRide = () => {
    if (closedDay) {
      toast.error("Este dia ja foi encerrado. Reabra removendo o encerramento em uma futura versao.");
      return;
    }
    if (runningSession) return;
    const now = new Date().toISOString();
    const nextSession: RideTimerSession = {
      id: generateLocalId("route"),
      date: selectedDate,
      vehicleId: activeVehicle.id,
      startAt: now,
      endAt: null,
      durationMs: 0,
      createdAt: now,
      updatedAt: now,
    };
    persistSessions([nextSession, ...sessions]);
    toast.success("Corrida iniciada.");
  };

  const pauseRide = () => {
    if (!runningSession) return;
    const now = new Date();
    const nextSessions = sessions.map((item) =>
      item.id === runningSession.id
        ? {
            ...item,
            endAt: now.toISOString(),
            durationMs: getRideTimerSessionDurationMs(item, now),
            updatedAt: now.toISOString(),
          }
        : item,
    );
    persistSessions(nextSessions);
    toast.success("Corrida encerrada.");
  };

  const closeDay = () => {
    const now = new Date();
    const nextSessions = runningSession
      ? sessions.map((item) =>
          item.id === runningSession.id
            ? {
                ...item,
                endAt: now.toISOString(),
                durationMs: getRideTimerSessionDurationMs(item, now),
                updatedAt: now.toISOString(),
              }
            : item,
        )
      : sessions;
    const existing = closedDays.find((item) => item.vehicleId === activeVehicle.id && item.date === selectedDate);
    const nextDay: RideTimerDay = {
      id: existing?.id || generateLocalId("route-day"),
      date: selectedDate,
      vehicleId: activeVehicle.id,
      closedAt: now.toISOString(),
    };
    const nextDays = existing
      ? closedDays.map((item) => (item.id === existing.id ? nextDay : item))
      : [nextDay, ...closedDays];
    persistSessions(nextSessions);
    persistDays(nextDays);
    toast.success("Dia encerrado para o cronometro de corridas.");
  };

  const removeSession = (sessionId: string) => {
    persistSessions(sessions.filter((item) => item.id !== sessionId));
    toast.success("Corrida removida.");
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-28">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-500/10 bg-[#0b0f19]/95 p-4 backdrop-blur">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="flex size-10 items-center justify-center rounded-full hover:bg-emerald-500/10">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h1 className="text-xl font-black">Timer de Corridas</h1>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Tempo real em rota</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-emerald-300">timer</span>
      </header>

      <main className="mx-auto max-w-3xl space-y-4 p-4">
        <section className="rounded-2xl border border-emerald-500/20 bg-[#161e2e] p-4">
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-slate-500">Data</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(event) => setSelectedDate(event.target.value)}
                className="w-full rounded-xl border border-emerald-500/20 bg-[#0b0f19] p-3 text-white outline-none focus:border-emerald-500"
              />
            </label>
            <div className="rounded-xl border border-slate-800 bg-[#0b0f19] p-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Veiculo em uso</p>
              <p className="mt-1 text-sm font-black text-emerald-300">{activeVehicle.label}</p>
            </div>
          </div>

          <div className={`rounded-2xl border p-5 text-center ${runningSession ? "border-emerald-400/40 bg-emerald-500/10" : "border-slate-800 bg-slate-950/50"}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Tempo em rota no dia</p>
            <p className="mt-2 font-mono text-5xl font-black text-emerald-300">{moneyTime(totalRouteMs)}</p>
            <p className="mt-2 text-xs text-slate-400">
              {runningSession ? `Corrida iniciada as ${shortTime(runningSession.startAt)}` : "Inicie quando aceitar a corrida e pause ao finalizar."}
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <button
              onClick={runningSession ? pauseRide : startRide}
              disabled={Boolean(closedDay && !runningSession)}
              className={`h-14 rounded-xl text-sm font-black text-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
                runningSession ? "bg-amber-500" : "bg-emerald-600"
              }`}
            >
              <span className="material-symbols-outlined mr-2 align-middle">{runningSession ? "pause" : "play_arrow"}</span>
              {runningSession ? "Pausar corrida" : "Iniciar corrida"}
            </button>
            <button
              onClick={closeDay}
              className="h-14 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-black text-red-200 active:scale-[0.98]"
            >
              Encerrar dia
            </button>
            <button
              onClick={() => navigate("/metrics")}
              className="h-14 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-sm font-black text-emerald-200 active:scale-[0.98]"
            >
              Ver metricas
            </button>
          </div>

          {closedDay && (
            <p className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200">
              Dia encerrado as {shortTime(closedDay.closedAt)}.
            </p>
          )}
        </section>

        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-emerald-500/20 bg-[#161e2e] p-3">
            <p className="text-[10px] font-bold uppercase text-slate-500">Corridas</p>
            <p className="mt-1 text-2xl font-black">{daySessions.length}</p>
          </div>
          <div className="rounded-xl border border-cyan-500/20 bg-[#161e2e] p-3">
            <p className="text-[10px] font-bold uppercase text-slate-500">Jornada</p>
            <p className="mt-1 text-2xl font-black text-cyan-300">{moneyTime(workMs)}</p>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-[#161e2e] p-3">
            <p className="text-[10px] font-bold uppercase text-slate-500">Ocioso</p>
            <p className="mt-1 text-2xl font-black text-amber-300">{moneyTime(idleMs)}</p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-[#161e2e] p-4">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="font-black">Corridas registradas</h2>
              <p className="text-xs text-slate-500">Cada inicio e pausa vira uma corrida do dia.</p>
            </div>
            <span className="text-xs font-bold text-slate-500">{daySessions.length} itens</span>
          </div>

          <div className="space-y-3">
            {daySessions.length === 0 && (
              <p className="rounded-xl border border-dashed border-slate-700 p-5 text-center text-sm text-slate-500">
                Nenhuma corrida cronometrada nesta data.
              </p>
            )}
            {daySessions.map((session, index) => (
              <div key={session.id} className="rounded-xl border border-slate-800 bg-slate-950/50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-black">Corrida {daySessions.length - index}</p>
                    <p className="text-xs text-slate-500">
                      {shortTime(session.startAt)} ate {shortTime(session.endAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-mono text-lg font-black ${session.endAt ? "text-emerald-300" : "text-amber-300"}`}>
                      {moneyTime(getRideTimerSessionDurationMs(session, new Date(tick)))}
                    </p>
                    <button onClick={() => removeSession(session.id)} className="text-slate-500 hover:text-red-300">
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around border-t border-emerald-500/10 bg-[#1f2a3dcc] px-6 py-3 pb-8 backdrop-blur-md">
        <a className="flex flex-col items-center gap-1 text-slate-500" href="#" onClick={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="text-[10px] font-bold uppercase">Hoje</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-emerald-400" href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span>
          <span className="text-[10px] font-bold uppercase">Corridas</span>
        </a>
        <a className="relative -top-8" href="#" onClick={(e) => { e.preventDefault(); navigate("/add"); }}>
          <button className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-[#0b0f19] active:scale-95">
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
