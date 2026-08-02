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
 * Hand-drawn product illustration used until real product photography is
 * available. Swap usages of this component for <Image src="/images/products/<slug>.jpg" />
 * once photos are ready — see comments in ProductCard.tsx and QuickViewModal.tsx.
 */
export function PerfumeBottle({ variant, accent, accentSoft, className, glow = true }: PerfumeBottleProps) {
  const uid = useId().replace(/:/g, "");
  const glassId = `glass-${uid}`;
  const capId = `cap-${uid}`;
  const goldId = `gold-${uid}`;
  const glowId = `glow-${uid}`;
  const shineId = `shine-${uid}`;
  const shadowId = `shadow-${uid}`;

  return (
    <svg viewBox="0 0 300 440" className={className} role="img" aria-label="Perfume bottle illustration">
      <defs>
        <linearGradient id={glassId} x1="10%" y1="0%" x2="95%" y2="100%">
          <stop offset="0%" stopColor={accentSoft} stopOpacity="0.92" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.94" />
          <stop offset="100%" stopColor={accent} />
        </linearGradient>

        <linearGradient id={shineId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="38%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={capId} cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#4a4744" />
          <stop offset="45%" stopColor="#232120" />
          <stop offset="100%" stopColor="#0d0c0b" />
        </radialGradient>

        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f2e2ab" />
          <stop offset="50%" stopColor="#c6a758" />
          <stop offset="100%" stopColor="#8f7433" />
        </linearGradient>

        <radialGradient id={glowId} cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor={accentSoft} stopOpacity="0.32" />
          <stop offset="100%" stopColor={accentSoft} stopOpacity="0" />
        </radialGradient>

        <filter id={shadowId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
      </defs>

      {glow && <circle cx="150" cy="200" r="158" fill={`url(#${glowId})`} />}

      <ellipse cx="150" cy="392" rx="66" ry="11" fill="#000" opacity="0.16" filter={`url(#${shadowId})`} />

      {variant === "rect" && (
        <RectBottle glassId={glassId} capId={capId} goldId={goldId} shineId={shineId} accent={accent} />
      )}
      {variant === "facet" && (
        <FacetBottle glassId={glassId} capId={capId} goldId={goldId} shineId={shineId} accent={accent} />
      )}
      {variant === "round" && (
        <RoundBottle glassId={glassId} capId={capId} goldId={goldId} shineId={shineId} accent={accent} />
      )}
      {variant === "flask" && (
        <FlaskBottle glassId={glassId} capId={capId} goldId={goldId} shineId={shineId} accent={accent} />
      )}
    </svg>
  );
}

interface PartProps {
  glassId: string;
  capId: string;
  goldId: string;
  shineId: string;
  accent: string;
}

/** Cream label with a gold hairline frame, a monogram badge, and text-placeholder rules. */
function Label({ cx, cy, width, height, accent }: { cx: number; cy: number; width: number; height: number; accent: string }) {
  const x = cx - width / 2;
  const y = cy - height / 2;
  return (
    <g>
      <rect x={x - 3} y={y - 3} width={width + 6} height={height + 6} rx="3" fill="#c6a758" opacity="0.9" />
      <rect x={x} y={y} width={width} height={height} rx="2" fill="#f7f0dd" />
      <rect x={x + 5} y={y + 5} width={width - 10} height={height - 10} rx="1" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="0.75" />
      <circle cx={cx} cy={y + 17} r="9" fill="none" stroke={accent} strokeWidth="1" />
      <text x={cx} y={y + 20.5} textAnchor="middle" fontSize="9" fill={accent} fontFamily="var(--font-serif, serif)">
        MS
      </text>
      <line x1={x + 14} y1={y + 34} x2={x + width - 14} y2={y + 34} stroke={accent} strokeOpacity="0.55" strokeWidth="1" />
      <line x1={x + 20} y1={y + height - 14} x2={x + width - 20} y2={y + height - 14} stroke={accent} strokeOpacity="0.3" strokeWidth="0.75" />
    </g>
  );
}

function BallCap({ cx, top, capId, goldId }: { cx: number; top: number; capId: string; goldId: string }) {
  return (
    <g>
      <rect x={cx - 16} y={top + 40} width="32" height="14" fill={`url(#${goldId})`} />
      <rect x={cx - 13} y={top + 8} width="26" height="34" rx="3" fill={`url(#${capId})`} />
      <ellipse cx={cx} cy={top + 8} rx="30" ry="26" fill={`url(#${capId})`} />
      <ellipse cx={cx - 9} cy={top - 4} rx="9" ry="7" fill="#ffffff" opacity="0.18" />
    </g>
  );
}

function RectBottle({ glassId, capId, goldId, shineId, accent }: PartProps) {
  return (
    <g>
      <BallCap cx={150} top={62} capId={capId} goldId={goldId} />
      <rect x={98} y={116} width={104} height={218} rx="10" fill={`url(#${glassId})`} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M110 120 h18 v210 h-18 Z" fill={`url(#${shineId})`} />
      <ellipse cx={150} cy={168} rx="42" ry="5" fill={accent} opacity="0.3" />
      <Label cx={150} cy={244} width={82} height={64} accent={accent} />
    </g>
  );
}

function FacetBottle({ glassId, capId, goldId, shineId, accent }: PartProps) {
  return (
    <g>
      <BallCap cx={150} top={70} capId={capId} goldId={goldId} />
      <polygon
        points="150,124 202,152 202,318 150,348 98,318 98,152"
        fill={`url(#${glassId})`}
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <polygon points="150,124 150,348 98,318 98,152" fill="#000" opacity="0.08" />
      <polygon points="118,152 132,144 132,300 118,308" fill={`url(#${shineId})`} />
      <ellipse cx={150} cy={176} rx="40" ry="5" fill={accent} opacity="0.3" />
      <Label cx={150} cy={244} width={78} height={60} accent={accent} />
    </g>
  );
}

function RoundBottle({ glassId, capId, goldId, shineId, accent }: PartProps) {
  return (
    <g>
      <BallCap cx={150} top={82} capId={capId} goldId={goldId} />
      <rect x={90} y={136} width={120} height={186} rx="58" fill={`url(#${glassId})`} stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M104 150 q14 -6 22 0 v160 q-14 6 -22 0 Z" fill={`url(#${shineId})`} />
      <ellipse cx={150} cy={182} rx="46" ry="6" fill={accent} opacity="0.3" />
      <circle cx={150} cy={236} r="34" fill="#c6a758" opacity="0.9" />
      <circle cx={150} cy={236} r="31" fill="#f7f0dd" />
      <circle cx={150} cy={236} r="26" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="0.75" />
      <circle cx={150} cy={226} r="9" fill="none" stroke={accent} strokeWidth="1" />
      <text x={150} y="229.5" textAnchor="middle" fontSize="9" fill={accent} fontFamily="var(--font-serif, serif)">
        MS
      </text>
      <line x1={128} y1={244} x2={172} y2={244} stroke={accent} strokeOpacity="0.5" strokeWidth="1" />
      <line x1={134} y1={254} x2={166} y2={254} stroke={accent} strokeOpacity="0.3" strokeWidth="0.75" />
    </g>
  );
}

function FlaskBottle({ glassId, capId, goldId, shineId, accent }: PartProps) {
  return (
    <g>
      <BallCap cx={150} top={58} capId={capId} goldId={goldId} />
      <path
        d="M138 100 L162 100 L166 140 C190 176 202 214 202 256 C202 306 180 340 150 340 C120 340 98 306 98 256 C98 214 110 176 134 140 Z"
        fill={`url(#${glassId})`}
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <path d="M138 100 L150 100 L150 340 C120 340 98 306 98 256 C98 214 110 176 134 140 Z" fill="#000" opacity="0.07" />
      <path d="M116 168 q10 -8 18 -4 v140 q-10 8 -18 4 Z" fill={`url(#${shineId})`} />
      <ellipse cx={150} cy={186} rx="34" ry="5" fill={accent} opacity="0.3" />
      <Label cx={150} cy={252} width={86} height={62} accent={accent} />
    </g>
  );
}
