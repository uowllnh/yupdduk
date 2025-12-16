import { http, HttpResponse, delay } from "msw";

const menus = [
  {
    id: "ttok-001",
    name: "엽기떡볶이",
    category: "떡볶이",
    price: 15000,
    image: "/img/ttok-001.jpg",
  },
  {
    id: "side-001",
    name: "모둠튀김",
    category: "사이드",
    price: 6000,
    image: "/img/side-001.jpg",
  },
] as const;

export const handlers = [
  // 메뉴 목록
  http.get("/api/menus", async () => {
    await delay(400); // 로딩 상태 확인용
    return HttpResponse.json({ items: menus });
  }),

  // 메뉴 상세
  http.get("/api/menus/:id", async ({ params }) => {
    await delay(400);

    const item = menus.find((m) => m.id === params.id);
    if (!item) return new HttpResponse(null, { status: 404 });

    // 상세는 옵션 포함(샘플)
    return HttpResponse.json({
      ...item,
      options: [
        {
          id: "spice",
          name: "맵기",
          type: "single",
          required: true,
          items: [
            { id: "lv1", name: "1단계", priceDelta: 0 },
            { id: "lv2", name: "2단계", priceDelta: 0 },
            { id: "lv3", name: "3단계", priceDelta: 0 },
          ],
        },
        {
          id: "topping",
          name: "토핑(최대 3개)",
          type: "multiple",
          required: false,
          max: 3,
          items: [
            { id: "cheese", name: "치즈", priceDelta: 2000 },
            { id: "sausage", name: "소시지", priceDelta: 2000 },
            { id: "mandu", name: "만두", priceDelta: 1500 },
          ],
        },
      ],
    });
  }),
];
