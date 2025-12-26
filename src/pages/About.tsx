import { Layout } from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Heart, Users } from 'lucide-react';

const About = () => {
  return (
    <Layout>
      <section className="py-12 md:py-16">
        <div className="container">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Story
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Sweet Celebrations Bakery was born from a passion for creating 
              unforgettable moments through the art of baking.
            </p>
          </div>

          {/* Story */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                From Our Kitchen to Your Heart
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2015, Sweet Celebrations began as a small home bakery 
                with a big dream: to create cakes that not only taste incredible 
                but also become the centerpiece of life's most precious moments.
              </p>
              <p className="text-muted-foreground mb-4">
                Today, we're proud to have been part of thousands of celebrations, 
                from intimate birthday gatherings to grand weddings. Every cake we 
                create is made with the same love and attention to detail as our 
                very first one.
              </p>
              <p className="text-muted-foreground">
                Our team of skilled bakers and decorators are passionate about 
                their craft, constantly pushing the boundaries of creativity while 
                never compromising on taste and quality.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 border border-border">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent">
                    <Heart className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Made with Love</h3>
                    <p className="text-sm text-muted-foreground">
                      Every ingredient is carefully selected, every detail is perfected.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent">
                    <Award className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Award Winning</h3>
                    <p className="text-sm text-muted-foreground">
                      Recognized for excellence in taste and design.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-accent">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Family Owned</h3>
                    <p className="text-sm text-muted-foreground">
                      A family business built on tradition and trust.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from sourcing ingredients 
              to delivering your cake.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  We use only premium ingredients - real butter, fresh eggs, 
                  and the finest chocolate and fruits.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">Creativity</h3>
                <p className="text-sm text-muted-foreground">
                  From classic designs to custom creations, we bring your 
                  vision to life with artistic flair.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg text-foreground mb-2">Customer Joy</h3>
                <p className="text-sm text-muted-foreground">
                  Your happiness is our success. We go above and beyond to 
                  make your celebration perfect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
