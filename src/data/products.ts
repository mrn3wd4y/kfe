import type { Product } from "@/types/product";

/**
 * Danh mục sản phẩm và dịch vụ B2B chính.
 *
 * Thêm dòng sản phẩm mới:
 *   1. Thêm một object vào mảng dưới đây.
 *   2. Thêm khóa cùng tên `slug` vào `products.items` trong MỌI file
 *      `src/i18n/messages/*.json` (tên, tagline, mô tả, imageAlt, specValues).
 *   3. Bỏ ảnh vào `public/images/products/` — nén sẵn sang WebP.
 */
export const products: Product[] = [
  {
    slug: "robusta-green",
    image: "/images/products/solterra-macro-green-beans.jpg",
    secondaryImage: "/images/products/solterra-grainpro-packaging.jpg",
    specKeys: [
      "variety",
      "origin",
      "screenSize",
      "moisture",
      "defectRate",
      "useCase",
    ],
  },
  {
    slug: "arabica-green",
    image: "/images/products/solterra-real-specialty-lots.jpg",
    secondaryImage: "/images/products/solterra-macro-green-beans.jpg",
    specKeys: [
      "variety",
      "origin",
      "processing",
      "altitude",
      "cuppingScore",
      "useCase",
    ],
  },
  {
    slug: "specialty-lots",
    image: "/images/products/solterra-grainpro-packaging.jpg",
    secondaryImage: "/images/products/solterra-macro-green-beans.jpg",
    specKeys: [
      "cuppingScore",
      "origin",
      "processing",
      "altitude",
      "lotSize",
      "packaging",
    ],
  },
  {
    slug: "liberica-green",
    image: "/images/products/solterra-real-robusta-green.jpg",
    secondaryImage: "/images/products/solterra-grainpro-packaging.jpg",
    specKeys: [
      "grade",
      "variety",
      "origin",
      "screenSize",
      "supplyMode",
      "useCase",
    ],
  },
  {
    slug: "liberica-specialty",
    image: "/images/generated/solterra-qc-inspection-green-coffee.jpg",
    secondaryImage: "/images/products/solterra-real-specialty-lots.jpg",
    specKeys: [
      "certification",
      "origin",
      "processing",
      "altitude",
      "sample",
      "packaging",
    ],
  },
  {
    slug: "liberica-contract",
    image: "/images/products/solterra-real-hero-warehouse.jpg",
    secondaryImage: "/images/products/solterra-macro-green-beans.jpg",
    specKeys: [
      "serviceScope",
      "variety",
      "origin",
      "supplyMode",
      "sample",
      "packaging",
    ],
  },
];
