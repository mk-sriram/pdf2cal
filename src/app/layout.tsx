import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Pdf2Cal",
  description: "Schedules to Calendar made Easy",
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
      </body>
    </html>
  );
}
