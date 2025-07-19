'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function MyCollegePage() {
  const [collegeDetails, setCollegeDetails] = useState([]);

  useEffect(() => {
    // Fetch college details from local storage or API
    const storedData = JSON.parse(localStorage.getItem('myCollege') || '[]');
    setCollegeDetails(storedData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My College</h1>
      {collegeDetails.length === 0 ? (
        <p className="text-gray-600">No colleges added yet.</p>
      ) : (
        collegeDetails.map((college, index) => (
          <Card key={index} className="mb-6">
            <CardHeader>
              <CardTitle>{college.collegeName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">Candidate Name: {college.candidateName}</p>
              <p className="text-sm mb-4">Subject: {college.subject}</p>
              <p className="text-sm mb-4">Email: {college.candidateEmail}</p>
              <p className="text-sm mb-4">Phone: {college.candidatePhone}</p>
              <p className="text-sm mb-4">Address: {college.address}</p>
              <p className="text-sm mb-4">Date of Birth: {college.dateOfBirth}</p>
              <Button variant="outline" className="mt-4">
                Add Review
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
