import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://rebeccahermanfostering.com";

export const seoConfig = {
    siteName: "Cavalier King Charles Rehoming Center",
    siteNameShort: "CKC Rehoming Center",
    ownerName: "Cavalier King Charles Rehoming Center",
    tagline: "Finding Loving Forever Homes for Cavalier King Charles Spaniels",
    description: "Cavalier King Charles Rehoming Center - Trusted rehoming service for Cavalier King Charles Spaniels. We connect loving families with healthy, vet-checked Cavalier puppies. Responsible adoption with health guarantees.",
    keywords: [
        // Full name variations
        "Cavalier King Charles Rehoming Center",
        "Cavalier King Charles Spaniel Rehoming Center",
        "CKC Rehoming Center",
        // Full name keywords
        "Cavalier King Charles Spaniel adoption",
        "Cavalier King Charles Spaniel rehoming",
        "Cavalier King Charles Spaniel puppies for adoption",
        "Cavalier King Charles Spaniel rescue",
        "Cavalier King Charles Spaniel puppies",
        // Short name variations
        "Cavalier adoption",
        "Cavalier rehoming",
        "Cavalier rescue",
        "Cavalier puppies",
        "Cavalier puppy adoption",
        "Cavalier King Charles adoption",
        // Specific breed terms
        "King Charles Spaniel",
        "King Charles Spaniel adoption",
        "King Charles Spaniel puppies",
        "Cavalier Spaniel",
        "Cavalier dog",
        "Cavalier King Charles dog",
        // Geographic & service terms
        "Cavalier King Charles Spaniel near me",
        "Cavalier puppy for adoption near me",
        "Cavalier rescue near me",
        " Cavalier King Charles Spaniel adoption center",
        "Cavalier rehoming service",
        // Health & quality terms
        " Cavalier King Charles Spaniel health guaranteed",
        "vet checked Cavalier puppies",
        "healthy Cavalier puppies for adoption",
        "registered Cavalier King Charles Spaniel",
        // Family & companion terms
        "family Cavalier puppies",
        "Cavalier companion dog",
        "Cavalier King Charles Spaniel family pet",
        // Action terms
        "adopt a Cavalier",
        "rehome a Cavalier",
        "find a Cavalier puppy",
        "Cavalier King Charles Spaniel for sale",
    ],
    socialImage: `${siteUrl}/thumbnail.png`,
    twitterHandle: "@CKCRehoming",
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
