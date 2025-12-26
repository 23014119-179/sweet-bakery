import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CakeCard } from '@/components/cakes/CakeCard';
import { getFeaturedCakes } from '@/data/cakes';
import { ArrowRight } from 'lucide-react';

export const FeaturedCakes = () => {
  const featuredCakes = getFeaturedCakes();

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredCakes.slice(0, 6).map((cake) => (
            <CakeCard key={cake.id} cake={cake} />
          ))}
        </div>

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
