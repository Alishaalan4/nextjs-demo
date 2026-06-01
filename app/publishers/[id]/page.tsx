import Link from 'next/link';
import Image from 'next/image';
import { getPublisherById, getBooksByPublisherId, getAuthorById } from '@/lib/data';
import { notFound } from 'next/navigation';

export default async function PublisherDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const publisherId = parseInt(id, 10);
  const publisher = getPublisherById(publisherId);

  if (!publisher) {
    notFound();
  }

  const books = getBooksByPublisherId(publisherId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back Link */}
      <Link
        href="/publishers"
        className="text-blue-600 dark:text-blue-400 hover:underline mb-8 inline-block"
      >
        ← Back to Publishers
      </Link>

      {/* Publisher Header */}
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-8 mb-12">
        <h1 className="text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          {publisher.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Country</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.country}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Founded</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {publisher.foundedYear}
            </p>
          </div>

          <div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">Books Published</p>
            <p className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              {books.length}
            </p>
          </div>
        </div>

        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-4">
          {publisher.description}
        </p>

        {publisher.website && (
          <a
            href={publisher.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Visit Website →
          </a>
        )}
      </div>

      {/* Books Section */}
      <div>
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
          Books by {publisher.name}
        </h2>

        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              No books found for this publisher.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => {
              const author = getAuthorById(book.authorId);

              return (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                    <Image
                      src={book.coverUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                      {book.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      by {author?.name}
                    </p>
                    <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                      <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {book.genre}
                      </span>
                      <span>{book.publishedYear}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
