import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

/* ---------------------------------------------------------------
    Denah "Dome Stage" — kubah besar dengan 3 ring (CAT1/CAT2/CAT3),
    tiap ring terbagi Left / Center / Right, pit FESTIVAL + VVIP
    dekat panggung, FOH, dan catwalk kecil ke STAGE.

    NOTE: Komponen ini HANYA bertugas merender peta interaktif.
    Banner "Sisa tiket...", panel "DETAIL HARGA", quantity selector,
    tombol "Beli Tiket", dan legend SEMUANYA sudah ditangani oleh
    TicketPage (memakai `categories` yang diexport di bawah).
    Jangan render ulang elemen-elemen itu di sini — itu penyebab
    tampilan double di screenshot sebelumnya.
------------------------------------------------------------------ */
const C = {
  bg: "#0B0B12",
  panel: "#12121C",
  border: "#262638",
  stage: "#1D1D29",
  text: "#F1F1F5",
  muted: "#8C8C9C",
  hot: "#FB4570",
  violet: "#8B5CF6",
  gold: "#F5A623",
  cyan: "#22D3EE",
  balkon: "#54547A",
};

const fmtIDR = (n) => `Rp.${n.toLocaleString("id-ID")}`;

/* geometry */
const CX = 585;
const CY = 660;
const R0 = 310; // inner edge of CAT1
const R1 = 390; // CAT1 / CAT2 boundary
const R2 = 460; // CAT2 / CAT3 boundary
const R3 = 540; // outer edge of CAT3
const R_EDGE = 565; // venue silhouette
const A_MAX = 72; // full sweep -72..72
const A_SPLIT = 24; // left/center/right split points

const polar = (r, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
};

const arcBand = (rInner, rOuter, aStart, aEnd) => {
  const [x1, y1] = polar(rOuter, aStart);
  const [x2, y2] = polar(rOuter, aEnd);
  const [x3, y3] = polar(rInner, aEnd);
  const [x4, y4] = polar(rInner, aStart);
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
};

const midPoint = (r, a1, a2) => polar(r, (a1 + a2) / 2);

const [leftTopX, leftTopY] = polar(R_EDGE, -A_MAX);
const [rightTopX, rightTopY] = polar(R_EDGE, A_MAX);
const OUTER_PATH = `M ${leftTopX} ${leftTopY} A ${R_EDGE} ${R_EDGE} 0 0 1 ${rightTopX} ${rightTopY} L ${rightTopX} ${CY + 25} L ${leftTopX} ${CY + 25} Z`;

function ring(catId, rInner, rOuter, color, prices) {
  const bands = [
    { part: "left", aStart: -A_MAX, aEnd: -A_SPLIT },
    { part: "center", aStart: -A_SPLIT, aEnd: A_SPLIT },
    { part: "right", aStart: A_SPLIT, aEnd: A_MAX },
  ];
  return bands.map((b) => {
    const mid = midPoint((rInner + rOuter) / 2, b.aStart, b.aEnd);
    const isSide = b.part !== "center";
    const remaining = prices[b.part].remaining;
    const total = prices[b.part].total;
    return {
      id: `${catId}-${b.part}`,
      label: `${catId.toUpperCase()} ${b.part.toUpperCase()}`,
      color,
      price: prices[b.part].price,
      remaining,
      total,
      statusText: remaining / total <= 0.15 ? "Hampir habis" : "Tersedia",
      shape: { kind: "arc", d: arcBand(rInner, rOuter, b.aStart, b.aEnd) },
      anchor: { x: mid[0], y: mid[1] },
      rotate: isSide ? -90 : 0,
    };
  });
}

