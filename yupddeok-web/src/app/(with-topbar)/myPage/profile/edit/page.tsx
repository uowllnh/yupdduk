"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADDRESS_KEY } from "@/constants/storageKeys";

export default function myPage() {
 const [address, setaddress] = useState<Address[]>([]);


    type Address = {
  id: string;
  add: string;
  detailAdd?:string;
  password?:number;
  memo?:string;
  type?:string;
};


    return(
    
    <section>

    <Link href={`/myPage/profile`}> 완료 </Link>
      <p> 이름 </p>
      <p> 이메일 </p>
      <p> 휴대폰 번호 </p>
   
    </section>

    );
}
