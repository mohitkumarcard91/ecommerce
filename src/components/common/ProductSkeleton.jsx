export default function ProductSkeleton() {
  return (
    <div className="w-full px-6 animate-pulse">
      <div className="flex flex-col md:flex-row gap-16 mt-6">
        <div className="flex gap-4 w-full md:w-[45%]">
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-24 bg-gray-200 rounded-md" />
            ))}
          </div>

          <div className="flex-1 h-[420px] bg-gray-200 rounded-lg" />
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />

          <div className="space-y-3 mt-6">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
          </div>

          <div className="h-10 bg-gray-300 rounded w-40 mt-8" />
        </div>
      </div>
    </div>
  );
}
