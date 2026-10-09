export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 space-y-5 animate-pulse">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 rounded-xl bg-gray-200 shrink-0" />

        <div className="flex-1 space-y-3">
          <div className="h-6 bg-gray-200 rounded-lg w-40 max-w-full" />
          <div className="h-4 bg-gray-100 rounded-md w-56 max-w-full" />
        </div>
      </div>

      <div className="bg-red-50 rounded-2xl p-4 border border-gray-100 flex justify-end items-center gap-3">
        <div className="h-4 w-12 bg-gray-200 rounded" />
        <div className="h-9 w-48 max-w-[65%] bg-gray-200 rounded-xl" />
      </div>

      <div className="px-1">
        <div className="h-4 w-44 bg-gray-200 rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden"
          >
            <div className="h-44 sm:h-48 bg-gray-200" />

            <div className="p-4 space-y-4">
              <div className="h-5 w-3/4 bg-gray-200 rounded-md" />

              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gray-100 rounded-full" />
                <div className="h-6 w-20 bg-gray-100 rounded-full" />
              </div>

              <div className="rounded-xl bg-gray-50 p-3 space-y-3">
                <div className="h-4 w-20 bg-gray-200 rounded" />
                <div className="h-7 w-32 bg-gray-200 rounded-md" />
                <div className="h-3 w-28 bg-gray-100 rounded" />
              </div>

              <div className="flex justify-between items-center">
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="h-5 w-16 bg-gray-200 rounded-full" />
              </div>

              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
