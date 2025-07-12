import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CollegeCard from './CollegeCard';
import Link from 'next/link';
import { colleges } from '@/data/collage';

export default function FeaturedColleges() {
  const featuredColleges = colleges.slice(0, 3);

  return (
    <section className="py-6 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Colleges
          </h2>
          <p className="text-xl max-w-2xl mx-auto">
            Discover top-rated institutions that offer exceptional education,
            research opportunities, and campus life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredColleges.map(college => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="academic"
            size="lg"
            className="px-8 py-6 bg-[#1A79CE] text-white hover:bg-blue-700"
            asChild
          >
            <Link href="/colleges">
              View All Colleges
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
