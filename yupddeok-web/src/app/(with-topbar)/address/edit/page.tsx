"use client";


export default function addressEdit () {


    return (

        <section>
            <section className="주소 입력">
                <p>주소</p>
                <input type="text"></input>
            </section>
            <section className="상세 주소 입력">
                <p>상세 주소</p>
                <input type="text"></input>
            </section>
            <section className="상세 주소 입력">
                <p>주소</p>
                <input type="text"></input>
            </section>
            <section className="배달기사님께">
                <p>배달기사님께</p>
                <select>
                <option value="">선택하세요</option>
                <option value="ask1">문 앞에 두고 노크해주세요</option>
                <option value="ask2">문 앞에 두면 가져갈게요 (벨X, 노크X)</option>
                <option value="ask3">직접 받을게요</option>
                <option value="ask4">전화주시면 마중 나갈게요</option>
                <option value="ask5">직접 입력</option>
            </select>
            </section>
            <section className="공동현관">
                <p>공동현관 비밀번호</p>
                <input type="text"></input>
            </section>
            <section className="오는 길">
                <p>오는 길 안내</p>
                <input type="text"></input>
            </section>
            <section>
                <button>우리집</button>
                <button>회사</button>
                <button>기타</button>
            </section>
        </section>
    )




}