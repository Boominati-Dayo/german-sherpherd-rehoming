import { MetadataRoute } from "next";

const baseUrl = "https://germanshepherdrehomingcenter.com";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          "en-AU": baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/puppies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/puppies`,
        },
      },
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/about`,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/transport`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/transport`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/privacy`,
        },
      },
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/terms`,
        },
      },
    },
  ];

  if (!process.env.MONGODB_URI) {
    return staticPages;
  }

  try {
    const { MongoClient } = await import("mongodb");

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();

    const puppies = await db.collection("puppies").find({
      status: { $ne: "adopted" }
    }).limit(1000).toArray();

    await client.close();

    const puppyPages: MetadataRoute.Sitemap = puppies.map((puppy: any) => ({
      url: `${baseUrl}/puppies/${puppy._id}`,
      lastModified: puppy.updatedAt ? new Date(puppy.updatedAt) : now,
      changeFrequency: "daily" as const,
      priority: 0.8,
      alternates: {
        languages: {
          "en-AU": `${baseUrl}/puppies/${puppy._id}`,
        },
      },
    }));

    return [...staticPages, ...puppyPages];
  } catch (e) {
    return staticPages;
  }
}