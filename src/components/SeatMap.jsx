import { useMemo } from "react";
import { categories } from "../data/venueData";


function bandPath(o, i) {
  return (
    `M ${o.left} ${o.top} L ${o.left} ${o.bottom - o.r} Q ${o.left} ${o.bottom} ${o.left + o.r} ${o.bottom} ` +
    `L ${o.right - o.r} ${o.bottom} Q ${o.right} ${o.bottom} ${o.right} ${o.bottom - o.r} L ${o.right} ${o.top} ` +
    `L ${i.right} ${i.top} L ${i.right} ${i.bottom - i.r} Q ${i.right} ${i.bottom} ${i.right - i.r} ${i.bottom} ` +
    `L ${i.left + i.r} ${i.bottom} Q ${i.left} ${i.bottom} ${i.left} ${i.bottom - i.r} L ${i.left} ${i.top} Z`
  );
}
function pitPath(p) {
  return (
    `M ${p.left} ${p.top} L ${p.left} ${p.bottom - p.r} Q ${p.left} ${p.bottom} ${p.left + p.r} ${p.bottom} ` +
    `L ${p.right - p.r} ${p.bottom} Q ${p.right} ${p.bottom} ${p.right} ${p.bottom - p.r} L ${p.right} ${p.top} Z`
  );
}

const PIT = { left: 310, right: 490, top: 158, bottom: 378, r: 85 };
const CAT1 = { left: 255, right: 545, top: 130, bottom: 428, r: 112 };
const CAT2 = { left: 195, right: 605, top: 108, bottom: 488, r: 150 };
const CAT3 = { left: 128, right: 672, top: 88, bottom: 550, r: 200 };
const CAT5 = { left: 35, right: 765, top: 55, bottom: 618, r: 260 };
const BOUNDARY = { left: 18, right: 782, top: 20, bottom: 632, r: 280 };

const RING_TIERS = [
  { id: "cat5", outer: CAT5, inner: CAT3, labelY: 600 },
  { id: "cat3", outer: CAT3, inner: CAT2, labelY: 535 },
  { id: "cat2", outer: CAT2, inner: CAT1, labelY: 472 },
  { id: "cat1", outer: CAT1, inner: PIT, labelY: 145 },
];

export default function SeatMap({ selectedId, onSelect, onHover }) {
  const catById = useMemo(
    () => Object.fromEntries(categories.map((c) => [c.id, c])),
    []
  );

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
      viewBox="0 0 800 640"
      className="w-full h-full min-h-[420px]"
      role="img"
      aria-label="Denah tempat duduk venue"
    >
      {/* decorative outer boundary, echoes the venue outline */}
      <path d={pitPath(BOUNDARY)} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />

      {/* stage tower descending into the pit */}
      <rect
        x="366" y="0" width="68" height="158" rx="6"
        fill="#05050a" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"
      />
      <text x="400" y="34" textAnchor="middle" fontSize="11"
        className="fill-[#f2b807] font-mono tracking-[2px]">PANGGUNG</text>

      {/* festival pit */}
      <path
        d={pitPath(PIT)}
        data-id="festival"
        fill={catById.festival.hex}
        fillOpacity={0.55}
        stroke={catById.festival.hex}
        strokeOpacity={0.9}
        className={zoneClasses("festival")}
        onMouseEnter={() => handleEnter("festival")}
        onMouseLeave={handleLeave}
        onClick={() => onSelect("festival")}
      />
      <text x="400" y="200" textAnchor="middle" fontSize="13" className="fill-white/85 font-mono pointer-events-none">FESTIVAL</text>
      <text x="400" y="360" textAnchor="middle" fontSize="13" className="fill-white/85 font-mono pointer-events-none">FESTIVAL</text>

      {/* nested ring tiers: CAT5 → CAT3 → CAT2 → CAT1 */}
      {RING_TIERS.map((tier) => {
        const cat = catById[tier.id];
        return (
          <g key={tier.id}>
            <path
              d={bandPath(tier.outer, tier.inner)}
              data-id={tier.id}
              fill={cat.hex}
              fillOpacity={0.55}
              stroke={cat.hex}
              strokeOpacity={0.9}
              className={zoneClasses(tier.id)}
              onMouseEnter={() => handleEnter(tier.id)}
              onMouseLeave={handleLeave}
              onClick={() => onSelect(tier.id)}
            />
            <text
              x="400" y={tier.labelY} textAnchor="middle" fontSize="13"
              className="fill-white/85 font-mono pointer-events-none"
            >
              {cat.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* CAT4 — narrow blocks flanking the stage tower */}
      {[150, 588].map((x) => (
        <rect
          key={x}
          x={x} y="88" width="62" height="118" rx="4"
          data-id="cat4"
          fill={catById.cat4.hex} fillOpacity={0.55}
          stroke={catById.cat4.hex} strokeOpacity={0.9}
          className={zoneClasses("cat4")}
          onMouseEnter={() => handleEnter("cat4")}
          onMouseLeave={handleLeave}
          onClick={() => onSelect("cat4")}
        />
      ))}
      <text x="181" y="150" textAnchor="middle" fontSize="11" className="fill-white/85 font-mono pointer-events-none">CAT 4</text>
      <text x="619" y="150" textAnchor="middle" fontSize="11" className="fill-white/85 font-mono pointer-events-none">CAT 4</text>

      {/* CAT6 — outermost corner blocks */}
      {[18, 684].map((x) => (
        <rect
          key={x}
          x={x} y="50" width="98" height="150" rx="4"
          data-id="cat6"
          fill={catById.cat6.hex} fillOpacity={0.5}
          stroke={catById.cat6.hex} strokeOpacity={0.9}
          className={zoneClasses("cat6")}
          onMouseEnter={() => handleEnter("cat6")}
          onMouseLeave={handleLeave}
          onClick={() => onSelect("cat6")}
        />
      ))}
      <text x="67" y="130" textAnchor="middle" fontSize="11" className="fill-white/85 font-mono pointer-events-none">CAT 6</text>
      <text x="733" y="130" textAnchor="middle" fontSize="11" className="fill-white/85 font-mono pointer-events-none">CAT 6</text>

      {/* decorative central mixing hub — not interactive, just set-dressing */}
      <g className="pointer-events-none">
        <rect x="392" y="158" width="16" height="102" fill="#33323f" />
        <rect x="330" y="252" width="140" height="14" fill="#33323f" />
        <circle cx="400" cy="259" r="20" fill="#26252f" stroke="#4a4959" />
        <rect x="392" y="266" width="16" height="80" fill="#33323f" />
        <rect x="372" y="346" width="56" height="30" rx="4" fill="#26252f" stroke="#4a4959" />
        <text x="400" y="366" textAnchor="middle" fontSize="9" className="fill-[#8b8996] font-mono">MIX</text>
        <rect x="330" y="330" width="26" height="26" fill="#26252f" stroke="#4a4959" transform="rotate(45 343 343)" />
        <rect x="444" y="330" width="26" height="26" fill="#26252f" stroke="#4a4959" transform="rotate(45 457 343)" />
        <text x="343" y="347" textAnchor="middle" fontSize="8" className="fill-[#8b8996] font-mono">FOH</text>
        <text x="457" y="347" textAnchor="middle" fontSize="8" className="fill-[#8b8996] font-mono">FOH</text>
      </g>
    </svg>
  );
}
