'use client';

import { PublisherTableRowSkeleton } from '@/components/SkeletonLoaders';

export default function PublishersLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 w-1/4 animate-pulse" />
      
      <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded mb-8 w-full animate-pulse" />

      <div className="overflow-x-auto mb-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
        <table className="w-full">
          <thead className="bg-zinc-100 dark:bg-zinc-800">
            <tr>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4" />
              </th>
              <th className="px-6 py-3 text-left">
                <div className="h-4 bg-zinc-300 dark:bg-zinc-700 rounded w-1/4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }).map((_, i) => (
              <PublisherTableRowSkeleton key={i} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
