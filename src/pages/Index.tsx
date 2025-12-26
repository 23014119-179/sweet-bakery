import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { FeaturedCakes } from '@/components/home/FeaturedCakes';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CallToAction } from '@/components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedCakes />
      <WhyChooseUs />
      <CallToAction />
    </Layout>
  );
};

export default Index;
