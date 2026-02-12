"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Store = {
  id: string;
  name: string;
  distance: string;
  open: boolean;
};

export default function StoreList({ id }: { id: string }) {
  // const [stores, setStores] = useState<Store[]>([]);
  // const [loading, setLoading] = useState(true);

 const { data, isLoading, isError } = useQuery<Store>({
    queryKey: ["stores"],
    queryFn: async () => {
      const res = await fetch("/api/stores");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as Store[];
    },
  });


  if (isLoading) return <p>로딩중...</p>;
 if (isError) return <p>매장 불러오기 실패</p>;

  const stores = data ?? [];

  return (
    <div>
      <Link href="/cart">
        <button type="button">뒤로가기</button>
      </Link>

      <h2>매장 선택</h2>

      <section>
        {/* {stores.map((store) => (
          <Link key={store.id} href={`/stores/${store.id}`}>
            <button type="button">
              {store.name} ({store.distance}) {store.open ? "영업중" : "마감"}
            </button>
          </Link>
        ))} */}
          <h1>{data.name}</h1>
        <Link href={`/cart`}>
          <button type="button">장바구니</button>
        </Link>
      </section>
    </div>
  );
}
