
export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-7xl animate-pulse px-4 py-6 sm:px-6 lg:px-8">
        {/* Header Skeleton */}
        <header className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-green-100" />
            <div className="space-y-2">
              <div className="h-6 w-32 rounded-md bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
          </div>

          <div className="hidden gap-3 sm:flex">
            <div className="h-9 w-20 rounded-lg bg-gray-200" />
            <div className="h-9 w-20 rounded-lg bg-gray-200" />
          </div>
        </header>

        {/* Hero / Search Skeleton */}
        <section className="mb-8 rounded-3xl bg-green-100 p-6 sm:p-10">
          <div className="mb-4 h-8 w-3/4 max-w-md rounded-lg bg-green-200" />
          <div className="mb-6 h-4 w-full max-w-lg rounded bg-green-200/70" />

          <div className="flex max-w-2xl gap-3 rounded-2xl bg-white p-2">
            <div className="h-11 flex-1 rounded-xl bg-gray-100" />
            <div className="h-11 w-24 rounded-xl bg-green-200" />
          </div>
        </section>

        {/* Category Skeleton */}
        <section className="mb-8">
          <div className="mb-4 h-6 w-40 rounded-md bg-gray-200" />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200" />
                <div className="h-4 flex-1 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Price Summary Skeleton */}
        <section className="mb-8">
          <div className="mb-4 h-6 w-48 rounded-md bg-gray-200" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-100 bg-white p-5"
              >
                <div className="mb-4 h-4 w-28 rounded bg-gray-100" />
                <div className="mb-3 h-8 w-36 rounded-md bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-100" />
              </div>
            ))}
          </div>
        </section>

        {/* Product Cards Skeleton */}
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="h-6 w-36 rounded-md bg-gray-200" />
            <div className="h-9 w-28 rounded-xl bg-gray-200" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <article
                key={index}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white"
              >
                <div className="flex h-36 items-center justify-center bg-gray-200 sm:h-40">
                  <div className="h-14 w-14 rounded-2xl bg-gray-300" />
                </div>

                <div className="space-y-4 p-4">
                  <div className="h-5 w-3/4 rounded bg-gray-200" />

                  <div className="flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-green-100" />
                    <div className="h-6 w-20 rounded-full bg-gray-100" />
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="mb-3 h-3 w-20 rounded bg-gray-200" />
                    <div className="h-7 w-32 rounded-md bg-gray-200" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 rounded bg-gray-100" />
                    <div className="h-5 w-16 rounded-full bg-green-100" />
                  </div>

                  <div className="h-10 w-full rounded-xl bg-green-100" />
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer Skeleton */}
        <footer className="mt-10 border-t border-gray-200 pt-6">
          <div className="mx-auto h-4 w-48 rounded bg-gray-200" />
        </footer>
      </div>
    </main>
  );
}