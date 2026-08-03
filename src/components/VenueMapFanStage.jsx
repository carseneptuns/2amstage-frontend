import React, { useMemo, useState } from "react";
import { Plus, Minus } from "lucide-react";

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

const CX = 563;
const CY = 410; // Disesuaikan sedikit ke atas agar stage yang lebih besar tetap proporsional
const R_INNER = 205;
const R_MID = 330;
const R_OUTER = 415;

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

const OUTER_PATH =
  "M 232 134 L 215 573 L 310 710 L 816 710 L 911 573 L 894 134 A 415 415 0 0 0 232 134 Z";

const ZONES = [
  {
    id: "festival",
    label: "Festival",
    price: 3200000,
    left: 24,
    total: 400,
    color: C.violet,
    shape: { kind: "rect", x: 383, y: 220, width: 360, height: 165, rx: 8 },
    labelPos: { x: 563, y: 305 },
  },
  {
    id: "cat1",
    label: "Cat 1",
    price: 2650000,
    left: 130,
    total: 300,
    color: C.gold,
    shape: { kind: "arc", d: arcBand(R_INNER, R_MID, -50, 50) },
    labelPos: { x: 563, y: 136 },
  },
  {
    id: "cat2",
    label: "Cat 2",
    price: 1890000,
    left: 210,
    total: 350,
    color: C.balkon,
    shape: { kind: "arc", d: arcBand(R_MID, R_OUTER, -50, 50) },
    labelPos: { x: 563, y: 30 },
  },
  {
    id: "cat3b",
    label: "Cat 3B",
    price: 2150000,
    left: 95,
    total: 200,
    color: C.cyan,
    shape: { kind: "rect", x: 235, y: 220, width: 140, height: 195, rx: 6 },
    labelPos: { x: 305, y: 320 },
  },
  {
    id: "cat3a",
    label: "Cat 3A",
    price: 2150000,
    left: 88,
    total: 200,
    color: C.cyan,
    shape: { kind: "rect", x: 751, y: 220, width: 140, height: 195, rx: 6 },
    labelPos: { x: 821, y: 320 },
  },
  {
    id: "cat4b",
    label: "Cat 4B",
    price: 2780000,
    left: 9,
    total: 150,
    color: C.hot,
    shape: { kind: "rect", x: 310, y: 430, width: 100, height: 125, rx: 6 },
    labelPos: { x: 360, y: 492 },
  },
  {
    id: "cat4a",
    label: "Cat 4A",
    price: 2780000,
    left: 12,
    total: 150,
    color: C.hot,
    shape: { kind: "rect", x: 714, y: 430, width: 100, height: 125, rx: 6 },
    labelPos: { x: 764, y: 492 },
  },
  {
    id: "cat5b",
    label: "Cat 5B",
    price: 1420000,
    left: 155,
    total: 250,
    color: C.balkon,
    shape: { kind: "rect", x: 220, y: 430, width: 85, height: 125, rx: 6 },
    labelPos: { x: 262, y: 492 },
  },
  {
    id: "cat5a",
    label: "Cat 5A",
    price: 1420000,
    left: 140,
    total: 250,
    color: C.balkon,
    shape: { kind: "rect", x: 820, y: 430, width: 85, height: 125, rx: 6 },
    labelPos: { x: 862, y: 492 },
  },
];

const LEGEND = [
  { label: "Festival", color: C.violet },
  { label: "Cat 1", color: C.gold },
  { label: "Cat 2", color: C.balkon },
  { label: "Cat 3", color: C.cyan },
  { label: "Cat 4", color: C.hot },
  { label: "Cat 5", color: C.balkon },
];

const VIEW = { minX: -15, minY: -15, w: 1156, h: 755 };

