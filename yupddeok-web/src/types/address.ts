import type { DocumentMeta } from "./common";

export type AddressLabel = "우리집" | "직장" | "기타" | string;

export type AddressDocument = DocumentMeta & {
  id: string;
  userId?: string;
  label: AddressLabel;
  address: string;
  detailAddress?: string;
  entrancePassword?: string;
  riderRequest?: string;
  memo?: string;
  isDefault?: boolean;
};

export type SavedAddress = {
  id?: string;
  add: string;
  detailAdd?: string;
  password?: string;
  rider?: string;
  memo?: string;
  type?: string;
};
