'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Star, Users, Trophy, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function CollegeCard({ college, showDetailedInfo = false }) {
  const { data: session } = useSession();
  const user = session?.user;

  const handleNavigation = href => {
    if (!user) {
      window.location.href = '/sign-in'; // Redirect to login if not logged in
    } else {
      window.location.href = href; // Navigate to the target page if logged in
    }
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card className="w-full group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-[#F4F6F8] border border-gray-200 rounded-xl">
      {/* Image Section */}
      <div className="relative overflow-hidden h-48">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-white font-medium text-sm">
                {college.rating}
              </span>
            </div>
            <Badge className="bg-white/20 text-white border border-white/30 text-xs">
              Est. {college.establishedYear}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-5 pt-0 space-y-4">
        {/* Title & Location */}
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {college.name}
          </h3>
          <div className="flex items-center text-gray-500 mt-1 text-sm">
            <MapPin className="h-4 w-4 mr-1" />
            {college.location}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">
          {college.description}
        </p>

        {/* Admission & Students */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-gray-500">Admission</p>
              <p className="font-medium">{formatDate(college.admissionDate)}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-gray-500">Students</p>
              <p className="font-medium">
                {college.studentCount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Extra Info if detailed */}
        {showDetailedInfo && (
          <div className="">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-gray-500 text-sm">Research Areas</p>
                <p className="font-medium text-sm">
                  {college.researchHistory.length} active projects
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-gray-500 text-sm">Sports</p>
                <p className="font-medium text-sm">
                  {college.sports.length} programs
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Research Tags */}
        <div className="flex flex-wrap gap-2">
          {college.researchHistory.slice(0, 2).map((research, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-xs bg-[#39ACA3] text-white px-2 py-1 rounded"
            >
              {research}
            </Badge>
          ))}
          {college.researchHistory.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{college.researchHistory.length - 3} more
            </Badge>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="px-5 space-y-2">
        <Button
          variant="academic"
          className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-md py-2 transition-all"
          onClick={() => handleNavigation(`/college/${college.id}`)}
        >
          View Details
        </Button>
        {/* <Button
          variant="outline"
          className="w-full border-blue-600 text-blue-600 hover:bg-blue-100 rounded-md py-2 transition-all"
          onClick={() => handleNavigation('/my-college')}
        >
          Go to My College
        </Button> */}
      </div>
    </Card>
  );
}
