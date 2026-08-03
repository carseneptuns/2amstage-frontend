import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Navbar({ onNavigate }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#08080D]/95 via-[#101321]/95 to-[#08080D]/95 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-[1400px] mx-auto h-[90px] px-10 flex items-center justify-between font-midnights">

        {/* Logo - Klik untuk kembali ke Home */}
        <h1 
          onClick={() => onNavigate("home")}
          className="text-4xl font-black tracking-wide cursor-pointer select-none"
        >
          <span className="text-white">2AM</span>
          <span className="text-amber-400">STAGE</span>
        </h1>

        {/* Menu */}
        <ul className="flex items-center gap-12">
          {["Konser", "Tiket Saya", "Bantuan"].map((item) => (
            <li 
              key={item} 
              onClick={() => {
                if (item === "Konser") onNavigate("home");
              }}
              className="group cursor-pointer"
            >
              <span className="text-gray-300 font-medium transition-all duration-300 group-hover:text-white">
                {item}
              </span>
              <div className="h-[2px] w-0 bg-amber-400 rounded-full transition-all duration-300 group-hover:w-full mt-1"></div>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse"></div>
            <span className="text-amber-400 font-mono text-lg tracking-wider">
              {time}
            </span>
          </div>

          {/* Tombol Masuk - Mengarahkan ke halaman login */}
          <button 
            onClick={() => onNavigate("login")}
            className="px-7 py-2.5 rounded-full border border-white/30 text-white font-medium transition-all duration-300 hover:bg-violet-600 hover:border-violet-600 hover:shadow-[0_0_25px_rgba(139,92,246,.5)] cursor-pointer"
          >
            Masuk
          </button>
        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;