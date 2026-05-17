"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import SpiceSelector from "./SpiceSelector";
import ToppingSelector from "./ToppingSelector";
import { CART_KEY } from "@/constants/storageKeys";
import {
  addCartItem,
  buildCartItemKey,
  emptyCartState,
  getSelectedToppingsPrice,
} from "@/lib/cart";
import { readStorage, writeStorage } from "@/lib/storage";
import type { CartItem, CartState } from "@/types/cart";
import type { MenuDetail, MenuOption, SelectedTopping } from "@/types/menu";

type ToppingsByType = {
  A: SelectedTopping[];
  B: SelectedTopping[];
};

export default function MenuDetailClient({ id }: { id: string }) {
  const [menuCount, setMenuCount] = useState(1);
  const [cartState, setCartState] = useState<CartState>(() =>
    readStorage(CART_KEY, emptyCartState),
  );
  const [selectedMenuOption, setSelectedMenuOption] = useState<MenuOption | null>(
    null,
  );
  const [selectedSpice, setSelectedSpice] = useState<MenuOption | null>(null);
  const [selectedToppingsByType, setSelectedToppingsByType] =
    useState<ToppingsByType>({
      A: [],
      B: [],
    });

  const { data, isLoading, isError } = useQuery<MenuDetail>({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await fetch(`/api/menus/${id}`);
      if (!res.ok) throw new Error("not found");
      return (await res.json()) as MenuDetail;
    },
  });

  useEffect(() => {
    writeStorage(CART_KEY, cartState);
  }, [cartState]);

  const handleToppingChange = useCallback(
    (type: "A" | "B", selected: SelectedTopping[]) => {
      setSelectedToppingsByType((prev) => ({
        ...prev,
        [type]: selected,
      }));
    },
    [],
  );

  const selectedToppings = useMemo(
    () => [...selectedToppingsByType.A, ...selectedToppingsByType.B],
    [selectedToppingsByType],
  );

  const toppingsPrice = useMemo(
    () => getSelectedToppingsPrice(selectedToppings),
    [selectedToppings],
  );

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !data) return <p>없는 메뉴입니다.</p>;

  const totalPrice = (data.price + toppingsPrice) * menuCount;

  const handleAddToCart = () => {
    if (data.menuOption?.required && !selectedMenuOption) {
      window.alert("메뉴 구성을 선택해주세요.");
      return;
    }

    const cartItem: CartItem = {
      id: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      count: 1,
      key: buildCartItemKey({
        menuId: data.id,
        menuOptionValue: selectedMenuOption?.value,
        spiceValue: selectedSpice?.value,
        toppings: selectedToppings,
      }),
      selectedMenuOption: selectedMenuOption ?? undefined,
      selectedSpice: selectedSpice ?? undefined,
      selectedToppings,
      toppingsPrice,
    };

    setCartState((prev) => addCartItem(prev, cartItem, menuCount));
  };

  return (
    <div className="px-6 pb-36">
      <div className="-mx-6 flex justify-center">
        <Image
          src={data.image}
          alt={data.name}
          width={260}
          height={260}
          className="rounded-2xl object-contain"
        />
      </div>

      <h1 className="text-[20px] font-bold">{data.name}</h1>
      <h2 className="text-[22px] font-bold">{data.price.toLocaleString()}원</h2>

      {data.menuOption ? (
        <section className="mt-4">
          <h3 className="font-bold">
            메뉴 선택 {data.menuOption.required && "(필수)"}
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {data.menuOption.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setSelectedMenuOption(option)}
                className={
                  selectedMenuOption?.value === option.value
                    ? "rounded-full border border-black bg-black px-4 py-2 font-bold text-white"
                    : "rounded-full border border-gray-300 bg-white px-4 py-2 font-bold text-black"
                }
              >
                {option.name}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {data.explan ? <p>{data.explan}</p> : null}

      {data.spice ? (
        <SpiceSelector
          options={data.spice.options}
          required={data.spice.required}
          onChange={setSelectedSpice}
        />
      ) : null}

      {data.toppingChoices.map((choice) => (
        <div key={choice.type} className="mt-4">
          <ToppingSelector
            type={choice.type}
            options={choice.options.map((option) => ({
              value: option.value,
              name: option.name,
              price: option.price,
            }))}
            required={choice.required}
            max={3}
            onChange={handleToppingChange}
          />
        </div>
      ))}

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 border-t border-gray-200 bg-white px-6 pb-6 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-gray-500">가격</p>
              <p className="text-[22px] font-bold">
                {totalPrice.toLocaleString()}원
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-full border border-gray-300 px-3 py-2">
                <button
                  type="button"
                  className="text-lg font-bold"
                  onClick={() => setMenuCount((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="min-w-6 text-center font-bold">{menuCount}</span>
                <button
                  type="button"
                  className="text-lg font-bold"
                  onClick={() => setMenuCount((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-black px-5 py-3 font-bold text-white"
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
