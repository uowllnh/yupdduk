"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { STORE_KEY } from "@/constants/storageKeys";
import { readStorage } from "@/lib/storage";
import type { MenuSection } from "@/types/menu";
import { getMenus } from "./_api";
import { MenuCategoryTabs } from "./_components/MenuCategoryTabs";
import { MenuGrid } from "./_components/MenuGrid";
import { MenuListState } from "./_components/MenuListState";
import { MenuSkeleton } from "./_components/MenuSkeleton";
import { StoreSummary } from "./_components/StoreSummary";

export default function FoodPage() {
  const [selectedSection, setSelectedSection] = useState<MenuSection | "">("");
  const [storeName] = useState(() => readStorage(STORE_KEY, ""));

  const {
    data: menus = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenus,
  });

  const filteredMenus = useMemo(() => {
    if (!selectedSection) return menus;
    return menus.filter((menu) => menu.section === selectedSection);
  }, [menus, selectedSection]);

  return (
    <section className="min-h-screen bg-[#f6f7f9] px-5 pb-8">
      <div className="space-y-4">
        <StoreSummary storeName={storeName} />
        <MenuCategoryTabs
          selectedSection={selectedSection}
          onChange={setSelectedSection}
        />
      </div>

      {isLoading ? <MenuSkeleton /> : null}

      {isError ? (
        <MenuListState
          title="메뉴를 불러오지 못했습니다"
          description="잠시 후 다시 시도해주세요."
        />
      ) : null}

      {!isLoading && !isError && filteredMenus.length > 0 ? (
        <MenuGrid menus={filteredMenus} />
      ) : null}

      {!isLoading && !isError && filteredMenus.length === 0 ? (
        <MenuListState
          title="표시할 메뉴가 없습니다"
          description="다른 카테고리를 선택해보세요."
        />
      ) : null}

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 rounded-[24px] border-t border-gray-200 bg-white px-6 pt-4 pb-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/order"
            className="rounded-2xl bg-black px-4 py-3 text-center font-bold text-white"
          >
            주문하기
          </Link>
          <Link
            href="/order"
            className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-center font-bold text-black"
          >
            장바구니
          </Link>
        </div>
      </div>
    </section>
  );
}
