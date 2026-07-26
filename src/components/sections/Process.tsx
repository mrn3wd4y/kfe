import { Bean, PackageCheck, ScanSearch, Sprout, SunMedium } from "lucide-react";

import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";

type Step = { title: string; body: string };

type ProcessProps = {
  title: string;
  subtitle: string;
  steps: Step[];
  compactHeader?: boolean;
};

const icons = [Sprout, Bean, SunMedium, ScanSearch, PackageCheck];

export function Process({ title, subtitle, steps, compactHeader }: ProcessProps) {
  return (
    <Section
      id="process"
      index="03"
      title={compactHeader ? undefined : title}
      subtitle={compactHeader ? undefined : subtitle}
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute top-8 right-[10%] left-[10%] hidden h-px bg-line lg:block"
        />
        <ol className="grid gap-4 lg:grid-cols-5">
          {steps.map((step, index) => {
            const Icon = icons[index % icons.length];

            return (
              <li
                key={step.title}
                className="group relative grid grid-cols-[4rem_1fr] gap-4 border border-line bg-white p-5 transition-all hover:-translate-y-1 hover:border-signal hover:shadow-[0_16px_38px_rgba(43,33,27,0.08)] lg:block"
              >
                <div className="relative z-10 flex h-16 w-16 items-center justify-center border border-line bg-paper text-signal transition-all duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-cream">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="lg:mt-8">
                  <Label tone="signal">STEP / 0{index + 1}</Label>
                  <Heading level={3} className="mt-2">
                    {step.title}
                  </Heading>
                  <Text size="small" className="mt-3">
                    {step.body}
                  </Text>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
