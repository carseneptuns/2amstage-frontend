// src/pages/customer/ConcertDetail.jsx
import { useState, useEffect } from "react";
import api from "../../api/axios";

export default function ConcertDetail({ eventId, onBack, onBuyTicket }) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    api
      .get(`/events/${eventId}`)
      .then((res) => setEvent(res.data))
      .catch((err) => setError(err.response?.data?.message || "Gagal memuat detail konser"))
      .finally(() => setLoading(false));
  }, [eventId]);

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time) => (time ? time.slice(0, 5) : "-");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070A13] text-white flex items-center justify-center">
        <p className="text-gray-400">Memuat detail konser...</p>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-[#070A13] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || "Event tidak ditemukan"}</p>
        {onBack && (
          <button onClick={onBack} className="text-amber-400 hover:underline text-sm">
            ← Kembali
          </button>
        )}
      </div>
    );
  }

  const isSoldOut = event.status === "sold_out";
  const isCancelled = event.status === "dibatalkan";
  const isFinished = event.status === "selesai";
  const canBuy = event.status === "published";

  return (
    <div className="min-h-screen bg-[#070A13] text-white">
      {/* Hero poster */}
      <div className="relative h-[420px] w-full overflow-hidden">
        {event.poster_url ? (
          <img
            src={`http://localhost:5000${event.poster_url}`}
            alt={event.nama}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1030] to-[#070A13]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070A13] via-[#070A13]/60 to-transparent" />

        {onBack && (
          <button
            onClick={onBack}
            className="absolute top-6 left-6 bg-black/40 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm hover:bg-black/60 transition"
          >
            ← Kembali
          </button>
        )}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <span className="text-amber-400 text-xs uppercase tracking-[0.3em] font-semibold">
          {event.artis || "Konser"}
        </span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wide mt-2 mb-6">
          {event.nama}
        </h1>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wider">Tanggal</span>
              <p className="text-white font-semibold">{formatDate(event.tanggal)}</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wider">Waktu</span>
              <p className="text-white font-semibold">{formatTime(event.waktu)} WIB</p>
            </div>
            <div>
              <span className="text-xs uppercase text-gray-500 tracking-wider">Lokasi</span>
              <p className="text-white font-semibold">{event.lokasi}</p>
            </div>
          </div>

          <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-6">
            <span className="text-xs uppercase text-gray-500 tracking-wider">Tentang Konser</span>
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              {event.deskripsi || "Belum ada deskripsi untuk event ini."}
            </p>
          </div>
        </div>

        {/* Status & CTA */}
        <div className="bg-[#0C101A] border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            {isSoldOut && <span className="text-red-400 font-bold uppercase tracking-wider">Sold Out</span>}
            {isCancelled && <span className="text-red-400 font-bold uppercase tracking-wider">Dibatalkan</span>}
            {isFinished && <span className="text-gray-400 font-bold uppercase tracking-wider">Sudah Selesai</span>}
            {canBuy && <span className="text-emerald-400 font-bold uppercase tracking-wider">Tiket Tersedia</span>}
          </div>

          <button
            onClick={onBuyTicket}
            disabled={!canBuy}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all ${
              canBuy
                ? "bg-orange-600 hover:bg-orange-700 text-white shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                : "bg-gray-800 text-gray-500 cursor-not-allowed"
            }`}
          >
            {canBuy ? "Beli Tiket" : "Tidak Tersedia"}
          </button>
        </div>
      </div>
    </div>
  );
}