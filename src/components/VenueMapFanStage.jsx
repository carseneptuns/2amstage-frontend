import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

const CX = 563;
const CY = 410;
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

// Same tiering logic as SeatMap.jsx / SeatMapArenaX.jsx: lightest purple for
// the cheapest, farthest-out tiers, deepening as you get closer to the
// stage, gold for the two premium tiers right next to it.
const ZONES = [
  {
    id: "cat2",
    label: "Cat 2",
    price: 1890000,
    left: 210,
    total: 350,
    hex: "#c9bdff",
    fillOpacity: 0.5,
    shape: { kind: "arc", d: arcBand(R_MID, R_OUTER, -50, 50) },
    labelPos: { x: 563, y: 30 },
  },
  {
    id: "cat5b",
    label: "Cat 5B",
    price: 1420000,
    left: 155,
    total: 250,
    hex: "#a996f7",
    fillOpacity: 0.55,
    shape: { kind: "rect", x: 220, y: 430, width: 85, height: 125, rx: 6 },
    labelPos: { x: 262, y: 492 },
  },
  {
    id: "cat5a",
    label: "Cat 5A",
    price: 1420000,
    left: 140,
    total: 250,
    hex: "#a996f7",
    fillOpacity: 0.55,
    shape: { kind: "rect", x: 820, y: 430, width: 85, height: 125, rx: 6 },
    labelPos: { x: 862, y: 492 },
  },
  {
    id: "cat1",
    label: "Cat 1",
    price: 2650000,
    left: 130,
    total: 300,
    hex: "#8a76e8",
    fillOpacity: 0.6,
    shape: { kind: "arc", d: arcBand(R_INNER, R_MID, -50, 50) },
    labelPos: { x: 563, y: 136 },
  },
  {
    id: "cat3b",
    label: "Cat 3B",
    price: 2150000,
    left: 95,
    total: 200,
    hex: "#6a58c9",
    fillOpacity: 0.7,
    shape: { kind: "rect", x: 235, y: 220, width: 140, height: 195, rx: 6 },
    labelPos: { x: 305, y: 320 },
  },
  {
    id: "cat3a",
    label: "Cat 3A",
    price: 2150000,
    left: 88,
    total: 200,
    hex: "#6a58c9",
    fillOpacity: 0.7,
    shape: { kind: "rect", x: 751, y: 220, width: 140, height: 195, rx: 6 },
    labelPos: { x: 821, y: 320 },
  },
  {
    id: "festival",
    label: "Festival",
    price: 3200000,
    left: 24,
    total: 400,
    hex: "#f2b807",
    fillOpacity: 0.6,
    shape: { kind: "rect", x: 383, y: 220, width: 360, height: 165, rx: 8 },
    labelPos: { x: 563, y: 305 },
  },
  {
    id: "cat4b",
    label: "Cat 4B",
    price: 2780000,
    left: 9,
    total: 150,
    hex: "#e0a800",
    fillOpacity: 0.75,
    shape: { kind: "rect", x: 310, y: 430, width: 100, height: 125, rx: 6 },
    labelPos: { x: 360, y: 492 },
  },
  {
    id: "cat4a",
    label: "Cat 4A",
    price: 2780000,
    left: 12,
    total: 150,
    hex: "#e0a800",
    fillOpacity: 0.75,
    shape: { kind: "rect", x: 714, y: 430, width: 100, height: 125, rx: 6 },
    labelPos: { x: 764, y: 492 },
  },
];

const LEGEND = [
  { label: "Cat 2", hex: "#c9bdff" },
  { label: "Cat 5", hex: "#a996f7" },
  { label: "Cat 1", hex: "#8a76e8" },
  { label: "Cat 3", hex: "#6a58c9" },
  { label: "Festival", hex: "#f2b807" },
  { label: "Cat 4", hex: "#e0a800" },
];

const VIEW = { minX: -15, minY: -15, w: 1156, h: 755 };

export default function VenueMapFanStage({ selectedId, onSelect, onHover }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  const handleHover = (id) => {
    setHovered(id);
    onHover && onHover(id);
  };
  const handleLeave = () => {
    setHovered(null);
    onHover && onHover(null);
  };

  const zoneClasses = (id, scarce) =>
    [
      "cursor-pointer transition-[filter] duration-150",
      "hover:brightness-125",
      selectedId === id ? "stroke-white stroke-2" : "",
      scarce ? "animate-pulse" : "",
    ].join(" ");

  return (
    // No self-contained panel/background/max-width — this fills whatever
    // container it's placed in (TicketPage's seatmap-wrap card already
    // supplies the background, border, and padding).
    <div className="w-full h-full flex flex-col items-center">
      <div className="relative w-full flex-1 min-h-[420px]">
        <div className="absolute top-2 right-2 z-20 flex flex-col rounded-xl overflow-hidden border border-white/[0.08]">
          <button
            type="button"
            aria-label="Perbesar"
            onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
            className="p-2 flex items-center justify-center bg-[#1d1d2e] text-[#f3f2f8] hover:bg-[#262638] transition-colors"
          >
            <Plus size={16} />
          </button>
          <div className="h-px bg-white/[0.08]" />
          <button
            type="button"
            aria-label="Perkecil"
            onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
            className="p-2 flex items-center justify-center bg-[#1d1d2e] text-[#f3f2f8] hover:bg-[#262638] transition-colors"
          >
            <Minus size={16} />
          </button>
        </div>

        <div className="relative w-full h-full overflow-hidden rounded-2xl" onMouseLeave={handleLeave}>
          <div
            className="absolute inset-0"
            style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%", transition: "transform 250ms ease" }}
          >
            <svg
              viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`}
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
              role="img"
              aria-label="Denah tempat duduk venue"
            >
              {/* decorative outer boundary only — no fill, so it never
                  shows up as a second panel behind the zones */}
              <path d={OUTER_PATH} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />

              {ZONES.map((z) => {
                const scarce = z.left <= 20;
                const common = {
                  key: z.id,
                  tabIndex: 0,
                  role: "button",
                  "aria-label": z.label,
                  fill: z.hex,
                  fillOpacity: z.fillOpacity,
                  stroke: z.hex,
                  strokeOpacity: 0.9,
                  className: zoneClasses(z.id, scarce),
                  onMouseEnter: () => handleHover(z.id),
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

              {/* stage */}
              <rect
                x="303" y="565" width="520" height="140" rx="12"
                fill="#05050a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"
              />
              <text
                x="563" y="643" textAnchor="middle" fontSize="26" fontWeight="700"
                letterSpacing="6" className="fill-[#f2b807] font-mono"
              >
                STAGE
              </text>

              {ZONES.map((z) => (
                <text
                  key={`label-${z.id}`}
                  x={z.labelPos.x} y={z.labelPos.y} textAnchor="middle" fontSize="13"
                  className="fill-white/85 font-mono pointer-events-none"
                >
                  {z.label.toUpperCase()}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4">
        {LEGEND.map((l) => (
          <div key={l.label} className="flex items-center gap-1.5 text-[11.5px] text-[#918da3]">
            <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: l.hex }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export const categories = ZONES.map((z) => ({
  ...z,
  desc: "Akses area konser utama dan sekitarnya",
}));
