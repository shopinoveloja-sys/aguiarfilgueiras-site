import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  FuelType,
  VehicleProfile,
  generateLocalId,
  getActiveVehicle,
  loadVehicles,
  saveVehicles,
} from "../lib/fleet";

const fuelUnitMap: Record<FuelType, string> = {
  gasolina: "L",
  etanol: "L",
  gnv: "m3",
  diesel: "L",
  eletrico: "kWh",
};

export default function VehicleSettings() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState<VehicleProfile[]>(() => loadVehicles());
  const activeVehicle = useMemo(() => getActiveVehicle(vehicles), [vehicles]);
  const [draft, setDraft] = useState<VehicleProfile>(activeVehicle);

  const syncVehicles = (nextVehicles: VehicleProfile[], successMessage?: string) => {
    const normalized = nextVehicles.length > 0 ? nextVehicles : vehicles;
    setVehicles(normalized);
    saveVehicles(normalized);
    setDraft(getActiveVehicle(normalized));
    if (successMessage) toast.success(successMessage);
  };

  const selectVehicle = (vehicleId: string) => {
    const nextVehicles = vehicles.map((vehicle) => ({
      ...vehicle,
      active: vehicle.id === vehicleId,
    }));
    const selected = nextVehicles.find((vehicle) => vehicle.id === vehicleId);
    setVehicles(nextVehicles);
    saveVehicles(nextVehicles);
    setDraft(selected || nextVehicles[0]);
  };

  const saveCurrentVehicle = () => {
    const trimmedLabel = draft.label.trim();
    if (!trimmedLabel) {
      toast.error("Informe o nome do veiculo.");
      return;
    }

    if (draft.averageConsumption <= 0) {
      toast.error("Informe um consumo medio valido.");
      return;
    }

    syncVehicles(
      vehicles.map((vehicle) => (vehicle.id === draft.id ? { ...draft, label: trimmedLabel } : vehicle)),
      "Veiculo salvo com sucesso!",
    );
  };

  const addVehicle = () => {
    const nextVehicle: VehicleProfile = {
      id: generateLocalId("vehicle"),
      label: `Veiculo ${vehicles.length + 1}`,
      averageConsumption: 12.5,
      fuelType: "gasolina",
      active: true,
      createdAt: new Date().toISOString(),
    };

    syncVehicles(
      vehicles.map((vehicle) => ({ ...vehicle, active: false })).concat(nextVehicle),
      "Novo veiculo criado.",
    );
  };

  const removeVehicle = (vehicleId: string) => {
    if (vehicles.length === 1) {
      toast.error("Voce precisa manter pelo menos um veiculo.");
      return;
    }
    const nextVehicles = vehicles.filter((vehicle) => vehicle.id !== vehicleId);
    if (!nextVehicles.some((vehicle) => vehicle.active)) {
      nextVehicles[0].active = true;
    }
    syncVehicles(nextVehicles, "Veiculo removido.");
  };

  const fuelUnit = fuelUnitMap[draft.fuelType] || "L";

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white pb-24">
      <header className="sticky top-0 z-10 bg-[#0b0f19]/80 backdrop-blur-md border-b border-emerald-500/10 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate("/profile")} className="flex items-center justify-center p-2 rounded-full hover:bg-white/5">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold">Veiculos</h1>
        <button onClick={addVehicle} className="size-10 rounded-full bg-emerald-500/10 text-emerald-300 flex items-center justify-center">
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <section className="space-y-1">
          <h2 className="text-2xl font-bold">Detalhes do Veiculo</h2>
          <p className="text-sm text-slate-400">Cadastre mais de um veiculo e escolha qual esta em uso para alimentar as metricas.</p>
        </section>

        <section className="space-y-3">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className={`rounded-xl border p-4 ${vehicle.active ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-800 bg-slate-900"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <button className="text-left flex-1" onClick={() => selectVehicle(vehicle.id)}>
                  <p className="text-sm font-bold">{vehicle.label}</p>
                  <p className="text-xs text-slate-400">
                    {vehicle.averageConsumption.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} km/{fuelUnitMap[vehicle.fuelType]}
                  </p>
                </button>
                <div className="flex items-center gap-2">
                  {vehicle.active ? (
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-emerald-500/15 text-emerald-300">Em uso</span>
                  ) : (
                    <button
                      onClick={() => selectVehicle(vehicle.id)}
                      className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-slate-800 text-slate-300"
                    >
                      Usar
                    </button>
                  )}
                  <button onClick={() => removeVehicle(vehicle.id)} className="text-slate-500 hover:text-red-300">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="bg-[#1f2a3d66] rounded-xl border border-emerald-500/10 p-5 space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Nome do Veiculo</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-emerald-500/60">directions_car</span>
              <input
                className="w-full pl-10 pr-4 py-3 bg-[#161e2e] border-transparent focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg text-white placeholder-slate-500 transition-all"
                placeholder="Ex: Toyota Corolla"
                type="text"
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">{`Consumo medio (km/${fuelUnit})`}</label>
            <input
              className="w-full px-4 py-3 bg-[#161e2e] border-transparent focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg text-white placeholder-slate-500 transition-all"
              placeholder="Ex: 12.5"
              type="number"
              step="0.1"
              min="0"
              value={draft.averageConsumption}
              onChange={(e) => setDraft({ ...draft, averageConsumption: Number(e.target.value) || 0 })}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">Combustivel principal</label>
            <select
              className="w-full px-4 py-3 bg-[#161e2e] border-transparent focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-lg text-white transition-all"
              value={draft.fuelType}
              onChange={(e) => setDraft({ ...draft, fuelType: e.target.value as FuelType })}
            >
              <option value="gasolina">Gasolina</option>
              <option value="etanol">Etanol</option>
              <option value="gnv">GNV</option>
              <option value="diesel">Diesel</option>
              <option value="eletrico">Eletrico</option>
            </select>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-emerald-500/5 p-4 rounded-xl border border-emerald-500/20">
          <span className="material-symbols-outlined text-emerald-400 mt-0.5">info</span>
          <p className="text-sm leading-relaxed text-slate-300">
            O veiculo marcado como em uso alimenta as metricas operacionais, combustivel e manutencoes do painel.
          </p>
        </div>

        <button onClick={saveCurrentVehicle} className="w-full bg-gradient-to-br from-emerald-800 to-emerald-500 hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]">
          Salvar configuracoes
        </button>
      </main>
    </div>
  );
}
