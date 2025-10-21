import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format a string for database name
// e.g., "Last Day of Month" -> "last_day_of_month"
export const toFormattedString = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w_]/g, ""); // Remove all characters except letters, numbers, and underscores
};
