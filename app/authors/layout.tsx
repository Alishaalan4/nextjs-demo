'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AuthorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user');
      if (!storedUser && !isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
}
