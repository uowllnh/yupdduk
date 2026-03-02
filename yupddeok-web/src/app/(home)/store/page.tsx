"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { STORES } from "@/mocks/stores";
import { STORE_KEY } from "@/constants/storageKeys";

export default function Store() {
   

    const saveStore = (name: string) => {
        try {
    localStorage.setItem(STORE_KEY, name);
  } catch {}
    };
    
const handlePick = (name: string) => {
    saveStore(name);

  };

    

 return (
    <section>
       <Link href={`/`}>
      <button> 뒤로가기</button></Link>
      <ul>
        {STORES.map((store) => (
          <li key={store.id}>
            
             <Link href={`/food`}>
             <button
             onClick={()=> handlePick(store.name)}> {store.name}</button>
            </Link>
            
           


          </li>
        ))}
      </ul>
      
    </section>
  );
}