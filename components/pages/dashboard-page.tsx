import BookmarkContainer, {
  BookmarkContainerProps,
} from "../templates/bookmark-container";

export default function DashboardPage({
  result,
  searchQuery,
}: BookmarkContainerProps) {
  return (
    <BookmarkContainer
      title="All bookmarks"
      result={result}
      searchQuery={searchQuery}
    />
  );
}
