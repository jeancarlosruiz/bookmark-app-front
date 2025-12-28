import { Archive } from "lucide-react";
import BookmarkContainer, {
  BookmarkContainerProps,
} from "../templates/bookmark-container";

export default function ArchivedPage({ result }: BookmarkContainerProps) {
  const emptyState = {
    title: "No archived bookmarks",
    description:
      "You haven't archived any bookmarks yet. Archived bookmarks are hidden from your main collection but can be restored anytime.",
    icon: (
      <Archive className="w-12 h-12 text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-500-dark,#004241)]" />
    ),
  };

  return (
    <BookmarkContainer
      title="Archived bookmarks"
      result={result}
      emptyState={emptyState}
    />
  );
}
