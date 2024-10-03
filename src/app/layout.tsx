import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { APP_TITLE } from "./constant";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Movie Store",
  description: "Discover the movies here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="header">
          <div>{APP_TITLE}</div>
        </div>
        {children}
      </body>
    </html>
  );
}
