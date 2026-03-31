"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ADDRESS_KEY } from "@/constants/storageKeys";

type Address = {
  id: string;
  add: string;
  detailAdd?: string;
  password?: string;
  rider?: string;
  memo?: string;
  type?: string;
};

export default function Address() {
  const [address, setaddress] = useState<Address>({
    id: "",
    add: "",
    detailAdd: "",
    password: "",
    rider: "",
    memo: "",
    type: "",
  });

  const [addressState, setaddressState] = useState<Address[]>([]);

  const addressSave = () => {
    const newState = [...addressState, address];
    setaddressState(newState);

    localStorage.setItem(ADDRESS_KEY, JSON.stringify(newState));
  };

  return (
    <section>
      <Link href={`/myPage/profile/address`} onClick={addressSave}> 완료 </Link>
      <p> 주소 </p>
      <input
        type="text"
        value={address.add}
        onChange={(e) =>
          setaddress({
            ...address,
            add: e.target.value,
          })
        }
      />

      <p> 상세주소 </p>
      <input
        type="text"
        value={address.detailAdd}
        onChange={(e) => setaddress({ ...address, detailAdd: e.target.value })}
      />

      <div>
        <p>배달 기사님께</p>
        <select
          value={address.rider}
          onChange={(e) => setaddress({ ...address, rider: e.target.value })}
        >
          <option value="">선택하세요</option>
          <option value="ask1">문 앞에 두고 노크해주세요</option>
          <option value="ask2">문 앞에 두면 가져갈게요 (벨X, 노크X)</option>
          <option value="ask3">직접 받을게요</option>
          <option value="ask4">전화주시면 마중 나갈게요</option>
          <option value="ask5">직접 입력</option>
        </select>
      </div>
      <p> 공동현관 비밀번호 </p>
      <input
        type="text"
        value={address.password}
        onChange={(e) =>
          setaddress({
            ...address,
            password: e.target.value,
          })
        }
      />
      <p> 오는 길 안내 </p>
      <input
        type="text"
        value={address.memo}
        onChange={(e) =>
          setaddress({
            ...address,
            memo: e.target.value,
          })
        }
      />
      <div>
        <button
          onClick={(e) =>
            setaddress({
              ...address,
              id: "우리집",
            })
          }
        >
          우리집
        </button>
        <button
          onClick={(e) =>
            setaddress({
              ...address,
              id: "직장",
            })
          }
        >
          직장
        </button>
        <button
          onClick={(e) =>
            setaddress({
              ...address,
              id: "기타",
            })
          }
        >
          기타
        </button>
      </div>
    </section>
  );
}
