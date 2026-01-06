"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { startWorker } from "@/mocks/startWorker";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  // ✅ MSW 준비 완료 여부
  const [mswReady, setMswReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled"
  );


useEffect(() => {
  let cancelled = false;

  async function boot() {
    console.log("API MOCKING =", process.env.NEXT_PUBLIC_API_MOCKING);

    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      console.log("MSW starting...");
      await startWorker();
      console.log("MSW started!");
    }

    if (!cancelled) setMswReady(true);
  }

  boot();
  return () => { cancelled = true; };
}, []);


  useEffect(() => {
    let cancelled = false;

    async function boot() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        await startWorker();
      }
      if (!cancelled) setMswReady(true);
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  // ✅ MSW가 켜지기 전에는 페이지 자체를 렌더하지 않음 (첫 요청이 Next로 안 새나감)
  if (!mswReady) {
    return <div className="p-6 text-sm text-gray-500">초기화 중...</div>;
  }

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
