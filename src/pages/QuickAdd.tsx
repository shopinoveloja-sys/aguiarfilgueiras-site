import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction, createRecurringExpense } from "../lib/api";
import { FuelType, getActiveVehicle, loadVehicles, saveFuelLogs, loadFuelLogs, generateLocalId } from "../lib/fleet";
import { toast } from "sonner";

type RecurrenceType = "SPECIFIC_DATE" | "WEEKLY" | "MONTHLY";

const dateInputValue = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const todayInputValue = () => dateInputValue();

export default function QuickAdd() {
  const navigate = useNavigate();
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("UBER");
  const [description, setDescription] = useState("");
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>("SPECIFIC_DATE");
  const [selectedDate, setSelectedDate] = useState(todayInputValue());
  const [dueDay, setDueDay] = useState("5");
  const [dueDayOfWeek, setDueDayOfWeek] = useState(new Date().getDay().toString());
  const [fuelType, setFuelType] = useState<FuelType>("gasolina");
  const [fuelUnitPrice, setFuelUnitPrice] = useState("");
  const [fuelOdometerKm, setFuelOdometerKm] = useState("");
  const [loading, setLoading] = useState(false);
  const vehicles = useMemo(() => loadVehicles(), []);
  const activeVehicle = useMemo(() => getActiveVehicle(vehicles), [vehicles]);

  const apps = [
    { id: "UBER", name: "Uber", icon: "directions_car", color: "bg-black text-white" },
    { id: "99", name: "99", icon: "local_taxi", color: "bg-[#FFD100] text-black" },
    { id: "INDRIVE", name: "InDrive", icon: "hail", color: "bg-[#bcfc01] text-black" },
    { id: "PARTICULAR", name: "Particular", icon: "person", color: "bg-blue-600 text-white" },
    { id: "OUTRAS", name: "Outras", icon: "payments", color: "bg-emerald-600 text-white" },
  ];

  const expenses = [
    { id: "COMBUSTIVEL", name: "Combustivel", icon: "local_gas_station", color: "bg-orange-500 text-white" },
    { id: "ALIMENTACAO", name: "Alimentacao", icon: "restaurant", color: "bg-rose-500 text-white" },
    { id: "MANUTENCAO", name: "Manutencao", icon: "build", color: "bg-slate-600 text-white" },
    { id: "OUTROS", name: "Outros", icon: "receipt_long", color: "bg-purple-500 text-white" },
  ];

  const recurrenceOptions: { id: RecurrenceType; label: string; icon: string }[] = [
    { id: "SPECIFIC_DATE", label: "Data", icon: "event" },
    { id: "WEEKLY", label: "Semanal", icon: "calendar_view_week" },
    { id: "MONTHLY", label: "Mensal", icon: "calendar_month" },
  ];

  const weekDays = [
    { value: "0", label: "Dom" },
    { value: "1", label: "Seg" },
    { value: "2", label: "Ter" },
    { value: "3", label: "Qua" },
    { value: "4", label: "Qui" },
    { value: "5", label: "Sex" },
    { value: "6", label: "Sab" },
  ];

  const currentCategories = type === "INCOME" ? apps : expenses;
  const isFuelExpense = type === "EXPENSE" && category === "COMBUSTIVEL";
  const currentAmountValue = parseInt(amount || "0", 10) / 100;
  const currentFuelUnitPrice = Number((fuelUnitPrice || "0").replace(",", "."));

  const handleKeypad = (num: string) => {
    if (amount.length > 8) return;
    setAmount((prev) => prev + num);
  };

  const formatCurrency = (val: string) => {
    if (!val) return "0,00";
    const num = parseInt(val, 10);
    return (num / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const getRecurrencePayload = () => {
    if (recurrenceType === "MONTHLY") {
      return { recurrenceType, dueDay: Math.min(Math.max(parseInt(dueDay, 10) || 1, 1), 31) };
    }

    if (recurrenceType === "WEEKLY") {
      return { recurrenceType, dueDayOfWeek: parseInt(dueDayOfWeek, 10) || 0 };
    }

    const dueDate = new Date(`${selectedDate}T12:00:00`).toISOString();
    return { recurrenceType, dueDate };
  };

  const handleSave = async () => {
    const hasAmount = Boolean(amount) && parseInt(amount, 10) > 0;
    const finalValue = currentAmountValue;
    const parsedFuelUnitPrice = currentFuelUnitPrice;
    const isFuelPayloadValid = !isFuelExpense || (parsedFuelUnitPrice > 0 && finalValue > 0 && !!activeVehicle);

    if (!hasAmount) {
      toast.error("Informe um valor valido.");
      return;
    }

    if (!isFuelPayloadValid) {
      toast.error("Informe o tipo de combustivel e o valor da unidade.");
      return;
    }

    if (isFuelExpense && (!fuelOdometerKm || Number(fuelOdometerKm) <= 0)) {
      toast.error("Informe o KM do abastecimento.");
      return;
    }

    setLoading(true);
    try {
      const recurrencePayload = getRecurrencePayload();
      const transactionDate =
        recurrenceType === "SPECIFIC_DATE"
          ? recurrencePayload.dueDate
          : new Date().toISOString();
      const transactionCategory =
        description.trim() && ((type === "EXPENSE" && category === "OUTROS") || (type === "INCOME" && category === "OUTRAS"))
          ? description.trim()
          : category;

      const shouldCreateRecurring =
        hasAmount &&
        type === "EXPENSE" &&
        (recurrenceType !== "SPECIFIC_DATE" ||
          (recurrenceType === "SPECIFIC_DATE" && selectedDate > todayInputValue()));

      if (shouldCreateRecurring) {
        await createRecurringExpense({
          name: description || `Despesa fixa - ${category}`,
          value: finalValue,
          ...recurrencePayload,
        });
      } else if (hasAmount) {
        await createTransaction({
          type,
          value: finalValue,
          category: transactionCategory,
          source: "MANUAL",
          date: transactionDate,
          ...recurrencePayload,
        });
      }

      if (isFuelExpense && activeVehicle) {
        const quantity = finalValue / parsedFuelUnitPrice;
        const nextFuelLogs = [
          {
            id: generateLocalId("fuel"),
            date: selectedDate,
            vehicleId: activeVehicle.id,
            fuelType,
            unitPrice: parsedFuelUnitPrice,
            totalPrice: finalValue,
            quantity,
            odometerKm: fuelOdometerKm ? Number(fuelOdometerKm) : null,
            createdAt: new Date().toISOString(),
          },
          ...loadFuelLogs(),
        ];
        saveFuelLogs(nextFuelLogs);
      }

      toast.success(type === "INCOME" ? "Ganho registrado com sucesso!" : "Despesa registrada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao salvar lancamento.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <header className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-slate-400">close</span>
        </button>
        <h1 className="text-sm font-bold tracking-wider uppercase text-slate-300">Novo Lancamento</h1>
        <div className="w-10" />
      </header>

      <div className="px-6 mt-2">
        <div className="flex bg-[#1e293b66] rounded-2xl p-1 border border-blue-500/10">
          <button
            onClick={() => { setType("INCOME"); setCategory("UBER"); setAmount(""); }}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${type === "INCOME" ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "text-slate-400"}`}
          >
            GANHO
          </button>
          <button
            onClick={() => { setType("EXPENSE"); setCategory("COMBUSTIVEL"); setAmount(""); }}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${type === "EXPENSE" ? "bg-red-500 text-white shadow-lg shadow-red-500/20" : "text-slate-400"}`}
          >
            DESPESA
          </button>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {currentCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`snap-center shrink-0 flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all border ${
                category === cat.id
                  ? `${cat.color} border-transparent ring-2 ring-offset-2 ring-offset-[#020617] ring-blue-500`
                  : "bg-[#1e293b66] border-blue-500/10 text-slate-400"
              }`}
            >
              <span className="material-symbols-outlined text-2xl mb-1">{cat.icon}</span>
              <span className="text-[10px] font-bold uppercase">{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 mb-4 space-y-4 animate-fade-in">
        {((type === "INCOME" && category === "OUTRAS") || (type === "EXPENSE" && (category === "OUTROS" || recurrenceType !== "SPECIFIC_DATE"))) && (
          <input
            type="text"
            placeholder={type === "INCOME" ? "Fonte da receita (ex: Bonus, aluguel, acerto)" : "Nome da despesa (ex: Aluguel do carro)"}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#1e293b66] border border-blue-500/20 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Periodicidade</p>
          <div className="grid grid-cols-3 gap-2">
            {recurrenceOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => setRecurrenceType(option.id)}
                className={`h-12 rounded-xl border text-xs font-bold flex items-center justify-center gap-1 transition-all ${
                  recurrenceType === option.id
                    ? "bg-blue-500 text-white border-blue-400"
                    : "bg-[#1e293b66] text-slate-400 border-blue-500/10"
                }`}
              >
                <span className="material-symbols-outlined text-base">{option.icon}</span>
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {recurrenceType === "SPECIFIC_DATE" && (
          <div className="bg-[#1e293b66] p-3 rounded-xl border border-blue-500/20 space-y-3">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Data do lancamento</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none"
              />
            </div>
          </div>
        )}

        {isFuelExpense && (
          <div className="bg-[#1e293b66] p-3 rounded-xl border border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-500">Veiculo em uso</span>
              <span className="font-bold text-amber-300">{activeVehicle?.label || "Nao definido"}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Combustivel</label>
                <select
                  value={fuelType}
                  onChange={(e) => setFuelType(e.target.value as FuelType)}
                  className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-3 text-white focus:outline-none"
                >
                  <option value="gasolina">Gasolina</option>
                  <option value="etanol">Etanol</option>
                  <option value="gnv">GNV</option>
                  <option value="diesel">Diesel</option>
                  <option value="eletrico">Eletrico</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">Valor unidade</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={fuelUnitPrice}
                  onChange={(e) => setFuelUnitPrice(e.target.value)}
                  placeholder="Ex: 5.89"
                  className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-2">KM no abastecimento</label>
              <input
                type="number"
                min="0"
                value={fuelOdometerKm}
                onChange={(e) => setFuelOdometerKm(e.target.value)}
                placeholder="Ex: 257320"
                className="w-full bg-[#0f172a] border border-blue-500/30 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none"
                required
              />
            </div>
            {currentFuelUnitPrice > 0 && currentAmountValue > 0 && (
              <div className="rounded-lg bg-[#0f172a] border border-slate-800 px-3 py-2 text-xs text-slate-400">
                Quantidade abastecida:{" "}
                <span className="font-bold text-amber-300">
                  {(currentAmountValue / currentFuelUnitPrice).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>
        )}

        {recurrenceType === "MONTHLY" && (
          <div className="flex items-center justify-between gap-3 bg-[#1e293b66] p-3 rounded-xl border border-blue-500/20">
            <span className="text-sm text-slate-400">Dia do mes:</span>
            <input
              type="number"
              min="1"
              max="31"
              value={dueDay}
              onChange={(e) => setDueDay(e.target.value)}
              className="w-16 bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-center text-white focus:outline-none"
            />
          </div>
        )}

        {recurrenceType === "WEEKLY" && (
          <div className="bg-[#1e293b66] p-3 rounded-xl border border-blue-500/20">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Dia da semana</p>
            <div className="grid grid-cols-7 gap-1.5">
              {weekDays.map((day) => (
                <button
                  key={day.value}
                  onClick={() => setDueDayOfWeek(day.value)}
                  className={`h-9 rounded-lg text-[10px] font-bold ${
                    dueDayOfWeek === day.value ? "bg-blue-500 text-white" : "bg-[#0f172a] text-slate-400"
                  }`}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center py-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-500">R$</span>
          <span className={`text-6xl font-black tracking-tighter ${type === "INCOME" ? "text-emerald-400" : "text-red-400"}`}>
            {formatCurrency(amount)}
          </span>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-t-[40px] p-6 border-t border-blue-500/10">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button key={num} onClick={() => handleKeypad(num.toString())} className="h-14 rounded-2xl bg-[#1e293b] text-2xl font-bold text-white active:scale-95 transition-transform">
              {num}
            </button>
          ))}
          <button onClick={() => setAmount(amount + "00")} className="h-14 rounded-2xl bg-[#1e293b] text-xl font-bold text-white active:scale-95 transition-transform">
            00
          </button>
          <button onClick={() => handleKeypad("0")} className="h-14 rounded-2xl bg-[#1e293b] text-2xl font-bold text-white active:scale-95 transition-transform">
            0
          </button>
          <button onClick={() => setAmount((prev) => prev.slice(0, -1))} className="h-14 rounded-2xl bg-[#1e293b] text-slate-400 flex items-center justify-center active:scale-95 transition-transform">
            <span className="material-symbols-outlined">backspace</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${
            type === "INCOME"
              ? "bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-emerald-500/20 text-white"
              : "bg-gradient-to-r from-red-600 to-red-400 shadow-red-500/20 text-white"
          }`}
        >
          {loading ? (
            <span className="material-symbols-outlined animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-3xl">check_circle</span>
          )}
          {loading ? "SALVANDO..." : "CONFIRMAR"}
        </button>
      </div>
    </div>
  );
}
