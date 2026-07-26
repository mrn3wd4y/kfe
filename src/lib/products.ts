import { products } from "@/data/products";
import type { Messages } from "@/i18n/config";
import type { SpecKey } from "@/types/product";

type ProductCopy = {
  name: string;
  tagline: string;
  body: string;
  imageAlt: string;
  specValues: Partial<Record<SpecKey, string>>;
};

export type ProductView = {
  slug: string;
  image: string;
  secondaryImage?: string;
  imageAlt: string;
  name: string;
  tagline: string;
  body: string;
  specs: { label: string; value: string }[];
};

export function getProductViews(messages: Messages): ProductView[] {
  const productCopy = messages.products.items as unknown as Record<string, ProductCopy>;

  return products.map((product) => {
    const copy = productCopy[product.slug];

    return {
      slug: product.slug,
      image: product.image,
      secondaryImage: product.secondaryImage,
      imageAlt: copy.imageAlt,
      name: copy.name,
      tagline: copy.tagline,
      body: copy.body,
      specs: product.specKeys
        .map((key) => ({
          label: messages.specs[key],
          value: copy.specValues[key] ?? "",
        }))
        .filter((spec) => spec.value !== ""),
    };
  });
}

export function getProductView(messages: Messages, slug: string) {
  return getProductViews(messages).find((product) => product.slug === slug);
}
