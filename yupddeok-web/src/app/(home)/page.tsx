"use client";

import Image from "next/image";
import Link from "next/link";

const menuLinks = [
  {
    href: "/store",
    label: "배달 주문",
    icon: "/delivery_icon.png",
    accent: "bg-[var(--primary)] text-white",
  },
  {
    href: "/store",
    label: "방문 포장",
    icon: "/pickup_icon.png",
    accent: "bg-[var(--primary-yellow)] text-[var(--text)]",
  },
  {
    href: "/store",
    label: "홀 주문",
    icon: "/hall_icon.png",
    accent: "bg-[var(--primary-orange)] text-white",
  },
 
];

const ad = [
  {href: "/",
    label: "광고1",
    src:"/ad1.png"
  },
   {href: "/",
    label: "광고2",
    src:"/ad2.png"
  }
]


export default function Home() {
  return (
    <div className="flex flex-col m-5 gap-10">
       <div className="rounded-[15px]">
        <Image src={"/topAd.png"} alt={"상단 광고"} width={337} height={186}/> </div>
      <section className="grid grid-cols-3 gap-5  place-items-center">
        {menuLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex h-32 w-24 justify-center items-center rounded-[15px] shadow-[0_0_6.2px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5">
            <div className="flex flex-col items-center gap-3">
              <div className="flex justify-center items-center">
              <Image src={item.icon} alt={item.label} width={34} height={34}/>
            </div>
            <div>
              <p className="text-[16px]">{item.label}</p>
            </div>
            </div>
          </Link>
        ))}
      </section>
       <div
            className="flex flex-col w-full gap-10">
        {ad.map((item) => (
          <Link
          key={item.label}
          href={item.href}>
            
              <Image src={item.src} alt={item.label} width={337} height={160}/>
            
          </Link>
      
        ))}    </div>
      </div>
  );
}
