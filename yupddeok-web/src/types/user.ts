import type { DocumentMeta } from "./common";

export type UserProfileDocument = DocumentMeta & {
  id: string;
  name: string;
  email: string;
  phone?: string;
  defaultAddressId?: string;
};
