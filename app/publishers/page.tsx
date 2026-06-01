import { getAllPublishers, getBooksByPublisherId } from '@/lib/data';
import PublishersClient from '@/components/PublishersClient';

export default function PublishersPage() {
  const publishers = getAllPublishers();

  // Create a map of book counts for each publisher
  const bookCounts: Record<number, number> = {};
  publishers.forEach((publisher) => {
    bookCounts[publisher.id] = getBooksByPublisherId(publisher.id).length;
  });

  return <PublishersClient initialPublishers={publishers} bookCounts={bookCounts} />;
}
