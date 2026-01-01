"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { useActionState } from "react";
import { CREATE_TAG_STATE, createTagAction } from "@/actions/tags";

const initialState: CREATE_TAG_STATE = {
  status: "idle",
  errors: null,
  fields: {
    title: "",
  },
};

export default function TagForm() {
  const [state, formAction, isPending] = useActionState(
    createTagAction,
    initialState,
  );

  const isError = state.status === "error" && state.errors?.title !== "";

  return (
    <form
      action={formAction}
      className="flex flex-col gap-[var(--spacing-100,8px)]"
    >
      <label className="font-semibold text-[14px] leading-[1.4] text-[var(--neutral-900,#051513)] dark:text-[var(--neutral-0-dark,#ffffff)]">
        Create new tag
      </label>
      <div className="flex items-center gap-[var(--spacing-100,8px)]">
        <Input
          placeholder="Enter tag name..."
          className="flex-1"
          name="title"
          defaultValue={state.fields?.title}
          error={isError}
          disabled={isPending}
        />
        <Button
          type="submit"
          hierarchy="primary"
          size="sm"
          disabled={isPending}
          iconLeading={
            isPending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )
          }
        >
          Add
        </Button>
      </div>
    </form>
  );
}
