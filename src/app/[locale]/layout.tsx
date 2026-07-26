import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { getMessages } from "@/i18n";
import { htmlLang, isLocale, locales, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";

/**
 * next/font/google tải font về LÚC BUILD rồi tự host cùng site — trình duyệt
 * không hề gọi sang Google. An toàn cho người dùng ở Trung Quốc.
 * Chỉ dùng cho chữ Latin; chữ Trung Quốc dùng font hệ thống (xem globals.css).
 */
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Pick<LayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getMessages(locale);

  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: Object.fromEntries(
        locales.map((l) => [htmlLang[l], `/${l}/`]),
      ),
    },
    // Thẻ chia sẻ khi khách forward link vào nhóm WeChat — đây là ấn tượng đầu tiên.
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}/`,
      images: [{ url: site.ogImage, width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={htmlLang[locale as Locale]} className={jost.variable}>
      <body>{children}</body>
    </html>
  );
}