export const ZONES = [
  {
    id: "vvip",
    label: "VVIP",
    price: 18500000,
    remaining: 6,
    total: 40,
    statusText: "Hampir habis",
    color: C.hot,
    shape: { kind: "rect", x: 535, y: 590, w: 100, h: 55, rx: 8 },
    anchor: { x: 585, y: 617 },
    rotate: 0,
  },
  {
    id: "festival",
    label: "Festival",
    price: 3600000,
    remaining: 40,
    total: 500,
    statusText: "Tersedia",
    color: C.violet,
    shape: { kind: "rect", x: 395, y: 330, w: 380, h: 350, rx: 60 },
    anchor: { x: 585, y: 415 },
    rotate: 0,
  },
  ...ring("cat1", R0, R1, C.gold, {
    left: { price: 2950000, remaining: 95, total: 220 },
    center: { price: 2950000, remaining: 120, total: 260 },
    right: { price: 2950000, remaining: 101, total: 220 },
  }),
  ...ring("cat2", R1, R2, C.cyan, {
    left: { price: 2150000, remaining: 180, total: 260 },
    center: { price: 2150000, remaining: 210, total: 300 },
    right: { price: 2150000, remaining: 175, total: 260 },
  }),
  ...ring("cat3", R2, R3, C.balkon, {
    left: { price: 1350000, remaining: 300, total: 360 },
    center: { price: 1350000, remaining: 380, total: 420 },
    right: { price: 1350000, remaining: 295, total: 360 },
  }),
];

const LEGEND = [
  { label: "VVIP", color: C.hot },
  { label: "Festival", color: C.violet },
  { label: "Cat 1", color: C.gold },
  { label: "Cat 2", color: C.cyan },
  { label: "Cat 3", color: C.balkon },
];

const VIEW = { minX: 0, minY: 0, w: 1170, h: 860 };
const toPct = (x, y) => ({ left: `${(x / VIEW.w) * 100}%`, top: `${(y / VIEW.h) * 100}%` });

