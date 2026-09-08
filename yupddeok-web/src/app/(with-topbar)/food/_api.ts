import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { MenuSummary } from "@/types/menu";

export async function getMenus() {
  const menusQuery = query(collection(db, "menus"), orderBy("order", "asc"));
  const snapshot = await getDocs(menusQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      section: data.section,
      sectionLabel: data.sectionLabel,
      price: data.price,
      image: data.image,
      description: data.description,
    } satisfies MenuSummary;
  });
}
