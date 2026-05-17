"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { startWorker } from "@/mocks/startWorker";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());
  const [mswReady, setMswReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled",
  );

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

  if (!mswReady) {
    return <div className="p-6 text-sm text-gray-500">초기화 중...</div>;
  }

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
