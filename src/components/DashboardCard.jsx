import React, { useState } from "react";

// Import gambar dari assets/images
import ladyGagaImg from "../assets/images/lagaga.jpg";
import justinBieberImg from "../assets/images/chella.jpg";
import taylorSwiftImg from "../assets/images/telor.jpg";
import arianaGrandeImg from "../assets/images/petal.jpg";
import theNeighbourhoodImg from "../assets/images/f.jpg";

// Tambahkan keyword 'export' di sini agar bisa digunakan di file lain (seperti Aboutgaga.jsx)
export const concertData = [
  {
    id: "lady-gaga",
    name: "LADY GAGA",
    subtitle: "The Chromatica Ball Redux",
    city: "Jakarta",
    genre: "Pop",
    status: "Hampir Habis",
    statusType: "warning",
    venue: "Jakarta International Stadium, Jakarta",
    date: "Sab, 26 Sep 2026",
    price: "Rp1.250.000",
    progress: "88%",
    image: ladyGagaImg,
    accentColor: "bg-pink-500",
    badgeStyle: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  },
  {
    id: "justin-bieber",
    name: "JUSTIN BIEBER",
    subtitle: "Swag Tour Asia",
    city: "Jakarta",
    genre: "Pop",
    status: "Tersedia",
    statusType: "success",
    venue: "Gelora Bung Karno Madya, Jakarta",
    date: "Min, 18 Okt 2026",
    price: "Rp950.000",
    progress: "32%",
    image: justinBieberImg,
    accentColor: "bg-indigo-500",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "taylor-swift",
    name: "TAYLOR SWIFT",
    subtitle: "The Eras Tour: Indonesia Night",
    city: "Jakarta",
    genre: "Pop",
    status: "Sold Out",
    statusType: "soldout",
    venue: "ICE BSD, Tanggerang",
    date: "Sen, 02 Nov 2026",
    price: "Rp∞",
    progress: "100%",
    image: taylorSwiftImg,
    accentColor: "bg-amber-400",
    badgeStyle: "bg-zinc-800 text-zinc-400 border-zinc-700",
  },
  {
    id: "ariana-grande",
    name: "ARIANA GRANDE",
    subtitle: "Eternal Sunshine Live",
    city: "Jakarta",
    genre: "Pop",
    status: "Tersedia",
    statusType: "success",
    venue: "Allianz Ecopark Ancol, Jakarta",
    date: "Jum, 20 Nov 2026",
    price: "Rp1.100.000",
    progress: "45%",
    image: arianaGrandeImg,
    accentColor: "bg-purple-500",
    badgeStyle: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "the-neighbourhood",
    name: "THE NEIGHBOURHOOD",
    subtitle: "Wiped Out! World Tour",
    city: "Bandung",
    genre: "Alternative",
    status: "Hampir Habis",
    statusType: "warning",
    venue: "Trans Studio Bandung, Bandung",
    date: "Rab, 09 Des 2026",
    price: "Rp850.000",
    progress: "90%",
    image: theNeighbourhoodImg,
    accentColor: "bg-pink-500",
    badgeStyle: "bg-pink-500/10 text-pink-400 border-pink-500/30",
  },
];

// Terima props onSelectArtist di sini
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

      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3 mb-10">
        {["Semua", "Jakarta", "Pop", "Tersedia"].map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
              activeFilter === filter
                ? "bg-white text-black border-white shadow-lg scale-105"
                : "bg-[#0B0F19] text-gray-300 border-white/10 hover:border-white/30 hover:bg-[#131B2E]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcerts.map((concert) => (
          <div
            key={concert.id}
            // Saat card diklik, panggil fungsi onSelectArtist dengan membawa ID artis
            onClick={() => onSelectArtist && onSelectArtist(concert.id)}
            className="relative rounded-2xl overflow-hidden border border-white/15 p-6 flex flex-col justify-between h-[420px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group bg-[#0C101A] cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40"
              style={{ backgroundImage: `url(${concert.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#090D16] via-[#090D16]/90 to-transparent"></div>
            </div>

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div></div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase backdrop-blur-md border ${statusInfo.type === "success"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : statusInfo.type === "soldout"
                              ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                              : "bg-pink-500/10 text-pink-400 border-pink-500/30"
                          }`}
                      >
                        {statusInfo.type !== "soldout" && (
                          <span
                            className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusInfo.type === "success" ? "bg-emerald-400" : "bg-pink-400"
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
                    <span className="text-[10px] uppercase text-gray-400 block mb-0.5 tracking-wider">MULAI DARI</span>
                    <span className="text-base font-black text-white">{concert.price}</span>
                  </div>
                  <button className="bg-white/10 hover:bg-white text-white hover:text-black font-bold p-2.5 rounded-xl transition-all duration-300 border border-white/20 group-hover:border-white">
                    <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
