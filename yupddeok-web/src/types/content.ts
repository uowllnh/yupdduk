import type { DocumentMeta } from "./common";

export type NoticeDocument = DocumentMeta & {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
};

export type SupportInfoDocument = DocumentMeta & {
  id: string;
  title: string;
  phone: string;
  businessHours: string;
  lunchHours?: string;
};
