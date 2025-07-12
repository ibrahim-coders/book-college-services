'use client';
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

import CollegeCard from './CollegeCard';
import { colleges } from '@/data/collage';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const results = colleges.filter(
        college =>
          college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          college.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-0 shadow-academic">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for colleges by name, location, or description..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-10 h-12 bg-background/50 border-border/50 focus:border-primary focus:bg-background transition-all duration-300"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Button
              variant="academic"
              onClick={handleSearch}
              className="h-12 px-8 font-semibold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
            >
              Search
            </Button>
          </div>
        </div>
      </Card>

      {showResults && (
        <div className="mt-8 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Search Results
            </h3>
            <p className="text-muted-foreground">
              {searchResults.length > 0
                ? `Found ${searchResults.length} college${
                    searchResults.length !== 1 ? 's' : ''
                  } matching "${searchTerm}"`
                : `No colleges found matching "${searchTerm}"`}
            </p>
          </div>

          {searchResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map(college => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          )}

          {searchResults.length === 0 && (
            <Card className="bg-muted/50 border-dashed border-2 border-border">
              <div className="p-8 text-center">
                <Search className="h-16 w-16 text-muted-foreground/50 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  No Results Found
                </h4>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or browse our featured
                  colleges below.
                </p>
                <Button variant="outline" onClick={handleClear}>
                  Clear Search
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
