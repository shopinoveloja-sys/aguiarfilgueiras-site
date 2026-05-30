export type FuelType = "gasolina" | "etanol" | "gnv" | "diesel" | "eletrico";
export type RidePlatform = "UBER" | "99" | "INDRIVE" | "PARTICULAR" | "OUTRAS";

export interface VehicleProfile {
  id: string;
  label: string;
  averageConsumption: number;
  fuelType: FuelType;
  active: boolean;
  createdAt: string;
}

export interface OperationLog {
  id: string;
  date: string;
  vehicleId: string;
  startTime: string;
  endTime: string;
  kmStart: number | null;
  kmEnd: number | null;
  syncedKmId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FuelLog {
  id: string;
  date: string;
  vehicleId: string;
  fuelType: FuelType;
  paymentMethod?: "cash" | "card";
  unitPrice: number;
  totalPrice: number;
  quantity: number;
  odometerKm?: number | null;
  createdAt: string;
}

export interface MaintenancePlan {
  id: string;
  vehicleId: string;
  name: string;
  dueKm: number;
  cost: number;
  notes: string;
  enabled: boolean;
  lastDismissedAtKm?: number | null;
  createdAt: string;
}

export interface MaintenanceReserveItem extends MaintenancePlan {
  currentKm: number;
  remainingKm: number;
  averageKmPerDay: number;
  estimatedDays: number | null;
  dailyReserve: number;
  accumulatedReserve: number;
}

export interface RideCountLog {
  id: string;
  date: string;
  vehicleId: string;
  counts: Record<RidePlatform, number>;
  createdAt: string;
  updatedAt: string;
}

const VEHICLES_KEY = "drivercash_vehicles";
const LEGACY_VEHICLE_KEY = "drivercash_vehicle";
const OPERATION_LOGS_KEY = "drivercash_operation_logs";
const FUEL_LOGS_KEY = "drivercash_fuel_logs";
const MAINTENANCE_KEY = "drivercash_maintenance_plans";
const RIDE_COUNT_LOGS_KEY = "drivercash_ride_count_logs";

const defaultVehicle: VehicleProfile = {
  id: "vehicle-default",
  label: "Meu veiculo",
  averageConsumption: 12.5,
  fuelType: "gasolina",
  active: true,
  createdAt: new Date().toISOString(),
};

const fuelAliases: Record<string, FuelType> = {
  gasolina: "gasolina",
  alcool: "etanol",
  etanol: "etanol",
  gnv: "gnv",
  diesel: "diesel",
  eletrico: "eletrico",
};

function safeRead(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // noop
  }
}

