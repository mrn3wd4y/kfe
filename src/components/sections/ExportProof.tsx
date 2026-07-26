import { BadgeCheck, FileText, Ship, Store } from "lucide-react";

const cards = {
  zh: [
    {
      icon: FileText,
      title: "出口文件",
      body: "C/O、植物检疫证书、装箱单与商业发票按合同批次准备。",
    },
    {
      icon: Ship,
      title: "中国主要港口",
      body: "支持 FOB Ho Chi Minh Port 及 CIF 至中国主要港口的合作条款。",
    },
    {
      icon: BadgeCheck,
      title: "批次核验",
      body: "水分、筛网、瑕疵率、杯测记录随批次沟通确认。",
    },
    {
      icon: Store,
      title: "仅限批发",
      body: "网站不设购物车与在线支付，所有报价、样品和合同通过微信或邮件确认。",
    },
  ],
  en: [
    {
      icon: FileText,
      title: "Export Documents",
      body: "C/O, phytosanitary certificate, packing list and commercial invoice are prepared by contract lot.",
    },
    {
      icon: Ship,
      title: "Global Destination Ports",
      body: "FOB Ho Chi Minh Port and CIF terms to major destination ports are supported.",
    },
    {
      icon: BadgeCheck,
      title: "Lot Verification",
      body: "Moisture, screen size, defect rate and cupping records are confirmed by lot.",
    },
    {
      icon: Store,
      title: "Wholesale Only",
      body: "No online cart or payment. Quotes, samples and contracts are confirmed via WeChat or email.",
    },
  ],
};

export function ExportProof({ locale }: { locale: string }) {
  const isEnglish = locale === "en";
  const localizedCards = isEnglish ? cards.en : cards.zh;

  return (
    <section className="gutter border-t border-line bg-paper py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(18rem,0.35fr)_1fr] lg:items-center">
        <div>
          <span className="text-label font-medium uppercase tracking-label text-signal">
            EXPORT STANDARD
          </span>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.08] text-ink">
            {isEnglish
              ? "Wholesale Export Flow for International Buyers"
              : "面向中国买家的批发出口流程"}
          </h2>
        </div>

        <div className="grid border-l border-t border-line sm:grid-cols-2">
          {localizedCards.map(({ icon: Icon, title, body }) => (
            <article key={title} className="border-r border-b border-line bg-white p-5">
              <Icon className="h-6 w-6 text-signal" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-heading text-ink">{title}</h3>
              <p className="mt-3 text-small text-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
