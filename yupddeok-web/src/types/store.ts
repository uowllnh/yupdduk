import type { DocumentMeta } from "./common";

export type StoreSummary = {
  id: string;
  name: string;
  distance: string;
  open: boolean;
  pee: number;
  order?: number;
};

export type StoreDocument = StoreSummary &
  DocumentMeta & {
    phone?: string;
    address?: string;
  };
