'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function withAuth(Component: any) {
  return function ProtectedComponent(props: any) {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('auth_user');
        if (!storedUser && !isAuthenticated) {
          router.push('/login');
        }
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated && typeof window !== 'undefined' && !localStorage.getItem('auth_user')) {
      return null;
    }

    return <Component {...props} />;
  };
}
