import { useMemo } from "react";

// Category data specific to this stage layout — exported so TicketPage's
// PricePanel/legend can show matching labels, prices, and colors.
export const categories = [
  { id: "category2", label: "Category 2", desc: "Tribun terluar", price: 850000, left: 46, hex: "#a996f7" },
  { id: "platinum_tribune", label: "Platinum Tribune", desc: "Tribun berjenjang, pandangan luas", price: 1650000, left: 24, hex: "#8a76e8" },
  { id: "platinum_floor", label: "Platinum Floor", desc: "Lantai dasar, mengelilingi panggung", price: 2950000, left: 15, hex: "#6a58c9" },
  { id: "vip_package", label: "VIP Package", desc: "Barisan terdepan, tepat di sisi panggung", price: 4750000, left: 4, hex: "#f2b807" },
];

// --- geometry helpers ---------------------------------------------------
// This layout is a full oval arena (closed loop, no open "mouth" like the
// horseshoe map) with an X-shaped stage sitting dead center. The two outer
// tiers are simple concentric ellipses; the two inner tiers (closest to
// the stage) are split into four wedges — A (top) / B (right) / C (bottom)
// / D (left) — the same way the reference venue divides its floor and VIP
// packages around the stage.
function epoint(cx, cy, rx, ry, deg) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + rx * Math.cos(rad), y: cy + ry * Math.sin(rad) };
}
function wedgePath(cx, cy, rxOut, ryOut, rxIn, ryIn, a1, a2) {
  const large = a2 - a1 > 180 ? 1 : 0;
  const p1 = epoint(cx, cy, rxOut, ryOut, a1);
  const p2 = epoint(cx, cy, rxOut, ryOut, a2);
  const p3 = epoint(cx, cy, rxIn, ryIn, a2);
  const p4 = epoint(cx, cy, rxIn, ryIn, a1);
  return (
    `M ${p1.x} ${p1.y} A ${rxOut} ${ryOut} 0 ${large} 1 ${p2.x} ${p2.y} ` +
    `L ${p3.x} ${p3.y} A ${rxIn} ${ryIn} 0 ${large} 0 ${p4.x} ${p4.y} Z`
  );
}

const CX = 400, CY = 350;
// wedge angle ranges: top(A) / right(B) / bottom(C) / left(D)
const WEDGES = [
  { key: "A", a1: 225, a2: 315, labelDeg: 270 },
  { key: "B", a1: 315, a2: 405, labelDeg: 0 },
  { key: "C", a1: 45, a2: 135, labelDeg: 90 },
  { key: "D", a1: 135, a2: 225, labelDeg: 180 },
];

export default function SeatMapArenaX({ selectedId, onSelect, onHover }) {
  const catById = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, c])), []);

  const handleEnter = (id) => onHover && onHover(id);
  const handleLeave = () => onHover && onHover(null);

  const zoneClasses = (id) =>
    [
      "cursor-pointer transition-[filter] duration-150",
      "hover:brightness-125",
      selectedId === id ? "stroke-white stroke-2" : "",
    ].join(" ");

  return (
    <svg
      viewBox="0 0 800 700"
      className="w-full h-full min-h-[420px]"
      role="img"
      aria-label="Denah tempat duduk venue"
    >
      {/* CATEGORY 2 — outermost ring, drawn as a full ellipse */}
      <ellipse
        cx={CX} cy={CY} rx="380" ry="330"
        data-id="category2"
        fill={catById.category2.hex} fillOpacity={0.5}
        stroke={catById.category2.hex} strokeOpacity={0.9}
        className={zoneClasses("category2")}
        onMouseEnter={() => handleEnter("category2")}
        onMouseLeave={handleLeave}
        onClick={() => onSelect("category2")}
      />
      <text x={CX} y={CY - 305} textAnchor="middle" fontSize="13" className="fill-white/85 font-mono pointer-events-none">CATEGORY 2</text>

      {/* PLATINUM TRIBUNE — next ring in, also a full ellipse */}
      <ellipse
        cx={CX} cy={CY} rx="300" ry="258"
        data-id="platinum_tribune"
        fill={catById.platinum_tribune.hex} fillOpacity={0.6}
        stroke={catById.platinum_tribune.hex} strokeOpacity={0.9}
        className={zoneClasses("platinum_tribune")}
        onMouseEnter={() => handleEnter("platinum_tribune")}
        onMouseLeave={handleLeave}
        onClick={() => onSelect("platinum_tribune")}
      />
      <text x={CX} y={CY - 228} textAnchor="middle" fontSize="12" className="fill-white/85 font-mono pointer-events-none">PLATINUM TRIBUNE</text>

      {/* PLATINUM FLOOR — split into 4 wedges around the stage */}
      {WEDGES.map((w) => {
        const lp = epoint(CX, CY, 165, 140, w.labelDeg);
        return (
          <g key={`floor-${w.key}`}>
            <path
              d={wedgePath(CX, CY, 205, 175, 118, 100, w.a1, w.a2)}
              data-id="platinum_floor"
              fill={catById.platinum_floor.hex} fillOpacity={0.75}
              stroke="white" strokeOpacity={0.15}
              className={zoneClasses("platinum_floor")}
              onMouseEnter={() => handleEnter("platinum_floor")}
              onMouseLeave={handleLeave}
              onClick={() => onSelect("platinum_floor")}
            />
            <text x={lp.x} y={lp.y} textAnchor="middle" fontSize="11" className="fill-white/85 font-mono pointer-events-none">
              FLOOR {w.key}
            </text>
          </g>
        );
      })}

      {/* VIP PACKAGE — innermost wedges, hugging the stage */}
      {WEDGES.map((w) => {
        const lp = epoint(CX, CY, 82, 68, w.labelDeg);
        return (
          <g key={`vip-${w.key}`}>
            <path
              d={wedgePath(CX, CY, 118, 100, 55, 45, w.a1, w.a2)}
              data-id="vip_package"
              fill={catById.vip_package.hex} fillOpacity={0.85}
              stroke="white" strokeOpacity={0.15}
              className={zoneClasses("vip_package")}
              onMouseEnter={() => handleEnter("vip_package")}
              onMouseLeave={handleLeave}
              onClick={() => onSelect("vip_package")}
            />
            <text x={lp.x} y={lp.y} textAnchor="middle" fontSize="10" className="fill-black/70 font-mono font-bold pointer-events-none">
              VIP {w.key}
            </text>
          </g>
        );
      })}

      {/* X-shaped stage — decorative, not interactive */}
      <g className="pointer-events-none">
        <rect x={CX - 14} y={CY - 55} width="28" height="110" fill="#3a3a45" transform={`rotate(45 ${CX} ${CY})`} />
        <rect x={CX - 14} y={CY - 55} width="28" height="110" fill="#3a3a45" transform={`rotate(-45 ${CX} ${CY})`} />
        <text x={CX} y={CY + 6} textAnchor="middle" fontSize="17" fontWeight="700" className="fill-white font-mono tracking-widest">
          STAGE
        </text>
      </g>
    </svg>
  );
}
