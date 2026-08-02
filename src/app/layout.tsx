import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

const siteUrl = "https://mobeescents.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mobee Scents — Discover Your Signature Scent",
    template: "%s | Mobee Scents",
  },
  description:
    "Mobee Scents is a premium fragrance house offering a curated collection of iconic perfumes — warm spicy, woody, and leather compositions designed to leave a lasting impression.",
  keywords: ["Mobee Scents", "perfume", "fragrance", "luxury perfume", "signature scent", "eau de parfum"],
  openGraph: {
    title: "Mobee Scents — Discover Your Signature Scent",
    description:
      "Explore a carefully selected collection of iconic fragrances designed to leave a lasting impression.",
    url: siteUrl,
    siteName: "Mobee Scents",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mobee Scents — Discover Your Signature Scent",
    description:
      "Explore a carefully selected collection of iconic fragrances designed to leave a lasting impression.",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#1c1a17",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="bg-ivory font-sans text-charcoal antialiased">
        <CartProvider>
          <WishlistProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
            >
              Skip to content
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
            <CartDrawer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
