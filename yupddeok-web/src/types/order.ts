import type { CartItem } from "./cart";
import type { FirestoreDate, PriceSummary } from "./common";

export type OrderChannel = "DELIVERY" | "PICKUP" | "HALL";
export type OrderStatus =
  | "PLACED"
  | "ACCEPTED"
  | "COOKING"
  | "DELIVERING"
  | "COMPLETED"
  | "CANCELED";

export type OrderRecord = {
  id: string;
  userId?: string;
  storeId?: string;
  storeName: string;
  channel: OrderChannel;
  status?: OrderStatus;
  paymentMethod: string;
  requestNote?: string;
  deliveryRequest?: string;
  safePhone?: boolean;
  skipCutlery?: boolean;
  items: CartItem[];
  price: PriceSummary;
  createdAt: FirestoreDate;
  updatedAt?: FirestoreDate;
};

export type OrderDocument = Required<
  Pick<
    OrderRecord,
    | "id"
    | "storeName"
    | "channel"
    | "status"
    | "paymentMethod"
    | "items"
    | "price"
    | "createdAt"
    | "updatedAt"
  >
> &
  Pick<
    OrderRecord,
    | "userId"
    | "storeId"
    | "requestNote"
    | "deliveryRequest"
    | "safePhone"
    | "skipCutlery"
  >;
