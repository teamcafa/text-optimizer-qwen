import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "文字调制器",
  description: "基于 Qwen 的文字风格优化器"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}