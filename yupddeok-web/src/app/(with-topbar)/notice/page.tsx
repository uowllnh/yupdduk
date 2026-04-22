const notices = [
  {
    title: "배달 가능 지역 안내",
    body: "일부 지역은 매장 상황에 따라 배달 가능 시간이 달라질 수 있습니다.",
  },
  {
    title: "이벤트 쿠폰 사용 안내",
    body: "쿠폰은 결제 단계에서 적용 가능하며 중복 사용은 불가합니다.",
  },
];

export default function NoticePage() {
  return (
    <div className="px-6 py-6">
      <h1 className="text-[24px] font-bold">공지사항</h1>
      <div className="mt-6 space-y-3">
        {notices.map((notice) => (
          <div
            key={notice.title}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-[17px] font-bold">{notice.title}</p>
            <p className="mt-2 text-sm leading-6 text-gray-600">{notice.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
