import { useEffect, useRef, useState } from "react";
import { setlist } from "../data/venueData";

const GRADIENTS = [
  "linear-gradient(150deg, #ff2f7e, #7a68d6)",
  "linear-gradient(150deg, #f2b807, #ff2f7e)",
  "linear-gradient(150deg, #9d8cf5, #1c1230)",
  "linear-gradient(150deg, #ff6f3c, #9d8cf5)",
  "linear-gradient(150deg, #3ddc84, #1c1230)",
  "linear-gradient(150deg, #f2b807, #7a68d6)",
  "linear-gradient(150deg, #ff2f7e, #f2b807)",
  "linear-gradient(150deg, #7a68d6, #05050a)",
];
const ROTATIONS = [-4, 3, -2, 4, -3, 2, -5, 3];

/**
 * A manual drag-to-scroll scrubber — deliberately not an auto-advancing
 * carousel. The track + thumb below the polaroid strip is the only way
 * (besides directly dragging the strip) to move through the setlist.
 */
export default function SetlistStrip() {
  const stripRef = useRef(null);
  const trackRef = useRef(null);
  const [thumb, setThumb] = useState({ left: 0, width: 60 });
  const [activeIdx, setActiveIdx] = useState(null);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, left: 0 });

  const syncThumbToScroll = () => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;
    const trackW = track.clientWidth;
    const maxScroll = strip.scrollWidth - strip.clientWidth;
    const thumbW = Math.max(40, (strip.clientWidth / strip.scrollWidth) * trackW);
    const maxThumbLeft = trackW - thumbW;
    const ratio = maxScroll > 0 ? strip.scrollLeft / maxScroll : 0;
    setThumb({ left: ratio * maxThumbLeft, width: thumbW });
  };

  const scrollFromThumbLeft = (left, thumbWidth) => {
    const strip = stripRef.current;
    const track = trackRef.current;
    if (!strip || !track) return;
    const trackW = track.clientWidth;
    const maxThumbLeft = trackW - thumbWidth;
    const clamped = Math.max(0, Math.min(maxThumbLeft, left));
    setThumb({ left: clamped, width: thumbWidth });
    const ratio = maxThumbLeft > 0 ? clamped / maxThumbLeft : 0;
    strip.scrollLeft = ratio * (strip.scrollWidth - strip.clientWidth);
  };

  // While actively dragging the thumb, listen on `window` so the drag
  // keeps working even if the cursor strays outside the track's bounds.
  useEffect(() => {
    if (!dragging) return;
    const onMove = (clientX) => {
      scrollFromThumbLeft(dragStart.current.left + (clientX - dragStart.current.x), thumb.width);
    };
    const onMouseMove = (e) => onMove(e.clientX);
    const onTouchMove = (e) => onMove(e.touches[0].clientX);
    const onUp = () => setDragging(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dragging]);

  const startDrag = (clientX) => {
    dragStart.current = { x: clientX, left: thumb.left };
    setDragging(true);
  };

  useEffect(() => {
    syncThumbToScroll();
    window.addEventListener("resize", syncThumbToScroll);
    return () => window.removeEventListener("resize", syncThumbToScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTrackClick = (e) => {
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    scrollFromThumbLeft(e.clientX - rect.left - thumb.width / 2, thumb.width);
  };

  return (
    <div className="bg-[#171725] border border-white/[0.08] rounded-2xl pt-[22px] pb-[22px] pl-6">
      <span className="text-xs tracking-wider uppercase text-[#918da3] font-bold pr-6 block">
        Setlist
      </span>
      <p className="text-[12.5px] text-[#918da3] mb-4 pr-6">
        Tahan &amp; geser polaroid, atau tarik penggeser di bawah.
      </p>

      <div
        ref={stripRef}
        onScroll={syncThumbToScroll}
        className="flex gap-[18px] overflow-x-auto pr-6 pb-3.5 pt-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {setlist.map((song, i) => (
          <div
            key={song.title}
            onClick={() => setActiveIdx(i)}
            style={{ "--r": `${ROTATIONS[i % ROTATIONS.length]}deg` }}
            className={
              "flex-shrink-0 w-[118px] cursor-grab select-none bg-[#f4efe4] p-2 pb-[26px] rounded-sm transition-transform " +
              "shadow-[0_12px_22px_-10px_rgba(0,0,0,0.55)] hover:!rotate-0 hover:-translate-y-[5px] " +
              (activeIdx === i
                ? "!rotate-0 -translate-y-[5px] ring-2 ring-[#ff2f7e]"
                : "rotate-[var(--r)]")
            }
          >
            <div
              className="w-full aspect-square rounded-[1px] relative overflow-hidden"
              style={{ background: GRADIENTS[i % GRADIENTS.length] }}
            >
              <span className="absolute right-1.5 bottom-1 font-['Anton'] text-[34px] text-white/35 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="font-mono text-[10.5px] text-[#2b2b2b] text-center mt-2 leading-snug">
              {song.title}
              {song.tag && (
                <span className="block text-[9px] text-[#8a8474] mt-0.5 tracking-wide uppercase">
                  {song.tag}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="pr-6">
        <div
          ref={trackRef}
          onClick={handleTrackClick}
          className="relative h-[5px] bg-[#1d1d2e] rounded-full cursor-pointer"
        >
          <div
            onMouseDown={(e) => startDrag(e.clientX)}
            onTouchStart={(e) => startDrag(e.touches[0].clientX)}
            style={{ left: thumb.left, width: thumb.width }}
            className="absolute top-1/2 -translate-y-1/2 h-[9px] rounded-full cursor-grab bg-gradient-to-r from-[#ff2f7e] to-[#9d8cf5]"
          />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#918da3] mt-2.5">
          ↔ tarik untuk menjelajahi setlist
        </div>
      </div>
    </div>
  );
}
