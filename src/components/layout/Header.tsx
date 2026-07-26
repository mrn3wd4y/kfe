"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { SolterraLogo } from "@/components/brand/SolterraLogo";
import { site } from "@/lib/site";

type NavLabels = {
  products: string;
  process: string;
  terms: string;
  sample: string;
  contact: string;
  menuOpen: string;
  menuClose: string;
};

export function Header({ nav, locale }: { nav: NavLabels; locale: string }) {
  const [open, setOpen] = useState(false);
  const links = [
    { href: `/${locale}/#products`, label: nav.products },
    { href: `/${locale}/process/`, label: nav.process },
    { href: `/${locale}/terms/`, label: nav.terms },
    { href: `/${locale}/#sample`, label: nav.sample },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/94 backdrop-blur-xl">
      <div className="gutter mx-auto flex h-18 max-w-7xl items-center justify-between">
        <a
          href={`/${locale}/`}
          className="group flex items-center gap-3"
          aria-label={site.name}
        >
          <SolterraLogo className="h-12 w-12 shrink-0 text-signal transition-transform group-hover:scale-105" />
          <span className="leading-none">
            <span className="block font-display text-[1.16rem] font-medium tracking-brand text-ink">
              {site.name}
            </span>
            <span className="mt-1 block text-[0.68rem] uppercase tracking-label text-muted">
              Vietnam Green Coffee
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          <nav className="flex items-center gap-7">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[0.98rem] font-medium text-ink/76 transition-colors hover:text-signal"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 border-l border-line pl-5 text-[0.8rem] font-medium uppercase tracking-label">
            <Link
              href="/zh/"
              className={locale === "zh" ? "text-signal" : "text-muted hover:text-signal"}
            >
              中文
            </Link>
            <span className="text-line-dark">/</span>
            <Link
              href="/en/"
              className={locale === "en" ? "text-signal" : "text-muted hover:text-signal"}
            >
              EN
            </Link>
          </div>
          <a
            href={`/${locale}/#contact`}
            className="group inline-flex h-12 items-center gap-2 rounded-full bg-signal px-6 text-[0.98rem] font-medium text-cream shadow-[0_10px_24px_rgba(167,53,42,0.18)] transition-all hover:-translate-y-0.5 hover:bg-signal-bright"
          >
            {nav.contact}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? nav.menuClose : nav.menuOpen}
          className="flex h-11 w-11 items-center justify-center border border-line bg-white text-ink lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="gutter absolute inset-x-0 top-full border-b border-line bg-white py-3 shadow-2xl lg:hidden"
        >
          {[...links, { href: `/${locale}/#contact`, label: nav.contact }].map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-4 text-[1.05rem] font-medium text-ink last:border-b-0"
            >
              <span>{link.label}</span>
              <span className="tabular text-label text-signal">
                {String(index + 1).padStart(2, "0")}
              </span>
            </a>
          ))}
          <div className="flex items-center justify-between py-4 text-label uppercase tracking-label">
            <span className="text-muted">Language</span>
            <span className="flex items-center gap-2">
              <Link href="/zh/" className={locale === "zh" ? "text-signal" : "text-muted"}>
                中文
              </Link>
              <span className="text-line-dark">/</span>
              <Link href="/en/" className={locale === "en" ? "text-signal" : "text-muted"}>
                EN
              </Link>
            </span>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
