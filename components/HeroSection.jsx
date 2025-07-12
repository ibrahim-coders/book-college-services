'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-campus-cove.avif')` }}
      >
        {/* Blue overlay for better readability */}
        <div className="absolute inset-0  "></div>
      </div>

      {/* Animated background blur elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Increasing College Graduates
              <span className="block text-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text">
                to Strengthen California
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Explore world-class institutions, find your ideal programs, and
              embark on your academic journey with confidence.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              variant="default"
              size="lg"
              className="text-white bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg shadow-lg hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/colleges">
                Explore Colleges <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-white border-white/40 bg-white/10 px-8 py-6 text-lg hover:scale-105 transition-transform"
              asChild
            >
              <Link href="/admission">Apply Now</Link>
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: <BookOpen />, value: '6', label: 'Elite Universities' },
              { icon: <Users />, value: '100K+', label: 'Active Students' },
              { icon: <Award />, value: '95%', label: 'Success Rate' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group transition-transform hover:scale-105"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="bg-gradient-to-tr from-blue-500 to-teal-400 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {item.value}
                  </h3>
                  <p className="text-white/80">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
