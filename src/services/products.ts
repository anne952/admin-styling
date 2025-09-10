import { http } from './http';

export interface ProductDto {
  id: number;
  title: string;
  description?: string;
  price: number;
  image?: string;
  image1?: string;
  image2?: string;
  image3?: string;
}

export const ProductsService = {
  async list(): Promise<ProductDto[]> {
    return http<ProductDto[]>('/api/products');
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/products/${id}`, { method: 'DELETE' });
  },
};
