"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

const menuLinks = [
  {
    href: "/store",
    label: "배달 주문",
    icon: "/icons/service/delivery_icon.png",
    accent: "bg-[var(--primary)] text-white",
  },
  {
    href: "/store",
    label: "방문 포장",
    icon: "/icons/service/pickup_icon.png",
    accent: "bg-[var(--primary-yellow)] text-[var(--text)]",
  },
  {
    href: "/store",
    label: "홀 주문",
    icon: "/icons/service/hall_icon.png",
    accent: "bg-[var(--primary-orange)] text-white",
  },
];

const ad = [
  { href: "/", label: "광고1", src: "/assets/banners/ad1.png" },
  { href: "/", label: "광고2", src: "/assets/banners/ad2.png" },
];

export async function loginAuth() {
  if (auth.currentUser) return true;

  const shouldLogin = window.confirm(
    "로그인이 필요합니다.\n로그인 하시겠습니까?",
  );

  if (!shouldLogin) return false;

  return true;
}

export default function Home() {
  const router = useRouter();

  const handleMenuClick = async (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    try {
      const canMove = await loginAuth();
      if (canMove) {
        if (auth.currentUser) {
          router.push(href);
          return;
        }

        router.push(`/login?next=${encodeURIComponent(href)}`);
      }
    } catch (error) {
      console.error(error);
      window.alert("로그인 페이지로 이동하지 못했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="m-5 flex flex-col gap-10">
      <div className="rounded-[15px]">
        <Image
          src={"/assets/banners/topAd.png"}
          alt={"상단 광고"}
          width={337}
          height={186}
        />{" "}
      </div>
      <section className="grid grid-cols-3 place-items-center gap-5">
        {menuLinks.map((item) => (
          <Link
            key={item.label}
            onClick={(event) => handleMenuClick(event, item.href)}
            href={item.href}
            className="flex h-32 w-24 items-center justify-center rounded-[15px] shadow-[0_0_6.2px_rgba(0,0,0,0.25)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={34}
                  height={34}
                />
              </div>
              <div>
                <p className="text-[16px]">{item.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <div className="flex w-full flex-col gap-10">
        {ad.map((item) => (
          <Link key={item.label} href={item.href}>
            <Image src={item.src} alt={item.label} width={337} height={160} />
          </Link>
        ))}{" "}
      </div>
    </div>
  );
}
