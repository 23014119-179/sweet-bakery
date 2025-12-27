import { api } from '@/lib/api';
import { Cake, CakeResponse, CakesResponse, Order, OrdersResponse, OrderResponse } from '@/types';

export interface CreateCakeData {
  name: string;
  description: string;
  price: number;
  image: string;
  category: Cake['category'];
  featured?: boolean;
  available?: boolean;
  customizableOptions?: Cake['customizableOptions'];
}

export interface UpdateCakeData extends Partial<CreateCakeData> {}

export const adminService = {
  // Cake management
  async createCake(data: CreateCakeData): Promise<Cake> {
    const response = await api.post<CakeResponse>('/api/cakes', data);
    return response.data;
  },

  async updateCake(id: string, data: UpdateCakeData): Promise<Cake> {
    const response = await api.put<CakeResponse>(`/api/cakes/${id}`, data);
    return response.data;
  },

  async deleteCake(id: string): Promise<void> {
    await api.delete(`/api/cakes/${id}`);
  },

  // Order management (admin can see all orders)
  async getAllOrders(status?: string): Promise<Order[]> {
    const query = status ? `?status=${status}` : '';
    const response = await api.get<OrdersResponse>(`/api/orders${query}`);
    return response.data;
  },

  async updateOrderStatus(id: string, status: Order['status']): Promise<Order> {
    const response = await api.put<OrderResponse>(`/api/orders/${id}`, { status });
    return response.data;
  },

  async deleteOrder(id: string): Promise<void> {
    await api.delete(`/api/orders/${id}`);
  },
};
