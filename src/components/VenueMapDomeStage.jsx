import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

/* ---------------------------------------------------------------
    Denah "Dome Stage" — Menampilkan visualisasi venue dan panggung saja.
------------------------------------------------------------------ */
const C = {
  bg: "#0B0B12",
  panel: "#12121C",
  border: "#262638",
  stage: "#1D1D29",
  text: "#F1F1F5",
  muted: "#8C8C9C",
};

/* geometry */
const CX = 585;
const CY = 660;
const R_EDGE = 565; // venue silhouette
const A_MAX = 72; // full sweep -72..72

const polar = (r, angleDeg) => {
  const rad = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.sin(rad), CY - r * Math.cos(rad)];
};

const [leftTopX, leftTopY] = polar(R_EDGE, -A_MAX);
const [rightTopX, rightTopY] = polar(R_EDGE, A_MAX);
const OUTER_PATH = `M ${leftTopX} ${leftTopY} A ${R_EDGE} ${R_EDGE} 0 0 1 ${rightTopX} ${rightTopY} L ${rightTopX} ${CY + 25} L ${leftTopX} ${CY + 25} Z`;

const VIEW = { minX: 0, minY: 0, w: 1170, h: 860 };

export default function VenueMapDomeStage() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="w-full flex items-center justify-center p-6" style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .vm-body { font-family: 'Space Grotesk', sans-serif; }
        .vm-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      <div className="vm-body w-full max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-semibold mb-2" style={{ color: C.text }}>
          Denah Panggung Konser
        </h2>
        <p className="text-base mb-6" style={{ color: C.muted }}>
          Layout area venue dan p utama.
        </p>

        <div
          className="relative rounded-3xl p-6 md:p-10"
          style={{ background: C.panel, border: `1px solid ${C.border}` }}
        >
          <div
            className="absolute top-6 right-6 z-20 flex flex-col rounded-xl overflow-hidden"
            style={{ border: `1px solid ${C.border}` }}
          >
            <button
              type="button"
              aria-label="Perbesar"
              onClick={() => setZoom((z) => Math.min(1.8, +(z + 0.15).toFixed(2)))}
              className="p-3 flex items-center justify-center"
              style={{ background: C.stage, color: C.text }}
            >
              <Plus size={18} />
            </button>
            <div style={{ height: 1, background: C.border }} />
            <button
              type="button"
              aria-label="Perkecil"
              onClick={() => setZoom((z) => Math.max(0.7, +(z - 0.15).toFixed(2)))}
              className="p-3 flex items-center justify-center"
              style={{ background: C.stage, color: C.text }}
            >
              <Minus size={18} />
            </button>
          </div>

          <div
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}
          >
            <div
              className="absolute inset-0"
              style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%", transition: "transform 250ms ease" }}
            >
              <svg viewBox={`${VIEW.minX} ${VIEW.minY} ${VIEW.w} ${VIEW.h}`} className="w-full h-full">
                {/* Silhouette Venue */}
                <path d={OUTER_PATH} fill={C.panel} stroke={C.border} strokeWidth="2" />

                {/* FOH (decorative) */}
                <rect x="545" y="540" width="80" height="32" rx="4" fill={C.stage} />
                <text x="585" y="561" textAnchor="middle" className="vm-mono" fontSize="13" fill={C.muted} letterSpacing="2">
                  FOH
                </text>

                {/* Catwalk connector (decorative) */}
                <rect x="555" y="645" width="60" height="60" fill={C.stage} />

                {/* STAGE (decorative) */}
                <rect x="470" y="700" width="230" height="120" rx="10" fill={C.stage} />
                <text x="585" y="768" textAnchor="middle" className="vm-mono" fontSize="34" fontWeight="700" fill={C.text} letterSpacing="3">
                  STAGE
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}