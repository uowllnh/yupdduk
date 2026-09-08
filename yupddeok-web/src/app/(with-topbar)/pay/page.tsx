"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ORDER_KEY, STORE_KEY } from "@/constants/storageKeys";
import type { OrderRecord } from "@/types/order";
import { createOptionSummary } from "@/lib/cart";
import { readStorage, writeStorage } from "@/lib/storage";
import { useCartStore } from "@/stores/cartStore";

const deliveryRequests = [
  "문 앞에 두고 노크해주세요",
  "문 앞에 두면 가져갈게요 (벨X, 노크X)",
  "직접 받을게요",
  "전화주시면 마중 나갈게요",
  "직접 입력",
];

const paymentMethods = [
  "1초 결제",
  "신용/체크카드",
  "카카오페이",
  "네이버페이",
  "페이코",
  "삼성페이",
  "만나서 결제",
];

export default function Pay() {
  const router = useRouter();

  const cartState = useCartStore((state) => state.cartState);
  const resetCartAfterOrder = useCartStore((state) => state.resetAfterOrder);
  const [storeName] = useState(() => readStorage(STORE_KEY, ""));
  const [ownerRequest, setOwnerRequest] = useState("");
  const [saveOwnerRequest, setSaveOwnerRequest] = useState(false);
  const [skipCutlery, setSkipCutlery] = useState(false);
  const [deliveryRequest, setDeliveryRequest] = useState("");
  const [safePhone, setSafePhone] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethods[0]);

  const priceSummary = useMemo(() => {
    const itemsTotal = cartState.price.itemsTotal;
    const deliveryFee = cartState.items.length > 0 ? 3000 : 0;
    const discount = 0;
    const finalTotal = itemsTotal + deliveryFee - discount;

    return {
      itemsTotal,
      deliveryFee,
      discount,
      finalTotal,
    };
  }, [cartState.items.length, cartState.price.itemsTotal]);

  const handlePlaceOrder = () => {
    if (cartState.items.length === 0) return;

    const nextOrder: OrderRecord = {
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
      storeName: storeName ? `엽기떡볶이 ${storeName}` : "엽기떡볶이",
      channel: cartState.delivery.type,
      paymentMethod,
      requestNote: ownerRequest,
      deliveryRequest,
      safePhone,
      skipCutlery,
      items: cartState.items,
      price: priceSummary,
    };

    try {
      const prevOrders = readStorage<OrderRecord[]>(ORDER_KEY, []);
      writeStorage(ORDER_KEY, [nextOrder, ...prevOrders]);
      resetCartAfterOrder();
      router.push("/pay/orderCompleted");
    } catch {}
  };

  return (
    <div className="bg-[#f6f7f9] px-4 pb-44 pt-2">
      <div className="space-y-3">
        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold tracking-[0.08em] text-gray-400">
                STORE
              </p>
              <h1 className="mt-2 text-[24px] font-bold text-black">
                {storeName ? `엽기떡볶이 ${storeName}` : "엽기떡볶이"}
              </h1>
            </div>
            <div className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold text-red-500">
              배달 주문
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-gray-50 p-4">
            <p className="text-sm font-semibold text-gray-400">배달 주소</p>
            <p className="mt-1 font-bold text-black">
              {cartState.delivery.address ?? "서울특별시 강남구 삼성로 123"}
            </p>
            <p className="mt-4 text-sm font-semibold text-gray-400">연락처</p>
            <p className="mt-1 font-bold text-black">010-1234-5678</p>
            <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={safePhone}
                onChange={(event) => setSafePhone(event.target.checked)}
              />
              안심번호 사용
            </label>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold">주문내역</h2>
            <span className="text-sm font-semibold text-gray-400">
              총 {cartState.items.length}개
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {cartState.items.length === 0 ? (
              <p className="rounded-2xl bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
                담긴 메뉴가 없습니다.
              </p>
            ) : (
              cartState.items.map((item, index) => {
                return (
                  <div
                    key={item.key ?? `${item.id}-${index}`}
                    className="rounded-2xl bg-gray-50 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {createOptionSummary(item) || "기본 옵션"}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-bold text-black">x{item.count}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {(item.price + item.toppingsPrice).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[20px] font-bold">요청사항</h2>

          <div className="mt-4 rounded-2xl bg-gray-50 p-4">
            <p className="font-bold text-black">가게 사장님께</p>
            <textarea
              value={ownerRequest}
              maxLength={60}
              onChange={(event) => setOwnerRequest(event.target.value)}
              placeholder="예) 덜 맵게 부탁드려요. 60자 이내"
              className="mt-3 h-24 w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none"
            />
            <div className="mt-3 flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={saveOwnerRequest}
                  onChange={(event) => setSaveOwnerRequest(event.target.checked)}
                />
                다음에도 사용
              </label>
              <span className="text-gray-400">{ownerRequest.length}/60</span>
            </div>

            <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={skipCutlery}
                onChange={(event) => setSkipCutlery(event.target.checked)}
              />
              수저, 포크 안 받기
            </label>
          </div>

          <div className="mt-3 rounded-2xl bg-gray-50 p-4">
            <p className="font-bold text-black">배달 기사님께</p>
            <div className="relative mt-3">
              <select
                value={deliveryRequest}
                onChange={(event) => setDeliveryRequest(event.target.value)}
                className="h-12 w-full appearance-none rounded-2xl border border-gray-200 bg-white px-4 pr-10 text-sm font-medium outline-none"
              >
                <option value="">선택해주세요</option>
                {deliveryRequests.map((request) => (
                  <option key={request} value={request}>
                    {request}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-red-500">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[20px] font-bold">쿠폰 및 할인</h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
              <div>
                <p className="font-bold text-black">보유 쿠폰</p>
                <p className="mt-1 text-sm text-gray-500">사용 가능한 쿠폰 없음</p>
              </div>
              <span className="text-sm font-semibold text-gray-300">0장</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-4">
              <div>
                <p className="font-bold text-black">모바일 상품권</p>
                <p className="mt-1 text-sm text-gray-500">등록된 상품권 없음</p>
              </div>
              <span className="text-sm font-semibold text-gray-300">등록</span>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[20px] font-bold">결제수단</h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {paymentMethods.map((method) => {
              const isSelected = paymentMethod === method;

              return (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={
                    isSelected
                      ? "rounded-2xl border border-black bg-black px-4 py-4 text-left font-bold text-white"
                      : "rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left font-bold text-black"
                  }
                >
                  {method}
                </button>
              );
            })}
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-5 shadow-sm">
          <h2 className="text-[20px] font-bold">결제금액</h2>

          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between text-gray-600">
              <span>주문금액</span>
              <span>{priceSummary.itemsTotal.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>배달팁</span>
              <span>{priceSummary.deliveryFee.toLocaleString()}원</span>
            </div>
            <div className="flex items-center justify-between text-gray-600">
              <span>할인금액</span>
              <span>-{priceSummary.discount.toLocaleString()}원</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-black">최종 결제금액</span>
                <span className="text-[22px] font-bold text-black">
                  {priceSummary.finalTotal.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-1/2 z-20 w-full max-w-[375px] -translate-x-1/2 border-t border-gray-200 bg-white px-6 pb-6 pt-4 shadow-[0_-8px_24px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-sm text-gray-500">최종 결제금액</p>
              <p className="mt-1 text-[28px] font-bold">
                {priceSummary.finalTotal.toLocaleString()}원
              </p>
            </div>
            <div className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold text-red-500">
              {paymentMethod}
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="flex w-full items-center justify-center rounded-full bg-black px-5 py-4 text-center font-bold text-white"
          >
            {priceSummary.finalTotal.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
