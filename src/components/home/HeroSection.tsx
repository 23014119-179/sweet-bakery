import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-cake.jpg';

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Handcrafted with Love
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Make Every Celebration
            <span className="text-primary block">Unforgettable</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-lg">
            From birthdays to weddings, our custom cakes are crafted to make your 
            special moments even sweeter. Order your perfect cake today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/cakes">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Our Cakes
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Custom Order
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 pt-8 border-t border-border">
            <div>
              <p className="text-3xl font-bold text-primary">500+</p>
              <p className="text-sm text-muted-foreground">Happy Customers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Cake Designs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">5★</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
