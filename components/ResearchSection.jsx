'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Users, Calendar } from 'lucide-react';

import Link from 'next/link';
import { researchPapers } from '@/data/collage';

export default function ResearchSection() {
  return (
    <section className="py-4 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Research Publications
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore groundbreaking research papers and academic publications
            from students and faculty across our partner institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchPapers.map(paper => (
            <Card
              key={paper.id}
              className="group hover:shadow-hover transition-all duration-300 hover:scale-105 bg-gradient-card border-0 shadow-card"
            >
              <div className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary" className="bg-blue-600/10 ">
                    {paper.category}
                  </Badge>
                </div>
                <h2 className="text-lg leading-tight  transition-colors">
                  {paper.title}
                </h2>
              </div>

              <h2 className="space-y-4">
                <p className="text-slate-600 text-sm line-clamp-3">
                  {paper.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <Users className="h-4 w-4 text-blue-500" />
                    <span className="text-blue-500">Authors:</span>
                    <span className="font-medium">
                      {paper.authors.join(', ')}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-blue-500" />
                      <span className="text-blue-500">Year:</span>
                      <span className="font-medium">{paper.year}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {paper.collegeName}
                    </Badge>
                  </div>
                </div>

                <Button
                  variant="academic"
                  className="w-full group-hover:bg-blue-400 group-hover:text-white"
                  asChild
                >
                  <Link
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read Paper
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </h2>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-6">
            View All Research Papers
            <ExternalLink className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
