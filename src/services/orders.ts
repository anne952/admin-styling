import { http } from './http';

export interface OrderDto {
  id: number;
  userId: number;
  status: string;
  total?: number;
}

export const OrdersService = {
  async list(): Promise<OrderDto[]> {
    return http<OrderDto[]>('/api/orders');
  },
};


