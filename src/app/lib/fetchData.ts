import { Category } from "../type/type";

export const fetchAllData = async (): Promise<Category[]> => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    {
      cache: "force-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Category[] = await res.json();

  return data;
};
