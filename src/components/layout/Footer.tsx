import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

import { SolterraLogo } from "@/components/brand/SolterraLogo";
import { site } from "@/lib/site";

type FooterProps = {
  tagline: string;
  rights: string;
  companyLabel: string;
  companyName: string;
  taxLabel: string;
  addressLabel: string;
  locale: string;
};

const aboutLinks = [
  { hash: "advantages", label: "About us" },
  { hash: "products", label: "Products" },
  { hash: "process", label: "Supply Process" },
  { hash: "terms", label: "Trade Terms" },
  { hash: "contact", label: "Contact us" },
];

const productLinks = [
  { slug: "robusta-green", label: "Gia Lai Robusta" },
  { slug: "arabica-green", label: "Vietnam Arabica" },
  { slug: "specialty-lots", label: "Specialty Lots" },
  { slug: "commercial-grade", label: "Commercial Grade" },
  { slug: "custom-sourcing", label: "Contract Supply" },
];

export function Footer({
  tagline,
  rights,
  companyLabel,
  companyName,
  taxLabel,
  addressLabel,
  locale,
}: FooterProps) {
  const localizedProductLinks = productLinks.map((link) => ({
    href: `/${locale}/products/${link.slug}/`,
    label: link.label,
  }));
  const localizedAboutLinks = aboutLinks.map((link) => ({
    href:
      link.hash === "process"
        ? `/${locale}/process/`
        : link.hash === "terms"
          ? `/${locale}/terms/`
          : `/${locale}/#${link.hash}`,
    label: link.label,
  }));

  return (
    <footer className="relative overflow-hidden border-t border-line-dark bg-ink-deep text-cream">
      <Image
        src="/images/products/solterra-real-hero-warehouse.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-35"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink-deep/78" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(26,18,13,0.94),rgba(26,18,13,0.74)_42%,rgba(26,18,13,0.9))]"
      />

      <div className="gutter relative mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-[1.15fr_0.7fr_0.9fr_1.1fr] xl:gap-14">
          <div>
            <div className="inline-flex items-center gap-3">
              <SolterraLogo className="h-12 w-12 shrink-0 text-amber-bright" />
              <span>
                <span className="block font-display text-[1.1rem] font-medium tracking-brand text-cream">
                  {site.name}
                </span>
                <span className="mt-1 block text-[0.64rem] uppercase tracking-label text-cream/58">
                  Vietnam Green Coffee
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-small text-cream/78">
              Solterra is a Vietnam green coffee supplier rooted in Gia Lai and
              Tây Nguyên, supplying trusted, stable and verifiable green coffee
              lots for B2B buyers.
            </p>

            <a
              href={`/${locale}/#contact`}
              className="group mt-6 inline-flex items-center gap-2 text-small font-medium text-amber-bright"
            >
              Contact Solterra
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <FooterColumn title="ABOUT US" links={localizedAboutLinks} />
          <FooterColumn title="PRODUCTS" links={localizedProductLinks} />

          <div>
            <h3 className="text-small font-semibold uppercase tracking-label text-cream">
              SOLTERRA OFFICE
            </h3>
            <ul className="mt-5 space-y-3 text-small text-cream/82">
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-bright" />
                <span>
                  <span className="block text-cream/55">{companyLabel}</span>
                  {companyName}
                  <span className="mt-1 block text-cream/52">{site.company.legalName}</span>
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-amber-bright" />
                <span>
                  <span className="block text-cream/55">{addressLabel}</span>
                  {site.company.address}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-amber-bright" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-cream">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-amber-bright" />
                <a href={`mailto:${site.email}`} className="hover:text-cream">
                  {site.email}
                </a>
              </li>
              <li className="text-cream/62">
                {taxLabel}: {site.company.taxCode}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/16 pt-6 text-label uppercase tracking-label text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.company.legalName}. {rights}
          </span>
          <span>{tagline} / Vietnam → China B2B Export</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h3 className="text-small font-semibold uppercase tracking-label text-cream">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="group inline-flex items-center gap-2 text-small text-cream/82 transition-colors hover:text-amber-bright"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cream/72 transition-colors group-hover:bg-amber-bright" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
