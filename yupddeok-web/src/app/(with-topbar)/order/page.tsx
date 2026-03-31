"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CART_KEY } from "@/constants/storageKeys";
import type { CartState, CartItem } from "@/types/cart";

export default function Order() {
  const emptyCartState: CartState = {
    items: [],
    delivery: { type: "DELIVERY" },
    requestNote: "",
    price: {
      itemsTotal: 0,
      deliveryFee: 0,
      discount: 0,
      finalTotal: 0,
    },
  };

  const [cartState, setCartState] = useState<CartState>(() => {
    if (typeof window === "undefined") return emptyCartState; // SSR 안전장치
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? (JSON.parse(saved) as CartState) : emptyCartState;
    } catch {
      return emptyCartState;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    } catch {}
  }, [cartState]);

  return (
    <div>
      <a>주문하기</a>

      <button
        type="button"
        onClick={() =>
          setCartState((prev) => ({
            ...prev,
            items: [],
            price: {
              itemsTotal: 0,
              deliveryFee: prev.price.deliveryFee,
              discount: prev.price.discount,
              finalTotal: 0,
            },
          }))
        }
      >
        장바구니 전체 비우기
      </button>

      {cartState.items.length === 0 ? (
        <p>비어있음</p>
      ) : (
        <ul>
          {cartState.items.map((item, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => {
                  setCartState((prev) => {
                    const removed = prev.items[index]; // 삭제될 아이템
                    const nextItems = prev.items.filter((_, i) => i !== index);

                    // 토핑 가격도 포함한 1개 기준 가격 계산 (CartItem에 price가 메뉴값만 들어있다면)
                    const toppingsTotal = (
                      removed.selectedToppings ?? []
                    ).reduce((sum, t) => sum + t.price * t.count, 0);
                    const unitTotal = removed.price + toppingsTotal;
                    const removedTotal = unitTotal * removed.count;

                    return {
                      ...prev,
                      items: nextItems,
                      price: {
                        ...prev.price,
                        itemsTotal: Math.max(
                          0,
                          prev.price.itemsTotal - removedTotal,
                        ),
                        finalTotal: Math.max(
                          0,
                          prev.price.finalTotal - removedTotal,
                        ),
                      },
                    };
                  });
                }}
              >
                X
              </button>
              {item.name} - {item.price.toLocaleString()}원
              {item.selectedSpice ? item.selectedSpice?.name : ""}
              <>
                {item.selectedToppings.length > 0 &&
                  "/ 토핑: " +
                    item.selectedToppings
                      .map((t) => `${t.name}x${t.count} `)
                      .join(", ")}
              </>
              X {item.count}
            </li>
          ))}
        </ul>
      )}

      <Link href="/">메뉴 추가</Link>

      <Link href="/pay">{cartState.price.itemsTotal}원 결제하기</Link>
    </div>
  );
}
