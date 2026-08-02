import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Mobee Scents — home"
      className={cn("group flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border font-serif text-base tracking-wide transition-colors",
          dark ? "border-ivory/30 text-ivory" : "border-charcoal/25 text-charcoal"
        )}
      >
        M
      </span>
      <span className={cn("font-serif text-lg tracking-[0.14em] uppercase", dark ? "text-ivory" : "text-charcoal")}>
        Mobee <span className="text-gold">Scents</span>
      </span>
    </Link>
  );
}
