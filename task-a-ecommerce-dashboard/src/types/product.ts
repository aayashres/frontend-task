export interface ProductRating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: ProductRating;
}

export type SortOrder = "asc" | "desc";

export type Category = string;

/** Wraps API data with a flag telling the UI whether the bundled snapshot was used. */
export interface ApiResult<T> {
  data: T;
  isFallback: boolean;
}
