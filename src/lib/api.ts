// ============================================================
// Central API client - replaces Supabase on the frontend
// ============================================================

// In dev: Vite proxies /api -> localhost:3001.
// In prod: set VITE_API_URL to your backend domain.
const rawBaseUrl = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
const BASE_URL = rawBaseUrl.replace(/\/$/, "") || (import.meta.env.PROD ? "https://forge-scale.onrender.com" : "");
const TOKEN_KEY = "admin_token";

export const token = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (value: string) => localStorage.setItem(TOKEN_KEY, value),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  isFormData = false,
): Promise<T> {
  const headers: Record<string, string> = {};
  const currentToken = token.get();

  if (currentToken) {
    headers.Authorization = `Bearer ${currentToken}`;
  }

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: isFormData
      ? (body as FormData)
      : body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({ error: response.statusText }));
    // Log full details to console so devtools shows the real error
    console.error(`[API] ${method} ${path} → HTTP ${response.status}`, errorPayload);
    throw new Error(errorPayload.error || `Erreur HTTP ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>("GET", path),
  post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
  put: <T>(path: string, body: unknown) => request<T>("PUT", path, body),
  patch: <T>(path: string, body: unknown) => request<T>("PATCH", path, body),
  delete: <T>(path: string) => request<T>("DELETE", path),
  upload: <T>(path: string, form: FormData) => request<T>("POST", path, form, true),
  uploadPut: <T>(path: string, form: FormData) => request<T>("PUT", path, form, true),
  asset: (assetPath: string | null | undefined) => {
    if (!assetPath) return null;
    if (/^https?:\/\//i.test(assetPath)) return assetPath;
    return `${BASE_URL}${assetPath}`;
  },
};
