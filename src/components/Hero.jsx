import React, { useState } from "react";

// Import gambar lokal
import ladyGagaImg from "../assets/images/ladygaga.jpg";
import justinBieberImg from "../assets/images/justin.jpg";
import taylorSwiftImg from "../assets/images/taylor.jpg";
import arianaGrandeImg from "../assets/images/ariana.jpg";
import theNeighbourhoodImg from "../assets/images/thenbhd.jpg";

// Data untuk 5 artis (name = untuk hover gambar, marqueeName = untuk teks berjalan)
const artists = [
  { id: "lady-gaga", name: "Lady Gaga", marqueeName: "Lady Gaga", image: ladyGagaImg },
  { id: "justin-bieber", name: "Justin Bieber", marqueeName: "Justin Bieber", image: justinBieberImg },
  { id: "taylor-swift", name: "Taylor Swift", marqueeName: "Taylor Swift", image: taylorSwiftImg },
  { id: "ariana-grande", name: "Ariana Grande", marqueeName: "Ariana Grande", image: arianaGrandeImg },
  { id: "the-neighbourhood", name: "The NBHD", marqueeName: "The Neighbourhood", image: theNeighbourhoodImg },
];

export default function HeroSection() {
  const [activeArtist, setActiveArtist] = useState(null);

  return (
    <div className="relative w-full flex flex-col bg-black">
      {/* 1. Container Utama Hero Image */}
      <div className="relative w-full h-[85vh] overflow-hidden flex">
        {/* Panel Gambar & Teks Nama Artis di Tengah Masing-masing Gambar */}
        {artists.map((artist) => {
          const isHovered = activeArtist === artist.id;

          return (
            <div
              key={artist.id}
              onMouseEnter={() => setActiveArtist(artist.id)}
              onMouseLeave={() => setActiveArtist(null)}
              className="relative h-full w-full flex-1 cursor-pointer overflow-hidden border-r border-black/50 group"
            >
              {/* Gambar Background */}
              <img
                src={artist.image}
                alt={artist.name}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />

              {/* Overlay Gelap */}
              <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isHovered ? "bg-opacity-25" : "bg-opacity-50"}`} />

              {/* Teks Nama Artis di Tengah Gambar saat Hover (Pakai 'name' -> The NBHD) */}
              <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
                <div
                  className={`transition-all duration-500 transform text-center ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-4"
                  }`}
                >
                  <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
                    {artist.name}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}

        {/* 2. Teks Utama di Tengah (Hanya muncul jika TIDAK ADA kursor yang menyentuh gambar) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 z-20">
          <div
            className={`transition-all duration-500 transform max-w-3xl text-center ${
              activeArtist === null
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Angka / Label Besar Atas */}
            <div className="text-6xl md:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-purple-400 drop-shadow-lg mb-2">
              02:00
            </div>
            <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-semibold">
              JAM DIMANA PANGGUNG BARU MENYALA
            </p>

            {/* Judul Utama */}
            <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide leading-tight mb-4 drop-shadow-md">
              YOUR FAVORITE CONCERT, <span className="text-amber-400">ONE TICKET</span> SELLING NOW.
            </h1>

            {/* Deskripsi */}
            <p className="text-gray-300 text-sm md:text-base font-medium mb-8 max-w-xl mx-auto tracking-wide">
              2AMStage is your official destination to hunt tickets from this year's biggest lineup — no scalpers, no drama, direct QR e-tickets in your hands.
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
              <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-wider text-sm">
                Buy Tickets Now
              </button>
              <button className="bg-black/40 hover:bg-black/60 text-white border border-white/20 font-medium px-8 py-3.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-105 text-sm">
                How System Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Running Text (Artis Berjalan Otomatis) di Bawah Hero Image */}
      <div className="w-full bg-[#070A13] border-y border-white/10 py-4 overflow-hidden relative flex items-center">
        <div 
          className="flex whitespace-nowrap"
          style={{
            display: "flex",
            width: "max-content",
            animation: "marqueeAnimation 20s linear infinite"
          }}
        >
          {/* Diulang 4 kali agar looping berjalan mulus tanpa jeda */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center space-x-8 px-4">
              {artists.map((artist) => (
                <div key={`${artist.id}-${i}`} className="flex items-center space-x-8">
                  {/* Menggunakan 'marqueeName' (The Neighbourhood) untuk teks berjalan */}
                  <span className="text-white/80 font-bold uppercase tracking-widest text-sm md:text-base hover:text-amber-400 transition-colors">
                    {artist.marqueeName}
                  </span>
                  <span className="text-pink-500 text-xs">◆</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Styling CSS Internal untuk Animasi Marquee */}
        <style>{`
          @keyframes marqueeAnimation {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-25%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}