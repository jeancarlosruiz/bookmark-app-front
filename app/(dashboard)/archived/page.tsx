import { getArchivedBookmarksAction } from "@/actions/bookmarks";
import ArchivedPage from "@/components/pages/archived-page";
import { BookmarkQueryParams } from "@/lib/dal/bookmark";

// Force dynamic rendering because this route uses authentication (headers/cookies)
// This prevents Next.js from trying to statically render during build
export const dynamic = 'force-dynamic';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<BookmarkQueryParams>;
}) {
  const params = await searchParams;
  const result = await getArchivedBookmarksAction(params);

  return <ArchivedPage result={result} />;
}
