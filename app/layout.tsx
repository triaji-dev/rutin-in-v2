import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "rutin.in - Habit Tracker",
  description: "A minimalist habit tracker to help you build and maintain good habits consistently.",
  keywords: ["habit tracker", "habits", "productivity", "routine", "self-improvement"],
  authors: [{ name: "rutin.in" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#121212",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-dark text-zinc-100 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
