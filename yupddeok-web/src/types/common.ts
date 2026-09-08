export type FirestoreDate = string;

export type PriceSummary = {
  itemsTotal: number;
  deliveryFee: number;
  discount: number;
  finalTotal: number;
};

export type DocumentMeta = {
  isActive?: boolean;
  order?: number;
  createdAt?: FirestoreDate;
  updatedAt?: FirestoreDate;
};
