type TextProps = {
  size?: "body" | "small";
  tone?: "cream" | "muted";
  className?: string;
  children: React.ReactNode;
};

export function Text({
  size = "body",
  tone = "muted",
  className = "",
  children,
}: TextProps) {
  const sizes = { body: "text-body", small: "text-small" } as const;
  const tones = { cream: "text-cream", muted: "text-muted" } as const;

  return <p className={`${sizes[size]} ${tones[tone]} ${className}`}>{children}</p>;
}
