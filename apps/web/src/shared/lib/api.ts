import type {
  ParkingTip,
  ParkingType,
  MaintenanceItem,
  Signal,
  SignalCategory,
  Rule,
  QuizQuestion,
  QuizSubmit,
  QuizResult,
  DeviceProgress,
  ProgressSync,
} from "@drivewise/shared";

type ApiOk<T> = { ok: true; data: T };
type ApiErr = { ok: false; error: { code: string; message: string } };
type ApiRes<T> = ApiOk<T> | ApiErr;

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`/api/v1${path}`);
  const json: ApiRes<T> = await res.json();
  if (!json.ok) throw new Error(json.error.message);
  return json.data;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`/api/v1${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json: ApiRes<T> = await res.json();
  if (!json.ok) throw new Error(json.error.message);
  return json.data;
}

export const api = {
  parking: {
    tips: () => get<ParkingTip[]>("/parking/tips"),
    tipByType: (type: ParkingType) => get<ParkingTip>(`/parking/tips/${type}`),
  },
  maintenance: {
    schedule: () => get<MaintenanceItem[]>("/maintenance/schedule"),
  },
  care: {
    checklist: () => get<{ id: string; title: string; description: string; category: string }[]>("/care/checklist"),
  },
  signals: {
    list: (category?: SignalCategory) =>
      get<Signal[]>(category ? `/signals?category=${category}` : "/signals"),
    byId: (id: string) => get<Signal>(`/signals/${id}`),
  },
  rules: {
    list: () => get<Rule[]>("/rules"),
  },
  quiz: {
    generate: (limit = 10) => get<QuizQuestion[]>(`/quiz/generate?limit=${limit}`),
    submit: (body: QuizSubmit) => post<QuizResult>("/quiz/submit", body),
  },
  progress: {
    get: (deviceId: string) => get<DeviceProgress>(`/progress/${deviceId}`),
    sync: (body: ProgressSync) => post<DeviceProgress>("/progress/sync", body),
  },
};
