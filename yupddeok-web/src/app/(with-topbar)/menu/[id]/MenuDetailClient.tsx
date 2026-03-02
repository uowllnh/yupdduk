"use client";

import { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpiceSelector from "./SpiceSelector";
import ToppingSelector from "./ToppingSelector";
import Link from "next/link";
import { CART_KEY } from "@/constants/storageKeys";
import type { CartState, CartItem } from "@/types/cart";

type SpiceOption = { value: string; label: string };
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
  explan?: string;
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
  spiceValue?: string | null;
  toppings: SelectedTopping[];
}) {
  const spice = params.spiceValue ?? "none";

  const toppingsKey = params.toppings
    .map((t) => `${t.value}:${t.count}`) // ⭐ count 포함
    .sort() // ⭐ 순서 무시
    .join(",");

  return `${params.menuId}|spice:${spice}|toppings:${toppingsKey}`;
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


  const [selectedSpice, setSelectedSpice] = useState<{ value: string; name: string } | null>(null);

  if (isLoading) return <p>로딩중...</p>;
  if (isError || !data) return <p>없는 메뉴입니다.</p>;

  const spice = data.spice;
  const topping = data.toppingChoices ?? [];

const toppingsTotal = () => {
       const price = selectedToppings.reduce ((sum, t) => sum + t.price * t.count, 0);
      return price
};

  const addToCart = () => {
  const toppingsPrice = toppingsTotal();

  const key = makeCartKey({
    menuId: data.id,
    spiceValue: selectedSpice?.value ?? null,
    toppings: selectedToppings,
  });

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
      price: data.price,
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
    <div>

      <h1>{data.name}</h1>
      <h2>{data.price.toLocaleString()}원</h2>
      <p>{data.explan}</p>

         <button type="button" onClick={() => setMenuCount(c => Math.max(1, c - 1))}>-</button>
          <span>{menuCount}</span>
          <button type="button" onClick={() => setMenuCount(c => c + 1)}>+</button>

    

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

      <button style={{ marginTop: 16 }} onClick={addToCart}>
        장바구니 담기
      </button>
    </div>
  );
}
