import type { Locale, Messages } from "./config";

/**
 * Nạp nội dung theo ngôn ngữ. Import động để mỗi trang chỉ kèm đúng
 * file ngôn ngữ của nó, không gói cả ba bản dịch vào một bundle.
 */
export async function getMessages(locale: Locale): Promise<Messages> {
  const messages = await import(`./messages/${locale}.json`);
  return messages.default as Messages;
}
