// Types matching backend models exactly

export interface Cake {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'birthday' | 'wedding' | 'custom' | 'cupcakes' | 'seasonal';
  featured: boolean;
  available: boolean;
  customizableOptions: {
    sizes: string[];
    flavors: string[];
    frostings: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  cake: string | Cake;
  quantity: number;
  customization: {
    size: string;
    flavor: string;
    frosting: string;
    message?: string;
  };
  priceAtOrder: number;
}

export interface Order {
  _id: string;
  user: string | User;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  deliveryDate: string;
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface CakesResponse {
  success: boolean;
  count: number;
  data: Cake[];
}

export interface CakeResponse {
  success: boolean;
  data: Cake;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  data: Order[];
}

export interface OrderResponse {
  success: boolean;
  data: Order;
}
