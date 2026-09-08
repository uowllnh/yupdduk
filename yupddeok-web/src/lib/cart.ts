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
    (sum, topping) =>
      sum +
      (Number.isFinite(topping.price) ? topping.price : 0) *
        (Number.isFinite(topping.count) ? topping.count : 0),
    0,
  );

  return (Number.isFinite(item.price) ? item.price : 0) + toppingsTotal;
}

function calculateItemsTotal(items: CartItem[]) {
  return items.reduce(
    (sum, item) =>
      sum +
      getCartItemUnitPrice(item) *
        (Number.isFinite(item.count) ? item.count : 0),
    0,
  );
}

function withRecalculatedPrice(state: CartState, items: CartItem[]): CartState {
  const itemsTotal = calculateItemsTotal(items);

  return {
    ...state,
    items,
    price: {
      itemsTotal,
      deliveryFee: Number.isFinite(state.price?.deliveryFee)
        ? state.price.deliveryFee
        : 0,
      discount: Number.isFinite(state.price?.discount)
        ? state.price.discount
        : 0,
      finalTotal: itemsTotal,
    },
  };
}

export function normalizeCartState(value: unknown): CartState {
  if (!value || typeof value !== "object") return emptyCartState;

  const state = value as Partial<CartState>;
  const items = Array.isArray(state.items) ? (state.items as CartItem[]) : [];

  return withRecalculatedPrice(
    {
      ...emptyCartState,
      ...state,
      delivery:
        state.delivery?.type === "PICKUP" || state.delivery?.type === "DELIVERY"
          ? state.delivery
          : emptyCartState.delivery,
      price: {
        ...emptyCartState.price,
        ...state.price,
      },
    },
    items,
  );
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

  if (existingIndex >= 0) {
    const nextItems = [...state.items];
    nextItems[existingIndex] = {
      ...nextItems[existingIndex],
      count: nextItems[existingIndex].count + quantity,
    };

    return withRecalculatedPrice(state, nextItems);
  }

  return withRecalculatedPrice(state, [
    ...state.items,
    { ...item, count: quantity },
  ]);
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

  return withRecalculatedPrice(state, nextItems);
}

export function removeCartItem(state: CartState, itemIndex: number) {
  const removedItem = state.items[itemIndex];
  if (!removedItem) return state;

  return withRecalculatedPrice(
    state,
    state.items.filter((_, index) => index !== itemIndex),
  );
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
