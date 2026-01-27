// libs/money.ts
export const formatKRW = (v: number) =>
  v.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });

export const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
