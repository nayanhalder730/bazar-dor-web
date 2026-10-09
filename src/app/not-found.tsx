import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-green-100 text-5xl">
          🛒
        </div>

        {/* Error Code */}
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-green-700">
          Error 404
        </p>

        {/* Heading */}
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-md text-base leading-7 text-gray-600">
          দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যাচ্ছে না। পেজটি সরানো হয়ে
          থাকতে পারে অথবা লিংকটি ভুল হতে পারে। বাজারদরের সর্বশেষ তথ্য দেখতে
          হোমপেজে ফিরে যান।
        </p>

        {/* Actions */}
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <span>⌂</span>
            হোমপেজে ফিরে যান
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 border-t border-gray-200 pt-5">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-green-700">Bazar Dor</span> —
            সঠিক বাজারদর, সহজেই।
          </p>
        </div>
      </div>
    </main>
  );
}
