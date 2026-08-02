import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/LogoMark";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Mobee Scents — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <LogoMark dark={dark} />
      <span className={cn("font-serif text-lg tracking-[0.14em] uppercase", dark ? "text-ivory" : "text-charcoal")}>
        Mobee <span className="text-gold">Scents</span>
      </span>
    </Link>
  );
}
