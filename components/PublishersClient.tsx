'use client';

import { useState, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Publisher } from '@/lib/data';

interface PublishersClientProps {
  initialPublishers: Publisher[];
  bookCounts: Record<number, number>;
}

type SortField = 'name' | 'country' | 'foundedYear' | 'bookCount';
type SortOrder = 'asc' | 'desc';

export default function PublishersClient({ initialPublishers, bookCounts }: PublishersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const sortField = (searchParams.get('sort') as SortField) || 'name';
  const sortOrder = (searchParams.get('order') as SortOrder) || 'asc';
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const ITEMS_PER_PAGE = 10;

  // Filter publishers based on search
  const filteredPublishers = useMemo(() => {
    return initialPublishers.filter((pub) => {
      const matchesSearch =
        pub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [initialPublishers, searchQuery]);

  // Sort publishers
  const sortedPublishers = useMemo(() => {
    const sorted = [...filteredPublishers];
    sorted.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'bookCount') {
        aValue = bookCounts[a.id] || 0;
        bValue = bookCounts[b.id] || 0;
      }

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });
    return sorted;
  }, [filteredPublishers, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedPublishers.length / ITEMS_PER_PAGE);
  const paginatedPublishers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedPublishers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedPublishers, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());
    params.delete('page'); // Reset to page 1 on search
    router.push(`/publishers?${params.toString()}`);
  };

  const handleSort = (field: SortField) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', field);
    // Toggle sort order if same field is clicked
    if (sortField === field) {
      params.set('order', sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('order', 'asc');
    }
    params.delete('page'); // Reset to page 1
    router.push(`/publishers?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        Publishers
      </h1>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search publishers..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 placeholder-zinc-500 dark:placeholder-zinc-400"
        />
      </div>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {paginatedPublishers.length} of {sortedPublishers.length}{' '}
        {sortedPublishers.length === 1 ? 'publisher' : 'publishers'}
      </p>

      {filteredPublishers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No publishers found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto mb-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <table className="w-full">
              <thead className="bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-2"
                    >
                      Name
                      {sortField === 'name' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('country')}
                      className="font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-2"
                    >
                      Country
                      {sortField === 'country' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('foundedYear')}
                      className="font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-2"
                    >
                      Founded
                      {sortField === 'foundedYear' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleSort('bookCount')}
                      className="font-semibold text-zinc-900 dark:text-zinc-50 hover:text-zinc-700 dark:hover:text-zinc-300 flex items-center gap-2"
                    >
                      Books
                      {sortField === 'bookCount' && (
                        <span className="text-xs">
                          {sortOrder === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                      Action
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPublishers.map((publisher) => (
                  <tr
                    key={publisher.id}
                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-50">
                      {publisher.name}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {publisher.country}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      {publisher.foundedYear}
                    </td>
                    <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-sm">
                        {bookCounts[publisher.id] || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/publishers/${publisher.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set('page', String(currentPage - 1));
                  router.push(`/publishers?${params.toString()}`);
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
                    router.push(`/publishers?${params.toString()}`);
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
                  router.push(`/publishers?${params.toString()}`);
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
        </>
      )}
    </div>
  );
}
