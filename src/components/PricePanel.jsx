import { useEffect, useState } from "react";
import { categories as defaultCategories, rupiah, ticketsLeft } from "../data/venueData";

const MAX_PER_ORDER = 4;

export default function PricePanel({ selectedId, onBuy, categories = defaultCategories }) {
  const [qty, setQty] = useState(1);
  const cat = categories.find((c) => c.id === selectedId) || null;

  // reset quantity whenever the selected category changes
  useEffect(() => setQty(1), [selectedId]);

  if (!cat) {
    return (
      <aside className="bg-[#171725] border border-white/[0.08] rounded-2xl p-6 flex flex-col">
        <span className="text-xs tracking-wider uppercase text-[#918da3] font-bold mb-4">
          Detail Harga
        </span>
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-3.5 text-[#918da3] py-8 px-2.5">
          <div className="w-[52px] h-[52px] rounded-full border-[1.5px] border-dashed border-[#9d8cf5] flex items-center justify-center text-[#c7bcff] text-xl">
            ＋
          </div>
          <p className="text-[13.5px] leading-relaxed">
            Belum ada kategori dipilih.
            <br />
            Klik salah satu area pada denah di sebelah kiri.
          </p>
        </div>
      </aside>
    );
  }

  const max = Math.min(cat.left, MAX_PER_ORDER);
  const avail = ticketsLeft(cat.left);
  const total = cat.price * qty;

  return (
    <aside className="bg-[#171725] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-[18px]">
      <span className="text-xs tracking-wider uppercase text-[#918da3] font-bold">
        Detail Harga
      </span>

      <div className="flex flex-col gap-4">
        <div>
          <div className="font-['Anton'] text-2xl tracking-wide">{cat.label}</div>
          <div className="text-[13px] text-[#918da3] flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ddc84]" />
            {cat.desc}
          </div>
        </div>

        <div className="text-[28px] font-extrabold text-[#f2b807]">
          {rupiah(cat.price)} <small className="text-[13px] text-[#918da3] font-medium">/ tiket</small>
        </div>

        <span
          className={
            "self-start inline-flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-full " +
            (avail.tone === "low"
              ? "bg-[#ff2f7e]/15 text-[#ff2f7e]"
              : "bg-[#3ddc84]/15 text-[#3ddc84]")
          }
        >
          {avail.label}
        </span>

        <div className="flex items-center justify-between pt-1.5 border-t border-white/[0.08]">
          <span className="text-[13px] text-[#918da3] font-semibold">Jumlah tiket</span>
          <div className="flex items-center gap-3.5">
            <button
              disabled={qty <= 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-8 h-8 rounded-full border border-white/[0.08] bg-[#1d1d2e] font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#9d8cf5] flex items-center justify-center"
            >
              −
            </button>
            <span className="font-mono text-base w-[18px] text-center">{qty}</span>
            <button
              disabled={qty >= max}
              onClick={() => setQty((q) => Math.min(max, q + 1))}
              className="w-8 h-8 rounded-full border border-white/[0.08] bg-[#1d1d2e] font-bold text-base disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#9d8cf5] flex items-center justify-center"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-[#918da3]">
          <span>Total</span>
          <b className="text-lg font-mono text-[#f3f2f8]">{rupiah(total)}</b>
        </div>

        <button
          onClick={() => onBuy && onBuy({ category: cat, qty, total })}
          className="bg-gradient-to-r from-[#7a68d6] to-[#9d8cf5] text-white border-none py-3.5 rounded-xl text-[15px] font-extrabold hover:brightness-110 transition"
        >
          Beli Tiket
        </button>
      </div>

      <div className="flex flex-wrap gap-3.5 mt-1 pt-4 border-t border-white/[0.08]">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-1.5 text-[11.5px] text-[#918da3]">
            <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: c.hex }} />
            {c.label}
          </div>
        ))}
      </div>
    </aside>
  );
}