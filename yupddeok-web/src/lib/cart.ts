import type { CartItem, CartState } from "@/types/cart";
import type { SelectedTopping } from "@/types/menu";

export const emptyCartState: CartState = {
  items: [],
  delivery: { type: "DELIVERY" },
  requestNote: "",
  price: { itemsTotal: 0, deliveryFee: 0, discount: 0, finalTotal: 0 },
};

export function getSelectedToppingsPrice(toppings: SelectedTopping[]) {
  return toppings.reduce((sum, topping) => sum + topping.price * topping.count, 0);
}

export function getCartItemUnitPrice(item: CartItem) {
  const toppingsTotal = (item.selectedToppings ?? []).reduce(
    (sum, topping) => sum + topping.price * topping.count,
    0,
  );

  return item.price + toppingsTotal;
}

export function buildCartItemKey(params: {
  menuId: string;
  menuOptionValue?: string | null;
  spiceValue?: string | null;
  toppings: SelectedTopping[];
}) {
  const toppingsKey = params.toppings
    .map((topping) => `${topping.value}:${topping.count}`)
    .sort()
    .join(",");

  return [
    params.menuId,
    `menuOption:${params.menuOptionValue ?? "none"}`,
    `spice:${params.spiceValue ?? "none"}`,
    `toppings:${toppingsKey}`,
  ].join("|");
}

export function createOptionSummary(item: Pick<
  CartItem,
  "selectedMenuOption" | "selectedSpice" | "selectedToppings"
>) {
  return [
    item.selectedMenuOption ? `메뉴 ${item.selectedMenuOption.name}` : null,
    item.selectedSpice ? `맵기 ${item.selectedSpice.name}` : null,
    item.selectedToppings.length > 0
      ? `토핑 ${item.selectedToppings
          .map((topping) => `${topping.name} x${topping.count}`)
          .join(", ")}`
      : null,
  ]
    .filter(Boolean)
    .join(" / ");
}

export function addCartItem(
  state: CartState,
  item: CartItem,
  quantity: number,
): CartState {
  const existingIndex = state.items.findIndex((currentItem) => currentItem.key === item.key);
  const unitTotal = getCartItemUnitPrice(item);

  if (existingIndex >= 0) {
    const nextItems = [...state.items];
    nextItems[existingIndex] = {
      ...nextItems[existingIndex],
      count: nextItems[existingIndex].count + quantity,
    };

    return {
      ...state,
      items: nextItems,
      price: {
        ...state.price,
        itemsTotal: state.price.itemsTotal + unitTotal * quantity,
        finalTotal: state.price.finalTotal + unitTotal * quantity,
      },
    };
  }

  return {
    ...state,
    items: [...state.items, { ...item, count: quantity }],
    price: {
      ...state.price,
      itemsTotal: state.price.itemsTotal + unitTotal * quantity,
      finalTotal: state.price.finalTotal + unitTotal * quantity,
    },
  };
}

export function updateCartItemQuantity(
  state: CartState,
  itemIndex: number,
  diff: number,
) {
  const currentItem = state.items[itemIndex];
  if (!currentItem) return state;

  const nextCount = currentItem.count + diff;
  if (nextCount < 1) return state;

  const nextItems = [...state.items];
  nextItems[itemIndex] = {
    ...currentItem,
    count: nextCount,
  };

  const unitTotal = getCartItemUnitPrice(currentItem);

  return {
    ...state,
    items: nextItems,
    price: {
      ...state.price,
      itemsTotal: state.price.itemsTotal + unitTotal * diff,
      finalTotal: state.price.finalTotal + unitTotal * diff,
    },
  };
}

export function removeCartItem(state: CartState, itemIndex: number) {
  const removedItem = state.items[itemIndex];
  if (!removedItem) return state;

  const removedTotal = getCartItemUnitPrice(removedItem) * removedItem.count;

  return {
    ...state,
    items: state.items.filter((_, index) => index !== itemIndex),
    price: {
      ...state.price,
      itemsTotal: Math.max(0, state.price.itemsTotal - removedTotal),
      finalTotal: Math.max(0, state.price.finalTotal - removedTotal),
    },
  };
}

export function clearCart(state: CartState): CartState {
  return {
    ...state,
    items: [],
    price: {
      itemsTotal: 0,
      deliveryFee: state.price.deliveryFee,
      discount: state.price.discount,
      finalTotal: 0,
    },
  };
}
