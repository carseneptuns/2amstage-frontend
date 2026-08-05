import React, { useEffect, useRef, useState } from "react";
import { Gauge, QrCode, CreditCard, ShieldCheck } from "lucide-react";


const C = {
  bg: "#0B0B12",
  surface: "#131320",
  surfaceAlt: "#181826",
  border: "#26263A",

  orange: "#F59E0B",
  orangeSoft: "#FBBF24",
  orangeDark: "#D97706",

  text: "#F1F1F5",
  muted: "#93939F",
  mutedDark: "#5C5C6B",
};

const FEATURES = [
  {
    n: "01",
    title: "Kuota real-time",
    desc: "Sisa tiket per kategori berkurang otomatis setiap transaksi berhasil, jadi angka yang kamu lihat selalu akurat.",
    Icon: Gauge,
  },
  {
    n: "02",
    title: "E-ticket QR sekali pakai",
    desc: "Setiap tiket punya kode unik yang hanya divalidasi satu kali saat check-in — tidak bisa digandakan atau dijual ulang diam-diam.",
    Icon: QrCode,
  },
  {
    n: "03",
    title: "Checkout tanpa drama",
    desc: "Alur singkat: pilih kategori, konfirmasi ringkasan, bayar. Status order langsung berubah begitu pembayaran selesai.",
    Icon: CreditCard,
  },
  {
    n: "04",
    title: "Simulasi pembayaran aman",
    desc: "Prototipe ini memakai simulasi pembayaran — tidak ada transaksi finansial nyata yang diproses.",
    Icon: ShieldCheck,
  },
];

const STATS = [
  { value: "5", label: "Artis Headliner" },
  { value: "5", label: "Kota & Venue" },
  { value: "100%", label: "E-Tiket QR" },
];

