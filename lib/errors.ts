// lib/errors.ts
import { ZodError } from "zod";

export function errorMessage(e: unknown): string {
  if (e instanceof ZodError) {
    return e.issues?.[0]?.message ?? "Invalid request";
  }
  if (e instanceof Error) {
    return e.message;
  }
  return "Invalid request";
}
