export const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:4000').replace(/\/$/, '');

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function http<T>(path: string, options: RequestInit & { method?: HttpMethod } = {}): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> | undefined),
  };
  const token = localStorage.getItem('auth_token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(url, { ...options, headers });
  if (!res.ok) {
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
  return (await res.json()) as T;
}
