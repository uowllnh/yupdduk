import { http, HttpResponse, delay } from "msw";

const menus = [
  {
    id: "yup-001",
    name: "엽기떡볶이",
    category: "엽기",
    price: 14000,
    image: "/img/ttok-001.jpg",
  },

    {
    id: "yup-002",
    name: "엽기오뎅",
    category: "엽기",
    price: 14000,
    image: "/img/ttok-002.jpg",
  },

   {
    id: "yup-003",
    name: "엽기반반",
    category: "엽기",
    price: 14000,
    image: "/img/ttok-003.jpg",
  },

  {
    id: "yup-004",
    name: "엽기분모자떡볶이",
    category: "엽기",
    price: 17000,
    image: "/img/ttok-004.jpg",
    explan: "떡이 분모자로 변경되어 제공됩니다.",
  },

{
    id: "rose-001",
    name: "로제떡볶이",
    category: "로제",
    price: 16000,
    image: "/img/rose-001.jpg",
  },

    {
    id: "rose-002",
    name: "로제오뎅",
    category: "로제",
    price: 16000,
    image: "/img/rose-002.jpg",
  },

   {
    id: "rose-003",
    name: "로제반반",
    category: "로제",
    price: 16000,
    image: "/img/rose-003.jpg",
  },

  {
    id: "rose-004",
    name: "로제분모자떡볶이",
    category: "로제",
    price: 19000,
    image: "/img/rose-004.jpg",
    explan: "떡이 분모자로 변경되어 제공됩니다.",
  },

   {
    id: "mara-001",
    name: "마라떡볶이",
    category: "마라",
    price: 16000,
    image: "/img/mara-001.jpg",
    explan: "떡볶이만 선택 가능, 향신료(산초, 잠두 등) 포함",
  },

    {
    id: "mararose-001",
    name: "마라로제떡볶이",
    category: "마라로제",
    price: 18000,
    image: "/img/mararose-001.jpg",
    explan: "떡볶이만 선택 가능, 향신료(산초, 잠두 등) 포함",
  },

    {
    id: "yupdak-001",
    name: "엽기닭볶음탕",
    category: "엽기닭볶음탕",
    price: 24000,
    image: "/img/yupdak-001.jpg",
  },



  {
    id: "set-001",
    name: "실속세트",
    category: "세트",
    price: 17500,
    image: "/img/set-001.jpg",
    explan: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1)",
  },

   {
    id: "set-002",
    name: "베스트세트",
    category: "세트",
    price: 20000,
    image: "/img/set-002.jpg",
    explan: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1) + 중국당면"
  },

   {
    id: "set-003",
    name: "스페셜세트",
    category: "세트",
    price: 25000,
    image: "/img/set-003.jpg",
    explan: "떡볶이 + 주먹김밥 + 모둠튀김 (만두2, 김말이1, 야채튀김1) + 중국당면 + 엽봉(5개)"
  },

     {
    id: "set-004",
    name: "닭발세트",
    category: "세트",
    price: 17500,
    image: "/img/set-004.jpg",
    explan: "엽기닭발메뉴 (무뼈닭발/ 국물닭발/ 오돌뼈 중 택1) + 주먹감밥 + 계란찜"
  },

   {
    id: "dak-001",
    name: "엽기무뼈닭발",
    category: "닭발",
    price: 15000,
    image: "/img/dak-001.jpg",
  },

     {
    id: "dak-002",
    name: "엽기국물닭발",
    category: "닭발",
    price: 15000,
    image: "/img/dak-002.jpg",
  },

     {
    id: "dak-003",
    name: "엽기오돌뼈",
    category: "닭발",
    price: 14000,
    image: "/img/dak-003.jpg",
  },

  {
    id: "kit-001",
    name: "엽떡밀키트",
    category: "밀키트",
    price: 18000,
    image: "/img/kit-001.jpg",
    explan: "2개부터 주문 가능합니다. 음료, 단무지, 수저세트 미제공"
  },

  {
    id: "side-001",
    name: "엽기오돌뼈밥",
    category: "사이드",
    price: 4500,
    image: "/img/side-001.jpg",
  },

    {
    id: "side-002",
    name: "참치마요밥",
    category: "사이드",
    price: 3500,
    image: "/img/side-002.jpg",
  },

    {
    id: "side-003",
    name: "주먹김밥 (셀프)",
    category: "사이드",
    price: 2000,
    image: "/img/side-003.jpg",
  },

    {
    id: "side-004",
    name: "계란찜",
    category: "사이드",
    price: 2000,
    image: "/img/side-004.jpg",
  },

    {
    id: "side-005",
    name: "계란야채죽",
    category: "사이드",
    price: 5000,
    image: "/img/side-005.jpg",
  },

    {
    id: "side-006",
    name: "순대",
    category: "사이드",
    price: 3000,
    image: "/img/side-006.jpg",
  },

  {
    id: "side-007",
    name: "오뎅튀김 (15개)",
    category: "사이드",
    price: 2000,
    image: "/img/side-007.jpg",
  },

    {
    id: "side-008",
    name: "모둠튀김",
    category: "사이드",
    price: 2000,
    image: "/img/side-008.jpg",
    explan: "만두(2개) + 김말이(1개) + 야채튀김(1개)"
  },

  {
    id: "side-009",
    name: "만두 (4개)",
    category: "사이드",
    price: 2000,
    image: "/img/side-009.jpg",
  },

    {
    id: "side-010",
    name: "김말이 (3개)",
    category: "사이드",
    price: 4500,
    image: "/img/side-010.jpg",
  },

  {
    id: "side-011",
    name: "야채튀김 (1개)",
    category: "사이드",
    price: 1000,
    image: "/img/side-011.jpg",
  },


    {
    id: "side-012",
    name: "꿔바로우 (5개)",
    category: "사이드",
    price: 5900,
    image: "/img/side-012.jpg",
  },

    {
    id: "side-013",
    name: "엽봉 (5개)",
    category: "사이드",
    price: 5000,
    image: "/img/side-013.jpg",
    explan: "마늘간장 후라이드 봉"
  },

    {
    id: "side-014",
    name: "바삭치즈만두 (7개)",
    category: "사이드",
    price: 2000,
    image: "/img/side-014.jpg",
    explan: "치즈 4종 (모짜렐라, 고다, 체다, 크림)으로 만든 만두"
  },


    {
    id: "side-015",
    name: "엽도그 (1개)",
    category: "사이드",
    price: 2000,
    image: "/img/side-015.jpg",
  },


    {
    id: "side-016",
    name: "감자채튀김",
    category: "사이드",
    price: 2500,
    image: "/img/side-016.jpg",
    explan: "엽기시즈닝(버터갈릭맛) 1개 포함"
  },


    {
    id: "side-017",
    name: "엽기시즈닝 (버터갈릭맛)",
    category: "사이드",
    price: 300,
    image: "/img/side-017.jpg",
  },


    {
    id: "side-018",
    name: "공깃밥",
    category: "사이드",
    price: 1000,
    image: "/img/side-018.jpg",
  },


    {
    id: "side-019",
    name: "단무지 (1개)",
    category: "사이드",
    price: 500,
    image: "/img/side-019.jpg",
  },

  {
    id: "drink-001",
    name: "음료 (유산균)",
    category: "음료",
    price: 1000,
    image: "/img/drink-001.jpg",
  },


] as const;





// ✅ 메뉴 상세 (id로 찾기)
export const handlers = [
   http.get("/api/menus", () => {
    return HttpResponse.json(menus);
  }),
  http.get("/api/menus/:id", async ({ params }) => {
    await delay(200);
    const id = params.id as string;

    const menu = menus.find((m) => m.id === id);
    console.log("MSW HIT id:", id);
    console.log("menus:", menus.map(m => m.id));

    // 없으면 404
    if (!menu) {
      return HttpResponse.json(
        { code: "NOT_FOUND", message: "메뉴가 없습니다" },
        { status: 404 }
      );
    }

    return HttpResponse.json(menu);
  }),

  
];
