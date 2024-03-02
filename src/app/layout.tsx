import "@/app/globals.css";
import { Inter } from "next/font/google";

import { Header } from "./_layout/header";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "DevLocator",
//   description: "エンジニアイベントを地図上で検索できるサービス",
//   icons: [{ rel: "icon", url: Favicon.src }],
// };

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
