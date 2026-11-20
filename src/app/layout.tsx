import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond, Anton } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NAVDEEP — Kanchipuram Silk Sarees | Woven for the Divine",
  description:
    "NAVDEEP brings the temple looms of Kanchipuram home: pure Kanjivaram silk in heritage colours, bordered in real silver-core zari and finished by hand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${cormorant.variable} ${anton.variable}`}
    >
      <body className="font-sans bg-white text-[#141110] antialiased selection:bg-[#7A1426] selection:text-white">
        <StoreProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
