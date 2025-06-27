import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Persipura Jayapura - Official Website",
  description: "Official website of Persipura Jayapura FC - Mutiara Hitam Papua, football excellence since 1963.",
  openGraph: {
    title: "Persipura Jayapura - Official Website",
    description: "Official website of Persipura Jayapura FC - Mutiara Hitam Papua, football excellence since 1963.",
    url: "https://your-domain.com", // Change to your real domain
    siteName: "Persipura Jayapura",
    images: [
      {
        url: "/persipura-logo.png", // Or a custom og-image (1200x630px recommended)
        width: 1200,
        height: 630,
        alt: "Persipura Jayapura Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Persipura Jayapura - Official Website",
    description: "Official website of Persipura Jayapura FC - Mutiara Hitam Papua, football excellence since 1963.",
    images: ["/persipura-logo.png"],
  },
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
        {children}
      </body>
    </html>
  );
}
