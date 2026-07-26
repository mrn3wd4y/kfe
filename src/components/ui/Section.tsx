import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";

type SectionProps = {
  id: string;
  index?: string;
  title?: string;
  subtitle?: string;
  surface?: boolean;
  children: React.ReactNode;
};

export function Section({
  id,
  index,
  title,
  subtitle,
  surface,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`section-rhythm gutter relative scroll-mt-20 overflow-hidden border-t border-line ${
        surface ? "bg-white" : "bg-paper"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {title ? (
          <header className="mb-12 grid gap-5 md:mb-16 md:grid-cols-[8rem_minmax(0,1fr)]">
            <div className="flex items-center gap-3 self-start pt-2">
              <span className="h-px w-8 bg-signal" />
              {index ? <Label tone="signal">SOLTERRA / {index}</Label> : null}
            </div>
            <div className="max-w-4xl">
              <Heading level={2} className="!text-signal">
                {title}
              </Heading>
              {subtitle ? (
                <Text className="mt-5 max-w-2xl">{subtitle}</Text>
              ) : null}
            </div>
          </header>
        ) : null}

        <div className={title ? "md:pl-[8rem]" : ""}>{children}</div>
      </div>
    </section>
  );
}
