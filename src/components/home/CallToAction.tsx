import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';

export const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Order Your Dream Cake?
        </h2>
        <p className="text-primary-foreground/90 max-w-2xl mx-auto mb-8">
          Whether it's a birthday, wedding, or any special occasion, we're here to 
          create the perfect cake for your celebration. Contact us today!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              <Phone className="mr-2 h-4 w-4" />
              Contact Us
            </Button>
          </Link>
          <Link to="/cakes">
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Browse Cakes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
