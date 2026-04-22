"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button onClick={() => router.back()}>
      <Image src="/back-bt.png" alt="뒤로가기" width={45} height={45} />
    </button>
  );
}
