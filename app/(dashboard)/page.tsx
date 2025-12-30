import { getBookmarksAction } from "@/actions/bookmarks";
import { BookmarkQueryParams } from "@/lib/dal/bookmark";
import DashboardPage from "@/components/pages/dashboard-page";

// Remove this later!!!!!
// Force dynamic rendering because this route uses authentication (headers/cookies)
// This prevents Next.js from trying to statically render during build
export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<BookmarkQueryParams>;
}) {
  const params = await searchParams;

  const result = await getBookmarksAction(params);

  return <DashboardPage result={result} searchQuery={params.search} />;
}
