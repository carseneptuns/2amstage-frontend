import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Login({ onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika autentikasi login Anda di sini
    console.log("Login submitted:", { email, password });
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Efek Glow Ambient Latar Belakang */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#66FCF1]/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-gradient-to-b from-[#1F2833]/80 to-[#151B24]/90 p-8 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-xl"
      >
        {/* Header Form */}
        <div className="text-center mb-8">
          <span className="text-[#66FCF1] tracking-widest uppercase font-semibold text-xs">2AMSTAGE ACCESS</span>
          <h2 className="text-3xl font-black mt-2 tracking-tight">MASUK AKUN</h2>
          <p className="text-gray-400 text-sm mt-1">Lanjutkan war tiket impianmu dengan aman.</p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="nama@domain.com"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#66FCF1] transition-all"
            />
          </div>

          <div>
            <label className="block text-xs uppercase font-mono text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#0B0C10]/80 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#66FCF1] transition-all"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-gray-900 border-gray-800 text-[#66FCF1] focus:ring-0" />
              <span>Ingat saya</span>
            </label>
            <a href="#forgot" className="hover:text-[#66FCF1] transition-colors">Lupa password?</a>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#66FCF1] hover:bg-[#45A29E] text-gray-950 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(102,252,241,0.2)]"
          >
            Masuk Sekarang
          </button>
        </form>

        {/* Footer Switch */}
        <p className="text-center text-xs text-gray-400 mt-8">
          Belum punya akun?{' '}
          <button 
            onClick={onSwitchToRegister}
            className="text-[#66FCF1] font-semibold hover:underline ml-1"
          >
            Daftar di sini
          </button>
        </p>
      </motion.div>
    </div>
  );
}