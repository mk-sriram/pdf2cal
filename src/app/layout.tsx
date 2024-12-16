import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/Footer/Footer";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Convert Schedules to Calendar Events and Tasks | Pdf2Calendar",
  description:
    "Effortlessly convert your Schedules to calendar events in seconds. Save time and stay organized with Pdf2Calendar",
  keywords:
    "PDF to calendar, convert PDF to calendar, calendar events, Google Calendar, Apple Calendar, convert images to calendar events, DOCX to calendar, JPG to calendar, PNG to calendar, PDF to Google Calendar, PDF to Google Tasks, image to Google Calendar, DOCX to Google Calendar, convert schedules to calendar, automate calendar events, convert PDF to tasks, PDF to Google Tasks",
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
    <html lang="en" data-theme="cmyk" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className}>
        {/* //<Navbar /> */}
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
