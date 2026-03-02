"use client"
import Link from "next/link";

export default function myPage() {


    return(
    
    <section>
    <Link href={`/myPage/profile`}>
      <button> 프로필 정보 </button>
      </Link>
    <Link href={`/`}>
      <button> 주소 </button>
      </Link>
    <Link href={`/`}>
      <button> 장바구니 </button>
      </Link>
    <Link href={`/`}>
      <button> 즐겨찾기 </button>
      </Link>
    <Link href={`/`}>
      <button> 알림 </button>
      </Link>
    </section>

    );
}