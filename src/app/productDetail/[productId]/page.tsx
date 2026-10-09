
import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Category } from "@/app/type/type";

export const instant = false;

const toBanglaNumber = (value: number | string): string =>
  new Intl.NumberFormat("bn-BD").format(Number(value) || 0);

const formatPrice = (value: number): string =>
  `${toBanglaNumber(value)} টাকা`;

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  let res: Response;

  try {
    res = await fetch(
      `https://api.abcz.workers.dev/api/bazardor/products/${encodeURIComponent(productId)}`,
      { cache: "no-store" }
    );
  } catch {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  if (res.status === 404) notFound();

  if (!res.ok) {
    throw new Error(`Product API error: ${res.status}`);
  }

  const product: Category = await res.json();

  if (!product || !product.id) notFound();

  const markets = Array.isArray(product.markets)
    ? product.markets.filter(
        (market) =>
          Number.isFinite(market.min) &&
          Number.isFinite(market.max) &&
          market.min >= 0 &&
          market.max >= market.min
      )
    : [];

  const minPrice =
    markets.length > 0
      ? Math.min(...markets.map((market) => market.min))
      : product.today;

  const maxPrice =
    markets.length > 0
      ? Math.max(...markets.map((market) => market.max))
      : product.today;

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (sum, market) => sum + (market.min + market.max) / 2,
            0
          ) / markets.length
        )
      : product.today;

  const changeAmount = product.today - product.yesterday;

  const changeColor =
    product.change?.dir === "up"
      ? "text-red-600"
      : product.change?.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changeIcon =
    product.change?.dir === "up"
      ? "▲"
      : product.change?.dir === "down"
        ? "▼"
        : "●";

  const changeText =
    product.change?.dir === "up"
      ? "দাম বেড়েছে"
      : product.change?.dir === "down"
        ? "দাম কমেছে"
        : "দামের পরিবর্তন নেই";

  const isImageUrl =
    typeof product.image === "string" &&
    /^https?:\/\//i.test(product.image);

  return (
    <main className="min-h-screen bg-[#f0f5f1] px-3 py-6 text-[#26352c] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-5xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex flex-wrap items-center gap-2 text-xs text-gray-500 sm:text-sm"
        >
          <Link href="/" className="transition hover:text-green-700">
            হোম
          </Link>

          <span>/</span>

          <Link
            href={`/category/${product.category}`}
            className="transition hover:text-green-700"
          >
            {product.categoryNameBn || product.category}
          </Link>

          <span>/</span>

          <span className="font-medium text-gray-700">
            {product.nameBn}
          </span>
        </nav>

        <section className="mb-5 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#eef4ef] sm:h-20 sm:w-20">
                {isImageUrl ? (
                  <img
                    src={product.image}
                    alt={product.nameBn}
                    className="h-full w-full object-contain p-2"
                  />
                ) : (
                  <span className="text-3xl">
                    {product.image || product.categoryIcon || "🛒"}
                  </span>
                )}
              </div>

              <div className="min-w-0">

                <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {product.nameBn}
                </h1>

                <p className="mt-2 text-xs text-gray-500 sm:text-sm">
                  প্রতি {product.unit || "একক"} এর বাজারদর
                </p>

                <p className={`mt-2 text-xs font-medium ${changeColor}`}>
                  {changeIcon} {changeText}:{" "}
                  {toBanglaNumber(Math.abs(changeAmount))} টাকা
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-between gap-5 rounded-xl bg-[#f0f5f1] px-4 py-3 sm:min-w-44 sm:flex-col sm:items-end sm:gap-1">
              <div>
                <p className="text-xs text-gray-500">আজকের বাজারদর</p>

                <p className="mt-1 text-2xl font-bold text-[#285d3d] sm:text-3xl">
                  {toBanglaNumber(product.today)}
                </p>

                <p className="text-xs text-gray-500">
                  টাকা / {product.unit || "একক"}
                </p>
              </div>

              <p className={`text-xs font-semibold ${changeColor}`}>
                {changeIcon} {toBanglaNumber(product.change?.pct ?? 0)}%
              </p>
            </div>
          </div>
        </section>

        <section className="mb-5 rounded-xl border border-gray-200/80 bg-white p-4 shadow-sm sm:p-5">
          <h2 className="mb-4 text-sm font-bold sm:text-base">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-green-100 bg-green-50/60 p-4">
              <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>

              <p className="mt-2 text-xl font-bold text-green-700">
                {formatPrice(minPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit || "একক"}
              </p>
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50/60 p-4">
              <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>

              <p className="mt-2 text-xl font-bold text-red-600">
                {formatPrice(maxPrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit || "একক"}
              </p>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <p className="text-xs text-gray-500">গড় দাম</p>

              <p className="mt-2 text-xl font-bold text-blue-700">
                {formatPrice(averagePrice)}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                প্রতি {product.unit || "একক"}
              </p>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-gray-100 bg-red-100 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <h2 className="text-lg font-bold sm:text-xl">
              বাজারভিত্তিক আজকের দাম
            </h2>

            <span className="w-fit rounded-full bg-white px-3 py-1 text-xs font-medium text-green-800">
              মোট বাজার: {toBanglaNumber(markets.length)}
            </span>
          </div>

          {markets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] border-collapse text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#f8faf8] text-gray-500">
                    <th className="px-4 py-4 font-medium sm:px-5">
                      বাজার
                    </th>

                    <th className="px-4 py-4 font-medium">বিভাগ</th>

                    <th className="px-4 py-4 text-right font-medium">
                      সর্বনিম্ন
                    </th>

                    <th className="px-4 py-4 text-right font-medium">
                      সর্বোচ্চ
                    </th>

                    <th className="px-4 py-4 text-right font-medium">
                      গড় দাম
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {markets.map((market, index) => {
                    const marketAverage = Math.round(
                      (market.min + market.max) / 2
                    );

                    return (
                      <tr
                        key={`${market.market}-${market.division}-${index}`}
                        className={`transition hover:bg-green-50/70 ${
                          index % 2 === 0 ? "bg-white" : "bg-[#f5f8f5]"
                        }`}
                      >
                        <td className="whitespace-nowrap px-4 py-4 font-medium text-gray-800 sm:px-5">
                          {market.market}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right text-green-700">
                          {formatPrice(market.min)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right text-red-600">
                          {formatPrice(market.max)}
                        </td>

                        <td className="whitespace-nowrap px-4 py-4 text-right font-semibold text-gray-800">
                          {formatPrice(marketAverage)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <div className="mb-3 text-3xl">🛒</div>

              <h3 className="text-sm font-semibold text-gray-700">
                বাজারের তথ্য পাওয়া যায়নি
              </h3>

              <p className="mt-2 text-xs text-gray-500">
                এই পণ্যের জন্য বর্তমানে কোনো বাজারের দাম নেই।
              </p>
            </div>
          )}
        </section>

        <div className="mt-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-green-300 hover:text-green-700"
          >
            <span aria-hidden="true">←</span>
            সব পণ্যে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ProductDetailsPage;