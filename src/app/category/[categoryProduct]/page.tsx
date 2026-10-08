import ProductCard from "@/app/components/ProductCard";
import { Category } from "@/app/type/type";

export const instant = false;

interface PageProps {
  params: Promise<{
    categoryProduct: string;
  }>;
}


const toBanglaNum = (num: number | string | undefined): string => {
  if (num === undefined || num === null) return "০";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[parseInt(digit, 10)]);
};

const CategoryProductPage = async ({ params }: PageProps) => {
  const { categoryProduct } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryProduct}`
  );
  const products: Category[] = await res.json();

  const firstItem = products?.[0];
  const lengthOfData = products?.length || 0;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 space-y-4">
     
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 flex items-center gap-4">
        {/* Category Icon */}
        <div className="text-4xl p-2 bg-gray-50 rounded-xl flex items-center justify-center">
          {firstItem?.categoryIcon || "🛍️"}
        </div>

        {/* Title & Product Count */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {firstItem?.categoryNameBn || firstItem?.category || "ক্যাটাগরি"}
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            {toBanglaNum(lengthOfData)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

     
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-gray-100 flex justify-end items-center gap-3">
        <span className="text-sm font-medium text-gray-600">সাজান</span>
        <select className="border border-gray-200 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#009640]/20">
          <option value="default">ডিফল্ট</option>
          <option value="price-low">দাম: কম থেকে বেশি</option>
          <option value="price-high">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      
      <div className="px-1">
        <p className="text-sm font-medium text-gray-600">
          মোট {toBanglaNum(lengthOfData)}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((item: Category) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductPage;