import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL("https://rebecca-herman-fostering.vercel.app"),

  title: {
    default: "Rebecca Herman's Fostering",
    template: "%s | Rebecca Herman's Fostering",
  },

  description:
    "Find healthy, home-raised Cavalier King Charles Spaniels ready for loving homes. Vet-checked, vaccinated, and responsibly rehomed across the U.S.",

  keywords: [
    "Cavalier King Charles Spaniel puppies",
    "Cavalier puppies for adoption",
    "Cavalier King Charles Spaniel rehoming",
    " Cavalier King Charles Spaniel puppies",
    "family puppies",
    "Rebecca Herman"
  ],

  authors: [{ name: "Rebecca Herman" }],
  creator: "Rebecca Herman",
  publisher: "Rebecca Herman's Fostering",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://rebecca-herman-fostering.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://rebecca-herman-fostering.vercel.app",
    title:
      "Rebecca Herman's Fostering",
    description:
      "Healthy, vet-checked Cavalier King Charles Spaniels raised with care and ready for loving homes.",
    siteName: "Rebecca Herman's Fostering",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Rebecca Herman's Fostering",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Rebecca Herman's Fostering",
    description:
      "Find healthy, home-raised Cavalier King Charles Spaniels ready for loving families.",
    images: ["/thumbnail.png"],
  },

  category: "Pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Toaster position="top-right" />
        {children}
      </body>
    </html>
  );
}
