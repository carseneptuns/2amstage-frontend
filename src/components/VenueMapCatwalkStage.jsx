import React, { useState } from "react";
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

const ZONES = [
  {
    id: "catwalk-vip",
    label: "Catwalk VIP",
    price: 15500000,
    left: 40,
    color: C.hot,
    points: "400,215 462,262 462,345 400,392 338,345 338,262",
    labelPos: { x: 400, y: 325 },
  },
  {
    id: "ga-kiri",
    label: "GA Kiri",
    price: 4250000,
    left: 500,
    color: C.violet,
    points: "120,160 330,160 300,430 90,470",
    labelPos: { x: 210, y: 300 },
  },
  {
    id: "ga-kanan",
    label: "GA Kanan",
    price: 4250000,
    left: 500,
    color: C.violet,
    points: "680,160 470,160 500,430 710,470",
    labelPos: { x: 590, y: 300 },
  },
  {
    id: "cat-1",
    label: "Category 1",
    price: 2100000,
    left: 900,
    color: C.gold,
    points: "90,478 710,478 700,568 100,568",
    labelPos: { x: 400, y: 523 },
  },
  {
    id: "tribun-kiri",
    label: "Tribun Kiri",
    price: 1450000,
    left: 400,
    color: C.cyan,
    points: "20,150 115,170 85,560 5,560",
    labelPos: { x: 62, y: 360 },
  },
  {
    id: "tribun-kanan",
    label: "Tribun Kanan",
    price: 1450000,
    left: 400,
    color: C.cyan,
    points: "780,150 685,170 715,560 795,560",
    labelPos: { x: 738, y: 360 },
  },
  {
    id: "cat-2",
    label: "Category 2 / Balkon",
    price: 890000,
    left: 1200,
    color: C.balkon,
    points: "40,588 760,588 745,715 55,715",
    labelPos: { x: 400, y: 653 },
  },
];

const VIEW_W = 800;
const VIEW_H = 760;

export default function VenueMapCatwalkStage({ selectedId, onSelect }) {
  const [zoom, setZoom] = useState(1);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full flex items-center justify-center p-2" style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .vm-body { font-family: 'Space Grotesk', sans-serif; }
        .vm-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes vm-pulse { 0%,100% { opacity: 1; } 50% { opacity: .45; } }
        .vm-scarce { animation: vm-pulse 1.6s ease-in-out infinite; }
        .vm-zone { transition: opacity 180ms ease, filter 180ms ease; cursor: pointer; }
        .vm-zone:hover, .vm-zone.is-active { filter: brightness(1.2); }
      `}</style>

      <div className="vm-body w-full max-w-2xl">
        <div
          className="relative rounded-2xl p-4 flex flex-col items-center justify-center shadow-xl"
          style={{ background: C.panel, border: `1px solid ${C.border}` }}
        >
          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 z-20 flex flex-col rounded-xl overflow-hidden shadow-md" style={{ border: `1px solid ${C.border}` }}>
            <button
              type="button"
              aria-label="Perbesar"
              onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
              className="p-2 flex items-center justify-center transition hover:opacity-80"
              style={{ background: C.stage, color: C.text }}
            >
              <Plus size={14} />
            </button>
            <div style={{ height: 1, background: C.border }} />
            <button
              type="button"
              aria-label="Perkecil"
              onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
              className="p-2 flex items-center justify-center transition hover:opacity-80"
              style={{ background: C.stage, color: C.text }}
            >
              <Minus size={14} />
            </button>
          </div>

          {/* SVG Stage Wrapper */}
          <div
            className="relative w-full overflow-hidden rounded-xl"
            style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}
            onMouseLeave={() => setHovered(null)}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%", transition: "transform 250ms ease" }}
            >
              <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="w-full h-full">
                {/* Stage */}
                <rect x="300" y="24" width="200" height="56" rx="10" fill={C.stage} />
                <text x="400" y="57" textAnchor="middle" className="vm-mono" fontSize="16" fill={C.muted} letterSpacing="2">
                  STAGE
                </text>

                {/* Catwalk */}
                <rect x="374" y="80" width="52" height="180" rx="6" fill={C.stage} />
                <text
                  x="400"
                  y="170"
                  textAnchor="middle"
                  className="vm-mono"
                  fontSize="10"
                  fill={C.muted}
                  letterSpacing="2"
                  transform="rotate(-90 400 170)"
                >
                  CATWALK
                </text>

                {/* Interactive Zones (Tanpa Tooltip Harga/Kursi Melayang) */}
                {ZONES.map((z) => {
                  const scarce = z.left <= 20;
                  const isSelected = selectedId === z.id;
                  const isHovered = hovered === z.id;
                  return (
                    <polygon
                      key={z.id}
                      tabIndex={0}
                      role="button"
                      aria-label={z.label}
                      points={z.points}
                      fill={z.color}
                      fillOpacity={isSelected ? 0.95 : isHovered ? 0.75 : 0.5}
                      stroke={z.color}
                      strokeWidth={isSelected || isHovered ? 2.5 : 1}
                      className={`vm-zone${isSelected ? " is-active" : ""}${scarce ? " vm-scarce" : ""}`}
                      onMouseEnter={() => setHovered(z.id)}
                      onClick={() => onSelect && onSelect(z.id)}
                    />
                  );
                })}

                {/* FOH Booth */}
                <rect x="372" y="440" width="56" height="28" rx="4" fill={C.stage} />
                <text x="400" y="458" textAnchor="middle" className="vm-mono" fontSize="9" fill={C.muted} letterSpacing="1">
                  FOH
                </text>

                {/* Zone Labels */}
                {ZONES.map((z) => (
                  <text
                    key={`label-${z.id}`}
                    x={z.labelPos.x}
                    y={z.labelPos.y}
                    textAnchor="middle"
                    className="vm-mono"
                    fontSize={z.id.includes("tribun") ? 11 : 13}
                    fontWeight="700"
                    fill={C.text}
                    style={{ pointerEvents: "none", textShadow: "0 1px 4px rgba(0,0,0,0.8)" }}
                  >
                    {z.label.toUpperCase()}
                  </text>
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const categories = ZONES.map(z => ({
  ...z,
  hex: z.color,
  desc: "Akses area panggung utama dan sekitarnya"
}));