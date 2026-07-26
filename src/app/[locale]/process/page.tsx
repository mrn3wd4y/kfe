import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { FloatingWeChat } from "@/components/layout/FloatingWeChat";
import { Header } from "@/components/layout/Header";
import { Contact } from "@/components/sections/Contact";
import { Process } from "@/components/sections/Process";
import { getMessages } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

type ProcessPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: ProcessPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getMessages(locale);

  return {
    title: `${t.process.title} | ${site.name}`,
    description: t.process.subtitle,
    alternates: {
      canonical: `/${locale}/process/`,
    },
  };
}

export default async function ProcessPage({ params }: ProcessPageProps) {
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
              SOLTERRA / SUPPLY
            </span>
            <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-light leading-[1.02] text-signal">
              {t.process.title}
            </h1>
            <p className="mt-6 max-w-2xl text-body text-muted">{t.process.subtitle}</p>
          </div>
        </section>

        <Process
          title={t.process.title}
          subtitle={t.process.subtitle}
          steps={t.process.steps}
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
