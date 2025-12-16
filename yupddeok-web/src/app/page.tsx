"use client";

import { useQuery } from "@tanstack/react-query";

type Menu = {
  id: string;
  name: string;
  category: string;
  price: number;
};

export default function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["menus"],
    queryFn: async () => {
      const res = await fetch("/api/menus");
      if (!res.ok) throw new Error("failed");
      return (await res.json()) as { items: Menu[] };
    },
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Yupddeok Re:Design</h1>

      {isLoading && <p className="mt-4 text-sm text-gray-500">로딩중…</p>}
      {isError && <p className="mt-4 text-sm text-red-600">에러가 발생했어요</p>}

      <ul className="mt-4 space-y-2">
        {data?.items.map((m) => (
          <li key={m.id} className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{m.name}</p>
                <p className="text-xs text-gray-500">{m.category}</p>
              </div>
              <p className="text-sm font-semibold">{m.price.toLocaleString()}원</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
