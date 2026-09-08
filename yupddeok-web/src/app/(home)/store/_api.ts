import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { STORES } from "@/mocks/stores";
import type { StoreSummary } from "@/types/store";

export async function getStores() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
    return STORES.map((store, order) => ({
      ...store,
      order,
    })) satisfies StoreSummary[];
  }

  const storesQuery = query(collection(db, "stores"), orderBy("order", "asc"));
  const snapshot = await getDocs(storesQuery);

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      distance: data.distance,
      open: data.open,
      pee: data.pee,
      order: data.order,
    } satisfies StoreSummary;
  });
}
