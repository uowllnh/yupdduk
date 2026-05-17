import { ADDRESS_KEY } from "@/constants/storageKeys";
import { readStorage } from "@/lib/storage";

export type SavedAddress = {
  id?: string;
  add: string;
  detailAdd?: string;
};

export function readSavedAddresses() {
  return readStorage<SavedAddress[]>(ADDRESS_KEY, []);
}

export function getLatestAddressLabel() {
  const latestAddress = readSavedAddresses().at(-1);
  if (!latestAddress) return "";

  return [latestAddress.add, latestAddress.detailAdd].filter(Boolean).join(" ");
}
