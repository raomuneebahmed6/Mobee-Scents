import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Single source of truth for currency formatting.
// Change CURRENCY_SYMBOL / CURRENCY_CODE here to switch the whole site's currency.
const CURRENCY_SYMBOL = "Rs.";

export function formatPrice(value: number): string {
  return `${CURRENCY_SYMBOL} ${value.toLocaleString("en-PK")}`;
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
