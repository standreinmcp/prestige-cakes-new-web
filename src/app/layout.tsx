import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prestige Cakes — Deserturi premium",
  description:
    "Deserturi premium pentru momente speciale. Produse zilnic, din ingrediente naturale, la standarde profesionale.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ConvexClientProvider>
          <div className="flex min-h-full flex-1 flex-col">{children}</div>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
