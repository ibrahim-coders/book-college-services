'use client';

import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function SignUpPage() {
  return (
    <div className="min-h-screen ">
      {/* Right Side - Sign Up Form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <SignUp path="/sign-up" />
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center text-blue-600 hover:underline text-sm font-medium"
            >
              <Home className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
