import zh from "./messages/zh.json";

/**
 * Tiếng Trung giản thể là ngôn ngữ chính — khách hàng mục tiêu ở Trung Quốc.
 * Thêm "en" / "vi" vào mảng này rồi tạo file messages tương ứng là xong,
 * không phải sửa component nào.
 */
export const locales = ["zh", "en"] as const;
export const defaultLocale = "zh" satisfies Locale;

export type Locale = (typeof locales)[number];

/** zh.json là nguồn chuẩn của cấu trúc nội dung — mọi bản dịch phải khớp shape này. */
export type Messages = typeof zh;

/** Thẻ lang cho <html>, dùng cho trình đọc màn hình và công cụ tìm kiếm. */
export const htmlLang: Record<Locale, string> = {
  zh: "zh-Hans",
  en: "en",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
