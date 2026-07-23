export type ClassValue = string | number | null | false | undefined;

/** Minimal classnames joiner (shadcn-style `cn`, no external deps). */
export function cn(...inputs: ClassValue[]): string {
  return inputs.filter(Boolean).join(" ");
}
