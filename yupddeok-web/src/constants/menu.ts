import type { MenuSection } from "@/types/menu";

export type MenuCategory = {
  value: MenuSection | "";
  label: string;
};

export const MENU_CATEGORIES: MenuCategory[] = [
  { value: "", label: "전체" },
  { value: "MAIN", label: "메인" },
  { value: "SET", label: "세트" },
  { value: "DAKBAL", label: "닭발" },
  { value: "MEALKIT", label: "밀키트" },
  { value: "SIDE", label: "사이드" },
  { value: "DRINK", label: "음료" },
];
