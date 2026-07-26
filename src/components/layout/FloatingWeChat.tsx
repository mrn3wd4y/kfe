import { MessageCircleMore } from "lucide-react";

export function FloatingWeChat({ label }: { label: string }) {
  return (
    <a
      href="#contact"
      className="text-small fixed right-4 bottom-4 z-40 flex min-h-13 items-center gap-2 rounded-full bg-signal px-5 font-medium text-ink shadow-[0_14px_40px_rgba(0,0,0,0.4)] md:hidden"
    >
      <MessageCircleMore className="h-5 w-5" />
      {label}
    </a>
  );
}
