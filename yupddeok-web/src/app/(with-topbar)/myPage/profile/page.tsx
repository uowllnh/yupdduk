"use client"
import Link from "next/link";

export default function myPage() {


    return(
    
    <section>
    <Link href={`/myPage/profile/edit`}>
      <button> 편집 </button>
      </Link>
      <p> 이름 </p>
      <p> 이메일 </p>
      <p> 휴대폰 번호 </p>
   
    </section>

    );
}