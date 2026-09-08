import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MenuDetail } from "@/types/menu";

export async function getMenuDetail(id: string) {
  const snapshot = await getDoc(doc(db, "menus", id));

  if (!snapshot.exists()) {
    throw new Error("menu-not-found");
  }

  const data = snapshot.data();

  return {
    id: snapshot.id,
    name: data.name,
    price: data.price,
    image: data.image,
    explan: data.explan,
    menuOption: data.menuOption,
    spice: data.spice,
    toppingChoices: data.toppingChoices ?? [],
  } satisfies MenuDetail;
}
