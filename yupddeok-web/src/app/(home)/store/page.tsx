"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { STORE_KEY } from "@/constants/storageKeys";
import { writeStorage } from "@/lib/storage";
import { getStores } from "./_api";

export default function Store() {
  const {
    data: stores = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
  });

  const saveStore = (name: string) => {
    writeStorage(STORE_KEY, name);
  };

  const handlePick = (name: string) => {
    saveStore(name);
  };

  return (
    <section className="flex flex-col gap-6 px-5 pb-10">
      <h1 className="text-[20px] font-bold text-[var(--text)]">
        배달 매장 찾기
      </h1>

      {isLoading ? (
        <div className="rounded-[10px] border border-gray-200 bg-white px-5 py-8 text-center text-sm text-gray-500">
          매장 정보를 불러오는 중...
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-[10px] border border-gray-200 bg-white px-5 py-8 text-center text-sm text-gray-500">
          매장 정보를 불러오지 못했습니다.
        </div>
      ) : null}

      {!isLoading && !isError ? (
        <ul className="flex flex-col gap-3">
          {stores.map((store) => {
          const isOpen = store.open;

          return (
            <li key={store.id}>
              <Link
                href={isOpen ? "/food" : "#"}
                onClick={(event) => {
                  if (!isOpen) {
                    event.preventDefault();
                    return;
                  }

                  handlePick(store.name);
                }}
                aria-disabled={!isOpen}
                className={`flex items-center justify-between rounded-[10px] border px-5 pt-5 pb-7 shadow-[0_10px_30px_rgba(16,30,32,0.06)] transition-transform duration-200 ${
                  isOpen
                    ? "border-[var(--border)] bg-white hover:-translate-y-0.5"
                    : "border-gray-200 bg-gray-100 opacity-70"
                }`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-[18px] font-semibold text-[var(--text)]">
                      {store.name}
                    </span>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        isOpen
                          ? "bg-[var(--primary)] text-white"
                          : "bg-gray-300 text-gray-700"
                      }`}
                    >
                      {isOpen ? "영업중" : "준비중"}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-[14px]">
                    <span className="flex items-center gap-3">
                      <Image
                        src="/assets/store/pick.png"
                        alt="거리"
                        width={15.33}
                        height={18.52}
                      />
                      {store.distance}
                    </span>
                    <span className="flex items-center gap-3">
                      <Image
                        src="/assets/store/DeliveryPee.png"
                        alt="배달료"
                        width={23}
                        height={16}
                      />
                      {store.pee}원
                    </span>
                  </div>
                </div>

                <span
                  className={`text-sm font-semibold ${
                    isOpen ? "text-[var(--primary)]" : "text-gray-500"
                  }`}
                >
                  {isOpen ? "선택하기" : "선택불가"}
                </span>
              </Link>
            </li>
          );
          })}
        </ul>
      ) : null}
    </section>
  );
}
