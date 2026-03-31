"use client";
import { useEffect, useState } from "react";
import { ADDRESS_KEY } from "@/constants/storageKeys";
import Link from "next/link";

export default function AddressList() {
  type Address = {
    id: string;
    add: string;
    detailAdd?: string;
    password?: string;
    rider?: string;
    memo?: string;
    type?: string;
  };

  const [addressList, setAddressList] = useState<Address[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const savedAddress = localStorage.getItem(ADDRESS_KEY);
        if (savedAddress) setAddressList(JSON.parse(savedAddress));
      } catch {}
    })();
  }, []);

  const deleteAddress = (targetIndex: number) => {
    const nextAddressList = addressList.filter((_, index) => index !== targetIndex);
    setAddressList(nextAddressList);
    localStorage.setItem(ADDRESS_KEY, JSON.stringify(nextAddressList));
  };

  return (
    <section>
      <Link href={`/myPage/profile/address/edit`}> 주소 추가하기 </Link>
      {addressList.length === 0 && <p>주소를 새로 추가해주세요</p>}
      {addressList.map((address, index) => (
        <section key={`${address.id}-${address.add}-${index}`}>
          <button onClick={() => deleteAddress(index)}> X </button>
          <div>
            <p>{address.id}</p>
            <p>{address.add}</p>
            <p>{address.detailAdd}</p>
          </div>
        </section>
      ))}
    </section>
  );
}
