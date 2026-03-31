"use client"
import Link from "next/link";
import { STORE_KEY } from "@/constants/storageKeys";
import { CART_KEY } from "@/constants/storageKeys";
import { useEffect, useState } from "react";

export default function Completed() {


    return(
    
    <section>
    <Link href={`/`}> 홈으로 </Link>
        <p>주문완료</p>
    </section>

    );
}
