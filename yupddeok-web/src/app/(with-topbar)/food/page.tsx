"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { STORE_KEY } from "@/constants/storageKeys";

type Menu = {
  id: string;
  name: string;
};

export default function Home() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState<string>("");

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



  return (
    <section>
      
      <p>선택한 매장: {storeName ? storeName : "아직 선택 안 함"}</p>
      {menus.map((menu) => (
        <Link key={menu.id} href={`/menu/${menu.id}`}>
          <button>{menu.name}</button>
        </Link>
      ))}

      
     
       <Link href={`/order`}>
      <button> 주문하기</button></Link>
       <Link href={`/cart`}>
      <button> 장바구니(임시버튼)</button></Link>
    </section>
  );
}
