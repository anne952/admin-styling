import { http } from './http';

export interface ColorDto {
  id: number;
  hex: string;
}

export const ColorsService = {
  async list(): Promise<ColorDto[]> {
    return http<ColorDto[]>('/api/colors');
  },
  async create(hex: string, name: string): Promise<ColorDto> {
    // Envoyer à la fois name et nom pour compatibilité backend
    return http<ColorDto>('/api/colors', { method: 'POST', body: JSON.stringify({ hex, name, nom: name }) });
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/colors/${id}`, { method: 'DELETE' });
  },
};


