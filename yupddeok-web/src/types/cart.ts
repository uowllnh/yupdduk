// 장바구니 아이템 하나
export type CartItem = {
  id: string;
  name: string;
  price: number;
  count: number;

  selectedSpice?: {
    value: string;
    name: string;
  };

  selectedToppings: {
    name: string;
    price: number;
    count: number;
  }[];

  toppingsPrice: number;
};

// 결제 전 "임시 주문서"
export type CartState = {
  items: CartItem[];

  delivery: {
    type: "DELIVERY" | "PICKUP";
    address?: string;
  };

  requestNote?: string; //주문 상세정보 기입란

  price: {
    itemsTotal: number;
    deliveryFee: number;
    discount: number;
    finalTotal: number;
  };
};
