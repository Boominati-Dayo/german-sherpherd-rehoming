import { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const seoConfig = {
    siteName: "German Shepherd Rehoming Center",
    siteNameShort: "GSR Center",
    ownerName: "German Shepherd Rehoming Center",
    tagline: "Finding Loving Forever Homes for German Shepherds",
    description: "German Shepherd Rehoming Center - Trusted rehoming service for German Shepherds in Australia. We connect loving families with healthy, vet-checked German Shepherd puppies. Responsible adoption with health guarantees.",
    keywords: [
        "German Shepherd Rehoming Center",
        "German Shepherd puppies rehoming",
        "GSR Rehoming Center",
        "German Shepherd adoption",
        "German Shepherd rehoming",
        "German Shepherd rescue",
        "German Shepherd puppies",
        "German Shepherd puppies for adoption",
        "German Shepherd puppy adoption",
        "German Shepherd adoption Australia",
        "German Shepherd puppy for adoption Australia",
        "German Shepherd rescue Australia",
        "German Shepherd rehoming service Australia",
        "German Shepherd puppies Australia",
        "German Shepherd health guaranteed",
        "vet checked German Shepherd puppies",
        "healthy German Shepherd puppies for adoption",
        "registered German Shepherd puppies",
        "family German Shepherd puppies",
        "German Shepherd companion dog",
        "German Shepherd family pet",
        "German Shepherd adoption near me Australia",
        "adopt a German Shepherd",
        "rehome a German Shepherd",
        "find a German Shepherd puppy",
        "German Shepherd rehoming center Australia",
    ],
    socialImage: `${siteUrl}/thumbnail.png`,
    twitterHandle: "@GSRCenter",
    email: "admin@germanshepherdrehomingcenter.com",
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
            locale: "en_AU",
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
