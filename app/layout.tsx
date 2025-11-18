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
  title: "Bar Sim",
  description: "Practice bartending without waste",
  manifest: "/manifest.json",
  themeColor: "#110101",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "BarSim",
  },
  icons: {
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <link 
  rel="apple-touch-startup-image" 
  href="/splash/launch.png"
  media="(device-width: 390px) and (device-height: 844px)"/>

      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
