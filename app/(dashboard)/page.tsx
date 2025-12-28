import { getBookmarksAction } from "@/actions/bookmarks";
import { BookmarkQueryParams } from "@/lib/dal/bookmark";
import DashboardPage from "@/components/pages/dashboard-page";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<BookmarkQueryParams>;
}) {
  const params = await searchParams;

  const result = await getBookmarksAction(params);

  return <DashboardPage result={result} />;
}
