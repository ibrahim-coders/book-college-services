'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Chrome,
  Eye,
  EyeOff,
  Facebook,
  GraduationCap,
  Lock,
  Mail,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const SigninPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setErrors({ global: result.error });
      } else {
        toast.success('Login successful');
        router.push('/');
      }
    } catch (error) {
      setErrors({ global: 'An unexpected error occurred.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async provider => {
    setIsLoading(true);
    await signIn(provider, { callbackUrl: '/' });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center mb-6">
          <div className="bg-blue-500 text-white p-2 rounded-lg">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
            Welcome Back
          </h2>
          <p className="text-sm text-slate-600">
            Sign in to your EduPortal account
          </p>
        </div>

        {/* Card */}
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-xl sm:text-2xl font-semibold text-center text-slate-700 mb-2">
            Sign In
          </h3>
          <p className="text-sm text-center text-slate-600 mb-6">
            Enter your email and password to access your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="rounded border-gray-300"
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {errors.global && (
              <p className="text-sm text-red-500">{errors.global}</p>
            )}
            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleSocialLogin('google')}
              className="w-full"
            >
              <Chrome className="h-4 w-4 mr-2" />
              Google
            </Button>
            <Button
              variant="outline"
              // onClick={() => handleSocialLogin('Facebook')}
              className="w-full"
            >
              <Facebook className="h-4 w-4 mr-2" />
              Facebook
            </Button>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href="/sign-up"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SigninPage;
