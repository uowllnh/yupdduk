"use client";
import { useEffect, useState } from "react";

type ToppingOption = { value: string; name: string; price: number};
type SelectedTopping = { value: string; name: string; price: number; count: number;};

type Props = {
  type: "A" | "B";
  options: ToppingOption[];
  required: boolean;
  max: number;
  onChange: (select: SelectedTopping[]) => void;
};

export default function ToppingSelector({ options, required, type, max, onChange }: Props) {
  const safeOptions = options ?? [];
  const [selected, setSelected] = useState<SelectedTopping[]>([]);
  const [countingNum, setCountingNum] = useState(1);

const changeCount = (value: string, diff: number) => {
  setSelected(prev =>
    prev.map(t =>
      t.value === value
        ? { ...t, count: Math.max(0, t.count + diff) }
        : t
    )
  );
};


const buttonCal = (cal:number) => {
    setCountingNum(prev =>
      prev + cal >= 0 ? prev + cal : prev
    );}

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const toggle = (opt: ToppingOption, checked: boolean) => {
    setSelected(prev => {
      if (checked) {
        if (prev.length >= max) return prev; // ✅ 초과 방지
        return [...prev, { ...opt, count: 1 }]; // ✅ count 넣기
      }
      return prev.filter(t => t.value !== opt.value);
    });
  };

  return (
    <section>
      <h3>
        {(type === "A" || type === "B") && (
          <>
            추가 토핑 (선택) ({selected.length}/{max})
          </>
        )}
      </h3>


      {safeOptions.map((opt) => {
        const isChecked = selected.some(t => t.value === opt.value);
        const disableUnchecked = selected.length >= max && !isChecked;
      

        return (
          <label className="flex items-center gap-2" key={opt.value} style={{ display: "block", opacity: disableUnchecked ? 0.5 : 1 }}>
            <input
              type="checkbox"
              checked={isChecked}
              disabled={disableUnchecked}
              onChange={(e) => {toggle(opt, e.target.checked);
              }}
            /> 
            

           
            {opt.name} - {opt.price}원  
             {type === "B" && isChecked &&
              <div>
                <button
                aria-label="-"
                className="w-10 h-8 rounded-full border text-center"
                onClick={() => changeCount(opt.value, -1)}> - </button>
                <span>{selected.find(t => t.value === opt.value)?.count ?? 0}</span>
                <button
                aria-label="+"
                className="w-8 h-8 rounded-full border text-center"
                onClick={() => changeCount(opt.value, +1)}> + </button>
                </div>

                        }
          </label>
        )
      })}
    </section>
  );
};
