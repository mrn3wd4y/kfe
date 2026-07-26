import { ArrowUpRight, CheckCircle2, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import type { ProductView } from "@/lib/products";

type ProductsProps = {
  title: string;
  subtitle: string;
  inquireLabel: string;
  specsLabel: string;
  products: ProductView[];
  locale: string;
};

export function Products({
  title,
  subtitle,
  inquireLabel,
  products,
  locale,
}: ProductsProps) {
  return (
    <section
      id="products"
      className="section-rhythm gutter scroll-mt-20 border-t border-line bg-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <Label tone="signal">SOLTERRA / 02</Label>
          <Heading level={2} className="mt-4 !text-signal">
            {title}
          </Heading>
          <p className="mx-auto mt-4 max-w-2xl text-body text-muted">{subtitle}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => {
            const highlights = product.specs.slice(0, 2);
            const detailHref = `/${locale}/products/${product.slug}/`;

            return (
              <article
                key={product.slug}
                className="group relative flex min-h-full flex-col overflow-hidden rounded-[8px] border border-line bg-white shadow-[0_14px_34px_rgba(43,33,27,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-signal/45 hover:shadow-[0_22px_52px_rgba(43,33,27,0.13)]"
              >
                <Link
                  href={detailHref}
                  className="relative block aspect-[1.08] overflow-hidden bg-surface-raised"
                  aria-label={product.name}
                >
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(26,18,13,0.02)_35%,rgba(26,18,13,0.72))] opacity-90 transition-opacity group-hover:opacity-100" />
                  <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4">
                    <span className="max-w-[72%] text-label font-medium uppercase tracking-label text-cream/82">
                      {product.tagline}
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-signal shadow-[0_12px_24px_rgba(0,0,0,0.18)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-display text-[clamp(1.65rem,2.7vw,2.25rem)] font-light leading-[1.08] text-ink">
                    <Link href={detailHref} className="transition-colors hover:text-signal">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-3 line-clamp-2 text-small text-muted">{product.body}</p>

                  <div className="mt-5 grid gap-2">
                    {highlights.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex items-start gap-2 rounded-[6px] bg-paper px-3 py-2 text-small"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                        <span>
                          <span className="text-muted">{spec.label}: </span>
                          <span className="font-medium text-ink">{spec.value}</span>
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6">
                    <ButtonLink href={`/${locale}/#contact`} block>
                      <MessageCircleMore className="h-4 w-4" strokeWidth={1.7} />
                      {inquireLabel}
                    </ButtonLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
