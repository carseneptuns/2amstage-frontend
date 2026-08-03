import React from 'react';
import ts from '../assets/images/ttpd.jpg'; // Sesuaikan path gambar Justin Bieber kamu

export default function AboutJB({ onBuyTicket, onBack }) {
  return (
    <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center p-6 md:p-12 font-sans relative overflow-hidden">
      
      {/* Efek Ambient Glow Halus di Sudut Latar Belakang */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl w-full">
        
        {/* ================= TOMBOL KEMBALI ================= */}
        {onBack && (
          <button 
            onClick={onBack}
            className="mb-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-400 hover:text-white bg-[#0E121F] border border-gray-800 px-4 py-2.5 rounded-full transition-all hover:border-gray-600 cursor-pointer"
          >
            <span className="transform rotate-180">→</span>
            <span>Kembali ke Lineup</span>
          </button>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* ================= KONTEN KIRI: POSTER ARTIS ================= */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[3/4.2] bg-[#0E121F] rounded-2xl border border-gray-800/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden group">
              
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 block mb-0.5">TUR DUNIA 2027</span>
                  <span className="text-[10px] font-bold tracking-wider text-yellow-500 uppercase">JAKARTA NIGHT</span>
                </div>
              </div>

              <div className="absolute inset-0 pt-16 px-5 pb-16 flex items-center justify-center bg-[#070913]/60">
                <img 
                  src={ts} 
                  alt="taylorswift" 
                  className="w-full h-full object-cover rounded-lg shadow-inner"
                />
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-3xl font-black tracking-tighter leading-none text-white drop-shadow-md">
                  TAYLOR<br />SWIFT
                </h3>
              </div>
            </div>
          </div>

          {/* ================= KONTEN KANAN: DETAIL INFORMASI KONSER ================= */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-pink-500 font-semibold">KONSER TUNGGAL</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 uppercase">
                TAYLOR SWIFT
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base">
                 THE ERAS TOUR<span className="text-gray-600">—</span> Jakarta Night
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">TANGGAL</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">NOV, 2 2026</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">WAKTU</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">20.00 WIB</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">VENUE</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">ICE BSD, Tanggerang</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 max-w-2xl">
             Setelah penantian panjang dari para penggemar setianya, Taylor Swift kembali membawa <strong className="text-white font-semibold">The Eras Tour</strong> — sebuah perjalanan musik monumental yang merayakan seluruh diskografi dan evolusi artistik sang bintang. Panggung megah, koreografi spektakuler, dan penampilan penuh emosi yang melintasi berbagai era musiknya siap mengguncang Jakarta. Satu malam spesial untuk merayakan musik yang telah menemani jutaan hati.</p>
            <div className="mb-8 max-w-xl">
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 mb-4">
                LAGU YANG AKAN DIBAWAKAN
              </h4>
              <div className="space-y-3">
                {[
                  { num: "01", title: "The Fate Of Ophelia" },
                  { num: "02", title: "ALl To Welll 10 Minute Version" },
                  { num: "03", title: "Red" },
                  { num: "04", title: "Labyrinth" },
                  { num: "05", title: "Out Of Woods" }
                ].map((song, idx) => (
                  <div key={idx} className="flex items-center justify-between pb-2.5 border-b border-gray-900 text-sm">
                    <div className="flex items-center gap-6">
                      <span className="text-xs font-mono text-gray-600 font-medium">{song.num}</span>
                      <span className="text-gray-200 font-normal tracking-wide">{song.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-[11px] text-gray-500 italic mt-3">
                + 4 lagu lainnya, lihat setlist lengkap di halaman tiket
              </p>
            </div>

            <div>
              <button 
                onClick={onBuyTicket}
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)] tracking-wide text-xs uppercase flex items-center gap-2 group cursor-pointer"
              >
                <span>Beli Tiket</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}