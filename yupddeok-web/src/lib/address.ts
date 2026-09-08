import { ADDRESS_KEY } from "@/constants/storageKeys";
import { readStorage } from "@/lib/storage";
import type { SavedAddress } from "@/types/address";

export function readSavedAddresses() {
  return readStorage<SavedAddress[]>(ADDRESS_KEY, []);
}

export function getLatestAddressLabel() {
  const latestAddress = readSavedAddresses().at(-1);
  if (!latestAddress) return "";

  return [latestAddress.add, latestAddress.detailAdd].filter(Boolean).join(" ");
}
