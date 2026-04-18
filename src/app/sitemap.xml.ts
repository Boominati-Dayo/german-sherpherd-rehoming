import { MetadataRoute } from "next";

const baseUrl = "http://localhost:3000";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/puppies`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/transport`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI not set");
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
    }));

    return [...staticPages, ...puppyPages];
  } catch (e) {
    console.error("Sitemap generation error:", e);
    return staticPages;
  }
}