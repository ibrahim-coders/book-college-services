'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function MyCollege() {
  const [collegeDetails, setCollegeDetails] = useState([]);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myCollege') || '[]');
    setCollegeDetails(storedData);
  }, []);

  const handleAddReview = () => {
    if (!review || !rating) {
      toast.error('Please provide both a review and a rating.');
      return;
    }

    const newReview = { review, rating };
    const updatedDetails = collegeDetails.map(college => ({
      ...college,
      reviews: [...(college.reviews || []), newReview],
    }));

    localStorage.setItem('myCollege', JSON.stringify(updatedDetails));
    setCollegeDetails(updatedDetails);
    toast.success('Review added successfully!');
    setReview('');
    setRating('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My College</h1>
      {collegeDetails.map((college, index) => (
        <Card key={index} className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">{college.collegeName}</CardTitle>
            <CardDescription>{college.collegeLocation}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side - User Info */}
              <div>
                <p className="text-sm mb-2"><strong>Candidate Name:</strong> {college.candidateName}</p>
                <p className="text-sm mb-2"><strong>Subject:</strong> {college.subject}</p>
                <p className="text-sm mb-2"><strong>Email:</strong> {college.candidateEmail}</p>
                <p className="text-sm mb-2"><strong>Phone:</strong> {college.candidatePhone}</p>
                <p className="text-sm mb-2"><strong>Address:</strong> {college.address}</p>
                <p className="text-sm mb-2"><strong>Date of Birth:</strong> {college.dateOfBirth}</p>
              </div>

              {/* Right Side - Review Form & Display */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Add a Review</h2>
                <Textarea
                  rows={3}
                  placeholder="Write your review..."
                  value={review}
                  onChange={e => setReview(e.target.value)}
                  className="mb-3"
                />
                <Input
                  type="number"
                  placeholder="Rating (1-5)"
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  className="mb-3"
                />
                <Button onClick={handleAddReview} className="mb-6 w-full md:w-auto">
                  Submit Review
                </Button>

                {college.reviews?.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-2">Reviews</h3>
                    {college.reviews.map((r, i) => (
                      <div key={i} className="mb-3 p-3 border rounded-md bg-gray-50">
                        <p className="text-sm"><strong>Review:</strong> {r.review}</p>
                        <p className="text-sm"><strong>Rating:</strong> {r.rating}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
