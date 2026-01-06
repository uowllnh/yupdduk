export async function startWorker() {
  if (typeof window === "undefined") return;

  const { worker } = await import("./browser");

  await worker.start({
    serviceWorker: { url: "/mockServiceWorker.js" },
    onUnhandledRequest: "bypass",
  });

  // ✅ 서비스워커가 "현재 탭"을 아직 컨트롤 못 하면, 1회 리로드로 컨트롤 잡기
  const key = "__msw_reload_once__";
  if (!navigator.serviceWorker.controller && !sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, "1");
    window.location.reload();
  }
}
