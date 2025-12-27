import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { CakeCard } from '@/components/cakes/CakeCard';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cakesService } from '@/services/cakesService';

export const FeaturedCakes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['cakes', 'featured'],
    queryFn: () => cakesService.getFeatured(),
  });

  const featuredCakes = data?.data || [];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Signature Creations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most beloved cakes, each one crafted with premium ingredients 
            and decorated with artistic precision.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredCakes.slice(0, 6).map((cake) => (
              <CakeCard key={cake._id} cake={cake} />
            ))}
          </div>
        )}

        <div className="text-center">
          <Link to="/cakes">
            <Button size="lg" variant="outline">
              View All Cakes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
