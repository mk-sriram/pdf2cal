import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Pdf2Cal",
  description: "Schedule to Calendar made Easy",
  other: {
    "google-site-verification": "BP7SP3zkjzjVJYq-pxdAftgQpbUN0Mksv_0aaIiZhF0",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="cmyk">
      <body className={inter.className}>
        {/* //<Navbar /> */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
