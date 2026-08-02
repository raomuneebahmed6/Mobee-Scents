"use client";

import { useId } from "react";
import type { BottleVariant } from "@/lib/types";

interface PerfumeBottleProps {
  variant: BottleVariant;
  accent: string;
  accentSoft: string;
  className?: string;
  glow?: boolean;
}

/**
 * Hand-drawn geometric bottle artwork used as product imagery until real
 * product photography is available. Swap usages of this component for
 * <Image src="/images/products/<slug>.jpg" /> once photos are ready —
 * see comments in ProductCard.tsx and QuickViewModal.tsx.
 */
export function PerfumeBottle({ variant, accent, accentSoft, className, glow = true }: PerfumeBottleProps) {
  const uid = useId().replace(/:/g, "");
  const glassId = `glass-${uid}`;
  const capId = `cap-${uid}`;
  const glowId = `glow-${uid}`;

  return (
    <svg
      viewBox="0 0 300 400"
      className={className}
      role="img"
      aria-label="Perfume bottle illustration"
    >
      <defs>
        <linearGradient id={glassId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={accentSoft} />
          <stop offset="55%" stopColor={accent} />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>
        <linearGradient id={capId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e9d9a8" />
          <stop offset="50%" stopColor="#c6a758" />
          <stop offset="100%" stopColor="#9c7f3a" />
        </linearGradient>
        <radialGradient id={glowId} cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor={accentSoft} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accentSoft} stopOpacity="0" />
        </radialGradient>
      </defs>

      {glow && <circle cx="150" cy="190" r="150" fill={`url(#${glowId})`} />}

      <ellipse cx="150" cy="368" rx="70" ry="10" fill="#000" opacity="0.15" />

      {variant === "rect" && (
        <g>
          <rect x="118" y="58" width="64" height="34" rx="3" fill={`url(#${capId})`} />
          <rect x="136" y="88" width="28" height="34" fill={`url(#${capId})`} opacity="0.85" />
          <rect x="92" y="118" width="116" height="232" rx="8" fill={`url(#${glassId})`} />
          <rect x="92" y="118" width="40" height="232" rx="8" fill="#fff" opacity="0.08" />
          <rect x="112" y="210" width="76" height="58" rx="2" fill="#f4ecd8" opacity="0.92" />
          <line x1="122" y1="228" x2="178" y2="228" stroke="#8a7a52" strokeWidth="1.5" />
          <line x1="122" y1="238" x2="168" y2="238" stroke="#8a7a52" strokeWidth="1.5" />
          <text x="150" y="252" textAnchor="middle" fontSize="14" fill={accent} fontFamily="serif">
            MS
          </text>
        </g>
      )}

      {variant === "facet" && (
        <g>
          <polygon points="120,64 180,64 196,96 104,96" fill={`url(#${capId})`} />
          <rect x="136" y="96" width="28" height="30" fill={`url(#${capId})`} opacity="0.85" />
          <polygon
            points="150,120 205,150 205,320 150,352 95,320 95,150"
            fill={`url(#${glassId})`}
          />
          <polygon points="150,120 150,352 95,320 95,150" fill="#fff" opacity="0.07" />
          <polygon points="150,120 205,150 150,182 95,150" fill="#fff" opacity="0.12" />
          <rect x="118" y="205" width="64" height="50" rx="2" fill="#f4ecd8" opacity="0.92" />
          <text x="150" y="236" textAnchor="middle" fontSize="14" fill={accent} fontFamily="serif">
            MS
          </text>
        </g>
      )}

      {variant === "round" && (
        <g>
          <ellipse cx="150" cy="70" rx="34" ry="14" fill={`url(#${capId})`} />
          <rect x="132" y="80" width="36" height="26" fill={`url(#${capId})`} opacity="0.85" />
          <rect x="86" y="104" width="128" height="188" rx="52" fill={`url(#${glassId})`} />
          <rect x="86" y="104" width="45" height="188" rx="52" fill="#fff" opacity="0.08" />
          <circle cx="150" cy="198" r="38" fill="#f4ecd8" opacity="0.92" />
          <text x="150" y="205" textAnchor="middle" fontSize="15" fill={accent} fontFamily="serif">
            MS
          </text>
        </g>
      )}

      {variant === "flask" && (
        <g>
          <rect x="134" y="56" width="32" height="26" rx="3" fill={`url(#${capId})`} />
          <path
            d="M138 82 L162 82 L172 150 C192 190 200 230 200 270 C200 320 178 352 150 352 C122 352 100 320 100 270 C100 230 108 190 128 150 Z"
            fill={`url(#${glassId})`}
          />
          <path
            d="M138 82 L150 82 L150 352 C122 352 100 320 100 270 C100 230 108 190 128 150 Z"
            fill="#fff"
            opacity="0.07"
          />
          <rect x="115" y="230" width="70" height="52" rx="2" fill="#f4ecd8" opacity="0.92" />
          <line x1="125" y1="248" x2="175" y2="248" stroke="#8a7a52" strokeWidth="1.5" />
          <text x="150" y="266" textAnchor="middle" fontSize="14" fill={accent} fontFamily="serif">
            MS
          </text>
        </g>
      )}
    </svg>
  );
}
