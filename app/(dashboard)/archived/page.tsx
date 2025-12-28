import { getArchivedBookmarksAction } from "@/actions/bookmarks";
import ArchivedPage from "@/components/pages/archived-page";
import { BookmarkQueryParams } from "@/lib/dal/bookmark";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<BookmarkQueryParams>;
}) {
  const params = await searchParams;
  const result = await getArchivedBookmarksAction(params);

  return <ArchivedPage result={result} />;
}
