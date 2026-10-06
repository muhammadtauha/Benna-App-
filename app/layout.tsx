import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Arabic, Inter } from "next/font/google";
import { APP_STORE_ID } from "@/lib/config";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const title = "Benna | بناء — Track all your orders in one spot";
const description =
  "Get real-time tracking updates for all your building materials and orders on the Benna app.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://app.benna.com.sa"),
  title,
  description,
  icons: { icon: "/benna-app-icon.png", apple: "/benna-app-icon.png" },
  itunes: { appId: APP_STORE_ID },
  openGraph: { title, description, images: ["/benna-app-icon.png"], type: "website" },
};

export const viewport: Viewport = { themeColor: "#1d1b50" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${inter.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-neutral-50 font-sans text-neutral-900">{children}</body>
    </html>
  );
}
