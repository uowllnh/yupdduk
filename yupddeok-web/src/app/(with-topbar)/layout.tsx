import "@/app/globals.css";
import { Providers } from "@/app/providers";
import Back from "./backbutton";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    
  return (
   
      <body className="min-h-screen bg-gray-100 flex justify-center">
        <main className="w-full max-w-[430px] min-h-screen bg-white shadow-sm">
          <Back/>
          <Providers>{children}</Providers>
        </main>
      </body>
    
  );
}