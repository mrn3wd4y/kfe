import Link from "next/link";

type Variant = "primary" | "secondary";

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  block?: boolean;
  children: React.ReactNode;
};

const base =
  "group inline-flex min-h-13 items-center justify-center gap-2 rounded-sm px-7 text-small font-medium tracking-label uppercase transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal text-cream shadow-[0_12px_28px_rgba(167,53,42,0.22)] hover:-translate-y-0.5 hover:bg-signal-bright hover:shadow-[0_16px_34px_rgba(167,53,42,0.28)]",
  secondary:
    "border border-white/38 bg-white/10 text-cream backdrop-blur-sm hover:-translate-y-0.5 hover:border-cream hover:bg-cream hover:text-ink",
};

export function ButtonLink({
  href,
  variant = "primary",
  block = false,
  children,
}: ButtonLinkProps) {
  const className = `${base} ${variants[variant]} ${block ? "w-full sm:w-auto" : ""}`;

  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
