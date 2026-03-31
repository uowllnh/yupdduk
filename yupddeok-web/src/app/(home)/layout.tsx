"use client";
import { useEffect, useState } from "react";
import { ADDRESS_KEY } from "@/constants/storageKeys";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {

  type Address = {
      add: string;
      detailAdd?: string;
    };
  
    const [addressName, setaddressName] = useState<string>("");
  
    useEffect(() => {
      (async () => {
        try {
          const savedAddress = localStorage.getItem(ADDRESS_KEY);
          if (!savedAddress) return;
  
          const parsedAddressList: Address[] = JSON.parse(savedAddress);
          const latestAddress = parsedAddressList.at(-1);
          if (!latestAddress) return;
  
          const formattedAddress = [latestAddress.add, latestAddress.detailAdd]
            .filter(Boolean)
            .join(" ");
  
          setaddressName(formattedAddress);
        } catch {}
      })();
    }, []);

  return (
    <section>
      <div className="m-5 mt-15 mb-10 flex items-start gap-3">
      <Link
            href={"/order"}
            className="flex h-11 w-11 justify-center items-center bg-gray-200 rounded-full">
          
              <div className="flex justify-center items-center">
              <Image src={"/menu_icon.png"} alt={"메뉴"} width={18} height={16}/>
            </div>
          </Link>
      <div className="flex flex-1 justify-between">
      <div>
       <p className="text-[14px] text-[var(--primary)] font-bold">배달주소</p>
        {addressName ? addressName : <p className="text-[16px]">주소를 추가해주세요</p>}
        </div>
         <Link
            href={"/order"}
            className="flex h-11 w-11 justify-center items-center bg-black rounded-full">
          
              <div className="flex justify-center items-center">
              <Image src={"/cart_Icon.png"} alt={"장바구니"} width={20} height={20}/>
            </div>
          </Link>
          </div>
          </div>
      {children}
    </section>
  );
}
