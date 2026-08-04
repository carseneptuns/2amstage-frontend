import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { rupiah } from "../data/venueData";

const PAYMENT_METHODS = [
  {
    id: "qris",
    label: "QRIS",
    desc: "Bayar instan pakai e-wallet atau m-banking apa saja",
  },
  {
    id: "transfer",
    label: "Transfer Bank",
    desc: "Virtual Account, transfer manual dari bank pilihanmu",
  },
];

const BANKS = [
  { id: "bca", name: "BCA", va: "3910 8827 1122" },
  { id: "mandiri", name: "Mandiri", va: "8850 2231 9087" },
  { id: "bni", name: "BNI", va: "9881 0032 4471" },
  { id: "bri", name: "BRI", va: "2600 7788 1123" },
];

const GUIDE_STEPS = {
  qris: [
    "Buka aplikasi e-wallet atau mobile banking yang mendukung QRIS (GoPay, OVO, DANA, ShopeePay, m-banking, dll).",
    "Pilih menu Scan / Bayar, lalu arahkan kamera ke kode QR di sebelah kanan.",
    "Periksa nama merchant \"2AMSTAGE\" dan nominal tagihan, lalu konfirmasi pembayaran di aplikasimu.",
    "Setelah berhasil, tiket otomatis terverifikasi dan e-tiket dikirim ke email dalam beberapa detik.",
  ],
  transfer: [
    "Pilih bank tujuan transfer di sebelah kanan, lalu salin nomor Virtual Account yang muncul.",
    "Buka aplikasi m-banking / ATM / internet banking, pilih menu Transfer ke Virtual Account.",
    "Masukkan nomor VA, pastikan nominal tagihan sudah sesuai secara otomatis, lalu selesaikan transaksi.",
    "Simpan bukti transfer. Tiket akan terverifikasi otomatis dalam 1–5 menit setelah dana diterima.",
  ],
};

