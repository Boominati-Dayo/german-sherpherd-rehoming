/* Layout Refresh Trigger 2 */
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { seoConfig } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const BASE_URL = "https://germanshepherdrehomingcenter.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: seoConfig.siteName,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.ownerName, url: BASE_URL }],
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
    "geo-position": "Australia",
    "geo-region": "AU",
    "geo-placename": "Australia",
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-AU": BASE_URL,
      "en-US": BASE_URL,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: seoConfig.siteName,
    description: seoConfig.description,
    siteName: seoConfig.siteName,
    locale: "en-AU",
    alternateLocale: "en-US",
    images: [
      {
        url: `${BASE_URL}/thumbnail.png`,
        width: 1200,
        height: 630,
        alt: seoConfig.siteName,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoConfig.siteName,
    description: seoConfig.description,
    creator: seoConfig.twitterHandle,
    images: [`${BASE_URL}/thumbnail.png`],
  },
  other: {
    "geo.region": "AU",
    "geo.placename": "Australia",
    "revisit-after": "7 days",
    "language": "en-AU",
  },
  category: "Pets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        name: "German Shepherd Rehoming Center",
        url: BASE_URL,
        description: "Trusted rehoming service for German Shepherds in Australia. We connect loving families with healthy, vet-checked German Shepherd puppies.",
        inLanguage: "en-AU",
        publisher: {
          "@id": `${BASE_URL}/#organization`,
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/puppies?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${BASE_URL}/#organization`,
        name: "German Shepherd Rehoming Center",
        description: "Trusted rehoming service for German Shepherds in Australia. We connect loving families with healthy, vet-checked German Shepherd puppies. Responsible adoption with health guarantees.",
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/GSRehomingCenterLogo.png`,
          width: 512,
          height: 512,
        },
        image: {
          "@type": "ImageObject",
          url: `${BASE_URL}/thumbnail.png`,
          width: 1200,
          height: 630,
        },
        email: seoConfig.email,
        sameAs: [],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          availableLanguage: ["English", "en-AU"],
          areaServed: {
            "@type": "Country",
            name: "Australia",
            alternateName: "AU",
          },
        },
        areaServed: {
          "@type": "Country",
          name: "Australia",
          alternateName: "AU",
        },
        knowsAbout: [
          "German Shepherd puppies",
          "dog adoption Australia",
          "German Shepherd rehoming",
          "pet rehoming",
          "family dogs",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "German Shepherd Puppies for Adoption",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "German Shepherd Puppy Adoption",
                description: "Adopt a healthy, vet-checked German Shepherd puppy in Australia.",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "German Shepherd Transport",
                description: "Safe transport services for German Shepherd puppies across Australia.",
              },
            },
          ],
        },
        potentialAction: {
          "@type": "SearchAction",
          name: "Find German Shepherd Puppies",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/puppies?q=german shepherd`,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BASE_URL}/#localbusiness`,
        name: "German Shepherd Rehoming Center",
        description: "Professional German Shepherd puppy rehoming center serving all of Australia.",
        url: BASE_URL,
        telephone: "+61",
        email: seoConfig.email,
        address: {
          "@type": "PostalAddress",
          addressCountry: "AU",
          addressRegion: "Australia",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "-33.8688",
          longitude: "151.2093",
        },
        areaServed: {
          "@type": "Country",
          name: "Australia",
          alternateName: "AU",
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "18:00",
        },
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Pet Rehoming Services",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${BASE_URL}/#webpage`,
        name: "German Shepherd Rehoming Center - Home",
        url: BASE_URL,
        description: "Trusted rehoming service for German Shepherds in Australia. Browse available puppies for adoption.",
        inLanguage: "en-AU",
        isPartOf: {
          "@id": `${BASE_URL}/#website`,
        },
        about: {
          "@id": `${BASE_URL}/#organization`,
        },
        mainEntity: {
          "@id": `${BASE_URL}/#organization`,
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${BASE_URL}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: BASE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Available Puppies",
            item: `${BASE_URL}/puppies`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "About Us",
            item: `${BASE_URL}/about`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Transport",
            item: `${BASE_URL}/transport`,
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Contact",
            item: `${BASE_URL}/contact`,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${BASE_URL}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Are the German Shepherd puppies vet checked?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. All our German Shepherd puppies are vet checked, vaccinated, and health guaranteed before adoption.",
            },
          },
          {
            "@type": "Question",
            name: "Do you deliver German Shepherd puppies across Australia?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. We offer safe transport services for German Shepherd puppies to all states and territories across Australia including NSW, VIC, QLD, WA, SA, and TAS.",
            },
          },
          {
            "@type": "Question",
            name: "How do I adopt a German Shepherd puppy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Browse our available puppies, select your preferred puppy, and submit an adoption application. Our team will guide you through the process.",
            },
          },
          {
            "@type": "Question",
            name: "Are German Shepherds good family dogs?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "German Shepherds are one of the best family dogs. They are loyal, intelligent, protective, and great with children when properly trained and socialized.",
            },
          },
          {
            "@type": "Question",
            name: "What documents come with my German Shepherd puppy?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All our puppies come with health records, vaccination certificates, microchip documentation, and a health guarantee.",
            },
          },
        ],
      },
      {
        "@type": "Person",
        name: "Rebecca Herman",
        jobTitle: "Founder - German Shepherd Rehoming Center",
        worksFor: {
          "@id": `${BASE_URL}/#organization`,
        },
        nationality: {
          "@type": "Country",
          name: "AU",
        },
      },
    ],
  };

  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          href="/thumbnail.png"
          fetchPriority="high"
        />
        <link rel="preload" as="font" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" crossOrigin="anonymous" />
        <link rel="hreflang" hrefLang="en-AU" href={BASE_URL} />
        <link rel="hreflang" hrefLang="x-default" href={BASE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Toaster position="top-right" />
        {children}
        <script dangerouslySetInnerHTML={{
          __html: `
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '14e81f3733646bb54f501f447d38d96d21e29bdc';
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `
        }} />
      </body>
    </html>
  );
}