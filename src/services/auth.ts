import { http } from './http';

export interface LoginResponse {
  token: string;
}

export interface MeDto {
  id: number;
  nom: string;
  email: string;
  role: string;
}

export const AuthService = {
  async register(input: { email?: string; nom?: string; password: string; role?: 'client' | 'vendeur' }): Promise<void> {
    await http<void>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  async login(input: { email?: string; nom?: string; password: string }): Promise<LoginResponse> {
    return http<LoginResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ ...input, app: 'admin' }),
    });
  },
  async logout(): Promise<void> {
    await http<void>('/api/auth/logout', { method: 'POST' });
  },
  async me(): Promise<MeDto> {
    return http<MeDto>('/api/auth/me');
  },
};
