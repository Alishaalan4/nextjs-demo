export function BookCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-6">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded mb-4 w-1/2" />
        <div className="flex items-center justify-between">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function AuthorCardSkeleton() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden animate-pulse p-6">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-3/4" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
      </div>
    </div>
  );
}

export function PublisherTableRowSkeleton() {
  return (
    <tr className="border-b border-zinc-200 dark:border-zinc-800">
      <td className="px-6 py-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-12" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
      </td>
    </tr>
  );
}
