"use client";
import Link from "next/link";
import { STORE_KEY } from "@/constants/storageKeys";
import { CART_KEY } from "@/constants/storageKeys";
import { useEffect, useState } from "react";

type Menu = {
  id: string;
  name: string;
};

export default function Pay() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [storeName, setStoreName] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setMenus(data);
        const saved = localStorage.getItem(STORE_KEY);
        if (saved) setStoreName(saved);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section>
      <section>
        <p>매장정보</p>
        <p>엽기떡볶이 {storeName ? storeName : "아직 선택 안 함"}</p>
        <p>배달주소</p>
        <p>서울특별시 강남구 삼성로 123</p>
        <p>휴대폰번호</p>
        <p>010-1234-5678</p>
        <input type="checkbox" /> 안심번호 사용
      </section>

      <section>
        <p>주문시 요청사항</p>
        <div>
          <p>가게 사장님께</p>
          <input type="checkbox" /> 다음에도 사용
          <input type="text" placeholder="60자 이내로 작성해주세요." />
          <input type="checkbox" /> 수저, 포크 안 받기
        </div>
        <div>
          <p>배달 기사님께</p>
          <select>
            <option value="">선택하세요</option>
            <option value="ask1">문 앞에 두고 노크해주세요</option>
            <option value="ask2">문 앞에 두면 가져갈게요 (벨X, 노크X)</option>
            <option value="ask3">직접 받을게요</option>
            <option value="ask4">전화주시면 마중 나갈게요</option>
            <option value="ask5">직접 입력</option>
          </select>
        </div>
      </section>

      <section>
        <p>쿠폰 및 할인</p>
        <p>보유쿠폰</p>
        <p>모바일 상품권</p>
      </section>

      <section>
        <p>결제수단</p>
        <label>
          <input type="radio" /> 1초 결제{" "}
        </label>
        <label>
          <input type="radio" /> 신용/체크카드{" "}
        </label>
        <label>
          <input type="radio" /> 카카오페이{" "}
        </label>
        <label>
          <input type="radio" /> 네이버페이{" "}
        </label>
        <label>
          <input type="radio" /> 페이코{" "}
        </label>
        <label>
          <input type="radio" /> 삼성페이{" "}
        </label>
        <label>
          <input type="radio" /> 만나서 결제{" "}
        </label>
      </section>

      <Link href={`pay/orderCompleted`}> 주문하기 </Link>
    </section>
  );
}
