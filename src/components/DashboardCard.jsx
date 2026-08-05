import React, { useState, useEffect } from "react";
import api from "../api/axios";

const STATUS_LABEL = {
  draft: { text: "Draft", type: "warning" },
  published: { text: "Tersedia", type: "success" },
  sold_out: { text: "Sold Out", type: "soldout" },
  selesai: { text: "Selesai", type: "soldout" },
  dibatalkan: { text: "Dibatalkan", type: "soldout" },
};

export default function UpcomingConcertsSection({ onSelectArtist }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => setError(err.response?.data?.message || "Gagal memuat data konser"))
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    return new Date(isoDate).toLocaleDateString("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <section className="w-full bg-[#070A13] py-16 px-4 text-white text-center">
        <p className="text-gray-400">Memuat konser...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#070A13] py-16 px-4 text-white text-center">
        <p className="text-red-400">{error}</p>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#070A13] py-16 px-4 md:px-8 text-white">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold mb-2 block">
            LINEUP 2026
          </span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wide">
            Konser Mendatang
          </h2>
        </div>
        <p className="text-gray-400 text-sm md:text-base max-w-sm">
          {events.length} konser tersedia — kuota tiket real-time.
        </p>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500 py-20">Belum ada konser tersedia saat ini.</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => {
            const statusInfo = STATUS_LABEL[event.status] || { text: event.status, type: "warning" };
            const progress = event.progress_percent ?? 0;

            return (
              <div
                key={event.id}
                onClick={() => onSelectArtist && onSelectArtist(event.id)}
                className="relative rounded-2xl overflow-hidden border border-white/15 p-6 flex flex-col justify-between h-[420px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group bg-[#0C101A] cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
                  style={{
                    backgroundImage: event.poster_url
                      ? `url(http://localhost:5000${event.poster_url})`
                      : "none",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/90 to-transparent"></div>
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div></div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md border ${
                          statusInfo.type === "success"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : statusInfo.type === "soldout"
                            ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                            : "bg-pink-500/10 text-pink-400 border-pink-500/30"
                        }`}
                      >
                        {statusInfo.type !== "soldout" && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                              statusInfo.type === "success" ? "bg-emerald-400" : "bg-pink-400"
                            }`}
                          ></span>
                        )}
                        {statusInfo.text}
                      </span>
                    </div>

                    <h3 className="font-black uppercase tracking-wider text-white text-2xl group-hover:text-amber-300 transition-colors">
                      {event.nama}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 font-medium">{event.artis}</p>
                  </div>

                  <div>
                    <div className="flex flex-col gap-0.5 text-xs text-gray-300 mb-6 border-t border-white/10 pt-4">
                      <span className="font-semibold text-white">{event.lokasi}</span>
                      <span className="text-gray-400">{formatDate(event.tanggal)}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between items-center text-[11px] text-gray-400 mb-1.5">
                        <span>Kuota terjual</span>
                        <span className="font-mono">{progress}%</span>
                      </div>
                      <div className="w-full bg-black/60 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-pink-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-[10px] uppercase text-gray-400 block mb-0.5 tracking-wider">
                          MULAI DARI
                        </span>
                        <span className="text-base font-black text-white">
                          {event.harga_termurah
                            ? `Rp${Number(event.harga_termurah).toLocaleString("id-ID")}`
                            : "TBA"}
                        </span>
                      </div>
                      <button className="bg-white/10 hover:bg-white text-white hover:text-black font-bold p-2.5 rounded-xl transition-all duration-300 border border-white/20 group-hover:border-white">
                        <svg
                          className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}