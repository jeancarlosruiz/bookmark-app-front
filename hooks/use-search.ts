"use client";

import { debounce, parseAsString, useQueryState } from "nuqs";

export const useSearch = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value, {
      limitUrlUpdates: e.target.value === "" ? undefined : debounce(750),
    });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget.value);
    }
  };

  return {
    search,
    setSearch,
    handleSearchQuery,
    handleOnKeyDown,
  };
};
