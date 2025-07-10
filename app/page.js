import Campus from '@/components/Campus';
import HeroSection from '@/components/HeroSection';
import ResearchSection from '@/components/ResearchSection';
import ReviewsSection from '@/components/ReviewsSection';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      {/* search Seaction */}
      <section className="py-20 bg-muted">
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
          <div className="w-full max-w-2xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-white shadow rounded p-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for colleges by name, location, or description..."
                  className="pl-10 pr-10 h-12 w-full px-4 py-3 border-2 border-blue-600 rounded
                   focus:border-blue-700 focus:ring-1 focus:ring-blue-400 transition duration-300"
                />
                {/* {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )} */}
              </div>

              <Button className="w-full sm:w-auto text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base sm:text-lg shadow-lg transition-transform hover:scale-105">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* campus section */}
      <Campus />
      {/* ResearchSection  */}
      <ResearchSection />
      {/* ReviewsSection */}
      <ReviewsSection />
    </div>
  );
}