export default function VenueMapFanStage({ selectedId, onSelect }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  const overallPct = useMemo(() => {
    const total = ZONES.reduce((s, z) => s + z.total, 0);
    const remaining = ZONES.reduce((s, z) => s + z.left, 0);
    return Math.round((remaining / total) * 100);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6" style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .vm-body { font-family: 'Space Grotesk', sans-serif; }
        .vm-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes vm-pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        .vm-scarce { animation: vm-pulse 1.6s ease-in-out infinite; }
        .vm-zone { transition: opacity 180ms ease, filter 180ms ease; cursor: pointer; }
        .vm-zone:hover, .vm-zone.is-active { filter: brightness(1.22); }
      `}</style>

      <div
        className="relative rounded-3xl p-4 md:p-6 w-full max-w-4xl shadow-2xl"
        style={{ background: C.panel, border: `1px solid ${C.border}` }}
      >
        <div
          className="absolute top-4 right-4 z-20 flex flex-col rounded-xl overflow-hidden shadow-md"
          style={{ border: `1px solid ${C.border}` }}
        >
          <button
            type="button"
            aria-label="Perbesar"
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
            className="p-2 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            style={{ background: C.stage, color: C.text }}
          >
            <Plus size={16} />
          </button>
          <div style={{ height: 1, background: C.border }} />
          <button
            type="button"
            aria-label="Perkecil"
            onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
            className="p-2 flex items-center justify-center hover:bg-zinc-800 transition-colors"
            style={{ background: C.stage, color: C.text }}
          >
            <Minus size={16} />
          </button>
        </div>

        <div
          className="relative w-full overflow-hidden rounded-2xl"
          style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
          onMouseLeave={() => setHovered(null)}
        >
          <div
            className="absolute inset-0"
            style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%", transition: "transform 250ms ease" }}
          >
            <svg
              viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`}
              className="w-full h-full"
            >
              <path d={OUTER_PATH} fill={C.panel} stroke={C.border} strokeWidth="2" />

              {ZONES.map((z) => {
                const scarce = z.left <= 20;
                const isSelected = selectedId === z.id;
                const isHovered = hovered === z.id;
                const common = {
                  key: z.id,
                  tabIndex: 0,
                  role: "button",
                  "aria-label": z.label,
                  fill: z.color,
                  fillOpacity: isSelected ? 0.95 : isHovered ? 0.75 : 0.5,
                  stroke: C.bg,
                  strokeWidth: isSelected || isHovered ? 4 : 2,
                  className: `vm-zone${isSelected ? " is-active" : ""}${scarce ? " vm-scarce" : ""}`,
                  onMouseEnter: () => setHovered(z.id),
                  onClick: () => onSelect && onSelect(z.id),
                };
                return z.shape.kind === "arc" ? (
                  <path {...common} d={z.shape.d} />
                ) : (
                  <rect
                    {...common}
                    x={z.shape.x}
                    y={z.shape.y}
                    width={z.shape.width}
                    height={z.shape.height}
                    rx={z.shape.rx}
                  />
                );
              })}

              {/* STAGE UTAMA (Diperbesar: tinggi 140px, lebar 520px) */}
              <rect x="303" y="565" width="520" height="140" rx="12" fill={C.stage} stroke={C.border} strokeWidth="3" />
              <text
                x="563"
                y="643"
                textAnchor="middle"
                className="vm-mono"
                fontSize="38"
                fontWeight="700"
                fill={C.text}
                letterSpacing="6"
              >
                STAGE
              </text>

              {ZONES.map((z) => (
                <text
                  key={`label-${z.id}`}
                  x={z.labelPos.x}
                  y={z.labelPos.y}
                  textAnchor="middle"
                  className="vm-mono"
                  fontSize={13}
                  fontWeight="700"
                  fill={C.text}
                  style={{ pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
                >
                  {z.label.toUpperCase()}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-5">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-2">
            <span className="inline-block rounded-full" style={{ width: 8, height: 8, background: l.color }} />
            <span className="vm-mono text-[11px]" style={{ color: C.muted }}>
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export const categories = ZONES.map((z) => ({
  ...z,
  hex: z.color,
  desc: "Akses area konser utama dan sekitarnya",
}));