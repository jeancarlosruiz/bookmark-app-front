"use client";

import { Checkbox } from "@/components/atoms/checkbox";
import { Badge } from "@/components/atoms/badge";
import { TagsType } from "@/lib/zod/tag";
import { useState, useEffect, useTransition } from "react";
import { EmptyTags } from "./empty-tags";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { Loader2 } from "lucide-react";

export interface SidebarTagItemProps {
  tags: TagsType[];
}

const SidebarTagItem = ({ tags }: SidebarTagItemProps) => {
  const [isPending, startTransition] = useTransition();
  const [tagsQuery, setTagsQuery] = useQueryState(
    "tags",
    parseAsArrayOf(parseAsString, ",")
      .withOptions({
        startTransition,
        shallow: false,
      })
      .withDefault([]),
  );

  // Inicializar tags desde URL si existen
  const [tagsArr, setTagsArr] = useState(() => {
    const urlTags = tagsQuery.filter(Boolean) || [];

    return tags.map((t) => ({
      ...t,
      isChecked: urlTags.includes(t.title),
    }));
  });

  // Sincronizar estado local cuando cambia la URL (navegación con botones del navegador)
  // o cuando cambian los tags (recarga de datos)
  useEffect(() => {
    const urlTags = tagsQuery.filter(Boolean) || [];

    setTagsArr(
      tags.map((t) => ({
        ...t,
        isChecked: urlTags.includes(t.title),
      })),
    );
  }, [tagsQuery, tags]);

  const haveTagsChecked = tagsArr.some((t) => t.isChecked === true);

  const updateURL = (selectedTags: string[]) => {
    setTagsQuery(selectedTags);
  };

  const toggleIsChecked = (id: number) => {
    const updatedTags = tagsArr.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          isChecked: !t.isChecked,
        };
      }

      return t;
    });

    setTagsArr(updatedTags);

    // Obtener tags seleccionados
    const selectedTags = updatedTags
      .filter((t) => t.isChecked)
      .map((t) => t.title);

    // Actualizar URL
    updateURL(selectedTags);
  };

  const resetIsChecked = () => {
    const resetTags = tagsArr.map((t) => ({
      ...t,
      isChecked: false,
    }));

    setTagsArr(resetTags);

    // Limpiar URL (sin tags seleccionados)
    updateURL([]);
  };

  return (
    <>
      {/* Subheading */}
      <div className="flex items-center min-h-[1.5rem] pb-[var(--spacing-xs,4px)] pt-0 px-[var(--spacing-150,12px)] w-full">
        <p className="flex-1 font-bold text-[12px] leading-[1.4] text-[#4d4d4d] dark:text-[var(--neutral-100-dark,#b1b9b9)] flex items-center gap-2">
          TAGS
          {isPending && (
            <Loader2 className="h-3 w-3 animate-spin text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)]" />
          )}
        </p>

        {haveTagsChecked && (
          <button
            onClick={resetIsChecked}
            className="flex flex-col gap-[2px] items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
          >
            <span className="font-medium text-[12px] leading-[1.3] tracking-[0.12px] text-[var(--neutral-500,#899492)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
              Reset
            </span>
            <div className="h-px w-full bg-[var(--teal-700,#014745)] dark:bg-[var(--neutral-300-dark,#00706e)]" />
          </button>
        )}
      </div>

      <ScrollArea className="w-full flex-1 h-full">
        {/* Tag list */}
        <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
          {tagsArr && tagsArr.length > 0 ? (
            <div className="pb-[15px]">
              {tagsArr.map(({ id, title, totalBookmarks, isChecked }) => (
                <div
                  key={id}
                  className="flex items-center overflow-hidden px-0 py-[var(--spacing-xxs,2px)] w-full cursor-pointer"
                  // onClick={() => toggleIsChecked(id)}
                >
                  <div className="flex-1 flex gap-[var(--spacing-lg,12px)] items-center px-[var(--spacing-lg,12px)] py-[var(--spacing-md,8px)] rounded-[var(--radius-sm,6px)] bg-transparent hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)] transition-colors">
                    <div className="flex gap-[var(--spacing-md,8px)] items-center flex-1">
                      <Checkbox
                        checked={isChecked}
                        onChange={() => toggleIsChecked(id)}
                        disabled={isPending}
                      />
                      <p className="font-semibold text-[16px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
                        {title}
                      </p>
                    </div>
                    <Badge>{totalBookmarks}</Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyTags />
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export { SidebarTagItem };
