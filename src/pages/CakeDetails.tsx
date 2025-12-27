import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Minus, Plus, ShoppingBag, Loader2 } from 'lucide-react';
import { cakesService } from '@/services/cakesService';

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

const CakeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery({
    queryKey: ['cake', id],
    queryFn: () => cakesService.getById(id!),
    enabled: !!id,
  });

  const cake = data?.cake;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [message, setMessage] = useState('');

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-16 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !cake) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Cake Not Found</h1>
          <p className="text-muted-foreground mb-8">The cake you're looking for doesn't exist.</p>
          <Link to="/cakes">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cakes
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedFlavor) {
      toast({
        title: 'Please select options',
        description: 'Choose a size and flavor before adding to cart.',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Added to Cart!',
      description: `${quantity}x ${cake.name} (${selectedSize}, ${selectedFlavor}) added to your cart.`,
    });
  };

  // Get image path without extension for lookup
  const imagePath = cake.image.replace('.jpg', '');

  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          <Link 
            to="/cakes" 
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cakes
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-card">
              <img
                src={imageMap[imagePath] || cakeChocolate}
                alt={cake.name}
                className="object-cover w-full h-full"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                {cake.category.charAt(0).toUpperCase() + cake.category.slice(1)}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {cake.name}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {cake.description}
                </p>
              </div>

              <div className="text-3xl font-bold text-primary">
                ${cake.price.toFixed(2)}
              </div>

              {/* Size Selection */}
              <div className="space-y-2">
                <Label>Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {cake.customizableOptions.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Flavor Selection */}
              <div className="space-y-2">
                <Label>Flavor</Label>
                <Select value={selectedFlavor} onValueChange={setSelectedFlavor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select flavor" />
                  </SelectTrigger>
                  <SelectContent>
                    {cake.customizableOptions.flavors.map((flavor) => (
                      <SelectItem key={flavor} value={flavor}>
                        {flavor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Custom Message */}
              <div className="space-y-2">
                <Label>Custom Message (optional)</Label>
                <Textarea
                  placeholder="Happy Birthday, John!"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={50}
                />
                <p className="text-xs text-muted-foreground">
                  {message.length}/50 characters
                </p>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart - ${(cake.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CakeDetails;
