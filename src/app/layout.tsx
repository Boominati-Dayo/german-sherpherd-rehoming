import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { seoConfig } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.socialImage.replace("/thumbnail.png", "")),

  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.siteName}`,
  },

  description: seoConfig.description,

  keywords: seoConfig.keywords,

  authors: [{ name: seoConfig.ownerName }],
  creator: seoConfig.ownerName,
  publisher: seoConfig.siteName,

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
    canonical: seoConfig.socialImage.replace("/thumbnail.png", ""),
  },

  openGraph: {
    type: "website",
    url: seoConfig.socialImage.replace("/thumbnail.png", ""),
    title: seoConfig.siteName,
    description: seoConfig.description,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.socialImage,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
      },
    ],
    locale: "en_US",
  },

  other: {
    "fb:app_id": "1234567890",
  },

  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName,
    description: seoConfig.description,
    creator: seoConfig.twitterHandle,
    images: [seoConfig.socialImage],
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
