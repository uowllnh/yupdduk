"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { STORE_KEY } from "@/constants/storageKeys";

type MenuSection = "MAIN" | "SET" | "MEALKIT" | "SIDE" | "DRINK";

type Menu = {
  id: string;
  name: string;
  section: MenuSection;
  image: string;
  price: number;
};

export default function Home() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState<string>("");
  const [selectedSection, setSelectedSection] = useState<MenuSection | "">("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMenus(data);
        const saved = localStorage.getItem(STORE_KEY);
        if (saved) setStoreName(saved);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredMenus = selectedSection
    ? menus.filter((menu) => menu.section === selectedSection)
    : menus;

  const isEmpty = !loading && filteredMenus.length === 0;

  return (
    <section className="px-5 pb-6">
      <div className="-mt-[64px] mb-5 flex items-center pl-[58px] pr-1">
        <div className="relative w-[102px]">
          <select
            value={selectedSection}
            onChange={(event) =>
              setSelectedSection(event.target.value as MenuSection | "")
            }
            className="h-11 w-full appearance-none rounded-full border border-gray-200 bg-white pl-4 pr-11 text-[15px] font-semibold text-black shadow-sm outline-none"
          >
            <option value="">전체</option>
            <option value="MAIN">MAIN</option>
            <option value="SET">SET</option>
            <option value="MEALKIT">MEALKIT</option>
            <option value="SIDE">SIDE</option>
            <option value="DRINK">DRINK</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-red-500">
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.5L6 6.5L11 1.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 px-4 py-4 shadow-sm">
        <p className="text-[12px] font-semibold tracking-[0.08em] text-gray-400">
          SELECTED STORE
        </p>
        <div className="mt-2 flex items-center justify-between gap-3">
          <div>
            <p className="text-[18px] font-bold text-black">
              {storeName ? storeName : "아직 선택 안 함"}
            </p>
            <p className="mt-1 text-sm text-gray-500">현재 주문할 매장</p>
          </div>
          <div className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold text-red-500">
            배달 가능
          </div>
        </div>
      </div>

      {loading && <p className="font-bold">메뉴를 불러오는 중입니다.</p>}

      {!loading && (
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-2">
          {filteredMenus.map((menu) => (
            <Link
              key={menu.id}
              href={`/menu/${menu.id}`}
              className="my-1 rounded-[25px] border border-gray-200 px-3 py-3"
            >
              <div className="flex justify-center">
                <Image
                  src={menu.image}
                  alt={menu.name}
                  width={114}
                  height={114}
                />
              </div>
              <div className="mt-3 flex items-end justify-between">
                <div className="flex flex-col text-[15px]">
                  <div className="font-bold">{menu.name}</div>
                  <div className="font-bold">{menu.price}원</div>
                </div>
                <Image
                  src={"/plus_bt.png"}
                  alt={"추가 버튼"}
                  width={30}
                  height={30}
                />
              </div>
            </Link>
          ))}
        </div>
      )}

      {isEmpty && (
        <p className="font-bold">선택한 카테고리에 해당하는 메뉴가 없습니다.</p>
      )}

      <Link href={`/order`}> 주문하기</Link>
      <Link href={`/cart`}> 장바구니(임시버튼)</Link>
    </section>
  );
}
