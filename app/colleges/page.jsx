'use client';
import { useState } from 'react';

import { SlidersHorizontal, MapPin, Star, Calendar } from 'lucide-react';
import { colleges } from '@/data/collage';
import SearchBar from '@/components/SearchBar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CollegeCard from '@/components/CollegeCard';

export default function Colleges() {
  const [sortBy, setSortBy] = useState('name');
  const [filterLocation, setFilterLocation] = useState('');

  const locations = Array.from(
    new Set(colleges.map(college => college.location))
  );

  const filteredAndSortedColleges = colleges
    .filter(
      college =>
        filterLocation === '' || college.location.includes(filterLocation)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'admissionDate':
          return (
            new Date(a.admissionDate).getTime() -
            new Date(b.admissionDate).getTime()
          );
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <section className=" py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold  mb-6">
              Explore All Colleges
            </h1>
            <p className="text-xl  max-w-2xl mx-auto">
              Browse through our comprehensive collection of world-class
              institutions and find your perfect academic match.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className=" bg-muted/30 mt-6">
        <div className="container mx-auto px-4">
          <SearchBar />

          <Card className="mt-8  border-0 shadow">
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filter Title */}
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-5 w-5 text-slate-50" />
                  <span className="font-medium">Filters:</span>
                </div>

                {/* Sort Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={sortBy === 'name' ? 'academic' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('name')}
                  >
                    Name
                  </Button>
                  <Button
                    variant={sortBy === 'rating' ? 'academic' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('rating')}
                  >
                    <Star className="h-4 w-4 mr-1" />
                    Rating
                  </Button>
                  <Button
                    variant={
                      sortBy === 'admissionDate' ? 'academic' : 'outline'
                    }
                    size="sm"
                    onClick={() => setSortBy('admissionDate')}
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Admission Date
                  </Button>
                </div>

                {/* Location Filter */}
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Location:</span>
                  <div className="flex flex-wrap gap-1">
                    <Badge
                      variant={filterLocation === '' ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => setFilterLocation('')}
                    >
                      All
                    </Badge>
                    {locations.map(location => (
                      <Badge
                        key={location}
                        variant={
                          filterLocation === location ? 'default' : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => setFilterLocation(location)}
                      >
                        {location}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Colleges Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              {filteredAndSortedColleges.length} Colleges Found
            </h2>
            <p className="text-muted-foreground">
              Showing results sorted by{' '}
              {sortBy === 'name'
                ? 'name'
                : sortBy === 'rating'
                ? 'rating'
                : 'admission date'}
              {filterLocation && ` in ${filterLocation}`}
            </p>
          </div>

          <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedColleges.map(college => (
              <CollegeCard
                key={college.id}
                college={college}
                showDetailedInfo={true}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
