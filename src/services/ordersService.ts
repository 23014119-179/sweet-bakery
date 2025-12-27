import { api } from '@/lib/api';
import { OrdersResponse, OrderResponse, Order } from '@/types';

interface CreateOrderData {
  items: {
    cake: string;
    quantity: number;
    customization: {
      size: string;
      flavor: string;
      frosting: string;
      message?: string;
    };
  }[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  deliveryDate: string;
  specialInstructions?: string;
}

export const ordersService = {
  getAll: async (status?: Order['status']) => {
    const endpoint = status ? `/api/orders?status=${status}` : '/api/orders';
    return api.get<OrdersResponse>(endpoint);
  },

  getById: async (id: string) => {
    return api.get<OrderResponse>(`/api/orders/${id}`);
  },

  create: async (orderData: CreateOrderData) => {
    return api.post<OrderResponse>('/api/orders', orderData);
  },

  cancel: async (id: string) => {
    return api.delete<{ success: boolean; message: string }>(`/api/orders/${id}`);
  },
};