export default function VenueMapDomeStage({ selectedId, onSelect }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  // active zone hanya untuk styling hover/selected di dalam peta —
  // detail harga/qty/beli tiket ditampilkan oleh TicketPage, bukan di sini.
  const active = selectedId !== undefined ? selectedId : hovered;

  const handleEnter = (id) => setHovered(id);
  const handleLeave = () => setHovered(null);

  const handleClick = (id) => {
    if (onSelect) onSelect(id);
    setHovered(id);
  };

  return (
    <div className="w-full flex items-center justify-center" style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .vm-body { font-family: 'Space Grotesk', sans-serif; }
        .vm-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes vm-pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        .vm-scarce { animation: vm-pulse 1.6s ease-in-out infinite; }
        .vm-zone { transition: opacity 180ms ease, filter 180ms ease; cursor: pointer; }
        .vm-zone:hover, .vm-zone.is-active { filter: brightness(1.22); }
        .vm-zone:focus-visible { outline: 2px solid ${C.text}; outline-offset: 2px; }
      `}</style>

      <div className="vm-body w-full">
        <div
          className="relative rounded-3xl p-6 md:p-10"
          style={{ background: C.panel, border: `1px solid ${C.border}` }}
        >
          <div
            className="absolute top-6 right-6 z-20 flex flex-col rounded-xl overflow-hidden shadow-lg"
            style={{ border: `1px solid ${C.border}` }}
          >
            <button
              type="button"
              aria-label="Perbesar"
              onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
              className="p-3 flex items-center justify-center hover:bg-neutral-800 transition-colors"
              style={{ background: C.stage, color: C.text }}
            >
              <Plus size={18} />
            </button>
            <div style={{ height: 1, background: C.border }} />
            <button
              type="button"
              aria-label="Perkecil"
              onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
              className="p-3 flex items-center justify-center hover:bg-neutral-800 transition-colors"
              style={{ background: C.stage, color: C.text }}
            >
              <Minus size={18} />
            </button>
          </div>

          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
            onMouseLeave={handleLeave}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%", transition: "transform 250ms ease" }}
            >
              <svg viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`} className="w-full h-full">
                <path d={OUTER_PATH} fill={C.panel} stroke={C.border} strokeWidth="2" />

                {ZONES.filter((z) => z.shape.kind === "arc").map((z) => {
                  const scarce = z.remaining / z.total <= 0.15;
                  const isActive = active === z.id;
                  return (
                    <path
                      key={z.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${z.label}, ${fmtIDR(z.price)}, ${z.remaining} tersisa`}
                      d={z.shape.d}
                      fill={z.color}
                      fillOpacity={isActive ? 0.85 : 0.5}
                      stroke={C.bg}
                      strokeWidth={4}
                      className={`vm-zone${isActive ? " is-active" : ""}${scarce ? " vm-scarce" : ""}`}
                      onMouseEnter={() => handleEnter(z.id)}
                      onFocus={() => handleEnter(z.id)}
                      onBlur={handleLeave}
                      onClick={() => handleClick(z.id)}
                    />
                  );
                })}

                {ZONES.filter((z) => z.shape.kind === "rect").map((z) => {
                  const scarce = z.remaining / z.total <= 0.15;
                  const isActive = active === z.id;
                  return (
                    <rect
                      key={z.id}
                      tabIndex={0}
                      role="button"
                      aria-label={`${z.label}, ${fmtIDR(z.price)}, ${z.remaining} tersisa`}
                      x={z.shape.x}
                      y={z.shape.y}
                      width={z.shape.w}
                      height={z.shape.h}
                      rx={z.shape.rx}
                      fill={z.color}
                      fillOpacity={isActive ? 0.9 : 0.65}
                      stroke={C.bg}
                      strokeWidth={4}
                      className={`vm-zone${isActive ? " is-active" : ""}${scarce ? " vm-scarce" : ""}`}
                      onMouseEnter={() => handleEnter(z.id)}
                      onFocus={() => handleEnter(z.id)}
                      onBlur={handleLeave}
                      onClick={() => handleClick(z.id)}
                    />
                  );
                })}

                <rect x="545" y="540" width="80" height="32" rx="4" fill={C.stage} />
                <text x="585" y="561" textAnchor="middle" className="vm-mono" fontSize="13" fill={C.muted} letterSpacing="2">
                  FOH
                </text>

                <rect x="555" y="645" width="60" height="60" fill={C.stage} />

                <rect x="470" y="700" width="230" height="120" rx="10" fill={C.stage} />
                <text x="585" y="768" textAnchor="middle" className="vm-mono" fontSize="34" fontWeight="700" fill={C.text} letterSpacing="3">
                  STAGE
                </text>

                {ZONES.map((z) => (
                  <text
                    key={`label-${z.id}`}
                    x={z.anchor.x}
                    y={z.anchor.y}
                    textAnchor="middle"
                    className="vm-mono"
                    fontSize={z.rotate ? 12 : z.id === "festival" ? 15 : z.id === "vvip" ? 13 : 14}
                    fontWeight="700"
                    fill={C.text}
                    transform={z.rotate ? `rotate(${z.rotate} ${z.anchor.x} ${z.anchor.y})` : undefined}
                    style={{ pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                  >
                    {z.label.toUpperCase()}
                  </text>
                ))}
              </svg>

              {/* Tooltip minimalis tanpa harga */}
              {hovered && ZONES.find((z) => z.id === hovered) && (
                <div
                  className="vm-body absolute z-30 -translate-x-1/2 -translate-y-full px-3 py-1.5 rounded-xl text-center shadow-xl"
                  style={{
                    ...toPct(ZONES.find((z) => z.id === hovered).anchor.x, ZONES.find((z) => z.id === hovered).anchor.y - 26),
                    background: C.stage,
                    border: `1px solid ${ZONES.find((z) => z.id === hovered).color}`,
                    pointerEvents: "none",
                  }}
                >
                  <p className="vm-mono text-xs font-bold uppercase tracking-wider" style={{ color: C.text }}>
                    {ZONES.find((z) => z.id === hovered).label}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6">
          {LEGEND.map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <span className="inline-block rounded-full" style={{ width: 10, height: 10, background: l.color }} />
              <span className="vm-mono text-xs" style={{ color: C.muted }}>
                {l.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const categories = ZONES.map((z) => ({
  ...z,
  hex: z.color,
  desc: "Akses area konser utama dan sekitarnya",
  available: z.remaining > 0,
  statusText: z.remaining / z.total <= 0.15 ? "Hampir habis" : "Tersedia",
  // PricePanel reads `cat.left` (not `remaining`) for quantity limits
  // and the "X tersedia" label — keep both in sync.
  left: z.remaining,
}));
