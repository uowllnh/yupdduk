"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { startWorker } from "@/mocks/startWorker";

export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => new QueryClient());

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      startWorker();
    }
  }, []);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
