"use client";

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
  return (
    <section>
      <h3>맵기 선택 {required && "(필수)"}</h3>

      {options.map((opt) => (
        <label key={opt.value} style={{ display: "block" }}>
          <input type="radio" name="spice" onChange={() => onChange(opt)}  />
          {opt.name}
        </label>
      ))}
    </section>
  );
}
