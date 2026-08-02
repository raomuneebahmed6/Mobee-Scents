import { cn } from "@/lib/utils";

/**
 * Monogram crest: interlocked M/S initials in a double-ring gold seal,
 * with a small three-dot "atomizer mist" accent above.
 */
export function LogoMark({ dark = false, className }: { dark?: boolean; className?: string }) {
  const ring = dark ? "#e7d9ae" : "#b3924f";
  const ink = dark ? "#f6f1e7" : "#1c1a17";

  return (
    <svg viewBox="0 0 48 52" className={cn("h-9 w-9", className)} role="img" aria-label="Mobee Scents monogram">
      <circle cx="34" cy="6" r="1.4" fill={ring} opacity="0.85" />
      <circle cx="30" cy="9.5" r="1" fill={ring} opacity="0.6" />
      <circle cx="37.5" cy="10.5" r="0.75" fill={ring} opacity="0.5" />

      <circle cx="24" cy="30" r="20" fill="none" stroke={ring} strokeWidth="1" />
      <circle cx="24" cy="30" r="16.5" fill="none" stroke={ring} strokeWidth="0.6" />

      <path d="M14 15 Q9 22 12 30" fill="none" stroke={ring} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
      <path d="M34 15 Q39 22 36 30" fill="none" stroke={ring} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />

      <text x="24" y="38" textAnchor="middle" fontFamily="var(--font-serif, serif)" fontSize="22" fill={ink}>
        M
      </text>
      <text x="31.5" y="40.5" textAnchor="middle" fontFamily="var(--font-serif, serif)" fontSize="11" fill={ring}>
        S
      </text>
    </svg>
  );
}
