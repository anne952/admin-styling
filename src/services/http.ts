export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'https://backend-x-stylings.onrender.com').replace(/\/$/, '');

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function http<T>(path: string, options: RequestInit & { method?: HttpMethod } = {}): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const isFormData = options.body && typeof FormData !== 'undefined' && (options.body as any) instanceof FormData;
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string> | undefined),
  };
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
    try {
      const errorText = await res.clone().text().catch(() => '');
      const evt = new CustomEvent('app_alert', { detail: { type: 'error', message: errorText || `HTTP ${res.status}` } });
      window.dispatchEvent(evt);
    } catch {}
    if (res.status === 401) {
      // Supprimer le token et rediriger vers la page de login
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
      // Optionnel : forcer le rechargement
      window.location.reload();
    }
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  let data: any;
  try {
    data = await res.clone().json();
  } catch {
    try {
      data = await res.text();
    } catch {
      data = undefined;
    }
  }
  try {
    if ((options.method && options.method !== 'GET')) {
      const evt = new CustomEvent('app_alert', { detail: { type: 'success', message: 'Opération réussie' } });
      window.dispatchEvent(evt);
    }
  } catch {}
  return data as T;
}
