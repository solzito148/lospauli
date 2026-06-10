import type { Metadata, Viewport } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Permite extender el fondo bajo el notch y usar env(safe-area-inset-*)
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "SALVATORE — Alfajores y Conitos Artesanales",
  description:
    "Alfajores y conitos hechos con dedicación. Pedí por WhatsApp y coordinamos entrega.",
  openGraph: {
    title: "SALVATORE — Alfajores y Conitos",
    description: "Alfajores y conitos artesanales. Pedí por WhatsApp.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-blanco text-chocolate">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
