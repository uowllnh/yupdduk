export type Money = number;

export type MenuItem = {
  id: string;
  name: string;
  basePrice: Money;
  isSoldOut?: boolean;
  tags?: string[]; // 국물/로제/마라 등
};


export type CartState = {
//   items: CartItem[];
  serviceMode: ServiceMode;
  deliveryFee: Money; // TAKEOUT이면 0
  minOrderPrice?: Money; // 배달 최소주문금액
};

export type ServiceMode = "DELIVERY" | "TAKEOUT";