'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

const SignupPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fastname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      const res = await axios.post('/api/users', {
        fastname,
        lastname,
        email,
        phone,
        password,
        confirmpassword,
      });

      if (res.status === 201) {
        toast.success(res.data.message);

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
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrors({ global: error.response.data.error });
      }
    } finally {
      setIsLoading(false);
    }
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
            Create Account
          </h2>
          <p className="text-sm text-slate-600">
            Join EduPortal and start your journey
          </p>
        </div>

        {/* Card */}
        <Card className="p-6 bg-white shadow-sm">
          <h3 className="text-xl sm:text-2xl font-semibold text-center text-slate-700 mb-2">
            Sign Up
          </h3>
          <p className="text-sm text-center text-slate-600 mb-6">
            Create your account to access all features
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="w-full">
                <Label>First Name</Label>
                <Input
                  value={fastname}
                  onChange={e => setFirstname(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div className="w-full">
                <Label>Last Name</Label>
                <Input
                  value={lastname}
                  onChange={e => setLastName(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div className="w-full">
                <Label>Phone</Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-full">
                <Label>Password</Label>
                <Input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
              <div className="w-full">
                <Label>Confirm Password</Label>
                <Input
                  type="password"
                  value={confirmpassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  className="mt-2"
                />
              </div>
            </div>

            {errors.global && (
              <p className="text-sm text-red-500">{errors.global}</p>
            )}

            <div className="flex items-start space-x-2 text-sm text-gray-600">
              <input type="checkbox" required />
              <span>
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms
                </a>{' '}
                and{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 text-white hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 ">
            <hr className="flex-1 border-gray-300" />
            <span className="text-sm text-gray-500">OR SIGN UP WITH</span>
            <hr className="flex-1 border-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 ">
            <Button variant="outline" className="w-full">
              Google
            </Button>
            <Button variant="outline" className="w-full">
              Facebook
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 ">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
