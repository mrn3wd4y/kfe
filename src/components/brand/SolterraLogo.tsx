type SolterraLogoProps = {
  className?: string;
  title?: string;
};

export function SolterraLogo({ className = "h-12 w-12", title = "Solterra" }: SolterraLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 7.5c-9.2 0-17.5 4.9-22.1 12.7"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M54.1 20.2C49.5 12.4 41.2 7.5 32 7.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.72"
      />
      <path
        d="M8 42.2c8.8-9 16.1-13.5 22-13.5 6.1 0 10.5 4.5 16.1 4.5 3.3 0 6.4-1.3 9.9-4"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.2 50.5c8.4-7 15.3-10.5 20.8-10.5 5.8 0 10 3.5 15.5 3.5 2.4 0 4.5-.5 6.5-1.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.62"
      />
      <path
        d="M34.5 18.8c5.4 3.1 9.6 9.7 8 15.6-1.3 4.8-6.3 6.8-10.7 4.3-5.4-3.1-9.6-9.7-8-15.6 1.3-4.8 6.3-6.8 10.7-4.3Z"
        fill="currentColor"
      />
      <path
        d="M30.2 21.6c2.2 3.5 3.6 7.8 3.7 13.3"
        stroke="var(--color-cream)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
