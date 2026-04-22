"use client";
import { useEffect, useState } from "react";

type ToppingOption = { value: string; name: string; price: number };
type SelectedTopping = {
  value: string;
  name: string;
  price: number;
  count: number;
};

type Props = {
  type: "A" | "B";
  options: ToppingOption[];
  required: boolean;
  max: number;
  onChange: (type: "A" | "B", select: SelectedTopping[]) => void; // ✅ 변경
};

export default function ToppingSelector({
  options,
  type,
  max,
  onChange,
}: Props) {
  const safeOptions = options ?? [];
  const [selected, setSelected] = useState<SelectedTopping[]>([]);

  const changeCount = (value: string, diff: number) => {
    setSelected((prev) =>
      prev.map((t) =>
        t.value === value ? { ...t, count: Math.max(0, t.count + diff) } : t,
      ),
    );
  };

  useEffect(() => {
    onChange(type, selected);
  }, [selected, type, onChange]);

  const toggle = (opt: ToppingOption, checked: boolean) => {
    setSelected((prev) => {
      if (checked) {
        if (prev.length >= max) return prev; // ✅ 초과 방지
        return [...prev, { ...opt, count: 1 }]; // ✅ count 넣기
      }
      return prev.filter((t) => t.value !== opt.value);
    });
  };

  return (
    <section className="space-y-3">
      <h3 className="text-[17px] font-bold">
        {(type === "A" || type === "B") && (
          <>
            추가 토핑 (선택) ({selected.length}/{max})
          </>
        )}
      </h3>

      {safeOptions.map((opt) => {
        const current = selected.find((t) => t.value === opt.value);
        const isChecked = Boolean(current);
        const disableUnchecked = selected.length >= max && !isChecked;

        return (
          <div
            key={opt.value}
            className={
              isChecked
                ? "rounded-2xl border border-black bg-neutral-50 p-4 transition"
                : "rounded-2xl border border-gray-200 bg-white p-4 transition"
            }
            style={{ opacity: disableUnchecked ? 0.45 : 1 }}
          >
            <button
              type="button"
              disabled={disableUnchecked}
              onClick={() => toggle(opt, !isChecked)}
              className="flex w-full items-center justify-between gap-3 text-left"
            >
              <div className="min-w-0">
                <p className="font-bold text-black">{opt.name}</p>
                <p className="mt-1 text-sm text-gray-500">
                  + {opt.price.toLocaleString()}원
                </p>
              </div>

              <div
                className={
                  isChecked
                    ? "flex h-6 w-6 items-center justify-center rounded-full bg-black text-xs font-bold text-white"
                    : "flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white text-xs text-gray-400"
                }
              >
                {isChecked ? "✓" : "+"}
              </div>
            </button>

            {type === "B" && isChecked ? (
              <div className="mt-4 flex justify-end">
                <div className="flex items-center gap-3 rounded-full bg-white px-2 py-2 shadow-sm ring-1 ring-gray-200">
                  <button
                    type="button"
                    aria-label="-"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-base font-bold"
                    onClick={() => changeCount(opt.value, -1)}
                  >
                    -
                  </button>
                  <span className="min-w-5 text-center font-bold">
                    {current?.count ?? 0}
                  </span>
                  <button
                    type="button"
                    aria-label="+"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-base font-bold text-white"
                    onClick={() => changeCount(opt.value, +1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ) : null}

            {type !== "B" && isChecked ? (
              <p className="mt-3 text-sm text-gray-500">선택됨</p>
            ) : null}
          </div>
        );
      })}
    </section>
  );
}
