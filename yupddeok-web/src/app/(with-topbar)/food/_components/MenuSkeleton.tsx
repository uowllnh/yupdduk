export function MenuSkeleton() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="min-h-[236px] animate-pulse rounded-2xl border border-gray-100 bg-white p-3 shadow-sm"
        >
          <div className="aspect-square rounded-xl bg-gray-100" />
          <div className="mt-4 h-4 w-24 rounded-full bg-gray-100" />
          <div className="mt-2 h-4 w-16 rounded-full bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
