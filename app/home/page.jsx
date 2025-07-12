'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { colleges } from '@/data/colleges';
import { reviews } from '@/data/reviews';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('myCollege') || '[]');
    const reviewsData = storedData.flatMap(college => college.reviews || []);
    setAllReviews(reviewsData);
  }, []);

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Section */}
      <section className="mb-8">
        <input
          type="text"
          placeholder="Search for a college..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredColleges.map(college => (
            <div key={college.id} className="border rounded p-4 shadow">
              <img src={college.image} alt={college.name} className="w-full h-40 object-cover mb-4" />
              <h3 className="text-lg font-bold">{college.name}</h3>
              <p>Admission Dates: {college.admissionDates}</p>
              <p>Events: {college.events}</p>
              <p>Research History: {college.researchHistory}</p>
              <p>Sports: {college.sports}</p>
              <button
                onClick={() => window.location.href = `/colleges/${college.id}`}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* College Image Gallery */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">College Image Gallery</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {colleges.map(college => (
            <img key={college.id} src={college.galleryImage} alt="Gallery" className="w-full h-40 object-cover rounded" />
          ))}
        </div>
      </section>

      {/* Research Papers */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Research Papers</h2>
        <ul>
          {colleges.map(college => (
            <li key={college.id}>
              <a href={college.researchLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {college.researchTitle}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {allReviews.map((review, index) => (
            <div key={index} className="border rounded p-4 shadow">
              <p className="text-sm">Review: {review.text}</p>
              <p className="text-sm">Rating: {review.rating}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
