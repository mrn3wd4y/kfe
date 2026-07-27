import type { MetadataRoute } from "next";

import { products } from "@/data/products";
import { locales } from "@/i18n/config";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const homePages = locales.map((locale) => ({
    url: `${site.url}/${locale}/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  const productPages = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${site.url}/${locale}/products/${product.slug}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  );

  const aboutPages = locales.map((locale) => ({
    url: `${site.url}/${locale}/about/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const termsPages = locales.map((locale) => ({
    url: `${site.url}/${locale}/terms/`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  return [...homePages, ...aboutPages, ...termsPages, ...productPages];
}
