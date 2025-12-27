import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Cake } from '@/types';
import { ShoppingBag } from 'lucide-react';

// Import all cake images
import cakeChocolate from '@/assets/cake-chocolate.jpg';
import cakeVanilla from '@/assets/cake-vanilla.jpg';
import cakeRedVelvet from '@/assets/cake-red-velvet.jpg';
import cakeStrawberry from '@/assets/cake-strawberry.jpg';
import cakeWedding from '@/assets/cake-wedding.jpg';
import cakeBirthday from '@/assets/cake-birthday.jpg';

const imageMap: Record<string, string> = {
  '/cake-chocolate': cakeChocolate,
  '/cake-vanilla': cakeVanilla,
  '/cake-red-velvet': cakeRedVelvet,
  '/cake-strawberry': cakeStrawberry,
  '/cake-wedding': cakeWedding,
  '/cake-birthday': cakeBirthday,
};

interface CakeCardProps {
  cake: Cake;
}

export const CakeCard = ({ cake }: CakeCardProps) => {
  const categoryColors: Record<Cake['category'], string> = {
    birthday: 'bg-accent text-accent-foreground',
    wedding: 'bg-primary text-primary-foreground',
    custom: 'bg-secondary text-secondary-foreground',
    seasonal: 'bg-muted text-muted-foreground',
    cupcakes: 'bg-accent text-accent-foreground',
  };

  // Get image path without extension for lookup
  const imagePath = cake.image.replace('.jpg', '');

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageMap[imagePath] || cakeChocolate}
          alt={cake.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 ${categoryColors[cake.category]}`}>
          {cake.category.charAt(0).toUpperCase() + cake.category.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
          {cake.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {cake.description}
        </p>
        <p className="text-xl font-bold text-primary">
          ${cake.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Link to={`/cakes/${cake._id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Button size="icon" variant="default">
          <ShoppingBag className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
