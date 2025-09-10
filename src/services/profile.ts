import { http } from './http';

export interface UpdateProfileInput {
  telephone?: string;
  specialite?: string;
  type?: string;
  localisation?: string;
}

export const ProfileService = {
  async update(input: UpdateProfileInput): Promise<void> {
    await http<void>('/profile', { method: 'PUT', body: JSON.stringify(input) });
  },
};


