/** Các loại thông số kỹ thuật. Nhãn hiển thị nằm ở i18n messages `specs.*`. */
export type SpecKey =
  | "variety"
  | "origin"
  | "processing"
  | "screenSize"
  | "moisture"
  | "defectRate"
  | "cuppingScore"
  | "altitude"
  | "lotSize"
  | "packaging"
  | "grade"
  | "useCase"
  | "sample"
  | "supplyMode"
  | "certification"
  | "serviceScope";

/**
 * Dữ liệu cấu trúc của một dòng sản phẩm.
 *
 * Ở đây chỉ giữ thứ KHÔNG cần dịch. Toàn bộ chữ hiển thị — tên, mô tả,
 * giá trị thông số — nằm trong `i18n/messages/*.json` dưới khóa
 * `products.items[slug]`. Nhờ vậy thêm ngôn ngữ mới chỉ phải dịch file JSON.
 */
export interface Product {
  /** Khóa nối sang i18n. Đổi slug thì phải đổi cả trong file ngôn ngữ. */
  slug: string;
  image: string;
  secondaryImage?: string;
  /** Thứ tự hiển thị các thông số trong bảng. */
  specKeys: SpecKey[];
}
