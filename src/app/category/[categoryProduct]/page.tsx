
import { Category } from "../../type/type";
import ProductSort from "../../components/ProductSorting";

export const instant = false;

interface PageProps {
  params: Promise<{
    categoryProduct: string;
  }>;
}

const toBanglaNum = (
  num: number | string | undefined
): string => {
  if (num === undefined || num === null) return "০";

  const banglaDigits = [
    "০", "১", "২", "৩", "৪",
    "৫", "৬", "৭", "৮", "৯",
  ];

  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

const CategoryProductPage = async ({ params }: PageProps) => {
  const { categoryProduct } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(categoryProduct)}`
  );

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি");
  }

  const products: Category[] = await res.json();

  const firstItem = products?.[0];
  const lengthOfData = products?.length || 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 space-y-4">

      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 flex items-center gap-4">
        <div className="text-4xl p-2 bg-gray-50 rounded-xl flex items-center justify-center">
          {firstItem?.categoryIcon || "🛍️"}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {firstItem?.categoryNameBn ||
              firstItem?.category ||
              "ক্যাটাগরি"}
          </h1>

          <p className="text-sm text-gray-500 font-medium mt-0.5">
            {toBanglaNum(lengthOfData)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <ProductSort products={products ?? []} />

    </div>
  );
};

export default CategoryProductPage;