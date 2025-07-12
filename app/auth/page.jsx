'use client';

import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = async () => {
    if (isLogin) {
      await signIn('credentials', { email, password });
    } else {
      // Registration logic (replace with API call)
      console.log('Registering:', { email, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h1>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button onClick={handleAuth} className="w-full mb-4">
          {isLogin ? 'Login' : 'Register'}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </Button>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => signIn('google')}
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
