import type { Metadata } from "next";
import { Noto_Serif_KR, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const serifKr = Noto_Serif_KR({
  variable: "--font-noto-serif-kr",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const sansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "천기보감 | 天機寶鑑",
  description: "그대가 품은 뜻, 하늘의 기운으로 점쳐보겠는가? 무협 세계관으로 풀어보는 운명 점괘.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${serifKr.variable} ${sansKr.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
