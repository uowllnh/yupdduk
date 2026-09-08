"use client";

import { useState } from "react";

type SpiceOption = {
  value: string;
  name: string;
  order?: number;
};

type Props = {
  options: SpiceOption[];
  required: boolean;
  allowLowSugar?: boolean;
  onChange: (opt: SpiceOption | null) => void;
};

export default function SpiceSelector({
  options,
  required,
  allowLowSugar = false,
  onChange,
}: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isLowSugar, setIsLowSugar] = useState(false);
  const sortedOptions = [...options].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );
  const selectedOption =
    options.find((opt) => opt.value === selectedValue) ?? null;
  const canUseLowSugar =
    allowLowSugar &&
    (selectedOption?.value === "original" || selectedOption?.value === "mild");

  const emitSelection = (opt: SpiceOption, lowSugar: boolean) => {
    const useLowSugar =
      allowLowSugar &&
      lowSugar &&
      (opt.value === "original" || opt.value === "mild");

    onChange({
      value: useLowSugar ? `${opt.value}_low` : opt.value,
      name: useLowSugar ? `${opt.name} 저당` : opt.name,
    });
  };

  return (
    <section>
      <section className="mt-4 flex justify-between">
        <h3 className="font-bold"> 맵기 선택 {required && "(필수)"}</h3>
        {allowLowSugar ? (
          <label className="flex h-6 items-center gap-2">
            <input
              type="checkbox"
              className="accent-primary h-4 w-4 disabled:accent-gray-300"
              checked={isLowSugar}
              disabled={!canUseLowSugar}
              onChange={(event) => {
                const nextChecked = event.target.checked;
                setIsLowSugar(nextChecked);

                if (selectedOption) {
                  emitSelection(selectedOption, nextChecked);
                }
              }}
            />
            저당 선택
          </label>
        ) : null}
      </section>

      <div className="mt-2 flex flex-wrap gap-2">
        {sortedOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setSelectedValue(opt.value);
              if (
                isLowSugar &&
                opt.value !== "original" &&
                opt.value !== "mild"
              ) {
                setIsLowSugar(false);
                onChange(opt);
                return;
              }

              emitSelection(opt, isLowSugar);
            }}
            className={
              selectedValue === opt.value
                ? "bg-primary flex h-14 w-14 items-center justify-center rounded-full p-2 text-center text-[11px] leading-tight text-white"
                : "flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 p-2 text-center text-[11px] leading-tight text-black"
            }
          >
            {opt.name}
          </button>
        ))}
      </div>
    </section>
  );
}
