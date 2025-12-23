"use client";

import { Checkbox } from "@/components/atoms/checkbox";
import { Badge } from "@/components/atoms/badge";
import { TagsType } from "@/lib/zod/tag";

// Actualizar este componente:
// Este componente sera client componente para que maneje la el checked y asi actualizar el estado de los bookmark mostrado
// Se pasaran todos los tags y aqui dentro es que se

export interface SidebarTagItemProps {
  tags: TagsType[];
}

const SidebarTagItem = ({ tags }: SidebarTagItemProps) => {
  return (
    <div className="pb-[15px]">
      {tags.map(({ id, title, totalBookmarks }) => (
        <div
          key={id}
          className="flex items-center overflow-hidden px-0 py-[var(--spacing-xxs,2px)] w-full"
        >
          <div className="flex-1 flex gap-[var(--spacing-lg,12px)] items-center px-[var(--spacing-lg,12px)] py-[var(--spacing-md,8px)] rounded-[var(--radius-sm,6px)] bg-transparent hover:bg-[var(--neutral-100,#e8f0ef)] dark:hover:bg-[var(--neutral-600-dark,#002e2d)] transition-colors">
            <div className="flex gap-[var(--spacing-md,8px)] items-center flex-1">
              <Checkbox checked={false} />
              <p className="font-semibold text-[16px] leading-[1.4] text-[var(--neutral-800,#4c5c59)] dark:text-[var(--neutral-100-dark,#b1b9b9)] whitespace-nowrap">
                {title}
              </p>
            </div>
            <Badge>{totalBookmarks}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export { SidebarTagItem };
