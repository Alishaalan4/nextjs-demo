'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavClient() {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4 border-l border-zinc-700 pl-8">
        <span className="text-sm text-zinc-300">{user}</span>
        <button
          onClick={handleLogout}
          className="text-sm px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="text-sm px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 transition-colors"
    >
      Sign In
    </Link>
  );
}
