"use client";

import { useEffect, useMemo, useState } from "react";
import { ORDER_KEY } from "@/constants/storageKeys";
import type { OrderRecord } from "@/types/order";

type OrderFilter = "DELIVERY" | "OTHER";

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<OrderFilter>("DELIVERY");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(ORDER_KEY);
      setOrders(saved ? (JSON.parse(saved) as OrderRecord[]) : []);
    } catch {
      setOrders([]);
    }
  }, []);

  const filteredOrders = useMemo(() => {
    if (selectedFilter === "DELIVERY") {
      return orders.filter((order) => order.channel === "DELIVERY");
    }

    return orders.filter(
      (order) => order.channel === "PICKUP" || order.channel === "HALL",
    );
  }, [orders, selectedFilter]);

  const formatOrderDate = (value: string) => {
    const date = new Date(value);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(
      date.getDate(),
    ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes(),
    ).padStart(2, "0")}`;
  };

  return (
    <div className="bg-[#f6f7f9] px-4 py-4">
      <h1 className="text-[24px] font-bold">주문내역</h1>

      <div className="mt-5 flex gap-2 rounded-full bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setSelectedFilter("DELIVERY")}
          className={
            selectedFilter === "DELIVERY"
              ? "flex-1 rounded-full bg-black px-4 py-3 font-bold text-white"
              : "flex-1 rounded-full bg-white px-4 py-3 font-bold text-gray-400"
          }
        >
          배달 주문
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter("OTHER")}
          className={
            selectedFilter === "OTHER"
              ? "flex-1 rounded-full bg-black px-4 py-3 font-bold text-white"
              : "flex-1 rounded-full bg-white px-4 py-3 font-bold text-gray-400"
          }
        >
          포장·홀 주문
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="mt-6 rounded-[28px] bg-white px-6 py-14 text-center shadow-sm">
          <p className="text-lg font-bold">주문 내역이 없습니다</p>
          <p className="mt-2 text-sm text-gray-500">
            완료한 주문이 있으면 여기서 다시 볼 수 있습니다.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-[28px] bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[18px] font-bold">{order.storeName}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {formatOrderDate(order.createdAt)}
                  </p>
                </div>
                <div className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-bold text-red-500">
                  {order.channel === "DELIVERY" ? "배달 완료" : "주문 완료"}
                </div>
              </div>

              <div className="mt-4 space-y-3 rounded-2xl bg-gray-50 p-4">
                {order.items.map((item) => {
                  const optionSummary = [
                    item.selectedMenuOption
                      ? `메뉴 ${item.selectedMenuOption.name}`
                      : null,
                    item.selectedSpice
                      ? `맵기 ${item.selectedSpice.name}`
                      : null,
                    item.selectedToppings.length > 0
                      ? `토핑 ${item.selectedToppings
                          .map((topping) => `${topping.name} x${topping.count}`)
                          .join(", ")}`
                      : null,
                  ]
                    .filter(Boolean)
                    .join(" / ");

                  return (
                    <div
                      key={item.key ?? `${order.id}-${item.id}`}
                      className="flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="font-bold text-black">{item.name}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {optionSummary || "기본 옵션"}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-bold text-black">x{item.count}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {((item.price + item.toppingsPrice) * item.count).toLocaleString()}원
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{order.paymentMethod}</span>
                <span className="text-[18px] font-bold text-black">
                  {order.price.finalTotal.toLocaleString()}원
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
