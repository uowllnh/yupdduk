import Link from "next/link";

type StoreSummaryProps = {
  storeName: string;
};

export function StoreSummary({ storeName }: StoreSummaryProps) {
  const hasStore = Boolean(storeName);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-400">현재 주문 매장</p>
          <p className="mt-1 truncate text-lg font-bold text-black">
            {hasStore ? storeName : "매장을 선택해주세요"}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {hasStore
              ? "선택한 매장 기준으로 주문을 진행합니다."
              : "매장을 먼저 선택하면 배달 주문을 이어갈 수 있습니다."}
          </p>
        </div>

        <Link
          href="/store"
          className="shrink-0 rounded-full bg-red-50 px-3 py-2 text-xs font-bold text-red-500"
        >
          변경
        </Link>
      </div>
    </section>
  );
}
