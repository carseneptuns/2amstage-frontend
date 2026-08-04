import React, { useState } from "react";

import ladyGagaImg from "../assets/images/ladygaga.jpg";
import justinBieberImg from "../assets/images/justin.jpg";
import taylorSwiftImg from "../assets/images/taylor.jpg";
import arianaGrandeImg from "../assets/images/ariana.jpg";
import theNeighbourhoodImg from "../assets/images/thenbhd.jpg";

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
      {/* Mobile: grid 2 kolom x 3 baris (gambar terakhir full-width), tinggi lebih pendek */}
      {/* Tablet ke atas: kembali ke flex row seperti original */}
      <div className="relative w-full h-[70vh] sm:h-[75vh] lg:h-[85vh] overflow-hidden grid grid-cols-2 grid-rows-3 sm:flex sm:flex-row">
        {/* Panel Gambar & Teks Nama Artis di Tengah Masing-masing Gambar */}
        {artists.map((artist, index) => {
          const isHovered = activeArtist === artist.id;
          // Item terakhir (index 4) full-width di grid mobile (col-span-2)
          const isLastMobile = index === artists.length - 1;

          return (
            <div
              key={artist.id}
              onMouseEnter={() => setActiveArtist(artist.id)}
              onMouseLeave={() => setActiveArtist(null)}
              onTouchStart={() => setActiveArtist(artist.id)}
              className={`relative h-full w-full flex-1 cursor-pointer overflow-hidden border border-black/50 sm:border-r sm:border-t-0 sm:border-b-0 sm:border-l-0 group ${
                isLastMobile ? "col-span-2 sm:col-span-1" : ""
              }`}
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
              <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 z-10 pointer-events-none">
                <div
                  className={`transition-all duration-500 transform text-center ${
                    isHovered
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 translate-y-4"
                  }`}
                >
                  <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-widest drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)]">
                    {artist.name}
                  </h2>
                </div>
              </div>
            </div>
          );
        })}

        {/* 2. Teks Utama di Tengah (Hanya muncul jika TIDAK ADA kursor yang menyentuh gambar) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center px-4 sm:px-6 z-20">
          <div
            className={`transition-all duration-500 transform max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center ${
              activeArtist === null
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
          >
            {/* Angka / Label Besar Atas */}
            <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-purple-400 drop-shadow-lg mb-1 sm:mb-2">
              02:00
            </div>
            <p className="text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gray-400 mb-3 sm:mb-6 font-semibold">
              JAM DIMANA PANGGUNG BARU MENYALA
            </p>

            {/* Judul Utama */}
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-black text-white uppercase tracking-wide leading-tight mb-2 sm:mb-4 drop-shadow-md">
              YOUR FAVORITE CONCERT, <span className="text-amber-400">ONE TICKET</span> SELLING NOW.
            </h1>

            {/* Deskripsi */}
            <p className="hidden sm:block text-gray-300 text-xs sm:text-sm md:text-base font-medium mb-4 sm:mb-8 max-w-md sm:max-w-xl mx-auto tracking-wide">
              2AMStage is your official destination to hunt tickets from this year's biggest lineup — no scalpers, no drama, direct QR e-tickets in your hands.
            </p>

            {/* Tombol Aksi */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 pointer-events-auto">
              <button className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:scale-105 uppercase tracking-wider text-xs sm:text-sm w-full sm:w-auto">
                Buy Tickets Now
              </button>
              <button className="bg-black/40 hover:bg-black/60 text-white border border-white/20 font-medium px-5 py-2.5 sm:px-8 sm:py-3.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg hover:scale-105 text-xs sm:text-sm w-full sm:w-auto">
                How System Works
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Section Running Text (Artis Berjalan Otomatis) di Bawah Hero Image */}
      <div className="w-full bg-[#070A13] border-y border-white/10 py-3 sm:py-4 overflow-hidden relative flex items-center">
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
            <div key={i} className="flex items-center space-x-4 sm:space-x-8 px-2 sm:px-4">
              {artists.map((artist) => (
                <div key={`${artist.id}-${i}`} className="flex items-center space-x-4 sm:space-x-8">
                  {/* Menggunakan 'marqueeName' (The Neighbourhood) untuk teks berjalan */}
                  <span className="text-white/80 font-bold uppercase tracking-widest text-xs sm:text-sm md:text-base hover:text-amber-400 transition-colors">
                    {artist.marqueeName}
                  </span>
                  <span className="text-pink-500 text-[10px] sm:text-xs">◆</span>
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