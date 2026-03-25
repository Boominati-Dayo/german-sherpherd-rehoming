import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://rebeccahermanfostering.com";

export const seoConfig = {
    siteName: "Rebecca Herman's Fostering",
    siteNameShort: "Rebecca Herman's Fostering",
    ownerName: "Rebecca Herman",
    tagline: "Finding Loving Forever Homes for Cavalier King Charles Spaniels",
    description: "Rebecca Herman's Fostering specializes in finding loving forever homes for Cavalier King Charles Spaniel puppies. Responsible adoption with health guarantees.",
    keywords: [
        "Cavalier King Charles Spaniel",
        "Cavalier King Charles Spaniel adoption",
        "Cavalier King Charles Spaniel rehoming",
        "Cavalier King Charles Spaniel puppies",
        "Cavalier King Charles Spaniel puppies for adoption",
        "Cavalier King Charles Spaniel rescue",
        "Cavalier King Charles Spaniel for sale",
        "Cavalier puppies",
        "Cavalier rescue",
        "King Charles Spaniel",
        "Cavalier dog",
        "Cavalier Spaniel",
        "Cavalier adoption",
        "Cavalier rehoming",
        "Rebecca Herman Fostering",
    ],
    socialImage: `${siteUrl}/thumbnail.png`,
    twitterHandle: "@RebeccaHerman",
    phone: "+1 (504) 358-1381",
    email: "admin@rebeccahermanfostering.com",
};

export function generatePageMetadata({
    title,
    description,
    image,
    noIndex = false,
}: {
    title: string;
    description?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const pageTitle = title.includes(seoConfig.siteName) 
        ? title 
        : `${title} | ${seoConfig.siteName}`;
    
    const pageDescription = description || seoConfig.description;
    const ogImage = image || seoConfig.socialImage;

    return {
        title: pageTitle,
        description: pageDescription,
        keywords: seoConfig.keywords,
        authors: [{ name: seoConfig.ownerName }],
        creator: seoConfig.ownerName,
        publisher: seoConfig.siteName,
        robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
        openGraph: {
            type: "website",
            locale: "en_US",
            url: siteUrl,
            siteName: seoConfig.siteName,
            title: pageTitle,
            description: pageDescription,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            creator: seoConfig.twitterHandle,
            images: [ogImage],
        },
        alternates: {
            canonical: siteUrl,
        },
    };
}

export function generatePuppyMetadata({
    puppyName,
    puppyBreed,
    puppyAge,
    puppyDescription,
    puppyImage,
    puppyId,
}: {
    puppyName: string;
    puppyBreed: string;
    puppyAge: string;
    puppyDescription: string;
    puppyImage: string;
    puppyId: string;
}): Metadata {
    const title = `${puppyName} - ${puppyBreed} Puppy for Adoption`;
    const description = puppyDescription 
        ? `${puppyName} is a ${puppyAge} ${puppyBreed} puppy available for adoption. ${puppyDescription.substring(0, 150)}...`
        : `Meet ${puppyName}, a adorable ${puppyAge} ${puppyBreed} puppy looking for a loving forever home. Apply now to adopt!`;
    
    return generatePageMetadata({
        title,
        description,
        image: puppyImage || seoConfig.socialImage,
    });
}
