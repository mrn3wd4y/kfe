type LabelProps = {
  tone?: "muted" | "amber" | "signal";
  as?: "p" | "span" | "dt" | "h3" | "h4";
  className?: string;
  children: React.ReactNode;
};

const tones = {
  muted: "text-muted",
  amber: "text-amber",
  signal: "text-signal",
} as const;

export function Label({
  tone = "muted",
  as: Tag = "span",
  className = "",
  children,
}: LabelProps) {
  return (
    <Tag
      className={`text-label font-medium uppercase tracking-label ${tones[tone]} ${className}`}
    >
      {children}
    </Tag>
  );
}
