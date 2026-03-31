"use client"
import Link from "next/link";

export default function myPage() {


    return(
    
    <section>
    <Link href={`/myPage/profile`}> 프로필 정보 </Link>
    <Link href={`/myPage/profile/address`}> 주소 </Link>
    <Link href={`/`}> 장바구니 </Link>
    <Link href={`/`}> 즐겨찾기 </Link>
    <Link href={`/`}> 알림 </Link>
    </section>

    );
}
