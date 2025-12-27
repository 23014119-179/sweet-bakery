import { api } from '@/lib/api';
import { CakesResponse, CakeResponse } from '@/types';

interface CakeFilters {
  category?: string;
  featured?: boolean;
  search?: string;
}

export const cakesService = {
  getAll: async (filters?: CakeFilters) => {
    const params = new URLSearchParams();
    
    if (filters?.category) {
      params.append('category', filters.category);
    }
    if (filters?.featured !== undefined) {
      params.append('featured', String(filters.featured));
    }
    if (filters?.search) {
      params.append('search', filters.search);
    }
    
    const queryString = params.toString();
    const endpoint = `/api/cakes${queryString ? `?${queryString}` : ''}`;
    
    return api.get<CakesResponse>(endpoint);
  },

  getById: async (id: string) => {
    return api.get<CakeResponse>(`/api/cakes/${id}`);
  },

  getFeatured: async () => {
    return api.get<CakesResponse>('/api/cakes?featured=true');
  },
};
