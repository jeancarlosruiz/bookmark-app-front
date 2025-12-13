import z, { ZodError } from "zod";

export const zodFlattenError = <T>(zodError: ZodError<T>) => {
  return z.flattenError(zodError);
};
