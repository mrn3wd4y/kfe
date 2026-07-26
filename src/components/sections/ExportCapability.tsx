import { Database, FileCheck2, Network, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { Label } from "@/components/ui/Label";

type Item = { title: string; body: string };

const icons = [Network, Database, ShieldCheck, FileCheck2];

const gallery = [
  {
    src: "/images/products/solterra-real-hero-warehouse.jpg",
    label: "Vietnam warehouse",
    className: "lg:row-span-2",
  },
  {
    src: "/images/products/solterra-macro-green-beans.jpg",
    label: "Macro green beans",
    className: "",
  },
  {
    src: "/images/products/solterra-grainpro-packaging.jpg",
    label: "Export packaging",
    className: "",
  },
];

export function ExportCapability({
  items,
  locale,
}: {
  items: Item[];
  locale: string;
}) {
  const isEnglish = locale === "en";

  return (
    <section className="gutter border-t border-line bg-white py-18 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(18rem,0.38fr)_minmax(0,1fr)] lg:items-start">
        <div>
          <Label tone="signal">EXPORT CAPABILITY</Label>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.9rem)] font-light leading-[1.08] text-ink">
            {isEnglish ? "Your Vietnam Supply and QC Team" : "您在越南的采购与质控团队"}
          </h2>
          <p className="mt-5 text-body text-muted">
            {isEnglish
              ? "From the Gia Lai supply base to export delivery, Solterra provides clear, verifiable and long-term supply support."
              : "从 Gia Lai 原料基础到出口交付，Solterra 为中国客户提供清晰、可核验、可持续合作的供应支持。"}
          </p>
        </div>

        <div>
          <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2">
            {gallery.map((item) => (
              <figure
                key={item.label}
                className={`relative overflow-hidden bg-surface-raised ${item.className}`}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 bg-ink-deep/80 px-4 py-2 text-label uppercase tracking-label text-cream">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>

          <ul className="mt-4 grid border-l border-t border-line sm:grid-cols-2">
            {items.map((item, index) => {
              const Icon = icons[index % icons.length];
              return (
                <li
                  key={item.title}
                  className="group border-r border-b border-line bg-paper p-5 transition-colors hover:bg-white"
                >
                  <Icon className="h-6 w-6 text-signal" strokeWidth={1.5} />
                  <h3 className="mt-6 font-display text-heading text-ink">{item.title}</h3>
                  <p className="mt-3 text-small text-muted">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
