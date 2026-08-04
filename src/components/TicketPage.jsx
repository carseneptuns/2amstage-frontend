import { useState } from "react";
import SeatMap from "./SeatMap";
import PricePanel from "./PricePanel";
import SetlistStrip from "./SetlistStrip";
import { rupiah, categories as defaultCategories } from "../data/venueData";

/**
 * `seatMap` lets each artist page plug in its own venue layout without
 * touching anything else on this page:
 *
 *   import SeatMapArenaX, { categories as arenaXCategories } from "./SeatMapArenaX";
 *   <TicketPage seatMap={{ Component: SeatMapArenaX, categories: arenaXCategories }} />
 *
 * Omit `seatMap` entirely to get the original horseshoe layout.
 */
export default function TicketPage({ onBack, seatMap }) {
  const SeatMapComponent = seatMap?.Component || SeatMap;
  const categories = seatMap?.categories || defaultCategories;

  const [selectedId, setSelectedId] = useState(null);

  const handleBuy = (order) => {
  if (onProceedToPayment) {
    onProceedToPayment(order); // { category, qty, total }
  } else {
    // Fallback kalau dipakai tanpa halaman pembayaran (masih bisa jalan sendiri)
    alert(`Prototipe: ${order.qty}x tiket ${order.category.label} — Total ${rupiah(order.total)}`);
  }
};
  return (
    <main className="px-[6vw] pb-[100px]">
      {onBack && (
        <button
          onClick={onBack}
          className="bg-transparent border border-white/[0.08] text-[#918da3] px-[18px] py-2.5 rounded-full text-[13px] font-semibold my-8 hover:text-[#f3f2f8] hover:border-white/25 transition"
        >
          ← Kembali ke poster
        </button>
      )}

      <h2 className="font-['Anton'] text-[32px] tracking-wide mb-1.5">
        Pilih Kategori Tempat Duduk
      </h2>
      <p className="text-[#918da3] text-sm mb-[26px]">
        Arahkan kursor ke area denah untuk melihat harga, klik untuk memilih jumlah tiket.
      </p>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-7 mb-[70px] items-stretch">
        <div className="bg-[#171725] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden flex flex-col">
          <div className="bg-[#ff2f7e]/15 text-[#ff2f7e] text-[12.5px] font-bold text-center py-2.5 rounded-lg mb-3.5 flex items-center justify-center gap-2">
            🎟 Sisa tiket 61% — Category 1 hampir habis
          </div>
          <SeatMapComponent selectedId={selectedId} onSelect={setSelectedId} />
          <div className="flex items-center justify-center gap-2 text-[#918da3] text-[12.5px] mt-3">
            Klik salah satu area untuk melihat detail harga →
          </div>
        </div>

        <div className="flex flex-col gap-[22px]">
          <PricePanel selectedId={selectedId} onBuy={handleBuy} categories={categories} />
          <SetlistStrip />
        </div>
      </section>

      <footer className="text-center py-10 pt-0 text-[#918da3] text-xs border-t border-white/[0.08] mt-10">
        © 2027 2AMSTAGE — Prototipe tampilan, bukan tiket sungguhan.
      </footer>
    </main>
  );
}