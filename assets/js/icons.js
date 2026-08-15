/* Mobee Scents — inline SVG icon set (no external dependency).
   Minimal stroke-based icons, 24x24 viewBox, consistent with lucide's visual language. */

const ICON_PATHS = {
  search: '<circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.2" y2="16.2"/>',
  user: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M4.5 20.5c1.5-4 4.2-6 7.5-6s6 2 7.5 6"/>',
  heart: '<path d="M12 20.5S3.5 15.2 3.5 9.2C3.5 6.3 5.8 4 8.7 4c1.7 0 3.1.8 3.9 2.1C13.4 4.8 14.8 4 16.5 4c2.9 0 5.2 2.3 5.2 5.2 0 6-8.7 11.3-8.7 11.3Z"/>',
  bag: '<path d="M6 8h12l-1 12.5a1 1 0 0 1-1 .9H8a1 1 0 0 1-1-.9L6 8Z"/><path d="M9 8V6.5a3 3 0 0 1 6 0V8"/>',
  menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
  x: '<line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/>',
  star: '<polygon points="12,2.5 15.1,8.9 22.2,9.9 17.1,14.9 18.3,22 12,18.6 5.7,22 6.9,14.9 1.8,9.9 8.9,8.9"/>',
  "chevron-down": '<polyline points="6,9 12,15 18,9"/>',
  "chevron-left": '<polyline points="15,18 9,12 15,6"/>',
  "chevron-right": '<polyline points="9,18 15,12 9,6"/>',
  minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  trash: '<polyline points="4,7 20,7"/><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13"/><path d="M9 7V4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V7"/>',
  eye: '<path d="M2 12s3.8-6.5 10-6.5S22 12 22 12s-3.8 6.5-10 6.5S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  check: '<polyline points="4,13 9,18 20,6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>',
  facebook: '<path d="M15 8.5h-2a2 2 0 0 0-2 2V21"/><path d="M8.5 13.5h4.5"/><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"/>',
  twitter: '<path d="M4 4l7.5 9.5L4.5 20H7l5.2-5.9L16.5 20H20l-8-10.2L18.5 4H16l-4.6 5.2L7.5 4H4Z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 6.5 8 6.5 8-6.5"/>',
  phone: '<path d="M6.6 3.5 9 8l-1.8 2A12 12 0 0 0 14 16.8l2-1.8 4.5 2.4V21a1 1 0 0 1-1.1 1C10.6 21.6 3.4 14.4 3 5.6A1 1 0 0 1 4 4.5Z"/>',
  "map-pin": '<path d="M12 21.5s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><polyline points="12,7 12,12 16,14"/>',
  "message-circle": '<path d="M21 11.5a8.5 8.5 0 0 1-11.9 7.8L3 21l1.7-6.1A8.5 8.5 0 1 1 21 11.5Z"/>',
  sliders: '<line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/><circle cx="9" cy="6" r="2" fill="var(--bg,#f6f1e7)"/><circle cx="15" cy="12" r="2" fill="var(--bg,#f6f1e7)"/><circle cx="9" cy="18" r="2" fill="var(--bg,#f6f1e7)"/>',
  "arrow-right": '<line x1="4" y1="12" x2="20" y2="12"/><polyline points="13,5 20,12 13,19"/>',
  quote: '<path d="M9.5 8.5c-2.5 0-4 2-4 4.5s1.5 4 3.5 4c1.3 0 2-.7 2-1.8 0-1-.7-1.7-1.7-1.7-.3 0-.5 0-.7.1.2-1.6 1.5-3 3.2-3.4L11 8.6a6.3 6.3 0 0 0-1.5-.1Zm9 0c-2.5 0-4 2-4 4.5s1.5 4 3.5 4c1.3 0 2-.7 2-1.8 0-1-.7-1.7-1.7-1.7-.3 0-.5 0-.7.1.2-1.6 1.5-3 3.2-3.4L20 8.6a6.3 6.3 0 0 0-1.5-.1Z" fill="currentColor" stroke="none"/>',
  gem: '<path d="M6 3h12l3 6-9 12L3 9Z"/><path d="M3 9h18M9 3l3 6 3-6M12 9l-3 12M12 9l3 12"/>',
  sparkles: '<path d="M12 3v4M12 17v4M4 12h4M16 12h4M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2"/>',
  "shield-check": '<path d="M12 3l7 3v5.5c0 4.6-3 7.9-7 9-4-1.1-7-4.4-7-9V6Z"/><polyline points="9,12 11,14 15,10"/>',
  truck: '<rect x="2.5" y="7" width="12" height="9"/><path d="M14.5 10.5h3.5l3 3V16h-6.5Z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  headset: '<path d="M4 13.5a8 8 0 0 1 16 0"/><rect x="3" y="13" width="4" height="6" rx="1.3"/><rect x="17" y="13" width="4" height="6" rx="1.3"/><path d="M19 19v.5a3 3 0 0 1-3 3h-3"/>',
  "tree-pine": '<path d="M12 3 6 11h3l-4 6h4l-3 5h12l-3-5h4l-4-6h3Z"/><line x1="12" y1="21" x2="12" y2="25"/>',
  flame: '<path d="M12 2.5s5 4.5 5 9.5a5 5 0 0 1-10 0c0-1.3.5-2.3 1.3-3.4.2 1.6 1.2 2.4 2 2 .5-3 .3-5.5-.8-8.1 1 0 1.8.5 2.5 0Z"/>',
  layers: '<polygon points="12,3 21,8 12,13 3,8"/><polyline points="3,13 12,18 21,13"/><polyline points="3,17.5 12,22.5 21,17.5"/>',
  cigarette: '<rect x="2.5" y="10" width="15" height="4" rx="1"/><rect x="17.5" y="10" width="4" height="4" rx="1" fill="currentColor" stroke="none"/><line x1="6" y1="7.5" x2="6" y2="5" /><line x1="9" y1="7.5" x2="9" y2="5"/>',
  "flower-2": '<circle cx="12" cy="12" r="2.5"/><path d="M12 2v3.5M12 18.5V22M2 12h3.5M18.5 12H22M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5"/>',
  droplets: '<path d="M9 3s-5 6-5 10a5 5 0 0 0 10 0c0-4-5-10-5-10Z"/><path d="M17 11s-2.5 3-2.5 5a2.5 2.5 0 0 0 5 0c0-2-2.5-5-2.5-5Z"/>',
  flower: '<circle cx="12" cy="12" r="2.2"/><path d="M12 9.8a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm0 4.4a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM9.8 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm4.4 0a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z"/>',
  leaf: '<path d="M4 20c8 0 16-6 16-16-9 0-16 7-16 16Z"/><path d="M4 20c0-5 3-9 8-11.5"/>',
  "heart-handshake": '<path d="M12 20.5S6 16.8 4.2 12.8"/><path d="M4.5 12.5C2.8 9 5 5.5 8.4 5.5c1.7 0 2.9.8 3.6 1.8.7-1 1.9-1.8 3.6-1.8 3.4 0 5.6 3.5 3.9 7"/><path d="m8 12 2.3 2.3a1.6 1.6 0 0 0 2.3 0l3.9-3.9a1.6 1.6 0 0 1 2.3 0l1.2 1.2"/>',
};

