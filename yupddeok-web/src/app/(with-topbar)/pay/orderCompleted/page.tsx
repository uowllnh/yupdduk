"use client";

import Link from "next/link";

export default function Completed() {
  return (
    <section className="px-6 py-10 text-center">
      <p className="text-[28px] font-bold">주문이 완료되었습니다</p>
      <p className="mt-3 text-sm text-gray-500">
        주문내역에서 방금 주문한 내용을 확인할 수 있습니다.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <Link
          href="/orders"
          className="rounded-full bg-black px-5 py-4 font-bold text-white"
        >
          주문내역 보기
        </Link>
        <Link
          href="/"
          className="rounded-full border border-gray-200 px-5 py-4 font-bold text-black"
        >
          홈으로
        </Link>
      </div>
    </section>
  );
}
