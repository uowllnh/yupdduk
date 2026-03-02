import "@/app/globals.css";
import { Providers } from "@/app/providers";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
   
      <body className="min-h-screen bg-gray-100 flex justify-center">
        <main className="w-full max-w-[430px] min-h-screen bg-white shadow-sm">
          <p>배송주소 레이아웃</p>
          <Providers>{children}</Providers>
        </main>
      </body>
    
  );
}
