import type { Metadata } from "next";
import { Public_Sans } from 'next/font/google'
import "./globals.css";
import Header from "@/components/Header";
//import LayoutWrapper from '@/components/LayoutWrapper'

export const metadata: Metadata = {
  title: "FinTrack - Personal Finance Tracker",
  description: "Track your finances with ease",
};

const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-public-sans',
  display: 'swap',
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={publicSans.variable}>
      <body className={publicSans.className}>
        <div className="min-h-screen bg-gray-30">
       <main>
          {children}
        </main>
    </div>
      </body>
    </html>
  );
}