function icon(name, cls) {
  const body = ICON_PATHS[name] || "";
  return `<svg class="icon${cls ? " " + cls : ""}" viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`;
}

function starsMarkup(rating, size) {
  size = size || 14;
  let out = '<span class="stars">';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(rating);
    out += `<svg class="${filled ? "filled" : "empty"}" viewBox="0 0 24 24" stroke-width="1.5">${ICON_PATHS.star}</svg>`;
  }
  out += "</span>";
  return out;
}

/* ---- Product bottle illustration (see PerfumeBottle in the previous React build) ---- */
let __bottleUid = 0;
function bottleSVG(variant, accent, accentSoft, opts) {
  opts = opts || {};
  const glow = opts.glow !== false;
  const uid = "b" + __bottleUid++;
  const glassId = `glass-${uid}`;
  const capId = `cap-${uid}`;
  const goldId = `gold-${uid}`;
  const glowId = `glow-${uid}`;
  const shineId = `shine-${uid}`;
  const shadowId = `shadow-${uid}`;

  const defs = `
    <linearGradient id="${glassId}" x1="10%" y1="0%" x2="95%" y2="100%">
      <stop offset="0%" stop-color="${accentSoft}" stop-opacity="0.92"/>
      <stop offset="45%" stop-color="${accent}" stop-opacity="0.94"/>
      <stop offset="100%" stop-color="${accent}"/>
    </linearGradient>
    <linearGradient id="${shineId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="38%" stop-color="#ffffff" stop-opacity="0.35"/>
      <stop offset="52%" stop-color="#ffffff" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <radialGradient id="${capId}" cx="38%" cy="30%" r="75%">
      <stop offset="0%" stop-color="#4a4744"/>
      <stop offset="45%" stop-color="#232120"/>
      <stop offset="100%" stop-color="#0d0c0b"/>
    </radialGradient>
    <linearGradient id="${goldId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f2e2ab"/>
      <stop offset="50%" stop-color="#c6a758"/>
      <stop offset="100%" stop-color="#8f7433"/>
    </linearGradient>
    <radialGradient id="${glowId}" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="${accentSoft}" stop-opacity="0.32"/>
      <stop offset="100%" stop-color="${accentSoft}" stop-opacity="0"/>
    </radialGradient>
    <filter id="${shadowId}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7"/>
    </filter>`;

  const glowEl = glow ? `<circle cx="150" cy="200" r="158" fill="url(#${glowId})"/>` : "";
  const shadowEl = `<ellipse cx="150" cy="392" rx="66" ry="11" fill="#000" opacity="0.16" filter="url(#${shadowId})"/>`;

  const cap = (top) => `
    <rect x="134" y="${top + 40}" width="32" height="14" fill="url(#${goldId})"/>
    <rect x="137" y="${top + 8}" width="26" height="34" rx="3" fill="url(#${capId})"/>
    <ellipse cx="150" cy="${top + 8}" rx="30" ry="26" fill="url(#${capId})"/>
    <ellipse cx="141" cy="${top - 4}" rx="9" ry="7" fill="#ffffff" opacity="0.18"/>`;

  const label = (cy, w, h) => {
    const x = 150 - w / 2;
    const y = cy - h / 2;
    return `
      <rect x="${x - 3}" y="${y - 3}" width="${w + 6}" height="${h + 6}" rx="3" fill="#c6a758" opacity="0.9"/>
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="#f7f0dd"/>
      <rect x="${x + 5}" y="${y + 5}" width="${w - 10}" height="${h - 10}" rx="1" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="0.75"/>
      <circle cx="150" cy="${y + 17}" r="9" fill="none" stroke="${accent}" stroke-width="1"/>
      <text x="150" y="${y + 20.5}" text-anchor="middle" font-size="9" fill="${accent}" font-family="var(--font-serif, serif)">MS</text>
      <line x1="${x + 14}" y1="${y + 34}" x2="${x + w - 14}" y2="${y + 34}" stroke="${accent}" stroke-opacity="0.55" stroke-width="1"/>
      <line x1="${x + 20}" y1="${y + h - 14}" x2="${x + w - 20}" y2="${y + h - 14}" stroke="${accent}" stroke-opacity="0.3" stroke-width="0.75"/>`;
  };

  let body = "";
  if (variant === "rect") {
    body = `
      ${cap(62)}
      <rect x="98" y="116" width="104" height="218" rx="10" fill="url(#${glassId})" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
      <path d="M110 120 h18 v210 h-18 Z" fill="url(#${shineId})"/>
      <ellipse cx="150" cy="168" rx="42" ry="5" fill="${accent}" opacity="0.3"/>
      ${label(244, 82, 64)}`;
  } else if (variant === "facet") {
    body = `
      ${cap(70)}
      <polygon points="150,124 202,152 202,318 150,348 98,318 98,152" fill="url(#${glassId})" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
      <polygon points="150,124 150,348 98,318 98,152" fill="#000" opacity="0.08"/>
      <polygon points="118,152 132,144 132,300 118,308" fill="url(#${shineId})"/>
      <ellipse cx="150" cy="176" rx="40" ry="5" fill="${accent}" opacity="0.3"/>
      ${label(244, 78, 60)}`;
  } else if (variant === "round") {
    body = `
      ${cap(82)}
      <rect x="90" y="136" width="120" height="186" rx="58" fill="url(#${glassId})" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
      <path d="M104 150 q14 -6 22 0 v160 q-14 6 -22 0 Z" fill="url(#${shineId})"/>
      <ellipse cx="150" cy="182" rx="46" ry="6" fill="${accent}" opacity="0.3"/>
      <circle cx="150" cy="236" r="34" fill="#c6a758" opacity="0.9"/>
      <circle cx="150" cy="236" r="31" fill="#f7f0dd"/>
      <circle cx="150" cy="236" r="26" fill="none" stroke="${accent}" stroke-opacity="0.35" stroke-width="0.75"/>
      <circle cx="150" cy="226" r="9" fill="none" stroke="${accent}" stroke-width="1"/>
      <text x="150" y="229.5" text-anchor="middle" font-size="9" fill="${accent}" font-family="var(--font-serif, serif)">MS</text>
      <line x1="128" y1="244" x2="172" y2="244" stroke="${accent}" stroke-opacity="0.5" stroke-width="1"/>
      <line x1="134" y1="254" x2="166" y2="254" stroke="${accent}" stroke-opacity="0.3" stroke-width="0.75"/>`;
  } else {
    body = `
      ${cap(58)}
      <path d="M138 100 L162 100 L166 140 C190 176 202 214 202 256 C202 306 180 340 150 340 C120 340 98 306 98 256 C98 214 110 176 134 140 Z" fill="url(#${glassId})" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1"/>
      <path d="M138 100 L150 100 L150 340 C120 340 98 306 98 256 C98 214 110 176 134 140 Z" fill="#000" opacity="0.07"/>
      <path d="M116 168 q10 -8 18 -4 v140 q-10 8 -18 4 Z" fill="url(#${shineId})"/>
      <ellipse cx="150" cy="186" rx="34" ry="5" fill="${accent}" opacity="0.3"/>
      ${label(252, 86, 62)}`;
  }

  return `<svg viewBox="0 0 300 440" role="img" aria-label="Perfume bottle illustration"><defs>${defs}</defs>${glowEl}${shadowEl}${body}</svg>`;
}
