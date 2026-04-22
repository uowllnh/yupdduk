"use client";
import { useEffect, useState } from "react";
import { ADDRESS_KEY } from "@/constants/storageKeys";
import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const menuItems = [
    { href: "/orders", label: "주문 내역" },
    { href: "/support", label: "고객센터" },
    { href: "/notice", label: "공지사항" },
    { href: "/myPage", label: "마이페이지" },
  ];

  type Address = {
      add: string;
      detailAdd?: string;
    };
  
    const [addressName, setaddressName] = useState<string>("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
      <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-11 w-11 justify-center items-center bg-gray-200 rounded-full">
              <div className="flex justify-center items-center">
              <Image src={"/menu_icon.png"} alt={"전체 메뉴"} width={18} height={16}/>
            </div>
          </button>
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
      {isMenuOpen ? (
        <div className="fixed inset-0 z-30 bg-black/35">
          <button
            type="button"
            className="absolute inset-0"
            aria-label="전체 메뉴 닫기"
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[288px] bg-white px-6 pb-8 pt-16 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-[22px] font-bold">전체 메뉴</p>
              <button
                type="button"
                className="text-sm font-semibold text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                닫기
              </button>
            </div>

            <div className="mt-8 space-y-3">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4 text-[17px] font-bold text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                  <span className="text-lg text-gray-300">›</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      {children}
    </section>
  );
}
