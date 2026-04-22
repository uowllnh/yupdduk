import { delay, http, HttpResponse } from "msw";

type MenuSection = "MAIN" | "SET" | "DAKBAL"| "SIDE" | "DRINK" | "MEALKIT";
type SpiceType = "A" | "B";
type ToppingType = "A" | "B";

type MenuSummary = {
  id: string;
  name: string;
  section: MenuSection;
  sectionLabel: string;
  price: number;
  image: string;
  description?: string;
};

type SpiceOption = {
  value: string;
  name: string;
};

type ToppingOption = {
  value: string;
  name: string;
  price: number;
};

type SpiceConfig = {
  required: boolean;
  options: readonly SpiceOption[];
};

type MenuOption = {
  value: string;
  name: string;
};

type MenuOptionConfig = {
  required: boolean;
  options: readonly MenuOption[];
};

type ToppingConfig = {
  required: boolean;
  options: readonly ToppingOption[];
};

type MenuConfig = {
  section: MenuSection;
  spiceType?: SpiceType;
  toppingTypes?: readonly ToppingType[];
};

type MenuSeed = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  config: MenuConfig;
};

const SECTION_LABELS: Record<MenuSection, string> = {
  MAIN: "메인",
  SET: "세트",
  DAKBAL: "닭발",
  SIDE: "사이드",
  DRINK: "음료",
  MEALKIT: "밀키트",
};





const SPICE_OPTIONS: Record<SpiceType, SpiceConfig> = {
  A: {
    required: true,
    options: [
      { value: "hot", name: "매운맛" },
      { value: "original", name: "오리지널" },
      { value: "begin", name: "초보맛" },
      { value: "mild", name: "착한맛" },
    ],
  },
  B: {
    required: true,
    options: [
      { value: "original", name: "오리지널" },
      { value: "mild", name: "착한맛" },
    ],
  },
};

const TOPPING_OPTIONS: Record<ToppingType, ToppingConfig> = {
  A: {
    required: false,
    options: [
      { value: "ttok_more", name: "떡 추가", price: 1000 },
      { value: "fish_more", name: "어묵 추가", price: 1000 },
      { value: "cabbage", name: "양배추", price: 1000 },
      { value: "green_onion", name: "대파", price: 1000 },
      { value: "beef", name: "우삼겹", price: 3000 },
      { value: "fried_tofu", name: "통유부", price: 1000 },
      { value: "cheese_dumpling", name: "퐁당치즈만두", price: 2000 },
      { value: "glass_noodle", name: "중국당면", price: 2500 },
      { value: "bunmoja", name: "분모자", price: 2500 },
    ],
  },
  B: {
    required: false,
    options: [
      { value: "mozza", name: "모짜치즈", price: 3000 },
      { value: "corn", name: "콘마요", price: 2500 },
      { value: "ham", name: "햄", price: 1000 },
      { value: "bacon", name: "베이컨", price: 3000 },
      { value: "egg", name: "계란", price: 1500 },
      { value: "quail_egg", name: "메추리알", price: 1000 },
      { value: "udon_noodle", name: "우동사리", price: 2000 },
      { value: "glass_noodle", name: "당면사리", price: 2000 },
    ],
  },
};

const YUPDDEOK_MENU_OPTIONS: MenuOptionConfig = {
  required: true,
  options: [
    { value: "tteokbokki", name: "떡볶이" },
    { value: "odeng", name: "오뎅" },
    { value: "half_half", name: "반반" },
    { value: "bunmoja", name: "분모자" },
  ],
};

const createMenu = ({ config, description, ...menu }: MenuSeed): MenuSummary & {
  config: MenuConfig;
  explan?: string;
} => ({
  ...menu,

  section: config.section,
  sectionLabel: SECTION_LABELS[config.section],
  description,
  explan: description,
  config,
});

const toMenuSummary = (item: ReturnType<typeof createMenu>) => {
  const { config, ...menu } = item;
  void config;
  return menu;
};

