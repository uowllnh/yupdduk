import { CartState } from "./cart"
type Action =
| { type: "INIT_FROM_STORAGE"; payload: CartState }


const initial: CartState = {
    serviceMode: "DELIVERY",
    deliveryFee: 3000,
    minOrderPrice: 15000,
}