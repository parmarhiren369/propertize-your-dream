import WebGLBackground from '@/components/WebGLBackground';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturedProperties from '@/components/FeaturedProperties';
import ScrollShowcase from '@/components/ScrollShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <main className="relative min-h-screen">
      <WebGLBackground />
      <Navbar />
      <HeroSection />
      <FeaturedProperties />
      <ScrollShowcase />
      <Footer />
    </main>
  );
};

export default Index;
