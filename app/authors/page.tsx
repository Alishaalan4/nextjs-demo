import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';
import AuthorsClient from '@/components/AuthorsClient';

export default function AuthorsPage() {
  const authors = getAllAuthors();
  
  // Create a map of book counts for each author
  const bookCounts: Record<number, number> = {};
  authors.forEach((author) => {
    bookCounts[author.id] = getBooksByAuthorId(author.id).length;
  });

  return <AuthorsClient initialAuthors={authors} bookCounts={bookCounts} />;
}
