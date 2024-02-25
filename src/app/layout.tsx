import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Header } from "./_layout/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "devlocator",
  description: "エンジニアイベントを地図上に表示できるサービス",
};

/**
 * 基本レイアウト
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
