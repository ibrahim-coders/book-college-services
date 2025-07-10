import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote, User, Calendar } from 'lucide-react';
import { reviews } from '@/data/collage';

export default function ReviewsSection() {
  const renderStars = rating => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'text-yellow-400 fill-current'
            : 'text-muted-foreground/30'
        }`}
      />
    ));
  };

  const formatDate = dateString => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-600 mb-6">
            Student Reviews
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Hear from students and alumni about their experiences at our partner
            colleges and universities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map(review => (
            <Card
              key={review.id}
              className="group hover:shadow-hover transition-all duration-300 hover:scale-105 bg-gradient-card border-0 shadow-card"
            >
              <div className="pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Quote className="h-6 w-6 text-blue-400" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-600/10 text-blue-600"
                  >
                    {review.collegeName}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  {renderStars(review.rating)}
                  <span className="text-sm font-medium text-blue-600">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <blockquote className="text-foreground italic leading-relaxed">
                  "{review.comment}"
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {review.userName}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-card rounded-2xl p-8 border border-border/50 shadow-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Share Your Experience
            </h3>
            <p className="text-muted-foreground mb-6">
              Have you studied at one of our partner institutions? Share your
              experience and help future students make informed decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">4.8</div>
                <div className="text-sm text-muted-foreground">
                  Average Rating
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm text-muted-foreground">
                  Total Reviews
                </div>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Recommended</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
