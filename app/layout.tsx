import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Standard Group LLC | Leading Building Materials Supplier in UAE",
  description: "Standard Group LLC is the UAE's trusted B2B building materials supplier. Serving contractors, distributors, and builders with premium products since 2003.",
  keywords: "building materials UAE, construction supplies Abu Dhabi, Standard Group LLC, B2B building materials, cement, steel, sanitary ware UAE",
  openGraph: {
    title: "Standard Group LLC | Leading Building Materials Supplier in UAE",
    description: "Standard Group LLC is the UAE's trusted B2B building materials supplier. Serving contractors, distributors, and builders with premium products since 2003.",
    url: "https://standardgroup.ae",
    siteName: "Standard Group LLC",
    locale: "en_AE",
    type: "website",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