export default function AboutEventStage() {
  const sectionRef = useRef(null);
  const hasRun = useRef(false);
  const timers = useRef([]);
  const [phase, setPhase] = useState("pre"); 
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            if (reduce) {
              setPhase("done");
              return;
            }
            [
              ["am", 150],
              ["stage", 560],
              ["slide", 1350],
              ["done", 2300],
            ].forEach(([p, delay]) => {
              timers.current.push(setTimeout(() => setPhase(p), delay));
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    obs.observe(node);
    return () => {
      obs.disconnect();
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const amDropped = phase !== "pre";
  const stageDropped = phase === "stage" || phase === "slide" || phase === "done";
  const sliding = phase === "slide" || phase === "done";

  return (
    <div style={{ background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .es-display { font-family: 'Anton', sans-serif; }
        .es-body { font-family: 'Space Grotesk', sans-serif; }
        .es-mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes es-blink { 0%, 45% { opacity: 1; } 50%, 95% { opacity: 0.15; } 100% { opacity: 1; } }
        .es-colon { animation: es-blink 1.6s steps(1) infinite; }
        @keyframes es-pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(139,92,246,0.35); }
          100% { box-shadow: 0 0 0 14px rgba(139,92,246,0); }
        }
        .es-badge-pulse { animation: es-pulse-ring 2.6s ease-out infinite; }
      `}</style>

      {/* ============ SECTION ============ */}
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden px-6 py-24 md:py-32"
        style={{ background: C.bg }}
      >
        {/* ambient glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 rounded-full"
          style={{
            width: 900,
            height: 900,
            background: `radial-gradient(circle, ${C.orange}22 0%, transparent 65%)`,
            opacity: phase === "pre" || phase === "am" || phase === "stage" ? 1 : 0.35,
            transition: "opacity 900ms ease",
          }}
        />

        {/* ============ FALLING 3D LOCKUP ============ */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
        >
          <div
            className={sliding && phase === "done" ? "es-badge-pulse rounded-full" : ""}
            style={{
              transition:
                "transform 900ms cubic-bezier(0.16,1,0.3,1), filter 900ms ease",
              transform: sliding
                ? "translate(36vw, -32vh) scale(0.16)"
                : "translate(0, 0) scale(1)",
              filter: sliding
                ? "drop-shadow(0 4px 10px rgba(0,0,0,0.25))"
                : "drop-shadow(0 25px 60px rgba(139,92,246,0.45))",
            }}
          >
            <div className="flex items-end" style={{ perspective: "1400px" }}>
              <span
                className="es-display uppercase"
                style={{
                  fontSize: "clamp(2.75rem, 9vw, 7rem)",
                  color: C.orange,
                  letterSpacing: "0.01em",
                  transformOrigin: "bottom center",
                  transition:
                    "transform 700ms cubic-bezier(0.34,1.56,0.64,1), opacity 450ms ease",
                  transform: amDropped
                    ? "translateY(0) rotateX(0deg)"
                    : "translateY(-170%) rotateX(-100deg)",
                  opacity: amDropped ? 1 : 0,
                  textShadow: "0 0 46px rgba(139,92,246,0.65)",
                }}
              >
                2AM
              </span>
              <span
                className="es-display uppercase ml-2 md:ml-3"
                style={{
                  fontSize: "clamp(2.75rem, 9vw, 7rem)",
                  color: C.text,
                  letterSpacing: "0.01em",
                  transformOrigin: "bottom center",
                  transition:
                    "transform 700ms cubic-bezier(0.34,1.56,0.64,1), opacity 450ms ease",
                  transform: stageDropped
                    ? "translateY(0) rotateX(0deg)"
                    : "translateY(-170%) rotateX(-100deg)",
                  opacity: stageDropped ? 1 : 0,
                  textShadow: "0 0 30px rgba(245,166,35,0.25)",
                }}
              >
                STAGE
              </span>
            </div>
          </div>
        </div>

        {/* ============ REAL CONTENT (blurred until reveal finishes) ============ */}
        <div
          className="relative z-10 max-w-6xl mx-auto"
          style={{
            filter: sliding ? "blur(0px)" : "blur(18px)",
            opacity: sliding ? 1 : 0.35,
            transform: sliding ? "scale(1)" : "scale(0.98)",
            transition:
              "filter 900ms cubic-bezier(0.16,1,0.3,1), opacity 900ms ease, transform 900ms ease",
          }}
        >
          {/* eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-block rounded-full"
              style={{ width: 6, height: 6, background: C.orange }}
            />
            <p
              className="es-mono text-xs md:text-sm uppercase tracking-[0.35em]"
              style={{ color: C.orange }}
            >
              Tentang Kami
            </p>
          </div>

          {/* headline */}
          <h2
            className="es-display uppercase text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-3xl mb-6"
            style={{ color: C.text }}
          >
            Kenapa namanya{" "}
            <span style={{ color: C.orange }}>2AMStage</span>?
          </h2>

          {/* paragraph */}
          <p
            className="es-body text-base md:text-lg leading-relaxed max-w-2xl mb-14"
            style={{ color: C.muted }}
          >
            Jam 2 dini hari adalah momen ketika war tiket sesungguhnya terjadi —
            refresh berkali-kali, war dengan bot, dan cemas kehabisan. 2AMStage
            dibangun supaya proses itu jujur dan tenang: kuota terlihat
            real-time, dan setiap tiket yang terjual benar-benar ada.
          </p>

          {/* grid: ticket-stub card + feature cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
            {/* ---- ticket stub card ---- */}
            <div
              className="lg:col-span-2 relative rounded-3xl p-8 flex flex-col"
              style={{ background: C.surface, border: `1px solid ${C.border}` }}
            >
              <div
                className="es-mono flex items-baseline gap-1 mb-5"
                style={{ color: C.orangeSoft }}
              >
                <span style={{ fontSize: "2.75rem", fontWeight: 700 }}>02</span>
                <span className="es-colon" style={{ fontSize: "2.75rem", fontWeight: 700 }}>
                  :
                </span>
                <span style={{ fontSize: "2.75rem", fontWeight: 700 }}>00</span>
              </div>

              <p className="es-body text-sm leading-relaxed mb-8" style={{ color: C.muted }}>
                2AMStage adalah penyelenggara resmi penjualan tiket untuk lima
                headliner musim ini. Kami menjembatani promotor dan penonton
                dalam satu sistem, dari pemilihan kategori tiket sampai
                validasi QR Code di pintu masuk venue.
              </p>

              <div className="flex-1" />

              {/* perforation / tear line */}
              <div className="relative my-2">
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    left: -32,
                    top: -10,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    width: 20,
                    height: 20,
                    right: -32,
                    top: -10,
                    background: C.bg,
                    border: `1px solid ${C.border}`,
                  }}
                />
                <div
                  style={{
                    borderTop: `1px dashed ${C.border}`,
                    width: "100%",
                  }}
                />
              </div>

              <div className="flex items-start justify-between pt-5">
                {STATS.map((s, i) => (
                  <div key={s.label} className="flex items-start">
                    {i > 0 && (
                      <div
                        className="mr-4 self-stretch"
                        style={{ width: 1, background: C.border }}
                      />
                    )}
                    <div>
                      <p className="es-display text-2xl md:text-3xl" style={{ color: C.text }}>
                        {s.value}
                      </p>
                      <p
                        className="es-mono text-[11px] uppercase tracking-wide mt-1"
                        style={{ color: C.mutedDark }}
                      >
                        {s.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---- feature cards ---- */}
            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {FEATURES.map(({ n, title, desc, Icon }) => (
                <div
                  key={n}
                  className="rounded-3xl p-7 flex flex-col"
                  style={{ background: C.surfaceAlt, border: `1px solid ${C.border}` }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="es-mono text-xs tracking-widest"
                      style={{ color: C.orange }}
                    >
                      {n}
                    </span>
                    <Icon size={18} strokeWidth={1.75} style={{ color: C.orangeSoft }} />
                  </div>
                  <h3
                    className="es-body font-semibold text-lg mb-2.5"
                    style={{ color: C.text }}
                  >
                    {title}
                  </h3>
                  <p className="es-body text-sm leading-relaxed" style={{ color: C.muted }}>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
