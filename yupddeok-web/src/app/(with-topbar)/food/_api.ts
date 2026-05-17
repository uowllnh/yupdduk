import type { MenuSummary } from "@/types/menu";

export async function getMenus() {
  const response = await fetch("/api/menus");

  if (!response.ok) {
    throw new Error("메뉴 목록을 불러오지 못했습니다.");
  }

  return (await response.json()) as MenuSummary[];
}
