"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SpiceSelector from "./SpiceSelector";
import ToppingSelector from "./ToppingSelector";
import MenuCount from "./MenuCount";

type SpiceOption = { value: string; label: string }; //맵기 객체 사전 설정 및 객체 배열 
type ToppingOption = { type: "A" | "B";
  required: boolean;
  options: { value: string; label: string; price: number;}[]; }; //토핑 옵션의 각 형태와 그 배열(options)

type SpiceConfig = {
  required: boolean;
  options: SpiceOption[];
}; //맵기 옵션 전체..?


type Menu = { id: string; name: string; price: number; explan?: string; spice?: SpiceConfig; toppingChoices: ToppingOption[]; };



export default function MenuDetailClient({ id }: { id: string }) {
  const { data, isLoading, isError } = useQuery<Menu>({
    queryKey: ["menu", id],
    queryFn: async () => {
      const res = await fetch(`/api/menus/${id}`);
      if (!res.ok) throw new Error("not found");
      return (await res.json()) as Menu;
    },
  });

  const [cart,setCart] = useState<CartItem[]>([]);
  const [selectedSpice, setSelectedSpice] = useState<{
  value: string;
  name: string;} | null>(null);

const [selectedToppings, setSelectedToppings] = useState<
  { name: string; price: number }[]>([]); // const [상태값, 상태변경함수] = useState(초기값);


  if (isLoading) return <p>로딩중...</p>;
  if (isError) return <p>없는 메뉴입니다.</p>;

  const spice = data.spice;
  const topping = data.toppingChoices ?? []; //있으면 배열 나열, 없으면 빈 배열

type CartItem = {
  id: string;
  name: string;
  price: number;

  selectedSpice?: {
    value: string;
    name: string;
  };

  selectedToppings: {
    name: string;
    price: number;
  }[];
};


const addToCart = () => {
  setCart(prev => [
    ...prev,
    {
      id: data.id,
      name: data.name,
      price: data.price,
      explan: data.explan,
      selectedSpice: selectedSpice ?? undefined,
      selectedToppings,
    },
  ]);
};

 console.log("selectedToppings:", selectedToppings);

return (
  <div>
    
    <h1>{data.name}</h1>
    <h2>{data.price.toLocaleString()}원</h2>
    <p>{data.explan}</p>

    {spice ? (
      <SpiceSelector options={spice.options} required={spice.required} onChange={setSelectedSpice} />
    ) : ( ""
    )}


{topping.length > 0 ? (
  topping.map((choice) => (
    <div key={choice.type} style={{ marginTop: 16 }}>
      <ToppingSelector
        type={choice.type}
        options={choice.options}
        required={choice.required}
        max={3}
        onChange={setSelectedToppings}
      />
    </div>
  ))
) : (
  ""
)}
<button style={{ marginTop: 16 }}
onClick={addToCart}> 장바구니 담기 </button>


<hr style={{ marginTop: 32 }} />

<h3>🛒 장바구니 (테스트)</h3>

{cart.length === 0 ? (
  <p>비어있음</p>
) : (
  <ul>
    {cart.map((item, index) => (
      <li key={index}>
        {item.name} - {item.price.toLocaleString()}원 
        맵기: {item.selectedSpice?.name ?? "선택 안 함"} / 
        토핑:{" "}
        {item.selectedToppings.length > 0
        ? item.selectedToppings.map(t => t.name).join(", ")
        : "없음"}
          </li>
    ))}
     
  </ul>
)}

  </div>
);

}
