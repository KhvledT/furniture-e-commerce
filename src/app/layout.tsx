import type { Metadata } from "next";
import { Inter, Cambay } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ToastProvider } from "@/contexts/ToastContext";
import ToastWrapper from "@/components/ToastWrapper";
import { generateWebsiteStructuredData } from "@/lib/structuredData";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cambay = Cambay({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-cambay",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cozy - Furniture E-Commerce",
  description: "Crafting spaces that speak your style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateWebsiteStructuredData() }}
        />
      </head>
      <body
        className={`${inter.variable} ${cambay.variable} antialiased`}
      >
        <ToastProvider>
          <ToastWrapper>
            <CartProvider>
              <WishlistProvider>
                <Navbar />
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </ToastWrapper>
        </ToastProvider>
      </body>
    </html>
  );
}
