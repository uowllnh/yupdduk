import { create } from "zustand";
import {
  persist,
  type PersistStorage,
  type StorageValue,
} from "zustand/middleware";
import { CART_KEY } from "@/constants/storageKeys";
import {
  addCartItem,
  clearCart,
  emptyCartState,
  normalizeCartState,
  removeCartItem,
  updateCartItemQuantity,
} from "@/lib/cart";
import type { CartItem, CartState } from "@/types/cart";

type PersistedCartStore = {
  cartState: CartState;
};

type CartStore = PersistedCartStore & {
  addItem: (item: CartItem, quantity: number) => void;
  updateItemQuantity: (itemIndex: number, diff: number) => void;
  removeItem: (itemIndex: number) => void;
  clear: () => void;
  resetAfterOrder: () => void;
};

const cartStorage: PersistStorage<PersistedCartStore> = {
  getItem: (name) => {
    const rawValue = localStorage.getItem(name);
    if (!rawValue) return null;

    try {
      const parsed = JSON.parse(rawValue) as
        | StorageValue<PersistedCartStore>
        | CartState;

      if ("state" in parsed) {
        return {
          ...parsed,
          state: {
            cartState: normalizeCartState(parsed.state.cartState),
          },
        };
      }

      // 기존 localStorage 장바구니 데이터를 Zustand 형식으로 마이그레이션한다.
      return {
        state: { cartState: normalizeCartState(parsed) },
        version: 0,
      };
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartState: emptyCartState,
      addItem: (item, quantity) => {
        set((state) => ({
          cartState: addCartItem(state.cartState, item, quantity),
        }));
      },
      updateItemQuantity: (itemIndex, diff) => {
        set((state) => ({
          cartState: updateCartItemQuantity(state.cartState, itemIndex, diff),
        }));
      },
      removeItem: (itemIndex) => {
        set((state) => ({
          cartState: removeCartItem(state.cartState, itemIndex),
        }));
      },
      clear: () => {
        set((state) => ({ cartState: clearCart(state.cartState) }));
      },
      resetAfterOrder: () => {
        set((state) => ({
          cartState: {
            ...emptyCartState,
            delivery: state.cartState.delivery,
          },
        }));
      },
    }),
    {
      name: CART_KEY,
      storage: cartStorage,
      partialize: (state) => ({ cartState: state.cartState }),
      skipHydration: true,
    },
  ),
);
