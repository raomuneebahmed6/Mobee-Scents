import type { MetadataRoute } from "next";

const siteUrl = "https://mobeescents.com";

const routes = [
  "",
  "/shop",
  "/collections",
  "/about",
  "/contact",
  "/wishlist",
  "/privacy-policy",
  "/terms-and-conditions",
  "/shipping-policy",
  "/return-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
