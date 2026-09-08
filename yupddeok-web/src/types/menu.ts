import type { DocumentMeta } from "./common";

export type MenuSection =
  | "MAIN"
  | "SET"
  | "DAKBAL"
  | "SIDE"
  | "DRINK"
  | "MEALKIT";

export type SpiceOption = {
  value: string;
  name: string;
  order?: number;
};

export type MenuOption = {
  value: string;
  name: string;
  price?: number;
};

export type SelectedTopping = {
  value: string;
  name: string;
  price: number;
  count: number;
};

export type ToppingOption = {
  value: string;
  name: string;
  price: number;
};

export type MenuOptionConfig = {
  required: boolean;
  options: MenuOption[];
};

export type SpiceConfig = {
  required: boolean;
  options: SpiceOption[];
};

export type ToppingChoice = {
  type: "A" | "B";
  required: boolean;
  options: ToppingOption[];
};

export type MenuSummary = {
  id: string;
  name: string;
  section: MenuSection;
  sectionLabel: string;
  price: number;
  image: string;
  description?: string;
};

export type MenuDetail = {
  id: string;
  name: string;
  price: number;
  image: string;
  explan?: string;
  menuOption?: MenuOptionConfig;
  spice?: SpiceConfig;
  toppingChoices: ToppingChoice[];
};

export type MenuDocument = MenuSummary &
  MenuDetail &
  DocumentMeta & {
    isSoldOut?: boolean;
  };
