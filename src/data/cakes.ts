export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'birthday' | 'wedding' | 'custom' | 'seasonal';
  customizableOptions: {
    sizes: string[];
    flavors: string[];
    canAddMessage: boolean;
  };
  featured: boolean;
}

export const cakes: Cake[] = [
  {
    id: '1',
    name: 'Classic Chocolate Dream',
    description: 'Rich, moist chocolate layers with silky ganache frosting, topped with fresh berries and gold dust.',
    price: 65,
    image: '/cake-chocolate',
    category: 'birthday',
    customizableOptions: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['Dark Chocolate', 'Milk Chocolate', 'Double Chocolate'],
      canAddMessage: true,
    },
    featured: true,
  },
  {
    id: '2',
    name: 'Vanilla Blossom',
    description: 'Light and fluffy vanilla cake with buttercream frosting, decorated with edible flowers and gold leaf.',
    price: 55,
    image: '/cake-vanilla',
    category: 'birthday',
    customizableOptions: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['French Vanilla', 'Madagascar Vanilla', 'Vanilla Bean'],
      canAddMessage: true,
    },
    featured: true,
  },
  {
    id: '3',
    name: 'Red Velvet Romance',
    description: 'Stunning red velvet layers with cream cheese frosting, perfect for romantic celebrations.',
    price: 70,
    image: '/cake-red-velvet',
    category: 'custom',
    customizableOptions: {
      sizes: ['6 inch', '8 inch', '10 inch', '12 inch'],
      flavors: ['Classic Red Velvet', 'Blue Velvet', 'Pink Velvet'],
      canAddMessage: true,
    },
    featured: true,
  },
  {
    id: '4',
    name: 'Strawberry Shortcake Bliss',
    description: 'Fresh strawberries layered with whipped cream and light sponge cake, dusted with powdered sugar.',
    price: 60,
    image: '/cake-strawberry',
    category: 'seasonal',
    customizableOptions: {
      sizes: ['6 inch', '8 inch'],
      flavors: ['Classic Strawberry', 'Strawberry Lemon', 'Mixed Berry'],
      canAddMessage: true,
    },
    featured: false,
  },
  {
    id: '5',
    name: 'Elegant Wedding Tier',
    description: 'Sophisticated multi-tier wedding cake with intricate lace patterns and sugar flowers.',
    price: 350,
    image: '/cake-wedding',
    category: 'wedding',
    customizableOptions: {
      sizes: ['3 tier', '4 tier', '5 tier'],
      flavors: ['Vanilla', 'Champagne', 'Lemon', 'Chocolate'],
      canAddMessage: false,
    },
    featured: true,
  },
  {
    id: '6',
    name: 'Rainbow Celebration',
    description: 'Colorful rainbow layers with vanilla buttercream, covered in sprinkles and topped with candles.',
    price: 75,
    image: '/cake-birthday',
    category: 'birthday',
    customizableOptions: {
      sizes: ['6 inch', '8 inch', '10 inch'],
      flavors: ['Vanilla Rainbow', 'Chocolate Rainbow', 'Funfetti'],
      canAddMessage: true,
    },
    featured: true,
  },
];

export const getCakeById = (id: string): Cake | undefined => {
  return cakes.find(cake => cake.id === id);
};

export const getFeaturedCakes = (): Cake[] => {
  return cakes.filter(cake => cake.featured);
};

export const getCakesByCategory = (category: Cake['category']): Cake[] => {
  return cakes.filter(cake => cake.category === category);
};
