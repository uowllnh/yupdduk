"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { getMenuDetail } from "./_api";
import SpiceSelector from "./SpiceSelector";
import ToppingSelector from "./ToppingSelector";
import {
  buildCartItemKey,
  getSelectedToppingsPrice,
} from "@/lib/cart";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem } from "@/types/cart";
import type { MenuDetail, MenuOption, SelectedTopping } from "@/types/menu";

type ToppingsByType = {
  A: SelectedTopping[];
  B: SelectedTopping[];
};

export default function MenuDetailClient({ id }: { id: string }) {
  const [menuCount, setMenuCount] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const [selectedMenuOption, setSelectedMenuOption] =
    useState<MenuOption | null>(null);
  const [selectedSpice, setSelectedSpice] = useState<MenuOption | null>(null);
  const [cartToastKey, setCartToastKey] = useState(0);
  const [isCartToastVisible, setIsCartToastVisible] = useState(false);
  const [selectedToppingsByType, setSelectedToppingsByType] =
    useState<ToppingsByType>({
      A: [],
      B: [],
    });

  const { data, isLoading, isError } = useQuery<MenuDetail>({
    queryKey: ["menu", id],
    queryFn: () => getMenuDetail(id),
  });

  useEffect(() => {
    if (!isCartToastVisible) return;

    const timeoutId = window.setTimeout(() => {
      setIsCartToastVisible(false);
    }, 1800);

    return () => window.clearTimeout(timeoutId);
  }, [cartToastKey, isCartToastVisible]);

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

  const menuOptionPrice = selectedMenuOption?.price ?? 0;

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !data) return <p>없는 메뉴입니다.</p>;

  const unitPrice = data.price + menuOptionPrice;
  const totalPrice = (unitPrice + toppingsPrice) * menuCount;

  const handleAddToCart = () => {
    if (data.menuOption?.required && !selectedMenuOption) {
      window.alert("메뉴 구성을 선택해주세요.");
      return;
    }

    const cartItem: CartItem = {
      id: data.id,
      name: data.name,
      image: data.image,
      price: unitPrice,
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

    addItem(cartItem, menuCount);
    setIsCartToastVisible(true);
    setCartToastKey((prev) => prev + 1);
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
      <h2 className="my-[9px] text-[22px] font-bold">
        {data.price.toLocaleString()}원
      </h2>

      {data.explan ? (
        <p className="text-[14px] text-gray-500">{data.explan}</p>
      ) : null}

      {data.menuOption ? (
        <section className="mt-2 mb-8">
          <div className="flex flex-wrap gap-3">
            {data.menuOption.options.map((option) => {
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSelectedMenuOption(option)}
                  className={
                    selectedMenuOption?.value === option.value
                      ? "border-primary bg-primary rounded-full border px-4 py-2 text-[13px] text-white"
                      : "rounded-full border border-gray-300 bg-white px-4 py-2 text-[13px] text-black"
                  }
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {data.spice ? (
        <SpiceSelector
          options={data.spice.options}
          required={data.spice.required}
          allowLowSugar={data.id === "yupddeok"}
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
      <section className="하단 잘림 방지용 여백 mt-20" />

      {isCartToastVisible ? (
        <div
          role="status"
          className="fixed bottom-[154px] left-1/2 z-30 w-[calc(100%-48px)] max-w-[327px] -translate-x-1/2 rounded-[12px] bg-black px-4 py-3 text-center text-sm font-bold text-white shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
        >
          장바구니에 담았어요.
        </div>
      ) : null}

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 rounded-[24px] border-t border-gray-200 bg-white px-6 pt-4 pb-6 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-sm text-gray-500">TOTAL</p>
              <p className="mt-4 text-[22px] font-bold">
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
                <span className="min-w-6 text-center font-bold">
                  {menuCount}
                </span>
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
            className="bg-primary w-full rounded-[12px] px-5 py-3 font-bold text-white"
            onClick={handleAddToCart}
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
