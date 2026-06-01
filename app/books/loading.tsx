'use client';

import { BookCardSkeleton } from '@/components/SkeletonLoaders';

export default function BooksLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 w-1/4 animate-pulse" />
      
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 w-full animate-pulse" />
      
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-10 w-24 bg-zinc-200 dark:bg-zinc-800 rounded-full animate-pulse" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <BookCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
