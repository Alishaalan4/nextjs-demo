'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Author } from '@/lib/data';

interface AuthorsClientProps {
  initialAuthors: Author[];
  bookCounts: Record<number, number>;
}

export default function AuthorsClient({ initialAuthors, bookCounts }: AuthorsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 6;

  // Pagination
  const totalPages = Math.ceil(initialAuthors.length / ITEMS_PER_PAGE);
  const paginatedAuthors = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return initialAuthors.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [initialAuthors, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Authors
      </h1>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {paginatedAuthors.length} of {initialAuthors.length} {initialAuthors.length === 1 ? 'author' : 'authors'}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {paginatedAuthors.map((author) => {
          const bookCount = bookCounts[author.id] || 0;

          return (
            <Link
              key={author.id}
              href={`/authors/${author.id}`}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={author.imageUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                      {author.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                      {author.nationality}
                    </p>
                  </div>
                </div>

                <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
                  {author.bio}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Born: {author.birthYear}
                  </span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
                    {bookCount} {bookCount === 1 ? 'book' : 'books'}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', String(currentPage - 1));
              router.push(`/authors?${params.toString()}`);
            }}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
            }`}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('page', String(page));
                router.push(`/authors?${params.toString()}`);
              }}
              className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                currentPage === page
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', String(currentPage + 1));
              router.push(`/authors?${params.toString()}`);
            }}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                : 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
