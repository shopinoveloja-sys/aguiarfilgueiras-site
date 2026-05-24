import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addMonths, addYears, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { saveNonWorkingDays, getRecurringExpenses } from "../lib/api";

interface PlannedExpense {
  id: string | number;
  name: string;
  workingDaysRemaining: number;
  requiredPerDay: number;
  totalExpense?: number;
  reservedToDate?: number;
  progressPercentage?: number;
}

interface TodayExpense {
  id: string | number;
  name: string;
  requiredPerDay: number;
}

interface PlanningData {
  offDates?: string[];
  summary?: {
    requiredPerDay: number;
    totalAccumulated: number;
  };
  expenses?: PlannedExpense[];
  todayExpenses?: TodayExpense[];
  todayTransactionAmount?: number;
}

export default function WorkCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nonWorkingDays, setNonWorkingDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [planning, setPlanning] = useState<PlanningData | null>(null);
  const [pendingDay, setPendingDay] = useState<Date | null>(null);
  const [pendingAction, setPendingAction] = useState<"mark" | "unmark" | null>(null);

  useEffect(() => {
    const fetchPlanning = async () => {
      try {
        const data = await getRecurringExpenses();
        setPlanning(data);
        if (data.offDates) {
          setNonWorkingDays(data.offDates.map((d: string) => new Date(d + "T12:00:00")));
        }
      } catch {
        // No data yet, start fresh
      }
    };
    fetchPlanning();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startDay = monthStart.getDay();
  const paddingDays = Array(startDay).fill(null);

  const normalizeDay = (date: Date) => new Date(`${format(date, "yyyy-MM-dd")}T12:00:00`);
  const dayKey = (date: Date) => format(date, "yyyy-MM-dd");

  const uniqueDays = (days: Date[]) => {
    const map = new Map<string, Date>();
    days.forEach((day) => map.set(dayKey(day), normalizeDay(day)));
    return Array.from(map.values()).sort((a, b) => a.getTime() - b.getTime());
  };

  const futureSameWeekdays = (day: Date) => {
    const start = normalizeDay(day);
    const end = addYears(start, 1);
    const dates: Date[] = [];
    const cursor = new Date(start);
    while (cursor <= end) {
      dates.push(normalizeDay(cursor));
      cursor.setDate(cursor.getDate() + 7);
    }
    return dates;
  };

  const requestToggleDayOff = (day: Date) => {
    const normalized = normalizeDay(day);
    const isOff = nonWorkingDays.some(d => isSameDay(d, normalized));
    setPendingDay(normalized);
    setPendingAction(isOff ? "unmark" : "mark");
  };

  const closeDayOffPrompt = () => {
    setPendingDay(null);
    setPendingAction(null);
  };

  const applyDayOffChoice = (scope: "single" | "weekday") => {
    if (!pendingDay || !pendingAction) return;

    setNonWorkingDays(prev => {
      if (pendingAction === "mark") {
        const datesToAdd = scope === "weekday" ? futureSameWeekdays(pendingDay) : [pendingDay];
        return uniqueDays([...prev, ...datesToAdd]);
      }

      if (scope === "weekday") {
        return prev.filter((date) => date < pendingDay || date.getDay() !== pendingDay.getDay());
      }

      return prev.filter(d => !isSameDay(d, pendingDay));
    });
    closeDayOffPrompt();
  };

  const saveDaysOff = async () => {
    setLoading(true);
    try {
      const dateStrings = nonWorkingDays.map(d => format(d, "yyyy-MM-dd"));
      await saveNonWorkingDays(dateStrings);
      toast.success("Seus dias de folga foram salvos!");
      navigate("/dashboard");
    } catch {
      toast.error("Erro ao salvar folgas.");
    } finally {
      setLoading(false);
    }
  };

  const workingDaysCount = daysInMonth.length - nonWorkingDays.filter(d => 
    d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()
  ).length;

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-5 pb-2">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-slate-400">arrow_back</span>
        </button>
        <h1 className="text-sm font-bold tracking-wider uppercase text-slate-300">Minha Rotina</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 p-5 overflow-y-auto">
        {/* Explanation */}
        <div className="mb-5">
          <h2 className="text-xl font-black mb-1">Planejamento do Mês</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Toque nos dias que você <b className="text-red-400">NÃO vai trabalhar</b>. O app calcula quanto reservar por dia de trabalho para cobrir suas despesas fixas.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-emerald-400">{workingDaysCount}</p>
            <p className="text-[10px] font-bold uppercase text-emerald-500/70 tracking-wider">Dias de Trabalho</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-red-400">{nonWorkingDays.filter(d => 
              d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear()
            ).length}</p>
            <p className="text-[10px] font-bold uppercase text-red-500/70 tracking-wider">Dias de Folga</p>
          </div>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between bg-[#1e293b66] p-3 rounded-2xl border border-blue-500/10 mb-4">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h3 className="font-bold text-base capitalize">{format(currentDate, "MMMM yyyy", { locale: ptBR })}</h3>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#0f172a] p-4 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-7 gap-1.5 mb-3 text-center">
            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
              <div key={i} className="text-[10px] font-bold text-slate-500 uppercase">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center">
            {paddingDays.map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {daysInMonth.map((day) => {
              const isOff = nonWorkingDays.some(d => isSameDay(d, day));
              const isToday = isSameDay(day, new Date());
              const isPast = day < new Date() && !isToday;
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => requestToggleDayOff(day)}
                  className={`h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all active:scale-90 ${
                    isOff 
                    ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/50" 
                    : isToday 
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
                      : isPast
                        ? "bg-[#1e293b44] text-slate-600"
                        : "bg-[#1e293b] text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-5 mt-4 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/30 border border-red-500"></div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Folga</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e293b]"></div>
            <span className="text-[10px] text-slate-500 font-bold uppercase">Trabalho</span>
          </div>
        </div>

        {/* Daily Reserve Widget (if planning data available) */}
        {planning && planning.summary && planning.summary.requiredPerDay > 0 && (
          <div className="mt-5 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-amber-400 text-2xl">savings</span>
              <h3 className="font-bold text-amber-300 text-sm uppercase tracking-wider">Reserva Diária</h3>
            </div>
            <p className="text-3xl font-black text-amber-400">
              R$ {planning.summary.requiredPerDay.toFixed(2).replace('.', ',')}
            </p>
            <p className="text-xs text-slate-400 mt-2">
              Esse é o valor que você precisa separar por dia de trabalho para cobrir suas despesas fixas até o vencimento.
            </p>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-amber-500/10">
              <p className="text-[10px] font-bold uppercase text-slate-500">Total reservado</p>
              <p className="text-sm font-bold text-amber-300">R$ {(planning.summary.totalAccumulated || 0).toFixed(2).replace('.', ',')}</p>
            </div>
            {planning.todayExpenses && planning.todayExpenses.length > 0 && (
              <div className="mt-4">
                <p className="text-[10px] font-bold uppercase text-amber-300/80 mb-2">Despesas de hoje</p>
                {planning.todayExpenses.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between mt-2 pt-2 border-t border-amber-500/10">
                    <p className="text-sm font-bold text-white">{exp.name}</p>
                    <p className="text-sm font-bold text-amber-400">R$ {exp.requiredPerDay.toFixed(2).replace('.', ',')}</p>
                  </div>
                ))}
              </div>
            )}
            {planning.expenses && planning.expenses.map((exp) => (
              <div key={exp.id} className="mt-3 pt-3 border-t border-amber-500/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{exp.name}</p>
                    <p className="text-[10px] text-slate-500">{exp.workingDaysRemaining} dias restantes</p>
                  </div>
                  <p className="text-sm font-bold text-amber-400">R$ {exp.requiredPerDay.toFixed(2).replace('.', ',')}/dia</p>
                </div>
                {typeof exp.totalExpense === "number" && (
                  <>
                    <div className="flex items-center justify-between mt-2 text-[10px] font-bold text-slate-500">
                      <span>Provisionado</span>
                      <span>
                        R$ {(exp.reservedToDate || 0).toFixed(2).replace('.', ',')} de R$ {exp.totalExpense.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-slate-900/80 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-amber-400"
                        style={{ width: `${Math.min(exp.progressPercentage || 0, 100)}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="p-5 bg-[#020617] border-t border-slate-800">
        <button 
          onClick={saveDaysOff}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 font-bold text-base text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined">save</span>
          )}
          {loading ? "SALVANDO..." : "SALVAR ROTINA"}
        </button>
      </div>

      {pendingDay && pendingAction && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0f172a] border border-blue-500/20 p-5 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-black text-xl">
                  {pendingAction === "mark" ? "Marcar folga" : "Remover folga"}
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  {format(pendingDay, "dd/MM/yyyy", { locale: ptBR })} cai em{" "}
                  {format(pendingDay, "EEEE", { locale: ptBR })}.
                </p>
              </div>
              <button onClick={closeDayOffPrompt} className="p-2 rounded-full hover:bg-white/5 text-slate-400">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => applyDayOffChoice("single")}
                className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-left active:scale-[0.98]"
              >
                <p className="font-bold text-white">
                  {pendingAction === "mark" ? "Somente este dia" : "Remover somente este dia"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Altera apenas a data selecionada.
                </p>
              </button>

              <button
                onClick={() => applyDayOffChoice("weekday")}
                className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-left active:scale-[0.98]"
              >
                <p className="font-bold text-red-200">
                  {pendingAction === "mark"
                    ? `Todas as ${format(pendingDay, "EEEE", { locale: ptBR })} futuras`
                    : `Remover todas as ${format(pendingDay, "EEEE", { locale: ptBR })} futuras`}
                </p>
                <p className="text-xs text-red-200/70 mt-1">
                  Aplica da data selecionada em diante. Depois você ainda pode ajustar uma data específica.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
