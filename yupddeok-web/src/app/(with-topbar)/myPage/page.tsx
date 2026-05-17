"use client";

import Link from "next/link";
import { useState } from "react";
import { getLatestAddressLabel, readSavedAddresses } from "@/lib/address";

const quickLinks = [
  { href: "/orders", label: "주문내역", caption: "최근 주문 확인" },
  { href: "/myPage/profile/address", label: "주소 관리", caption: "배달 주소 수정" },
];

const serviceLinks = [
  { href: "/notice", label: "공지사항" },
  { href: "/support", label: "고객센터" },
];

export default function MyPage() {
  const [addressCount] = useState(() => readSavedAddresses().length);
  const [latestAddress] = useState(() => getLatestAddressLabel());

  return (
    <div className="bg-[#f6f7f9] px-4 py-4">
      <h1 className="text-[24px] font-bold">마이페이지</h1>

      <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-semibold tracking-[0.08em] text-gray-400">
              ACCOUNT
            </p>
            <p className="mt-2 text-[24px] font-bold text-black">홍길동 님</p>
            <p className="mt-1 text-sm text-gray-500">yupdduk@example.com</p>
          </div>

          <Link
            href="/myPage/profile"
            className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white"
          >
            내 정보
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-400">저장된 주소</p>
            <p className="mt-2 text-[22px] font-bold">{addressCount}개</p>
          </div>
          <div className="rounded-2xl bg-gray-50 px-4 py-4">
            <p className="text-sm text-gray-400">최근 이용 서비스</p>
            <p className="mt-2 text-[22px] font-bold">배달</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-gray-50 px-4 py-4">
          <p className="text-sm text-gray-400">기본 배달 주소</p>
          <p className="mt-2 font-bold text-black">
            {latestAddress || "등록된 주소가 없습니다"}
          </p>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
        <h2 className="text-[20px] font-bold">자주 찾는 메뉴</h2>
        <div className="mt-4 space-y-3">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4"
            >
              <div>
                <p className="font-bold text-black">{item.label}</p>
                <p className="mt-1 text-sm text-gray-500">{item.caption}</p>
              </div>
              <span className="text-lg text-gray-300">›</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
        <h2 className="text-[20px] font-bold">혜택 및 알림</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 px-4 py-5">
            <p className="text-sm font-semibold text-red-400">쿠폰</p>
            <p className="mt-2 text-[20px] font-bold text-black">0장</p>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-5">
            <p className="text-sm font-semibold text-gray-400">알림</p>
            <p className="mt-2 text-[20px] font-bold text-black">새 소식 없음</p>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[28px] bg-white p-5 shadow-sm">
        <h2 className="text-[20px] font-bold">고객 지원</h2>
        <div className="mt-4 space-y-3">
          {serviceLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4 font-bold text-black"
            >
              {item.label}
              <span className="text-lg text-gray-300">›</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