function parseList<T>(value: string | null): T[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function normalizeFuelType(value: string | undefined): FuelType {
  return fuelAliases[(value || "").toLowerCase()] || "gasolina";
}

export function generateLocalId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function normalizeVehicles(input: VehicleProfile[]) {
  const list = input.length > 0 ? input : [defaultVehicle];
  const activeId = list.find((item) => item.active)?.id || list[0].id;
  return list.map((item) => ({
    ...item,
    active: item.id === activeId,
  }));
}

export function loadVehicles(): VehicleProfile[] {
  const raw = parseList<Partial<VehicleProfile>>(safeRead(VEHICLES_KEY));
  if (raw.length > 0) {
    return normalizeVehicles(
      raw.map((item, index) => ({
        id: item.id || generateLocalId(`vehicle-${index}`),
        label: item.label || "Meu veiculo",
        averageConsumption: Number(item.averageConsumption) || 12.5,
        fuelType: normalizeFuelType(item.fuelType),
        active: Boolean(item.active),
        createdAt: item.createdAt || new Date().toISOString(),
      })),
    );
  }

  const legacyRaw = safeRead(LEGACY_VEHICLE_KEY);
  if (legacyRaw) {
    try {
      const legacy = JSON.parse(legacyRaw);
      const migrated = normalizeVehicles([
        {
          id: "vehicle-legacy",
          label: legacy.model || "Meu veiculo",
          averageConsumption: Number(legacy.consumption) || 12.5,
          fuelType: normalizeFuelType(legacy.fuelType),
          active: true,
          createdAt: new Date().toISOString(),
        },
      ]);
      saveVehicles(migrated);
      return migrated;
    } catch {
      // noop
    }
  }

  saveVehicles([defaultVehicle]);
  return [defaultVehicle];
}

export function saveVehicles(vehicles: VehicleProfile[]) {
  safeWrite(VEHICLES_KEY, JSON.stringify(normalizeVehicles(vehicles)));
}

export function getActiveVehicle(vehicles = loadVehicles()) {
  return normalizeVehicles(vehicles).find((item) => item.active) || normalizeVehicles(vehicles)[0];
}

export function loadOperationLogs(): OperationLog[] {
  return parseList<Partial<OperationLog>>(safeRead(OPERATION_LOGS_KEY))
    .map((item) => ({
      id: item.id || generateLocalId("op"),
      date: item.date || todayKey(),
      vehicleId: item.vehicleId || getActiveVehicle().id,
      startTime: item.startTime || "",
      endTime: item.endTime || "",
      kmStart: item.kmStart ?? null,
      kmEnd: item.kmEnd ?? null,
      syncedKmId: item.syncedKmId ?? null,
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function saveOperationLogs(logs: OperationLog[]) {
  safeWrite(OPERATION_LOGS_KEY, JSON.stringify(logs));
}

export function loadFuelLogs(): FuelLog[] {
  return parseList<Partial<FuelLog>>(safeRead(FUEL_LOGS_KEY))
    .map((item) => ({
      id: item.id || generateLocalId("fuel"),
      date: item.date || todayKey(),
      vehicleId: item.vehicleId || getActiveVehicle().id,
      fuelType: normalizeFuelType(item.fuelType),
      paymentMethod: item.paymentMethod === "card" ? "card" : "cash",
      unitPrice: Number(item.unitPrice) || 0,
      totalPrice: Number(item.totalPrice) || 0,
      quantity: Number(item.quantity) || 0,
      odometerKm: item.odometerKm ?? null,
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function saveFuelLogs(logs: FuelLog[]) {
  safeWrite(FUEL_LOGS_KEY, JSON.stringify(logs));
}

export function loadRideCountLogs(): RideCountLog[] {
  return parseList<Partial<RideCountLog>>(safeRead(RIDE_COUNT_LOGS_KEY))
    .map((item) => ({
      id: item.id || generateLocalId("ride"),
      date: item.date || todayKey(),
      vehicleId: item.vehicleId || getActiveVehicle().id,
      counts: {
        UBER: Number(item.counts?.UBER) || 0,
        "99": Number(item.counts?.["99"]) || 0,
        INDRIVE: Number(item.counts?.INDRIVE) || 0,
        PARTICULAR: Number(item.counts?.PARTICULAR) || 0,
        OUTRAS: Number(item.counts?.OUTRAS) || 0,
      },
      createdAt: item.createdAt || new Date().toISOString(),
      updatedAt: item.updatedAt || new Date().toISOString(),
    }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function saveRideCountLogs(logs: RideCountLog[]) {
  safeWrite(RIDE_COUNT_LOGS_KEY, JSON.stringify(logs));
}

export function loadMaintenancePlans(): MaintenancePlan[] {
  return parseList<Partial<MaintenancePlan>>(safeRead(MAINTENANCE_KEY))
    .map((item) => ({
      id: item.id || generateLocalId("maintenance"),
      vehicleId: item.vehicleId || getActiveVehicle().id,
      name: item.name || "Manutencao",
      dueKm: Number(item.dueKm) || 0,
      cost: Number(item.cost) || 0,
      notes: item.notes || "",
      enabled: item.enabled !== false,
      lastDismissedAtKm: item.lastDismissedAtKm ?? null,
      createdAt: item.createdAt || new Date().toISOString(),
    }))
    .sort((a, b) => a.dueKm - b.dueKm);
}

export function saveMaintenancePlans(plans: MaintenancePlan[]) {
  safeWrite(MAINTENANCE_KEY, JSON.stringify(plans));
}

export function isOperationLogComplete(log: OperationLog) {
  return log.kmStart !== null && log.kmEnd !== null && log.kmEnd >= log.kmStart;
}

export function getOperationLogForDate(date: string, vehicleId?: string) {
  return loadOperationLogs().find((item) => item.date === date && (!vehicleId || item.vehicleId === vehicleId)) || null;
}

export function getLatestVehicleKm(vehicleId: string) {
  const completeLogs = loadOperationLogs()
    .filter((item) => item.vehicleId === vehicleId && isOperationLogComplete(item))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return completeLogs[0]?.kmEnd ?? 0;
}

export function getPreviousVehicleKm(vehicleId: string, date: string) {
  const completeLogs = loadOperationLogs()
    .filter((item) => item.vehicleId === vehicleId && isOperationLogComplete(item) && item.date < date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return completeLogs[0]?.kmEnd ?? null;
}

export function getDueMaintenance(vehicleId: string, currentKm: number) {
  return loadMaintenancePlans()
    .filter((item) => item.vehicleId === vehicleId && item.enabled && item.dueKm > 0)
    .filter((item) => currentKm >= item.dueKm && (!item.lastDismissedAtKm || item.lastDismissedAtKm < item.dueKm))
    .sort((a, b) => a.dueKm - b.dueKm);
}

export function getVehicleAverageKmPerDay(vehicleId: string) {
  const completeLogs = loadOperationLogs().filter((item) => item.vehicleId === vehicleId && isOperationLogComplete(item));
  if (completeLogs.length === 0) return 0;
  const totalKm = completeLogs.reduce((sum, item) => sum + Math.max(0, (item.kmEnd || 0) - (item.kmStart || 0)), 0);
  const uniqueDays = new Set(completeLogs.map((item) => item.date)).size || completeLogs.length;
  return uniqueDays > 0 ? totalKm / uniqueDays : 0;
}

export function getMaintenanceReserveItems(vehicleId: string, currentKm = getLatestVehicleKm(vehicleId)): MaintenanceReserveItem[] {
  const averageKmPerDay = getVehicleAverageKmPerDay(vehicleId);
  const today = new Date(`${todayKey()}T12:00:00`);

  return loadMaintenancePlans()
    .filter((item) => item.vehicleId === vehicleId && item.enabled && item.cost > 0 && item.dueKm > 0)
    .map((item) => {
      const remainingKm = Math.max(0, item.dueKm - currentKm);
      const estimatedDays = averageKmPerDay > 0 ? Math.max(1, Math.ceil(remainingKm / averageKmPerDay)) : null;
      const dailyReserve = estimatedDays ? item.cost / estimatedDays : item.cost;
      const createdAt = new Date(item.createdAt || today);
      const createdAtDay = Number.isNaN(createdAt.getTime())
        ? today
        : new Date(createdAt.getFullYear(), createdAt.getMonth(), createdAt.getDate(), 12, 0, 0, 0);
      const elapsedDays = Math.max(1, Math.floor((today.getTime() - createdAtDay.getTime()) / 86400000) + 1);
      const accumulatedReserve = Math.min(item.cost, dailyReserve * elapsedDays);

      return {
        ...item,
        currentKm,
        remainingKm,
        averageKmPerDay,
        estimatedDays,
        dailyReserve,
        accumulatedReserve,
      };
    })
    .sort((a, b) => a.dueKm - b.dueKm);
}
