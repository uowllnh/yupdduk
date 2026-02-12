// app/cart/cartlist/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CART_KEY } from "@/constants/storageKeys";
import type { CartState, CartItem } from "@/types/cart";


export default function CartListPage() {
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

    <Link href="/">
      <button>홈으로 가기</button>
    </Link>
    
    

<h3>🛒 장바구니 </h3>

<button
  type="button"
  onClick={() =>
    setCartState(prev => ({
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
  장바구니 비우기
</button>



{cartState.items.length === 0 ? (
  <p>비어있음</p>
) : (
  <ul>
    {cartState.items.map((item, index) => (
      <li key={index}>
        {item.name} - {item.price.toLocaleString()}원 
        {item.selectedSpice
              ? item.selectedSpice?.name : ""} 
              
               
                <>
              
                {item.selectedToppings.length > 0
              &&   "/ 토핑: "  + item.selectedToppings 
                  .map(t =>  `${t.name}x${t.count} `)
                  .join(", ")}
                </>
               
              X {item.count}
          </li>
    ))}
     
  </ul>
)}
{cartState.price.itemsTotal}


   <Link href="/">
      <button>메뉴 추가</button>
    </Link>


 <Link href="/order">
      <button>주문하기</button>
    </Link>

  </div>
);
  
}