const menuSeeds: MenuSeed[] = [
  {
    id: "yupddeok",
    name: "엽기메뉴",
    price: 14000,
    image: "/yupddeok.png",
    config: { section: "MAIN", spiceType: "A", toppingTypes: ["A", "B"] },
  },
  
  {
    id: "rose",
    name: "로제메뉴",
    price: 16000,
    image: "/rose.png",
    config: { section: "MAIN", spiceType: "B", toppingTypes: ["B"] },
  },
  
  {
    id: "mara",
    name: "마라떡볶이",
    price: 16000,
    image: "/mara.png",
    description: "떡볶이만 선택 가능, 향신료(산초, 잠두 등) 포함",
    config: { section: "MAIN", spiceType: "B", toppingTypes: ["A", "B"] },
  },
  {
    id: "mararose",
    name: "마라로제떡볶이",
    price: 18000,
    image: "/mararose.png",
    description: "떡볶이만 선택 가능, 향신료(산초, 잠두 등) 포함",
    config: { section: "MAIN", spiceType: "B", toppingTypes: ["A", "B"] },
  },
  {
    id: "yupdak",
    name: "엽기닭볶음탕",
    price: 24000,
    image: "/yupdak.png",
    config: { section: "MAIN", spiceType: "A", toppingTypes: ["A", "B"] },
  },
  {
    id: "set-001",
    name: "실속세트",
    price: 17500,
    image: "/set-001.png",
    description: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1)",
    config: { section: "SET" },
  },
  {
    id: "set-002",
    name: "베스트세트",
    price: 20000,
    image: "/set-002.png",
    description: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1) + 중국당면",
    config: { section: "SET" },
  },
  {
    id: "set-003",
    name: "스페셜세트",
    price: 25000,
    image: "/set-003.png",
    description: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1) + 중국당면 + 엽봉(5개)",
    config: { section: "SET" },
  },
  {
    id: "set-004",
    name: "숯불닭발세트",
    price: 18500,
    image: "/set-004.png",
    description: "숯불닭발메뉴 (무뼈닭발/ 통뼈닭발 중 택1) + 주먹김밥 + 계란찜",
    config: { section: "SET" },
  },
  {
    id: "set-005",
    name: "국물닭발세트",
    price: 19500,
    image: "/set-005.png",
    description: "국물닭발메뉴 (무뼈닭발/ 통뼈닭발 중 택1) + 주먹김밥 + 계란찜",
    config: { section: "SET" },
  },
  {
    id: "dak-001",
    name: "숯불통뼈닭발",
    price: 15000,
    image: "/dak-001.png",
    config: { section: "DAKBAL", toppingTypes: ["A", "B"] },
  },
  {
    id: "dak-002",
    name: "숯불무뼈닭발",
    price: 16000,
    image: "/dak-002.png",
    config: { section: "DAKBAL", toppingTypes: ["A", "B"] },
  },
  {
    id: "dak-003",
    name: "국물통뼈닭발",
    price: 16000,
    image: "/dak-003.png",
    config: { section: "DAKBAL", toppingTypes: ["A", "B"] },
  },
  {
    id: "dak-004",
    name: "국물무뼈닭발",
    price: 17000,
    image: "/dak-004.png",
    config: { section: "DAKBAL", toppingTypes: ["A", "B"] },
  },
  {
    id: "kit-001",
    name: "엽기밀키트",
    price: 18000,
    image: "/kit-001.png",
    description: "2개부터 주문 가능합니다. 음료, 단무지, 수저세트 미제공",
    config: { section: "MEALKIT" },
  },
  {
    id: "kit-002",
    name: "로제밀키트",
    price: 18000,
    image: "/kit-002.png",
    description: "2개부터 주문 가능합니다. 음료, 단무지, 수저세트 미제공",
    config: { section: "MEALKIT" },
  },
  {
    id: "side-001",
    name: "참치마요밥",
    price: 3500,
    image: "/side-001.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-002",
    name: "주먹김밥 (셀프)",
    price: 2000,
    image: "/side-002.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-003",
    name: "계란찜",
    price: 2000,
    image: "/side-003.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-004",
    name: "계란야채죽",
    price: 5000,
    image: "/side-004.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-005",
    name: "순대",
    price: 3000,
    image: "/side-005.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-006",
    name: "오뎅튀김 (15개)",
    price: 2000,
    image: "/side-006.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-007",
    name: "모둠튀김",
    price: 2000,
    image: "/side-007.png",
    description: "만두(2개) + 김말이(1개) + 야채튀김(1개)",
    config: { section: "SIDE" },
  },
  {
    id: "side-008",
    name: "만두 (4개)",
    price: 2000,
    image: "/side-008.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-009",
    name: "김말이 (3개)",
    price: 4500,
    image: "/side-009.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-010",
    name: "야채튀김 (1개)",
    price: 1000,
    image: "/side-010.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-011",
    name: "꿔바로우 (5개)",
    price: 5900,
    image: "/side-011.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-012",
    name: "엽봉 (5개)",
    price: 5000,
    image: "/side-012.png",
    description: "마늘간장 후라이드 봉",
    config: { section: "SIDE" },
  },
  {
    id: "side-013",
    name: "바삭치즈만두 (7개)",
    price: 2000,
    image: "/side-013.png",
    description: "치즈 4종 (모짜렐라, 고다, 체다, 크림)으로 만든 만두",
    config: { section: "SIDE" },
  },
  {
    id: "side-014",
    name: "엽도그 (1개)",
    price: 2000,
    image: "/side-014.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-015",
    name: "감자채튀김",
    price: 2500,
    image: "/side-015.png",
    description: "엽기시즈닝(버터갈릭맛) 1개 포함",
    config: { section: "SIDE" },
  },
  {
    id: "side-016",
    name: "엽기시즈닝 (버터갈릭맛)",
    price: 300,
    image: "/side-016.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-017",
    name: "엽기핫불소스",
    price: 700,
    image: "/side-017.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-018",
    name: "공깃밥",
    price: 1000,
    image: "/side-018.png",
    config: { section: "SIDE" },
  },
  {
    id: "side-019",
    name: "단무지 (1개)",
    price: 500,
    image: "/side-019.jpeg",
    config: { section: "SIDE" },
  },
  {
    id: "drink-001",
    name: "음료 (유산균)",
    price: 1000,
    image: "/drink-001.png",
    config: { section: "DRINK" },
  },
];

const menus = menuSeeds.map(createMenu);

const menuSummaryList = menus.map(toMenuSummary);

const menuDetailMap = new Map(
  menus.map(({ config, ...menu }) => [
    menu.id,
    {
      ...menu,
      menuOption: menu.id === "yupddeok" ? YUPDDEOK_MENU_OPTIONS : undefined,
      spice: config.spiceType ? SPICE_OPTIONS[config.spiceType] : undefined,
      toppingChoices: (config.toppingTypes ?? []).map((type) => ({
        type,
        ...TOPPING_OPTIONS[type],
      })),
    },
  ]),
);

export const handlers = [
  http.get("/api/menus", async () => {
    await delay(150);
    return HttpResponse.json(menuSummaryList);
  }),

  http.get("/api/menus/:id", async ({ params }) => {
    await delay(200);
    const id = params.id as string;
    const menu = menuDetailMap.get(id);

    if (!menu) {
      return HttpResponse.json(
        { code: "NOT_FOUND", message: "메뉴가 없습니다" },
        { status: 404 },
      );
    }

    return HttpResponse.json(menu);
  }),
];
