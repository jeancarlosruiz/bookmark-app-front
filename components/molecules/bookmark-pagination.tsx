// "use client";

// import {
//   Pagination,
//   PaginationContent,
//   PaginationEllipsis,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/atoms/pagination";
// import { IPagination } from "@/lib/dal/bookmark";
// import { useQueryState, parseAsInteger } from "nuqs";
// import { useTransition } from "react";

// interface BookmarkPaginationProps {
//   pagination: IPagination;
// }

// export default function BookmarkPagination({
//   pagination,
// }: BookmarkPaginationProps) {
//   const [isLoading, startTransition] = useTransition();
//   const [page, setPage] = useQueryState(
//     "page",
//     parseAsInteger
//       .withOptions({
//         startTransition,
//         shallow: false,
//       })
//       .withDefault(1),
//   );

//   const { totalPages, hasNext, hasPrev } = pagination;

//   // Don't render pagination if there's only one page or no pages
//   if (totalPages <= 1) {
//     return null;
//   }

//   // Generate page numbers to display
//   const getPageNumbers = () => {
//     const pages: (number | "ellipsis")[] = [];
//     const currentPage = page;

//     // Always show first page
//     pages.push(1);

//     // Calculate range around current page
//     const showEllipsisStart = currentPage > 3;
//     const showEllipsisEnd = currentPage < totalPages - 2;

//     if (showEllipsisStart) {
//       pages.push("ellipsis");
//     }

//     // Show pages around current page
//     for (
//       let i = Math.max(2, currentPage - 1);
//       i <= Math.min(totalPages - 1, currentPage + 1);
//       i++
//     ) {
//       if (i !== 1 && i !== totalPages) {
//         pages.push(i);
//       }
//     }

//     if (showEllipsisEnd) {
//       pages.push("ellipsis");
//     }

//     // Always show last page if there's more than one page
//     if (totalPages > 1) {
//       pages.push(totalPages);
//     }

//     return pages;
//   };

//   const pageNumbers = getPageNumbers();

//   const handlePageChange = (newPage: number) => {
//     // Prevent page change if already loading
//     if (isLoading) return;

//     if (newPage >= 1 && newPage <= totalPages) {
//       setPage(newPage);
//     }
//   };

//   return (
//     <Pagination className="mt-auto">
//       <PaginationContent>
//         {/* Previous Button */}
//         <PaginationItem>
//           <PaginationPrevious
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (hasPrev && !isLoading) {
//                 handlePageChange(page - 1);
//               }
//             }}
//             aria-disabled={!hasPrev || isLoading}
//             className={
//               !hasPrev || isLoading
//                 ? "pointer-events-none opacity-50"
//                 : ""
//             }
//           />
//         </PaginationItem>

//         {/* Page Numbers */}
//         {pageNumbers.map((pageNum, index) => (
//           <PaginationItem
//             key={`page-${pageNum}-${index}`}
//             aria-disabled={isLoading}
//           >
//             {pageNum === "ellipsis" ? (
//               <PaginationEllipsis />
//             ) : (
//               <PaginationLink
//                 href="#"
//                 onClick={(e) => {
//                   e.preventDefault();
//                   if (!isLoading) {
//                     handlePageChange(pageNum);
//                   }
//                 }}
//                 isActive={page === pageNum}
//                 aria-disabled={isLoading}
//                 className={isLoading ? "pointer-events-none opacity-50" : ""}
//               >
//                 {pageNum}
//               </PaginationLink>
//             )}
//           </PaginationItem>
//         ))}

//         {/* Next Button */}
//         <PaginationItem>
//           <PaginationNext
//             href="#"
//             onClick={(e) => {
//               e.preventDefault();
//               if (hasNext && !isLoading) {
//                 handlePageChange(page + 1);
//               }
//             }}
//             aria-disabled={!hasNext || isLoading}
//             className={
//               !hasNext || isLoading
//                 ? "pointer-events-none opacity-50"
//                 : ""
//             }
//           />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }
