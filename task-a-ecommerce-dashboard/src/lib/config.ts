export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export const SITE_NAME = "Lumen Store";

export const PRODUCTS_PER_PAGE = 8;
export const MAX_CART_QUANTITY = 10;

export const PRODUCT_REVALIDATE_SECONDS = 300;
