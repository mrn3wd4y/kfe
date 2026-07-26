import { ArrowUpRight, Clock3, Mail, MessageCircleMore, Phone } from "lucide-react";
import Image from "next/image";

import { Heading } from "@/components/ui/Heading";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Text";
import { site } from "@/lib/site";

type ContactProps = {
  title: string;
  subtitle: string;
  wechatLabel: string;
  wechatHint: string;
  emailLabel: string;
  hoursLabel: string;
  hoursValue: string;
};

export function Contact({
  title,
  subtitle,
  wechatLabel,
  wechatHint,
  emailLabel,
  hoursLabel,
  hoursValue,
}: ContactProps) {
  return (
    <section id="contact" className="gutter scroll-mt-20 border-t border-line bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.55fr)] lg:gap-16">
          <div>
            <Label tone="signal">DIRECT CHANNEL / WECHAT</Label>
            <Heading level={2} className="mt-6 max-w-3xl !text-signal">
              {title}
            </Heading>
            <Text className="mt-6 max-w-xl text-[1.05rem]">{subtitle}</Text>

            <div className="mt-10 grid border-l border-t border-line sm:grid-cols-2">
              <a
                href={`mailto:${site.email}`}
                className="group border-r border-b border-line bg-paper p-5 transition-colors hover:bg-white"
              >
                <div className="flex items-center justify-between text-signal">
                  <Mail className="h-5 w-5" />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="mt-7 block text-label uppercase tracking-label text-muted">
                  {emailLabel}
                </span>
                <span className="mt-2 block text-small text-ink sm:text-body">{site.email}</span>
              </a>

              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="group border-r border-b border-line bg-paper p-5 transition-colors hover:bg-white"
              >
                <div className="flex items-center justify-between text-signal">
                  <Phone className="h-5 w-5" />
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="mt-7 block text-label uppercase tracking-label text-muted">
                  HOTLINE
                </span>
                <span className="mt-2 block text-body text-ink">{site.phone}</span>
              </a>

              <div className="border-r border-b border-line bg-paper p-5 sm:col-span-2">
                <Clock3 className="h-5 w-5 text-signal" />
                <span className="mt-7 block text-label uppercase tracking-label text-muted">
                  {hoursLabel}
                </span>
                <span className="mt-2 block text-small text-ink">{hoursValue}</span>
              </div>
            </div>
          </div>

          <div className="border border-line bg-ink-deep p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageCircleMore className="h-5 w-5 text-amber-bright" />
                <Label tone="amber">{wechatLabel}</Label>
              </div>
              <span className="h-2 w-2 rounded-full bg-amber-bright" />
            </div>
            <div className="mt-6 bg-white p-4">
              <Image
                src={site.wechatQr}
                alt={wechatLabel}
                width={560}
                height={560}
                loading="eager"
                className="h-auto w-full"
              />
            </div>
            <Text size="small" tone="cream" className="mt-5 text-center !text-cream/68">
              {wechatHint}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
