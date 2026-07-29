# 엽기떡볶이 주문 UX 리디자인

> 원하는 메뉴를 빠르게 찾고 선택한 옵션과 가격을 명확히 확인할 수 있도록 개선한 반응형 주문 웹사이트입니다.

<br />

<p align="center">
  <img src="https://raw.githubusercontent.com/uowllnh/portfolio/main/src/assets/image/yupdduk_Cover.png" width="800" alt="엽기떡볶이 리디자인 메인 화면" />
</p>

<br />

## 🔗 배포 및 관련 링크

- **배포 사이트:** [사이트 바로가기](https://yupddeok.web.app/)
- **GitHub:** [저장소 바로가기](https://github.com/uowllnh/yupdduk)

<br />

## 📌 프로젝트 소개

기존 주문 서비스는 이벤트와 메뉴 정보가 한 화면에 섞여 있고, 옵션 선택 과정에서 현재 선택 내용과 최종 가격을 확인하기 어려웠습니다.

이 프로젝트는 **모바일로 메뉴를 탐색하고 주문하는 사용자**를 위해 제작했습니다. 메뉴 탐색부터 옵션 선택, 장바구니, 주문 확인까지 이어지는 흐름을 단순화하고, 각 단계에서 필요한 정보와 선택 상태를 명확히 보여주도록 개선했습니다.

<br />

## 📅 개발 기간

- 2025.03

<br />

## 👥 개발 인원 및 역할

### 개인 프로젝트

- UX 문제 정의 및 개선 방향 설계
- 모바일 UI 리디자인
- Next.js 기반 프론트엔드 개발
- 메뉴·옵션·장바구니 컴포넌트 설계
- Mock API와 주문 흐름 구현
- Firebase Hosting 배포

<br />

## 🛠 기술 스택

### Front-End

<p>
  <img src="https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

### State / Data

<p>
  <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white" alt="TanStack Query" />
  <img src="https://img.shields.io/badge/Zustand-443E38?style=flat-square&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/MSW-FF6A33?style=flat-square&logo=mockserviceworker&logoColor=white" alt="MSW" />
</p>

### Tools / Deployment

<p>
  <img src="https://img.shields.io/badge/Figma-F24E1E?style=flat-square&logo=figma&logoColor=white" alt="Figma" />
  <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" />
  <img src="https://img.shields.io/badge/Firebase_Hosting-DD2C00?style=flat-square&logo=firebase&logoColor=white" alt="Firebase Hosting" />
</p>

<br />

## ✨ 주요 기능

### 1. 메뉴 탐색과 상세 옵션 선택

<p align="center">
  <img src="https://raw.githubusercontent.com/uowllnh/portfolio/main/src/assets/image/yupdduk1.png" width="700" alt="엽기떡볶이 메뉴 화면" />
</p>

- 메뉴 목록에서 이미지, 설명, 가격을 한눈에 확인할 수 있습니다.
- 동적 라우트로 메뉴별 상세 화면을 제공합니다.
- 맵기와 토핑을 선택하면 선택 상태와 금액이 즉시 반영됩니다.

### 2. 장바구니와 주문 내역 관리

<p align="center">
  <img src="https://raw.githubusercontent.com/uowllnh/portfolio/main/src/assets/image/yupdduk3.png" width="700" alt="엽기떡볶이 장바구니 화면" />
</p>

- 선택한 메뉴와 옵션을 장바구니에 저장합니다.
- 수량 변경과 항목 삭제 시 합계 금액을 다시 계산합니다.
- `localStorage`를 사용해 새로고침 이후에도 주문 상태를 유지합니다.

### 3. Mock API 기반 데이터 처리

- MSW로 매장, 메뉴, 토핑 API 응답과 오류 상황을 구성했습니다.
- TanStack Query로 로딩·성공·실패 상태를 분리했습니다.
- 존재하지 않는 메뉴 요청에 명시적인 오류 응답을 제공합니다.

<br />

## 🖥 화면 구성

| 화면 | 설명 |
| --- | --- |
| 메인 화면 | 대표 메뉴와 주문 진입 정보를 제공합니다. |
| 매장 화면 | 선택한 매장의 정보와 메뉴를 확인합니다. |
| 메뉴 상세 | 맵기, 토핑, 수량 등 주문 옵션을 선택합니다. |
| 장바구니 | 선택한 메뉴와 옵션, 수량, 합계 금액을 관리합니다. |
| 주문 확인 | 최종 주문 내역을 검토합니다. |
| 결제 화면 | 주문 완료 전 결제 흐름을 제공합니다. |

<br />

## 📁 폴더 구조

```text
yupddeok-web
├── public
├── src
│   ├── app
│   │   ├── cart
│   │   ├── menu
│   │   │   └── [id]
│   │   ├── order
│   │   ├── pay
│   │   └── store
│   │       └── [id]
│   ├── constants
│   ├── mocks
│   └── types
├── package.json
└── next.config.ts
```

페이지, Mock API, 공통 타입과 저장소 키를 역할별로 분리해 주문 단계별 코드를 쉽게 찾을 수 있도록 구성했습니다.

<br />

## 🔍 주요 구현 내용

### 재사용 가능한 옵션 UI

맵기와 토핑 선택 UI를 별도 컴포넌트로 분리하고, 메뉴 데이터에 따라 선택지를 렌더링했습니다. 토핑 수량과 가격을 상태로 관리해 사용자의 선택이 합계에 즉시 반영되도록 구성했습니다.

### 클라이언트 상태와 서버 상태 분리

- 서버 데이터: TanStack Query로 매장·메뉴 조회
- 장바구니 상태: Zustand 및 컴포넌트 상태로 관리
- 새로고침 유지: `localStorage`에 장바구니 직렬화
- 개발용 API: MSW로 실제 요청과 유사한 응답 구성

### 주문 금액 계산

기본 메뉴 가격, 옵션 가격, 토핑 수량, 메뉴 수량을 분리해 계산했습니다. 장바구니 수정 시 공통 계산 로직을 통해 화면에 표시되는 금액과 저장된 주문 데이터가 일치하도록 했습니다.

<br />

## 🚨 문제 해결 경험

### 문제 1. Mock Service Worker 준비 전 요청 발생

**문제**

개발 환경에서 MSW가 시작되기 전에 페이지가 렌더링되면 초기 API 요청이 Mock 핸들러를 거치지 않을 수 있었습니다.

**원인**

서비스 워커 등록은 비동기로 처리되지만 자식 컴포넌트는 즉시 렌더링됐습니다.

**해결**

Provider에서 MSW 준비 상태를 관리하고, 워커 시작이 완료된 후에 페이지를 렌더링하도록 순서를 제어했습니다.

**결과**

첫 요청부터 일관되게 Mock API를 사용하고 개발 환경의 간헐적인 네트워크 오류를 줄였습니다.

---

### 문제 2. 주문 단계 사이의 장바구니 상태 유실

**문제**

메뉴 상세, 장바구니, 주문 확인 화면을 이동하거나 새로고침하면 사용자가 선택한 옵션이 사라질 수 있었습니다.

**원인**

화면 내부 상태만 사용하면 컴포넌트가 다시 마운트될 때 주문 데이터가 초기화됩니다.

**해결**

장바구니 데이터를 공통 타입으로 정의하고 `localStorage`에 저장해 각 주문 화면에서 같은 데이터를 복원하도록 구성했습니다.

**결과**

페이지 이동과 새로고침 이후에도 사용자의 선택과 합계 금액이 유지됩니다.

<br />

## 💡 프로젝트를 통해 배운 점

- 주문형 서비스에서는 선택 상태와 가격 정보의 가시성이 중요하다는 점을 배웠습니다.
- 서버 상태와 클라이언트 주문 상태를 분리하면 데이터 흐름을 명확하게 관리할 수 있음을 경험했습니다.
- MSW를 활용해 백엔드 없이도 로딩, 성공, 오류 흐름을 실제 API처럼 구현했습니다.
- 사용자 흐름을 기준으로 페이지를 나누면 컴포넌트와 데이터 구조도 자연스럽게 정리된다는 점을 확인했습니다.

<br />

## 🔧 개선 예정 사항

- [ ] 실제 주문 API 및 인증 연동
- [ ] 결제 단계의 입력 검증과 오류 처리 고도화
- [ ] 장바구니 계산 로직 테스트 작성
- [ ] 이미지 최적화 및 초기 로딩 성능 개선
- [ ] 키보드 탐색과 스크린 리더 접근성 개선

<br />

## 🚀 실행 방법

```bash
git clone https://github.com/uowllnh/yupdduk.git
cd yupdduk/yupddeok-web
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 엽니다.
