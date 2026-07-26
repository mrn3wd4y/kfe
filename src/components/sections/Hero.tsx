import { ArrowDownRight, ArrowUpRight, FlaskConical, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

type HeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const signals = [
  { icon: MapPin, value: "Gia Lai", label: "Robusta origin" },
  { icon: FlaskConical, value: "Stable lots", label: "Supply rhythm" },
  { icon: ShieldCheck, value: "Trusted", label: "Export partner" },
];

export function Hero({
  eyebrow,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: HeroProps) {
  return (
    <section className="bg-paper">
      <div className="relative min-h-[calc(100svh-4.5rem)] overflow-hidden bg-ink-deep sm:min-h-[760px]">
        <Image
          src="/images/products/solterra-real-hero-warehouse.jpg"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-zoom object-cover object-[58%_center]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ink-deep/42" />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(26,18,13,0.82),rgba(26,18,13,0.46)_48%,rgba(26,18,13,0.1))] lg:w-[78%]"
        />

        <div className="gutter relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-7xl flex-col justify-end py-8 sm:min-h-[760px] sm:py-12">
          <div className="max-w-4xl">
            <div className="mb-7 flex flex-wrap items-center gap-3">
              <span className="bg-cream px-3 py-1.5 text-label font-medium uppercase tracking-label text-signal">
                {eyebrow}
              </span>
              <span className="text-label uppercase tracking-label text-cream/70">
                B2B Export / China Market
              </span>
            </div>

            <Heading
              level={1}
              className="max-w-5xl !text-[clamp(2.45rem,6vw,5.65rem)] !font-light !leading-[1.02] !text-cream"
            >
              {title}
            </Heading>
            <Text
              tone="cream"
              className="mt-7 max-w-2xl text-[1.05rem] !text-cream/88 sm:text-[1.18rem]"
            >
              {subtitle}
            </Text>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#contact" block>
                {ctaPrimary}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
              <ButtonLink href="#sample" variant="secondary" block>
                {ctaSecondary}
                <ArrowDownRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          <div className="mt-12 grid border border-white/22 bg-cream/95 sm:grid-cols-3 lg:max-w-3xl">
            {signals.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-3 border-b border-line p-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
              >
                <Icon className="h-5 w-5 text-signal" strokeWidth={1.5} />
                <span>
                  <span className="block text-label uppercase tracking-label text-muted">
                    {label}
                  </span>
                  <span className="mt-1 block text-small font-medium text-ink">{value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
