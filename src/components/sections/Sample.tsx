import { ArrowUpRight, PackageOpen } from "lucide-react";

type SampleProps = {
  title: string;
  body: string;
  cta: string;
  note: string;
};

export function Sample({ title, body, cta, note }: SampleProps) {
  return (
    <section id="sample" className="gutter scroll-mt-20 bg-signal py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-[8rem_1fr_auto] md:gap-10">
        <div className="flex h-16 w-16 items-center justify-center border border-cream/35 text-cream">
          <PackageOpen className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <div>
          <span className="text-label font-medium uppercase tracking-label text-cream/70">
            SAMPLE PROTOCOL / 200–500G
          </span>
          <h2 className="mt-3 font-display text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] text-cream">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-body text-cream/82">{body}</p>
          <p className="mt-2 text-small text-cream/65">{note}</p>
        </div>
        <div className="md:justify-self-end">
          <a
            href="#contact"
            className="group flex min-h-13 w-full items-center justify-center gap-2 border border-cream/45 bg-cream px-7 text-small font-medium uppercase tracking-label text-signal transition-colors hover:bg-ink hover:text-cream sm:w-auto"
          >
            {cta}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
