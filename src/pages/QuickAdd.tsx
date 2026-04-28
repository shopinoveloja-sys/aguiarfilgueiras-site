import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransaction, createRecurringExpense } from "../lib/api";
import { toast } from "sonner";

export default function QuickAdd() {
  const navigate = useNavigate();
  const [type, setType] = useState<"INCOME" | "EXPENSE">("INCOME");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("UBER");
  const [description, setDescription] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [dueDay, setDueDay] = useState("5");
  const [loading, setLoading] = useState(false);

  // Income categories
  const apps = [
    { id: "UBER", name: "Uber", icon: "directions_car", color: "bg-black text-white" },
    { id: "99", name: "99", icon: "local_taxi", color: "bg-[#FFD100] text-black" },
    { id: "INDRIVE", name: "InDrive", icon: "hail", color: "bg-[#bcfc01] text-black" },
    { id: "PARTICULAR", name: "Particular", icon: "person", color: "bg-blue-600 text-white" },
  ];

  // Expense categories
  const expenses = [
    { id: "COMBUSTIVEL", name: "Combustível", icon: "local_gas_station", color: "bg-orange-500 text-white" },
    { id: "ALIMENTACAO", name: "Alimentação", icon: "restaurant", color: "bg-rose-500 text-white" },
    { id: "MANUTENCAO", name: "Manutenção", icon: "build", color: "bg-slate-600 text-white" },
    { id: "OUTROS", name: "Outros", icon: "receipt_long", color: "bg-purple-500 text-white" },
  ];

  const currentCategories = type === "INCOME" ? apps : expenses;

  // Keypad logic for quick entry
  const handleKeypad = (num: string) => {
    if (amount.length > 8) return;
    setAmount(prev => prev + num);
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const formatCurrency = (val: string) => {
    if (!val) return "0,00";
    const num = parseInt(val, 10);
    return (num / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleSave = async () => {
    if (!amount || parseInt(amount, 10) === 0) {
      toast.error("Informe um valor válido.");
      return;
    }

    setLoading(true);
    try {
      const finalValue = parseInt(amount, 10) / 100;
      
      if (isRecurring && type === "EXPENSE") {
        // Send to recurring expense endpoint
        await createRecurringExpense({
          name: description || "Despesa Recorrente",
          value: finalValue,
          dueDay: parseInt(dueDay, 10) || 1
        });
        toast.success("Despesa fixa registrada!");
      } else {
        // Normal transaction
        await createTransaction({
          type,
          value: finalValue,
          category: category,
          description: description || `${type === 'INCOME' ? 'Ganho' : 'Despesa'} via App - ${category}`,
          date: new Date().toISOString()
        });
        toast.success(type === "INCOME" ? "Ganho registrado com sucesso!" : "Despesa registrada com sucesso!");
      }
      
      navigate("/dashboard");
    } catch (error) {
      toast.error("Erro ao salvar lançamento.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined text-slate-400">close</span>
        </button>
        <h1 className="text-sm font-bold tracking-wider uppercase text-slate-300">Novo Lançamento</h1>
        <div className="w-10"></div>
      </header>

      {/* Type Selector (Ganhos vs Despesas) */}
      <div className="px-6 mt-2">
        <div className="flex bg-[#1e293b66] rounded-2xl p-1 border border-blue-500/10">
          <button 
            onClick={() => { setType("INCOME"); setCategory("UBER"); setAmount(""); setIsRecurring(false); }}
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

      {/* Amount Display */}
      <div className="flex-1 flex flex-col items-center justify-center py-6">
        <p className={`text-sm font-bold uppercase tracking-widest mb-2 ${type === "INCOME" ? "text-emerald-400" : "text-red-400"}`}>
          Valor {type === "INCOME" ? "Recebido" : "Gasto"}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-slate-500">R$</span>
          <span className={`text-6xl font-black tracking-tighter ${type === "INCOME" ? "text-emerald-400" : "text-red-400"}`}>
            {formatCurrency(amount)}
          </span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="px-4 mb-4">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {currentCategories.map(cat => (
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

      {/* Conditional Description & Recurrence Input */}
      {category === "OUTROS" && type === "EXPENSE" && (
        <div className="px-6 mb-4 animate-fade-in">
          <input 
            type="text" 
            placeholder="Descreva a despesa (ex: Aluguel do Carro)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-[#1e293b66] border border-blue-500/20 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <label className="flex items-center gap-3 mt-4 text-sm text-slate-300">
            <input 
              type="checkbox" 
              checked={isRecurring} 
              onChange={(e) => setIsRecurring(e.target.value === "true" || e.target.checked)} 
              className="size-5 rounded border-slate-700 bg-slate-800 text-blue-500 focus:ring-blue-500"
            />
            Essa é uma despesa fixa mensal?
          </label>
          
          {isRecurring && (
            <div className="mt-3 flex items-center gap-3 bg-[#1e293b66] p-3 rounded-xl border border-blue-500/20">
              <span className="text-sm text-slate-400">Dia do vencimento:</span>
              <input 
                type="number" 
                min="1" max="31" 
                value={dueDay}
                onChange={(e) => setDueDay(e.target.value)}
                className="w-16 bg-[#0f172a] border border-blue-500/30 rounded-lg p-2 text-center text-white focus:outline-none"
              />
            </div>
          )}
        </div>
      )}

      {/* Custom Keypad for Fast Entry */}
      <div className="bg-[#0f172a] rounded-t-[40px] p-6 border-t border-blue-500/10">
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
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
          <button onClick={handleBackspace} className="h-14 rounded-2xl bg-[#1e293b] text-slate-400 flex items-center justify-center active:scale-95 transition-transform">
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
