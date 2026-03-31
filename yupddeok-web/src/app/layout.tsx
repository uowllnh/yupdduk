import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-gray-100 flex justify-center">
        <main className="w-full max-w-[375px] min-h-screen bg-white shadow-sm">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
