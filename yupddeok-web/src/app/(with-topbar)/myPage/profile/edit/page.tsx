"use client";

import Link from "next/link";

export default function MyPageProfileEdit() {
  return (
    <section className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">프로필 편집</h1>
        <Link href="/myPage/profile" className="font-semibold text-gray-400">
          완료
        </Link>
      </div>

      <div className="mt-6 space-y-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <label className="block">
          <p className="mb-2 text-sm text-gray-400">이름</p>
          <input
            type="text"
            defaultValue="홍길동"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
          />
        </label>

        <label className="block">
          <p className="mb-2 text-sm text-gray-400">이메일</p>
          <input
            type="email"
            defaultValue="yupdduk@example.com"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
          />
        </label>

        <label className="block">
          <p className="mb-2 text-sm text-gray-400">휴대폰 번호</p>
          <input
            type="tel"
            defaultValue="010-1234-5678"
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none"
          />
        </label>
      </div>
    </section>
  );
}
