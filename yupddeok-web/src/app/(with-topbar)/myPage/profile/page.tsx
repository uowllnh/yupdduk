"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function myPage() {


  return (
    <section>
      <Link href={`/myPage/profile/edit`}> 편집 </Link>
      <p> 이름 </p>
      <p> 이메일 </p>
      <p> 휴대폰 번호 </p>
    </section>
  );
}
