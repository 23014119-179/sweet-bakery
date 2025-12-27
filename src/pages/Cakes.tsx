import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { CakeCard } from '@/components/cakes/CakeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import { cakesService } from '@/services/cakesService';
import { Cake } from '@/types';

const categories: { value: Cake['category'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All Cakes' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'custom', label: 'Custom' },
  { value: 'seasonal', label: 'Seasonal' },
];

const Cakes = () => {
  const [activeCategory, setActiveCategory] = useState<Cake['category'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['cakes', activeCategory, searchQuery],
    queryFn: () => cakesService.getAll({
      category: activeCategory === 'all' ? undefined : activeCategory,
      search: searchQuery || undefined,
    }),
  });

  const cakes = data?.data || [];

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Cake Collection
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our selection of handcrafted cakes, each one made with love and 
              the finest ingredients. Find the perfect cake for your celebration.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search cakes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={activeCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category.value)}
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <p className="text-destructive mb-4">
                Failed to load cakes. Please try again.
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          )}

          {/* Results */}
          {!isLoading && !error && cakes.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cakes.map((cake) => (
                <CakeCard key={cake._id} cake={cake} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && cakes.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No cakes found matching your criteria. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cakes;
