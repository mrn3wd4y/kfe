import { ArrowLeft, ArrowUpRight, CheckCircle2, MessageCircleMore } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { FloatingWeChat } from "@/components/layout/FloatingWeChat";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Label } from "@/components/ui/Label";
import { products } from "@/data/products";
import { getMessages } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { getProductView } from "@/lib/products";
import { site } from "@/lib/site";

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    products.map((product) => ({
      locale,
      slug: product.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};

  const t = await getMessages(locale);
  const product = getProductView(t, slug);
  if (!product) return {};

  return {
    title: `${product.name} | ${site.name}`,
    description: product.body,
    alternates: {
      canonical: `/${locale}/products/${slug}/`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getMessages(locale);
  const product = getProductView(t, slug);
  if (!product) notFound();

  const highlights = product.specs.slice(0, 3);
  const isEnglish = locale === "en";

  return (
    <>
      <Header nav={t.nav} locale={locale} />

      <main className="bg-paper">
        <section className="gutter border-b border-line bg-white py-10 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <Link
              href={`/${locale}/#products`}
              className="inline-flex items-center gap-2 text-small font-medium text-muted transition-colors hover:text-signal"
            >
              <ArrowLeft className="h-4 w-4" />
              {isEnglish ? "Back to product catalog" : "返回产品目录"}
            </Link>

            <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.75fr)] lg:items-start">
              <div>
                <div className="relative aspect-[1.35] overflow-hidden bg-surface-raised">
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    preload
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <span className="absolute top-5 left-5 bg-white px-3 py-2 text-label font-medium uppercase tracking-label text-signal shadow-sm">
                    B2B Green Coffee
                  </span>
                </div>

                {product.secondaryImage ? (
                  <div className="mt-4 relative aspect-[2.4] overflow-hidden bg-surface-raised">
                    <Image
                      src={product.secondaryImage}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>

              <aside className="border border-line bg-paper p-6 sm:p-8">
                <Label tone="signal">{product.tagline}</Label>
                <h1 className="mt-4 font-display text-[clamp(2.45rem,5vw,4.6rem)] font-light leading-[1.02] text-signal">
                  {product.name}
                </h1>
                <p className="mt-6 text-body text-muted">{product.body}</p>

                <div className="mt-7 grid gap-2">
                  {highlights.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-start gap-2 border border-line bg-white px-4 py-3 text-small"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                      <span>
                        <span className="text-muted">{spec.label}: </span>
                        <span className="font-medium text-ink">{spec.value}</span>
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <ButtonLink href={`/${locale}/#contact`} block>
                    <MessageCircleMore className="h-4 w-4" strokeWidth={1.7} />
                    {t.products.inquire}
                  </ButtonLink>
                  <Link
                    href={`/${locale}/#sample`}
                    className="inline-flex min-h-13 items-center justify-center gap-2 border border-line bg-white px-7 text-small font-medium uppercase tracking-label text-ink transition-all hover:-translate-y-0.5 hover:border-signal hover:text-signal"
                  >
                    {isEnglish ? "Request Sample" : "申请样品"}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="section-rhythm gutter bg-paper">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[18rem_1fr]">
            <div>
              <Label tone="signal">Product Detail</Label>
              <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.08] text-ink">
                {isEnglish ? "Specifications and Lot Information" : "规格与批次信息"}
              </h2>
            </div>
            <div className="border border-line bg-white p-5 sm:p-8">
              <DataTable rows={product.specs} />
            </div>
          </div>
        </section>
      </main>

      <Footer {...t.footer} locale={locale} />
      <FloatingWeChat label={t.contact.floatingWechat} />
    </>
  );
}
