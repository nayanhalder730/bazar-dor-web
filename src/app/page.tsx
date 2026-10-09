import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
import { fetchAllData } from "./lib/fetchData";
import { Category } from "./type/type";

export default async function Home() {
  const allProduct: Category[] = await fetchAllData();

  const topSixIncreasePriceProduct: Category[] = allProduct
    .filter((item) => item.change?.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const topSixDecreasePriceProduct: Category[] = allProduct
    .filter((item) => item.change?.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Banner />

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              আজ দাম বেড়েছে{" "}
              <span className="text-red-600">▲</span>
            </h2>

          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {topSixIncreasePriceProduct.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              আজ দাম কমেছে{" "}
              <span className="text-green-600">▼</span>
            </h2>

          
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {topSixDecreasePriceProduct.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="সব-পণ্য">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              সব পণ্য
            </h2>

          
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {allProduct.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}