'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const galleryImages = [
  {
    id: 1,
    url: 'https://media.istockphoto.com/id/2162644435/photo/walking-happy-and-girl-with-friends-at-university-for-learning-bonding-and-talking-with-fun.webp?a=1&b=1&s=612x612&w=0&k=20&c=VZoYUAK9OGQEcbcdEedhWbYZVPbp96WWD-Hmfd6XHGc=',
    title: 'Harvard Class of 2024',
    description: 'Graduation ceremony with 2,000+ graduates',
    year: '2024',
    college: 'Harvard University',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
    title: 'MIT Innovation Summit',
    description: 'Students presenting their tech innovations',
    year: '2024',
    college: 'MIT',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop',
    title: 'Stanford Alumni Gathering',
    description: 'Annual alumni meetup with 500+ attendees',
    year: '2024',
    college: 'Stanford University',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    title: 'Oxford Academic Conference',
    description: 'International research conference',
    year: '2024',
    college: 'University of Oxford',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    title: 'Cambridge Science Fair',
    description: 'Student research presentations',
    year: '2024',
    college: 'University of Cambridge',
  },
  {
    id: 6,
    url: 'https://media.istockphoto.com/id/1779070756/photo/two-university-students-walk-down-campus-stairs.webp?a=1&b=1&s=612x612&w=0&k=20&c=6M6XJocLF9P8p2jlAUwZhGGMiosxZcgELucrn7avHNE=',
    title: 'Yale Cultural Festival',
    description: 'Diverse cultural celebrations',
    year: '2024',
    college: 'Yale University',
  },
];

export default function Campus() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex(prev => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      prev => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  const goToImage = index => {
    setCurrentIndex(index);
  };

  const currentImage = galleryImages[currentIndex];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Campus Life Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore memorable moments from college events, graduations, and
            campus activities across our partner institutions.
          </p>
        </div>

        <div className="w-full mx-auto">
          {/* Main Image Display */}
          <Card className="mb-8 overflow-hidden bg-gradient-card border-0 shadow-academic">
            <div className="p-0">
              <div className="relative group">
                <Image
                  src={currentImage.url} // Ensure valid `src` value
                  alt={currentImage.title}
                  width={100}
                  height={400}
                  className="w-full h-[300px] md:h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-110 transition-all duration-300"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white border-white/20 hover:scale-110 transition-all duration-300"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                {/* Image Info */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {currentImage.title}
                    </h3>
                    <p className="text-white/90 mb-3">
                      {currentImage.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-white/80">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm">{currentImage.year}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">
                            {currentImage.college}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-2 mb-4">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  'w-3 h-3 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
                )}
              />
            ))}
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <Card
                key={image.id}
                className={cn(
                  'cursor-pointer overflow-hidden hover:shadow-hover transition-all duration-300 hover:scale-105',
                  index === currentIndex
                    ? 'ring-2 ring-primary shadow-academic'
                    : ''
                )}
                onClick={() => goToImage(index)}
              >
                <CardContent className="p-0">
                  <Image
                    src={image.url} // Ensure valid `src` value
                    alt={image.title}
                    width={100}
                    height={100}
                    className="w-full h-24 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
