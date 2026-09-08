"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  createOptionSummary,
  getCartItemUnitPrice,
} from "@/lib/cart";
import { useCartStore } from "@/stores/cartStore";
import type { MenuSummary } from "@/types/menu";
import styles from "./page.module.css";

export default function Order() {
  const cartState = useCartStore((state) => state.cartState);
  const clearCart = useCartStore((state) => state.clear);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateItemQuantity = useCartStore((state) => state.updateItemQuantity);
  const [isEditing, setIsEditing] = useState(false);
  const [menuImageMap, setMenuImageMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const res = await fetch("/api/menus");
        if (!res.ok) return;

        const data = (await res.json()) as MenuSummary[];
        if (ignore) return;

        setMenuImageMap(
          data.reduce<Record<string, string>>((acc, menu) => {
            acc[menu.id] = menu.image;
            return acc;
          }, {}),
        );
      } catch {}
    })();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>장바구니</h1>
        {cartState.items.length > 0 ? (
          <div className={styles.actions}>
            {isEditing ? (
              <button
                type="button"
                className={styles.deleteAllButton}
                onClick={clearCart}
              >
                전체 삭제
              </button>
            ) : null}
            <button
              type="button"
              className={styles.editButton}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? "완료" : "편집하기"}
            </button>
          </div>
        ) : null}
      </div>

      {cartState.items.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>장바구니가 비어있어요</p>
          <p className={styles.emptyDescription}>
            먹고 싶은 메뉴를 담아 주문을 시작해보세요.
          </p>
          <Link href="/" className={styles.menuLink}>
            메뉴 보러가기
          </Link>
        </div>
      ) : (
        <div className={styles.cartList}>
          {cartState.items.map((item, index) => {
            const itemImage = item.image ?? menuImageMap[item.id];
            const optionSummary = createOptionSummary(item);

            return (
              <div
                key={item.key ?? `${item.id}-${index}`}
                className={styles.cartItem}
              >
                <div className={styles.cartItemContent}>
                  <div className={styles.imageBox}>
                    {itemImage ? (
                      <Image
                        src={itemImage}
                        alt={item.name}
                        width={88}
                        height={88}
                        className={styles.itemImage}
                      />
                    ) : null}
                  </div>

                  <div className={styles.itemBody}>
                    <div className={styles.itemHeader}>
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        <p className={styles.itemOption}>
                          {optionSummary || "기본 옵션"}
                        </p>
                      </div>

                      {isEditing ? (
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => removeItem(index)}
                        >
                          삭제
                        </button>
                      ) : null}
                    </div>

                    <div className={styles.itemFooter}>
                      <p className={styles.itemPrice}>
                        {(getCartItemUnitPrice(item) * item.count).toLocaleString()}원
                      </p>

                      <div className={styles.quantityControl}>
                        <button
                          type="button"
                          className={`${styles.quantityButton} ${styles.decreaseButton}`}
                          onClick={() => updateItemQuantity(index, -1)}
                        >
                          -
                        </button>
                        <span className={styles.quantityValue}>{item.count}</span>
                        <button
                          type="button"
                          className={`${styles.quantityButton} ${styles.increaseButton}`}
                          onClick={() => updateItemQuantity(index, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartState.items.length > 0 ? (
        <div className={styles.checkoutBar}>
          <div className={styles.checkoutContent}>
            <div>
              <p className={styles.totalLabel}>총 주문 금액</p>
              <p className={styles.totalPrice}>
                {cartState.price.itemsTotal.toLocaleString()}원
              </p>
            </div>

            <Link href="/pay" className={styles.checkoutLink}>
              주문하기
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
