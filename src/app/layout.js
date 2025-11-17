import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { Gabarito, Inter } from "next/font/google";

const gabarito = Gabarito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata = {
  title: "Simple Shop",
  description: "Simple webshop using DummyJSON API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${gabarito.variable} ${inter.variable} font-body bg-[#FBF7F0] text-gray-900`}
>

        <main className="min-h-screen">{children}</main>
    
      </body>
    </html>
  );
}
