import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Ethereal Arch — Business Intelligence Dashboard",
  description: "AI-powered business analytics platform for enterprise teams. Real-time KPIs, insights, and intelligent assistant.",
  keywords: ["dashboard", "analytics", "AI assistant", "business intelligence", "KPI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased bg-dark-900 text-white font-sans`}>
        <div className="flex min-h-screen bg-dark-900">
          <Sidebar />
          <div className="flex-1 transition-all duration-300 ease-in-out" style={{ marginLeft: 'var(--sidebar-width)' }}>
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
