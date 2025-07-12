'use client';

import { useRouter } from 'next/router';
import { colleges } from '@/data/colleges';

export default function CollegeDetails() {
  const router = useRouter();
  const { id } = router.query;
  const college = colleges.find(c => c.id === id);

  if (!college) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">College not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{college.name}</h1>
      <img
        src={college.image}
        alt={college.name}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <p className="text-lg mb-4">Location: {college.location}</p>
      <p className="text-lg mb-4">Admission Process: {college.admissionProcess}</p>
      <p className="text-lg mb-4">Events: {college.events}</p>
      <p className="text-lg mb-4">Research Works: {college.researchWorks}</p>
      <p className="text-lg mb-4">Sports Categories: {college.sports}</p>
    </div>
  );
}
