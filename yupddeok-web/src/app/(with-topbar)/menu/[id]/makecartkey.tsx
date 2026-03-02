type SpiceOption = { value: string; label: string };
type ToppingOption = {
  type: "A" | "B";
  required: boolean;
  options: { value: string; name: string; price: number; count: number }[];
};


export function makeCartKey(params:  {

    menuId: string;
    SpiceOption? : SpiceOption | null;
    ToppingOption? :  ToppingOption[];

}) {
    const spiceValue = params.SpiceOption?.value ?? "none";
     const toppingValues = (params.ToppingOption ?? [])
    .map((t) => t.options.value)
    .filter(Boolean)
    .sort(); // ⭐️ 중요: 순서 무시하고 동일 구성 판별

    return `${params.menuId}|spice:${spiceValue}|toppings:${toppingValues.join(",")}`;
}
