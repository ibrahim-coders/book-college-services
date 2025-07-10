'use client';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import { Home } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen ">
      {/* Right Side - Sign In Form */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-black">
        <div className="w-full max-w-md space-y-6">
          <SignIn path="/sign-in" />
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
};

export default LoginPage;
