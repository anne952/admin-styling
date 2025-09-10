import { http } from './http';

export interface ReviewDto {
  id: number;
  vendorId: number;
  content: string;
  rating: number; // 1..5
}

export const ReviewsService = {
  async list(params: { vendorId: number }): Promise<ReviewDto[]> {
    const query = new URLSearchParams({ vendorId: String(params.vendorId) }).toString();
    return http<ReviewDto[]>(`/api/reviews?${query}`);
  },
  async create(input: { vendorId: number; content: string; rating: number }): Promise<ReviewDto> {
    return http<ReviewDto>(`/api/reviews`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  async remove(id: number): Promise<void> {
    await http<void>(`/api/reviews/${id}`, { method: 'DELETE' });
  },
};


