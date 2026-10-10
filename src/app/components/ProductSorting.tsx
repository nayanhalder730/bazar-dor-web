
"use client";

import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Category } from "../type/type";

interface ProductSortProps {
  products: Category[];
}

type SortOrder = "default" | "price-low" | "price-high";

const toBanglaNum = (num: number | string): string =>
  new Intl.NumberFormat("bn-BD").format(Number(num) || 0);

const ProductSort = ({ products }: ProductSortProps) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "price-low") {
      return result.sort(
        (a, b) => Number(a.today ?? 0) - Number(b.today ?? 0)
      );
    }

    if (sortOrder === "price-high") {
      return result.sort(
        (a, b) => Number(b.today ?? 0) - Number(a.today ?? 0)
      );
    }

    return result;
  }, [products, sortOrder]);

  return (
    <>

      <div className="bg-red-100 rounded-2xl p-4 shadow-xs border border-gray-100 flex justify-end items-center gap-3">
        <label
          htmlFor="product-sort"
          className="text-sm font-medium text-gray-600"
        >
          সাজান
        </label>

        <select
          id="product-sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#009640]/20"
        >
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

  
      <div className="px-1">
        <p className="text-sm font-medium text-gray-600">
          মোট {toBanglaNum(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
          এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </>
  );
};

export default ProductSort;