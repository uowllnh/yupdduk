"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CART_KEY } from "@/constants/storageKeys";
import type { CartItem, CartState } from "@/types/cart";

type MenuSummary = {
  id: string;
  image: string;
};

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
    if (typeof window === "undefined") return emptyCartState;
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? (JSON.parse(saved) as CartState) : emptyCartState;
    } catch {
      return emptyCartState;
    }
  });
  const [isEditing, setIsEditing] = useState(false);
  const [menuImageMap, setMenuImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    } catch {}
  }, [cartState]);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) return;

        const data = (await res.json()) as MenuSummary[];
        if (ignore) return;

        setMenuImageMap(
          data.reduce<Record<string, string>>((acc, menu) => {
            acc[menu.id] = menu.image;
            return acc;
          }, {}),
        );
      } catch {}
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const getUnitTotal = (item: CartItem) => {
    const toppingsTotal = (item.selectedToppings ?? []).reduce(
      (sum, topping) => sum + topping.price * topping.count,
      0,
    );

    return item.price + toppingsTotal;
  };

  const updateItemCount = (index: number, diff: number) => {
    setCartState((prev) => {
      const current = prev.items[index];
      if (!current) return prev;

      const nextCount = current.count + diff;
      if (nextCount < 1) return prev;

      const nextItems = [...prev.items];
      nextItems[index] = {
        ...current,
        count: nextCount,
      };

      const unitTotal = getUnitTotal(current);
      const nextItemsTotal = prev.price.itemsTotal + unitTotal * diff;

      return {
        ...prev,
        items: nextItems,
        price: {
          ...prev.price,
          itemsTotal: nextItemsTotal,
          finalTotal: prev.price.finalTotal + unitTotal * diff,
        },
      };
    });
  };

  const removeItem = (index: number) => {
    setCartState((prev) => {
      const removed = prev.items[index];
      if (!removed) return prev;

      const removedTotal = getUnitTotal(removed) * removed.count;
      const nextItems = prev.items.filter((_, itemIndex) => itemIndex !== index);

      return {
        ...prev,
        items: nextItems,
        price: {
          ...prev.price,
          itemsTotal: Math.max(0, prev.price.itemsTotal - removedTotal),
          finalTotal: Math.max(0, prev.price.finalTotal - removedTotal),
        },
      };
    });
  };

  const clearCart = () => {
    setCartState((prev) => ({
      ...prev,
      items: [],
      price: {
        itemsTotal: 0,
        deliveryFee: prev.price.deliveryFee,
        discount: prev.price.discount,
        finalTotal: 0,
      },
    }));
  };

  return (
    <div className="px-6 pb-44">
      <div className="flex items-center justify-between">
        <h1 className="text-[24px] font-bold">장바구니</h1>
        {cartState.items.length > 0 ? (
          <div className="flex items-center gap-3">
            {isEditing ? (
              <button
                type="button"
                className="text-sm font-semibold text-red-400"
                onClick={clearCart}
              >
                전체 삭제
              </button>
            ) : null}
            <button
              type="button"
              className="text-sm font-semibold text-gray-400"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "완료" : "편집하기"}
            </button>
          </div>
        ) : null}
      </div>

      {cartState.items.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
          <p className="text-lg font-bold">장바구니가 비어있어요</p>
          <p className="mt-2 text-sm text-gray-500">
            먹고 싶은 메뉴를 담아 주문을 시작해보세요.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-full bg-black px-5 py-3 font-bold text-white"
          >
            메뉴 보러가기
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {cartState.items.map((item, index) => {
            const itemImage = item.image ?? menuImageMap[item.id];
            const optionSummary = [
              item.selectedMenuOption
                ? `메뉴 ${item.selectedMenuOption.name}`
                : null,
              item.selectedSpice ? `맵기 ${item.selectedSpice.name}` : null,
              item.selectedToppings.length > 0
                ? `토핑 ${item.selectedToppings
                    .map((topping) => `${topping.name} x${topping.count}`)
                    .join(", ")}`
                : null,
            ]
              .filter(Boolean)
              .join(" / ");

            return (
              <div
                key={item.key ?? `${item.id}-${index}`}
                className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gray-50">
                    {itemImage ? (
                      <Image
                        src={itemImage}
                        alt={item.name}
                        width={88}
                        height={88}
                        className="object-contain"
                      />
                    ) : null}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[18px] font-bold text-black">
                          {item.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {optionSummary || "기본 옵션"}
                        </p>
                      </div>

                      {isEditing ? (
                        <button
                          type="button"
                          className="text-sm font-semibold text-gray-300"
                          onClick={() => removeItem(index)}
                        >
                          삭제
                        </button>
                      ) : null}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-[18px] font-bold">
                        {(getUnitTotal(item) * item.count).toLocaleString()}원
                      </p>

                      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-2 py-2">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-base font-bold"
                          onClick={() => updateItemCount(index, -1)}
                        >
                          -
                        </button>
                        <span className="min-w-5 text-center font-bold">
                          {item.count}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-base font-bold text-white"
                          onClick={() => updateItemCount(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartState.items.length > 0 ? (
        <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 border-t border-gray-200 bg-white px-6 pb-6 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500">총 주문 금액</p>
              <p className="mt-1 text-[28px] font-bold">
                {cartState.price.itemsTotal.toLocaleString()}원
              </p>
            </div>

            <Link
              href="/pay"
              className="flex w-full items-center justify-center rounded-full bg-black px-5 py-4 text-center font-bold text-white"
            >
              주문하기
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
