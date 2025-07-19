import Campus from '@/components/Campus';
import FeaturedColleges from '@/components/FeaturedColleges';
import HeroSection from '@/components/HeroSection';
import ResearchSection from '@/components/ResearchSection';
import ReviewsSection from '@/components/ReviewsSection';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* search Seaction */}
      <section className="w-full mx-auto py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Your Perfect College
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Search through our comprehensive database of world-class
              institutions to find the perfect match for your academic goals.
            </p>
          </div>
          <div className="w-full  mx-auto px-4">
            <div className="container mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white shadow rounded p-4">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* featured collage section */}

      <FeaturedColleges />
      {/* campus section */}
      <Campus />
      {/* ResearchSection  */}
      <ResearchSection />
      {/* ReviewsSection */}
      <ReviewsSection />
    </div>
  );
}
