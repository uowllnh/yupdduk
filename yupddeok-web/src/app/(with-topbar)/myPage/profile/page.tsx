"use client";

import Link from "next/link";

export default function MyPageProfile() {
  return (
    <section className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">프로필 정보</h1>
        <Link href="/myPage/profile/edit" className="font-semibold text-gray-400">
          편집
        </Link>
      </div>

      <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-400">이름</p>
        <p className="mt-1 font-bold">홍길동</p>

        <p className="mt-5 text-sm text-gray-400">이메일</p>
        <p className="mt-1 font-bold">yupdduk@example.com</p>

        <p className="mt-5 text-sm text-gray-400">휴대폰 번호</p>
        <p className="mt-1 font-bold">010-1234-5678</p>
      </div>
    </section>
  );
}
