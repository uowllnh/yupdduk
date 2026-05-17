"use client";

import { MENU_CATEGORIES } from "@/constants/menu";
import type { MenuSection } from "@/types/menu";

type MenuCategoryTabsProps = {
  selectedSection: MenuSection | "";
  onChange: (section: MenuSection | "") => void;
};

export function MenuCategoryTabs({
  selectedSection,
  onChange,
}: MenuCategoryTabsProps) {
  return (
    <div className="-mx-5 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-2">
        {MENU_CATEGORIES.map((category) => {
          const isSelected = selectedSection === category.value;

          return (
            <button
              key={category.value || "ALL"}
              type="button"
              onClick={() => onChange(category.value)}
              className={
                isSelected
                  ? "h-10 rounded-full bg-black px-4 text-sm font-bold text-white"
                  : "h-10 rounded-full border border-gray-200 bg-white px-4 text-sm font-bold text-gray-500"
              }
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
