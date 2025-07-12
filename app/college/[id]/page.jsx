'use client';

import { useParams } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import {
  MapPin,
  Calendar,
  Users,
  Star,
  BookOpen,
  Trophy,
  ArrowLeft,
  GraduationCap,
  Building2,
  Image as ImageIcon,
} from 'lucide-react';
import { colleges } from '@/data/collage';

export default function CollegeDetails() {
  const params = useParams();
  const id = params?.id;
  const college = colleges.find(c => c.id === id);

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            College Not Found
          </h1>
          <Button variant="academic" asChild>
            <Link href="/colleges">Back to Colleges</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="relative h-[400px] overflow-hidden">
        <img
          src={college.image}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-white/20"
              asChild
            >
              <Link href="/colleges">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Colleges
              </Link>
            </Button>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                  {college.name}
                </h1>
                <div className="flex items-center space-x-4 text-white/90">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-5 w-5" />
                    <span>{college.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span>{college.rating}/5</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-white/10 text-white border-white/20"
                  >
                    Est. {college.establishedYear}
                  </Badge>
                </div>
              </div>

              <Button variant="hero" size="lg" asChild>
                <Link href={`/admission?college=${college.id}`}>Apply Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* College Stats */}
      <section className="py-8  shadow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                value: college.studentCount,
                label: 'Students',
              },
              {
                icon: GraduationCap,
                value: college.facultyCount,
                label: 'Faculty',
              },
              {
                icon: Calendar,
                value: formatDate(college.admissionDate),
                label: 'Next Admission',
              },
            ].map(({ icon: Icon, value, label }, i) => (
              <Card key={i} className="text-center bg-slate-50 border-0 shadow">
                <div className="p-6">
                  <div className="bg-blue-400 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {typeof value === 'number' ? value.toLocaleString() : value}
                  </h3>
                  <p className="text-muted-foreground">{label}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="pt-10">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="admission">Admission</TabsTrigger>
              <TabsTrigger value="research">Research</TabsTrigger>
              <TabsTrigger value="sports">Sports</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-card border-0 shadow-card">
                  <div>
                    <h2 className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span>About {college.name}</span>
                    </h2>
                  </div>
                  <div>
                    <p className="text-muted-foreground leading-relaxed">
                      {college.description}
                    </p>
                  </div>
                </Card>

                <Card className="bg-gradient-card border-0 shadow-card">
                  <div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>Upcoming Events</span>
                    </div>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      {college.events.map((event, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="admission">
              <Card className="bg-gradient-card border-0 shadow-card">
                <div>
                  <h2>Admission Process</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {college.admissionProcess}
                  </p>

                  <div className="bg-muted/50 rounded-lg p-6">
                    <h4 className="font-semibold text-foreground mb-4">
                      Key Admission Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Application Deadline
                        </p>
                        <p className="font-medium">
                          {formatDate(college.admissionDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Acceptance Rate
                        </p>
                        <p className="font-medium">Competitive</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="academic"
                    size="lg"
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-200 cursor-pointer rounded"
                    asChild
                  >
                    <Link href={`/admission?college=${college.id}`}>
                      Start Application
                    </Link>
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="research">
              <Card className="bg-gradient-card border-0 shadow-card">
                <div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <span>Research Areas</span>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        Research History
                      </h4>
                      <div className="space-y-2">
                        {college.researchHistory.map((research, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="mr-2 mb-2"
                          >
                            {research}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        Active Research Works
                      </h4>
                      <ul className="space-y-2">
                        {college.researchWorks.map((work, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground">
                              {work}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="sports">
              <Card className="bg-gradient-card border-0 shadow-card">
                <div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <span>Sports & Athletics</span>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        Sports Programs
                      </h4>
                      <div className="space-y-2">
                        {college.sports.map((sport, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="mr-2 mb-2"
                          >
                            {sport}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-4">
                        Sports Categories
                      </h4>
                      <ul className="space-y-2">
                        {college.sportsCategories.map((category, index) => (
                          <li
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-muted-foreground">
                              {category}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="gallery">
              <Card className="bg-gradient-card border-0 shadow-card">
                <div>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    <span>Campus Gallery</span>
                  </div>
                </div>
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {college.gallery.map((image, index) => (
                      <div
                        key={index}
                        className="relative overflow-hidden rounded-lg group"
                      >
                        <img
                          src={image}
                          alt={`${college.name} campus ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
