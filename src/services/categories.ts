import { http } from './http';

export interface CategoryDto {
  id: number;
  type: string;
}

export const CategoriesService = {
  async list(): Promise<CategoryDto[]> {
    return http<CategoryDto[]>('/api/categories');
  },
  async create(type: string): Promise<CategoryDto> {
    return http<CategoryDto>('/api/categories', {
      method: 'POST',
      body: JSON.stringify({ type }),
    });
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/categories/${id}`, { method: 'DELETE' });
  },
};


