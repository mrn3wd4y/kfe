import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { FloatingWeChat } from "@/components/layout/FloatingWeChat";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";
import { Terms } from "@/components/sections/Terms";
import { getMessages } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

type TermsPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getMessages(locale);

  return {
    title: `${t.terms.title} | ${site.name}`,
    description: t.terms.subtitle,
    alternates: {
      canonical: `/${locale}/terms/`,
    },
  };
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getMessages(locale);

  return (
    <>
      <Header nav={t.nav} locale={locale} />

      <main className="bg-paper">
        <section className="gutter border-b border-line bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <span className="text-label font-medium uppercase tracking-label text-signal">
              SOLTERRA / TRADE
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-light leading-[1.02] text-signal">
              {t.terms.title}
            </h1>
            <p className="mt-6 max-w-2xl text-body text-muted">{t.terms.subtitle}</p>
          </div>
        </section>

        <Terms
          title={t.terms.title}
          subtitle={t.terms.subtitle}
          items={t.terms.items}
          priceNote={t.terms.priceNote}
          locale={locale}
          compactHeader
        />

        <Contact
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          wechatLabel={t.contact.wechatLabel}
          wechatHint={t.contact.wechatHint}
          emailLabel={t.contact.emailLabel}
          hoursLabel={t.contact.hoursLabel}
          hoursValue={t.contact.hoursValue}
        />
      </main>

      <Footer {...t.footer} locale={locale} />
      <FloatingWeChat label={t.contact.floatingWechat} />
    </>
  );
}
