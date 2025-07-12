'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          EduPortal
        </Link>
        <div className="flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/colleges" className="text-gray-600 hover:text-blue-600">
            Colleges
          </Link>
          <Link href="/admission" className="text-gray-600 hover:text-blue-600">
            Admission
          </Link>
          <Link href="/my-college" className="text-gray-600 hover:text-blue-600">
            My College
          </Link>
        </div>
        {user ? (
          <Link href="/profile" className="text-gray-600 hover:text-blue-600">
            {user.name}
          </Link>
        ) : (
          <Link href="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
