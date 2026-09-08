import type { PriceSummary } from "./common";

export type SelectedCartOption = {
  value: string;
  name: string;
  price?: number;
};

export type CartItemTopping = {
  value?: string;
  name: string;
  price: number;
  count: number;
};

// 장바구니 아이템 하나
export type CartItem = {
  key?: string;
  id: string;
  name: string;
  image?: string;
  price: number;
  count: number;

  selectedMenuOption?: SelectedCartOption;

  selectedSpice?: SelectedCartOption;

  selectedToppings: CartItemTopping[];

  toppingsPrice: number;
};

export type DeliveryInfo = {
  type: "DELIVERY" | "PICKUP";
  address?: string;
};

// 결제 전 "임시 주문서"
export type CartState = {
  items: CartItem[];

  delivery: DeliveryInfo;

  requestNote?: string; //주문 상세정보 기입란

  price: PriceSummary;
};
