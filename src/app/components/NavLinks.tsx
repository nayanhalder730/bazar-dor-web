
"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string | number;
  name?: string;
  nameBn?: string;
  icon?: string;
}

const NavLinks = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <nav className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto w-full max-w-7xl">
        <div
          className="
            flex items-center
            gap-1.5 sm:gap-2 lg:gap-3
            overflow-x-auto
            py-2 sm:py-2.5
            whitespace-nowrap
            scrollbar-none
          "
        >
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className="
                flex shrink-0 items-center
                gap-1 sm:gap-1.5
                rounded-full
                px-2.5 py-1.5
                sm:px-3 sm:py-1.5
                lg:px-3.5 lg:py-2
                text-xs sm:text-sm lg:text-sm
                font-medium
                text-gray-700
                transition-all duration-200
                hover:bg-[#009640]/10
                hover:text-[#009640]
                active:scale-95
                cursor-pointer
              "
            >
              <span className="text-sm sm:text-base lg:text-lg leading-none">
                {item.icon || "🛍️"}
              </span>

              <span>
                {item.nameBn || item.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavLinks;

