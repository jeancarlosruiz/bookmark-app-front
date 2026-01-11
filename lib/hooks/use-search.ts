"use client";

import { debounce, parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export const useSearch = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ shallow: false }),
  );

  // También necesitamos acceso al query param de tags para limpiarlo
  const [, setTagsQuery] = useQueryState(
    "q",
    parseAsArrayOf(parseAsString, ",").withDefault([]),
  );

  const handleSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Si hay un valor de búsqueda, limpiar el filtro de tags
    if (value.trim() !== "") {
      setTagsQuery(null);
    }

    setSearch(value, {
      limitUrlUpdates: value === "" ? undefined : debounce(750),
    });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;

      // Si hay un valor de búsqueda, limpiar el filtro de tags
      if (value.trim() !== "") {
        setTagsQuery(null);
      }

      setSearch(value);
    }
  };

  return {
    search,
    setSearch,
    handleSearchQuery,
    handleOnKeyDown,
  };
};
