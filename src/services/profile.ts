import { http } from './http';

export interface UpdateProfileInput {
  telephone?: string;
  specialite?: string;
  type?: string;
  localisation?: string;
  photoProfil?: string;
}

export const ProfileService = {
  async update(input: UpdateProfileInput): Promise<void> {
    // Try vendor endpoint first, then generic user endpoint
    try {
      await http<void>('/auth/profile', { method: 'PUT', body: JSON.stringify(input) });
    } catch (e: any) {
      if (String(e?.message || '').includes('404')) {
        await http<void>('/users/me', { method: 'PUT', body: JSON.stringify(input) });
        return;
      }
      throw e;
    }
  },
  async updatePhotoUrl(photoUrl: string): Promise<{ message?: string; user?: any }> {
    const payload = { photoProfil: photoUrl };
    try {
      return await http<{ message?: string; user?: any }>(`/auth/profile`, { method: 'PUT', body: JSON.stringify(payload) });
    } catch (e: any) {
      if (String(e?.message || '').includes('404')) {
        return await http<{ message?: string; user?: any }>(`/users/me`, { method: 'PUT', body: JSON.stringify(payload) });
      }
      throw e;
    }
  },
};


