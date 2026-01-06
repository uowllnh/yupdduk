"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Menu = {
  id: string;
  name: string;
};

export default function Home() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  (async () => {
    try {
      const res = await fetch("/api/menus");
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMenus(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  if (loading) return <p>로딩중...</p>;

  return (
    <section>
      {menus.map((menu) => (
        <Link key={menu.id} href={`/menu/${menu.id}`}>
          <button>{menu.name}</button>
        </Link>
      ))}
    </section>
  );
}
