'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      {/* Optional illustration */}
      <img
        src="/404-illustration.svg"
        alt="404 Illustration"
        className="w-64 h-auto mb-6"
      />

      <Link
        href="/"
        className="px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:bg-gray-100 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
