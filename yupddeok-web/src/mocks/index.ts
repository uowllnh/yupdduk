// src/mocks/index.ts
export async function enableMocking() {
  if (process.env.NODE_ENV !== "development") return;

  const { worker } = await import("./browser");
  return worker.start({
    onUnhandledRequest: "warn", // 매칭 안 되면 콘솔에 경고 뜸
  });
}
