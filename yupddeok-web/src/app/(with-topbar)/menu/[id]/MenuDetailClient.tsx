"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import SpiceSelector from "./SpiceSelector";
import ToppingSelector from "./ToppingSelector";
import { CART_KEY } from "@/constants/storageKeys";
import type { CartState } from "@/types/cart";

type MenuOption = { value: string; name: string };
type MenuOptionConfig = { required: boolean; options: MenuOption[] };
type SpiceOption = { value: string; name: string };
type ToppingOption = {
  type: "A" | "B";
  required: boolean;
  options: { value: string; name: string; price: number; count: number }[];
};
type SpiceConfig = { required: boolean; options: SpiceOption[] };
type SelectedTopping = { value: string; name: string; price: number; count: number;};

type Menu = {
  id: string;
  name: string;
  price: number;
  image: string;
  explan?: string;
  menuOption?: MenuOptionConfig;
  spice?: SpiceConfig;
  toppingChoices: ToppingOption[];
};

export default function MenuDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery<Menu>({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await fetch(`/api/menus/${id}`);
      if (!res.ok) throw new Error("not found");
      return (await res.json()) as Menu;
    },
  });

  const handleToppingChange = useCallback(
    (type: "A" | "B", select: SelectedTopping[]) => {
      setSelectedToppingsByType((prev) => ({
        ...prev,
        [type]: select,
      }));
    },
    []
  );


  const emptyCartState: CartState = {
    items: [],
    delivery: { type: "DELIVERY" },
    requestNote: "",
    price: { itemsTotal: 0, deliveryFee: 0, discount: 0, finalTotal: 0 },
  };
  const [menuCount, setMenuCount] = useState(1);
  const [cartState, setCartState] = useState<CartState>(() => {
    if (typeof window === "undefined") return emptyCartState;
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? (JSON.parse(saved) as CartState) : emptyCartState;
    } catch {
      return emptyCartState;
    }
  });

  function makeCartKey(params: {
  menuId: string;
  menuOptionValue?: string | null;
  spiceValue?: string | null;
  toppings: SelectedTopping[];
}) {
  const menuOption = params.menuOptionValue ?? "none";
  const spice = params.spiceValue ?? "none";

  const toppingsKey = params.toppings
    .map((t) => `${t.value}:${t.count}`) // ⭐ count 포함
    .sort() // ⭐ 순서 무시
    .join(",");

  return `${params.menuId}|menuOption:${menuOption}|spice:${spice}|toppings:${toppingsKey}`;
}

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartState));
    } catch {}
  }, [cartState]);

const [selectedToppingsByType, setSelectedToppingsByType] = useState<{
  A: SelectedTopping[];
  B: SelectedTopping[];
}>({ A: [], B: [] });

const selectedToppings = [
  ...selectedToppingsByType.A,
  ...selectedToppingsByType.B,
];


  const [selectedMenuOption, setSelectedMenuOption] = useState<MenuOption | null>(null);
  const [selectedSpice, setSelectedSpice] = useState<{ value: string; name: string } | null>(null);

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !data) return <p>없는 메뉴입니다.</p>;

  const spice = data.spice;
  const menuOption = data.menuOption;
  const topping = data.toppingChoices ?? [];

const toppingsTotal = () => {
       const price = selectedToppings.reduce ((sum, t) => sum + t.price * t.count, 0);
      return price
};

  const selectedToppingsPrice = toppingsTotal();
  const totalPrice = (data.price + selectedToppingsPrice) * menuCount;

  const addToCart = () => {
  const toppingsPrice = toppingsTotal();

  const key = makeCartKey({
    menuId: data.id,
    menuOptionValue: selectedMenuOption?.value ?? null,
    spiceValue: selectedSpice?.value ?? null,
    toppings: selectedToppings,
  });

  if (menuOption?.required && !selectedMenuOption) {
    window.alert("메뉴 구성을 선택해주세요.");
    return;
  }

  setCartState((prev) => {
    const items = Array.isArray(prev.items) ? prev.items : [];

    const idx = items.findIndex((it: any) => it.key === key);

    // ⭐ 이 메뉴 1개(=menuCount 1개) 가격
    const unitTotal = data.price + toppingsPrice;

    if (idx >= 0) {
      // ✅ 같은 구성 존재 → 수량만 증가
      const nextItems = [...items];
      const current = nextItems[idx];

      nextItems[idx] = {
        ...current,
        count: current.count + menuCount,
      };

      return {
        ...prev,
        items: nextItems,
        price: {
          ...prev.price,
          itemsTotal: prev.price.itemsTotal + unitTotal * menuCount,
          finalTotal: prev.price.finalTotal + unitTotal * menuCount,
        },
      };
    }

    // ✅ 새로운 구성 → 새로 추가
    const newItem: any = {
      id: data.id,
      name: data.name,
      image: data.image,
      price: data.price,
      selectedMenuOption: selectedMenuOption ?? undefined,
      selectedSpice: selectedSpice ?? undefined,
      selectedToppings,
      toppingsPrice,
      count: menuCount,
      key, // ⭐ 여기!
    };

    return {
      ...prev,
      items: [...items, newItem],
      price: {
        ...prev.price,
        itemsTotal: prev.price.itemsTotal + unitTotal * menuCount,
        finalTotal: prev.price.finalTotal + unitTotal * menuCount,
      },
    };
  });
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
      {menuOption ? (
        <section className="mt-4">
          <h3 className="font-bold">메뉴 선택 {menuOption.required && "(필수)"}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {menuOption.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSelectedMenuOption(opt)}
                className={
                  selectedMenuOption?.value === opt.value
                    ? "rounded-full border border-black bg-black px-4 py-2 font-bold text-white"
                    : "rounded-full border border-gray-300 bg-white px-4 py-2 font-bold text-black"
                }
              >
                {opt.name}
              </button>
            ))}
          </div>
        </section>
      ) : null}
      <p>{data.explan}</p>

    

      {spice ? (
        <SpiceSelector options={spice.options} required={spice.required} onChange={setSelectedSpice} />
      ) : null}

      {topping.length > 0
        ? topping.map((choice) => (
            <div key={choice.type} style={{ marginTop: 16 }}>
              <ToppingSelector
  type={choice.type}
  options={(choice.options ?? []). map(o => ({
    value: o.value,
    name: o.name,   // 필요하면 매핑
    price: o.price,
  }))}  
  required={choice.required}
  max={3}
  onChange={handleToppingChange}
/>


            </div>
          ))
        : null}

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 border-t border-gray-200 bg-white px-6 pb-6 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-gray-500">가격</p>
            <p className="text-[22px] font-bold">{totalPrice.toLocaleString()}원</p>
          </div>

            <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 rounded-full border border-gray-300 px-3 py-2">
              <button
                type="button"
                className="text-lg font-bold"
                onClick={() => setMenuCount((c) => Math.max(1, c - 1))}
              >
                -
              </button>
              <span className="min-w-6 text-center font-bold">{menuCount}</span>
              <button
                type="button"
                className="text-lg font-bold"
                onClick={() => setMenuCount((c) => c + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>

          <button
            type="button"
            className="w-full rounded-full bg-black px-5 py-3 font-bold text-white"
            onClick={addToCart}
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
