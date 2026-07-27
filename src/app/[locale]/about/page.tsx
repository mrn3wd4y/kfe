import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { FloatingWeChat } from "@/components/layout/FloatingWeChat";
import { Header } from "@/components/layout/Header";
import { getMessages } from "@/i18n";
import { isLocale, locales } from "@/i18n/config";
import { site } from "@/lib/site";

const aboutImages = [
  "/images/about_us/nang-chat-ca-phe-dac-san-gia-lai.webp",
  "/images/about_us/nang-chat-ca-phe-dac-san-gia-lai-1.webp",
  "/images/about_us/nang-chat-ca-phe-dac-san-gia-lai-2-17380366623521134638735.webp",
];

const aboutAnnotations = {
  en: {
    origin: "Origin note / Gia Lai",
    altitude: "Highland profile / 700-800m",
    dossier: "Supplier dossier",
    gallery: [
      ["Field source", "Coffee materials rooted in Gia Lai origin"],
      ["Lot view", "Selected highland lots for stable export supply"],
      ["Farm standard", "4C, organic direction and cleaner processing"],
    ],
    dataLabel: "Data point",
    profileLabel: "Flavor profile",
    highlightLabel: "Export proof",
  },
  zh: {
    origin: "产地标注 / GIA LAI",
    altitude: "高原风土 / 700-800M",
    dossier: "供应商档案",
    gallery: [
      ["产地来源", "扎根 Gia Lai 的咖啡原料基础"],
      ["批次观察", "面向稳定出口供应的高原批次"],
      ["农场标准", "4C、organic 方向与更洁净的处理"],
    ],
    dataLabel: "数据标注",
    profileLabel: "风味档案",
    highlightLabel: "出口依据",
  },
} as const;

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = await getMessages(locale);

  return {
    title: `${t.aboutPage.title} | ${site.name}`,
    description: t.aboutPage.subtitle,
    alternates: {
      canonical: `/${locale}/about/`,
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getMessages(locale);
  const annotations = locale === "en" ? aboutAnnotations.en : aboutAnnotations.zh;

  return (
    <>
      <Header nav={t.nav} locale={locale} />

      <main className="bg-paper">
        <section className="gutter relative overflow-hidden border-b border-line bg-ink-deep py-18 text-cream sm:py-28">
          <Image
            src={aboutImages[0]}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-46"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-ink-deep/66" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,18,13,0.96),rgba(26,18,13,0.7)_54%,rgba(26,18,13,0.84))]"
          />
          <div
            aria-hidden="true"
            className="absolute left-6 top-8 hidden h-24 w-px bg-amber-bright/55 lg:block"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-10 right-8 hidden h-px w-40 bg-amber-bright/50 lg:block"
          />

          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="border border-amber-bright/50 bg-cream px-3 py-2 text-label font-semibold uppercase tracking-label text-signal">
                  {t.aboutPage.eyebrow}
                </span>
                <span className="border border-white/18 bg-white/10 px-3 py-2 text-label uppercase tracking-label text-cream/72 backdrop-blur-sm">
                  {annotations.origin}
                </span>
              </div>
              <h1 className="mt-5 max-w-4xl font-display text-[clamp(2.8rem,6vw,5.8rem)] font-light leading-[1.02] text-cream">
                {t.aboutPage.title}
              </h1>
              <p className="mt-6 max-w-3xl text-body text-cream/78">{t.aboutPage.subtitle}</p>
            </div>

            <aside className="relative border border-white/18 border-l-4 border-l-amber-bright bg-white/10 p-6 backdrop-blur-sm sm:p-8">
              <span className="absolute -left-px -top-px bg-amber-bright px-3 py-2 text-label font-semibold uppercase tracking-label text-ink">
                {annotations.dossier}
              </span>
              <span className="mt-8 block text-label uppercase tracking-label text-amber-bright">
                {annotations.altitude}
              </span>
              <p className="mt-5 font-display text-[clamp(1.45rem,2vw,2rem)] font-light leading-tight text-cream">
                {t.aboutPage.manifesto}
              </p>
            </aside>
          </div>
        </section>

        <section className="gutter bg-white py-14 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <span className="text-label font-medium uppercase tracking-label text-signal">
                Supplier Story
              </span>
              <h2 className="mt-4 font-display text-title font-light text-signal">
                {t.aboutPage.storyTitle}
              </h2>
            </div>

            <div className="border-l border-line pl-6 text-body leading-8 text-ink sm:pl-8">
              {t.aboutPage.story.map((paragraph) => (
                <p key={paragraph} className="border-b border-line py-5 first:pt-0 last:border-b-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter border-y border-line bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-4 md:grid-cols-3">
              {aboutImages.map((src, index) => (
                <div
                  key={src}
                  className="group relative aspect-[1.35] overflow-hidden border border-line bg-surface-raised"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink-deep/68 via-transparent to-ink-deep/10 opacity-85 transition-opacity group-hover:opacity-95"
                  />
                  <span className="absolute left-4 top-4 border border-cream/40 bg-cream px-3 py-2 text-label font-semibold uppercase tracking-label text-signal shadow-sm">
                    {annotations.gallery[index][0]}
                  </span>
                  <div className="absolute bottom-4 left-4 right-4 border-l-2 border-amber-bright bg-ink-deep/72 px-4 py-3 text-small leading-5 text-cream backdrop-blur-sm">
                    {annotations.gallery[index][1]}
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute right-4 top-4 h-4 w-4 border border-amber-bright/80"
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 grid gap-8 border border-line bg-ink-deep p-6 text-cream sm:p-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
              <div>
                <span className="text-label font-medium uppercase tracking-label text-signal">
                  Highlands Coffee Base
                </span>
                <h2 className="mt-4 font-display text-title font-light text-cream">
                  {t.aboutPage.regionTitle}
                </h2>
              </div>

              <div>
                <p className="text-body leading-8 text-cream/82">{t.aboutPage.regionBody}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {t.aboutPage.regionStats.map((item, index) => (
                    <div key={item.label} className="relative border-t border-white/18 pt-5">
                      <span className="absolute -top-3 left-0 bg-ink-deep pr-3 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-bright">
                        {annotations.dataLabel} / 0{index + 1}
                      </span>
                      <div className="font-display text-[clamp(1.8rem,3vw,2.7rem)] font-medium leading-none text-amber-bright">
                        {item.value}
                      </div>
                      <p className="mt-3 text-label uppercase tracking-label text-cream/62">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="gutter bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
              <div>
                <span className="text-label font-medium uppercase tracking-label text-signal">
                  Coffee Character
                </span>
                <h2 className="mt-4 font-display text-title font-light text-signal">
                  {t.aboutPage.characterTitle}
                </h2>
              </div>
              <p className="mt-5 text-body leading-8 text-ink">{t.aboutPage.characterIntro}</p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {t.aboutPage.characterItems.map((item, index) => (
                <article
                  key={item.label}
                  className="group relative border border-line bg-paper p-6 transition-colors hover:border-signal hover:bg-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-signal/70">
                      {annotations.profileLabel} / 0{index + 1}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-1 h-2.5 w-2.5 border border-signal bg-white transition-colors group-hover:bg-signal"
                    />
                  </div>
                  <h3 className="mt-5 text-small font-semibold uppercase tracking-label text-ink">
                    {item.label}
                  </h3>
                  <p className="mt-4 text-small leading-6 text-muted">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gutter bg-signal py-14 text-cream sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
            {t.aboutPage.highlights.map((item, index) => (
              <article
                key={item.label}
                className="relative border border-white/18 bg-white/8 p-6 sm:p-8"
              >
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-amber-bright">
                  {annotations.highlightLabel} / 0{index + 1}
                </span>
                <div className="font-display text-[clamp(2rem,4vw,3.4rem)] font-medium leading-none text-cream">
                  {item.value}
                </div>
                <h3 className="mt-5 text-small font-semibold uppercase tracking-label text-cream">
                  {item.label}
                </h3>
                <p className="mt-3 text-small leading-6 text-cream/72">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer {...t.footer} locale={locale} />
      <FloatingWeChat label={t.contact.floatingWechat} />
    </>
  );
}
