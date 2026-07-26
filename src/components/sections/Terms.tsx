import { CheckCircle2, FileCheck2, Ship } from "lucide-react";

import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type TermsProps = {
  title: string;
  subtitle: string;
  items: { label: string; value: string }[];
  priceNote: string;
  locale: string;
  compactHeader?: boolean;
};

const readiness = {
  zh: ["原产地证 C/O", "植物检疫证书", "装箱单与商业发票"],
  en: ["Certificate of Origin C/O", "Phytosanitary Certificate", "Packing List and Commercial Invoice"],
};

export function Terms({ title, subtitle, items, priceNote, locale, compactHeader }: TermsProps) {
  const isEnglish = locale === "en";
  const readinessItems = isEnglish ? readiness.en : readiness.zh;

  return (
    <Section
      id="terms"
      index="04"
      title={compactHeader ? undefined : title}
      subtitle={compactHeader ? undefined : subtitle}
      surface
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(19rem,0.8fr)] lg:gap-14">
        <dl className="border-t border-line">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="grid gap-2 border-b border-line py-5 sm:grid-cols-[3rem_9rem_1fr] sm:items-baseline sm:gap-5"
            >
              <span className="tabular text-label text-signal">0{index + 1}</span>
              <dt className="text-small text-muted">{item.label}</dt>
              <dd className="text-body text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <aside className="border border-line bg-paper p-6 shadow-[0_12px_40px_rgba(43,33,27,0.06)] sm:p-8">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-label uppercase tracking-label text-signal">
                EXPORT READY
              </span>
              <h3 className="mt-3 font-display text-heading text-ink">
                {isEnglish ? "Export Document Support" : "出口文件支持"}
              </h3>
            </div>
            <Ship className="h-7 w-7 text-signal" strokeWidth={1.4} />
          </div>

          <ul className="mt-8 border-t border-line">
            {readinessItems.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 border-b border-line py-4 text-small text-ink"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-signal" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex items-start gap-3">
            <FileCheck2 className="mt-1 h-4 w-4 shrink-0 text-amber" />
            <Text size="small">{priceNote}</Text>
          </div>
        </aside>
      </div>
    </Section>
  );
}
