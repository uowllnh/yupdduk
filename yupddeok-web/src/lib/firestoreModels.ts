import type { AddressDocument, SavedAddress } from "@/types/address";
import type { OrderDocument, OrderRecord } from "@/types/order";

export function createDocumentId(prefix: string) {
  return `${prefix}_${Date.now()}`;
}

export function toOrderDocument(order: OrderRecord): OrderDocument {
  const now = new Date().toISOString();

  return {
    ...order,
    status: order.status ?? "PLACED",
    createdAt: order.createdAt,
    updatedAt: order.updatedAt ?? now,
  };
}

export function toAddressDocument(
  address: SavedAddress,
  options: {
    id?: string;
    userId?: string;
    isDefault?: boolean;
  } = {},
): AddressDocument {
  const now = new Date().toISOString();

  return {
    id: options.id ?? createDocumentId("address"),
    userId: options.userId,
    label: address.id ?? address.type ?? "기타",
    address: address.add,
    detailAddress: address.detailAdd,
    entrancePassword: address.password,
    riderRequest: address.rider,
    memo: address.memo,
    isDefault: options.isDefault ?? false,
    isActive: true,
    createdAt: now,
    updatedAt: now,
  };
}
