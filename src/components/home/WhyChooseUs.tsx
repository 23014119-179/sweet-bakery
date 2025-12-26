import { Award, Clock, Heart, Truck } from 'lucide-react';

const features = [
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Every cake is handcrafted with passion and attention to detail by our expert bakers.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'We use only the finest ingredients to ensure every bite is absolutely delicious.',
  },
  {
    icon: Clock,
    title: 'Fresh Baked',
    description: 'Your cake is baked fresh for your special day, never frozen or pre-made.',
  },
  {
    icon: Truck,
    title: 'Safe Delivery',
    description: 'We carefully deliver your cake to your doorstep in perfect condition.',
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're dedicated to making your celebrations extra special with our 
            commitment to quality and service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg bg-background border border-border hover:shadow-md transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent mb-4">
                <feature.icon className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
