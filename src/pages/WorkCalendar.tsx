import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

export default function WorkCalendar() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [nonWorkingDays, setNonWorkingDays] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);

  // In a real app, fetch nonWorkingDays from API here
  useEffect(() => {
    // Mocking existing days off (e.g. Sundays)
    const fetchDaysOff = async () => {
      // await fetch(...)
      setNonWorkingDays([]);
    };
    fetchDaysOff();
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Padding for the calendar grid to start on the right day of the week
  const startDay = monthStart.getDay(); 
  const paddingDays = Array(startDay).fill(null);

  const toggleDayOff = (day: Date) => {
    setNonWorkingDays(prev => {
      const isOff = prev.some(d => isSameDay(d, day));
      if (isOff) return prev.filter(d => !isSameDay(d, day));
      return [...prev, day];
    });
  };

  const saveDaysOff = async () => {
    setLoading(true);
    try {
      // await fetch('/planning/non-working-days', { ... })
      toast.success("Seus dias de folga foram salvos!");
      navigate(-1);
    } catch (error) {
      toast.error("Erro ao salvar folgas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6 pb-2 border-b border-white/5">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-slate-400">arrow_back</span>
        </button>
        <h1 className="text-sm font-bold tracking-wider uppercase text-slate-300">Minha Rotina</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-black mb-2">Planejamento do Mês</h2>
          <p className="text-sm text-slate-400">
            Selecione os dias em que você <b>não vai trabalhar</b>. Isso ajuda o aplicativo a calcular exatamente quanto você precisa separar por dia para pagar suas despesas fixas.
          </p>
        </div>

        {/* Month Selector */}
        <div className="flex items-center justify-between bg-[#1e293b66] p-4 rounded-2xl border border-blue-500/10 mb-6">
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} className="p-1 text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <h3 className="font-bold text-lg capitalize">{format(currentDate, "MMMM yyyy", { locale: ptBR })}</h3>
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="p-1 text-slate-400 hover:text-white">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="bg-[#0f172a] p-4 rounded-3xl border border-slate-800">
          <div className="grid grid-cols-7 gap-2 mb-4 text-center">
            {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
              <div key={day} className="text-[10px] font-bold text-slate-500 uppercase">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {paddingDays.map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            
            {daysInMonth.map((day) => {
              const isOff = nonWorkingDays.some(d => isSameDay(d, day));
              const isToday = isSameDay(day, new Date());
              
              return (
                <button
                  key={day.toString()}
                  onClick={() => toggleDayOff(day)}
                  className={`h-10 rounded-xl text-sm font-bold flex items-center justify-center transition-all ${
                    isOff 
                    ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/50" 
                    : isToday 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                      : "bg-[#1e293b] text-slate-300 hover:bg-[#2dd4bf] hover:text-black"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 px-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500"></div>
            <span className="text-xs text-slate-400">Folga / Descanso</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#1e293b]"></div>
            <span className="text-xs text-slate-400">Dia de Trabalho</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-[#020617] border-t border-slate-800">
        <button 
          onClick={saveDaysOff}
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 font-bold text-lg text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined">save</span>
          )}
          {loading ? "SALVANDO..." : "SALVAR ROTINA"}
        </button>
      </div>
    </div>
  );
}
