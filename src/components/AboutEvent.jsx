import React, { useState } from "react";

// Gambar tambahan khusus halaman detail (buat slider) — hidup di sini,
// bukan di DashboardCard.jsx, karena cuma dipakai di halaman detail ini.
import ladyGagaDetail1 from "../assets/images/masehem.jpg";
import ladyGagaDetail2 from "../assets/images/mayhem.jpg";
import justinBieberDetail1 from "../assets/images/concert.png";
import taylorSwiftDetail1 from "../assets/images/ttpd.jpg";
import arianaGrandeDetail1 from "../assets/images/artpel.jpg";
import theNeighbourhoodDetail1 from "../assets/images/death.jpg";

/**
 * Data khusus halaman detail tiap konser — gambar slider tambahan dan
 * teks deskripsi panjang. Sengaja dipisah dari `concertData` di
 * DashboardCard.jsx karena dua hal ini cuma dipakai di sini, bukan di
 * card listing. Key-nya harus sama persis dengan `id` di concertData.
 */
const EVENT_DETAILS = {
  "lady-gaga": {
    extraImages: [ladyGagaDetail1, ladyGagaDetail2],
    description:
      "Lady Gaga kembali membawa The Chromatica Ball Redux — konser operatik bernuansa gotik yang menggabungkan elemen teater megah, mode eksentrik, dan narasi yang penuh warna. Satu malam, satu panggung 360°, dan daftar lagu yang disusun ulang khusus untuk Jakarta.",
  },
  "justin-bieber": {
    extraImages: [justinBieberDetail1],
    description:
      "Setelah 10 tahun absen dari panggung Asia Tenggara, Justin Bieber kembali membawa SWAG Tour Asia — sebuah perayaan musik yang memadukan visual panggung mutakhir, gaya busana eksentrik, dan aransemen lagu yang emosional. Satu malam, satu panggung 360°, dan daftar lagu yang disusun ulang khusus untuk Jakarta.",
  },
  "taylor-swift": {
    extraImages: [taylorSwiftDetail1],
    description:
      "Setelah penantian panjang dari para penggemar setianya, Taylor Swift kembali membawa The Eras Tour — sebuah perjalanan musik monumental yang merayakan seluruh diskografi dan evolusi artistik sang bintang. Panggung megah, koreografi spektakuler, dan penampilan penuh emosi yang melintasi berbagai era musiknya siap mengguncang Jakarta.",
  },
  "ariana-grande": {
    extraImages: [arianaGrandeDetail1],
    description:
      "Menghadirkan keanggunan vokal dan kemegahan kelas dunia, Ariana Grande Eternal Sunshine Live siap memukau Jakarta. Sebuah mahakarya pertunjukan yang memadukan aransemen musik yang megah, harmoni vokal yang hangat, serta nuansa sinematik yang puitis.",
  },
  "the-neighbourhood": {
    extraImages: [theNeighbourhoodDetail1],
    description:
      "Membawa atmosfer melankolis yang sunyi dan distorsi gitar yang membuai, The Neighbourhood Wiped Out! World Tour siap memukau Jakarta. Sebuah perjalanan sonik penuh nuansa pantai barat yang kelam, aransemen indie rock yang menghanyutkan, serta estetika visual monokromatik yang ikonik.",
  },
};

/**
 * Komponen About/Detail generik untuk semua konser.
 *
 * Props:
 * - concert    : satu objek dari concertData (lihat DashboardCard.jsx) —
 *                cuma butuh data ringan (name, subtitle, venue, date,
 *                time, image, id)
 * - onBuyTicket: fungsi saat tombol "Beli Tiket" diklik
 * - onBack     : fungsi saat tombol "Kembali ke Lineup" diklik (opsional)
 *
 * Gambar slider tambahan dan deskripsi panjang diambil dari
 * `EVENT_DETAILS` di atas, dicocokkan lewat `concert.id`.
 */
export default function AboutEvent({ concert, onBuyTicket, onBack }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!concert) {
    return (
      <div className="min-h-screen bg-[#070913] text-white flex items-center justify-center">
        <p className="text-gray-400">Konser tidak ditemukan.</p>
      </div>
    );
  }

  const { id, name, subtitle, venue, date, time, image } = concert;
  const details = EVENT_DETAILS[id] || {};
  const description = details.description;

  // Poster utama (dari concertData) + gambar tambahan (dari EVENT_DETAILS)
  const posterImages = image ? [image, ...(details.extraImages || [])] : (details.extraImages || []);
  const hasMultipleImages = posterImages.length > 1;

  // Pecah nama artis jadi 2 baris untuk tampilan poster besar, mis. "LADY GAGA" -> "LADY" / "GAGA"
  const firstSpaceIdx = name.indexOf(" ");
  const artistLine1 = firstSpaceIdx === -1 ? name : name.slice(0, firstSpaceIdx);
  const artistLine2 = firstSpaceIdx === -1 ? "" : name.slice(firstSpaceIdx + 1);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % posterImages.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + posterImages.length) % posterImages.length);

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
          {/* ================= KONTEN KIRI: POSTER ARTIS (SLIDER) ================= */}
          <div className="lg:col-span-4 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[340px] aspect-[3/4.2] bg-[#0E121F] rounded-2xl border border-gray-800/80 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden group">
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-mono tracking-[0.25em] text-gray-400 block mb-0.5">
                    TUR DUNIA 2027
                  </span>
                  <span className="text-[10px] font-bold tracking-wider text-yellow-500 uppercase">
                    JAKARTA NIGHT
                  </span>
                </div>

                {hasMultipleImages && (
                  <span className="text-[9px] font-mono bg-black/40 px-2 py-0.5 rounded text-gray-400 border border-gray-800">
                    {currentIndex + 1} / {posterImages.length}
                  </span>
                )}
              </div>

              <div className="absolute inset-0 pt-16 px-5 pb-16 flex items-center justify-center bg-[#070913]/60">
                {posterImages[currentIndex] && (
                  <img
                    src={posterImages[currentIndex]}
                    alt={name}
                    className={`w-full h-full rounded-lg shadow-inner transition-opacity duration-300 ${
                      hasMultipleImages ? "object-contain" : "object-cover"
                    }`}
                  />
                )}

                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Previous Image"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-8 h-8 rounded-full flex items-center justify-center border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Next Image"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                <h3 className="text-3xl font-black tracking-tighter leading-none text-white drop-shadow-md">
                  {artistLine1}
                  {artistLine2 && <br />}
                  {artistLine2}
                </h3>
              </div>
            </div>
          </div>

          {/* ================= KONTEN KANAN: DETAIL INFORMASI KONSER ================= */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-pink-500 font-semibold">
                  KONSER TUNGGAL
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-2 uppercase">
                {name}
              </h1>
              <p className="text-gray-300 font-medium text-sm md:text-base">
                {subtitle}
                <span className="text-gray-600">—</span> Jakarta Night
              </p>
            </div>

            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">TANGGAL</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">{date}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">WAKTU</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">{time || "-"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider text-gray-500 block mb-1">VENUE</span>
                <span className="font-bold text-gray-100 text-sm md:text-base">{venue}</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-gray-800/80 mb-6"></div>

            {description && (
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8 max-w-2xl">
                {description}
              </p>
            )}

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