function formatTime(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// Purely decorative "QR" pattern — not a real scannable code, just a
// stand-in visual for the prototype.
const QR_PATTERN = [
  1,1,1,1,1,0,1,0,1,1,1,1,1,
  1,0,0,0,1,0,0,0,0,0,1,0,1,
  1,0,1,0,1,0,1,1,0,1,1,0,1,
  1,0,1,0,1,1,0,0,1,0,1,0,1,
  1,0,0,0,1,0,1,0,1,1,0,0,1,
  1,1,1,1,1,0,0,1,0,0,1,1,1,
  0,0,0,0,0,0,1,0,1,0,0,0,0,
  1,1,0,1,1,1,0,1,0,1,1,0,1,
  1,0,1,0,0,0,1,0,1,0,1,1,1,
  1,0,0,1,1,0,0,1,0,0,0,0,1,
  1,1,1,0,1,1,1,0,1,1,1,0,1,
  1,0,0,0,0,0,0,1,0,0,0,0,1,
  1,1,1,1,1,0,1,1,1,1,1,1,1,
];

export default function PaymentPage({ order, onBack, onConfirm }) {
  const category = order?.category || { label: "Category 1", price: 0 };
  const qty = order?.qty || 1;
  const total = order?.total ?? category.price * qty;
  const adminFee = method_fee(total);

  const [method, setMethod] = useState("qris");
  const [bank, setBank] = useState("bca");
  const [secondsLeft, setSecondsLeft] = useState(10 * 60);

  useEffect(() => {
    const t = setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const selectedBank = BANKS.find((b) => b.id === bank);
  const steps = GUIDE_STEPS[method];
  const grandTotal = total + adminFee;

  return (
    <main className="min-h-screen bg-[#0a0a12] text-[#f3f2f8] px-[6vw] pb-[100px]">
      {onBack && (
        <button
          onClick={onBack}
          className="bg-transparent border border-white/[0.08] text-[#918da3] px-[18px] py-2.5 rounded-full text-[13px] font-semibold my-8 hover:text-[#f3f2f8] hover:border-white/25 transition"
        >
          ← Kembali pilih kategori
        </button>
      )}

      <h2 className="font-['Anton'] text-[32px] tracking-wide mb-1.5">Pembayaran</h2>
      <p className="text-[#918da3] text-sm mb-6">
        Selesaikan pembayaran sebelum waktu habis agar tiketmu tidak dilepas kembali.
      </p>

      {/* order summary strip */}
      <div className="bg-[#171725] border border-white/[0.08] rounded-2xl p-5 mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#918da3] mb-1">Tiket dipilih</div>
          <div className="font-['Anton'] text-xl tracking-wide">{category.label}</div>
          <div className="text-[13px] text-[#918da3] mt-0.5">{qty}x tiket · {rupiah(category.price)} / tiket</div>
        </div>
        <div className="flex items-center gap-2 bg-[#ff2f7e]/15 text-[#ff2f7e] px-4 py-2.5 rounded-full text-sm font-bold">
          ⏱ Selesaikan dalam {formatTime(secondsLeft)}
        </div>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-7 items-start">
        {/* ================= LEFT: PAYMENT GUIDE ================= */}
        <div className="bg-[#171725] border border-white/[0.08] rounded-2xl p-6">
          <span className="text-xs tracking-wider uppercase text-[#918da3] font-bold">
            Panduan Pembayaran
          </span>
          <p className="text-[13px] text-[#918da3] mt-1.5 mb-6">
            Ikuti langkah berikut sesuai metode pembayaran yang kamu pilih di sebelah kanan.
          </p>

          <ol className="flex flex-col gap-5">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#1d1d2e] border border-white/[0.08] text-[#c7bcff] font-mono text-[12px] flex items-center justify-center font-bold">
                  {i + 1}
                </span>
                <p className="text-[14px] text-[#d8d6e0] leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>

          <div className="mt-7 pt-6 border-t border-white/[0.08] flex items-start gap-3 text-[12.5px] text-[#918da3]">
            <span className="text-base leading-none">ℹ️</span>
            <p>
              Butuh bantuan? Simpan bukti pembayaran dan hubungi CS 2AMSTAGE lewat menu{" "}
              <span className="text-[#c7bcff]">Bantuan</span> jika tiket belum masuk setelah 10 menit.
            </p>
          </div>
        </div>

        {/* ================= RIGHT: METHOD SELECTION ================= */}
        <aside className="bg-[#171725] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-5">
          <span className="text-xs tracking-wider uppercase text-[#918da3] font-bold">
            Metode Pembayaran
          </span>

          <div className="flex flex-col gap-2.5">
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={
                  "text-left rounded-xl border px-4 py-3.5 transition " +
                  (method === m.id
                    ? "border-[#9d8cf5] bg-[#9d8cf5]/10"
                    : "border-white/[0.08] bg-[#1d1d2e] hover:border-white/20")
                }
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[14.5px]">{m.label}</span>
                  <span
                    className={
                      "w-4 h-4 rounded-full border-2 flex items-center justify-center " +
                      (method === m.id ? "border-[#9d8cf5]" : "border-white/20")
                    }
                  >
                    {method === m.id && <span className="w-2 h-2 rounded-full bg-[#9d8cf5]" />}
                  </span>
                </div>
                <p className="text-[12px] text-[#918da3] mt-1">{m.desc}</p>
              </button>
            ))}
          </div>

          <div className="border-t border-white/[0.08] pt-5">
            {method === "qris" ? (
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white p-3 rounded-xl">
                  <svg viewBox="0 0 13 13" width="150" height="150" shapeRendering="crispEdges">
                    {QR_PATTERN.map((cell, i) =>
                      cell ? (
                        <rect key={i} x={i % 13} y={Math.floor(i / 13)} width="1" height="1" fill="#0a0a12" />
                      ) : null
                    )}
                  </svg>
                </div>
                <p className="text-[12px] text-[#918da3] text-center">
                  Scan kode QR di atas dengan aplikasi e-wallet atau m-banking
                </p>
                <div className="text-[22px] font-extrabold text-[#f2b807]">{rupiah(grandTotal)}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <span className="text-[12px] text-[#918da3] font-semibold">Pilih bank</span>
                <div className="grid grid-cols-2 gap-2">
                  {BANKS.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBank(b.id)}
                      className={
                        "py-2.5 rounded-lg text-[13px] font-bold border transition " +
                        (bank === b.id
                          ? "border-[#9d8cf5] bg-[#9d8cf5]/10 text-white"
                          : "border-white/[0.08] bg-[#1d1d2e] text-[#918da3] hover:border-white/20")
                      }
                    >
                      {b.name}
                    </button>
                  ))}
                </div>

                <div className="bg-[#1d1d2e] border border-white/[0.08] rounded-xl p-4 mt-1">
                  <div className="text-[11px] uppercase tracking-wider text-[#918da3] mb-1.5">
                    Nomor Virtual Account {selectedBank.name}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[17px] font-bold tracking-wide">{selectedBank.va}</span>
                    <button
                      onClick={() => navigator.clipboard?.writeText(selectedBank.va.replace(/\s/g, ""))}
                      className="text-[11px] font-bold text-[#c7bcff] border border-[#9d8cf5]/40 px-3 py-1.5 rounded-full hover:bg-[#9d8cf5]/10"
                    >
                      Salin
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-[#918da3] mt-1">
                  <span>Total tagihan</span>
                  <b className="text-lg font-mono text-[#f3f2f8]">{rupiah(grandTotal)}</b>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between text-[12.5px] text-[#918da3] pt-1">
            <span>Subtotal</span>
            <span className="font-mono">{rupiah(total)}</span>
          </div>
          <div className="flex items-center justify-between text-[12.5px] text-[#918da3] -mt-3">
            <span>Biaya layanan</span>
            <span className="font-mono">{rupiah(adminFee)}</span>
          </div>

          <button
            onClick={() => {
              Swal.fire({
                icon: "success",
                title: "Pembayaran Berhasil",
                text: "QR tiket akan dikirimkan lewat email, silahkan tunggu. Terima kasih.",
                confirmButtonText: "Oke",
                confirmButtonColor: "#9d8cf5",
                background: "#171725",
                color: "#f3f2f8",
              }).then(() => {
                onConfirm && onConfirm({ method, bank: method === "transfer" ? bank : null, total: grandTotal });
              });
            }}
            className="bg-gradient-to-r from-[#7a68d6] to-[#9d8cf5] text-white border-none py-3.5 rounded-xl text-[15px] font-extrabold hover:brightness-110 transition"
          >
            Saya Sudah Bayar
          </button>
        </aside>
      </section>
    </main>
  );
}

function method_fee(total) {
  // flat-rate demo service fee — swap for real fee logic
  return total > 0 ? 5000 : 0;
}
