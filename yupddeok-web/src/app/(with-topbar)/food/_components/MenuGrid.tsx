import { MenuCard } from "./MenuCard";
import type { MenuSummary } from "@/types/menu";

type MenuGridProps = {
  menus: MenuSummary[];
};

export function MenuGrid({ menus }: MenuGridProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {menus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </div>
  );
}
