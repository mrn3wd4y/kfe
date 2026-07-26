import { notFound } from "next/navigation";

import { Footer } from "@/components/layout/Footer";
import { FloatingWeChat } from "@/components/layout/FloatingWeChat";
import { Header } from "@/components/layout/Header";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { ExportCapability } from "@/components/sections/ExportCapability";
import { ExportProof } from "@/components/sections/ExportProof";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { Sample } from "@/components/sections/Sample";
import { getMessages } from "@/i18n";
import { isLocale } from "@/i18n/config";
import { getProductViews } from "@/lib/products";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = await getMessages(locale);
  const productViews = getProductViews(t);

  return (
    <>
      <Header nav={t.nav} locale={locale} />

      <main>
        <Hero {...t.hero} />
        <Advantages title={t.advantages.title} items={t.advantages.items} locale={locale} />
        <Products
          title={t.products.title}
          subtitle={t.products.subtitle}
          inquireLabel={t.products.inquire}
          specsLabel={t.products.specsLabel}
          products={productViews}
          locale={locale}
        />
        <ExportCapability items={t.advantages.items} locale={locale} />
        <ExportProof locale={locale} />
        <Sample {...t.sample} />
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
