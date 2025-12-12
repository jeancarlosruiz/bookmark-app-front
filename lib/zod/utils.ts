import z, { ZodError } from "zod";

export const zodFlattenError = (zodError: ZodError) => {
  return z.flattenError(zodError);
};
