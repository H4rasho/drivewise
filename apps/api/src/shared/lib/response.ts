import type { ApiSuccess, ApiError } from "@drivewise/shared";

export function ok<T>(data: T): ApiSuccess<T> {
  return { ok: true, data };
}

export function err(code: string, message: string): ApiError {
  return { ok: false, error: { code, message } };
}
