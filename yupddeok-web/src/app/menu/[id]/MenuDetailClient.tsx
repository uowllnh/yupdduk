"use client";

import { useQuery } from "@tanstack/react-query";

type Menu = { id: string; name: string; price: number; explan: string };

export default function MenuDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await fetch(`/api/menus/${id}`);
      if (!res.ok) throw new Error("not found");
      return (await res.json()) as Menu;
    },
  });

  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>없는 메뉴입니다.</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>{data.price.toLocaleString()}원</h2>
      <p>{data.explan}</p>
    </div>
  );
}
