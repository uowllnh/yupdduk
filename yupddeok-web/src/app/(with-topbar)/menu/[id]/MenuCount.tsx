// app/cart/cartlist/page.tsx
"use client"
import { useState } from "react";

export default function MenuCount() {

const [countingNum, setCountingNum] = useState(0);

const buttonCal = (cal:number) => {
    setCountingNum(prev =>
      prev + cal >= 0 ? prev + cal : prev
    );

};

  return (  
    

    <div>
    <button
    aria-label="-"
    className="w-10 h-8 rounded-full border text-center"
    onClick={() => buttonCal(-1)}
    > - </button>
    {countingNum}
    <button
    aria-label="+"
    className="w-8 h-8 rounded-full border text-center"
    onClick={() => buttonCal(+1)}> + </button>
    </div>)

  
}
