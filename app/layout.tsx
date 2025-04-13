import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Navbar from "@/components/common/Navbar";
import Providers from "@/providers";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Next.js 应用",
  description: "使用 Next.js 和 TailwindCSS 构建的应用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 pt-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
