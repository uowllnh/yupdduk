"use client";

import { useState } from "react";

type SpiceOption = {
  value: string;
  name: string;
};

type Props = {
  options: SpiceOption[];
  required: boolean;
  onChange: (opt: SpiceOption | null) => void;
};

export default function SpiceSelector({ options, required, onChange }: Props) {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isLowSugar, setIsLowSugar] = useState(false);
  const selectedOption =
    options.find((opt) => opt.value === selectedValue) ?? null;
  const canUseLowSugar =
    selectedOption?.value === "original" || selectedOption?.value === "mild";

  const emitSelection = (opt: SpiceOption, lowSugar: boolean) => {
    const useLowSugar =
      lowSugar && (opt.value === "original" || opt.value === "mild");

    onChange({
      value: useLowSugar ? `${opt.value}_low` : opt.value,
      name: useLowSugar ? `${opt.name} 저당` : opt.name,
    });
  };

  return (
    <section>
      <h3>맵기 선택 {required && "(필수)"}</h3>

      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              setSelectedValue(opt.value);
              if (isLowSugar && opt.value !== "original" && opt.value !== "mild") {
                setIsLowSugar(false);
                onChange(opt);
                return;
              }

              emitSelection(opt, isLowSugar);
            }}
            className={
              selectedValue === opt.value
                ? "flex h-20 w-20 items-center justify-center rounded-full border border-black bg-black p-2 text-center text-sm font-bold leading-tight text-white"
                : "flex h-20 w-20 items-center justify-center rounded-full border border-gray-300 bg-white p-2 text-center text-sm font-bold leading-tight text-black"
            }
          >
            {opt.name}
          </button>
        ))}
      </div>

      <label className="mt-3 flex items-center gap-2">
        <input
          type="checkbox"
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
    </section>
  );
}
