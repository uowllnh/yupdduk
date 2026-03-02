"use client";

import Link from "next/link";


export default function Home() {

return(
<div>
  <Link href={`/store`}>
      <button> 배달 주문</button></Link>
  <Link href={`/store`}>
      <button> 방문 포장</button></Link>
  <Link href={`/store`}>
      <button> 홀 주문</button></Link>
  <Link href={`/myPage`}>
      <button> 마이페이지</button></Link>
</div>);
}
