import { rupiah } from "../data/venueData";

function formatDate(iso) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

function StatusBadge({ status = "lunas" }) {
  const styles = {
    lunas: "bg-[#3ddc84]/15 text-[#3ddc84]",
    menunggu: "bg-[#f2b807]/15 text-[#f2b807]",
    kadaluarsa: "bg-white/10 text-[#918da3]",
  };
  const labels = { lunas: "Lunas", menunggu: "Menunggu Pembayaran", kadaluarsa: "Kadaluarsa" };
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full ${styles[status] || styles.lunas}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[status] || labels.lunas}
    </span>
  );
}

function TicketCard({ ticket }) {
  return (
    <div className="bg-[#171725] border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-[#918da3] mb-1">
            #{ticket.code}
          </div>
          <div className="font-['Anton'] text-xl tracking-wide leading-tight">
            {ticket.artistName}
          </div>
          {ticket.subtitle && (
            <div className="text-[13px] text-[#918da3] mt-0.5">{ticket.subtitle}</div>
          )}
        </div>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[13px] text-[#d8d6e0] border-t border-b border-white/[0.08] py-3">
        {ticket.venue && <span>📍 {ticket.venue}</span>}
        {ticket.concertDate && <span>🗓 {ticket.concertDate}</span>}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="text-[13.5px] font-bold">{ticket.category?.label} × {ticket.qty}</div>
          <div className="text-[11.5px] text-[#918da3] mt-0.5">Dibeli {formatDate(ticket.purchasedAt)}</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-[#918da3] uppercase tracking-wider">Total Bayar</div>
          <div className="text-[17px] font-extrabold text-[#f2b807]">{rupiah(ticket.total)}</div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[12px] text-[#918da3] bg-[#1d1d2e] border border-white/[0.08] rounded-xl px-3.5 py-2.5">
        <span>✉️</span>
        <span>QR e-tiket sudah dikirim ke email kamu</span>
      </div>
    </div>
  );
}

/**
 * `tickets` — array of completed checkouts, newest first. Shape:
 * {
 *   id, code, artistName, subtitle, venue, concertDate,
 *   category: { label, price }, qty, total,
 *   method, bank, purchasedAt (ISO string), status: "lunas" | "menunggu" | "kadaluarsa"
 * }
 */
export default function MyTickets({ tickets = [], onBack }) {
  return (
    <main className="min-h-screen bg-[#0a0a12] text-[#f3f2f8] px-[6vw] pb-[100px]">
      {onBack && (
        <button
          onClick={onBack}
          className="bg-transparent border border-white/[0.08] text-[#918da3] px-[18px] py-2.5 rounded-full text-[13px] font-semibold my-8 hover:text-[#f3f2f8] hover:border-white/25 transition"
        >
          ← Kembali
        </button>
      )}

      <h2 className="font-['Anton'] text-[32px] tracking-wide mb-1.5">Tiket Saya</h2>
      <p className="text-[#918da3] text-sm mb-8">
        Riwayat pembelian tiket yang sudah kamu selesaikan. QR e-tiket dikirim ke email masing-masing.
      </p>

      {tickets.length === 0 ? (
        <div className="bg-[#171725] border border-white/[0.08] rounded-2xl p-12 flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 rounded-full border-[1.5px] border-dashed border-[#9d8cf5] flex items-center justify-center text-[#c7bcff] text-2xl">
            🎫
          </div>
          <div>
            <div className="font-bold text-[15px] mb-1">Belum ada tiket</div>
            <p className="text-[13px] text-[#918da3] max-w-xs">
              Tiket yang sudah kamu beli akan muncul di sini.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {tickets.map((t) => (
            <TicketCard key={t.id} ticket={t} />
          ))}
        </div>
      )}
    </main>
  );
}
