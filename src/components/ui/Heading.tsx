type Level = 1 | 2 | 3;

type HeadingProps = {
  level: Level;
  className?: string;
  children: React.ReactNode;
};

const styles: Record<Level, string> = {
  1: "font-display text-display font-light text-ink",
  2: "font-display text-title font-light text-ink",
  3: "font-display text-heading font-normal text-ink",
};

export function Heading({ level, className = "", children }: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return <Tag className={`${styles[level]} ${className}`}>{children}</Tag>;
}
