"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SignupSucessPage() {
  const router = useRouter();
  return (
    <section className="mx-5 flex h-screen flex-col justify-center">
      <span className="my-10 flex justify-center">
        <Image
          src="/assets/signup/success.svg"
          alt="secess icon"
          width={50}
          height={50}
        />
      </span>
      <p className="mb-3 flex justify-center text-center text-2xl font-bold">
        {" "}
        회원가입 완료!{" "}
      </p>
      <p className="text-20 flex justify-center text-center">
        {" "}
        이제부터 엽기떡볶이와 <br />
        즐거운 시간 보내볼까요?{" "}
      </p>
      <section className="mt-30">
        <Image
          src="/assets/signup/character.png"
          alt="대표캐릭터"
          width={400}
          height={400}
        />
      </section>
      <button
        onClick={() => router.replace("/")}
        type="button"
        className="bg-primary h-14 w-full rounded-[12px] px-5 text-[16px] font-bold text-white disabled:opacity-60"
      >
        홈으로 돌아가기
      </button>
    </section>
  );
}
