export default function ProductCardSkeleton() {
  return (
    <div className="border border-gray-300/20 rounded-md md:px-4 px-3 py-2 bg-white max-w-56 animate-pulse mb-5">
      
      <div className="flex items-center justify-center px-2">
        <div className="h-[140px] w-[160px] bg-gray-200 rounded-md" />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />

        <div className="flex items-center gap-1 mt-1">
          {[1].map((i) => (
            <div
              key={i}
              className="h-4 w-4 bg-gray-200 rounded-sm"
            />
          ))}
          <div className="h-3 w-8 bg-gray-200 rounded ml-1" />
        </div>

        <div className="flex items-end justify-between mt-3">
          <div className="h-6 w-16 bg-gray-200 rounded" />
          <div className="h-[34px] w-[80px] bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}
