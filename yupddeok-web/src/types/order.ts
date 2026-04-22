import type { CartItem } from "./cart";

export type OrderChannel = "DELIVERY" | "PICKUP" | "HALL";

export type OrderRecord = {
  id: string;
  createdAt: string;
  storeName: string;
  channel: OrderChannel;
  paymentMethod: string;
  requestNote?: string;
  deliveryRequest?: string;
  safePhone?: boolean;
  skipCutlery?: boolean;
  items: CartItem[];
  price: {
    itemsTotal: number;
    deliveryFee: number;
    discount: number;
    finalTotal: number;
  };
};
