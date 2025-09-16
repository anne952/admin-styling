import { http } from './http';

export interface UserDto {
  id: number;
  nom: string;
  email: string;
  role: 'client' | 'vendeur' | string;
  urlImage?: string;
  telephone?: string;
  specialite?: string;
  type?: string;
  localisation?: string;
  publications?: number;
  likes?: number;
}

export const UsersService = {
  async list(): Promise<UserDto[]> {
    return http<UserDto[]>('/api/users');
  },
  async updateMe(input: { nom: string }): Promise<void> {
    await http<void>('/api/users/me', { method: 'PUT', body: JSON.stringify(input) });
  },
  async get(id: number): Promise<UserDto> {
    return http<UserDto>(`/api/users/${id}`);
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/users/${id}`, { method: 'DELETE' });
  },
};
