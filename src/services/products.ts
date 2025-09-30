import { http } from './http';

export interface ProductDto {
  id: number;
  title?: string;
  nom?: string;
  description?: string;
  price?: number;
  prix?: number;
  image?: string;
  urlImage?: string;
  productImages?: string[];
  image1?: string;
  image2?: string;
  image3?: string;
  vendorId?: number;
}

export const ProductsService = {
  async list(): Promise<ProductDto[]> {
    return http<ProductDto[]>('/api/products');
  },
  async getByUser(userId: number): Promise<ProductDto[]> {
    return http<ProductDto[]>(`/api/users/${userId}/products`);
  },
  async create(input: Omit<ProductDto, 'id'> & { vendorId?: number }): Promise<ProductDto> {
    return http<ProductDto>('/api/products', { method: 'POST', body: JSON.stringify(input) });
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/products/${id}`, { method: 'DELETE' });
  },
};
