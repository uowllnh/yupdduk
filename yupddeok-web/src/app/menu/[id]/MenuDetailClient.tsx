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
     
    const newItem: CartItem = {
      id: data.id,
      name: data.name,
      price: data.price,
      selectedSpice: selectedSpice ?? undefined,
      selectedToppings,
      toppingsPrice: toppingsTotal(),
      count: menuCount, 

    };

    setCartState((prev) => ({
      ...prev,
      items: [...(Array.isArray(prev.items) ? prev.items : []), newItem],
      price: {
        ...prev.price,
        itemsTotal: prev.price.itemsTotal + data.price + newItem.toppingsPrice * menuCount,
        finalTotal: prev.price.finalTotal + data.price + newItem.toppingsPrice,
      },
    }));
  };

  


  return (
    <div>
      <Link href="/">
        <button type="button">홈으로 가기</button>
      </Link>

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
  options={choice.options.map(o => ({
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
