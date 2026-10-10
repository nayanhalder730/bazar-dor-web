"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string | number;
  name?: string;
  nameBn?: string;
  icon?: string;
  slug?: string;
}

const NavLinks = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories"
    )
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex items-center gap-1.5 overflow-x-auto py-2 whitespace-nowrap">
          {categories.map((item) => (
            <Link
              key={item.id}
              href={`/category/${item.slug}`}
              className="
                flex shrink-0 items-center
                gap-1.5
                rounded-full
                px-3 py-1.5
                text-sm font-medium
                text-gray-700
                transition-all duration-200
                hover:bg-[#009640]/10
                hover:text-[#009640]
                active:scale-95
              "
            >
              <span className="text-base">
                {item.icon || "🛍️"}
              </span>

              <span>{item.nameBn || item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;