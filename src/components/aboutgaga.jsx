import React, { useState } from 'react';

// Ganti atau tambahkan import file aset gambar lokalmu di sini
import ladygaga1 from '../assets/images/masehem.jpg'; 
import ladygaga2 from '../assets/images/f.jpg'; // Contoh gambar kedua (sesuaikan path-nya)
import ladygaga3 from '../assets/images/mayhem.jpg'; // Contoh gambar ketiga (sesuaikan path-nya)

export default function Aboutgaga({ onBuyTicket, onBack }) {
  // Daftar array gambar untuk poster yang bisa digeser
  const images = [ladygaga1, ladygaga2, ladygaga3];
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fungsi untuk menggeser ke gambar selanjutnya (kanan)
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Fungsi untuk menggeser ke gambar sebelumnya (kiri)
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

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
          
          {/* ================= KONTEN KIRI: POSTER ARTIS DENGAN FITUR SLIDER ================= */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[3/4.2] bg-[#0E121F] rounded-2xl border border-gray-800/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden group">
              
              {/* Bagian Atas Poster */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 block mb-0.5">TUR DUNIA 2027</span>
                  <span className="text-[10px] font-bold tracking-wider text-yellow-500 uppercase">JAKARTA NIGHT</span>
                </div>
                {/* Indikator Slider */}
                <span className="text-[9px] font-mono bg-black/40 px-2 py-0.5 rounded text-gray-400 border border-gray-800">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>

              {/* Area Gambar Poster + Tombol Navigasi Kiri & Kanan */}
              <div className="absolute inset-0 pt-16 px-5 pb-16 flex items-center justify-center bg-[#070913]/60">
                <img 
                  src={images[currentIndex]} 
                  alt={`Mayhem Poster ${currentIndex + 1}`} 
                  className="w-full h-full object-contain rounded-lg shadow-inner transition-opacity duration-300"
                />

                {/* Tombol Geser Kiri */}
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Previous Image"
                >
                  ‹
                </button>

                {/* Tombol Geser Kanan */}
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  aria-label="Next Image"
                >
                  ›
                </button>
              </div>

              {/* Bagian Bawah Poster (Nama Artis Besar) */}
              <div className="relative z-10 mt-auto">
                <h3 className="text-3xl font-black tracking-tighter leading-none text-white drop-shadow-md">
                  LADY<br />GAGA
                </h3>
              </div>
            </div>
          </div>

          {/* ================= KONTEN KANAN: DETAIL INFORMASI KONSER ================= */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            
            {/* Header Utama */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-pink-500 font-semibold">KONSER TUNGGAL</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 uppercase">
                LADY GAGA
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base">
                 The MAYHEM Ball<span className="text-gray-600">—</span> Jakarta Night
              </p>
            </div>

            {/* Garis Pemisah 1 */}
            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            {/* Grid Informasi (Tanggal, Waktu, Venue) */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">TANGGAL</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">March, 23-24 2027</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">WAKTU</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">19.00 WIB</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">VENUE</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">Jakarta International Stadium</span>
              </div>
            </div>

            {/* Garis Pemisah 2 */}
            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            {/* Paragraf Deskripsi */}
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 max-w-2xl">
              Setelah dua tahun absen dari panggung Asia Tenggara, Lady Gaga kembali membawa <strong className="text-white font-semibold">The MAYHEM Ball</strong>— konser operatik bernuansa gotik yang menggabungkan elemen teater makam, mode eksentrik, dan narasi kehancuran yang megah. Satu malam, satu panggung 360°, dan daftar lagu yang disusun ulang khusus untuk Jakarta.
            </p>

            {/* Bagian Setlist Lagu */}
            <div className="mb-8 max-w-xl">
              <h4 className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 mb-4">
                LAGU YANG AKAN DIBAWAKAN
              </h4>
              
              <div className="space-y-3">
                {[
                  { num: "01", title: "Disease" },
                  { num: "02", title: "Abracadabra" },
                  { num: "03", title: "Garden Of Eden" },
                  { num: "04", title: "Die With  A Smile" },
                  { num: "05", title: "Vanish Into You" }
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

            {/* Tombol Beli Tiket */}
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