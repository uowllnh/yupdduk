"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CART_KEY } from "@/constants/storageKeys";
import { clearCart, createOptionSummary, emptyCartState } from "@/lib/cart";
import { readStorage, writeStorage } from "@/lib/storage";
import type { CartState } from "@/types/cart";

export default function CartPage() {
  const [cartState, setCartState] = useState<CartState>(() =>
    readStorage(CART_KEY, emptyCartState),
  );

  useEffect(() => {
    writeStorage(CART_KEY, cartState);
  }, [cartState]);

  return (
    <div className="px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">임시 장바구니</h1>
        <button
          type="button"
          className="text-sm font-semibold text-red-400"
          onClick={() => setCartState((prev) => clearCart(prev))}
        >
          장바구니 비우기
        </button>
      </div>

      {cartState.items.length === 0 ? (
        <p className="mt-8 text-sm text-gray-500">비어있음</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {cartState.items.map((item, index) => (
            <li
              key={item.key ?? `${item.id}-${index}`}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <p className="font-bold">
                {item.name} - {item.price.toLocaleString()}원
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {createOptionSummary(item) || "기본 옵션"} / 수량 {item.count}
              </p>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full border border-gray-200 px-4 py-3">
          메뉴 추가
        </Link>
        <Link href="/order" className="rounded-full bg-black px-4 py-3 text-white">
          주문하기
        </Link>
      </div>
    </div>
  );
}
