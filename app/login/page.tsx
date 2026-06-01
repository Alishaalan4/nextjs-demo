'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Fake authentication
    login(email);
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 text-center">
          Welcome to BookHub
        </h1>
        
        <p className="text-zinc-600 dark:text-zinc-400 text-center mb-8">
          Sign in with any email to access the library
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-50"
            />
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 py-2 rounded-lg font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            <strong>Demo Tip:</strong> You can use any email address to sign in. This is a fake authentication system for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
