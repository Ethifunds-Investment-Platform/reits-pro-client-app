import { AxiosError } from "axios";
import { ZodError } from "zod";

export default function ensureError(err: unknown): Error {
  if (err instanceof ZodError) {
    const newError = new Error(err.errors[0].message);
    return newError;
  }
  if (err instanceof AxiosError) {
    if (err.response) {
      const newError = new Error(err.response.data.message);
      return newError;
    }
  }
  if (err instanceof Error) return err;
  let stringText = "[unable to stringify thrown error]";
  try {
    stringText = JSON.stringify(err);
  } catch (error) {
    if (error) throw error;
  }

  const error = new Error(`value thrown as is: ${stringText}`);
  return error;
}
