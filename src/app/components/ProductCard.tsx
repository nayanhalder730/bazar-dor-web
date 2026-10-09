import React from "react";
import { Category } from "../type/type";
import Link from "next/link";

interface ProductCardProps {
  item: Category;
}

const toBanglaNumerals = (num: number | string): string => {
  const banglaDigits: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  return num
    .toString()
    .replace(/[0-9]/g, (digit) => banglaDigits[digit]);
};

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const isUp = item.change?.dir === "up";
  const isDown = item.change?.dir === "down";

  return (
    <Link href={`/productDetail/${item.id}`} className="block">
      <article className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md sm:p-5">
        <div className="mb-4 flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
            {item.image || item.categoryIcon || "🛍️"}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-2 text-base font-semibold leading-tight text-gray-800 sm:text-lg">
              {item.nameBn}
            </h3>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              প্রতি {item.unit}
            </p>
          </div>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="mb-1 block text-xs text-gray-500">
              আজকের দাম
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-900">
                {toBanglaNumerals(item.today)}
              </span>

              <span className="text-sm font-medium text-gray-700">
                টাকা
              </span>
            </div>
          </div>

          <div
            className={`flex shrink-0 items-center gap-1 rounded-md px-2.5 py-1 text-xs font-semibold ${
              isUp
                ? "bg-green-50 text-red-600"
                : isDown
                ? "bg-red-50 text-green-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>

            <span>
              {toBanglaNumerals(item.change?.pct ?? 0)}%
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;