export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

export function formatPrice(value: number): string {
  return currency.format(value);
}

export function capitalize(text: string): string {
  return text.replace(/(^|\s)\S/g, (c) => c.toUpperCase());
}

export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}
